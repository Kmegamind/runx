# 0002 Pre-generated audio clips, not browser speech

- **Status:** Accepted (2026-10-30), to be re-checked by the lock-screen spike (issue #8)

## Context
Browser speech synthesis cannot play when the phone screen is locked, and runners keep the phone in a pocket. Voices also differ by device, which breaks the two-character comedy. The PRD lists this as an open question and a risk.

## Decision
Generate the clips ahead of time with a text-to-speech tool (two voices), describe them in a versioned manifest, and load them before the run starts (`scripts/tts/gemini_tts.py`, `scripts/audio/mix_scene.py`). Playback does not need the network.

## Consequences
- Same voices on every device; works with the screen locked if the spike confirms it.
- Editing a scene means regenerating its clip; clips need storage and a loading step before the clock starts.
- Source texts and generated audio stay out of git (`data/`, `out/` are ignored); only public-domain text and licensed sounds are used.
