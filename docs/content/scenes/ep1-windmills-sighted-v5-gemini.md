# Ep1 test scene: windmills sighted (v5, spoken version for Gemini TTS)

**Source:** Ormsby 1885, Part I, ch. VIII. Events kept: windmills sighted, Sancho says windmills, Don Quixote says giants and scolds him, lance lowered, the charge begins. All other text is new writing.
**Changes from v4:** Pass 2 of `../adaptation-prompt.md` applied: more interruptions and cut-off lines, shorter sentences, "Master—" cut-ins, fewer formal phrases. Written for Gemini TTS (2 speakers, angle-bracket tags, style outside the spoken text). "Don Quixote" is labeled `Quixote` and is not spoken by name, to avoid pronunciation problems.
**Voices:** audition at least three pairs on the first 8 lines before generating the full scene.

## 1. Style / director note (paste in the style or system-instruction box, NOT in the script)
```
Comedy audio drama between two friends, natural and unrehearsed, like a real conversation.
Sancho: tired, dry, earnest; a normal, practical man who only wants to go home alive. He is never trying to be funny. When he talks to the listener ("friend") he drops to a low, conspiratorial half-whisper. He opens the scene in the hushed voice of a nature documentary.
Quixote: older, completely sincere, grand but not shouting all the time. He goes quiet and deadly serious when he is most certain. He is proud, lovable and absurd.
Pacing: short pauses before dry punchlines, interruptions where a line ends with a dash, no singsong rhythm, no radio-announcer delivery.
```

## 2. Speakers
- Speaker 1 name: `Sancho`
- Speaker 2 name: `Quixote`
- Voices: try these pairs and pick by ear: (Sancho: Puck, Quixote: Charon), (Sancho: Zephyr, Quixote: Charon), (Sancho: Puck, Quixote: Kore). Characteristics of each voice are not verified here; judge by listening.

## 3. Script (paste in the transcript/text box)
```
Sancho: Friend. <short pause> Picture the ridge up ahead. Forty windmills, tall as cathedrals, big wooden sails groaning round and round. Every time one crosses the sun, the shadow sweeps over us like the hand of a clock. <short pause> Totally normal countryside. <short pause> Except my master just saw them.
Quixote: Sancho.
Sancho: Oh, no.
Quixote: Do you see them?
Sancho: Yes.
Quixote: Giants.
Sancho: Windmills.
Quixote: Thirty giants! Maybe a thousand! I did not count! |Master—| Four enormous arms each!
Sancho: Master— they grind flour. For bread. You LIKE bread.
Quixote: Bread? <short pause> BREAD? Destiny is standing right there, and you want to talk about bread?
Sancho: <sigh> It is very good bread.
Quixote: <short pause> Sancho. The one on the left.
Sancho: The windmill?
Quixote: The giant. He has been watching us.
Sancho: He has no eyes.
Quixote: Precisely. <long pause> A professional.
Sancho: Friend, you're still with me? <short pause> Good. One of us should be.
Quixote: Look! He waves! He is challenging me!
Sancho: That's the wind, master.
Quixote: And why is the wind blowing?
Sancho: Because— <short pause> huh. Actually, I don't know.
Quixote: AHA! Even you admit there is a mystery!
Sancho: He won. <short pause> He actually won one. <long pause> Okay, master— before you attack. If you destroy it, who pays for the windmill?
Quixote: <short pause> The king.
Sancho: Which king?
Quixote: We will discuss that AFTER the battle.
Sancho: Friend, he's doing the thing with the lance. Whatever happens, do NOT follow him. Stay with me. Far behind. The next county.
Quixote: FOR GLORY!
Sancho: <sigh> I should have stayed home and eaten the bread.
Sancho: <short pause> Oh. He's actually going. <short pause> Friend... I think we are about to witness something very expensive.
```
About 270 words, roughly 110–120 seconds.

## 4. If it goes wrong
- **Names or instructions are read aloud:** the style note is in the wrong box, or the speaker names do not match exactly (`Sancho`, `Quixote`). Move the note out of the script and check the names.
- **Tags read as words** (e.g. "short pause"): the model does not accept that tag; remove the tags, keep dashes and ellipses, and add pauses by editing the audio afterward.
- **`|Master—|` overlap does not work or sounds odd:** delete it. It is experimental.
- **Too theatrical:** shorten the style note, remove "grand" and "absurd" from it.
- **Still awkward:** generate the same text with ElevenLabs Text to Dialogue and compare; follow `../adaptation-prompt.md` for the other format.

## 5. Safety check
No pace, speed or effort remark about the runner. "Do NOT follow him" is an in-story action. Nothing pushes the runner to continue.
