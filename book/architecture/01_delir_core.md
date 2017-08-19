# delir-core
delir-coreはDelirのうちのプロジェクトスキーマの定義・レンダリングフローの制御をメインに担当するモジュールです。
単体のNodeモジュールとして書かれているため、Delir外から利用することが可能です。（ただし、DOM APIに依存しているためNode.js上で利用することは出来ません）

# DelirCore.Engine
Engine名前空間にはレンダリングに関わるコンポーネントが内包されています。
この名前空間はさらに`Pipeline`と`Renderer`に分かれています。

## DelirCore.Engine.Pipeline
レンダリングフローを制御するエンジンです。

# DelirCore.Project
（あとで書く）

# DelirCore.Helper
（あとで書く）
