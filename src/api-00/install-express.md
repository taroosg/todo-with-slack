# Express の導入

- Express は Node.js のフレームワーク．

- API のエンドポイントを手軽に実装できるので便利．

- 下記コマンドを実行してインストールする．

- 【重要】`functions`フォルダに移動しておく．

```bash
$ cd functions
$ npm install express
```

- インストールが終わったら index.js を編集する．

- `app.get()`で API エンドポイントを定義．

- `/hello`がエンドポイントの URL．リクエスト時に動作させたい関数のエンドポイントを指定する．

```js
// index.js

const functions = require("firebase-functions");
// Expressの読み込み
const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  // レスポンスの設定
  res.send("Hello Express!");
});

// 出力
const api = functions.https.onRequest(app);
module.exports = { api };
```

## 動作確認

- 保存したら動作確認．

```bash
$ firebase serve
=== Serving from '/Users/taroosg/Desktop/20200601cloudfunctions'...

⚠  Your requested "node" version "8" doesn't match your global version "12"
i  functions: Watching "/Users/taroosg/Desktop/20200601cloudfunctions/functions" for Cloud Functions...
✔  functions[api]: http function initialized (http://localhost:5000/cloudfunctions-3517c/us-central1/api).

```

- ターミナルからリクエストを送る．

```bash
$ curl http://localhost:5000/cloudfunctions-3517c/us-central1/api/hello
Hello Express!
```

> 無料プランの場合はデプロイは飛ばしてください．

- 確認したらデプロイ．

- `helloworld`関数を削除していいかどうか訊かれたら yes で OK．

```bash
$ firebase deploy
? Would you like to proceed with deletion? Selecting no will continue the rest o
f the deployments. Yes
i  functions: deleting function helloWorld(us-central1)...
✔  functions[helloWorld(us-central1)]: Successful delete operation.
✔  functions[api(us-central1)]: Successful create operation.
Function URL (api): https://hogehoge.cloudfunctions.net/api

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/fir-todo-8868b/overview
```

- デプロイが完了しいたらリクエストしてみる．

```bash
$ curl https://hogehoge.cloudfunctions.net/api/hello
Hello Express!
```

これで動作 OK！
