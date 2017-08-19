# エクスプレッション
Delirでは、クリップ・エフェクトの各プロパティに対してJavaScriptによるエクスプレッションが利用できます。ES2016あたりの記法・APIが利用可能です。
スクリプトの最後で評価された値がプロパティの値になります。

```javascript
progression = ctx.time / ctx.duration // この行はプロパティに影響を与えません
progression * 10 // ← この行の計算結果がプロパティに設定されます。
```

## グローバルオブジェクト
### `ctx`
ctxオブジェクトは現在のレンダリングセッションに関わる情報が記録されています。

#### プロパティ
- `ctx.time`: number<br>
  現在の再生時間(秒)
- `ctx.frame`: number<br>
  現在のフレーム番号
- `ctx.timeOnComposition`: number<br>
  クリップが再生されているコンポジション上での時間(秒)
- `ctx.frameOnComposition`: number<br>
  クリップが再生されているコンポジション上でのフレーム番号
- `ctx.width`: number<br>
  画面の幅ピクセル数
- `ctx.height`: number<br>
  画面の高さピクセル数
- `ctx.audioBuffer`: Float32Array[] <br>
  **現在利用できません** バッファリングされている音声の生データです。
- `ctx.duration`: number<br>
  コンポジション全体の再生時間(秒)
- `ctx.durationFrames`: number<br>
  コンポジション全体のフレーム数
- `ctx.clipProp`: {[propertyName: string]: any}<br>
　**現在利用できません**
- `ctx.currentValue`: any<br>
  現在プロパティに設定されている値です。プロパティによって型が異なります
