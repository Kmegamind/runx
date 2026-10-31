# Feature PRD — Optional in-app music ducking

**Feature ID:** P1  
**Priority:** P1 / stretch  
**Project:** RunX · Web engineering MVP (3–4 weeks)  
**Status:** Draft for implementation planning, not validated product-market fit  
**Source:** `04_transcripts_combined.md` (10 interviews); `RunX_PRD_v1.md`  
**Evidence rule:** Interview statements describe behavior and attitudes, not proof that the proposed feature will be adopted. Suggested implementation decisions are labeled as such.

## 1. Problem and desired outcome
Demonstrate the dialogue/music balance without claiming control of Spotify or Apple Music.

## 2. Interview evidence (observed, not validated demand)
Natalie strongly prefers music over speech; Aisha uses music on hard days; Jordan and Kyle prefer narrative audio; preferences vary substantially. Interview evidence does not establish that mixing both streams is desirable.

## 3. Hypothesis
If RunX provides this capability, eligible users can complete the relevant part of a running/listening session with less confusion or friction. This hypothesis remains to be tested through real prototype use.

## 4. MVP functional requirements
Use only music audio controlled by RunX with appropriate rights; lower its gain during dialogue and restore afterwards; user can mute the music independently.

## 5. Acceptance criteria
Gain changes are smooth, never clip, and restore after pause/error/segment end; dialogue remains intelligible; third-party audio is explicitly unsupported.

## 6. Validation plan
Compare story-only versus in-app mixed playback; ask whether mixing helps or distracts.

## 7. Risks, tradeoffs and open questions
Web apps cannot reliably duck audio owned by unrelated music apps; keep this feature optional.

## 8. Dependencies
Coordinate with the episode manifest, scheduling engine, player state machine and test suite as applicable. Update the Master PRD if the feature's scope or priority changes.

## 9. Change log
- 2026-10-30: Initial feature-specific PRD drafted from the current RunX engineering MVP and 10 customer interview transcripts.
