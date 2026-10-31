# 0004 Early stop: Save is Must, Finish now is Should

- **Status:** Accepted (2026-10-30)

## Context
Runners stop early for discomfort, injury, schedule or interruption. The interviews did not show that closure is a pain point, but never cutting a runner off mid-story is a core promise. Stopping must always be respected.

## Decision
Stop pauses the audio and offers Save for next time, Finish the story now and Keep running. **Save for next time** is Must: it plays a short sign-off and stores the last completed checkpoint. **Finish the story now** is Should: it plays a compressed ending and marks the episode complete only after it has fully played. Saved progress is always one of three valid checkpoints. The app never encourages continuing a run to finish the story.

## Consequences
- Every scene needs a checkpoint position, and some need a compressed variant (extra writing).
- Pressing Stop twice must not create duplicate state changes; the state machine is tested for it.
- If time runs short, Finish now is cut before Save.
