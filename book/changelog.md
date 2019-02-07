## Alpha.6.2 (v0.6.2) at 01/23/2019

### 変更点

- [#204](https://github.com/ra-gg/Delir/pull/204) タイムラインを拡大したときにスクロールがガタッとなって左に戻る事があった不具合を修正した！
- [#205](https://github.com/ra-gg/Delir/pull/205) レンダリングを高速化した！（特にフッテージを多く使う時のプレビューがかなりマシになった！）

## Alpha.6 (v0.6.0) at 01/20/2019

### 新機能

- [#172](https://github.com/ra-gg/Delir/pull/172) Undo / Redo 機能が実装された！
  _約束するわ。絶対にミスから救ってみせる。何度 Undo することになっても、必ず進捗を守ってみせる！_
- [#174](https://github.com/ra-gg/Delir/pull/174) クリップのコピーペースト機能が実装された！
  右クリックメニューには出してないから、いつものショートカットキーを使ってくれ 😜
- [#179](https://github.com/ra-gg/Delir/pull/179) p5.js / エクスプレッションから、クリップとエフェクトのパラメータを参照できるようになりました！
  詳しくは[ドキュメント](https://delir.studio/docs/usage/clip/06_p5js.html)を見てくれ！p5.js の達人もビックリなアニメーションさばきを見せてやれ！
  - キーフレーム入力のための`Numeric slider`, `Color slider`エフェクトが追加された。
    エフェクトというわりに何もしないが、磨けば磨くほど尖っていくエフェクトだ
- [#168](https://github.com/ra-gg/Delir/pull/168) p5.js クリップの透明度が指定できるようになった 👥
- [#187](https://github.com/ra-gg/Delir/pull/187) p5.js / エクスプレッションコード内のエラーが通知されるようになった！
  でも開発者コンソールとのお付き合いはまだまだ続きそう…
- [#199](https://github.com/ra-gg/Delir/pull/199) レイヤーの右クリックメニューに「ここにレイヤーを追加」メニューが追加された！
- [#196](https://github.com/ra-gg/Delir/pull/196) エクスプレッションの設定状態が見えるようになった！
- [#199](https://github.com/ra-gg/Delir/pull/199) パラメータリストの右クリックメニューからエフェクトを追加できるようになった！
- [#201](https://github.com/ra-gg/Delir/pull/201) 再生が遅延しているときにオーディオもできるだけあわせて再生されるようになった！
- [#201](https://github.com/ra-gg/Delir/pull/201) Color 型パラメータの色を選んでいる間、プレビューの更新が抑制されるようになった！

### 互換性のない変更点

- [#201](https://github.com/ra-gg/Delir/pull/201) p5.js のキャンバスサイズがコンポジションサイズと一致するようになった！
  ぼやけていたイメージが、クッキリするようになったぞ
- [#173](https://github.com/ra-gg/Delir/pull/173) Video, Text, Image クリップの回転・拡大の基点が中央に変更されたぞ！
- [#183](https://github.com/ra-gg/Delir/pull/183) エクスプレッション・p5.js クリップでの Delir 連携 API が変更された
  残念ながら`delir.ctx`を使っていた今までのコードは動かなくなってしまった… 🙇🙇‍♀️
  これも詳しくは[ドキュメント](https://delir.studio/docs/usage/0x_expression.html)を見てくれ！

### バグ修正

- [#201](https://github.com/ra-gg/Delir/pull/201) p5.js のキャンバスサイズがコンポジションサイズと一致するようになった
  余白を取り入れたデザインだって？いいや、バグだね。
- [#201](https://github.com/ra-gg/Delir/pull/201) 同じ値のキーフレーム間のイージングを変更するとキーフレームグラフが破壊されるバグを修正した
- [#169](https://github.com/ra-gg/Delir/pull/169) コンポジション設定画面での Enter キーの押し心地を改善した。
  今までは Enter を押すと変更が無視されてた。無視されるのはショックだよね…
- [#180](https://github.com/ra-gg/Delir/pull/180) コンポジションやレイヤーの名前変更時に IME が上手く使えなかった不具合を修正した。ワタシニホンゴモダイジョウブデース 👲
- [#182](https://github.com/ra-gg/Delir/pull/182) Delir が画面外にいるとレンダリングが進まなくなる不具合を修正した。これでレンダリングの間の一服も安心だね！🐦
- [#197](https://github.com/ra-gg/Delir/pull/197) Audio クリップの音の先頭が欠けることがあったのと、音のヌケが長すぎることがあった不具合を修正した！
  これでパーフェクトな SE を使い放題だ！ためしに本社を爆破してみよう！💥🏢💥
- [#201](https://github.com/ra-gg/Delir/pull/201) プレビュー中に現在時間が更新されない不具合を修正した
- [#201](https://github.com/ra-gg/Delir/pull/201) クリップの利用アセット選択が動作していなかった不具合を修正した
- [#201](https://github.com/ra-gg/Delir/pull/201) クリップの利用アセットを空にできなかった不具合を修正した

### プラグイン開発環境・内部変更

- [#190](https://github.com/ra-gg/Delir/pull/190) `Delir.ProjectHelper`が削除され、ビジネスロジックが`Delir.Entity.*`以下の Entity クラスに移動されました
- [#181](https://github.com/ra-gg/Delir/pull/181) ポストエフェクトの`beforeRender`, `render`メソッドのシグネチャが変更された
  `beforeRender(context: Delir.EffectPreRenderContext<P>)`
  `render(context: Delir.EffectRenderContext<P>)`
- [#178](https://github.com/ra-gg/Delir/pull/178) `Delir.{PreRenderRequest, RenderRequest}` が `Delir.{PreRenderContext, RenderContext}` へリネームされた
- [#181](https://github.com/ra-gg/Delir/pull/181) エンジン内のパラメータ計算に関わる重複ロジックが共通化された
- [#182](https://github.com/ra-gg/Delir/pull/182) オフラインレンダリングが実装された
- [#191](https://github.com/ra-gg/Delir/pull/191), #193 Delir の開発に ReduxDevTools が使えるようになった、Redux は使ってないけどね！

## Alpha.5 (v0.5.2) at 09/14/2018

### 新機能

- [#149](https://github.com/ra-gg/Delir/pull/149) [p5.js](https://p5js.org)コードをクリップとして扱えるようになりました 🎉
  破壊と創造の幾何学模様を p5.js で描こう 🌈✨
- [#147](https://github.com/ra-gg/Delir/pull/147) 今まで置き場所そのままでしかレイヤー間を移動できなかったクリップが
  うっかりフレーム位置も一緒に変更可能になりました 😳
- [#156](https://github.com/ra-gg/Delir/pull/156) プロジェクトに必要なエフェクトがインストールされていなくても、プレビューする設定ができるようになりました 🌫 （mac: `Cmd+,` / win: `Ctrl+,` で設定が開きます）
  「お前が欠けてもレンダリングはグルグル回る 🌪」
- f5d0b3d クリップのコンテキストメニューに「クリップの先頭へシーク」が追加されました
  その先に俺は居るぞ…！🚩🔚

### 互換性のない変更

- Alpha.4 (v0.4.1) 以前のプロジェクトを読み込むことができなくなりました 😢
- Alpha.4 でベータ版として対応していたポストエフェクトの WebGL 対応が廃止されました。
  Alpha.6 か 7 あたりで"イケてる"再対応をしていくぜ 🔥

### バグ修正

- [#154](https://github.com/ra-gg/Delir/pull/154) 微妙にダサかったコンテキストメニューがシステム標準のものを使うようになりました 🍎 🏁
- [#154](https://github.com/ra-gg/Delir/pull/154) プレビューを遅くし、治安を悪化させた輩をブタ箱にツッコみました 💨
- [#155](https://github.com/ra-gg/Delir/pull/155) アニメーション不可能なパラメータのエクスプレッションを編集できないようにしました 🙅
  🏳️ そんなきっちりしない挙動、真ん中分けの娘に見られても生きていられるでしょうか？🏴

### プラグイン開発環境・内部変更

- [#153](https://github.com/ra-gg/Delir/pull/153) `Delir.Project` 名前空間が `Delir.Entity` にリネームされ、新しい Entity クラス郡に置き換わりました
- [#151](https://github.com/ra-gg/Delir/pull/151), #153, #158 プロジェクトファイルの構造が変わり、"変更に強い"構造になりました
  ただし Alpha.4 以前のプロジェクトが読み込めなくなりました…😩
  1.0.0 前ってこういうことってよくあるの…😇
- [#163](https://github.com/ra-gg/Delir/pull/163) フロントエンドに domain の概念が持ち込まれ、`utils city`でスリで生計を立てていた utils 達が立派なビジネスマンに育ちました 👩‍💼👨‍💼
- [#167](https://github.com/ra-gg/Delir/pull/167) オーディオのデコード処理を OfflineAudioContext でするようにしました。
  美しいオーロラは終わったんだ。もうあの時間は終わって、君も空っぽのコンポジションと向き合う時が来たんだ。

## Alpha.4.1 (v0.4.1) at 09/20/2017

### 新機能

- [#100](https://github.com/ra-gg/Delir/pull/100) ポストエフェクトが利用可能になりました
  - 試験的に Chromakey エフェクト・The world エフェクトがバンドルされています。
- [#118](https://github.com/ra-gg/Delir/pull/118) 「調整クリップ」が追加されました
- [#123](https://github.com/ra-gg/Delir/pull/123) プロジェクトの自動保存機能が追加されました
- [#134](https://github.com/ra-gg/Delir/pull/134) レイヤーの並べ替えができるようになりました

### バグ修正

- [#104](https://github.com/ra-gg/Delir/pull/104) クリップ未選択状態でクリップを消した時にエラーが起きていた問題を修正
- [#130](https://github.com/ra-gg/Delir/pull/130) 保存されたプロジェクトのカラーキーフレームが破損していた問題を修正
- [#100](https://github.com/ra-gg/Delir/pull/100) パイプライン内のカラー型キーフレーム補完処理で、Color{RGB,RGBA}型に補完されていなかった問題を修正
- [#133](https://github.com/ra-gg/Delir/pull/133) キーフレームエディタ上でカラー型・文字列型キーフレームの表示がおかしかった問題を修正
- [#135](https://github.com/ra-gg/Delir/pull/135) コンテキストメニューが正常に変化しないバグを修正

### プラグイン開発環境・内部変更

- [#100](https://github.com/ra-gg/Delir/pull/100) `DelirCore.Services` が `DelirCore.PluginSupport`　へリネームされました
  - `DelirCore.Services.PluginLoader` が `DelirCore.PluginSupport.FSPluginLoader` へリネームされました
  - `DelirCore.Services.PluginRegister` が `DelirCore.PluginSupport.PluginRegistry` へリネームされました
- [#119](https://github.com/ra-gg/Delir/pull/119) delir-core テスト環境の改善
- [#130](https://github.com/ra-gg/Delir/pull/130) `カラーキーフレームが破損していた問題を修正` の影響で Alpha.3 のプロジェクトファイルと直接的な互換性がなくなりました（#131 で追加された ProjectMigrator を利用することで Alpha.4 で利用可能な形式へマイグレート出来ます）
  Delir では、プロジェクトを開いた際に自動的にマイグレートされるのでエンドユーザーへの影響はありません。

## Alpha.3 at 08/20/2017

### 新機能

- [#87](https://github.com/ra-gg/Delir/pull/87), #89 エクスプレッション機能が実装されました
- [#88](https://github.com/ra-gg/Delir/pull/88) 複数の音源の同時再生が可能になりました
- [#99](https://github.com/ra-gg/Delir/pull/99) 英語/日本語に対応しました
- [#101](https://github.com/ra-gg/Delir/pull/101) スペースキーでプレビューの再生ができるようになりました
- [#101](https://github.com/ra-gg/Delir/pull/101) プレビューが現在のシーク位置から始まるようになりました
- [#101](https://github.com/ra-gg/Delir/pull/101) その他細かい機能導線の追加・コンテキストメニューの整理

### バグ修正

- [#81](https://github.com/ra-gg/Delir/pull/81) プロジェクトを切り替えた際にタイムライン上のオブジェクトがクリアされない不具合を修正しました
- [#97](https://github.com/ra-gg/Delir/pull/97) オーディオクリップが途中から再生されてしまうことがある問題を修正しました
- [#101](https://github.com/ra-gg/Delir/pull/101) キーフレームの開始位置がクリップの配置位置を考慮していなかった問題を修正
- [#101](https://github.com/ra-gg/Delir/pull/101) その他細かいバグの修正

### プラグイン開発環境・内部変更

- **`delir-core`から export されているプロパティ名が変更されています**
  - [#84](https://github.com/ra-gg/Delir/pull/84)`DelirCore.Renderer` が `DelirCore.Engine` へ移動されました
- [#84](https://github.com/ra-gg/Delir/pull/84) レンダリングエンジンが書き直されました
  - 不必要にクラスが分割されて見通しが悪いたため、一つのクラスにまとめた
- [#84](https://github.com/ra-gg/Delir/pull/84) 標準レンダラが実装されました（レンダラープラグインが無効化されました）
- [#82](https://github.com/ra-gg/Delir/pull/82) プロジェクトスキーマ内の Set 型が Array 型へ変更されました
  - `project.symbolIds` が削除されました
  - エンティティが生成されたときにエンティティ ID が設定されるようになりました

## Alpha.2 at 04/28/2017

### 新機能

- [#70](https://github.com/ra-gg/Delir/pull/70) キーフレームエディタが実装されました
- [#72](https://github.com/ra-gg/Delir/pull/72) テキストとカラーのキーフレームが設定できるようになりました
- [#73](https://github.com/ra-gg/Delir/pull/73) コンポジションの長さ以上の時間へシークできないようになりました
- [#66](https://github.com/ra-gg/Delir/pull/66) テキストクリップが追加されました。Delir 上でテキストのレンダリングを行えるようになります
- [#68](https://github.com/ra-gg/Delir/pull/68) アプリケーションメニューに `Open plugins directory` の項目が追加されました

### バグ修正

- [#56](https://github.com/ra-gg/Delir/pull/56) macOS でレンダリングができなかった問題を修正
- [#62](https://github.com/ra-gg/Delir/pull/62) プラグインの読み込みに失敗しても起動が止まらないようにした
- [#71](https://github.com/ra-gg/Delir/pull/71) キーフレームの位置がクリップの置かれている時間を考慮するようになりました
- [#77](https://github.com/ra-gg/Delir/pull/77) プラグインディレクトリ直下にファイルが置かれたときに起動処理が止まるバグを修正しました
- [af09e78](https://github.com/ra-gg/Delir/commit/af09e78) アプリを終了してもプロセスが終了しない不具合を修正しました
- [5d15b55](https://github.com/ra-gg/Delir/commit/5d15b55) ドラッグによる数値編集が無効な環境で、マウスカーソルがドラッグ可能を示唆するものに変わる挙動を修正しました

### プラグイン開発環境

- [#59](https://github.com/ra-gg/Delir/pull/59) `yarn dev` `yarn build`が正しく動作しない環境があった問題を修正
- [#64](https://github.com/ra-gg/Delir/pull/64), #65 `delir-core` の型定義ファイルが npm に公開されました
- [#69](https://github.com/ra-gg/Delir/pull/69) アセットのドラッグアンドドロップによるクリップ生成で、プラグインの対応判定が拡張子によって行われるようになりました
  （変更前は mime type によって判定していましたが、Chromium が認識できないファイルタイプのハンドリングができなかったため変更されました。）
- [3e8b3fe](https://github.com/ra-gg/Delir/commit/3e8b3fe) Windows での Delir のビルド対応が改善されました

## Alpha.1 at 04/07/2017

初期リリース
