import { describe, it, expect } from 'vitest';

import {
  buildTimeline,
  CLIMAX_WINDOW_SEC,
  TOLERANCE_SEC,
} from '../buildTimeline.js';
import {
  ManifestError,
  type Checkpoint,
  type Manifest,
  type Scene,
  type ScheduledTimeline,
} from '../types.js';
import { ep1Manifest, EP1_CHECKPOINTS } from '../__fixtures__/ep1Manifest.js';

const PRESETS = [20, 30, 45] as const;

/** Narrow a result to a scheduled timeline, failing the test otherwise. */
function expectScheduled(result: ReturnType<typeof buildTimeline>): ScheduledTimeline {
  if (result.status !== 'scheduled') {
    throw new Error(`expected a scheduled timeline, got ${result.status}`);
  }
  return result;
}

/** Shared structural invariants every scheduled timeline must satisfy. */
function assertValidTimeline(tl: ScheduledTimeline): void {
  // No overlaps, no negative gaps, strictly forward in time.
  let prevEnd = 0;
  for (const scene of tl.scenes) {
    expect(scene.gapBeforeSec).toBeGreaterThanOrEqual(0);
    expect(scene.startSec).toBeGreaterThanOrEqual(prevEnd);
    expect(scene.startSec).toBe(prevEnd + scene.gapBeforeSec);
    expect(scene.endSec).toBe(scene.startSec + scene.durationSec);
    expect(scene.durationSec).toBeGreaterThanOrEqual(0);
    prevEnd = scene.endSec;
  }
  expect(tl.totalSec).toBe(prevEnd);

  // Every scheduled scene carries its caption (FR-03 cross-check).
  for (const scene of tl.scenes) {
    expect(scene.transcript.trim().length).toBeGreaterThan(0);
  }
}

describe('buildTimeline — presets fit the chosen length', () => {
  it.each(PRESETS)('%d min ends within tolerance of the target', (min) => {
    const tl = expectScheduled(buildTimeline(ep1Manifest, min));
    expect(tl.targetSec).toBe(min * 60);
    expect(Math.abs(tl.totalSec - tl.targetSec)).toBeLessThanOrEqual(TOLERANCE_SEC);
    assertValidTimeline(tl);
  });

  it.each(PRESETS)('%d min lands the climax in the last 3 minutes', (min) => {
    const tl = expectScheduled(buildTimeline(ep1Manifest, min));
    const climax = tl.scenes.find((s) => s.type === 'climax')!;
    expect(climax).toBeDefined();
    expect(climax.startSec).toBe(tl.climaxStartSec);
    expect(tl.climaxStartSec).toBeGreaterThanOrEqual(tl.totalSec - CLIMAX_WINDOW_SEC);
    expect(tl.climaxStartSec).toBeLessThan(tl.totalSec);
  });
});

describe('buildTimeline — scene order and prerequisites', () => {
  it.each(PRESETS)('%d min keeps scenes in order with prerequisites before dependents', (min) => {
    const tl = expectScheduled(buildTimeline(ep1Manifest, min));
    const byId = new Map(ep1Manifest.scenes.map((s) => [s.sceneId, s]));
    const position = new Map(tl.scenes.map((s, i) => [s.sceneId, i]));

    // Scheduled order follows the manifest order.
    const orders = tl.scenes.map((s) => byId.get(s.sceneId)!.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));

    // Each scheduled scene's prerequisites appear earlier.
    for (const scene of tl.scenes) {
      for (const prereqId of byId.get(scene.sceneId)!.prerequisites) {
        expect(position.get(prereqId)).toBeLessThan(position.get(scene.sceneId)!);
      }
    }
  });
});

describe('buildTimeline — optional scenes dropped first', () => {
  const optionalIds = ep1Manifest.scenes
    .filter((s) => s.type === 'optional' || s.required === false)
    .map((s) => s.sceneId);
  const requiredIds = ep1Manifest.scenes
    .filter((s) => !(s.type === 'optional' || s.required === false))
    .map((s) => s.sceneId);

  it('a 45 min run keeps every scene', () => {
    const tl = expectScheduled(buildTimeline(ep1Manifest, 45));
    expect(tl.droppedSceneIds).toEqual([]);
    const ids = new Set(tl.scenes.map((s) => s.sceneId));
    for (const id of ep1Manifest.scenes.map((s) => s.sceneId)) {
      expect(ids.has(id)).toBe(true);
    }
  });

  it('a 20 min run drops only optional scenes and keeps every required one', () => {
    const tl = expectScheduled(buildTimeline(ep1Manifest, 20));
    expect(tl.droppedSceneIds.length).toBeGreaterThan(0);
    for (const dropped of tl.droppedSceneIds) {
      expect(optionalIds).toContain(dropped);
    }
    const ids = new Set(tl.scenes.map((s) => s.sceneId));
    for (const id of requiredIds) {
      expect(ids.has(id)).toBe(true);
    }
  });
});

describe('buildTimeline — encouragement and charge beats', () => {
  it.each(PRESETS)('%d min schedules an encouragement beat near the middle', (min) => {
    const tl = expectScheduled(buildTimeline(ep1Manifest, min));
    const encourage = tl.beats.filter((b) => b.beat === 'encourage');
    expect(encourage.length).toBeGreaterThan(0);

    // At least one encouragement beat lands in the middle band of the run.
    const nearMiddle = encourage.some((b) => b.positionPct >= 0.4 && b.positionPct <= 0.6);
    expect(nearMiddle).toBe(true);
  });

  it.each([30, 45] as const)('%d min adds a second encouragement push later in the run', (min) => {
    const tl = expectScheduled(buildTimeline(ep1Manifest, min));
    const encourage = tl.beats.filter((b) => b.beat === 'encourage');
    expect(encourage.length).toBeGreaterThanOrEqual(2);
    expect(encourage.some((b) => b.positionPct > 0.6)).toBe(true);
  });

  it.each(PRESETS)('%d min places the charge invitation inside the final window', (min) => {
    const tl = expectScheduled(buildTimeline(ep1Manifest, min));
    const charge = tl.beats.find((b) => b.beat === 'charge');
    expect(charge).toBeDefined();
    expect(charge!.startSec).toBeGreaterThanOrEqual(tl.totalSec - CLIMAX_WINDOW_SEC);
  });
});

describe('buildTimeline — determinism', () => {
  it('produces deeply-equal output for identical input', () => {
    const a = buildTimeline(ep1Manifest, 30, { ...makeCheckpoint(EP1_CHECKPOINTS.CP2) });
    const b = buildTimeline(ep1Manifest, 30, { ...makeCheckpoint(EP1_CHECKPOINTS.CP2) });
    expect(a).toEqual(b);
  });

  it('is unaffected by the input scene array order (sorts by order)', () => {
    const shuffled: Manifest = {
      ...ep1Manifest,
      scenes: [...ep1Manifest.scenes].reverse(),
    };
    const fromSorted = buildTimeline(ep1Manifest, 30);
    const fromShuffled = buildTimeline(shuffled, 30);
    expect(fromShuffled).toEqual(fromSorted);
  });
});

describe('buildTimeline — resume from a checkpoint', () => {
  function makeCheckpointLocal(sceneId: string): Checkpoint {
    return { episodeId: ep1Manifest.episodeId, manifestVersion: ep1Manifest.manifestVersion, sceneId };
  }

  it('replays no scene before the checkpoint and skips no required scene after it', () => {
    const cp = makeCheckpointLocal(EP1_CHECKPOINTS.CP2);
    const tl = expectScheduled(buildTimeline(ep1Manifest, 30, cp));

    const byId = new Map(ep1Manifest.scenes.map((s) => [s.sceneId, s]));
    const cpOrder = byId.get(EP1_CHECKPOINTS.CP2)!.order;
    const scheduledIds = new Set(tl.scenes.map((s) => s.sceneId));

    // Nothing at or before the checkpoint is replayed.
    for (const scene of tl.scenes) {
      expect(byId.get(scene.sceneId)!.order).toBeGreaterThan(cpOrder);
    }

    // Every required scene after the checkpoint is present.
    for (const scene of ep1Manifest.scenes) {
      const isRequired = !(scene.type === 'optional' || scene.required === false);
      if (scene.order > cpOrder && isRequired) {
        expect(scheduledIds.has(scene.sceneId)).toBe(true);
      }
    }

    assertValidTimeline(tl);
    expect(Math.abs(tl.totalSec - tl.targetSec)).toBeLessThanOrEqual(TOLERANCE_SEC);
    expect(tl.climaxStartSec).toBeGreaterThanOrEqual(tl.totalSec - CLIMAX_WINDOW_SEC);
  });

  it('rebuilds a valid timeline when resuming with a different duration', () => {
    const cp = makeCheckpointLocal(EP1_CHECKPOINTS.CP1);
    for (const min of PRESETS) {
      const tl = expectScheduled(buildTimeline(ep1Manifest, min, cp));
      assertValidTimeline(tl);
      expect(Math.abs(tl.totalSec - tl.targetSec)).toBeLessThanOrEqual(TOLERANCE_SEC);
      expect(tl.climaxStartSec).toBeGreaterThanOrEqual(tl.totalSec - CLIMAX_WINDOW_SEC);
    }
  });

  it('uses a leading silence when the climax is the first remaining scene', () => {
    const cp = makeCheckpointLocal('lance-lowered'); // only climax/ending/signoff remain
    const tl = expectScheduled(buildTimeline(ep1Manifest, 30, cp));
    expect(tl.scenes[0]!.type).toBe('climax');
    expect(tl.scenes[0]!.gapBeforeSec).toBeGreaterThan(0);
    assertValidTimeline(tl);
    expect(tl.climaxStartSec).toBeGreaterThanOrEqual(tl.totalSec - CLIMAX_WINDOW_SEC);
  });
});

describe('buildTimeline — does not fit', () => {
  it('reports doesNotFit with a workable minimum when the duration is too short', () => {
    const result = buildTimeline(ep1Manifest, 15);
    expect(result.status).toBe('doesNotFit');
    if (result.status !== 'doesNotFit') return;

    expect(result.minDurationMin).toBeGreaterThan(15);
    expect(result.requiredSec).toBeGreaterThan(15 * 60 + TOLERANCE_SEC);

    // The reported minimum actually fits.
    const retry = expectScheduled(buildTimeline(ep1Manifest, result.minDurationMin));
    assertValidTimeline(retry);
    expect(Math.abs(retry.totalSec - retry.targetSec)).toBeLessThanOrEqual(TOLERANCE_SEC);
    expect(retry.climaxStartSec).toBeGreaterThanOrEqual(retry.totalSec - CLIMAX_WINDOW_SEC);
  });

  it('reports doesNotFit when the remaining story after a checkpoint is too short to fit', () => {
    const cp: Checkpoint = {
      episodeId: ep1Manifest.episodeId,
      manifestVersion: ep1Manifest.manifestVersion,
      sceneId: EP1_CHECKPOINTS.CP3,
    };
    const result = buildTimeline(ep1Manifest, 4, cp);
    expect(result.status).toBe('doesNotFit');
    if (result.status !== 'doesNotFit') return;
    expect(result.minDurationMin).toBeGreaterThan(4);

    const retry = expectScheduled(buildTimeline(ep1Manifest, result.minDurationMin, cp));
    assertValidTimeline(retry);
  });
});

describe('buildTimeline — incompatible checkpoints fail safely', () => {
  it('detects a manifest version mismatch', () => {
    const cp: Checkpoint = {
      episodeId: ep1Manifest.episodeId,
      manifestVersion: ep1Manifest.manifestVersion + 1,
      sceneId: EP1_CHECKPOINTS.CP1,
    };
    const result = buildTimeline(ep1Manifest, 30, cp);
    expect(result).toEqual({ status: 'incompatibleCheckpoint', reason: 'versionMismatch' });
  });

  it('detects an unknown checkpoint scene', () => {
    const cp: Checkpoint = {
      episodeId: ep1Manifest.episodeId,
      manifestVersion: ep1Manifest.manifestVersion,
      sceneId: 'no-such-scene',
    };
    const result = buildTimeline(ep1Manifest, 30, cp);
    expect(result).toEqual({ status: 'incompatibleCheckpoint', reason: 'checkpointNotFound' });
  });

  it('detects a checkpoint from a different episode', () => {
    const cp: Checkpoint = {
      episodeId: 'ep2',
      manifestVersion: ep1Manifest.manifestVersion,
      sceneId: EP1_CHECKPOINTS.CP1,
    };
    const result = buildTimeline(ep1Manifest, 30, cp);
    expect(result).toEqual({ status: 'incompatibleCheckpoint', reason: 'episodeMismatch' });
  });
});

describe('buildTimeline — sparse content', () => {
  const sparse: Manifest = {
    episodeId: 'sparse',
    manifestVersion: 1,
    scenes: [
      scene({ sceneId: 's-open', type: 'opening', order: 1, durationSec: 60, prerequisites: [] }),
      scene({ sceneId: 's-climax', type: 'climax', order: 2, durationSec: 90, prerequisites: ['s-open'] }),
      scene({ sceneId: 's-end', type: 'ending', order: 3, durationSec: 40, prerequisites: ['s-climax'] }),
      scene({ sceneId: 's-signoff', type: 'signoff', order: 4, durationSec: 15, prerequisites: ['s-end'] }),
    ],
  };

  it.each(PRESETS)('schedules a valid %d min timeline from a handful of scenes', (min) => {
    const tl = expectScheduled(buildTimeline(sparse, min));
    assertValidTimeline(tl);
    expect(tl.scenes).toHaveLength(4);
    expect(Math.abs(tl.totalSec - tl.targetSec)).toBeLessThanOrEqual(TOLERANCE_SEC);
    expect(tl.climaxStartSec).toBeGreaterThanOrEqual(tl.totalSec - CLIMAX_WINDOW_SEC);
  });
});

describe('buildTimeline — progress-bar segments', () => {
  it('reports contiguous warmup / rising / climax / epilogue segments', () => {
    const tl = expectScheduled(buildTimeline(ep1Manifest, 30));
    const [warmup, rising, climax, epilogue] = tl.segments;
    expect(warmup!.startSec).toBe(0);
    expect(warmup!.endSec).toBe(rising!.startSec);
    expect(rising!.endSec).toBe(climax!.startSec);
    expect(climax!.endSec).toBe(epilogue!.startSec);
    expect(epilogue!.endSec).toBe(tl.totalSec);
    expect(climax!.startSec).toBe(tl.climaxStartSec);
  });
});

describe('buildTimeline — manifest validation', () => {
  it('throws on an empty manifest', () => {
    expect(() => buildTimeline({ episodeId: 'x', manifestVersion: 1, scenes: [] }, 30)).toThrow(
      ManifestError,
    );
  });

  it('throws on an unknown prerequisite', () => {
    const bad: Manifest = {
      episodeId: 'x',
      manifestVersion: 1,
      scenes: [
        scene({ sceneId: 'a', type: 'opening', order: 1, durationSec: 60, prerequisites: ['ghost'] }),
        scene({ sceneId: 'b', type: 'climax', order: 2, durationSec: 60, prerequisites: ['a'] }),
      ],
    };
    expect(() => buildTimeline(bad, 30)).toThrow(/unknown prerequisite/);
  });

  it('throws on a dependency cycle', () => {
    const bad: Manifest = {
      episodeId: 'x',
      manifestVersion: 1,
      scenes: [
        scene({ sceneId: 'a', type: 'opening', order: 1, durationSec: 60, prerequisites: ['b'] }),
        scene({ sceneId: 'b', type: 'climax', order: 2, durationSec: 60, prerequisites: ['a'] }),
      ],
    };
    expect(() => buildTimeline(bad, 30)).toThrow(ManifestError);
  });

  it('throws when a manifest has no climax', () => {
    const bad: Manifest = {
      episodeId: 'x',
      manifestVersion: 1,
      scenes: [scene({ sceneId: 'a', type: 'opening', order: 1, durationSec: 60, prerequisites: [] })],
    };
    expect(() => buildTimeline(bad, 30)).toThrow(/no climax/);
  });

  it('throws on a non-positive duration argument', () => {
    expect(() => buildTimeline(ep1Manifest, 0)).toThrow(ManifestError);
  });
});

// --------------------------------------------------------------------------
// Test helpers
// --------------------------------------------------------------------------

function makeCheckpoint(sceneId: string): Checkpoint {
  return {
    episodeId: ep1Manifest.episodeId,
    manifestVersion: ep1Manifest.manifestVersion,
    sceneId,
  };
}

function scene(
  partial: Pick<Scene, 'sceneId' | 'type' | 'order' | 'durationSec' | 'prerequisites'> &
    Partial<Scene>,
): Scene {
  return {
    episodeId: partial.episodeId ?? 'x',
    manifestVersion: partial.manifestVersion ?? 1,
    audioUrl: partial.audioUrl ?? `/audio/${partial.sceneId}.mp3`,
    transcript: partial.transcript ?? `transcript for ${partial.sceneId}`,
    required: partial.required ?? true,
    checkpoint: partial.checkpoint ?? false,
    ...partial,
  };
}
