# todo 更新処理の作成

## 更新処理の追加

更新の処理を追加する．

```js
// src/components/Todo.jsx

import axios from "axios";

export const Todo = ({
  hoge,
  id,
  todo,
  deadline,
  is_done,
  user_id,
  created_at,
  updated_at,
  getData,
}) => {
  const updateTodoData = async (params) => {
    const {
      id: {},
      ...data
    } = params;
    const newData = { ...data, ...{ is_done: is_done ? false : true } };
    const requestUrl = "http://localhost:3001/todo";
    const updatedData = await axios.put(`${requestUrl}/${params.id}`, newData);
    const result = await getData();
    return updatedData;
  };

  return (
    <li key={id} id={id}>
      {/* 🔽 編集 */}
      <input
        type="checkbox"
        checked={is_done}
        onChange={() =>
          updateTodoData({ id, todo, deadline, is_done, user_id })
        }
      />
      <p>
        {deadline} {todo} by {user_id} at {created_at} and {updated_at}
      </p>
    </li>
  );
};
```

更新処理終了後には最新のデータを取得する必要があるので，一覧画面表示から関数を入力する．

```js
// src/pages/TodoIndex.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../components/Todo";

export const TodoIndex = () => {
  // 省略

  return (
    <ul>
      {todoList?.map((x, i) => (
        <Todo
          hoge={i}
          id={x.id}
          todo={x.todo}
          deadline={x.deadline}
          is_done={x.is_done}
          user_id={x.user_id}
          created_at={x.created_at}
          updated_at={x.updated_at}
          // 🔽 追加
          getData={getAllTodo}
        />
      ))}
    </ul>
  );
};
```

## 動作確認

チェックボックスをクリックし，切り替われば OK！

Supabase の管理画面でもデータ（is_done）が更新されていることを確認する．
