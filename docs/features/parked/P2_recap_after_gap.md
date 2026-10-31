# Feature PRD — Optional recap after a gap

**Feature ID:** P2  
**Priority:** P2 / future  
**Project:** RunX · Web engineering MVP (3–4 weeks)  
**Status:** Draft for implementation planning, not validated product-market fit  
**Source:** `04_transcripts_combined.md` (10 interviews); `RunX_PRD_v1.md`  
**Evidence rule:** Interview statements describe behavior and attitudes, not proof that the proposed feature will be adopted. Suggested implementation decisions are labeled as such.

## 1. Problem and desired outcome
Help returning listeners regain narrative context without forcing repetitive recap.

## 2. Interview evidence (observed, not validated demand)
Kyle replays earlier audiobook chapters after a long gap; Jordan was frustrated by an unnecessary recap immediately after part one; other runners often skip to new content. Recap should be conditional or skippable.

## 3. Hypothesis
If RunX provides this capability, eligible users can complete the relevant part of a running/listening session with less confusion or friction. This hypothesis remains to be tested through real prototype use.

## 4. MVP functional requirements
Offer a short recap only when returning to a partially completed narrative after a configurable gap; allow Skip Recap; never replay it on immediate continuation.

## 5. Acceptance criteria
Recap does not overwrite progress; skip takes user to saved story point; no recap for new episode or immediate resume.

## 6. Validation plan
Observe whether returning testers request context after several days and whether recap helps them follow the next segment.

## 7. Risks, tradeoffs and open questions
Not in four-week P0; no evidence supports an exact three-day threshold.

## 8. Dependencies
Coordinate with the episode manifest, scheduling engine, player state machine and test suite as applicable. Update the Master PRD if the feature's scope or priority changes.

## 9. Change log
- 2026-10-30: Initial feature-specific PRD drafted from the current RunX engineering MVP and 10 customer interview transcripts.
