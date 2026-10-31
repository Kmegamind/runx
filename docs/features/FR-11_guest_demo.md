# Feature PRD — Guest demo mode

**Feature ID:** FR-11 · **Stories:** US-6 · **Screens:** Home (Try demo), Running (demo banner) · **Status:** v1 draft 2026-10-30 (new)

## 1. Problem and desired outcome
A visitor, or a reviewer, can try a run without creating an account and without waiting 20 minutes.

## 2. Evidence
No interview evidence. The reason is practical: lower the barrier to trying the product and make the demo testable (accelerated clock also serves FR-08).

## 3. Assumptions to test
| # | Assumption | Proof it is wrong |
|---|---|---|
| G1 | A 2-minute accelerated demo conveys the product | Testers do not understand the scheduling from the demo |

## 4. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | "Try demo" on Home, no account · accelerated clock (a 20-minute plan plays in about 2 minutes, scene audio is still real) · progress stored locally only · clear "Demo" banner |
| **Should** | After the demo, offer sign-up to keep progress |
| **Could** | Choose demo speed |
| **Won't** | Storing guest data on the server · mixing demo progress with real progress |

## 5. Acceptance criteria
- [ ] Given a visitor, I can start the demo from Home without logging in.
- [ ] Given the demo, the timeline is the same one the scheduler produces for the chosen duration, with time scaled; no scheduler logic is forked.
- [ ] Demo progress never overwrites real saved progress.
- [ ] The accelerated clock is injected, so the same mode is used in E2E tests.

## 6. Screens and states (for the mockup)
Home with Try demo · Running with a Demo banner and speed hint · end-of-demo sign-up prompt.

## 7. Dependencies
FR-04 (injected clock), FR-05, FR-07, FR-10.

## 8. Change log
- 2026-10-30 v1: created.
