---
delir_version: Alpha.6
---

# エクスプレッション

Delir では、クリップ・エフェクトの各パラメータに対して JavaScript によるエクスプレッションが利用できます。ES2016 あたりの記法・API が利用可能
スクリプトの最後で評価された値がパラメータの値になります。

```javascript
progression = thisComp.time / thisComp.duration; // この行はパラメータに影響を与えません
progression * 10; // ← この行の計算結果がパラメータに設定されます。
```

## グローバルオブジェクト

### `currentValue`

パラメータのエクスプレッション適用前の現在の値

### `thisComp`

現在のコンポジションを表すオブジェクト

#### プロパティ・メソッド

- `thisComp.width`: number<br />
  コンポジションの幅(px)
- `thisComp.height`: number<br />
  コンポジションの高さ(px)
- `thisComp.time`: number<br />
  コンポジション上の経過時間(秒)
- `thisComp.frame`: number<br />
  コンポジション上の経過フレーム数
- `thisComp.duration`: number<br />
  コンポジションの長さ(秒)
- `thisComp.durationFrames`: number<br />
  コンポジションの長さ(フレーム数)
- `thisComp.audioBuffer`: Float32Array[]<br />
  **[experimental]** レンダリング済みのオーディオバッファ。<br />
  各要素がオーディオの 1 チャンネルに対応します。<br />
  バッファ長は Delir のバージョンによって変動することがあります。<br />
  （現在は、クリップの置かれたレイヤーの位置によって同フレーム内でも内容が変化します）<br />
  ※ p5.js コード内では利用できません。

### `thisClip`

現在のクリップを表すオブジェクト

#### プロパティ・メソッド

- `thisClip.time`: number<br />
  クリップ上の経過時間(秒)
- `thisClip.frame`: number<br />
  クリップ上の経過フレーム数
- `thisClip.params`: Readonly&lt;{ [paramName: string]: any }&gt;<br />
  現在のフレームでのエクスプレッション適用前の各キーフレームの値。<br />
  クリップによって中身が変わるので、`console.log()`を使って開発者コンソールで中身を確認してください<br />
  ※ p5.js コード内では利用できません。
- `thisClip.effect(referenceName: string): Effect`<br />
  エフェクトを取得する。`referenceName`にはエフェクトに設定した参照名を指定します。<br />

  > 例
  > 参照名をこのように設定した場合
  > <img src="../../assets/usage/effect-reference-name.png" style='height: 50px' /><br />
  > コードはこのようにする: `thisClip.effect('参照名')`

## Effect オブジェクト

エフェクトを表すオブジェクト
`thisClip.effect()`メソッドなどを通して取得されます。

#### プロパティ・メソッド

- `effect.params`: Readonly<{ [paramName: string]: any }>
  現在のフレームでのエクスプレッション適用前の各キーフレームの値。<br />
  エフェクトによって中身が変わるので、`console.log()`を使って開発者コンソールで中身を確認してください
