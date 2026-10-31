/**
 * Deterministic story scheduling engine (FR-04).
 *
 * `buildTimeline` is a pure function: the same (manifest, durationMin,
 * checkpoint) always produces a deeply-equal result. It uses no clock and no
 * randomness.
 *
 * What it guarantees for a scheduled timeline:
 *  - ends within ±TOLERANCE_SEC of the chosen length;
 *  - the climax starts within the last CLIMAX_WINDOW_SEC (3 minutes);
 *  - prerequisites play before dependents; scenes never overlap; no negative gaps;
 *  - optional scenes are dropped first when the story must be shortened;
 *  - when resuming from a checkpoint, no required scene before it is replayed and
 *    none after it is skipped;
 *  - when the required remaining story cannot fit, it returns `doesNotFit` with
 *    the shortest workable duration instead of a broken timeline.
 */

import {
  ManifestError,
  type BeatMarker,
  type Checkpoint,
  type Manifest,
  type PlacedScene,
  type Scene,
  type StorySegment,
  type TimelineResult,
} from './types.js';

/** A scheduled timeline may end up to this many seconds off the target length. */
export const TOLERANCE_SEC = 15;

/** The climax must start no earlier than this many seconds before the end. */
export const CLIMAX_WINDOW_SEC = 180;

/**
 * Build a timeline for `durationMin` minutes from `manifest`, optionally
 * resuming after `checkpoint`.
 *
 * @throws {ManifestError} if the manifest is structurally invalid.
 */
export function buildTimeline(
  manifest: Manifest,
  durationMin: number,
  checkpoint?: Checkpoint,
): TimelineResult {
  if (!Number.isFinite(durationMin) || durationMin <= 0) {
    throw new ManifestError(`durationMin must be a positive number, got ${durationMin}`);
  }

  validateManifest(manifest);

  const targetSec = Math.round(durationMin * 60);
  const ordered = [...manifest.scenes].sort(compareScenes);

  // Resolve which scenes are still ahead of the runner (resume support).
  const resolved = resolveRemaining(manifest, ordered, checkpoint);
  if (resolved.status !== 'ok') {
    return { status: 'incompatibleCheckpoint', reason: resolved.reason };
  }
  const { remaining, playedIds } = resolved;

  // Required scenes (plus any optional scene a required one depends on) always
  // play. If they alone cannot fit, report the shortest workable duration.
  const forced = forcedScenes(remaining, playedIds);
  const forcedSec = sumDurations(forced);
  if (forcedSec > targetSec + TOLERANCE_SEC) {
    return {
      status: 'doesNotFit',
      episodeId: manifest.episodeId,
      requiredSec: forcedSec,
      minDurationMin: Math.ceil(forcedSec / 60),
    };
  }

  // Greedily keep optional scenes (in order) while they still leave room for
  // gaps, so shorter runs naturally drop optionals first.
  const { included, droppedSceneIds } = selectScenes(remaining, forced, playedIds, targetSec);

  const scenes = placeScenes(included, targetSec);
  const totalSec = scenes.length === 0 ? 0 : scenes[scenes.length - 1]!.endSec;
  const climax = scenes.find((s) => s.type === 'climax');

  return {
    status: 'scheduled',
    episodeId: manifest.episodeId,
    manifestVersion: manifest.manifestVersion,
    durationMin,
    targetSec,
    totalSec,
    scenes,
    droppedSceneIds,
    climaxStartSec: climax ? climax.startSec : totalSec,
    segments: buildSegments(scenes, totalSec),
    beats: buildBeats(scenes, totalSec),
  };
}

// --------------------------------------------------------------------------
// Validation
// --------------------------------------------------------------------------

function validateManifest(manifest: Manifest): void {
  const { scenes } = manifest;
  if (!Array.isArray(scenes) || scenes.length === 0) {
    throw new ManifestError('manifest has no scenes');
  }

  const byId = new Map<string, Scene>();
  for (const scene of scenes) {
    if (byId.has(scene.sceneId)) {
      throw new ManifestError(`duplicate sceneId: ${scene.sceneId}`);
    }
    byId.set(scene.sceneId, scene);
    if (scene.durationSec < 0) {
      throw new ManifestError(`negative durationSec on ${scene.sceneId}`);
    }
    if (!scene.transcript || scene.transcript.trim() === '') {
      throw new ManifestError(`missing transcript on ${scene.sceneId}`);
    }
    if (!scene.audioUrl || scene.audioUrl.trim() === '') {
      throw new ManifestError(`missing audioUrl on ${scene.sceneId}`);
    }
  }

  // Prerequisites must exist.
  for (const scene of scenes) {
    for (const prereqId of scene.prerequisites) {
      if (!byId.has(prereqId)) {
        throw new ManifestError(`unknown prerequisite ${prereqId} on ${scene.sceneId}`);
      }
    }
  }

  detectCycles(scenes, byId);

  // Order must be consistent with prerequisites.
  for (const scene of scenes) {
    for (const prereqId of scene.prerequisites) {
      const prereq = byId.get(prereqId)!;
      if (prereq.order >= scene.order) {
        throw new ManifestError(
          `prerequisite ${prereqId} (order ${prereq.order}) must precede ${scene.sceneId} (order ${scene.order})`,
        );
      }
    }
  }

  if (!scenes.some((s) => s.type === 'climax')) {
    throw new ManifestError('manifest has no climax scene');
  }
}

function detectCycles(scenes: Scene[], byId: Map<string, Scene>): void {
  const WHITE = 0;
  const GREY = 1;
  const BLACK = 2;
  const color = new Map<string, number>();
  for (const s of scenes) color.set(s.sceneId, WHITE);

  const visit = (id: string): void => {
    color.set(id, GREY);
    for (const prereqId of byId.get(id)!.prerequisites) {
      const c = color.get(prereqId);
      if (c === GREY) {
        throw new ManifestError(`dependency cycle involving ${prereqId}`);
      }
      if (c === WHITE) visit(prereqId);
    }
    color.set(id, BLACK);
  };

  for (const s of scenes) {
    if (color.get(s.sceneId) === WHITE) visit(s.sceneId);
  }
}

// --------------------------------------------------------------------------
// Resume / checkpoint handling
// --------------------------------------------------------------------------

type Resolved =
  | { status: 'ok'; remaining: Scene[]; playedIds: Set<string> }
  | { status: 'incompatibleCheckpoint'; reason: 'versionMismatch' | 'checkpointNotFound' | 'episodeMismatch' };

function resolveRemaining(
  manifest: Manifest,
  ordered: Scene[],
  checkpoint?: Checkpoint,
): Resolved {
  if (!checkpoint) {
    return { status: 'ok', remaining: ordered, playedIds: new Set() };
  }
  if (checkpoint.episodeId !== manifest.episodeId) {
    return { status: 'incompatibleCheckpoint', reason: 'episodeMismatch' };
  }
  if (checkpoint.manifestVersion !== manifest.manifestVersion) {
    return { status: 'incompatibleCheckpoint', reason: 'versionMismatch' };
  }
  const at = ordered.find((s) => s.sceneId === checkpoint.sceneId);
  if (!at) {
    return { status: 'incompatibleCheckpoint', reason: 'checkpointNotFound' };
  }
  const playedIds = new Set(ordered.filter((s) => s.order <= at.order).map((s) => s.sceneId));
  const remaining = ordered.filter((s) => s.order > at.order);
  return { status: 'ok', remaining, playedIds };
}

// --------------------------------------------------------------------------
// Scene selection
// --------------------------------------------------------------------------

function isOptional(scene: Scene): boolean {
  return scene.required === false || scene.type === 'optional';
}

/**
 * Required scenes, plus any optional scene that a kept scene depends on (so we
 * never drop a prerequisite of something we keep). Prerequisites that already
 * played before the checkpoint are treated as satisfied.
 */
function forcedScenes(remaining: Scene[], playedIds: Set<string>): Scene[] {
  const byId = new Map(remaining.map((s) => [s.sceneId, s]));
  const forced = new Set<string>();

  const pull = (scene: Scene): void => {
    if (forced.has(scene.sceneId)) return;
    forced.add(scene.sceneId);
    for (const prereqId of scene.prerequisites) {
      if (playedIds.has(prereqId)) continue;
      const prereq = byId.get(prereqId);
      if (prereq) pull(prereq);
    }
  };

  for (const scene of remaining) {
    if (!isOptional(scene)) pull(scene);
  }
  return remaining.filter((s) => forced.has(s.sceneId));
}

function selectScenes(
  remaining: Scene[],
  forced: Scene[],
  playedIds: Set<string>,
  targetSec: number,
): { included: Scene[]; droppedSceneIds: string[] } {
  const includedIds = new Set(forced.map((s) => s.sceneId));
  let sceneSec = sumDurations(forced);

  // Add optional scenes in order while they fit and their prerequisites are met.
  for (const scene of remaining) {
    if (includedIds.has(scene.sceneId)) continue;
    if (!isOptional(scene)) continue;
    if (sceneSec + scene.durationSec > targetSec) continue;

    const prereqsMet = scene.prerequisites.every(
      (id) => playedIds.has(id) || includedIds.has(id),
    );
    if (!prereqsMet) continue;

    includedIds.add(scene.sceneId);
    sceneSec += scene.durationSec;
  }

  const included = remaining.filter((s) => includedIds.has(s.sceneId));
  const droppedSceneIds = remaining
    .filter((s) => !includedIds.has(s.sceneId))
    .map((s) => s.sceneId);
  return { included, droppedSceneIds };
}

// --------------------------------------------------------------------------
// Placement
// --------------------------------------------------------------------------

/**
 * Place the chosen scenes back-to-back and spread the leftover time as silence
 * before the climax, keeping the finale tight so the climax lands in the last
 * 3 minutes while the timeline still ends on the target length.
 */
function placeScenes(included: Scene[], targetSec: number): PlacedScene[] {
  const n = included.length;
  if (n === 0) return [];

  const sceneSec = sumDurations(included);
  const totalGap = Math.max(0, targetSec - sceneSec);

  const climaxIdx = included.findIndex((s) => s.type === 'climax');

  // Gap slots: index i is the silence before scene i (i === 0 is a leading
  // gap). Only slots at or before the climax may hold gap time, so post-climax
  // gaps never push the climax out of the final window.
  let slots: number[];
  if (climaxIdx >= 1) {
    slots = range(1, climaxIdx); // internal gaps up to the climax; no leading silence
  } else if (climaxIdx === 0) {
    slots = [0]; // climax is first: all gap becomes a leading silence
  } else {
    slots = range(1, n - 1); // no climax: spread across every internal gap
  }

  const gapBefore = distribute(totalGap, slots, n);

  const placed: PlacedScene[] = [];
  let cursor = 0;
  for (let i = 0; i < n; i++) {
    const scene = included[i]!;
    cursor += gapBefore[i]!;
    const startSec = cursor;
    const endSec = startSec + scene.durationSec;
    placed.push({
      sceneId: scene.sceneId,
      type: scene.type,
      beat: scene.beat ?? null,
      startSec,
      endSec,
      durationSec: scene.durationSec,
      gapBeforeSec: gapBefore[i]!,
      transcript: scene.transcript,
      audioUrl: scene.audioUrl,
      checkpoint: scene.checkpoint,
    });
    cursor = endSec;
  }
  return placed;
}

/**
 * Spread `total` seconds as evenly as possible across the given slot indices,
 * handing the remainder to the earliest slots. Returns a per-scene gap array of
 * length `n` (slots not listed get 0).
 */
function distribute(total: number, slots: number[], n: number): number[] {
  const gaps = new Array<number>(n).fill(0);
  if (slots.length === 0 || total <= 0) return gaps;

  const base = Math.floor(total / slots.length);
  let remainder = total - base * slots.length;
  for (const slot of slots) {
    gaps[slot] = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
  }
  return gaps;
}

// --------------------------------------------------------------------------
// Derived views: progress-bar segments and beat markers
// --------------------------------------------------------------------------

function buildSegments(scenes: PlacedScene[], totalSec: number): StorySegment[] {
  if (scenes.length === 0) {
    return [
      { name: 'warmup', startSec: 0, endSec: 0 },
      { name: 'rising', startSec: 0, endSec: 0 },
      { name: 'climax', startSec: 0, endSec: 0 },
      { name: 'epilogue', startSec: 0, endSec: 0 },
    ];
  }

  const openings = scenes.filter((s) => s.type === 'opening');
  const warmupEnd = openings.length > 0 ? openings[openings.length - 1]!.endSec : 0;

  const climax = scenes.find((s) => s.type === 'climax');
  const climaxStart = climax ? climax.startSec : totalSec;
  const climaxEnd = climax ? climax.endSec : totalSec;

  return [
    { name: 'warmup', startSec: 0, endSec: warmupEnd },
    { name: 'rising', startSec: warmupEnd, endSec: climaxStart },
    { name: 'climax', startSec: climaxStart, endSec: climaxEnd },
    { name: 'epilogue', startSec: climaxEnd, endSec: totalSec },
  ];
}

function buildBeats(scenes: PlacedScene[], totalSec: number): BeatMarker[] {
  const markers: BeatMarker[] = [];
  for (const scene of scenes) {
    if (scene.beat) {
      markers.push({
        sceneId: scene.sceneId,
        beat: scene.beat,
        startSec: scene.startSec,
        positionPct: totalSec > 0 ? scene.startSec / totalSec : 0,
      });
    }
  }
  return markers;
}

// --------------------------------------------------------------------------
// Small helpers
// --------------------------------------------------------------------------

function compareScenes(a: Scene, b: Scene): number {
  if (a.order !== b.order) return a.order - b.order;
  return a.sceneId < b.sceneId ? -1 : a.sceneId > b.sceneId ? 1 : 0;
}

function sumDurations(scenes: Scene[]): number {
  return scenes.reduce((sum, s) => sum + s.durationSec, 0);
}

function range(from: number, to: number): number[] {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
}
