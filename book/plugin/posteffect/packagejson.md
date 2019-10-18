---
delir_version: Alpha.7
---

# package.json

`package.json` については[こちら](http://liberty-technology.biz/PublicItems/npm/package.json.html)をご覧ください。
ポストエフェクトの package.json では以下の指定が必須です。

- `name`: パッケージ ID（英数字とハイフン、`package-id`形式で指定可能）,
- `version`: "1.10.2" のような３つのドット区切りの数字。運用性のため[セマンティックバージョニング](https://semver.org/lang/ja/)に準拠してください。
- `author`: `"Name (URL)"`形式の文字列（`Name &lt;mail@address&gt; (URL)` のような記述も可能です）
- `engines`:
  - `@delirvfx/core`: 作成するプラグインが動作できる `@delirvfx/core` のバージョン。`0.11.x` のような指定が可能です。
- `delir`
  - `name`: プラグインの表示名。日本語が利用可能です
  - `type`: `post-effect` 固定。

## `engines.delir`

動作対象となる`@delirvfx/core`のバージョンを指定します。
（Delir のバージョンではありません。）

```json5
    "engines": {
        "@delirvfx/core": "0.11.x" // => v0.6.*　対応ポストエフェクト
    }
```

## delir

プラグインについての詳細情報を記述します。

```json5
  "delir": {
    "name": "プラグイン名",
    "type": "post-effect"
  }
```
