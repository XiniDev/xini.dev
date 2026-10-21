import * as THREE from 'three';
import { Rig, monotone } from '/home/claude/rework/shared/world/rig.js';
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
  { look: 0.1, dur: 2.4, pts: [{ p: P(-232, 250, 900), t: P(-125, 300, -60), fov: 48 }, { p: P(-212, 300, 700), t: P(-125, 120, 160), fov: 47 }] },
  [], [], [], [],
  { look: 0, dur: 5.2, warp: [[0, 0], [0.34, 0.47], [0.62, 0.53], [1, 1]], pts: [{ p: P(-520, 420, -160), t: P(-600, 120, -300), fov: 56 }, { p: P(-80, 1650, 260), t: P(0, 0, 0), fov: 50 }, { p: P(-200, 560, 960), t: P(-120, 360, -120), fov: 50 }] },
];
const cam = new THREE.PerspectiveCamera();
const rig = new Rig(cam, stops, legs, { closed: true, profile: 'minjerk', lookAhead: 0.35, damp: 9, settle: 3 });
try { rig.go(1); for (let i = 0; i < 200; i++) { rig.update(1 / 60); rig.apply(); } console.log('0->1 ok', cam.position.toArray().map(Math.round)); } catch (e) { console.log('ERR', e.stack.split('\n').slice(0, 5).join('\n')); }
const w = monotone([[0, 0], [0.34, 0.47], [0.62, 0.53], [1, 1]]);
console.log([0, 0.1, 0.3, 0.34, 0.5, 0.62, 0.8, 1].map((x) => w(x).toFixed(3)).join(' '));
