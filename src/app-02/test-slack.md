# Slack 連携機能のテスト画面実装

テスト画面つくる

`TestSlack.jsx` 作成．

ルーティング追加・

```js
// src/App.jsx

// 省略

<BrowserRouter>
  <h1>Todoリストアプリケーション</h1>
  <ul>
    <li>
      <Link to="/todo/index">todo 一覧（全件）</Link>
    </li>
    <li>
      <Link to="/todo/today">todo 一覧（本日）</Link>
    </li>
    <li>
      <Link to="/todo/post">todo 入力</Link>
    </li>
    <li>
      <Link to="/test-slack">test slack</Link>
    </li>
  </ul>
  <hr />
  <Routes>
    <Route path="/todo/index" element={<TodoIndex />} />
    <Route path="/todo/today" element={<TodoToday />} />
    <Route path="/todo/post" element={<TodoPost />} />
    <Route path="/test-slack" element={<TestSlack />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

```js
// src/pages/TestSlack.jsx

import axios from "axios";

export const TestSlack = () => {
  const postAllTodo = async () => {
    const result = await axios.get("http://localhost:3001/slack");
    console.log(result);
    return result;
  };

  const postTodayTodo = async () => {
    const result = await axios.get("http://localhost:3001/slack/today");
    console.log(result);
    return result;
  };

  return (
    <>
      <button type="button" onClick={postAllTodo}>
        All
      </button>
      <button type="button" onClick={postTodayTodo}>
        Today
      </button>
    </>
  );
};
```
