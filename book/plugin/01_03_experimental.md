# ポストエフェクト

[*現在、この問題に対する知見や解決方法・アーキテクチャの提案を募集しています。*](https://github.com/Ragg-/Delir/issues/125)

## 実験的機能
Delirのポストエフェクトはv0.4.0時点で実験的機能です。

[`CanvasRenderingContext2D API`](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D) を利用したポストエフェクトについては安定して利用できますが、
WebGL / WebGL2 を利用したポストエフェクトについては、一部のポストエフェクトのレンダリングが正常に動作しない・WebGLを利用する他のポストエフェクトと干渉する可能性があるなど不安定な要素が多いため、v0.4.0現在、ポストエフェクトでの利用を推奨していません。

### maxGLActiveContexts問題
Delirはフロントエンドのランタイム環境にElectronを利用しており、ElectronはChromiumをブラウザエンジンとして利用しています。
[Chromiumでは1プロセスあたりのWebGLコンテキスト数が16に制限されており](https://src.chromium.org/viewvc/blink/trunk/Source/core/html/canvas/WebGLRenderingContext.cpp?revision=149135&pathrev=149135#l87)、これを超えてWebGLコンテキストを生成しようとすると、古いコンテキストから順に無効化されていきます。

この結果、通常の手順（`canvasElement.getContext('webgl')` など）でWebGLコンテキストを生成するポストエフェクトインスタンス数が増えると、
他のポストエフェクトインスタンスが保持しているWebGLコンテキストが強制的に破棄され、ポストエフェクトが正常に動作しなくなります。

対応策として、Delirにバンドルされているポストエフェクトプラグイン内では`WebGLContextPool`を利用して、単一あるいは少数のWebGLコンテキストを複数のポストエフェクトインスタンス間で使いまわしていますが、WebGLのAPI上、コンテキストの内部に多くの状態を抱えているため、安定性が保証できない状態です。
（これらのポストエフェクトプラグインが利用していないWebGL機能を有効化した時に不安定になる気がします…）

## 解決策（検討中）
- WebGLコードを単一のWebGLコンテキストに突っ込んで結合する仕組みを入れる
  - package.jsonに`useWebGL`フラグを付与して、そのフラグが有効化されているプラグインについては
    特定のファイル、あるいはクラスプロパティからシェーダーコードを読み込み、delir-coreのパイプライン内でコンパイルする。
    （ポストエフェクトにはProgramをパスし、render内でProgramへの変数割当などを行う）
- 全ポストエフェクトで共用するThree.js Sceneオブジェクトをdelir-core内部で生成し
  ポストエフェクト内でそのSceneオブジェクトへモデルなどの追加を行う
- Chromiumの定数値を変更したコードからElectronをビルドする
