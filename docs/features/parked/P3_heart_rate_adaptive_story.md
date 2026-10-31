# Feature PRD — Heart-rate display and rhythm-adaptive story

**Feature ID:** P3  
**Priority:** Parked — TBD, **not part of the P2 scope**. Revisit only if time allows after P2 is done.  
**Project:** RunX · Web engineering MVP  
**Status:** Idea only. No issues, no sprint, not in `ISSUES.md` or `scripts/setup-github.sh`.  
**Source:** Team idea, 2026-10-30. No interview evidence yet.  
**Evidence rule:** Nothing here is validated demand. Technical limits below are design notes to be re-checked before any work starts.

## 1. Problem and desired outcome
Show the runner's heart rate on the story (Running) screen and let the story react to heart rate and running rhythm, so the story follows the effort of the run instead of only the clock. This would extend US-3 ("follow the rhythm of my run"), which the MVP only covers with a time-based pacing curve.

## 2. Why it is parked
- The master PRD puts GPS, pace and wearables out of scope; FR-04 lists live pace / heart-rate adaptation as **Won't**.
- The web cannot read heart rate reliably (see section 5), so it would not work for most users.
- The master PRD says "No location or health data collected". Heart rate is health data, so this feature needs a privacy decision first.
- Core scheduler, player, resume and auth come first; Should stories are cut before Must stories.

## 3. Hypothesis (untested)
If the story changes with heart rate or cadence, runners who struggle mid-run feel the story "is with them" and finish more runs. Not tested; some runners may find a heart-rate display on a story screen distracting.

## 4. Possible stages (if ever picked up)
1. **Simulated demo mode:** a slider or button simulates heart rate; the Running screen shows it and the scheduler picks "push" or "easy" scenes. No hardware needed.
2. **Cadence from phone motion:** step detection with the accelerometer (DeviceMotion; iOS needs a permission prompt; accuracy with the phone in a pocket is uncertain).
3. **Real heart rate:** Web Bluetooth with a standard BLE heart-rate chest strap.

## 5. Technical notes and limits
- Web Bluetooth works in Chrome on Android; **not in iOS Safari**. Apple Watch and Garmin watches do not expose heart rate to web pages.
- GPS pace needs the screen on and is unreliable; location data is also out of scope.
- Design hook: the scheduler could later accept an external `intensity` input (low / normal / high). Do not add it to the P2 code.

## 6. Constraints that still apply
- Keep the safety rule: no pace or sprint commands, no judgment of the runner's body; never encourage continuing a run to finish the story. High heart rate must lead to an easier story, never to a push.
- No medical or health claims.

## 7. Dependencies
FR-04 (scheduler), FR-05 (player), the Running screen. If this is ever scoped, update the master PRD (scope, privacy line, NFR) and FR-04 first.

## 8. Change log
- 2026-10-30: Parked at the user's request; not part of P2.
