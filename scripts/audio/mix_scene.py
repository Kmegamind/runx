# /// script
# requires-python = ">=3.10"
# dependencies = ["imageio-ffmpeg"]
# ///
"""Mix a generated voice track with sound effects and a music bed (cue file driven).

Usage (from the runx folder):
    uv run scripts/audio/mix_scene.py docs/content/scenes/ep1-windmills-sighted.cues.json
    uv run scripts/audio/mix_scene.py <cues.json> --dry-run      # print the ffmpeg command only
    uv run scripts/audio/mix_scene.py <cues.json> --strict       # fail if an asset file is missing

Uses the ffmpeg binary shipped with the imageio-ffmpeg package, so nothing needs installing system-wide.

Cue file (JSON):
{
  "voice": "out/windmills_v5_full.wav",        # WAV from gemini_tts.py (24 kHz mono)
  "output": "out/windmills_v5_mixed.mp3",      # .mp3 or .wav
  "tail_sec": 1.5,                              # silence kept after the last word
  "target_lufs": -16,                           # overall loudness
  "music": {                                    # optional
    "file": "assets/music/ambient_bed.mp3", "volume_db": -22,
    "fade_in_sec": 2, "fade_out_sec": 3,
    "duck_ratio": 8, "duck_threshold": 0.03     # music dips while the voice speaks
  },
  "sfx": [                                      # optional, any number
    {"file": "assets/sfx/wind_loop.wav", "at_sec": 0, "volume_db": -26, "loop": true, "until_sec": 40},
    {"file": "assets/sfx/sail_creak.wav", "at_sec": 7.5, "volume_db": -18}
  ]
}
Times are seconds from the start of the voice file. Paths are relative to the runx folder.
"""
import argparse
import json
import subprocess
import sys
import wave
from pathlib import Path

import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[2]


def wav_duration(path: Path) -> float:
    with wave.open(str(path)) as w:
        return w.getnframes() / w.getframerate()


def resolve(p: str) -> Path:
    return (ROOT / p) if not Path(p).is_absolute() else Path(p)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("cues")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--strict", action="store_true", help="fail on missing asset files instead of skipping")
    args = ap.parse_args()

    cues = json.loads(Path(args.cues).read_text(encoding="utf-8"))
    voice = resolve(cues["voice"])
    if not voice.exists():
        sys.exit(f"Voice file not found: {voice}")
    out = resolve(cues["output"])
    total = round(wav_duration(voice) + float(cues.get("tail_sec", 1.5)), 3)

    inputs: list[str] = ["-i", str(voice)]
    filters: list[str] = []
    mix_labels: list[str] = []
    n_in = 1  # input 0 is the voice

    def missing(kind: str, p: Path) -> bool:
        if p.exists():
            return False
        if args.strict:
            sys.exit(f"Missing {kind} file: {p}")
        print(f"warning: skipping missing {kind} file: {p}")
        return True

    music = cues.get("music")
    use_music = bool(music) and not missing("music", resolve(music["file"]))

    # Voice: pad with the tail, then split if the music needs it as the ducking sidechain.
    filters.append(f"[0:a]apad=whole_dur={total}[vp]")
    if use_music:
        filters.append("[vp]asplit=2[vmix][vsc]")
    else:
        filters.append("[vp]anull[vmix]")
    mix_labels.append("[vmix]")

    if use_music:
        inputs += ["-stream_loop", "-1", "-i", str(resolve(music["file"]))]
        fi = float(music.get("fade_in_sec", 2))
        fo = float(music.get("fade_out_sec", 3))
        filters.append(
            f"[{n_in}:a]atrim=duration={total},asetpts=PTS-STARTPTS,"
            f"volume={music.get('volume_db', -22)}dB,"
            f"afade=t=in:d={fi},afade=t=out:st={max(total - fo, 0)}:d={fo}[mus]"
        )
        filters.append(
            f"[mus][vsc]sidechaincompress=threshold={music.get('duck_threshold', 0.03)}:"
            f"ratio={music.get('duck_ratio', 8)}:attack=15:release=500[mduck]"
        )
        mix_labels.append("[mduck]")
        n_in += 1

    for i, fx in enumerate(cues.get("sfx", [])):
        p = resolve(fx["file"])
        if missing("sfx", p):
            continue
        at = float(fx.get("at_sec", 0))
        chain = []
        if fx.get("loop"):
            until = float(fx.get("until_sec", total))
            inputs += ["-stream_loop", "-1", "-i", str(p)]
            chain.append(f"atrim=duration={max(until - at, 0.1)}")
        else:
            inputs += ["-i", str(p)]
        chain.append("asetpts=PTS-STARTPTS")
        if fx.get("fade_in_sec"):
            chain.append(f"afade=t=in:d={fx['fade_in_sec']}")
        if fx.get("fade_out_sec") and fx.get("loop"):
            d = float(fx["fade_out_sec"])
            chain.append(f"afade=t=out:st={max(float(fx.get('until_sec', total)) - at - d, 0)}:d={d}")
        chain.append(f"volume={fx.get('volume_db', -18)}dB")
        chain.append(f"adelay={int(at * 1000)}:all=1")
        label = f"[s{i}]"
        filters.append(f"[{n_in}:a]{','.join(chain)}{label}")
        mix_labels.append(label)
        n_in += 1

    lufs = cues.get("target_lufs", -16)
    filters.append(
        f"{''.join(mix_labels)}amix=inputs={len(mix_labels)}:normalize=0:duration=longest:dropout_transition=0,"
        f"loudnorm=I={lufs}:TP=-1.5:LRA=11,aresample=44100[out]"
    )

    codec = ["-c:a", "libmp3lame", "-b:a", "128k"] if out.suffix.lower() == ".mp3" else ["-c:a", "pcm_s16le"]
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [ffmpeg, "-y", *inputs, "-filter_complex", ";".join(filters), "-map", "[out]",
           "-t", str(total), *codec, str(out)]

    print(f"voice {wav_duration(voice):.1f}s + tail -> {total}s; {len(mix_labels) - 1} extra track(s); target {lufs} LUFS")
    if args.dry_run:
        print(" ".join(f'"{c}"' if " " in c else c for c in cmd))
        return
    out.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit("ffmpeg failed:\n" + r.stderr[-1500:])
    print(f"saved {out} ({out.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
