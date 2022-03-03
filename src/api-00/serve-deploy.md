# 動作確認とデプロイ

## ファイルの内容確認&解説

- 必要なファイルが準備されているので，エディタでプロジェクトのフォルダを開く．

- `functions/index.js`を開くと下記のような内容が記述されている．

- 1 行目はモジュールの読み込み．

- `helloWorld`は関数名．この関数にリクエストが来ると，`Hello from Firebase!`という文字列を返すよう記述されている．

```js
// functions/index.js
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
```

## 編集&ローカルサーバーでの動作確認

- 下記のように編集する（コメントアウト外すだけ）．

```js
// functions/index.js
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
```

- 専用コマンドが用意されているのでローカルサーバーを立ち上げる．

```bash
$ firebase serve
```

- 実行結果

```bash
=== Serving from '/Users/taroosg/Desktop/20200601cloudfunctions'...

⚠  Your requested "node" version "8" doesn't match your global version "12"
i  functions: Watching "/Users/taroosg/Desktop/20200601cloudfunctions/functions" for Cloud Functions...
✔  functions[helloWorld]: http function initialized (http://localhost:5000/cloudfunctions-3517c/us-central1/helloWorld).

```

- このとき，ローカルサーバの URL が発行されるためメモしておくことをオススメする（あとから確認もできるが煩雑なため）．

- ローカルサーバーが立ち上がったらターミナルからリクエストを送る．

- メッセージ（`Hello from Firebase!`）が返ってくれば OK！

```bash
$ curl http://localhost:5000/cloudfunctions-3517c/us-central1/helloWorld
Hello from Firebase!
```

- 確認したら`ctrl + c`でローカルサーバを停止する．

## デプロイ & 動作確認

> **【注意】**
>
> - 現在（2022/03/01 時点）で，CloudFunctions のデプロイは支払い登録が必須となっています．
>
> - Firebase のプロジェクトが無料プラン（Spark プラン）の場合はデプロイがエラーとなるため，前項のローカルサーバでの動作が確認できたら次の項目に進んでください．
>
> - 有料プラン（Blaze プラン）にアップグレードすることでデプロイできるようになるため，デプロイしたい方はプランを変更してください．

- 動作確認したらデプロイする．

- ターミナルで下記を実行．

```bash
$ firebase deploy
```

- 実行結果

```bash
=== Deploying to 'fir-todo-8868b'...

i  deploying functions
i  functions: ensuring necessary APIs are enabled...
✔  functions: all necessary APIs are enabled
i  functions: preparing functions directory for uploading...
i  functions: packaged functions (26.53 KB) for uploading
✔  functions: functions folder uploaded successfully
i  functions: creating Node.js 8 function helloWorld(us-central1)...
✔  functions[helloWorld(us-central1)]: Successful create operation.
Function URL (helloWorld): https://hogehoge.cloudfunctions.net/helloWorld

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/fir-todo-8868b/overview
```

- このとき，デプロイ先の URL（`Function URL (helloWorld):...`）が発行されるためメモしておくことをオススメする（あとから確認もできるが煩雑なため）．

- デプロイが完了したらターミナルからリクエストを送る．

- メッセージが返ってくれば OK！

```bash
$ curl https://hogehoge.cloudfunctions.net/helloWorld
Hello from Firebase!
```
