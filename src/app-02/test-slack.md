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

```
