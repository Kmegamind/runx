# Sprint 1 planning

Milestone: [Sprint 1](https://github.com/Kmegamind/runx/milestone/1), due 2026-10-30 (set on GitHub; adjust there if the team moves it). Board: [RunX project](https://github.com/users/Kmegamind/projects/2).

## Sprint goal
Foundation and core loop: a working scaffold, database and auth, the Episode 1 manifest, the scheduler, and the first playable screens.

## Scope (all labelled Sprint 1)
| Issue | Title | Story | Type |
|---|---|---|---|
| #1 | Scaffold Next.js app with Tailwind, Vitest, Playwright and CI | all | chore |
| #2 | Design database schema, migrations and seed data | supports US-7, US-8 | feature |
| #3 | Implement authentication (sign up, log in, log out) | US-7 | feature |
| #4 | Define episode manifest types and write Episode 1 content | US-1 | feature, docs |
| #5 | Build the scheduling engine | US-2, US-3 | feature |
| #6 | Build Home screen with duration picker | US-2 | feature |
| #7 | Build audio player and Running screen | US-1, US-2 | feature |
| #8 | Spike: audio playback with the screen locked (iOS Safari, Android Chrome) | US-1 | spike |

Acceptance criteria for each issue are in the issue body. Scope is fixed for the sprint; Sprint 2 issues stay in Backlog.

## Working agreements
- Every change starts from an issue; branch `feature/<issue>-desc` (also `fix/`, `chore/`, `docs/`); tests first; one issue per pull request; a teammate reviews before merge (see `AGENTS.md`).
- Definition of done: acceptance criteria met, tests, lint and build green in CI, docs updated, issue closed by the PR.
- Product Owner and Scrum Master rotate each sprint. Sprint 1: Product Owner Yue Li; Scrum Master: teammate (name to be added).

## Risks
- Audio with a locked screen may not work on iOS (issue #8 decides the fallback).
- Auth and schema work compete with the scheduler for time; the scheduler (#5) is the priority because the rest builds on it.

## Status log
- #1 done (merged in pull request 19).
