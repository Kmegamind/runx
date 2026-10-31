# Feature PRD — Authentication and roles

**Feature ID:** FR-10 · **Stories:** US-7 · **Screens:** Login, Sign up, account menu · **Status:** v1 draft 2026-10-30 (new; P2 requires authentication)

## 1. Problem and desired outcome
Let a runner keep progress across devices, and let editors manage content, with the least friction for people who just want to try the app.

## 2. Evidence
No interview evidence. This is a P2 requirement and also supports FR-07 (cross-device progress, R2 untested) and FR-12 (editor role). Keep sign-up optional for runners (see FR-11).

## 3. Assumptions to test
| # | Assumption | Proof it is wrong |
|---|---|---|
| L1 | Runners will sign up after a first run if it saves their progress | Testers refuse any sign-up and stay guests |

## 4. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | Email sign up, log in, log out (Supabase Auth, JWT) · roles `runner` and `editor` in `profiles` · protected routes redirect anonymous users to login · clear errors: wrong password, empty input, duplicate email |
| **Should** | Password reset · one OAuth provider (Google) |
| **Could** | Delete account and data |
| **Won't** | Payments, social profiles, collecting location or health data |

## 5. Acceptance criteria
- [ ] Given valid credentials, I can sign up, log in and log out.
- [ ] Given an anonymous user, protected pages redirect to Login; public pages and the guest demo stay open.
- [ ] Given a runner token, editor endpoints return 403.
- [ ] Passwords are never logged or stored by the app; secrets stay in environment variables.

## 6. Screens and states (for the mockup)
Login · Sign up · error states · account menu with Log out.

## 7. Dependencies
Database schema issue, FR-07, FR-12, FR-13.

## 8. Change log
- 2026-10-30 v1: created to cover P2 authentication.
