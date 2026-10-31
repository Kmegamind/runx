# 0005 Authentication with Supabase Auth

- **Status:** Proposed (needs team confirmation; the PRD still lists "Supabase Auth vs custom JWT" as open)

## Context
Signed-in runners need progress stored per user and restored across devices; editors need a role. Guests must be able to try a demo without an account.

## Decision (proposed)
Use Supabase Auth (email sign-up, JWT sessions, `@supabase/ssr` in Next.js). Store the role in `profiles`, enforce access with row-level security, and check the editor role on the server for every write.

## Consequences
- Less security code to write and test than a custom JWT service; password handling stays with a maintained provider.
- Ties authentication to Supabase; leaving it later means migrating users.
- If the team picks custom JWT instead, supersede this record with a new one.
