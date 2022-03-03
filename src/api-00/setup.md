# 環境構築

## 必要なツールのバージョン確認

- Node.js と npm が必要なので，以下のコマンドで状況を確認する．

- バージョンが表示されれば OK．

```bash
$ node -v
v16.13.0
$ npm -v
8.1.0
```

## Firebase のプロジェクト作成

- Firebase のコンソールにログインし，新規プロジェクトを作成する．

- プロジェクト名は任意（今回は`20200601-functions`）．

- DB などは特に設定しなくて OK（下記画面が表示された段階で OK）．

![firebaseプロジェクト画面](./images/project_view01.png)

## Fiirebase を扱うツールのインストール

- firebase 関連のコマンドを実行するため，下記のコマンドでインストールする．

- `-g`をつけてグローバルにインストールする．

- すでにインストールしている場合も，下記コマンドで最新版にアップデートできるため必ず行う．

```bash
$ npm install -g firebase-tools
```

実行結果

```bash
+ firebase-tools@8.9.0
added 592 packages from 360 contributors in 17.497s
```

【注意】バージョンが`8.4.0`の場合は後々エラーが発生して先へ進めなくなるので必ず`8.4.1`以上にしておくこと．

## 雛形の作成

- 適当な場所にディレクトリを作成し，ターミナルで移動して必要なファイルを準備する．

- 今回は例としてデスクトップに`20200601cloudfunctions`ディレクトリを作成する．

- 下記コマンドを順番に実行．

```bash
$ cd ~/Desktop
$ mkdir 20200601cloudfunctions
$ cd 20200601cloudfunctions
$ firebase init
```

- 下記エラーが表示された場合はログインする．

```bash
Error: Failed to authenticate, have you run firebase login?
```

- 下記コマンドでログイン．

```bash
$ firebase login
```

- `firebase init`がうまくいくと選択肢が出るので，十字キーで`Functions`を選択してスペースキーでチェックを入れる（下図参照）．

- チェックを入れたら Enter．

```bash
? Which Firebase CLI features do you want to set up for this folder? Press Space
 to select features, then Enter to confirm your choices.
 ◯ Database: Deploy Firebase Realtime Database Rules
 ◯ Firestore: Deploy rules and create indexes for Firestore
❯◉ Functions: Configure and deploy Cloud Functions
 ◯ Hosting: Configure and deploy Firebase Hosting sites
 ◯ Storage: Deploy Cloud Storage security rules
 ◯ Emulators: Set up local emulators for Firebase features
```

- 続いて，以下の選択肢が表示される．

- `Use an existing project`を選択して Enter．

```bash
? Please select an option: (Use arrow keys)
❯ Use an existing project
  Create a new project
  Add Firebase to an existing Google Cloud Platform project
  Don't set up a default project
```

- プロジェクトの選択肢が出るので，上で作成したプロジェクトを選択して Enter．

```bash
? Select a default Firebase project for this directory:
  hoge-c83e4 (hoge)
  hoge-791f2 (hogehoge)
  fuga-813c6 (fuga)
❯ functions-69daf (20200601-functions)
  hoge-216007 (hogefuga)
  piyo (piyo)
  hogefuga (hoge-fuga)
```

- 選択肢が出るので，`JavaScript`を選択して Enter．

```bash
? What language would you like to use to write Cloud Functions? (Use arrow keys)

❯ JavaScript
  TypeScript
```

- 以降は下のような感じ．

```bash
? Do you want to use ESLint to catch probable bugs and enforce style? No
✔  Wrote functions/package.json
✔  Wrote functions/index.js
✔  Wrote functions/.gitignore
? Do you want to install dependencies with npm now? Yes
...
i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...
i  Writing gitignore file to .gitignore...

✔  Firebase initialization complete!
```

これで準備完了！
