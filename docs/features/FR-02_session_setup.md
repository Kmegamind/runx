# Feature PRD — Session duration selection

**Feature ID:** FR-02 · **Stories:** US-2 · **Screens:** Home (duration picker) · **Status:** v2, rewritten 2026-10-30 (D1–D3 applied)

## 1. Problem and desired outcome
Let a runner set today's run length in one or two taps, without imposing a training plan. The story is then fitted to that length (D2).

## 2. Interview evidence (observed, not validated demand)
Brianna's duration is limited by work and daylight. Aisha uses a fixed 25-minute treadmill timer. Jordan plans 30 minutes but once ran 41 to follow a podcast. Natalie treats planned time as aspirational. A fixed 20/30/45 menu does not match all of these.

## 3. Assumptions to test
| # | Assumption | Proof it is wrong |
|---|---|---|
| A1 | Runners pick the length right before running | Most follow a fixed plan and never choose on the spot |
| A2 | 20 / 30 / 45 covers most runs | More than a third of testers ask for another length (25, 60, "until I stop") |
| A3 | A story that ends with the run matters | Testers do not notice or care how the audio ends |

## 4. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | Presets 20 / 30 / 45 min, 30 preselected, exactly one selected · selection goes to the scheduler · one tap to start · changing duration before start rebuilds a valid plan |
| **Should** | Custom duration, 15–60 min in 5-minute steps (interview evidence: 25 and 41 min) · "Story ends at HH:MM" before starting · remember the last duration |
| **Could** | Add a 25-minute preset |
| **Won't** | GPS, pace, training plans, auto-adjusting to live running speed |

## 5. Acceptance criteria
- [ ] Given Home, then 30 min is selected by default and choosing another chip deselects it.
- [ ] Given a selection, when I tap Start, then the scheduler receives that duration in minutes (converted to seconds inside the app).
- [ ] Given I change the duration before Start, then the plan is rebuilt and a valid timeline exists for every preset.
- [ ] Given a custom duration (Should) below the minimum the required scenes need, then I see a message with the shortest allowed length.
- [ ] Copy says the story is fitted to this length; it never promises results beyond the scheduler's rules.
- [ ] Chips have 44 px touch targets and accessible names.

## 6. Screens and states (for the mockup)
Home with chips (30 selected) · chip row with custom entry (Should) · "Story ends at 7:42 pm" hint (Should).

## 7. Validation
Observe whether testers use presets or ask for another length; ask what decided their most recent run length.

## 8. Dependencies
FR-04 (scheduler input), FR-01 (same screen), FR-07 (last used duration).

## 9. Open questions
Minimum custom duration the Ep1 content supports (depends on required scenes in FR-03).

## 10. Change log
- 2026-10-30 v2: custom duration promoted from "after MVP" to Should based on interview durations; MoSCoW and checklists added.
