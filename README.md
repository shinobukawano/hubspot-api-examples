# HubSpot API サンプルコード

## 前提条件
サンプルコードを動作させるためには下記のソフトウェアが必要です。

- [Node.js](https://nodejs.org/en/) (>=10) と [yarn](https://yarnpkg.com/en/docs/install#mac-stable) または [NPM](https://www.npmjs.com/get-npm)

サンプルアプリを動作させるためには下記のソフトウェアが必要です。

- [MongoDB Community Edition](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) (>=4)

またアプリをHubSpotのポータルにインストールするためには「スーパー管理者」権限が必要です。

## 利用手順

依存パッケージをインストールします

    $ yarn install

.envファイルにAPIキーの値を追加します

    API_KEY='XXXX-XXXX-XXXX-XXXX'

ターミナルでコマンドを入力してスクリプトを実行します

    $ node scripts/contacts.js create

## アプリ利用手順

依存パッケージをインストールします

    $ cd app
    $ yarn install

appディレクトリ配下の.envファイルにHubSpotアプリの値を追加します

    APP_ID='XXXXXX'
    APP_CLIENT_ID='XXXXXXX'
    APP_CLIENT_SECRET='XXXXXXX'
    EVENT_TYPE_ID='XXXXXX'
    SERVER_URL='http://localhost:3000'

ターミナルからアプリを起動します

    $ yarn start
    > [2019-04-28T23:59:44.055] [INFO] app - Listening on http://localhost:3000

ブラウザで「http://localhost:3000/install」を開き、アプリをインストールして下さい。

### エンドポイントURL

HubSpotアプリのインストール

    $ curl http://localhost:3000/install

メールアドレスを利用してコンタクトを取得

    $ curl http://localhost:3000/hubid/5820265/contact/bh@hubspot.com

メールアドレスを利用してコンタクトを作成（または更新）

    $ curl http://localhost:3000/hubid/5820265/contact/bh@hubspot.com -X POST -H "Content-Type: application/json" -d '{"properties":[{"property":"date_of_recent_login_mobile_app","value":"1556668800000"}]}'

タイムラインイベントを作成

    $ curl http://localhost:3000/hubid/5820265/timeline/bh@hubspot.com -X PUT

### Herokuへのデプロイ

HerokuにアプリをデプロイするためのGitリポジトリを作成

    $ cd app
    $ git init

ターミナルからHerokuにログイン

    $ heroku login

以下のコマンドでHerokuにアプリを作成。引数で任意のアプリ名を指定可能です

    $ heroku create ${your_favorite_app_name}
    > Creating ⬢ hubspot-api-sample-app... done
    > https://myapp.herokuapp.com/ | https://git.heroku.com/apac-se-offsite.git

MongoDBアドオンを追加

    $ heroku addons:create mongolab:sandbox
    > Created mongolab-rigid-52142 as MONGODB_URI

.envファイルの「SERVER_URL」の値を作成したアプリのURLに変更

    SERVER_URL='https://hubspot-api-sample-app.herokuapp.com'

下記のコマンドでコードをコミットしHerokuにプッシュします

    $ git add .; git commit -m"Updated"; git push heroku master;
    > remote: Compressing source files... done.
    > remote: Building source:
    > ...
    > remote: -----> Launching...
    > remote:        Released v3
    > remote:        https://myapp.herokuapp.com/ deployed to Heroku
    > remote:
    > remote: Verifying deploy... done.

下記のコマンドでアプリを開きます

    $ heroku open

## 著作権

HubSpot Japan株式会社
