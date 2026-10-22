// Behaviour tests for music.js. Scheduling only, no rendering, so it runs in about a second.
//
//   node tools/audio/music.test.mjs
//
// Needs the dev dependency node-web-audio-api (only for the AudioContext object).

import assert from 'node:assert/strict';
import { OfflineAudioContext } from 'node-web-audio-api';
import { createMusic, SCORE } from '../../src/shared/core/music.js';

const BAR = (60 / SCORE.bpm) * 4;
const BEAT = BAR / 4;
let passed = 0;

function fresh(stop = 0, opts = {}) {
  const ctx = new OfflineAudioContext(2, 48000, 48000);
  const music = createMusic(ctx, ctx.destination, { manual: true });
  music.start(1, { stop, at: 0, ...opts });
  return music;
}
function test(name, fn) { fn(); passed++; console.log(`ok  ${name}`); }

test('a stop change lands on the next bar line', () => {
  const m = fresh(0);
  const depart = 1 + BAR * 2.3;
  m.scheduleUntil(depart);
  m.setStop(2, { at: depart });
  const lands = m.nextBarTime(depart);
  assert.ok(Math.abs(lands - (1 + BAR * 3)) < 1e-6, `lands at ${lands}`);
  m.scheduleUntil(lands + 0.01);
  assert.equal(m.getState().stop, 2);
  assert.equal(m.getState().section, 'main');
});

test('Enclave starts locked, and cubeSolved() resolves on the next beat', () => {
  const m = fresh(2);
  m.scheduleUntil(1 + BAR * 1.5);
  m.setStop(3, { at: 1 + BAR * 1.5 });
  m.scheduleUntil(1 + BAR * 2 + 0.01);
  assert.equal(m.getState().section, 'locked');
  const solve = 1 + BAR * 3.3;
  m.scheduleUntil(solve);
  m.cubeSolved({ at: solve });
  m.scheduleUntil(solve + BEAT + 0.01);
  const st = m.getState();
  assert.equal(st.section, 'main');
  assert.ok(st.sectionStart > solve && st.sectionStart - solve <= BEAT + 1e-6, `resolved at ${st.sectionStart}`);
});

test('a cube solved during the flight skips the locked section', () => {
  const m = fresh(2);
  const depart = 1 + BAR * 0.5;
  m.scheduleUntil(depart);
  m.setStop(3, { at: depart });
  m.cubeSolved({ at: depart + 0.4 });
  m.scheduleUntil(1 + BAR + 0.01);
  assert.equal(m.getState().section, 'main');
  assert.equal(m.getState().stop, 3);
});

test('the Enclave resolves by itself if the solve never arrives', () => {
  const m = fresh(3);
  m.scheduleUntil(1 + BAR * (SCORE.lockedMaxBars + 0.1));
  assert.equal(m.getState().section, 'main');
});

test('arriving at an already-solved Enclave skips the locked section', () => {
  const m = fresh(1);
  m.scheduleUntil(1 + BAR * 0.5);
  m.setStop(3, { at: 1 + BAR * 0.5, solved: true });
  m.scheduleUntil(1 + BAR + 0.01);
  assert.equal(m.getState().section, 'main');
});

test('I/O switches to the daylight progression', () => {
  const m = fresh(4);
  m.scheduleUntil(1 + BAR * 0.5);
  m.setStop(5, { at: 1 + BAR * 0.5 });
  m.scheduleUntil(1 + BAR + 0.01);
  assert.equal(m.getState().section, 'daylight');
});

test('a jump back to the start returns to the main progression at bar one', () => {
  const m = fresh(5);
  m.scheduleUntil(1 + BAR * 2.5);
  m.setStop(0, { at: 1 + BAR * 2.5 });
  m.scheduleUntil(1 + BAR * 3 + 0.01);
  const st = m.getState();
  assert.equal(st.section, 'main');
  assert.ok(Math.abs(st.sectionStart - (1 + BAR * 3)) < 1e-6);
});

test('the mix thins when idle, and comes back on activity', () => {
  const m = fresh(1);
  m.scheduleUntil(1 + BAR * (SCORE.idleBars + 1.1));
  assert.equal(m.getState().idle, true);
  const t = 1 + BAR * (SCORE.idleBars + 1.5);
  m.activity({ at: t });
  m.scheduleUntil(m.nextBarTime(t) + 0.01);
  assert.equal(m.getState().idle, false);
});

test('stop() ends scheduling after the fade', () => {
  const m = fresh(1);
  m.scheduleUntil(3);
  m.stop(0.6, { at: 3 });
  m.scheduleUntil(10);
  assert.equal(m.getState().running, false);
});

test('rapid navigation keeps only the last target', () => {
  const m = fresh(0);
  const t = 1 + BAR * 0.2;
  m.scheduleUntil(t);
  m.setStop(1, { at: t });
  m.setStop(4, { at: t + 0.1 });
  m.setStop(2, { at: t + 0.2 });
  m.scheduleUntil(1 + BAR + 0.01);
  assert.equal(m.getState().stop, 2);
});

console.log(`\n${passed} passed`);
