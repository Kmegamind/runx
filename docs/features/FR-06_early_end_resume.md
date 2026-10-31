# Feature PRD — Early stop, resume and recap

**Feature ID:** FR-06 · **Stories:** US-4, US-5 (recap merged from former P2) · **Screens:** Stop dialog, Home (Continue), Resume · **Status:** v2, rewritten 2026-10-30 (D3 applied)

## 1. Problem and desired outcome
Respect the runner's decision to stop, never push them to continue, and let them pick the story up next time. Offer to finish the story now only as an option.

## 2. Interview evidence (observed, not validated demand)
Brianna does not mind audio continuing after she stops; Aisha paused and resumed a podcast later; Jordan often pauses and finishes in his van; Natalie keeps music on while walking home. A special 30-second ending is therefore not a demonstrated pain point, which is why "Save" is Must and "Finish now" is Should. Jordan disliked an unnecessary recap right after part one; Kyle replays earlier chapters after long gaps, so a recap should depend on the gap and be skippable.
Safety (from the interview summary): runners stop because of discomfort, injury, schedule or interruption. The product never encourages continuing for story completion.

## 3. Assumptions to test
| # | Assumption | Proof it is wrong |
|---|---|---|
| B1 | Runners often stop earlier than planned | Almost nobody stops early |
| B2 | They care how the story is left | They do not care and only remove earbuds |
| B3 | Some want closure today, others want to save it | Everyone picks the same option (then make it the default) |
| B4 | They can press a button on the phone at the moment of stopping | They never touch it (then support the earbud button) |
| C1 | After a break they want to continue, not restart | They are fine restarting |
| C2 | A recap helps after several days | Testers find it unnecessary or annoying |

## 4. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | Stop pauses audio and shows **Save for next time** / **Keep running** (and Finish now when Should is built) · current line finishes first · Save stores the last completed checkpoint, plays a short neutral sign-off, keeps the episode "in progress" · Stop before the opening scene ends offers only Save · resume continues from the checkpoint without skipping required scenes · different duration allowed, timeline rebuilt (FR-04) · `doesNotFit` shows a message and a longer-duration option · Restart episode · double Stop causes no duplicate state change |
| **Should** | **Finish the story now**: compressed ending for the current checkpoint, marks the episode complete only after it finishes · show how long it takes · recap of 30–60 s only after a gap (default 3 days, a guess) and never on immediate continuation · Skip recap |
| **Could** | Default to Save if no choice is made after 10 seconds · gentle line when stopping very early |
| **Won't** | Skipping to the climax · guilt, streak-loss or "keep going" messages · nagging notifications |

## 5. Acceptance criteria
- [ ] Given Running, when I tap Stop, then audio pauses and the dialog appears; Keep running resumes from the same position.
- [ ] Given Save, then the last completed checkpoint is stored, a sign-off plays, and the episode is not marked complete.
- [ ] Given Finish now (Should), then the compressed ending plays and the episode becomes complete only after it ends; a failure leaves it in progress.
- [ ] Given a saved checkpoint, when I return, then Home shows Continue and playback starts from that checkpoint.
- [ ] Given a gap longer than the threshold, then a recap plays first and Skip recap goes straight to the saved point; given an immediate continuation, no recap plays.
- [ ] Given the remaining required story does not fit the chosen duration, then a message offers a longer duration and nothing is skipped silently.
- [ ] Ending a session never marks the episode complete unless the true final scene finished.

## 6. Screens and states (for the mockup)
Stop dialog with Save / Keep running (Finish now shown as the Should option) · sign-off playing · Home Continue card · Resume screen with progress bar, recap line, duration chips, Continue and Restart.

## 7. Validation
Observe whether users understand what is saved and whether they continue later; do not treat hypothetical approval as demand.

## 8. Dependencies
FR-03 (checkpoints, compressed endings, recap scenes), FR-04, FR-05, FR-07.

## 9. Open questions
Is a 3-day recap threshold right? No evidence yet; calibrate in the Mom Test round.

## 10. Change log
- 2026-10-30 v2: D3 applied (Save is Must, Finish now is Should); recap from former P2 merged and made conditional and skippable; safety rule added.
