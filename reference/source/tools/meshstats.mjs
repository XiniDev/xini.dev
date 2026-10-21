// Count visible meshes and distinct materials per top-level group (what static batching could save).
// node tools/meshstats.mjs <url>
import { launch } from './browser.mjs';
const [, , url] = process.argv;
const b = await launch();
const p = await b.newPage({ viewport: { width: 800, height: 500 } });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
await p.goto(url + (url.includes('?') ? '&' : '?') + 'skipintro&dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
const r = await p.evaluate(() => {
  const W = window.__xini.world; W.paused = true;
  const out = {};
  for (const top of W.scene.children) {
    let meshes = 0, inst = 0; const mats = new Set();
    top.traverseVisible((o) => { if (o.isMesh) { meshes++; if (o.isInstancedMesh) inst++; mats.add(o.material.uuid); } });
    out[top.name || top.type] = { meshes, inst, mats: mats.size };
  }
  return out;
});
console.table(r);
await b.close();
