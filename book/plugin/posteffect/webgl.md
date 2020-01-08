---
delir_version: Alpha.7
---

# WebGL ポストエフェクト

Delir Alpha.7 から実験的な WebGL ポストエフェクトの対応が始まりました。
このセクションでは、Delir の WebGL API を利用したポストエフェクトの開発を解説します。
（既に[プラグインインターフェース](./interface.html)を読んでいる前提で進めます。）

参考: [Chromakey ポストエフェクト](https://github.com/delirvfx/delir/blob/master/packages/post-effect-plugins/chromakey/index.ts)
Delir の WebGL API ラッパー: [WebGLContext.ts](https://github.com/delirvfx/delir/blob/master/packages/core/src/Engine/WebGL/WebGLContext.ts#L61)

## `initialize` メソッド

`initialize` メソッド内では `context.gl.getProgram(fragmentShader)`することで WebGLProgram を作成します。
作成した WebGLProgram はインスタンスのプロパティで保持してください。

```typescript
const FRAGMENT_SHADER = `...`;

export default class Effect extends PostEffectBase {
  private program: WebGLProgram;

  public async initialize(context: EffectPreRenderContext<Params>) {
    this.program = context.gl.getProgram(
      FRAGMENT_SHADER /* 第二引数にVertex Shaderを渡すことも出来ます */
    );
  }
}
```

### `render` メソッド

`render` メソッドでレンダリング処理を行います。uniform の設定もここで行ってください。
`context.gl.applyProgram` メソッドを利用し、program を実行します。

```typescript
const FRAGMENT_SHADER = `...`;

export default class Effect extends PostEffectBase {
  private program: WebGLProgram;

  public static provideParameters() {
    return Type.colorRgb('color', { label: 'Color', defaultValue: () => new Values.ColorRGB(0, 0, 0)})
  }

  public async initialize(context: EffectPreRenderContext<Params>) {
    this.program = context.gl.getProgram(
      FRAGMENT_SHADER /* 第二引数にVertex Shaderを渡すことも出来ます */
    );
  }

  public async render(context: EffectRenderContext<Params>) {
    const { gl, srcCanvas, destCanvas } = context
    const { color } = context.parameters

    gl.applyProgram(
      /* WebGLProgram */ this.program,
      /* { uniform名: 値 } のオブジェクト */, { color: gl.uni3f(color.r / 255, color.g / 255, color.b / 255)) },
      /* 入力フレームのCanvas */ srcCanvas,
      /* 出力先のCanvas */ destCanvas,
    )
  }
}
```

Uniform は `context.gl.uni1f`のようなメソッドで指定してください。メソッド名は`uniform`を`uni`に省略した、WebGL の`.uniform**`メソッドと似た形式です。

Delir は以下の attibute uniform をなにもしなくても割り当てます

| 場所            | 種類      | 型        | 名前      |          |
| --------------- | --------- | --------- | --------- | -------- |
| Vertex shader   | attribute | vec2      | position  |          |
| Vertex shader   | attribute | vec2      | coord     |          |
| Fragment shader | varying   | vec2      | vTexCoord |          |
| Fragment shader | uniform   | sampler2D | source    | 入力画像 |
