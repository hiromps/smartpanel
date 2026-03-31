# architecture.md

## Overview

日本向けSMMパネル基盤を、Next.js中心のフルスタック構成で実装する。
MVPは単一アプリで速度優先、ただしドメイン分離とアダプタ設計により将来の分割に耐える構造にする。

## Core stack

- Framework: Next.js 15+ App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Components: shadcn/ui ベース
- Database: PostgreSQL
- ORM: Prisma
- Auth: Better Auth 系または同等
- Validation: Zod
- Tables/forms: TanStack Table / React Hook Form
- Background jobs: BullMQ or Trigger.dev abstraction
- Cache / queue infra: Redis
- Charts: Recharts
- Testing: Vitest + Playwright

## High-level modules

### 1. Web app
- Public marketing pages
- Customer dashboard
- Admin dashboard
- API docs page

### 2. Application backend
- Route Handlers
- Server Actions
- Domain services
- Repositories
- Adapter layer

### 3. Background workers
- Provider sync worker
- Order status refresh worker
- Deposit reminder / reconciliation worker
- Notification dispatcher

### 4. External integrations
- Provider APIs
- Payment gateways
- Email delivery
- Analytics hooks

## Domain boundaries

### auth
- sign up / sign in
- session handling
- role checks
- api key management

### users
- profile
- role
- discounts
- allowed payment methods
- status / suspension

### catalog
- category management
- service management
- provider mapping
- pricing rules

### orders
- order creation
- balance charging
- provider dispatch
- status normalization
- cancellation / refund rules
- drip-feed scheduling hooks

### providers
- provider connection
- provider service import
- provider balance sync
- provider order API abstraction

### payments
- wallet transactions
- manual deposits
- gateway callbacks
- bonus / fee rules

### support
- tickets
- ticket messages
- status and assignee

### reports
- revenue aggregates
- profit aggregates
- provider cost metrics
- dashboard KPIs

### settings
- site branding
- localization strings
- SEO basics
- legal pages

## Suggested folder structure

```txt
src/
  app/
    (public)/
    (auth)/
    dashboard/
    admin/
    api/
  components/
    ui/
    shared/
    dashboard/
    admin/
  features/
    auth/
    users/
    catalog/
    orders/
    providers/
    payments/
    reports/
    support/
    settings/
  lib/
    auth/
    db/
    queue/
    email/
    utils/
    permissions/
  server/
    services/
    repositories/
    adapters/
    jobs/
  types/
  hooks/
  config/
prisma/
  schema.prisma
```

## Database design principles

- 監査性の高いイベント/取引系データは削除せず論理管理を優先
- WalletTransaction を残高の唯一の監査可能ソースにする
- Order は provider status と internal status を分ける
- Service は販売情報と provider mapping を分離
- SiteSetting は typed key-value ではなく、用途別テーブルまたは厳密JSON schemaを採用

## Key entities and relations

- User 1:1 Wallet
- User 1:N Order
- User 1:N DepositRequest
- User 1:N Ticket
- ServiceCategory 1:N Service
- Provider 1:N ProviderService
- Service N:1 ProviderService (optional active mapping)
- Order N:1 User
- Order N:1 Service
- Order 1:N OrderSyncLog
- DepositRequest N:1 PaymentMethod
- Wallet 1:N WalletTransaction
- Ticket 1:N TicketMessage
- User 1:N ApiKey

## Provider adapter contract

Each provider adapter should implement:
- testConnection()
- fetchBalance()
- fetchServices()
- placeOrder(input)
- getOrderStatus(externalId)
- cancelOrder(externalId) optional
- normalizeStatus(raw)

Provider differences should be isolated inside adapters.

## Payment adapter contract

Each payment gateway adapter should implement:
- createCheckoutSession()
- verifyWebhookSignature()
- normalizePaymentEvent()
- markDepositPaid()
- issueRefund() optional

Initial adapters:
- ManualBankTransferAdapter
- StripeAdapter
- PayPalAdapter

## Internal status model

### Order status
- pending
- queued
- processing
- partially_completed
- completed
- canceled
- refunded
- failed

### Deposit status
- pending
- under_review
- approved
- rejected
- paid

### Ticket status
- open
- answered
- waiting_user
- closed

## UI information architecture

### Public site
- Home
- Services overview
- FAQ
- Login / Signup
- Legal pages

### Customer dashboard
- KPI cards
- quick order form
- wallet summary
- recent orders
- deposit workflow
- API key management
- support tickets

### Admin dashboard
- Today revenue
- Pending deposits
- Active orders
- Provider health
- Ticket SLA snapshot
- Profit by service

## Security model

- Secure session cookies
- CSRF-safe flows where relevant
- Strict role checks at server boundary
- API keys hashed at rest
- Audit logs for balance adjustments, service changes, provider config changes
- Secrets in env only
- Rate limiting on auth / API endpoints
- Input validation via Zod everywhere

## Background jobs

### required jobs
- sync-provider-services
- sync-provider-balances
- sync-order-statuses
- process-drip-feed-batches
- dispatch-notifications

### optional later
- refill-check
- auto-refill
- profit materialization job

## Reporting approach

MVPでは複雑なDWHを作らない。
まずはPostgreSQL集計 + materialized views or cached queryで十分。
後でClickHouseやBigQueryに逃がせるようにイベント構造だけ揃える。

## Localization approach

- default locale: ja
- locale dictionary in typed translation files
- UI labels centralized
- currency formatting helper for JPY first
- extensible for en later

## SEO / content approach

- public pages use server-rendered metadata
- legal/static pages stored in DB or MDX
- sitemap generated from public routes
- robots defaults configurable

## Deployment target

- Preferred: Vercel for app + managed Postgres + Upstash Redis
- Alternative: Docker on VPS

## Environment variables

- DATABASE_URL
- AUTH_SECRET
- NEXT_PUBLIC_APP_URL
- REDIS_URL
- REDIS_TOKEN if needed
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- PAYPAL_CLIENT_ID
- PAYPAL_CLIENT_SECRET
- SMTP_HOST
- SMTP_USER
- SMTP_PASS
- PROVIDER_ENCRYPTION_KEY

## MVP implementation order

1. bootstrap Next.js app
2. setup UI system and layout
3. Prisma schema + auth
4. customer dashboard skeleton
5. admin dashboard skeleton
6. services/catalog CRUD
7. wallet and manual deposit
8. order placement domain
9. provider adapter framework + mock provider
10. reporting basics
11. tests and polish

## Technical opinion

最初からマイクロサービスに分けるのはアホ。
MVPは単一Next.jsアプリで十分。
ただし adapter と domain service の境界だけは最初から綺麗に切る。
それで速度と保守性のバランスが取れる。
