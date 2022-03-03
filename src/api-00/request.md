# http リクエストの実装

- リクエスト受信時に値を取得できたので，取得した値を用いて Node.js から外部の API にリクエストを送る．

- 例によって Google books API を利用する．

- Node.js から API へリクエストを送信することで，クライアントアプリケーションの処理を単純にすることができる．

- web アプリでもネイティブアプリでも，Node.js のエンドポイントにリクエストを送信するだけで良い．

## 必要なモジュールのインストール

- Node.js の標準機能でも http リクエストを行えるが，記述が煩雑になるので`request`モジュールを利用する．

- ついでに Promise を扱える`request-promise-native`もインストールする．

- 下記コマンドでインストール．

```bash
$ cd functions
$ npm install request
$ npm install request-promise-native
```

## リクエスト送信処理の追加

- Google books API へのリクエスト関数を定義．

- エンドポイントを追加し，関数を実行．

- API からのレスポンスをクライアントへ送信する．

- `index.js`を下記のように編集．

```js
// index.js
const functions = require("firebase-functions");
const express = require("express");
const requestPromise = require("request-promise-native"); // 追加

const app = express();

// APIにリクエストを送る関数を定義
const getDataFromApi = async (keyword) => {
  // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
  const requestUrl =
    "https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:";
  const result = await requestPromise(`${requestUrl}${keyword}`);
  return result;
};

app.get("/hello", (req, res) => {
  res.send("Hello Express!");
});

app.get("/user/:userId", (req, res) => {
  // 省略
});

// エンドポイント追加
app.get("/gbooks/:keyword", async (req, res) => {
  // APIリクエストの関数を実行
  const response = await getDataFromApi(req.params.keyword);
  res.send(response);
});

const api = functions.https.onRequest(app);
module.exports = { api };
```

## 動作確認&デプロイ

- ローカルサーバーで確認．

```bash
$ firebase serve
```

- リクエスト送信（例として`keyword`に`node.js`を指定）

```bash
$ curl http://localhost:5000/cloudfunctions-3517c/us-central1/api/gbooks/node.js
↓のようなJSONデータがたくさん返ってくればOK
{
  "kind": "books#volume",
  "id": "fOgtAgAAQBAJ",
  "etag": "McoTnjan+uE",
  "selfLink": "https://www.googleapis.com/books/v1/volumes/fOgtAgAAQBAJ",
  "volumeInfo": {
    "title": "Mastering Node.js",
    "authors": [
      "Sandro Pasquali"
    ],
    "publisher": "Packt Publishing Ltd",
    "publishedDate": "2013-11-25",
    "description": "This book contains an extensive set of practical examples and an easy-to-follow approach to creating 3D objects.This book is great for anyone who already knows JavaScript and who wants to start creating 3D graphics that run in any browser. You don’t need to know anything about advanced math or WebGL; all that is needed is a general knowledge of JavaScript and HTML. The required materials and examples can be freely downloaded and all tools used in this book are open source.",
    "industryIdentifiers": [
      {
        "type": "ISBN_13",
        "identifier": "9781782166337"
      },
      {
        "type": "ISBN_10",
        "identifier": "1782166335"
      }
    ],
    "readingModes": {
      "text": true,
      "image": true
    },
    "pageCount": 346,
    "printType": "BOOK",
    "categories": [
      "Computers"
    ],
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "2.2.2.0.preview.3",
    "panelizationSummary": {
      "containsEpubBubbles": false,
      "containsImageBubbles": false
    },
    "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/content?id=fOgtAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=fOgtAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.co.jp/books?id=fOgtAgAAQBAJ&printsec=frontcover&dq=intitle:node.js&hl=&cd=10&source=gbs_api",
    "infoLink": "https://play.google.com/store/books/details?id=fOgtAgAAQBAJ&source=gbs_api",
    "canonicalVolumeLink": "https://play.google.com/store/books/details?id=fOgtAgAAQBAJ"
  },
  "saleInfo": {
    "country": "JP",
    "saleability": "FOR_SALE",
    "isEbook": true,
    "listPrice": {
      "amount": 3299,
      "currencyCode": "JPY"
    },
    "retailPrice": {
      "amount": 2969,
      "currencyCode": "JPY"
    },
    "buyLink": "https://play.google.com/store/books/details?id=fOgtAgAAQBAJ&rdid=book-fOgtAgAAQBAJ&rdot=1&source=gbs_api",
    "offers": [
      {
        "finskyOfferType": 1,
        "listPrice": {
          "amountInMicros": 3299000000,
          "currencyCode": "JPY"
        },
        "retailPrice": {
          "amountInMicros": 2969000000,
          "currencyCode": "JPY"
        }
      }
    ]
  },
  "accessInfo": {
    "country": "JP",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
      "isAvailable": true
    },
    "pdf": {
      "isAvailable": true
    },
    "webReaderLink": "http://play.google.com/books/reader?id=fOgtAgAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
  },
  "searchInfo": {
    "textSnippet": "This book contains an extensive set of practical examples and an easy-to-follow approach to creating 3D objects.This book is great for anyone who already knows JavaScript and who wants to start creating 3D graphics that run in any browser."
  }
}
```

> 無料プランの場合はデプロイは飛ばしてください．

- 動作確認したらデプロイ

```bash
$ firebase deploy
```

- ターミナルからリクエストを送る．

- ローカルサーバのときと同様にいろいろ返ってくれば OK！

```bash
$ curl https://hogehoge.cloudfunctions.net/api/gbooks/react
うまくいっていればJSONデータが返ってくる
```
