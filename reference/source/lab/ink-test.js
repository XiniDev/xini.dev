import * as THREE from 'three';
import { InkPipeline, post } from '../shared/gfx/pipeline.js';
import { inkMaterial, shared } from '../shared/gfx/ink-material.js';
import { makeBackdrop, backdrop } from '../shared/gfx/backdrop.js';
import marks from '../marks/out/marks.json';

const params = new URLSearchParams(location.search);
const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);
const pipe = new InkPipeline(renderer);
const scene = new THREE.Scene();
const glowScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
camera.position.set(0, 0.4, 9);
camera.lookAt(0, 0, 0);
const bg = makeBackdrop(shared.uPx);
scene.add(bg);

function markShape(name) {
  const polys = marks[name];
  const shapes = [];
  for (const p of polys) {
    const [outer, ...holes] = p;
    const s = new THREE.Shape(outer.map(([x, y]) => new THREE.Vector2((x - 60) / 50, -(y - 60) / 50)));
    for (const h of holes) s.holes.push(new THREE.Path(h.map(([x, y]) => new THREE.Vector2((x - 60) / 50, -(y - 60) / 50))));
    shapes.push(s);
  }
  return shapes;
}
const markGeo = new THREE.ExtrudeGeometry(markShape(params.get('mark') || 'xni-boxed'), { depth: 0.32, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.035, bevelSegments: 1 });
markGeo.center();
const accent = params.get('accent') || '#3dff8f';
const mark = new THREE.Mesh(markGeo, inkMaterial({ base: accent, back: accent, rim: 1, spec: 0.9, flat: true, brush: 0.35 }));
mark.rotation.set(-0.25, 0.55, 0.05);
scene.add(mark);

const d20 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 0).toNonIndexed(), inkMaterial({ base: '#e9e2d0', flat: true, brush: 0.3 }));
d20.position.set(-2.6, -0.9, -0.5); d20.rotation.set(0.4, 0.3, 0.1);
scene.add(d20);
const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.62, 0.2, 160, 24), inkMaterial({ base: '#ff4b3e', rim: 1, spec: 1 }));
knot.position.set(2.7, -0.6, -0.8);
scene.add(knot);
const box = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), inkMaterial({ base: '#3a3f58', flat: true }));
box.position.set(2.2, 1.7, -2.5); box.rotation.set(0.5, 0.7, 0.2);
scene.add(box);
const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), inkMaterial({ base: '#26214a', brush: 0.5, spec: 0, rim: 0 }));
floor.rotation.x = -Math.PI / 2; floor.position.y = -1.9;
scene.add(floor);

function resize() {
  const w = innerWidth, h = innerHeight, dpr = Math.min(devicePixelRatio, 1.75);
  renderer.setPixelRatio(dpr); renderer.setSize(w, h, false);
  pipe.setSize(w, h, dpr);
  shared.uPx.value = dpr;
  bg.material.uniforms.uRes.value.set(w * dpr, h * dpr);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();
const t0 = performance.now();
function frame() {
  const t = (performance.now() - t0) / 1000;
  shared.uTime.value = t; shared.uStep.value = Math.floor(t * 12) / 12; post.uStep.value = shared.uStep.value;
  if (!params.has('still')) { mark.rotation.y = 0.55 + Math.sin(t * 0.5) * 0.3; }
  pipe.render(scene, camera, glowScene);
  requestAnimationFrame(frame);
}
frame();
window.__ready = true;
