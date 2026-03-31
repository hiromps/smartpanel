# requirements.md

## Project

- Working name: SmartPanel
- Product codename for this build: SmartPanel
- Brand line: SmartPanel | SNS運用・再販管理プラットフォーム
- Planned domain: smartpanel.jp
- Build mode: production-mode MVP

## Goal

日本国内向けにローカライズされた、SMMサービス再販・運営のための管理パネル基盤を構築する。

このプロダクトは、既存SMMパネル市場の一般的な要件を参考にしつつ、独自UI・独自文言・独自設計で再構築する。
特定サービスのデザインやコピーの複製は行わない。

## Product positioning

対象ユーザー:
- SMMサービス販売事業者
- SNS関連の代理店
- リセラー運営者
- 社内運用チームを持つ中小〜中規模事業者

提供価値:
- 注文受付からプロバイダ発注までの自動化
- 料金・在庫・サービス構成の柔軟な管理
- 日本語UI、日本市場向け決済・法務文言への対応
- 顧客向けフロント、スタッフ向け管理画面、API連携を一体提供

## Non-goals

- 特定競合サイトの見た目をそのまま再現しない
- 違法または規約違反の用途を助長するコピーは採用しない
- 初期MVPでフルCMSやノーコードページビルダーを作り込まない
- 初期MVPで全世界向け150+決済をフル内製しない

## Reference-derived capability map

外部調査から抽出した重要機能カテゴリ:
- 顧客パネル
- サービス管理
- 注文処理
- 決済/入金
- プロバイダ連携
- 管理画面
- 通知
- チケットサポート
- レポート/利益分析
- 多言語/多通貨
- SEO/コンテンツ管理
- API公開（顧客向け・管理者向け）
- テーマ/ブランド設定

## MVP scope

### 1. Public / customer-facing panel
- LP / トップページ
- サインアップ
- ログイン
- パスワード再設定
- ダッシュボード
- 残高表示
- 注文作成
- 注文履歴
- 入金履歴
- チケット一覧/詳細
- プロフィール/セキュリティ設定
- 日本語UI
- レスポンシブ対応

### 2. Core ordering
- サービスカテゴリ管理
- サービス一覧表示
- サービス詳細説明
- 注文フォーム（サービスごとの必要入力差分対応）
- 単発注文
- ドリップフィード注文
- サブスクリプション注文の土台
- 注文ステータス追跡
- キャンセル可能状態の管理
- 返金処理フロー

### 3. Provider integration
- プロバイダ登録
- API資格情報管理
- サービスインポート
- 料金同期
- 最小/最大数量同期
- 注文送信
- ステータス更新同期
- 残高照会
- フォールバック/オーバーフロー発注の基礎設計

### 4. Wallet / payments
- ウォレット残高方式
- 手動入金申請
- 管理者入金承認
- 決済手段プラガブル設計
- 初期実装は日本向け優先:
  - Stripe
  - PayPal
  - 銀行振込（手動確認）
  - PayPayは後続候補として抽象化のみ
- ボーナス/手数料設定の基礎

### 5. Admin panel
- KPIダッシュボード
- ユーザー管理
- 残高調整
- サービス管理
- カテゴリ管理
- プロバイダ管理
- 注文一覧/検索/フィルタ
- チケット管理
- 入金申請処理
- 監査ログ
- システム設定

### 6. Reports
- 売上レポート
- 注文数レポート
- サービス別利益レポート
- ユーザー別売上レポート
- 入金集計

### 7. Notifications
- メール通知
- 管理者通知
- 注文/入金/チケットイベント通知
- 将来のLINE/Telegram連携を見据えたイベント設計

### 8. APIs
- Customer API v1
  - 残高取得
  - サービス一覧
  - 注文作成
  - 注文状況取得
- Admin API v1
  - 注文検索
  - ユーザー残高調整
  - サービス同期トリガ

## Phase 2 / post-MVP
- 多言語対応（英語）
- 多通貨
- アフィリエイト
- 子パネル機能
- 高度なテーマエディタ
- ブログ/SEO CMS
- 自動リフィル判定
- サブスクリプション完全版
- 高度なアクセス権限/RBAC
- 2FA強化（TOTP）
- Webhook API
- 複数決済プロバイダの自動照合

## Japanese localization requirements

- 既定言語は日本語
- 日付/通貨/数値フォーマットを日本向けに最適化
- 特商法/プライバシーポリシー/利用規約ページの雛形を準備
- 「残高」「注文」「入金」「サポート」などの用語統一辞書を持つ
- FAQ/ヘルプ文言を日本語で最初から整備
- 管理画面も日本語優先

## Roles

- Guest
- Customer
- Support staff
- Admin
- Super admin

## Functional requirements

### Auth and accounts
- Email + password login
- メール認証（初期は任意、設計は必須化可能）
- パスワードリセット
- ロールベースアクセス制御
- 将来の2FA拡張を見越した設計

### Service catalog
- サービスカテゴリCRUD
- サービスCRUD
- 価格、原価、最小数、最大数、単位、表示順、説明、ステータス
- プロバイダサービスとのマッピング
- マージン率設定
- カスタム単価

### Orders
- 注文作成
- 注文検証
- チャージ計算
- 残高引当
- プロバイダ送信
- ステータス同期
- キャンセル
- 部分完了
- 返金
- ドリップフィード
- リンク重複制御の設計余地

### Wallet and payments
- 入金申請作成
- 入金ステータス管理
- 残高加算/減算
- 手数料適用
- ボーナス適用
- 監査証跡保存

### Support
- チケット作成/返信/クローズ
- 管理画面からの返信
- 定型文の将来拡張

### Reporting
- 日次/月次売上
- サービス別利益
- プロバイダ別発注額
- ユーザーLTVの基礎集計

### Content and settings
- サイト名/ロゴ/Favicon
- カラーテーマ
- 基本SEO設定
- 静的ページ管理
- 利用規約などの法務ページ

## Non-functional requirements

- Stack: Next.js App Router + TypeScript
- UI: Tailwind CSS + component system
- DB: PostgreSQL
- ORM: Prisma
- Auth: Better Auth or NextAuth-class solution
- Queue/background jobs: Trigger.dev, BullMQ, or equivalent modular adapter
- Caching: Redis optional
- Observability: structured logs + error tracking-ready
- Testing: unit + integration + smoke E2E
- API first-class typing
- Mobile responsive
- Secure secret management

## Suggested architecture decisions

- Frontend and backend in one Next.js monorepo-friendly app for MVP
- Server Actions / Route Handlers for internal flows
- Separate domain modules:
  - auth
  - users
  - catalog
  - orders
  - providers
  - payments
  - reports
  - support
  - settings
- Provider adapters via strategy pattern
- Payment adapters via gateway abstraction
- Background sync workers for order status and provider sync

## Initial screen list

Public:
- /
- /pricing or /plans
- /services
- /faq
- /login
- /signup
- /terms
- /privacy
- /legal

Customer:
- /dashboard
- /dashboard/orders
- /dashboard/orders/new
- /dashboard/deposits
- /dashboard/tickets
- /dashboard/settings
- /dashboard/api

Admin:
- /admin
- /admin/users
- /admin/orders
- /admin/services
- /admin/categories
- /admin/providers
- /admin/payments
- /admin/tickets
- /admin/reports
- /admin/settings
- /admin/audit

## Data entities

- User
- Session
- Role
- Wallet
- WalletTransaction
- PaymentMethod
- DepositRequest
- ServiceCategory
- Service
- Provider
- ProviderService
- ProviderCredential
- Order
- OrderItemMeta
- OrderSyncLog
- Ticket
- TicketMessage
- Notification
- SiteSetting
- AuditLog
- ApiKey

## Compliance and risk notes

- 実運用前に日本法務・決済・プラットフォーム規約の確認が必要
- 反社チェック、チャージバック、返金ポリシー、商材審査の運用設計は別途必要
- 違法・不正利用対策のため、管理者によるサービス公開制御を必須とする

## Success criteria for MVP

- 管理者がカテゴリ/サービス/プロバイダを登録できる
- 顧客が入金し、注文を作成し、履歴を確認できる
- 注文がプロバイダへ自動送信され、状態同期される
- 管理者が利益と売上を最低限確認できる
- 日本語UIで違和感なく使える
- ローカル起動、DBマイグレーション、基本テストが通る

## Source notes

参考: perfectpanel.com の公開ページから抽出した一般的機能カテゴリを参照。
競合の表現やデザインの複製は避け、機能要件の抽象化のみに利用する。
