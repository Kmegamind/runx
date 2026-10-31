/**
 * Types for the RunX story scheduling engine (FR-04) and the episode manifest
 * it consumes (FR-03).
 *
 * The manifest is the validated, reusable scene model; the scheduler turns a
 * manifest + a run length (+ an optional resume checkpoint) into a concrete
 * timeline that the audio player (FR-05) and the Running progress bar render.
 */

/** Scene kinds, per FR-03 §4. */
export type SceneType =
  | 'opening'
  | 'core'
  | 'optional'
  | 'climax'
  | 'ending'
  | 'signoff'
  | 'recap'
  | 'compressed_ending';

/**
 * Narrative beat tag (script style guide §4). Encouragement beats are short
 * in-character lines; the charge is the climax inviting the runner along. A
 * beat is a tag on an ordinary scene, not a new scene type.
 */
export type Beat = 'encourage' | 'charge';

/** One scene in an episode manifest. */
export interface Scene {
  episodeId: string;
  manifestVersion: number;
  sceneId: string;
  type: SceneType;
  /** Narrative order within the episode. Must be unique and consistent with prerequisites. */
  order: number;
  durationSec: number;
  audioUrl: string;
  /** Caption text; every scheduled scene must have one. */
  transcript: string;
  /** Required scenes are never dropped; optional scenes are dropped first to fit. */
  required: boolean;
  /** sceneIds that must have played before this scene. */
  prerequisites: string[];
  /** A scene the session can be saved after (ends cleanly, no half-line). */
  checkpoint: boolean;
  /** Optional encouragement / charge tag. */
  beat?: Beat;
}

/** A whole episode. */
export interface Manifest {
  episodeId: string;
  manifestVersion: number;
  scenes: Scene[];
}

/**
 * A saved resume point (FR-06 / FR-07). `sceneId` is the last scene the runner
 * completed; scheduling resumes from the scenes after it.
 */
export interface Checkpoint {
  episodeId: string;
  manifestVersion: number;
  sceneId: string;
}

/** A scene placed on the timeline, with its silence lead-in. */
export interface PlacedScene {
  sceneId: string;
  type: SceneType;
  beat: Beat | null;
  /** Seconds from the start of the run to the start of this scene's audio. */
  startSec: number;
  endSec: number;
  durationSec: number;
  /** Silence before this scene's audio (never negative). */
  gapBeforeSec: number;
  transcript: string;
  audioUrl: string;
  checkpoint: boolean;
}

/** Four-part Running progress bar segment (FR-04 §6). */
export interface StorySegment {
  name: 'warmup' | 'rising' | 'climax' | 'epilogue';
  startSec: number;
  endSec: number;
}

/** A scheduled encouragement / charge beat, with where it lands in the run. */
export interface BeatMarker {
  sceneId: string;
  beat: Beat;
  startSec: number;
  /** Fraction of the run (0..1) at which the beat starts. */
  positionPct: number;
}

/** A successfully built timeline. */
export interface ScheduledTimeline {
  status: 'scheduled';
  episodeId: string;
  manifestVersion: number;
  durationMin: number;
  targetSec: number;
  /** End of the last scene (within tolerance of targetSec). */
  totalSec: number;
  scenes: PlacedScene[];
  /** sceneIds of optional scenes dropped to make the story fit. */
  droppedSceneIds: string[];
  /** Start of the climax; always within the last 3 minutes. */
  climaxStartSec: number;
  segments: StorySegment[];
  beats: BeatMarker[];
}

/** The required remaining story cannot fit the chosen duration (FR-04 §5). */
export interface DoesNotFitResult {
  status: 'doesNotFit';
  episodeId: string;
  /** Total audio seconds of the required remaining scenes. */
  requiredSec: number;
  /** Shortest run length (whole minutes) that fits the required story. */
  minDurationMin: number;
}

/** Saved progress that cannot be used to schedule (FR-07 "fail safely"). */
export interface IncompatibleCheckpointResult {
  status: 'incompatibleCheckpoint';
  reason: 'versionMismatch' | 'checkpointNotFound' | 'episodeMismatch';
}

export type TimelineResult =
  | ScheduledTimeline
  | DoesNotFitResult
  | IncompatibleCheckpointResult;

/** Thrown when a manifest is structurally invalid (a content/authoring error). */
export class ManifestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ManifestError';
  }
}
