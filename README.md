# SmartPanel

SmartPanel | SNS運用・再販管理プラットフォーム

## Status

Milestone 1〜2 の初期土台を作成済みです。

## Documents

- `requirements.md`
- `architecture.md`
- `Rules.md`
- `TODO.md`
- `skills-plan.md`

## Planned stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Prisma
- SQLite（ローカル開発用）
- PostgreSQL（将来の本番想定）

## Product scope

- 顧客向けパネル
- 管理者向けパネル
- プロバイダAPI連携基盤
- ウォレット/入金
- 注文処理
- レポート

## Setup

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:push
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認します。

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run prisma:generate
npm run prisma:push
```

## Current implementation

- Next.js App Router の手動ブートストラップ
- 日本語ベースの公開トップページ
- `/services`, `/pricing`, `/faq`
- `/login`, `/signup`
- `/terms`, `/privacy`, `/legal`
- 顧客ダッシュボード雛形 `/dashboard`
- 管理ダッシュボード雛形 `/admin`
- feature-first を意識した初期フォルダ構成
- Prisma 初期スキーマ
- auth/role のプレースホルダ基盤

## Branding

- Product name: SmartPanel
- Tagline: SNS運用・再販管理プラットフォーム
- Planned domain: `smartpanel.jp`

## Notes

本プロジェクトは競合サービスの機能カテゴリを参考にしつつ、独自のUI/文言/構成で再構築します。
競合サイトのデザイン・文章の複製は対象外です.
