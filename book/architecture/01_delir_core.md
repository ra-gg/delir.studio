---
delir_version: Alpha.6
---

# delir-core

delir-core は Delir のうちのプロジェクトスキーマの定義・レンダリングフローの制御をメインに担当するモジュールです。
単体の Node モジュールとして書かれているため、Delir 外から利用することが可能です。（ただし、DOM API に依存しているため Node.js 上で利用することは出来ません）

# DelirCore.Engine

Engine 名前空間にはレンダリングに関わるコンポーネントが内包されています。
この名前空間はさらに`Pipeline`と`Renderer`に分かれています。

## DelirCore.Engine.Pipeline

レンダリングフローを制御するエンジンです。

# DelirCore.Project

（あとで書く）

# DelirCore.Helper

（あとで書く）
