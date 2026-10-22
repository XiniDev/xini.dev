import * as THREE from 'three';
import { InkPipeline, post } from '../shared/gfx/pipeline.js';
import { shared } from '../shared/gfx/ink-material.js';
import { makeBackdrop, backdrop } from '../shared/gfx/backdrop.js';
import { MarkForm, DieForm, MiuraForm, ScreenForm } from '../concepts/fold/forms.js';
import { featured } from '../shared/data/content.js';

const q = new URLSearchParams(location.search);
const P = +(q.get('p') ?? 1);
const pal = { paper: q.get('paper') || '#35e08a', back: '#15131f', edge: '#0b0a10', pulse: '#d8fff0' };
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);
const pipe = new InkPipeline(renderer);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
camera.position.set(0, 0.2, 11); camera.lookAt(0, 0, 0);
scene.add(makeBackdrop(shared.uPx));
backdrop.uTop.value.set('#0c0f22'); backdrop.uBottom.value.set('#232a4d'); backdrop.uGlowCol.value.set('#1e5a55'); backdrop.uGlowAmt.value = 0.4;
backdrop.uGlowPos.value.set(0.5, 0.55);
shared.uShadeTint.value.set('#1a1745'); shared.uRimCol.value.set('#bfffe3'); shared.uDotInk.value.set('#0a0913');
post.uGradeShadow.value.set('#120f2b');

const mark = new MarkForm(pal); mark.set(P); mark.group.position.set(-3.6, 1.3, 0); mark.group.rotation.set(-0.15, 0.35, 0); scene.add(mark.group);
const die = new DieForm(pal, 'DejaVu Sans'); die.set(P); die.group.position.set(-0.6, 1.3, 0); die.group.rotation.set(0.3, 0.4, 0); scene.add(die.group);
const miura = new MiuraForm(pal); miura.set(P * 0.8); miura.group.position.set(2.9, 1.3, 0); miura.group.rotation.set(-0.9, 0.2, 0.4); scene.add(miura.group);
function art(it) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 720; const g = c.getContext('2d');
  g.fillStyle = '#efe9dc'; g.fillRect(0, 0, 512, 720);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.NoColorSpace;
  const img = new Image(); img.onload = () => {
    const h = 512 * img.height / img.width; g.drawImage(img, 0, 60, 512, h);
    g.fillStyle = '#0a0913'; g.font = '800 64px DejaVu Sans'; g.fillText(it.name, 24, 640); tex.needsUpdate = true;
  }; img.src = it.image;
  return tex;
}
const screen = new ScreenForm(pal, [...featured, { name: 'More', image: featured[0].image }], art);
screen.group.position.set(0, -1.9, 0); screen.group.scale.setScalar(0.95); screen.sel = +(q.get('sel') ?? 1); screen.selF = screen.sel; scene.add(screen.group);

function resize() {
  const w = innerWidth, h = innerHeight, dpr = 1;
  renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); pipe.setSize(w, h, dpr); shared.uPx.value = dpr;
  scene.children[0].material.uniforms.uRes.value.set(w * dpr, h * dpr);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();
let last = performance.now();
function frame() {
  const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000); last = now;
  shared.uStep.value = post.uStep.value = Math.floor(now / 1000 * 12) / 12;
  screen.update(dt);
  pipe.render(scene, camera);
  requestAnimationFrame(frame);
}
frame();
