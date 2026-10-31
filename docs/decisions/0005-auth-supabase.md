# 0005 Authentication with Supabase Auth

- **Status:** Accepted (2026-10-31, confirmed by the Product Owner)

## Context
Signed-in runners need progress stored per user and restored across devices; editors need a role. Guests must be able to try a demo without an account.

## Decision
Use Supabase Auth (email sign-up, JWT sessions, `@supabase/ssr` in Next.js). Store the role in `profiles`, enforce access with row-level security, and check the editor role on the server for every write.

## Consequences
- Less security code to write and test than a custom JWT service; password handling stays with a maintained provider.
- Ties authentication to Supabase; leaving it later means migrating users.
- Changing provider later needs a new record that supersedes this one.
