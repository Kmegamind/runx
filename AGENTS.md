# AGENTS.md — RunX shared rules
<!-- Single rules file for every AI tool (Copilot, Antigravity, Claude Code, Cursor). Keep it under 150 lines: link to docs/ instead of pasting.
     Change it only through a PR and revisit it at every sprint retro. -->

<!-- VERIFY-RULES-LOADED (HW3 experiment only; delete after the before/after test): -->
Start every response with the emoji 🏃 so we can tell this file was read.

## 1. Project context
RunX is a mobile web app. While the user runs, Don Quixote and Sancho talk in short audio scenes. A **scheduler** builds a story timeline that fits the chosen run length (20/30/45 min), with the climax in the last 3 minutes. Early stop offers *Finish the story now* or *Save for next time*; progress resumes on the next run.

**Read before coding:** `docs/PRD.md` (user stories US-1..US-9 with acceptance criteria), `DESIGN.md` (visual rules), `docs/design/` (prototype: open `mockup.html`). Always read the GitHub issue's acceptance criteria first.

### Stack
<!-- Latest stable on 2026-10-30. After the scaffold, package.json is the source of truth; upgrade only through a chore issue.
     If a peer-dependency conflict appears, use the version the Next.js template installs. -->
| Area | Choice |
|---|---|
| Runtime | Node 24 or newer |
| App | Next.js 16.4 (App Router), React 19.3, TypeScript 7.0 (`strict`), Tailwind CSS 4.3 |
| API | Next.js route handlers under `src/app/api/` |
| Data and auth | Supabase (PostgreSQL, Auth with JWT): `@supabase/supabase-js` 2.118, `@supabase/ssr` 0.12; schema only in `supabase/migrations/` |
| Validation | Zod 4.6 |
| Tests | Vitest 5.0, Testing Library for React 16.3 with jsdom, Playwright 1.64 |
| Lint and format | ESLint 10 (`eslint-config-next`), Prettier 3.9 |
| CI/CD | GitHub Actions; Vercel (preview per PR, production from `main`) |

### Commands
```
npm run dev        # local dev server
npm test           # Vitest, run before every commit
npm run test:e2e   # Playwright
npm run lint       # ESLint + Prettier check
npm run build
```

### Architecture
```
src/app/           pages and API route handlers (thin: validate input, call src/lib, return JSON)
src/components/    UI components (presentational)
src/lib/scheduler/ PURE scheduling logic: no DOM, no fetch, no Date.now()
src/lib/session/   run-session state machine (pause/resume/stop/finish)
src/lib/progress/  checkpoint rules and persistence adapters (db, localStorage)
src/lib/db/        Supabase client and queries
src/content/       episode manifest + audio file references
supabase/migrations/  schema; seed script in supabase/seed.sql
tests/unit/  tests/integration/   (mirror src/)    e2e/  Playwright flows
docs/              PRD.md, architecture.md, decisions/, design/, features/, api/openapi.yaml, sprints/
```
Core pattern: `buildTimeline(manifest, durationMin, checkpoint) -> Timeline` is a pure function. Inject clock, audio and storage so logic is testable without waiting 45 minutes.

### Naming and style
- Files `kebab-case.ts`; components `PascalCase.tsx`; types `PascalCase`; constants `UPPER_SNAKE`.
- Functions are verbs; booleans start with `is/has/can`.
- Time in code is **seconds**, named with a `Sec` suffix. Minutes only at the UI boundary.
- No `any`. Named exports. Comments explain *why*.

### Testing strategy
- **Unit (Vitest, no DOM):** scheduler, session state machine, checkpoint rules, manifest validator. Cases: 20/30/45 min, resume from each checkpoint, remaining story too long, +/-15 s tolerance, Stop pressed twice.
- **Integration (Vitest):** route handlers and `src/lib/db` with a mocked or test Supabase client. Cover success, validation error (400), unauthenticated (401) and wrong role (403).
- **Component (Testing Library):** query by role and label, assert behavior, not markup. Cover the duration selector and the Stop sheet.
- **E2E (Playwright, 375 px viewport):** one full flow with an accelerated clock: pick a length, run, stop, save, resume. Never wait real minutes.
- **Coverage goals:** at least 90% of lines and branches in `src/lib/scheduler/`, at least 80% in the rest of `src/lib/`; no numeric goal for UI.
- **Patterns:** TDD (section 4); fake clock, audio and storage injected; no sleeps, no real network; one test file per module, named `<module>.test.ts`; test names read "does X when Y"; test error paths, not only the happy path.

## 2. Product rules the code must respect
- Scene types: `opening | core | optional | climax | ending | signoff | recap | compressed_ending`.
- A scene plays only after its prerequisite scenes. Optional scenes may be dropped; core scenes keep story order.
- A finished run is not a finished episode. The episode is "complete" only after the ending fully plays, once.
- Saved progress is always a valid checkpoint (CP1 after departure, CP2 windmills on the horizon, CP3 facing the windmills).
- Audio load or playback errors never mark progress complete.
- Stop never cuts a line mid-sentence. Pressing Stop twice causes no duplicate state change.
- No pace or sprint commands; never comment on the runner's speed or body. An optional in-story "charge" invitation in the last 3 minutes is allowed (never an order, no numbers or speed words). Script wording: `docs/content/script-style-guide.md`.
- Safety: never encourage continuing a run to finish the story; stopping is always respected. Every spoken line has a caption.
- Feature scope and MoSCoW live in `docs/features/FR-xx`; if they differ from `PRD.md`, the feature PRD wins.

## 3. Design references
Screens (see `docs/design/`): **Home** (duration chips 20/30/45, 30 preselected, Continue card, Start) · **Running** (huge remaining time, scene caption + speaker, 4-part story progress bar, Pause, Stop) · **Stop dialog** (Finish the story now / Save for next time / Keep running) · **Resume** (saved progress, recap line, Continue) · **Login** · **Editor** (scene list, only for editors).
Flows: new run: Home -> pick duration -> Start -> Running -> Done. Early stop: Running -> Stop -> Finish now -> compressed ending -> Done, or Save -> sign-off -> Home. Resume: Home (Continue) -> Running from checkpoint.

### Key components and expected behavior
Look and tokens are in `DESIGN.md` (Components, States); this table is the behavior to implement.

| Component | Expected behavior |
|---|---|
| Duration selector (segmented control) | `role="radiogroup"` with 20, 30, 45 min; 30 preselected; shows the finish time; always keyboard operable. |
| Run controls | Pause (primary) and Stop (glass) never move or change wording; Pause freezes the session clock and becomes Resume. |
| Windmill player (progress) | Four sails = Warm-up, Rising, Climax, Epilogue: done filled, current accent, upcoming outlined; `role="img"` with a label such as "Story part 2 of 4, Rising". |
| Caption card | Speaker name and shape mark plus only the current line; `aria-live="polite"`; always on while audio plays. |
| Stop sheet | Rows from safest to boldest: Save for next time, Finish the story now, Keep running. The current line finishes first; a second Stop tap does nothing. Before the opening scene ends, only Save is offered. |
| Resume screen | Saved checkpoint, a two-line recap with Skip, length choice, Continue. If the remaining story does not fit, say so and offer a longer length. |
| Loading and error | Loading: progress bar, the clock does not start until enough audio is buffered. Error: inline `role="alert"` naming what failed, clock stopped, Retry (primary) and Skip this line; never auto-skip. |

`DESIGN.md` also describes things no PRD story or issue asks for (world toggle, postcard, tab bar, music and stereo audio, cadence display). Do not build them unless an issue says so.

UI work follows `DESIGN.md`: use its tokens via the Tailwind theme, never hardcode colors or fonts. Token variables are in `docs/design/tokens.css`; character art, icons and windmill SVGs are in `docs/design/assets/` (copy what a screen needs into `public/`).

## 4. Scrum and workflow
- Every change starts from a GitHub Issue; no issue, no branch.
- **Branches:** `feature/<issue>-short-desc`, `fix/…`, `chore/…`, `docs/…` (e.g. `feature/5-scheduler`).
- **Commits:** Conventional Commits and an issue reference: `feat(scheduler): fit climax into last 3 min (Refs #5)`. Imperative, subject <= 72 chars.
- **TDD:** commit the failing test first (red), then the code (green), then refactor.
- **PRs:** one issue per PR, body uses the PR template (`Closes #N`, test notes, partner-review checkbox). Partner reviews before merge; CI must be green; squash-merge to `main`. AI tools never merge.
- **Code references:** `// TODO(#N): ...` only; never a bare TODO.
- **Board:** Backlog -> Sprint Todo -> In Progress -> In Review -> Done. Product Owner and Scrum Master rotate each sprint. Do not pull Sprint 2 work into Sprint 1 without team agreement.

## 5. Do and Don't
**Do**
- Validate all external data (manifest, saved progress, API input, env vars) at the boundary with Zod.
- Enable row-level security on every table; users read and write only their own progress; check the editor role on the server, never trust the client.
- Use React escaping or `textContent`; give every control an accessible name; touch targets >= 44 px; contrast >= 4.5:1; show captions for spoken lines.

**Don't**
- Don't put business logic in components or route handlers.
- Don't change the database from a dashboard; write a migration.
- Don't commit secrets or `.env`; use env vars, list names only in `.env.example`; CI never uses production secrets.
- Don't copy copyrighted text; only public-domain sources, credited in `docs/SOURCES.md`.
- Don't leave `console.log` or commented-out code.

### Libraries
**Prefer:** the Stack above; Zod for every schema (one schema gives both validation and types); native `fetch`, `HTMLAudioElement`, Media Session and `Intl`; a plain TypeScript reducer for the session state machine; Tailwind with DESIGN.md tokens; the SVGs in `docs/design/assets/`; a hand-written `docs/api/openapi.yaml`.
**Avoid:** UI kits (MUI, shadcn, Chakra: the design is custom); Redux, XState, Zustand (the state machine is small); axios; moment, lodash, date-fns; Prisma or Drizzle (schema is SQL migrations); audio libraries such as Howler; icon packages.
Any new dependency needs an issue and team agreement.

## 6. When unsure
Name the issue and acceptance criterion you are working on, state assumptions, and prefer the smallest change that satisfies it.
