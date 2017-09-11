# ポストエフェクト
ポストエフェクトプラグインでは、レンダラーによってレンダリングされた画素情報を加工することが出来ます。

[サンプルプロジェクト(GitHub)](https://github.com/Ragg-/Delir/tree/master/src/delir-core/plugin-example)
[プロジェクトテンプレートをダウンロード](https://github.com/Ragg-/Delir/files/906748/plugin-example-88bd02b.zip)

**注意**
> v0.4.0 現在、ポストエフェクトは試験的な機能です。
> Canvas 2D Context によるポストエフェクトは安定して利用できますが、WebGLの利用については不安定です。
> 詳しくは [実験的機能](/plugin/01_03_experimental.md) をご参照ください。


## 開発のはじめ方
- **事前に`Node.js`と`yarn`のインストールが必要です。**
- 開発にはVisualStudio Codeの使用をおすすめします。

プラグインテンプレートをダウンロードし、以下の場所にフォルダごと展開しましょう。
（delir/plugins/プラグイン名/package.json が存在するようにしてください）

Windows: `%AppData%\delir\plugins`
macOS: `$HOME/Library/Application\ Support/delir/plugins/`

テンプレートを展開したら、コマンドラインから展開したプラグインフォルダへ移動(cd)して
以下のコマンドを実行してください

``` sh
yarn install # 依存モジュールをインストールする
yarn dev # 更新監視モードで開発を始める（コードを書き換えると自動的にコンパイルが行われる）
```

## サンプルプロジェクトのファイル構造
- package.json - プラグイン情報を記述
- src - プラグインのコンパイル前ソースコード
    - index.ts - エントリポイントになるファイル。ここにレンダリング処理を記述します。
- dist - コンパイル後コードの出力先
