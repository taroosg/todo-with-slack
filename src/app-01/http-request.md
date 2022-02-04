# http リクエストの実装

- 子コンポーネントに関数が渡せたが，現状では入力値に文字列を追加して出力するだけの関数である．
- そこで，指定したキーワードで Google books API からデータを取得する処理に変更する．
- http リクエストには`axios`を使用する．

## axios ライブラリのインストール

下記コマンドでインストール．

```bash
$ npm install axios
```

エラーがでなければ OK．

## リクエスト関数を実装

`App.jsx` の `getDataFromAPI` 関数を編集する．

```jsx
// App.jsx

// 🔽 追加
import axios from "axios";

// ...省略

// 🔽 getDataFromAPI 関数の内容を編集
const getDataFromAPI = async (keyword) => {
  const requestUrl = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
  const result = await axios.get(`${requestUrl}${keyword}`);
  return result;
};

// ...省略
```

※この記述だけでは動きません！！

## コンポーネントで関数を実行する（useState, useEffect）

子コンポーネントで `getDataFromAPI` 関数を実行したいが，以下 2 つの問題がある．

- 子コンポーネントは関数であるため，取得したデータを保持できない．
- データ更新時にレンダリングが再実行されるため，API リクエストが無限ループになる．

前者の問題には `useState`，後者の問題には `useEffect` という機能を使うことで対処できる．

（`useState` と `useEffect` は React の標準の機能なのでインストールなどの作業は必要ない）

`Booklist.jsx`を下記のように編集する．

```jsx
// Booklist.jsx

// 🔽 追加
import { useState, useEffect } from "react";

export const Booklist = ({ language, getData }) => {
  // 🔽 ここから追加
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const result = getData?.(language).then((response) =>
      setBookData(response)
    );
  }, [language, getData]);

  // 🔼 ここまで追加

  return (
    <>
      <p>this is {JSON.stringify(bookData)} list component</p>
    </>
  );
};
```

ブラウザで確認すると，以下のように取得したデータが文字列で表示される．

![メイン画面9](./img/mainview09.png)

## 【解説】useState

- useState は関数コンポーネントが値（今回は API から取得したデータ）を保持するための機能．

- `const [bookData, setBookData] = useState(null);` の

  - `bookData` がデータを保持するための変数名．

  - `setBookData` がデータを更新するための関数．

  - `useState(null)` の `null` が `bookData` の初期値．

- `setBookData(最新の値)` のように記述することで， `bookData` の値が最新の値に更新される．

- `bookData` に保存した内容を表示したいときなどは通常の変数のように扱えば OK．

## 【解説】useEffect

- 関数外の副作用（外部からのデータ取得や DOM の更新など）を扱うための機能．

- React では，コンポーネント内でデータの更新があると再レンダリングされるため，API からデータを取得すると毎回レンダリングが発生して無限ループとなってしまう．

- useEffect はレンダリングを制限し，特定の値が更新されたときのみ処理が実行されるようにしてくれる機能．

- 書式は以下のような感じ．

```jsx
useEffect(() => {
  実行したい処理
}, [ここに書いた値（今回は`language`と`getData`）が更新されたときのみ，上の{}内が実行される．ここに値を書くときは配列で書く]);
```

> **💡 Key Point**
>
> `useState` と `useEffect` 以外にも hooks には便利な機能が存在する．
>
> まずはこの 2 つを使うことで多くの処理を実装可能であるため，まずはこの 2 つを扱えるようになろう．
