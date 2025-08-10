# my_static-page-002

[![CI](https://github.com/komiyamma/my-static-page-003/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/komiyamma/my-static-page-003/actions/workflows/ci.yml)

Vanilla JS + React site with Firebase.

## Stack

- React (without CRA; bundler: Vite)
- Vanilla JS utilities
- Firebase App Hosting (Node container + Express static server)

## Getting Started

Initialize Git and install Node.js LTS (>=18). Project scaffolding will be added next.

## Develop

- 開発サーバ: `npm run dev`
- 本番ビルド: `npm run build`
- ローカル実行（本番想定）: `npm start`

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
