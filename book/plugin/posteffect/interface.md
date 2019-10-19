---
delir_version: Alpha.7
---

# ポストエフェクト

## プラグインインターフェース

サンプルプラグイン: https://github.com/ra-gg/Delir/blob/master/packages/core/plugin-example/src/index.ts

### PostEffectBase クラス

ポストエフェクトクラスは`@delirvfx/core`から提供されている`PostEffectBase`クラスを継承して、`export default`で export してください。`default`以外に export されたクラスは無視されます。

必要なメソッドの詳細については後述します。

```typescript
import {
  PostEffectBase,
  EffectPreRenderContext,
  EffectRenderContext
} from "@delirvfx/core";

interface Params {
  // ... 後述します
}

export default class ExamplePlugin extends PostEffectBase {
  static provideParameters() {
    // ... 後述します
  }

  async initialize(context: EffectPreRenderContext<Params>) {
    // ... 後述します
  }

  async render(context: EffectRenderContext) {
    // ... 後述します
  }
}
```

### `static provideParameters()`

プラグインで利用可能なパラメータを返します。
`@delirvfx/core`モジュールから提供される`Type`クラスを利用してパラメータを定義します。
現在は以下の型が利用可能です。

- `number` - 整数型
- `float` - 小数型
- `bool` - 真偽型
- `string` - 文字列型
- `colorRgb` - 透明度なし Color 型
- `colorRgba` - 透明度つき Color 型
- `asset` - Asset 型（Asset に追加されたファイルを利用する場合に利用します）
- `enum` - Enum 型（単一選択）
- `code` - Expression 型

provideParameters メソッドで以下のようにパラメータを定義します。

```javascript
import { Values } from '@delirvfx/core'

public static provideParameters() {
  return (
    Type
      // .<型名>('パラメータ名', {パラメータオプション})
      //   label - ユーザに表示されるパラメータ名を指定します。
      //   defaultValue - 初期値を指定します
      .number("x", { label: "位置X", defaultValue: () => 0 })
      .float("y", { label: "位置Y", defaultValue: () => 0 })
      .bool("visibility", { label: "可視", defaultValue: () => true })
      .string("text", { label: "テキスト", defaultValue: () => "text" })
      .colorRgba('color', { label: '色', defaultValue: () => new Values.ColorRGBA(0, 0, 0, 1)})
      .asset("image", {
        label: "画像",
        // extensions - 読み込み可能なファイルの拡張子のリスト
        extensions: ["jpg", "jpeg", "png", "gif"]
      })
      // パラメータオプション selection - 選択肢リスト（文字列のみ）
      .enum("fontFamily", {
        label: "書体",
        selection: ["sans-serif", "serif"],
        defaultValue: () => "serif"
      })
      .code('shader', {
        label: 'Shader',
        langType: 'glsl',
        defaultValue: () => new Values.Expression('glsl', 'precision mideump float;')
      })
  );
}
```

### `async initialize(context: EffectPreRenderContext)`

レンダリング開始前の初期化処理で呼ばれるメソッドです。
画像などのファイルの読み込みはここで行います。

`context`オブジェクトには、パラメータの初期値などが含まれています。

```typescript
import { EffectPreRenderContext } from '@delirvfx/core'

// エフェクトクラス内
async initialize(context: EffectPreRenderContext<Params>) {
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

### `async render(context: EffectRenderContext)`

1 フレームのレンダリングを行います。
`context`オブジェクトには以下のパラメータなどが渡されます

- `context.parameters: any` - 現在のフレームでのパラメータ。provideParameters で指定したパラメータ名をキーに持つオブジェクト
- `context.srcCanvas: HTMLCanvasElement` - 入力元の Canvas
- `context.destCanvas: HTMLCanvasElement` - ポストエフェクト適用済み画像の出力先 Canvas
- `context.framerate: number` - フレームレート
- `context.width: number` / `context.height: number` - コンポジションのサイズ
- `context.time: number` - 現在の再生時間
- `context.frame` - 再生フレーム番号

`render` メソッドは `context.desCanvas` に渡ってきた Canvas にレンダリング結果を描きこんでください。

```typescript
import { EffectPreRenderContext } from '@delirvfx/core'

// エフェクトクラス内
async render(context: EffectPreRenderContext<Params>)
{
    if (this.image == null) return;

    const ctx = context.destCanvas.getContext('2d');

    // context.parametersにprovideParametersメソッドで指定したパラメータ名で、現在のフレームでのパラメータが渡されます
    const params = context.parameters;

    if (params.visibility !== false) {
      // `context.destCanvas` に処理結果を書き込みます
        ctx.drawImage(this.image, params.x, params.y)
    }
}
```

## パラメータの型定義

パラメータの型定義は、`@delirvfx/core`から提供されている`ParamType`を利用してください。
例えば `provideParameters`で以下のようなパラメータを定義した場合…

```typescript
public static provideParameters() {
  return (
    Type
      .number("x", { label: "位置X", defaultValue: () => 0 })
      .bool("visibility", { label: "可視", defaultValue: () => true })
      .string("text", { label: "テキスト", defaultValue: () => "text" })
      .asset("image", {
        label: "画像",
        extensions: ["jpg", "jpeg", "png", "gif"]
      })
  );
}
```

型定義は以下のようになります。

```typescript
interface Params {
  x: ParamType.Number;
  visibility: ParamType.Bool;
  text: ParamType.String;
  image: ParamType.Asset;
}
```

`Type.**()`の`**`の部分を`ParamType.**`のようにすることでパラメータの型定義を行います。
定義したインターフェースを`initialize(context: EffectPreRenderContext<Param>)`, `render(context: EffectPreRenderContext<Param>)`のようにジェネリクスに指定することで、`context.parameters`の型が推論されます。
