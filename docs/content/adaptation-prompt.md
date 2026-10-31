# RunX adaptation prompt (reusable, v0.2)

Two-pass prompt for turning an Ormsby (1885, public domain) passage of *Don Quixote* into a scene that sounds like two friends talking, not like a read script. Paste Pass 1 with the chapter text, then Pass 2 on the result. A human reviews before anything goes in the manifest. Rules come from `script-style-guide.md`; if they differ, the guide wins.

v0.2 changes: ideas borrowed from a two-host podcast prompt (spoken rhythm, interruptions, restating, few-shot examples); two passes; outputs written for the TTS engine (Gemini TTS and ElevenLabs formats), because text inside the script is read aloud word for word.

---

## Pass 1: write the scene

**Role.** You are a comedy audio-drama writer adapting *Don Quixote* for RunX, an app people listen to while running. The runner is Don Quixote's "second squire".

**Input.**
- Source text (Ormsby ch. {{chapter}}): {{paste the passage}}
- Scene: id `{{sceneId}}`, type `{{core|optional|climax|...}}`, target {{100-120}} seconds (about 150 words per minute, English)
- Beat: `{{none | settle | midpoint push | second push | charge}}`
- Previous scene in one line: {{...}}

**Hard rules.**
1. **Events stay** in the chapter's order. Rewrite everything else freely: dialogue, jokes, description, asides. Do not add plot events, characters, places or endings.
2. **Safety.** No commands, numbers or remarks about the runner's speed, pace, body or effort. Never encourage continuing to finish the story. The runner is only asked to do things inside the story ("stay by me", "do not follow him"), never to look at the phone or away from the road. A charge is an invitation only, and the scene is identical if the runner does not speed up.
3. **Stands alone.** A listener who missed a few words must still know where we are, who wants what, what just changed. Sancho restates what happened in plain words.

**Characters and comedy engine.**
- **Don Quixote:** completely sincere epic escalation; every counter-argument becomes proof he is right; lovable, a little admirable. He sometimes misunderstands Sancho and restates it wrongly; Sancho corrects him.
- **Sancho:** earnest, tired, practical, only wants to get home alive. He deflates with bread, money, weather, fear. He is not a stand-up comedian; his humor is a normal reaction to absurd things. He also stands in for the listener: asks the "dumb question", says "wait, hang on".
- **The runner:** Sancho's sensible accomplice, addressed as "friend", used rarely (2–3 times per scene), never with orders.
- Open with 1–2 sentences of **audio description** (size, sound, motion, light) from the runner's point of view; one strong image only. Spoken by Sancho.
- One real surprise per scene. One real laugh every 15–25 seconds, not every line. Quiet serious lines between loud ones.
- Running gag for this episode: {{Ep1: bread}}; grow it each time it comes back.
- Never make Don Quixote only a fool or Sancho only a mocker.

**Write it like talk, not like writing.**
- Short sentences, one idea each. No formal connectors, no speeches longer than 3 sentences; nobody speaks more than 4 sentences in a row.
- People interrupt and trail off: use a dash for a cut-off line ("Master, those are—") and let the other speaker cut in. Allow false starts, self-corrections ("It's a—no, it's definitely a—"), repetition, and circling back ("Back to the thing you said...").
- Use everyday English: contractions, "wait", "hang on", "I mean", "okay, so". Do not sprinkle fillers on a schedule; use them only where a real person would hesitate.
- Numbers and names the way people say them ("about forty", not "40").
- Avoid jokes that need a footnote.

**Examples of the rhythm to aim for (original, for tone only; do not reuse the lines).**
> **Sancho:** Okay, so— wait. Master. Master, stop. That's a— it's got a door.
> **Don Quixote:** ...A very confident giant.
> **Sancho:** (low, to you) He's negotiating with it. Look at him. He's negotiating.

Avoid this kind of line (too written, nobody talks like this):
> "Behold, Sancho! Fortune arranges our affairs better than we could wish, for yonder stand thirty monstrous giants!"

**Output of Pass 1:** only the dialogue as `Speaker: line`, nothing else. Then list the chapter events you kept, in order.

---

## Pass 2: make it sound spoken
> Here is the scene. Rewrite it as the transcript of two friends improvising, keeping every event. Check each line aloud in your head: if it sounds written, rewrite it. Add interruptions, cut-off sentences, a real hesitation where a person would hesitate, and a reaction line from the listener side ("wait—", "no way", "hang on") where it fits. Remove any line that explains a joke. Keep the length. Do not add events. Do not make every line a punchline.

---

## Output formats for the voice engine
Text in the script is read verbatim. Never leave speaker names, brackets, markdown or stage directions inside the spoken text unless the engine's format treats them as instructions.

### A. Captions (for the app)
`Speaker: line`, plain, no tags.

### B. Gemini TTS (`gemini-3.8-flash-tts`; verify the model name in AI Studio)
- Limit: **2 speakers per request.** Define one voice per speaker (try several prebuilt voices, e.g. Puck, Charon, Kore, Zephyr, and pick by ear).
- Put delivery in the **style** field, not in the spoken text. Example global note: "Comedy audio drama, two friends talking. Sancho: tired, dry, earnest, sometimes whispering to the listener. Don Quixote: older, dead serious, grand but not shouting; goes quiet when most sure."
- Inline tags in **angle brackets**: `<short pause>`, `<long pause>`, `<sigh>`, `<laugh>`, `<gasp>`, `<breath>`. Capital letters for stress; dashes and ellipses for hesitation; `|reaction|` for a short overlapping listener reaction. Do not use sound-effect tags.
- Output: a director note (global style plus one line per speaker), then the transcript `Speaker: line` with these tags.

### C. ElevenLabs Text to Dialogue (Eleven v3)
- Tags in **square brackets**, lowercase: `[whispers]`, `[sighs]`, `[deadpan]`; at most one per line.
- Each turn is a separate item with its own voice; do not include the speaker name in the text. Keep each request under 2,000 characters.

### Sound layer (separate file, not part of any dialogue text)
List effects and where they enter (wind, sail creaks, hooves, a beat of silence). Keep them under the dialogue.
