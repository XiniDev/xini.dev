import * as THREE from 'three';
const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 0, 0), new THREE.Vector3(20, 5, 0)];
const c = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
c.arcLengthDivisions = 400;
for (const u of [1, 0.9999999999999999, 1 - 1e-12, 0.99999]) {
  try { c.getPointAt(u); console.log(u, 'ok', c.getUtoTmapping(u)); } catch (e) { console.log(u, 'ERR', c.getUtoTmapping(u)); }
}
const L = c.getLengths(); console.log('il', L.length, 'last', L[L.length - 1], 'u*last', 1 * L[L.length - 1]);
