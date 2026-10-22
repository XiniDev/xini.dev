// v5 #18 (check only): the Enclave → Memory and Memory → I/O flights captured at 25, 50 and 75 % at 1600x900 and
// 390x844, with how much of the destination's hero is in view: a grid of points on it (Memory: the screen it lands
// on; I/O: the mark cut through the shield), each counted as seen, in frame but behind a part, or out of frame.
// Occluded = in frame and every point behind a part; out of frame is the camera looking along its path.
//   node tools/v5/check-18-occlusion.mjs [outDir]
import { mkdirSync } from 'node:fs';
import { launch, open, goTo } from './lib.mjs';

const out = process.argv[2] || '.shots/v5-checks/18';
mkdirSync(out, { recursive: true });
const browser = await launch();
const rows = [];
for (const size of ['wide', 'phone']) {
  for (const [from, to] of [[3, 4], [4, 5]]) {
    for (const pct of [0.25, 0.5, 0.75]) {
      const { page, context } = await open(browser, { size, query: '?skipintro&capture' });
      await goTo(page, from, 15000); await page.waitForTimeout(700);
      const r = await page.evaluate(([to, pct]) => {
        const X = window.__xini, w = X.world, d = w.director, T = X.THREE;
        X.freeze(); X.goto(to);
        let k = 0; while (w.rig.progress < pct && k++ < 600) X.advance(1 / 60, 1 / 60);
        // the hero's points
        let pts = [];
        if (to === 4) {
          const scr = d.mem.screens[w.ui.project]; scr.updateMatrixWorld(true);
          for (let u = -0.4; u <= 0.41; u += 0.2) for (let v = -0.4; v <= 0.41; v += 0.2) pts.push(scr.localToWorld(new T.Vector3(u * 212, v * 119, 0)));
        } else {
          for (let y = 160; y <= 320; y += 40) for (let z = -540; z <= -400; z += 35) pts.push(new T.Vector3(-1004, y, z));
        }
        const solids = []; w.scene.traverse((o) => { if (o.isMesh && o.visible && !o.material?.transparent && !(to === 4 && o === d.mem.screens[w.ui.project])) solids.push(o); });
        const rc = new T.Raycaster(); let seen = 0, framed = 0;
        for (const p of pts) {
          const s = w.toScreen(p.clone());
          if (s.behind || s.x < 0 || s.y < 0 || s.x > w.view.w || s.y > w.view.h) continue;
          framed++;
          rc.set(w.camera.position, p.clone().sub(w.camera.position).normalize()); rc.far = w.camera.position.distanceTo(p) - 3;
          if (!rc.intersectObjects(solids, false).length) seen++;
        }
        // Memory's hero by DIRECTION.md is the module that seats; its screen faces the aisle (west), so it only comes into
        // sight as the climb drops into the gallery. Count the arriving module's top and east faces too.
        let mod = null;
        if (to === 4) {
          const seg = d.mem.segs[w.ui.project], box = new T.Box3().setFromObject(seg), mp = [];
          for (let a = 0.1; a <= 0.91; a += 0.2) for (let b = 0.1; b <= 0.91; b += 0.2) {
            mp.push(new T.Vector3(box.min.x + (box.max.x - box.min.x) * a, box.max.y - 1, box.min.z + (box.max.z - box.min.z) * b));
            mp.push(new T.Vector3(box.max.x - 1, box.min.y + (box.max.y - box.min.y) * a, box.min.z + (box.max.z - box.min.z) * b));
          }
          const others = solids.filter((o) => { for (let q = o; q; q = q.parent) if (q === seg) return false; return true; });
          mod = { seen: 0, framed: 0, n: mp.length };
          for (const p of mp) {
            const s = w.toScreen(p.clone()); if (s.behind || s.x < 0 || s.y < 0 || s.x > w.view.w || s.y > w.view.h) continue;
            mod.framed++; rc.set(w.camera.position, p.clone().sub(w.camera.position).normalize()); rc.far = w.camera.position.distanceTo(p) - 3;
            if (!rc.intersectObjects(others, false).length) mod.seen++;
          }
        }
        return { seen, framed, n: pts.length, mod, progress: w.rig.progress };
      }, [to, pct]);
      await page.waitForTimeout(200);
      const file = `${out}/${size}-${from + 1}-${to + 1}-${Math.round(pct * 100)}pct.png`;
      await page.screenshot({ path: file });
      rows.push({ size, from, to, pct, ...r, file });
      console.log(`${size.padEnd(5)} 0${from + 1} → 0${to + 1} at ${Math.round(pct * 100)} %: ${to === 4 ? 'screen' : 'mark'} ${r.seen}/${r.n} seen, ${r.framed - r.seen} behind a part, ${r.n - r.framed} out of frame${r.mod ? `; module ${r.mod.seen}/${r.mod.n} seen, ${r.mod.framed - r.mod.seen} behind a part, ${r.mod.n - r.mod.framed} out of frame` : ''} → ${file}`);
      await context.close();
    }
  }
}
await browser.close();
for (const size of ['wide', 'phone']) for (const [from, to] of [[3, 4], [4, 5]]) {
  // occluded: the hero is in the frame and every point of it is behind a part (out of frame is the camera looking along its path)
  const R = rows.filter((r) => r.size === size && r.from === from), H = R.map((r) => r.mod || r);
  const hidden = H.filter((r) => r.framed > 0 && r.seen === 0).length, away = H.filter((r) => r.framed === 0).length;
  console.log(`${size} 0${from + 1} → 0${to + 1}: the hero (${to === 4 ? 'the arriving module' : 'the mark'}) fully hidden behind parts in ${hidden} of 3 frames, out of frame in ${away} → ${hidden >= 2 ? 'FIX NEEDED' : 'no fix'}`);
}
