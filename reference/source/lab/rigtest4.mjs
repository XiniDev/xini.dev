import * as THREE from 'three';
import { Rig } from '/home/claude/rework/shared/world/rig.js';
const V = (x, y, z) => new THREE.Vector3(x, y, z), P = V;
const stops = [
  { id: 'systems', p: V(-200, 240, 560), t: V(-120, 40, 240), fov: 46 },
  { id: 'ai', p: V(-470, 70, 620), t: V(-470, 170, 330), fov: 50 },
];
const legs = [{ look: 0.15, dur: 2.3, pts: [{ p: P(-290, 190, 560), t: P(-420, 140, 330), fov: 48 }, { p: P(-380, 110, 640), t: P(-470, 160, 330), fov: 50 }] }];
const cam = new THREE.PerspectiveCamera();
const rig = new Rig(cam, stops, legs, { closed: false, profile: 'minjerk', lookAhead: 0.35, damp: 9, settle: 3 });
rig.go(1);
const f = rig.flight;
const orig = f.pc.getPointAt.bind(f.pc);
f.pc.getPointAt = (u, o) => { try { return orig(u, o); } catch (e) { console.log('fail u=', u, 't=', f.pc.getUtoTmapping(u), 'pts', f.pc.points.length); throw e; } };
let n = 0; try { while (rig.flying && n < 400) { rig.update(1 / 60); n++; } console.log('ok', n); } catch (e) { console.log('ERR at frame', n, 'f.t', f.t, 'dur', f.dur); }
