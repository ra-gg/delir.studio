# ポストエフェクト
**ポストエフェクトはalpha.4から利用可能になる予定です。**
**このセクションはalpha.2のレンダラプラグインの仕様に基づいて書かれているため、alpha.4では仕様が変更されている可能性が大いにあります🙇**

----

ポストエフェクトプラグインでは、レンダラーによってレンダリングされた画素情報を加工することが出来ます。

[サンプルプロジェクト(GitHub)](https://github.com/Ragg-/Delir/tree/master/src/delir-core/plugin-example)
[プロジェクトテンプレートをダウンロード](https://github.com/Ragg-/Delir/files/906748/plugin-example-88bd02b.zip)

## 開発のはじめ方
- **事前に`Node.js`と`yarn`のインストールが必要です。**
- 開発にはVisualStudio Codeの使用をおすすめします。

プラグインテンプレートをダウンロードし、以下の場所にフォルダごと展開しましょう。
（delir/plugins/プラグイン名/package.json が存在するようにしてください）

Windows: `%AppData%\delir\plugins`
macOS: `$HOME/Library/Application\ Support/delir/plugins/`

テンプレートを展開したら、コマンドラインから展開したプラグインフォルダへ移動(cd)して
以下のコマンドを実行してください

```shell
# Put below commands into shell
yarn install # 依存モジュールをインストールする
yarn dev # 更新監視モードで開発を始める（コードを書き換えると自動的にコンパイルが行われる）
```

## ファイル構造
- package.json - プラグイン情報を記述
- src - プラグインのコンパイル前ソースコード
    - index.ts - エントリポイントになるファイル。ここにレンダリング処理を記述します。
- dist - コンパイル後コードの出力先

## package.json のフィールドについて
### `engines.delir`
動作対象となるDelirのバージョンを指定します。

```json5
{
    "engines": {
        "delir": "0.0.x" // => Support delir v0.0.*
    }
}
```

### delir
プラグインについての詳細情報を記述します。

```json5
{
  "delir": {
    "feature": "CustomLayer",
    "targetApi": {
        "renderer": "0.0.x"
    },
    // Assetがタイムラインにドラッグアンドドロップされたときに
    // そのAssetが左側に指定されたMimeTypeとマッチすると、
    // 右側のプロパティへAssetを設定して、プラグインのインスタンスが作られるようになります。
    "acceptFileTypes": {
        // "mimetype": "default assign property name"
        "video/mp4": "source"
    }
  }
}
```

## プラグインインターフェース

### `static provideParameters()`
プラグインで利用可能なパラメータを返します。
`delir-core`モジュールから提供されるTypeクラスを利用してパラメータを定義します。
現在は以下の型が利用可能です。

- number - 整数型
- float - 小数型
- bool - 真偽型
- colorRgb - 透明度なしColor型
- colorRgba - 透明度つきColor型
- asset - Asset型（Assetに追加されたファイルを利用する場合に利用します）

provideParametersメソッド内で以下のようにパラメータを定義します。

```javascript
return Type
    // .<型名>('パラメータ名', {パラメータオプション})
    // パラメータオプション label - ユーザに表示されるパラメータ名を指定します。
    // パラメータオプション defaultValue - 初期値を指定します
    .number('x', {label: 'PositionX', defaultValue: 0})
    .number('y', {label: 'PositionY', defaultValue: 0})
    .bool('visibility', {label: 'Visible', defaultValue: true})
    .asset('image', {label: 'Image', extensions: ['jpg', 'jpeg', 'png', 'gif']})
```

### `async beforeRender(preRenderReq: PluginPreRenderRequest)`
レンダリング開始前の初期化処理で呼ばれるメソッドです。
画像などのファイルの読み込みはここで行います。

`preRenderReq`オブジェクトには、Assetなどの初期値が含まれています。

```javascript
async beforeRender(preRenderReq: PluginPreRenderRequest) {
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
`req`オブジェクトには`出力先のcanvas`、 `フレームレート`、`コンポジションのサイズ`、`コンポジション上の現在時間（およびフレーム番号）`、`現在のフレームのパラメータ`などが渡されます。

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
