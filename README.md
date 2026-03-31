# SmartPanel

SmartPanel | SNS運用・再販管理プラットフォーム

## Status

認証・会員マイページの初期実装まで完了しています。

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
npm run prisma:seed
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認します。

## Demo account

```txt
demo@smartpanel.jp
demo1234
```

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

## Current implementation

- Next.js App Router の手動ブートストラップ
- 日本語ベースの公開トップページ
- `/services`, `/pricing`, `/faq`
- `/login`, `/signup`
- Googleログイン / メールログイン
- `/terms`, `/privacy`, `/legal`
- 顧客ダッシュボード `/dashboard`
- 注文履歴 `/dashboard/orders`
- 新規注文画面の雛形 `/dashboard/orders/new`
- 入金履歴 `/dashboard/deposits`
- サポート一覧 `/dashboard/tickets`
- APIキー一覧 `/dashboard/api`
- 管理ダッシュボード雛形 `/admin`
- feature-first を意識した初期フォルダ構成
- Prisma 初期スキーマ
- auth/role の基盤
- デモデータ seed

## Branding

- Product name: SmartPanel
- Tagline: SNS運用・再販管理プラットフォーム
- Planned domain: `smartpanel.jp`

## Notes

本プロジェクトは競合サービスの機能カテゴリを参考にしつつ、独自のUI/文言/構成で再構築します。
競合サイトのデザイン・文章の複製は対象外です。
