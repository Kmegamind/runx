# 0001 Next.js and Supabase full-stack

- **Status:** Accepted (2026-10-30)

## Context
The P2 specification asks for a full-stack app with authentication, a database, at least three features or roles, a public API and deployment. The team is two students with a few weeks.

## Decision
Next.js (App Router) with TypeScript and Tailwind for UI and API route handlers; Supabase (PostgreSQL and Auth) for data; Vitest and Playwright for tests; GitHub Actions for CI; Vercel for hosting. Schema changes only through SQL migrations.

## Consequences
- One repository and one language; previews per pull request come with Vercel.
- Row-level security must be written and tested; a dashboard change without a migration breaks reproducibility.
- We depend on free-tier limits of Supabase and Vercel.
