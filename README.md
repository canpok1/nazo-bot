# nazo-gm

Discordに集まって謎解きに挑戦する際の各種雑務を行うためのボット

## 機能

- チーム分け機能
    - ボイスチャンネルに参加しているメンバーを指定の数のチームに振り分けます。
    - コマンド: `!team {ボイスチャンネル名} {チーム数}`
        - (例)チャンネル1のメンバーを2チームに分ける場合 `!team チャンネル1 2`

## Discordへのボット登録方法

1. [Discord Developer Portal](https://discord.com/developers/applications)にアクセス。
2. `New Application` ボタンからボット用のアプリケーションを作成する。
3. 手順2で作成したアプリケーションの `Bot` メニューを開く。
4. `Add Bot` ボタンからボットを作成する。
5. アプリケーションの `OAuth2` メニューを開く。
6. 下記にチェックを入れ、生成されるURLをコピー。
    - `SCOPES` の `bot`
    - `BOT PERMISSIONS` の `Send Messages`
7. コピーしたURLをブラウザで開き、画面に従って登録。
8. DiscordのサーバーのメンバーとしてBotが表示されればOK。

## 動作方法

1. 本リポジトリをローカル環境にCloneする。
2. VSCode の `Remote Containers` で開く。
3. 下記コマンドで起動する。
    - `DISCORD_BOT_TOKEN={トークン} node app.js`
    - `{トークン}` は [Discord Developer Portal](https://discord.com/developers/applications)からコピーした値に置き換えること。
        - アプリケーションの `Bot` メニュー内の `TOKEN` を参照

## 本番環境

- [heroku](https://dashboard.heroku.com/apps/nazo-gm)にて常時稼働中。
    - 一定時間アクセスがない場合は自動停止する。
    - 停止中の場合、[ボットの起動ページ](https://nazo-gm.herokuapp.com/)にアクセスして立ち上げる必要がある。
    - masterブランチが更新されると自動デプロイされる。
