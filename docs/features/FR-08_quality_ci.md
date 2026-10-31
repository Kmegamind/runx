# Engineering requirement — Automated testing and CI

**ID:** FR-08 · **Type:** engineering requirement (not a runner-facing feature) · **Status:** v2, rewritten 2026-10-30
This is a course requirement (P2 rubric: TDD, CI/CD, security). It has no interview evidence or user hypothesis; interview findings only inform test cases.

## 1. Purpose
Make the scheduler, state machine and API demonstrably correct and maintainable.

## 2. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | Failing test committed before implementation (red, green, refactor) · Vitest unit tests for scheduler, state machine, validator · integration tests for API and database access · Playwright E2E happy path: select, play, pause, stop and save, resume · GitHub Actions on every PR: lint, typecheck, tests, build · PRs merge only when green · injected clock and fake audio so no test waits real minutes |
| **Should** | Security scan job (`npm audit`, CodeQL) · coverage of at least 90% for `src/lib/scheduler/` · PR preview deploy · pre-commit hook (lint-staged) |
| **Could** | Visual regression for the Running screen |
| **Won't** | E2E assertions on real audio output (brittle; device playback is checked manually) |

## 3. Acceptance criteria
- [ ] A PR with a failing test cannot be merged.
- [ ] Test cases include: 20/30/45 timelines, checkpoint rebuild, `doesNotFit`, double Stop, corrupted saved data, version mismatch, unauthorized API access.
- [ ] CI never uses production secrets; tests use a local or test database.
- [ ] README lists the commands for every check.

## 4. Dependencies
FR-04, FR-06, FR-07, FR-13, issue "Scaffold app with CI".

## 5. Change log
- 2026-10-30 v2: removed the user-hypothesis boilerplate; added TDD, integration, security-scan and preview-deploy requirements from the P2 rubric.
