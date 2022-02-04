# コンポーネントの最適化

各 todo の内容はシンプルなのでこのままでも問題ないが，より複雑な情報を扱う場合には個別のコンポーネントに分けることが望ましい．

また，todo リストのアプリケーションなので，完了未完了が区別できるようチェックボックスを追加する．

## 必要なファイルの準備

`src/components`フォルダの中に各 todo を表示する`Todo.jsx`を作成する．

以下の内容を記載する．

```js
// src/components/Todo.jsx

export const Todo = () => {
  return (
    <li>
      <p>deadline todo by user_id at created_at and updated_at</p>
    </li>
  );
};
```

## 一覧画面の編集

`TodoIndex.jsx`を以下のように編集する．

```js
import { useState, useEffect } from "react";
import axios from "axios";
// ↓ 追加
import { Todo } from "../components/Todo";

export const TodoIndex = () => {
  // 省略

  // ↓ 編集
  return (
    <ul>
      {todoList?.map((x) => (
        <Todo
          id={x.id}
          todo={x.todo}
          deadline={x.deadline}
          is_done={x.is_done}
          user_id={x.user_id}
          created_at={x.created_at}
          updated_at={x.updated_at}
        />
      ))}
    </ul>
  );
};
```

## 個別ツイートコンポーネントの実装

`Todo.jsx`コンポーネントを以下のように編集する．

このコンポーネントは`id`，`todo`， `deadline`, `is_done`, `user_id`，`created_at`，`updated_at`の 7 つのパラメータを入力することとする．

```js
// src/components/Todo.jsx

export const Todo = ({
  id,
  todo,
  deadline,
  is_done,
  user_id,
  created_at,
  updated_at,
}) => {
  return (
    <li key={id} id={id}>
      <input type="checkbox" checked={is_done} />
      <p>
        {deadline} {todo} by {user_id} at {created_at} and {updated_at}
      </p>
    </li>
  );
};
```

## 動作確認

これまでと同様に todo の一覧が表示されれば OK．
