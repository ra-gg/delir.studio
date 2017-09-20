# ポストエフェクト

## プラグインインターフェース
ソースコード: https://github.com/Ragg-/Delir/blob/master/src/delir-core/plugin-example/src/index.ts

### `static provideParameters()`
プラグインで利用可能なパラメータを返します。
`delir-core`モジュールから提供される`Type`クラスを利用してパラメータを定義します。
現在は以下の型が利用可能です。

- number - 整数型
- float - 小数型
- bool - 真偽型
- string - 文字列型
- colorRgb - 透明度なしColor型
- colorRgba - 透明度つきColor型
- asset - Asset型（Assetに追加されたファイルを利用する場合に利用します）
- enum - Enum型（単一選択）

provideParametersメソッド内で以下のようにパラメータを定義します。

```javascript
return Type
    // .<型名>('パラメータ名', {パラメータオプション})
    // パラメータオプション label - ユーザに表示されるパラメータ名を指定します。
    // パラメータオプション defaultValue - 初期値を指定します
    .number('x', { label: '位置X', defaultValue: 0 })
    .number('y', { label: '位置Y', defaultValue: 0 })
    .bool('visibility', { label: '可視', defaultValue: true })
    .string('text', { label: 'テキスト', defaultValue: 'text' })
    // パラメータオプション extensions - 読み込み可能なファイルの拡張子のリスト
    .asset('image', {label: '画像', extensions: ['jpg', 'jpeg', 'png', 'gif'] })
    // パラメータオプション selection - 選択肢リスト（文字列のみ）
    .enum('fontFamily', { label: '書体', selection: ['sans-serif', 'serif'], defaultValue: 'serif' })
```

### `async initialize(req: RenderRequest)`
レンダリング開始前の初期化処理で呼ばれるメソッドです。
画像などのファイルの読み込みはここで行います。

`req`オブジェクトには、パラメータの初期値などが含まれています。

```javascript
async initialize(req: RenderRequest) {
    // preRenderReq.parametersにprovideParametersメソッドで指定したパラメータ名で初期値が渡されます
    const parameters = preRenderReq.parameters;
    const imageAsset = parameters.image;

    if (! imageAsset == null) return;

    this.image = new Image();
    this.image.src = imageAsset.path;

    // 画像の読み込み完了を待つ
    await new Promise(resolve => this.image.onload = resolve)
}
```

### `async render(req: RenderRequest)`
１フレームのレンダリングを行います。
`req`オブジェクトには以下のパラメータなどが渡されます

- `req.parameters: any` - 現在のフレームでのパラメータ。provideParametersで指定したパラメータ名をキーに持つオブジェクト
- `req.srcCanvas: HTMLCanvasElement` - 入力元のCanvas
- `req.destCanvas: HTMLCanvasElement` - ポストエフェクト適用済み画像の出力先Canvas
- `req.framerate: number` - フレームレート
- `req.width: number` / `req.height: number` - コンポジションのサイズ
- `req.time: number` - 現在の再生時間
- `req.frame` - 再生フレーム番号

```javascript
async render(req: RenderRequest)
{
    if (this.image == null) return;

    const dest = req.destCanvas;
    const context = dest.getContext('2d');

    // req.parametersにprovideParametersメソッドで指定したパラメータ名で、現在のフレームでの値が渡されます
    const params = req.parameters;

    if (params.visibility !== false) {
        context.drawImage(this.image, params.x, params.y)
    }
}
```
