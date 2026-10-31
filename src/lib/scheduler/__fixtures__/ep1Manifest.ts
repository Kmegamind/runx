/**
 * Episode 1 "The Windmills" test manifest for the scheduler.
 *
 * This is a scheduling fixture, not the production content (the authored Ep1
 * scenes and the manifest validator are issue #4 / FR-03). It mirrors the real
 * shape: ~17 scenes, two speakers, three checkpoints (CP1 after departure, CP2
 * windmills on the horizon, CP3 facing the windmills), four optional scenes, two
 * encouragement beats and a charge on the climax. Durations are tuned so the
 * windmill charge plus its ending/sign-off tail stays under the 3-minute climax
 * window.
 */

import type { Manifest, Scene } from '../types.js';

const EPISODE_ID = 'ep1';
const MANIFEST_VERSION = 1;

type SceneSpec = Omit<Scene, 'episodeId' | 'manifestVersion'>;

const specs: SceneSpec[] = [
  {
    sceneId: 'opening-road',
    type: 'opening',
    order: 1,
    durationSec: 75,
    audioUrl: '/audio/ep1/opening-road.mp3',
    transcript: 'Sancho: The road out of the village is empty and the morning is yours, friend.',
    required: true,
    prerequisites: [],
    checkpoint: false,
  },
  {
    sceneId: 'departure',
    type: 'core',
    order: 2,
    durationSec: 90,
    audioUrl: '/audio/ep1/departure.mp3',
    transcript: 'Don Quixote: We ride for adventure! Sancho: We ride, and I packed bread.',
    required: true,
    prerequisites: ['opening-road'],
    checkpoint: true, // CP1 — after departure
  },
  {
    sceneId: 'sancho-worries',
    type: 'optional',
    order: 3,
    durationSec: 80,
    audioUrl: '/audio/ep1/sancho-worries.mp3',
    transcript: 'Sancho: Between us, friend, I would rather be home. But here we are.',
    required: false,
    prerequisites: ['departure'],
    checkpoint: false,
  },
  {
    sceneId: 'knightly-banter',
    type: 'core',
    order: 4,
    durationSec: 85,
    audioUrl: '/audio/ep1/knightly-banter.mp3',
    transcript: 'Don Quixote: A knight needs a worthy foe. Sancho: A knight needs lunch.',
    required: true,
    prerequisites: ['departure'],
    checkpoint: false,
  },
  {
    sceneId: 'bread-gag-one',
    type: 'optional',
    order: 5,
    durationSec: 70,
    audioUrl: '/audio/ep1/bread-gag-one.mp3',
    transcript: 'Sancho: Still have the bread. Noting that for the record.',
    required: false,
    prerequisites: ['knightly-banter'],
    checkpoint: false,
  },
  {
    sceneId: 'windmills-horizon',
    type: 'core',
    order: 6,
    durationSec: 95,
    audioUrl: '/audio/ep1/windmills-horizon.mp3',
    transcript: 'Sancho: On the ridge ahead, forty windmills turn slowly against the sky.',
    required: true,
    prerequisites: ['knightly-banter'],
    checkpoint: true, // CP2 — windmills on the horizon
  },
  {
    sceneId: 'what-are-those',
    type: 'optional',
    order: 7,
    durationSec: 75,
    audioUrl: '/audio/ep1/what-are-those.mp3',
    transcript: 'Sancho: You see windmills. He sees something else entirely. Watch.',
    required: false,
    prerequisites: ['windmills-horizon'],
    checkpoint: false,
  },
  {
    sceneId: 'giants-declared',
    type: 'core',
    order: 8,
    durationSec: 100,
    audioUrl: '/audio/ep1/giants-declared.mp3',
    transcript: 'Don Quixote: Behold the giants! Thirty of them, arms longer than the road!',
    required: true,
    prerequisites: ['windmills-horizon'],
    checkpoint: false,
  },
  {
    sceneId: 'midpoint-cheer',
    type: 'core',
    order: 9,
    durationSec: 45,
    audioUrl: '/audio/ep1/midpoint-cheer.mp3',
    transcript: 'Sancho: Still with us, friend? Good. Stay beside me, we are halfway to glory.',
    required: true,
    prerequisites: ['giants-declared'],
    checkpoint: false,
    beat: 'encourage', // midpoint push (~50%)
  },
  {
    sceneId: 'sanchos-objection',
    type: 'core',
    order: 10,
    durationSec: 85,
    audioUrl: '/audio/ep1/sanchos-objection.mp3',
    transcript: 'Sancho: Master, those are windmills. They grind flour. For bread.',
    required: true,
    prerequisites: ['giants-declared'],
    checkpoint: false,
  },
  {
    sceneId: 'bread-gag-two',
    type: 'optional',
    order: 11,
    durationSec: 70,
    audioUrl: '/audio/ep1/bread-gag-two.mp3',
    transcript: 'Don Quixote: Bread! Destiny knocks and my squire answers with bread!',
    required: false,
    prerequisites: ['sanchos-objection'],
    checkpoint: false,
  },
  {
    sceneId: 'second-cheer',
    type: 'core',
    order: 12,
    durationSec: 45,
    audioUrl: '/audio/ep1/second-cheer.mp3',
    transcript: 'Sancho: The windmills are close now. Whatever they are, we face them together.',
    required: true,
    prerequisites: ['giants-declared'],
    checkpoint: false,
    beat: 'encourage', // second push (~70%)
  },
  {
    sceneId: 'facing-windmills',
    type: 'core',
    order: 13,
    durationSec: 90,
    audioUrl: '/audio/ep1/facing-windmills.mp3',
    transcript: 'Sancho: He has stopped. He is staring up at the nearest sail. Oh, no.',
    required: true,
    prerequisites: ['giants-declared'],
    checkpoint: true, // CP3 — facing the windmills
  },
  {
    sceneId: 'lance-lowered',
    type: 'core',
    order: 14,
    durationSec: 80,
    audioUrl: '/audio/ep1/lance-lowered.mp3',
    transcript: 'Don Quixote: Fly not, cowards! Sancho: He is lowering the lance. Stay back, friend.',
    required: true,
    prerequisites: ['facing-windmills'],
    checkpoint: false,
  },
  {
    sceneId: 'the-charge',
    type: 'climax',
    order: 15,
    durationSec: 95,
    audioUrl: '/audio/ep1/the-charge.mp3',
    transcript: 'Sancho: Rocinante breaks into a gallop! Ride with him if your legs feel good!',
    required: true,
    prerequisites: ['facing-windmills'],
    checkpoint: false,
    beat: 'charge', // the charge — an invitation, in the final window
  },
  {
    sceneId: 'unhorsed',
    type: 'ending',
    order: 16,
    durationSec: 65,
    audioUrl: '/audio/ep1/unhorsed.mp3',
    transcript: 'Sancho: The sail swept him clean off. He is in the dirt, grinning. Of course.',
    required: true,
    prerequisites: ['the-charge'],
    checkpoint: false,
  },
  {
    sceneId: 'ride-on-signoff',
    type: 'signoff',
    order: 17,
    durationSec: 18,
    audioUrl: '/audio/ep1/ride-on-signoff.mp3',
    transcript: 'Don Quixote: We ride on tomorrow. Sancho: We walk, master. Rest now, friend.',
    required: true,
    prerequisites: ['unhorsed'],
    checkpoint: false,
  },
];

export const ep1Manifest: Manifest = {
  episodeId: EPISODE_ID,
  manifestVersion: MANIFEST_VERSION,
  scenes: specs.map((spec) => ({
    ...spec,
    episodeId: EPISODE_ID,
    manifestVersion: MANIFEST_VERSION,
  })),
};

/** Checkpoint scene ids, in story order. */
export const EP1_CHECKPOINTS = {
  CP1: 'departure',
  CP2: 'windmills-horizon',
  CP3: 'facing-windmills',
} as const;
