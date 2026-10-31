# RunX — GitHub Issues Backlog (synced with docs/PRD.md, stories US-1..US-9)

**Labels:** `feature`, `bug`, `chore`, `docs`, `spike`, `priority: high`, `priority: medium`, `priority: low`
**Milestones (dates are defaults; confirm on Canvas):** `Sprint 1` due 2026-11-03 · `Sprint 2` due 2026-11-10 (override with `S1_DUE` / `S2_DUE`)
**Board columns:** Backlog · Sprint Todo · In Progress · In Review · Done. Sprint 1 issues -> Sprint Todo, Sprint 2 -> Backlog.
Every issue follows TDD: commit the failing test first. The script `scripts/setup-github.sh` creates exactly these 16 issues.

---

## Sprint 1 — foundation and core loop

### 1. Scaffold Next.js app with Tailwind, Vitest, Playwright and CI
`chore` `priority: high`
- [ ] `npm run dev`, `npm test`, `npm run test:e2e`, `npm run lint`, `npm run build` all work
- [ ] Folder structure matches `AGENTS.md`
- [ ] GitHub Actions runs lint, tests and build on every PR
- [ ] `.env.example` lists variable names only

### 2. Design database schema, migrations and seed data
`feature` `priority: high`
- [ ] Migration creates `profiles` (with role: runner or editor), `episodes`, `scenes`, `progress`
- [ ] Row-level security: users read and write only their own progress
- [ ] `supabase/seed.sql` loads Episode 1 so partners and CI share the same data
- [ ] Schema diagram added to `docs/architecture/`

### 3. Implement authentication (sign up, log in, log out)
`feature` `priority: high` — US-7
- [ ] Email sign up, log in and log out work (JWT/OAuth via Supabase Auth)
- [ ] Protected routes redirect anonymous users to login
- [ ] Error paths tested: wrong password, empty input, duplicate email

### 4. Define episode manifest types and write Episode 1 content
`feature` `docs` `priority: high` — US-1
- [ ] Types for scenes: id, type, durationSec, audioUrl, prerequisites, checkpoint
- [ ] Ep1 manifest with about 17 scenes, 2 speakers, windmill adventure from public-domain text
- [ ] Manifest validator rejects missing audio and broken prerequisites (unit-tested)
- [ ] Sources credited in `docs/SOURCES.md`

### 5. Build the scheduling engine
`feature` `priority: high` — US-2, US-3
- [ ] `buildTimeline(manifest, durationMin, checkpoint)` is a pure function
- [ ] 20, 30 and 45 min timelines end within +/-15 s; climax lands in the last 3 min
- [ ] No overlaps, no negative times, prerequisites respected, optional scenes dropped first
- [ ] One encouragement scene is placed near the middle of the run
- [ ] Rebuild from a checkpoint; reports when the remaining story does not fit

### 6. Build Home screen with duration picker
`feature` `priority: high` — US-2
- [ ] Chips for 20 / 30 / 45 min, 30 preselected; Start button
- [ ] (Should) Custom duration, 15-60 min in 5-minute steps
- [ ] Layout matches `docs/design/` and `DESIGN.md` tokens at 375 px
- [ ] Touch targets >= 44 px, accessible names on all controls

### 7. Build audio player and Running screen
`feature` `priority: high` — US-1, US-2
- [ ] Plays timeline clips in order with silence between scenes; no overlapping audio
- [ ] Huge remaining-time display, captions for every spoken line with the speaker name, 4-part story progress bar
- [ ] Pause freezes the session clock; resume continues from the same position
- [ ] Audio is loaded before start; load or playback errors are visible and recoverable

### 8. Spike: audio playback with the screen locked (iOS Safari, Android Chrome)
`spike` `priority: high` — US-1
- [ ] Test chained clips vs one continuous audio stream with the screen locked
- [ ] Test Media Session API controls
- [ ] Findings and decision written to `docs/spikes/lock-screen-audio.md`

---

## Sprint 2 — stop, resume, accounts, API

### 9. Implement session state machine and Stop dialog
`feature` `priority: high` — US-4
- [ ] States: not started, playing, paused, ended; transitions unit-tested
- [ ] Stop shows Finish the story now / Save for next time / Keep running; Keep running restores position
- [ ] The current line finishes before anything else plays; double Stop causes no duplicate change
- [ ] Before the opening scene ends, only Save for next time is offered

### 10. Implement "Finish now" and "Save for next time" playback
`feature` `priority: high` — US-4
- [ ] (Should) Finish now plays the compressed ending for the current checkpoint; episode complete only after it finishes
- [ ] Save plays a ~30 s sign-off and stores the last completed checkpoint; episode stays in progress
- [ ] Failures never mark the episode complete (unit test)

### 11. Implement checkpoints, resume and recap
`feature` `priority: high` — US-5
- [ ] Home shows Continue with a recap line; the user may choose a different duration
- [ ] Timeline rebuilds from the checkpoint without skipping required scenes
- [ ] (Should) After a gap (default 3 days), a skippable 30-60 s recap plays first; never on immediate continuation
- [ ] Message and longer-duration option when the remaining story does not fit

### 12. Persist progress per user and import guest progress
`feature` `priority: high` — US-7
- [ ] Progress saved to the database for logged-in users and restored after login or reload
- [ ] Guest progress in localStorage is offered for import on first login
- [ ] Missing or corrupted saved data is handled safely

### 13. Add guest demo mode with accelerated time
`feature` `priority: medium` — US-6
- [ ] A visitor can run a demo without an account; progress stays local
- [ ] Accelerated clock for demos and E2E tests (no 45-minute waits)

### 14. Add editor role and scene management
`feature` `priority: medium` — US-8
- [ ] Only editors can create, edit, reorder and publish scenes
- [ ] Publishing is blocked for invalid manifests
- [ ] Authorization tested: runner gets 403

### 15. Build public API with OpenAPI documentation
`feature` `docs` `priority: medium` — US-9
- [ ] `GET` episodes and scenes; authenticated progress endpoints
- [ ] `docs/api/openapi.yaml` published with the app
- [ ] Integration tests cover success, validation errors and auth failures

### 16. Deploy, add security scan, finish documentation and demo
`chore` `docs` `priority: medium`
- [ ] Production deploy from `main`, preview deploy for every PR, health-check URL
- [ ] Security scan job in CI (`npm audit`, CodeQL)
- [ ] README, architecture diagram, setup and deployment guide, contribution log
- [ ] 10-minute demo video; at least one full-flow E2E test passes in CI
