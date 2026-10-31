# assets/

Sound files for scene mixing (`scripts/audio/mix_scene.py`). Put a file in the path the cue file expects.

```
assets/sfx/    wind_loop.wav  sail_creak.wav  sail_whoomp.wav  lance_scrape.wav  hoofbeats.wav
assets/music/  ambient_bed.mp3
```

Rules:
- **Licenses:** only CC0 or clearly licensed for commercial use. Record every file in `docs/SOURCES.md` (name, source URL, license, date).
- **Music:** prefer an ambient bed without a clear beat; a steady beat may pull on a runner's step rate (hypothesis, untested). Rhythmic music only for charge scenes, and test it.
- **Volume:** effects stay well under the dialogue; no sudden loud peaks (outdoor runners must hear their surroundings).
- **Loops:** `wind_loop.wav` and the music bed should loop without a click; the mixer fades them in and out.
