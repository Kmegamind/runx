# /// script
# requires-python = ">=3.10"
# dependencies = ["google-genai"]
# ///
"""Generate a RunX scene with Gemini TTS (two speakers).

Usage (from the runx folder):
    export GEMINI_API_KEY=...        # set it in your own terminal, never paste it in chat or commit it
    uv run scripts/tts/gemini_tts.py --dry-run          # check parsing, no API call
    uv run scripts/tts/gemini_tts.py                    # generate out/windmills_v5.wav
    uv run scripts/tts/gemini_tts.py --sancho Zephyr --quixote Charon --out out/pair2.wav

Why this differs from a plain generate_content(prompt) call:
- The text is read verbatim, so instructions and "Name:" labels must NOT be in the text.
  Each turn is its own part with speech_metadata (speaker + style).
- Two speakers need multi_speaker_voice_config; a single voice_config gives one voice for everything.
- Use a TTS model (gemini-3.8-flash-tts); gemini-2.0-flash is not a TTS model.
"""
import argparse
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCENE_FILE = ROOT / "docs/content/scenes/ep1-windmills-sighted-v5-gemini.md"

# Style is delivery direction, kept out of the spoken text (the model reads text verbatim).
STYLE = {
    "Sancho": "tired, dry, earnest, deadpan exhaustion; a practical man who only wants to go home alive; "
              "never trying to be funny; when he says 'friend' he drops to a low conspiratorial half-whisper",
    "Quixote": "older, completely sincere, grand and proud but not shouting all the time; "
               "goes quiet and deadly serious when most convinced of something ridiculous",
}
SPEAKERS = ["Sancho", "Quixote"]


def load_turns(path: Path) -> list[tuple[str, str]]:
    """Read the code block under '## 3. Script' as (speaker, text) turns."""
    md = path.read_text(encoding="utf-8")
    section = md.split("## 3. Script", 1)[1]
    block = re.search(r"```\n(.*?)```", section, re.S).group(1)
    turns = []
    for line in block.strip().splitlines():
        if not line.strip():
            continue
        speaker, text = line.split(": ", 1)
        if speaker not in SPEAKERS:
            sys.exit(f"Unknown speaker {speaker!r} in line: {line[:60]}")
        turns.append((speaker, text.strip()))
    return turns


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default="gemini-3.8-flash-tts",
                    help="fallback to try: gemini-2.5-pro-preview-tts")
    ap.add_argument("--sancho", default="Puck")
    ap.add_argument("--quixote", default="Charon")
    ap.add_argument("--scene", default=str(SCENE_FILE))
    ap.add_argument("--out", default=str(ROOT / "out/windmills_v5.wav"))
    ap.add_argument("--max-turns", type=int, default=0, help="only the first N turns (voice audition)")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    turns = load_turns(Path(args.scene))
    if args.max_turns:
        turns = turns[: args.max_turns]

    parts = [
        {"text": text, "speech_metadata": {"speaker": speaker, "style": STYLE[speaker]}}
        for speaker, text in turns
    ]
    config = {
        "response_modalities": ["AUDIO"],
        "speech_config": {
            "multi_speaker_voice_config": {
                "speaker_voice_configs": [
                    {"speaker": "Sancho",
                     "voice_config": {"prebuilt_voice_config": {"voice_name": args.sancho}}},
                    {"speaker": "Quixote",
                     "voice_config": {"prebuilt_voice_config": {"voice_name": args.quixote}}},
                ]
            }
        },
    }

    chars = sum(len(t) for _, t in turns)
    print(f"{len(turns)} turns, {chars} characters, model={args.model}, "
          f"voices: Sancho={args.sancho}, Quixote={args.quixote}")
    if args.dry_run:
        for p in parts[:3]:
            print(" ", p["speech_metadata"]["speaker"], "->", p["text"][:70])
        print("dry run only; no API call made")
        return

    if not (os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")):
        sys.exit("Set GEMINI_API_KEY in your terminal first (export GEMINI_API_KEY=...).")

    from google import genai  # imported late so --dry-run works without the key

    client = genai.Client()
    response = client.models.generate_content(
        model=args.model,
        contents=[{"role": "user", "parts": parts}],
        config=config,
    )

    cand = response.candidates[0] if response.candidates else None
    audio = None
    if cand and cand.content and cand.content.parts:
        for part in cand.content.parts:
            if part.inline_data:
                audio = part.inline_data.data
                break
    if audio is None:
        sys.exit(f"No audio returned. finish_reason={getattr(cand, 'finish_reason', None)}; "
                 f"text={getattr(response, 'text', None)!r}")

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(audio)  # unary response is a WAV with header (24 kHz, mono, 16-bit)
    print(f"saved {out} ({len(audio) / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
