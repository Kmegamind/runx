# Feature PRD — Deterministic story scheduling

**Feature ID:** FR-04 · **Stories:** US-2, US-3, US-5 · **Screens:** none directly (drives Running) · **Status:** v2, rewritten 2026-10-30 (D2 applied)

## 1. Problem and desired outcome
Fit the story into the chosen run length so the ending lands when the run ends, without breaking plot dependencies. This is RunX's core differentiator and its most testable piece.

## 2. Interview evidence (observed, not validated demand)
Jordan ran 41 minutes instead of 30 to follow a compelling podcast; Kyle often runs to audiobook chapter boundaries; Brianna's available time varies. These show tension between story and schedule. They do not prove automated scheduling improves running.

## 3. Assumptions to test
| # | Assumption | Proof it is wrong |
|---|---|---|
| S1 | A story that ends with the run is better than an audiobook | Testers prefer stopping at a chapter boundary regardless of time |
| S2 | A climax in the last 3 minutes feels like a payoff, not a sprint prompt | Testers feel pushed to run faster in the final minutes |
| S3 | Dropping optional scenes for shorter runs is acceptable | Testers on 20 min say they missed important story |

## 4. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | Pure function `buildTimeline(manifest, durationMin, checkpoint)` · same input gives same output · 20/30/45 timelines end within ±15 s of the chosen length · climax within the last 3 min · prerequisites before dependents · no overlaps, no negative gaps · optional scenes dropped first · from a checkpoint, rebuild from remaining scenes · result `doesNotFit` with the shortest workable duration when required scenes cannot fit |
| **Should** | Encouragement scenes at the beats in `docs/content/script-style-guide.md` §4 (one near the middle for every length; a second at about 70% for 30 and 45 min; hypotheses, to be checked in trial runs) · optional in-story "charge" invitation in the last 3 min (an invitation, never a command) · gaps spread evenly · never starts a scene that cannot finish before the ending window |
| **Could** | Seeded variation of optional scenes between runs |
| **Won't** | Adapting to live pace or heart rate (parked, see [P3](parked/P3_heart_rate_adaptive_story.md)) · forcing the climax out of order to fill time · sprint or pace commands |

## 5. Acceptance criteria
- [ ] Given the Ep1 manifest and 20, 30 or 45 min, then the timeline end is within ±15 s of that length.
- [ ] Given any timeline, then the climax starts within the last 3 minutes.
- [ ] Given a checkpoint, then no required scene before it is replayed and none after it is skipped.
- [ ] Given a duration too short for the remaining required scenes, then the result is `doesNotFit` with a minimum duration, and no scene order is violated.
- [ ] Given identical input twice, then the two outputs are deeply equal.
- [ ] Tests run with an injected clock; no test waits for real minutes; sparse-content, pause and resume cases are covered.

## 6. Screens and states
Indirect: story progress bar segments in Running (warm-up, rising, climax, epilogue) come from the timeline.

## 7. Validation
After listening to different-length versions, ask testers to retell the story; compare comprehension and interruption frustration.

## 8. Dependencies
FR-03 (manifest), FR-02 (duration), FR-06 and FR-07 (checkpoints), FR-05 (playback).

## 9. Change log
- 2026-10-30 v2: D2 decided (fit the story to the session, climax at the end). The earlier "do not force the climax" rule now applies only to out-of-order forcing and to checkpoints that do not fit; those return `doesNotFit`.
