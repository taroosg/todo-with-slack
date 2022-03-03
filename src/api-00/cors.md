# CORS 対策

- ターミナルから`curl`コマンドでリクエストを送信すると正常に動作するが，クライアントアプリから`axios`などでリクエストを送信すると CORS エラーが発生する．

- アプリケーションからも利用できるように，追加のモジュールをインストールする．

```bash
$ cd functions
$ npm install cors
```

## ファイル内全ての API について CORS を許可したい場合

- 全部外部からのリクエストを許可する場合には下記のように追記すれば OK．

```js
// index.js
const functions = require("firebase-functions");
const express = require("express");
const requestPromise = require("request-promise-native");
const cors = require("cors"); // 追加

const app = express();

app.use(cors()); // 追加

const getDataFromApi = async (keyword) => {
  // 省略
};

app.get("/hello", (req, res) => {
  // 省略
});

app.get("/user/:userId", (req, res) => {
  // 省略
});

app.get("/gbooks/:keyword", async (req, res) => {
  // 省略
});

const api = functions.https.onRequest(app);
module.exports = { api };
```

## 個別の API について CORS を許可したい場合

- 全部許可せずに，指定したエンドポイントのみアクセスを許可したい場合．

- 許可したいエンドポイントだけに追記を行う．

```js
// index.js
const functions = require("firebase-functions");
const express = require("express");
const requestPromise = require("request-promise-native");
const cors = require("cors"); // 追加

const app = express();

// app.use(cors());  // 一旦コメントアウト

const getDataFromApi = async (keyword) => {
  // 省略
};

app.get("/hello", (req, res) => {
  // 省略
});

app.get("/user/:userId", (req, res) => {
  // 省略
});

// ここに`cors()`を追加
app.get("/gbooks/:keyword", cors(), async (req, res) => {
  // 省略
});

const api = functions.https.onRequest(app);
module.exports = { api };
```

- クライアントアプリケーションからリクエストを送信してデータが返ってくれば OK．
