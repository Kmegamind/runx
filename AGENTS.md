# AGENTS.md — RunX shared rules
<!-- Single rules file for every AI tool (Antigravity, Claude Code, Cursor). Keep under ~200 lines, link to docs/ instead of pasting.
     Change it only through a PR and revisit it at every sprint retro. -->

<!-- VERIFY-RULES-LOADED (HW3 experiment only; delete after the before/after test): -->
Start every response with the emoji 🏃 so we can tell this file was read.

## 1. Project context
RunX is a mobile web app. While the user runs, Don Quixote and Sancho talk in short audio scenes. A **scheduler** builds a story timeline that fits the chosen run length (20/30/45 min), with the climax in the last 3 minutes. Early stop offers *Finish the story now* or *Save for next time*; progress resumes on the next run.

**Read before coding:** `docs/PRD.md` (user stories US-1..US-9 with acceptance criteria), `DESIGN.md` (visual rules), `docs/design/` (mockup, open `mockup.html`). Always read the GitHub issue's acceptance criteria first.

### Stack  <!-- TODO: pin exact versions after scaffolding (issue #1) -->
- Next.js (App Router) + TypeScript (`strict`) + Tailwind CSS
- API: Next.js route handlers under `src/app/api/`
- Database and auth: Supabase (PostgreSQL, Auth with JWT); schema lives only in `supabase/migrations/`
- Tests: Vitest (unit, integration), Playwright (E2E)
- CI/CD: GitHub Actions; Vercel (preview per PR, production from `main`)

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
src/app/           pages and API route handlers (thin; no business logic)
src/components/    UI components (presentational)
src/lib/scheduler/ PURE scheduling logic: no DOM, no fetch, no Date.now()
src/lib/session/   run-session state machine (pause/resume/stop/finish)
src/lib/progress/  checkpoint rules and persistence adapters (db, localStorage)
src/lib/db/        Supabase client and queries
src/content/       episode manifest + audio file references
supabase/migrations/  schema; seed script in supabase/seed.sql
tests/unit/  tests/integration/  tests/e2e/   (mirror src/)
docs/              PRD.md, design/, api/openapi.yaml, sprints/, hw3/
```
Core pattern: `buildTimeline(manifest, durationMin, checkpoint) -> Timeline` is a pure function. Inject clock, audio and storage so logic is testable without waiting 45 minutes.

### Naming and style
- Files `kebab-case.ts`; components `PascalCase.tsx`; types `PascalCase`; constants `UPPER_SNAKE`.
- Functions are verbs; booleans start with `is/has/can`.
- Time in code is **seconds**, named with a `Sec` suffix. Minutes only at the UI boundary.
- No `any`. Named exports. Comments explain *why*.

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
UI work follows `DESIGN.md`: use its tokens via the Tailwind theme, never hardcode colors or fonts. Token variables are in `docs/design/tokens.css`; character art, icons and windmill SVGs are in `docs/design/assets/` (copy what a screen needs into `public/`; do not create `public/` before the scaffold in issue #1).

## 4. Scrum and workflow
- Every change starts from a GitHub Issue; no issue, no branch.
- **Branches:** `feature/<issue>-short-desc`, `fix/…`, `chore/…`, `docs/…` (e.g. `feature/5-scheduler`).
- **Commits:** Conventional Commits and an issue reference: `feat(scheduler): fit climax into last 3 min (Refs #5)`. Imperative, subject <= 72 chars.
- **TDD:** commit the failing test first (red), then the code (green), then refactor. Test error paths too.
- **PRs:** one issue per PR, body uses the PR template (`Closes #N`, test notes, partner-review checkbox). Partner reviews before merge; CI must be green; squash-merge to `main`.
- **Code references:** `// TODO(#N): ...` only; never a bare TODO.
- **Board:** Backlog -> Sprint Todo -> In Progress -> In Review -> Done. Product Owner and Scrum Master rotate each sprint. Do not pull Sprint 2 work into Sprint 1 without team agreement.

## 5. Do and Don't
**Do**
- Keep `src/lib/scheduler/` pure and covered by unit tests (20/30/45 min, checkpoint resume, too-long remaining story, +/-15 s).
- Validate all external data (manifest, saved progress, API input) at the boundary.
- Keep route handlers thin: validate input, call `src/lib`, return JSON with correct status codes.
- Use `textContent` or React escaping; give every control an accessible name; touch targets >= 44 px; contrast >= 4.5:1; show captions for spoken lines.
- Prefer built-in browser and Next.js features over new dependencies.

**Don't**
- Don't put business logic in components or route handlers.
- Don't read `window`, `localStorage`, `fetch` or the clock inside `src/lib/scheduler/`.
- Don't change the database from a dashboard; write a migration.
- Don't add a dependency or framework without an issue and team agreement.
- Don't commit secrets or `.env`; use env vars, list names only in `.env.example`; CI never uses production secrets.
- Don't copy copyrighted text; only public-domain sources, credited in `docs/SOURCES.md`.
- Don't leave `console.log` or commented-out code.

## 6. When unsure
Name the issue and acceptance criterion you are working on, state assumptions, and prefer the smallest change that satisfies it.
