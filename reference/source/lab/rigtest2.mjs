import * as THREE from 'three';
import { Rig } from '/home/claude/rework/shared/world/rig.js';
const V = (x, y, z) => new THREE.Vector3(x, y, z), P = V;
    const stops = [
      { id: 'top', p: V(-230, 132, 1080), t: V(-120, 356, -120), fov: 48 },
      { id: 'systems', p: V(-200, 240, 560), t: V(-120, 40, 240), fov: 46 },
      { id: 'ai', p: V(-470, 70, 620), t: V(-470, 170, 330), fov: 50 },
      { id: 'security', p: V(490, 130, 640), t: V(585, 172, 92), fov: 50 },
      { id: 'work', p: V(30, 122, 76), t: V(246, 100, -154), fov: 48 },
      { id: 'contact', p: V(-610, 118, -282), t: V(-990, 176, -446), fov: 54 },
    ];
    const legs = [
      // 0 -> 1 crane: boom up off the spire's foot and tilt down onto the gantry
      { look: 0.1, dur: 2.4, pts: [
        { p: P(-232, 250, 900), t: P(-125, 300, -60), fov: 48 },
        { p: P(-212, 300, 700), t: P(-125, 120, 160), fov: 47 },
      ] },
      // 1 -> 2 orbit: swing round the neural core, falling to its feet
      { look: 0.15, dur: 2.3, pts: [
        { p: P(-290, 190, 560), t: P(-420, 140, 330), fov: 48 },
        { p: P(-380, 110, 640), t: P(-470, 160, 330), fov: 50 },
      ] },
      // 2 -> 3 skim: drop to the deck and race east along the board's south edge, then rise to the lock
      { look: 0.55, dur: 3.0, pts: [
        { p: P(-420, 36, 712), t: P(-200, 30, 724), fov: 56 },
        { p: P(-120, 30, 726), t: P(200, 30, 720), fov: 60 },
        { p: P(220, 34, 718), t: P(520, 60, 640), fov: 58 },
        { p: P(410, 80, 684), t: P(600, 170, 200), fov: 52 },
      ] },
      // 3 -> 4 climb: up over the memory row and down into the gallery
      { look: 0.2, dur: 2.8, pts: [
        { p: P(420, 230, 470), t: P(340, 210, 100), fov: 50 },
        { p: P(330, 320, 260), t: P(200, 160, 0), fov: 52 },
        { p: P(140, 230, 170), t: P(246, 110, -100), fov: 50 },
      ] },
      // 4 -> 5 run: down the aisle, out past the end of the row, a banked turn west behind the cooler
      { look: 0.6, dur: 3.2, pts: [
        { p: P(90, 104, -140), t: P(150, 100, -440), fov: 56 },
        { p: P(120, 120, -420), t: P(60, 140, -700), fov: 60 },
        { p: P(40, 160, -600), t: P(-300, 160, -640), fov: 60 },
        { p: P(-300, 170, -620), t: P(-650, 150, -520), fov: 58 },
        { p: P(-540, 140, -420), t: P(-900, 170, -430), fov: 56 },
      ] },
      // 5 -> 0 the reveal: pull up and back until the board's power plane shows the mark, hang, dive home
      { look: 0, dur: 5.2, warp: [[0, 0], [0.34, 0.47], [0.62, 0.53], [1, 1]], pts: [
        { p: P(-520, 420, -160), t: P(-600, 120, -300), fov: 56 },
        { p: P(-80, 1650, 260), t: P(0, 0, 0), fov: 50 },
        { p: P(-200, 560, 960), t: P(-120, 360, -120), fov: 50 },
      ] },
    ];

const cam = new THREE.PerspectiveCamera();
const rig = new Rig(cam, stops, legs, { closed: true, profile: 'minjerk', lookAhead: 0.35, damp: 9, settle: 3 });
for (let a = 0; a < 6; a++) {
  const b = (a + 1) % 6;
  rig.flight = null; rig.index = a; rig.pose = rig.copyPose(stops[a]);
  try { const d = rig.go(b); let n = 0; while (rig.flying && n < 2000) { rig.update(1 / 60); rig.apply(); n++; } console.log(a, '->', b, 'dur', d, 'frames', n, 'end', cam.position.toArray().map(Math.round)); }
  catch (e) { console.log(a, '->', b, 'ERR', e.stack.split('\n').slice(0, 6).join(' | ')); }
}
