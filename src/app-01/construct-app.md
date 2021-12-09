# アプリケーション実装の準備

## 必要なツールのバージョン確認

- Node.js と npm が必要なので，以下のコマンドで状況を確認する．
- バージョンが表示されれば OK．

```bash
$ node -v
v14.15.3
$ npm -v
7.15.0
```

## プロジェクトの作成

- React はプロジェクト単位でアプリケーションを開発する．
- 専用のコマンドが用意されているので，以下のようにプロジェクトを作成する．
- `npx`を使用すると，インストールしていないパッケージを実行できる．グローバルに残らないので，汚染の心配がない．
- 最後の`react-app`はプロジェクト名なので好きな名前で OK．

```bash
$ npx create-react-app react-app
```

※`npm`ではなく`npx`である点に注意！

いい感じにできたら，以下のコマンドでディレクトリに移動し，サーバを起動する．

```bash
$ cd react-app
$ npm start
```

自動的にブラウザが立ち上がり，以下のような画面が表示されれば OK．

![初期画面の画像](./img/firstview.png)

サーバはターミナル上で`control + c`すると停止できる．


>**💡 Key Point**
>
>React の開発手順について
>
>- `npm start`を実行した状態でファイルを編集すると自動的にコンパイルが行われ，最新の状態がブラウザ画面に反映される．
>- `npm start`実行 -> vs code でコード編集 -> ブラウザで動作確認 の繰り返し．
>- ライブラリ追加時などはサーバを再起動しないと反映されないため．動作しない場合は`control + c`して再度`npm start`でサーバを起動する．


## React の大まかな仕組み

- アプリケーションは全て`public/index.html`上で実行される．
- 実行時には`src/index.js`が実行され，`App`コンポーネントが`index.html`上にマウントされる．
- 実際に画面に表示されるのは`App.js`内に記述された内容となる．
- この`App.js`から様々なコンポーネントを読み込むことでアプリケーションが動作する．


## メイン画面の編集と不要なファイルの削除

メインの画面は`App.js`であり，このファイルが`index.html`の`id=root`に描画される．

初期状態では`App.js`に不要な記述が含まれているため削除する．合わせて使用しないファイルも削除する．

`App.js`のファイル名を`App.jsx`に変更し，内容を以下のように編集する．

```jsx
// App.jsx
import React from "react";

const App = () => {
  return (
    <>
      <h1>react app</h1>
    </>
  );
};
export default App;
```

以下のファイルを削除する．

- `src/App.css`
- `src/App.test.js`
- `src/logo.svg`

また，`index.js`の内容を以下のように編集する．

```js
// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

```

以下のコマンドで開発サーバを起動する．

```bash
$ npm start
```

ブラウザ画面を確認すると以下のようになっている．
![メイン画面1](./img/mainview01.png)


>【補足】js と jsx
>
>- js：Javascript のファイル．
>- jsx：React 要素を生成する Javascript の拡張．React ではこちらを使うとたくさんいいことがある．
