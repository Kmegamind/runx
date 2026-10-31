# RunX Script Style Guide (draft v0.1, 2026-10-30)

How every spoken scene in RunX is written. Used by human writers and by AI tools that draft scenes. Product-wide rules live in `PRD.md` §8 (content) and `AGENTS.md` §2 (safety); this guide adds the craft. Items marked **[HYPOTHESIS]** are untested guesses to check in a trial run; items marked **[OPEN]** need a team decision (list at the end).

## 1. What a scene sounds like
Five rules that make RunX different from an audiobook:

1. **Describe first, then talk.** Each scene opens with one or two sentences that tell the runner what they would see, like audio description for a listener who cannot see the screen. Then the characters talk.
   - Present tense, short, concrete: who is there, where, what is moving.
   - Describe only what helps follow the scene. No decoration for its own sake.
   - Use the runner's own point of view ("ahead of you", "beside you"), not a camera ("the shot moves").
2. **Two voices who talk to each other and to the runner**, in the manner of a two-host audio show. The runner is Don Quixote's *second squire*.
   - **Don Quixote:** grand, certain, announces what is happening in heroic terms.
   - **Sancho Panza:** down to earth, translates the grand talk into plain words, reacts, complains, jokes. He is the listener's safety net: he restates what just happened.
3. **Every scene stands alone.** A listener who missed a few words must still know where we are, who wants what, and what just changed. Sancho's restatement does this job.
4. **Go big, with character-driven comedy.** Safe and faithful is not the goal; fun is. Adapt boldly in voice, detail and exaggeration while the events stay the same. The jokes come from two people who are both completely sincere, not from a script full of punchlines.
   - **Comedy engine (use it in every comic scene):**
     - **Don Quixote: epic escalation.** He turns ordinary things into epic events, and every piece of counter-evidence becomes proof he is right. He is sincere, a little lovable, even admirable.
     - **Sancho: practical deflation.** He breaks the epic with bread, money, tiredness, weather. He is not a stand-up comedian; he really only wants to get home alive. His humor is a normal reaction to absurd things.
     - **The runner: the sensible accomplice.** Sancho treats the runner as the only sane person on the expedition and brings them in on the joke. Don Quixote never notices.
   - **Description with size, sound and motion:** one strong image, not three (taller than a church, a shadow like a clock hand). Give the listener something they could draw.
   - **Vary Don Quixote's volume.** Thunder alone gets tiring; mix in quiet, deadly serious lines ("He has been watching us." "He has no eyes." "Precisely. A professional.").
   - **One real surprise per scene:** at least once something unpredictable happens in the argument (Don Quixote "wins" a point; Sancho is convinced for half a second, then regrets it).
   - **Fewer punchlines, more performance:** one real laugh every 15–25 seconds, not every line; leave 1–2 seconds after a strong punchline; let sounds (hooves, sails, armor) replace explanation.
   - **Affection under the mockery:** never make Don Quixote only a fool or Sancho only a mocker. When it is really dangerous, Sancho still runs to help him.
   - **One running gag per episode** (Ep1: bread) that grows each time, plus a button line to close or hook the scene.
   - **Pull the runner in** with asides ("Stay by me, friend"), never with orders or remarks on pace.
   - **Facts a listener can hold:** numbers or counts can be a character gag (Don Quixote does not count) but must be clearly funny, not look like a script mistake. Literary jokes (e.g. Briareus) work only if understood in one hearing; otherwise keep them for scenes where the runner is not out of breath.
   - The only limits: events, characters and places stay as in the chapter; no commands or judgment of the runner (§4).
5. **Bridge before silence.** Before a long gap, one character says one line that tells the runner what comes next ("We ride on; I'll call you at the windmills").

**What the runner is asked to do** is limited to actions inside the story, for example "stay close to Sancho", "hold the line", "follow Rocinante". Never ask the runner to look at the phone, look away from the road, close their eyes or do any physical action other than running.

## 2. Scene anatomy (maps to the manifest, FR-03)
| Field | Rule |
|---|---|
| `type` | opening, core, optional, climax, ending, signoff, recap, compressed_ending |
| Length | 1 to 2 minutes spoken, about 150 to 300 words (150 words per minute) |
| Structure | 1 to 2 scene-setting sentences, then dialogue, then a bridge line if a gap follows |
| Source | Ormsby 1885 chapter and section it adapts; credited in `docs/SOURCES.md` |
| Caption | Every line has a speaker name and text; the transcript is the caption |
| Checkpoint | A scene that can be saved ends cleanly with no line cut in half |

## 3. Content rules (from PRD §8, kept here for writers)
- Skeleton = Ormsby's chapter. **New writing allowed:** dialogue, jokes, scene-setting lines, bridge lines, recaps. **Not allowed:** new plot events, characters, places or endings.
- Test every scene: remove the dialogue and keep only the events; they must match the chapter.
- No lines from films or musicals, no imitation of real actors.
- Tone: light and silly. Never shout at, shame or judge the runner. Never mention the runner's body or speed.

## 4. Encouragement and charge beats
**[HYPOTHESIS]** We found no study that says when during a 20, 30 or 45 minute run motivation dips. Coaching sources name boredom and the feeling of effort as the main triggers, and small studies suggest rhythm matters more than inspirational words. So the beats below are positioned as a percentage of the session and must be checked with 3 to 5 real runs, then adjusted.

| Beat | Purpose | 20 min | 30 min | 45 min |
|---|---|---|---|---|
| Warm-up (first about 10%) | Easy, funny, no pushing | yes | yes | yes |
| Settle (about 25%) | Fight boredom with comedy, not encouragement | no | yes | yes |
| Midpoint push (about 45–50%) | One short in-character encouragement | yes | yes | yes |
| Second push (about 70%) | Before the climax approaches | no | yes | yes |
| **Charge** (final 3 minutes) | The climax; an invitation to run with the story | yes | yes | yes |

Rules for every encouragement line: at most 15 seconds, in character, never repeated within one run, at least 6 variants per beat.

### The charge is an invitation, not a command
The charge is the story speeding up (windmill charge, duel). Words invite; they never order or measure.

| Do | Don't |
|---|---|
| "Rocinante breaks into a gallop. Ride with him if your legs feel good." | "Sprint now!", "Run faster!", "Speed up!" |
| "Sancho is already puffing. Stay beside him, friend." | "Keep your pace above ...", any number, time or speed |
| "Whatever the windmills are, we face them together." | "Don't stop", "You can't quit now", "Finish the story" |
| Same charge scene plays whether or not the runner speeds up | Any line that comments on how fast or tired the runner is |

Safety wording that always applies: stopping is always fine and never mocked; no line suggests continuing in order to finish the story; if the runner stops during a charge, the app follows the normal stop flow.

## 5. Worked example (original wording, events from Ormsby ch. VIII)
> **[Setting, Narrator-style line spoken by Sancho]** Ahead of you the plain opens up, and on the ridge stand thirty or forty windmills, white sails turning slowly.
> **Don Quixote:** Behold, squire! Fortune lines up our enemies. Thirty giants, with arms two leagues long!
> **Sancho:** Giants? Master, they're windmills. Those arms are sails, and the wind turns them to grind flour. Tell him, friend.
> **Don Quixote:** You know nothing of adventures. If you are afraid, say your prayers while I charge.
> **Sancho:** (to you) He is going to charge. Stay beside me, we'll watch from here.
>
> *Bridge:* "Out here on the plain I'll shout when I need you. Keep an ear open."

Check against the rules: scene-setting in two sentences, Sancho restates ("they're windmills"), the runner is addressed, no command, nothing happens that is not in the chapter.

## 6. Sound effects [Could, after core features]
- Candidates: hoofbeats, wind, windmill creak, sword clang. Five or six clips are enough.
- Mix them under the dialogue (starting guess: about 12 dB lower; adjust by ear). Outdoor runners must still hear traffic, so no sudden loud peaks, especially for clangs.
- Only CC0 or clearly licensed sounds, credited in `docs/SOURCES.md`.
- Mix effects into the pre-generated audio file so a locked phone plays one continuous stream.
- **[HYPOTHESIS]** Hoofbeats near a runner's step rate might help rhythm. No evidence yet; test, do not promise.

## 7. Review checklist (before a scene is merged)
- [ ] Scene opens with 1 to 2 present-tense, concrete scene-setting sentences
- [ ] Sancho restates what just happened; the scene works if a few words are missed
- [ ] Runner is addressed at least once, with only in-story actions
- [ ] No command, number, speed word, body comment or "finish the story" line
- [ ] Events match the Ormsby chapter; nothing new in plot, characters, places
- [ ] 150 to 300 words; bridge line present if a gap follows
- [ ] Reads aloud in the planned voices without tongue-twisters; human-reviewed

## 8. [OPEN] decisions for the team
1. **Scope of Ep1:** this guide assumes the episode is Ormsby ch. VIII to IX (windmills, then the Biscayan duel). The PRD checkpoints (CP1–CP3) end at the windmills. Adding the duel needs a CP4 or a changed checkpoint list.
2. **Beat marker in the manifest:** add a `beat` tag (`encourage`, `charge`) to scenes, or make them new scene types? A tag leaves the scene-type list unchanged.
3. **Narration voice:** a third narrator voice, or Sancho speaks the scene-setting lines (the example above uses Sancho; cheaper and keeps two voices).
4. **Who reviews** whether the English "sounds like Sancho" (already open question 3 in the PRD).
5. **Trial plan:** 3 to 5 runners, one run each at 20, 30 or 45 minutes, ask where they wanted a push and whether the charge felt like pressure (FR-04 assumption S2).
