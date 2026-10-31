# RunX — Product Requirements Document

**Version:** 1.0 (consolidated, minimal) · **Updated:** 2026-10-30 · **Platform:** mobile web app

> *Run with Don Quixote & Sancho.* While you run, Don Quixote and Sancho talk to you in short, funny audio scenes adapted from the public-domain novel. The story is scheduled to fit the run you chose.

## 1. Problem
Running is boring, especially alone, and people who miss a few runs quit. Podcasts and audiobooks ignore how long you run today, don't build toward your finish, and leave you hanging when you stop early.

## 2. Users
| Type | Needs |
|---|---|
| Finds running boring | Something fun, so time passes faster and they look forward to the next run |
| Regular runner, variable time | Story that fits today's duration and ends when the run ends |
| Beginner who wants to quit halfway | A push when it gets hard, with no pace commands or judgment |
| Runs on and off | Pick up where they left off after missing days |

**Roles in the app:** Guest (try a demo without an account), Runner (logged in, progress saved), Editor (manages episodes and scenes).
**Not targeting:** performance athletes, trail runners, social run groups.

## 3. Scope
**In (MVP):** one season, one playable episode (Don Quixote's windmill adventure), 20/30/45-minute sessions, pre-generated audio clips with silence between scenes, early stop with two choices, saved progress, login, editor tools, public API.
**Out:** playing or ducking the user's own music, GPS/pace/wearables, native apps, payments, social features, live character chat, real-time generated audio.

## 4. User stories and acceptance criteria

**US-1 Fun to listen to (Must)**
As someone who finds running boring, I want something fun to listen to, so time goes by faster and I look forward to my next run.
- [ ] Episode plays as 1–2 minute dialogue scenes with two distinguishable voices; silence between scenes.
- [ ] Before a long silence, a character says one line to bridge it ("We ride on; I'll call you at the windmills").
- [ ] Each scene is understandable alone, even if a few words are missed.
- [ ] Every spoken line is shown as a caption with the speaker's name.
- [ ] Audio for the session is loaded before start; playback does not need the network.

**US-2 Fits my time (Must)**
As a runner whose time changes, I want the story to fit today's run, so it wraps up as I finish.
- [ ] I can choose 20, 30 or 45 minutes before starting.
- [ ] Uninterrupted, the ending finishes within ±15 s of the chosen time; the climax lands in the last 3 minutes.
- [ ] Pause freezes the session clock; resume continues from the same position.
- [ ] (Should) I can enter a custom duration, 15–60 min in 5-minute steps (interviews showed 25 and 41 min runs).

**US-3 Pushes me when it's hard (Must)**
As a beginner who wants to stop halfway, I want the story to follow the rhythm of my run, so I make it to the end.
- [ ] Pacing follows the run: easy opening (warm-up), rising middle, climax at the end.
- [ ] One short in-character encouragement is scheduled near the middle of the run.
- [ ] No pace or sprint commands; no comments on the runner's performance.
- [ ] (Should) The climax in the last 3 minutes may include an in-story "charge" invitation (e.g. "Rocinante breaks into a gallop; ride with him if your legs feel good"). It is optional, never a command, has no numbers or speed words, and the scene plays the same if the runner does not speed up. Wording rules: `docs/content/script-style-guide.md` §4.

**US-4 I choose how to stop (Must)**
As someone who often stops early, I want to choose how the story ends, so it never just cuts off.
- [ ] Tapping Stop pauses audio and shows **Finish the story now** / **Save for next time** / **Keep running**.
- [ ] (Should) **Finish now:** plays a compressed ending for the current checkpoint; the episode is marked complete only after it finishes.
- [ ] **Save for next time:** plays a short sign-off (~30 s), saves the last completed checkpoint, episode stays "in progress".
- [ ] The current line finishes before anything else plays; no one is cut off mid-sentence.
- [ ] If Stop is pressed before the opening scene ends, only "Save for next time" is offered.

**US-5 Pick up where I left off (Must)**
As someone who runs on and off, I want to resume next run, so missing days doesn't lose my progress.
- [ ] Next run continues from the saved checkpoint; no required scene is skipped.
- [ ] I can pick a different duration; the timeline is rebuilt from the remaining story.
- [ ] If the remaining required story does not fit the chosen duration, I am told and offered a longer option.
- [ ] (Should) After a gap (default 3 days, threshold is a guess), a 30–60 s "previously on…" recap plays first; it can be skipped and never plays on an immediate continuation.
- [ ] Progress survives a page reload.

**US-6 Try it without an account (Must)**
As a visitor, I want to try a short demo run, so I can decide whether to sign up.
- [ ] A guest can run the demo in accelerated time without logging in; progress is saved locally only.

**US-7 Save my progress to my account (Must)**
As a runner, I want to log in, so my progress follows me across devices.
- [ ] Sign up, log in, log out. Progress is stored per user in the database and restored after login.
- [ ] Guest progress is offered for import on first login.

**US-8 Manage episodes (Should)**
As an editor, I want to add and edit episodes and scenes, so new content ships without code changes.
- [ ] Only users with the editor role can create, edit, reorder and publish scenes (type, duration, audio file, prerequisites).
- [ ] Invalid manifests (missing audio, broken prerequisites) cannot be published.

**US-9 Public API (Should)**
As a developer, I want a documented API, so I can read episodes and manage my own progress.
- [ ] `GET` endpoints for episodes and scenes; authenticated endpoints for progress.
- [ ] OpenAPI documentation published with the app.

## 5. Scheduling and state rules (core logic, test first)
1. Scheduling is a pure function: `(episode manifest, duration, saved checkpoint) → timeline`. Same input gives the same output; it never reads the clock.
2. Scene types: opening, core, optional, climax, ending, sign-off, recap, compressed-ending. Optional scenes fill longer durations and may be dropped; core scenes keep story order.
3. A scene plays only after the scenes it depends on have played.
4. No overlapping clips, no negative times, nothing scheduled past the session end.
5. A finished run is not a finished episode. The episode becomes "complete" once, only after the ending has fully played.
6. Saved progress is always a valid checkpoint (3 checkpoints in Ep1: after departure, windmills on the horizon, facing the windmills). Audio load or playback failure never marks progress complete.
7. Pressing Stop twice does not create duplicate or conflicting state changes.

## 6. Screens
Home/duration picker (with "Continue" card) · Running (large remaining time, scene caption and speaker, story progress bar, Pause, Stop) · Stop dialog · Resume/recap · Login · Editor (Should).

## 7. Technical approach
Next.js + Tailwind, Next.js API routes, PostgreSQL (Supabase) with auth (JWT/OAuth), deployed on Vercel. Vitest for unit and integration tests, Playwright for E2E, failing tests committed first. GitHub Actions: lint → test → build → security scan, with PR preview deploys.
Content: pre-generated audio clips (TTS, two voices) described by a versioned manifest. Include an accelerated demo mode for presentations.

## 8. Content rules
Craft and wording rules (scene-setting lines, two-voice dialogue, encouragement and charge beats, sound effects): `docs/content/script-style-guide.md`.
- Source: *Don Quixote* (public domain); English only from public-domain translations (e.g. Ormsby 1885). No modern copyrighted translations, no lines from films or musicals, no imitation of real actors' voices.
- New writing allowed: dialogue, jokes, bridge lines, recaps, teasers. Not allowed: new plot events, characters, places or endings.
- Tone: light and silly, no shouting or shaming; never judge the runner's body or speed. The runner is Don Quixote's second squire.

## 9. Non-functional requirements
Mobile Safari and Chrome. Large simple controls usable while moving. Accessible labels and captions for all spoken lines. No location or health data collected. Keep secrets in environment variables.
**Safety:** the app never encourages continuing a run to finish the story; stopping for any reason is always respected, and the app makes no claim that running with audio is safe.

## 10. Risks
| Risk | Response |
|---|---|
| iOS/Android stop audio when the screen locks | Spike early; play the schedule as one continuous audio stream if needed; state limits honestly |
| Scripts sound like "AI" | Keep the original plot as the skeleton; human-review every scene |
| Too many scenes to write and review | One episode only, about 17 scenes |
| Scope creep (auth, editor, API on top of the core) | Core scheduler and player first; Should stories are cut before Must stories |

## 11. Delivery plan
- **Sprint 1:** repo and CI, manifest and scheduler (TDD), player, duration picker and running screen, auth, database schema, background-audio spike.
- **Sprint 2:** early-stop flow and compressed ending, checkpoint and resume, guest demo, editor tools, public API and OpenAPI docs, deployment, demo video.

## 12. Definition of done
1. The deployed app lets a user choose 20/30/45 minutes and play the episode.
2. The scheduler produces valid timelines for all three durations from the real manifest (unit-tested, no 45-minute waits).
3. Stop → Finish now and Stop → Save both work; resume restores the right checkpoint.
4. Login works and progress is stored per user; guests can try the demo.
5. Unit, integration and at least one E2E test pass in CI.

## 13. Decisions and open questions
**Decided 2026-10-30** (see `docs/features/README.md`):
- D1: scope follows the P2 spec (full stack, auth, database, public API, 3+ features or roles).
- D2: the story is fitted to the chosen duration; climax in the last 3 minutes.
- D3: early stop: Save for next time is Must, Finish the story now is Should.
- D4 (2026-10-31): authentication uses Supabase Auth (see `docs/decisions/0005-auth-supabase.md`).
- Feature-level scope, MoSCoW and acceptance details live in `docs/features/FR-xx` and win over this summary if they differ.

**Open:**
1. **Audio:** pre-generated TTS files vs. browser speech (browser speech cannot play on a locked screen).
2. **Script review:** who decides whether the English comedy "sounds like Sancho"?
3. **Optional later validation:** 5–10 target runners, one session each plus a short interview, asking what they remember and whether they want the next episode.

## 14. Parking lot (TBD, not part of the P2 scope)
Ideas we may revisit after P2 if time allows. Do not plan, build or write issues for them as part of P2. Details in `docs/features/parked/`.
- **P3 Heart-rate display and rhythm-adaptive story:** show heart rate on the Running screen and adapt the story to heart rate and pace (extends US-3). Needs a privacy decision (the NFR says no health data) and has web limits (Web Bluetooth works on Android Chrome only). See [P3](features/parked/P3_heart_rate_adaptive_story.md).
- P1 in-app music ducking: [P1](features/parked/P1_in_app_music_ducking.md).
