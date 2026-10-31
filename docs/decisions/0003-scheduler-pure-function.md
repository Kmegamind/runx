# 0003 The scheduler is a pure function

- **Status:** Accepted (2026-10-30)

## Context
The story must fit 20, 30 or 45 minutes with the climax in the last 3 minutes (decision D2 in the PRD). Testing this by waiting real minutes is impractical, and timing bugs would only show up mid-run.

## Decision
`buildTimeline(manifest, durationMin, checkpoint)` returns a timeline and never reads the clock, the DOM, the network or storage. The clock, audio and storage are injected into the code that uses it. If the remaining required story does not fit, the result says so; the scheduler never forces the climax out of order to fill time.

## Consequences
- Unit tests cover all durations and checkpoints instantly, and the same input always gives the same output.
- Callers must pass time and state in; the E2E flow uses an accelerated clock.
- Any change that makes the scheduler read the outside world is a defect.
