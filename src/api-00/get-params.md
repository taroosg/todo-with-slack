# Express での値の受け取り

## URL のパラメータ取得

- `/user/:userId`のように記述すると，値を受け取ることができる．

- 例えば，`https://hogehoge.cloudfunctions.net/api/user/2`のようにリクエストを送信すると，Express では`2`の文字列を取得することができる．

- Express 内では`req.params.userId`のように取得する．

- `index.js`を以下のように編集する．

```js
const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello Express!");
});

// ↓↓↓ エンドポイントを追加 ↓↓↓
app.get("/user/:userId", (req, res) => {
  const users = [
    { id: 1, name: "ジョナサン" },
    { id: 2, name: "ジョセフ" },
    { id: 3, name: "承太郎" },
    { id: 4, name: "仗助" },
    { id: 5, name: "ジョルノ" },
  ];
  // req.params.userIdでURLの後ろにつけた値をとれる．
  const targetUser = users.find(
    (user) => user.id === Number(req.params.userId)
  );
  res.send(targetUser);
});

// 以降変更なし
const api = functions.https.onRequest(app);
module.exports = { api };
```

## 動作確認

- まずはローカルサーバーで動作確認

```bash
$ firebase serve
```

- ユーザ ID を指定してリクエスト送信

```bash
curl http://localhost:5000/cloudfunctions-3517c/us-central1/api/user/3
{"id":3,"name":"承太郎"}
```

> 無料プランの場合はデプロイは飛ばしてください．

- 動作を確認したらデプロイ

```bash
$ firebase deploy
```

- デプロイしたらリクエスト送信

```bash
$ curl https://hogehoge.cloudfunctions.net/api/user/2
{"id":2,"name":"ジョセフ"}
$ curl https://hogehoge.cloudfunctions.net/api/user/5
{"id":5,"name":"ジョルノ"}
```

レスポンスが返ってくれば動作 OK．
