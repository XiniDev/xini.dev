// What is at this pixel? Raycast from a stop's camera through screen points and name the hits.
// node tools/pick.mjs <url> <stop> <x,y> [x,y ...]   (css px in a 1200x750 viewport)
import { launch } from './browser.mjs';
const [, , url, stop, ...pts] = process.argv;
const b = await launch();
const p = await b.newPage({ viewport: { width: 1200, height: 750 } });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
await p.goto(url + (url.includes('?') ? '&' : '?') + 'skipintro&dpr=1&nobatch', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
const out = await p.evaluate(({ stop, pts }) => {
  const W = window.__xini.world; W.frozen = 0;
  window.__xini.goto(+stop);
  for (let i = 0; i < 900 && (W.rig.flying || i < 30); i++) W.tick(1 / 60);
  W.paused = true;
  const cam = W.camera; cam.updateMatrixWorld();
  const sceneMeshes = [];
  W.scene.traverseVisible((o) => { if (o.isMesh) sceneMeshes.push(o); });
  const res = [];
  for (const s of pts) {
    const [x, y] = s.split(',').map(Number);
    const ndc = { x: (x / innerWidth) * 2 - 1, y: -(y / innerHeight) * 2 + 1 };
    // build a ray by hand (no Raycaster import in the page): unproject two points
    const a = cam.position.clone(), q = cam.position.clone().set(ndc.x, ndc.y, 0.5).unproject(cam);
    const dir = q.sub(a).normalize();
    // test bounding spheres, then triangles of the nearest few
    let best = null;
    for (const m of sceneMeshes) {
      const g = m.geometry; if (!g.boundingSphere) g.computeBoundingSphere();
      if (m.isInstancedMesh) continue;
      const c = g.boundingSphere.center.clone().applyMatrix4(m.matrixWorld), r = g.boundingSphere.radius * m.matrixWorld.getMaxScaleOnAxis();
      const oc = c.clone().sub(a), tca = oc.dot(dir); if (tca < 0) continue;
      const d2 = oc.lengthSq() - tca * tca; if (d2 > r * r) continue;
      const inv = m.matrixWorld.clone().invert(), lo = a.clone().applyMatrix4(inv), ld = dir.clone().transformDirection(inv);
      const pos = g.attributes.position, idx = g.index, n = idx ? idx.count : pos.count;
      const A = lo.clone(), B = lo.clone(), C = lo.clone(), e1 = lo.clone(), e2 = lo.clone(), h = lo.clone(), sv = lo.clone(), qv = lo.clone();
      for (let i = 0; i < n; i += 3) {
        A.fromBufferAttribute(pos, idx ? idx.getX(i) : i); B.fromBufferAttribute(pos, idx ? idx.getX(i + 1) : i + 1); C.fromBufferAttribute(pos, idx ? idx.getX(i + 2) : i + 2);
        e1.subVectors(B, A); e2.subVectors(C, A); h.crossVectors(ld, e2); const det = e1.dot(h); if (Math.abs(det) < 1e-9) continue;
        const f = 1 / det; sv.subVectors(lo, A); const u = f * sv.dot(h); if (u < 0 || u > 1) continue;
        qv.crossVectors(sv, e1); const v = f * ld.dot(qv); if (v < 0 || u + v > 1) continue;
        const t = f * e2.dot(qv); if (t <= 0) continue;
        const wp = lo.clone().addScaledVector(ld, t).applyMatrix4(m.matrixWorld), dist = wp.distanceTo(a);
        if (!best || dist < best.dist) best = { dist, m, wp };
      }
    }
    if (!best) { res.push(`${s}: nothing`); continue; }
    const names = []; for (let o = best.m; o; o = o.parent) names.push(o.name || o.type);
    const u = best.m.material.uniforms;
    res.push(`${s}: ${names.join(' < ')} | base ${u?.uBase ? '#' + u.uBase.value.getHexString() : '-'} | at ${best.wp.toArray().map((v) => v.toFixed(0)).join(',')} | dist ${best.dist.toFixed(0)}`);
  }
  return res;
}, { stop, pts });
console.log(out.join('\n'));
await b.close();
