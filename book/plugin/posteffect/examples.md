---
delir_version: Alpha.7
---

# 実装例

_実装例を募集しています。ポストエフェクトを開発された方は公式 Twitter や Discord などでぜひご連絡ください_

## Chromakey

[ソースコード](https://github.com/delirvfx/delir/blob/master/packages/post-effect-plugins/chromakey/index.ts)

WebGL を利用したクロマキーエフェクトです。Delir に標準で入っています。

## The world

[ソースコード](https://github.com/delirvfx/delir/blob/master/packages/post-effect-plugins/the-world/index.ts)

エフェクトが適用されたクリップが始まった瞬間のフレームを記憶し、クリップが有効な間そのフレームを表示し続けるポストエフェクトです。
下の動画内では、調整クリップに The world エフェクトを適用することで、そのクリップが有効な間、調整レイヤーの適用対象となっている映像を静止させています。
<video src="../assets/plugin/theworld.mp4" autoplay loop style="display:block;width:500px;max-width:100%;margin:0 auto" />
