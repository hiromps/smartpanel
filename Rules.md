# Rules.md

## Mission

Build a Japanese-localized SMM panel platform foundation with Next.js best practices.
Take inspiration from generic industry capabilities, but do not clone competitor branding, copy, or UI.

## Absolute rules

1. Do not copy text, layout, naming, or design from perfectpanel.com verbatim.
2. Keep all source code and copy original.
3. Default locale is Japanese.
4. Use TypeScript strictly.
5. Prefer server-side safety over client-side convenience.
6. Never hardcode secrets.
7. Every major feature must have a clear domain boundary.
8. Keep components small and composable.
9. Validate inputs with Zod.
10. Use accessible UI patterns.

## Product rules

- Product is a panel platform for service resale/operations management.
- MVP must support customer panel + admin panel + provider integration skeleton + wallet/deposit flow.
- Build for Japanese users first.
- Keep legal/static pages ready for customization.
- Use neutral language; avoid aggressive or misleading marketing claims in default copy.

## UX rules

- Use clean dashboard layouts.
- Make core actions obvious: add funds, place order, check order, contact support.
- Admin screens should optimize speed and bulk operations.
- Mobile support is mandatory for customer-facing screens.

## Code quality rules

- App Router only.
- Feature-first folder organization.
- Shared reusable UI components go in `components/`.
- Business logic belongs in `server/services/` or feature server modules, not React components.
- Prisma access should be wrapped where appropriate.
- Avoid giant files over ~300 lines unless clearly justified.
- Add comments only where intent is non-obvious.

## Data rules

- Monetary values should be handled safely and consistently.
- Audit-sensitive operations must leave logs.
- Status values should be normalized enums.
- Prefer soft-delete or status flags for important business entities.

## API rules

- Customer API and Admin API must be separated by auth/permissions.
- Hash API keys before storing.
- Add rate limiting hooks.
- Return typed, documented JSON shapes.

## Testing rules

- Add unit tests for domain logic.
- Add at least smoke E2E coverage for auth and order flow.
- Do not ship untested critical wallet logic.

## Delivery rules

- Each milestone should leave the repo runnable.
- Update README when setup steps change.
- Keep `.env.example` in sync with actual env usage.
- Record open gaps in TODO.md instead of hiding them.

## AI execution rules

- Gemini may propose code, plans, and refactors.
- Do not blindly trust generated code.
- After generation, run lint/typecheck/tests when available.
- If a generated approach is overengineered, simplify it.

## Opinionated defaults

- shadcn/ui + Tailwind is the right call here.
- Prisma + Postgres is good enough for MVP.
- Fancy no-code page builder can wait.
- Shipping a solid admin/order/provider core matters more than pixel-perfect marketing pages.
