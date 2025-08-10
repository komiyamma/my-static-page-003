# my_static-page-002

[![CI](https://github.com/komiyamma/my-static-page-003/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/komiyamma/my-static-page-003/actions/workflows/ci.yml)
[![pkg.json version](https://img.shields.io/github/package-json/v/komiyamma/my-static-page-003?label=app%20version&logo=nodedotjs)](https://github.com/komiyamma/my-static-page-003/blob/main/package.json)
[![release](https://img.shields.io/github/v/release/komiyamma/my-static-page-003?sort=semver&display_name=tag&logo=github)](https://github.com/komiyamma/my-static-page-003/releases)

Vanilla JS + React + Firebase を用いたシンプルなサンプルアプリです。

## 技術スタック

- React（CRA なし、ビルドは Vite）
- Vanilla JS のユーティリティ
- Firebase App Hosting（Node コンテナ + Express の静的配信）

## セットアップ

前提: Node.js 18 以上

インストール（初回のみ）:

```bash
npm ci
```

## 開発

- 開発サーバ起動: `npm run dev`
- 本番ビルド: `npm run build`
- ローカル実行（本番想定）: `npm start`

### デバッグ（VS Code）

- F5 で Vite の開発サーバが起動し、Chrome デバッガが自動で接続します。

### テスト

- 実行: `npm run test`
- 対話 UI: `npm run test:ui`

## CI（GitHub Actions）

`main` への push / PR 時に Vitest が自動実行されます。上部のバッジで最新ステータスを確認できます。

## Firebase App Hosting

1) Firebase CLI の用意（未導入の場合）
   - `npm i -g firebase-tools` または `npx firebase-tools@latest --help`
2) ログイン / プロジェクト選択
   - `firebase login`
   - `firebase projects:list`
3) 初期化（App Hosting）
   - `firebase init` で App Hosting を選び、既存プロジェクトを関連付け
     - 対話で Dockerfile を利用したデプロイ（Node コンテナ）を選択
4) デプロイ
   - `firebase deploy`（または `firebase deploy --only apphosting`）

初期化の過程で `firebase.json` / `.firebaserc` が生成されます。既存の Dockerfile はそのまま利用できます。
