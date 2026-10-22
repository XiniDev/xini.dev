// v5 #17: where every board legend can be read. Flies to each stop at 1600x900 (and 390x844), projects every piece of
// silkscreen text into the camera, and reports its glyph height in px where it is on screen and not hidden behind a
// part (a ray from the camera to points along it) or under the page's card, bar or route strip. Readable at a stop: on screen, unhidden, glyphs at least 7 px.
//   node tools/v5/audit-17-text.mjs [outJson]
import { writeFileSync } from 'node:fs';
import { launch, open, goTo } from './lib.mjs';

const outFile = process.argv[2] || '.shots/v5-checks/17/audit.json';
const browser = await launch();
const res = {};
for (const size of ['wide', 'phone']) {
  const { page, context } = await open(browser, { size });
  for (const stop of [0, 1, 2, 3, 4, 5]) {
    if (stop) await goTo(page, stop, 15000);
    await page.waitForTimeout(1500);
    const seen = await page.evaluate(() => {
      const w = window.__xini.world, d = w.director, cam = w.camera, V = cam.position.constructor, scene = w.scene;
      const solids = []; scene.traverse((o) => { if (o.isMesh && o.visible && o !== d.board && o.geometry && !o.material?.transparent) solids.push(o); });
      const rc = new window.__xini.THREE.Raycaster();
      // the page's own chrome covers the scene too: the current card, the bar, the route strip
      const covers = [...document.querySelectorAll('.stop.is-current .card, .bar, .route')].map((e) => e.getBoundingClientRect()).filter((r) => r.width);
      const covered = (s) => covers.some((r) => s.x >= r.left && s.x <= r.right && s.y >= r.top && s.y <= r.bottom);
      return d.silk.texts.map((t) => {
        const dir = [Math.cos(t.rot), Math.sin(t.rot)], up = [-dir[1], dir[0]];
        const off = t.align === 'center' ? -t.w / 2 : t.align === 'right' ? -t.w : 0;
        const pts = [0.1, 0.5, 0.9].map((u) => new V(t.x + dir[0] * (off + t.w * u), 0.6, t.z + dir[1] * (off + t.w * u)));
        let shown = 0, h = 0;
        for (const p of pts) {
          const s = w.toScreen(p.clone());
          if (s.behind || s.x < 0 || s.y < 0 || s.x > w.view.w || s.y > w.view.h || covered(s)) continue;
          const q = w.toScreen(p.clone().add(new V(up[0] * t.size * 0.5, 0, up[1] * t.size * 0.5))), r = w.toScreen(p.clone().add(new V(-up[0] * t.size * 0.5, 0, -up[1] * t.size * 0.5)));
          rc.set(cam.position, p.clone().sub(cam.position).normalize()); rc.far = cam.position.distanceTo(p) - 2;
          if (rc.intersectObjects(solids, false).length) continue;
          shown++; h = Math.max(h, Math.hypot(q.x - r.x, q.y - r.y));
        }
        return { str: t.str, shown, h: +h.toFixed(1) };
      });
    });
    for (const s of seen) { const k = s.str; res[k] = res[k] || { str: k }; res[k][`${size}-${stop}`] = s.shown >= 2 ? s.h : 0; }
  }
  await context.close();
}
await browser.close();
const rows = Object.values(res);
writeFileSync(outFile, JSON.stringify(rows, null, 1));
const cols = ['wide-0', 'wide-1', 'wide-2', 'wide-3', 'wide-4', 'wide-5', 'phone-0', 'phone-1', 'phone-2', 'phone-3', 'phone-4', 'phone-5'];
console.log('glyph height in px where readable-ish (0 = off screen or hidden); columns: stops 01–06 at 1600x900, then 390x844');
for (const r of rows) console.log(`${r.str.padEnd(40)} ${cols.map((c) => String(r[c] ?? '-').padStart(5)).join('')}`);
