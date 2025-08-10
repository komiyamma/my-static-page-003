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

前提: Node.js 22 以上

インストール（初回のみ）:

```bash
npm ci
```

## 開発

- 開発サーバ起動（Vite）: `npm run dev`
- 本番ビルド（Vite）: `npm run build`
- 本番ビルド内容のプレビュー（Vite）: `npm run preview`

### デバッグ（VS Code）

- F5 で Vite の開発サーバが起動し、Chrome デバッガが自動で接続します。

### テスト

- 実行: `npm run test`
- 対話 UI: `npm run test:ui`

## CI（GitHub Actions）

`main` への push / PR 時に Vitest が自動実行されます。上部のバッジで最新ステータスを確認できます。

## Firebase App Hosting（任意）

- Firebase CLI を用意し、既存プロジェクトに関連付けて App Hosting を設定してください。
- このリポジトリには `firebase.json` と Dockerfile が含まれており、App Hosting でのデプロイに対応できます。
- 具体的なセットアップ・デプロイ手順は Firebase 公式ドキュメントをご参照ください。
