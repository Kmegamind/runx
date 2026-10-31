#!/usr/bin/env bash
# Creates labels, milestones, a project board and the 16 backlog issues for RunX (see docs/ISSUES.md).
# NOTE: ALREADY RUN on 2026-10-30 (16 issues, 2 milestones, board). Do NOT run again: issues are not idempotent.
# Usage:  REPO=owner/runx ./scripts/setup-github.sh
# Needs:  gh CLI logged in, with the "project" scope:  gh auth refresh -s project
# Issues are NOT idempotent: run once (labels and milestones are safe to re-run).
set -euo pipefail

REPO="${REPO:?Set REPO=owner/name}"
OWNER="${REPO%%/*}"
S1_DUE="${S1_DUE:-2026-11-03}"   # confirm both dates on Canvas
S2_DUE="${S2_DUE:-2026-11-10}"
BOARD="RunX"

echo "==> Labels"
label() { gh label create "$1" --color "$2" --description "$3" --repo "$REPO" --force >/dev/null; }
label feature            0E8A16 "New functionality"
label bug                D73A4A "Something is broken"
label chore              C5DEF5 "Tooling, setup, maintenance"
label docs               0075CA "Documentation"
label spike              D4C5F9 "Time-boxed research"
label "priority: high"   B60205 "Do first"
label "priority: medium" FBCA04 "Normal"
label "priority: low"    CCCCCC "Nice to have"

echo "==> Milestones"
milestone() {
  if gh api "repos/$REPO/milestones?state=all" --jq '.[].title' | grep -qx "$1"; then
    echo "   $1 exists"
  else
    gh api "repos/$REPO/milestones" -f title="$1" -f due_on="${2}T23:59:59Z" -f description="$3" >/dev/null
    echo "   created $1"
  fi
}
milestone "Sprint 1" "$S1_DUE" "Foundation and core loop: scaffold, schema, auth, manifest, scheduler, player"
milestone "Sprint 2" "$S2_DUE" "Stop, resume, accounts, API: state machine, checkpoints, guest demo, editor, OpenAPI, deploy"

echo "==> Project board"
if ! gh project list --owner "$OWNER" --format json --jq '.projects[].title' | grep -qx "$BOARD"; then
  gh project create --owner "$OWNER" --title "$BOARD" >/dev/null
  echo "   created project $BOARD"
fi

echo "==> Issues"
# usage: issue "title" "labels" "milestone" <<'EOF' ... EOF   (body is read from stdin)
issue() {
  local body
  body="$(cat)"
  gh issue create --repo "$REPO" --title "$1" --label "$2" --milestone "$3" --project "$BOARD" --body "$body" >/dev/null
  echo "   $1"
}

# ---------- Sprint 1 ----------
issue "Scaffold Next.js app with Tailwind, Vitest, Playwright and CI" "chore,priority: high" "Sprint 1" <<'EOF'
## Acceptance criteria
- [ ] `npm run dev`, `npm test`, `npm run test:e2e`, `npm run lint`, `npm run build` all work
- [ ] Folder structure matches `AGENTS.md`
- [ ] GitHub Actions runs lint, tests and build on every PR
- [ ] `.env.example` lists variable names only
EOF

issue "Design database schema, migrations and seed data" "feature,priority: high" "Sprint 1" <<'EOF'
## Acceptance criteria
- [ ] Migration creates `profiles` (role: runner or editor), `episodes`, `scenes`, `progress`
- [ ] Row-level security: users read and write only their own progress
- [ ] `supabase/seed.sql` loads Episode 1 so partners and CI share the same data
- [ ] Schema diagram added to `docs/architecture/`
EOF

issue "Implement authentication (sign up, log in, log out)" "feature,priority: high" "Sprint 1" <<'EOF'
Story: US-7

## Acceptance criteria
- [ ] Email sign up, log in and log out work (JWT/OAuth via Supabase Auth)
- [ ] Protected routes redirect anonymous users to login
- [ ] Error paths tested: wrong password, empty input, duplicate email
EOF

issue "Define episode manifest types and write Episode 1 content" "feature,docs,priority: high" "Sprint 1" <<'EOF'
Story: US-1

## Acceptance criteria
- [ ] Types for scenes: id, type, durationSec, audioUrl, prerequisites, checkpoint
- [ ] Ep1 manifest with about 17 scenes, 2 speakers, windmill adventure from public-domain text
- [ ] Manifest validator rejects missing audio and broken prerequisites (unit-tested)
- [ ] Sources credited in `docs/SOURCES.md`
EOF

issue "Build the scheduling engine" "feature,priority: high" "Sprint 1" <<'EOF'
Stories: US-2, US-3

## Acceptance criteria
- [ ] `buildTimeline(manifest, durationMin, checkpoint)` is a pure function
- [ ] 20, 30 and 45 min timelines end within +/-15 s; climax lands in the last 3 min
- [ ] No overlaps, no negative times, prerequisites respected, optional scenes dropped first
- [ ] One encouragement scene is placed near the middle of the run
- [ ] Rebuild from a checkpoint; reports when the remaining story does not fit
EOF

issue "Build Home screen with duration picker" "feature,priority: high" "Sprint 1" <<'EOF'
Story: US-2

## Acceptance criteria
- [ ] Chips for 20 / 30 / 45 min, 30 preselected; Start button
- [ ] (Should) Custom duration, 15-60 min in 5-minute steps
- [ ] Layout matches `docs/design/` and `DESIGN.md` tokens at 375 px
- [ ] Touch targets >= 44 px, accessible names on all controls
EOF

issue "Build audio player and Running screen" "feature,priority: high" "Sprint 1" <<'EOF'
Stories: US-1, US-2

## Acceptance criteria
- [ ] Plays timeline clips in order with silence between scenes; no overlapping audio
- [ ] Huge remaining-time display, captions for every spoken line with the speaker name, 4-part story progress bar
- [ ] Pause freezes the session clock; resume continues from the same position
- [ ] Audio is loaded before start; load or playback errors are visible and recoverable
EOF

issue "Spike: audio playback with the screen locked (iOS Safari, Android Chrome)" "spike,priority: high" "Sprint 1" <<'EOF'
Story: US-1

## Acceptance criteria
- [ ] Test chained clips vs one continuous audio stream with the screen locked
- [ ] Test Media Session API controls
- [ ] Findings and decision written to `docs/spikes/lock-screen-audio.md`
EOF

# ---------- Sprint 2 ----------
issue "Implement session state machine and Stop dialog" "feature,priority: high" "Sprint 2" <<'EOF'
Story: US-4

## Acceptance criteria
- [ ] States: not started, playing, paused, ended; transitions unit-tested
- [ ] Stop shows Finish the story now / Save for next time / Keep running; Keep running restores position
- [ ] The current line finishes before anything else plays; double Stop causes no duplicate change
- [ ] Before the opening scene ends, only Save for next time is offered
EOF

issue "Implement Finish now and Save for next time playback" "feature,priority: high" "Sprint 2" <<'EOF'
Story: US-4

## Acceptance criteria
- [ ] (Should) Finish now plays the compressed ending for the current checkpoint; episode complete only after it finishes
- [ ] Save plays a ~30 s sign-off and stores the last completed checkpoint; episode stays in progress
- [ ] Failures never mark the episode complete (unit test)
EOF

issue "Implement checkpoints, resume and recap" "feature,priority: high" "Sprint 2" <<'EOF'
Story: US-5

## Acceptance criteria
- [ ] Home shows Continue with a recap line; the user may choose a different duration
- [ ] Timeline rebuilds from the checkpoint without skipping required scenes
- [ ] (Should) After a gap (default 3 days), a skippable 30-60 s recap plays first; never on immediate continuation
- [ ] Message and longer-duration option when the remaining story does not fit
EOF

issue "Persist progress per user and import guest progress" "feature,priority: high" "Sprint 2" <<'EOF'
Story: US-7

## Acceptance criteria
- [ ] Progress saved to the database for logged-in users and restored after login or reload
- [ ] Guest progress in localStorage is offered for import on first login
- [ ] Missing or corrupted saved data is handled safely
EOF

issue "Add guest demo mode with accelerated time" "feature,priority: medium" "Sprint 2" <<'EOF'
Story: US-6

## Acceptance criteria
- [ ] A visitor can run a demo without an account; progress stays local
- [ ] Accelerated clock for demos and E2E tests (no 45-minute waits)
EOF

issue "Add editor role and scene management" "feature,priority: medium" "Sprint 2" <<'EOF'
Story: US-8

## Acceptance criteria
- [ ] Only editors can create, edit, reorder and publish scenes
- [ ] Publishing is blocked for invalid manifests
- [ ] Authorization tested: a runner gets 403
EOF

issue "Build public API with OpenAPI documentation" "feature,docs,priority: medium" "Sprint 2" <<'EOF'
Story: US-9

## Acceptance criteria
- [ ] GET episodes and scenes; authenticated progress endpoints
- [ ] `docs/api/openapi.yaml` published with the app
- [ ] Integration tests cover success, validation errors and auth failures
EOF

issue "Deploy, add security scan, finish documentation and demo" "chore,docs,priority: medium" "Sprint 2" <<'EOF'
## Acceptance criteria
- [ ] Production deploy from `main`, preview deploy for every PR, health-check URL
- [ ] Security scan job in CI (`npm audit`, CodeQL)
- [ ] README, architecture diagram, setup and deployment guide, contribution log
- [ ] 10-minute demo video; at least one full-flow E2E test passes in CI
EOF

echo
echo "Done. Manual steps left in the GitHub UI (gh cannot edit board columns):"
echo "  1. Open the '$BOARD' project -> Board layout."
echo "  2. Edit the Status field to: Backlog, Sprint Todo, In Progress, In Review, Done."
echo "  3. Move Sprint 1 issues to 'Sprint Todo' and Sprint 2 issues to 'Backlog'."
echo "  4. Link the project to the repo (Project settings -> Link a repository)."
