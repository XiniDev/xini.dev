// v5.1 #1: the Power on panel against the reference (docs/v5.1/HERO.md, change 1). Parts:
//   target   2551 × 1265, sway paused: the values the site passes to layout() next to the playground's, every part of the
//            panel and the trace against the playground once the input difference is allowed for, and the capture
//            aligned against target-6a.png (panel, trace run, ring)
//   copy     the panel's text against v5 COPY.md (whitespace normalised), one h1, POWER ON and PWR
//   desktop  1440 × 900, 1920 × 1080, 1280 × 720, 1024 × 768 (and 1000 × 960, 820 × 800): in the band without touching the bar or the route strip,
//            clear of the tower, the trace right of the frame before it turns, the rule ending before PWR
//   phone    390 × 844 and 844 × 390: nothing off screen, no text under 10 px, the trace clear of the text and the ring;
//            at 390 × 844 the arrangement against the playground's phone layout and target-6a-390.png
//   resize   the v5 #13 cases for the panel: its rectangle and the trace's end within 4 px of a fresh load
//   node tools/v5.1/check-01-panel.mjs [parts=target,copy,desktop,phone,resize] [outDir]
import { launch, open, openRef, settled, measure, tracePoints, align, out } from './lib.mjs';

const parts = (process.argv[2] || 'target,copy,desktop,phone,resize').split(',');
const dir = out(process.argv[3] || '.shots/v5.1-checks/01');
const browser = await launch();
let fail = 0;
const verdict = (ok, line) => { if (!ok) fail++; console.log(`${line}  ${ok ? 'PASS' : 'FAIL'}`); };
const f1 = (v) => v.toFixed(1);

if (parts.includes('target')) {
  const SIZE = [2551, 1265];
  const ref = await openRef(browser, { size: SIZE });
  const R = await measure(ref.page), Rin = { gutter: 64, bandTop: 72, bandBottom: 1172, crown: { x: 1577.5, y: 297.5 } };
  const refOut = await ref.page.evaluate(() => window.layoutInfo);
  await ref.page.screenshot({ path: `${dir}/target-playground.png` });
  const { page, context, errors } = await open(browser, { size: SIZE });
  await settled(page);
  const S = await measure(page), Sin = await page.evaluate(() => window.__xini.heroIn()), Sout = await page.evaluate(() => window.__xini.world.director.heroOut);
  await page.screenshot({ path: `${dir}/target-site.png` });
  console.log('layout() inputs, site vs playground:');
  for (const k of ['gutter', 'bandTop', 'bandBottom']) console.log(`  ${k.padEnd(10)} ${f1(Sin[k]).padStart(7)}  ${f1(Rin[k]).padStart(7)}  diff ${f1(Sin[k] - Rin[k])}`);
  console.log(`  crown      (${f1(Sin.crown.x)}, ${f1(Sin.crown.y)})  (${Rin.crown.x}, ${Rin.crown.y})  diff (${f1(Sin.crown.x - Rin.crown.x)}, ${f1(Sin.crown.y - Rin.crown.y)})`);
  console.log(`  frame      ${JSON.stringify(Sout.frame)} k ${Sout.k}; playground ${JSON.stringify(refOut.frame)} k ${refOut.k}`);
  // every part moves with the frame; the ring with the crown
  const df = [S.parts.frame[0] - R.parts.frame[0], S.parts.frame[1] - R.parts.frame[1]];
  let worst = 0, worstAt = '';
  for (const [n, a] of Object.entries(S.parts)) {
    const b = R.parts[n], e = Math.max(Math.abs(a[0] - b[0] - df[0]), Math.abs(a[1] - b[1] - df[1]), Math.abs(a[2] - b[2]), Math.abs(a[3] - b[3]));
    if (e > worst) { worst = e; worstAt = n; }
  }
  const dc = [Sin.crown.x - Rin.crown.x, Sin.crown.y - Rin.crown.y];
  const ringErr = Math.hypot(S.ring[0] - R.ring[0] - dc[0], S.ring[1] - R.ring[1] - dc[1]);
  // the trace: its run is the pad's height (moves with the frame), its far end the crown's
  const sp = tracePoints(S.trace), rp = tracePoints(R.trace);
  const runErr = Math.abs(sp.at(-1)[1] - rp.at(-1)[1] - df[1]) + Math.abs(sp.at(-1)[0] - rp.at(-1)[0] - df[0]);
  verdict(worst <= 2 && ringErr <= 2 && runErr <= 2, `parts against the playground, frame offset (${f1(df[0])}, ${f1(df[1])}) allowed for: worst ${f1(worst)} px (${worstAt}); ring ${f1(ringErr)} px after the crown's (${f1(dc[0])}, ${f1(dc[1])}); trace's pad end ${f1(runErr)} px`);
  // the capture against the approved image: the best alignment should be the input difference (the trace's run is
  // taken with its pad, which fixes it along the line)
  const T = 'reference/hero-6a/target-6a.png';
  const pane = await align(page, T, `${dir}/target-site.png`, [R.parts.frame[0], R.parts.frame[1], R.parts.frame[2], R.parts.frame[3]], 8, [Math.round(df[0]), Math.round(df[1])]);
  const runY = rp.at(-1)[1], run = await align(page, T, `${dir}/target-site.png`, [rp.at(-1)[0] - 30, runY - 10, Math.max(70, rp.at(-2)[0] - rp.at(-1)[0] + 10), 20], 8, [Math.round(df[0]), Math.round(df[1])]);
  const ring = await align(page, T, `${dir}/target-site.png`, [R.ring[0] - 16, R.ring[1] - 16, 32, 32], 10, [Math.round(dc[0]), Math.round(dc[1])]);
  const near = (m, e) => Math.max(Math.abs(m.dx - e[0]), Math.abs(m.dy - e[1]));
  verdict(near(pane, df) <= 2 && near(run, df) <= 2 && near(ring, dc) <= 2,
    `capture vs target-6a.png: panel best at (${pane.dx}, ${pane.dy}) err ${f1(pane.err)} (input offset (${f1(df[0])}, ${f1(df[1])})); trace run at (${run.dx}, ${run.dy}); ring at (${ring.dx}, ${ring.dy}) (crown offset (${f1(dc[0])}, ${f1(dc[1])}))`);
  if (errors.length) { fail++; console.log('page errors:', errors); }
  await context.close(); await ref.context.close();
}

if (parts.includes('copy')) {
  const { page, context } = await open(browser, { size: [1440, 900] });
  await settled(page);
  const n = (s) => (s ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
  const got = await page.evaluate(() => {
    const h = window.__xini.hero.root, t = (s) => h.querySelector(s)?.textContent;
    return { label: t('.h6__label'), role: t('.h6__role'), name: t('.h6__name-face'), statement: t('.h6__sr'), spec: t('.h6__spec span:last-child'), pwr: t('.h6__pwr'),
      h1: [...document.querySelectorAll('h1')].length, h1in: !!h.querySelector('h1'), lockHidden: h.querySelector('.h6__lk').getAttribute('aria-hidden'),
      pe: getComputedStyle(h).pointerEvents, oldCard: !!document.querySelector('.stop--top .card'), oldLead: !!document.querySelector('.lead.is-on:not(.is-hidden)'),
      rings: document.querySelectorAll('.h6-leader:not([hidden]) .h6-leader__ring').length + document.querySelectorAll('.lead.is-on:not(.is-hidden) .lead__via').length };
  });
  const want = { label: 'Power on', role: 'Software Engineer · AI Integration', name: 'Xini', statement: 'Ambitious ideas, ambitious software.', spec: 'Developer · Designer · Creator', pwr: 'PWR' };
  for (const [k, v] of Object.entries(want)) verdict(n(got[k]) === n(v), `${k.padEnd(9)} "${(got[k] ?? '').replace(/\s+/g, ' ').trim()}"`);
  verdict(got.h1 === 1 && got.h1in && got.lockHidden === 'true' && got.pe === 'none', `one h1 (${got.h1}), the name; lockup aria-hidden ${got.lockHidden}; pointer-events ${got.pe}`);
  verdict(!got.oldCard && !got.oldLead && got.rings === 1, `old card gone (${!got.oldCard}), old leader off (${!got.oldLead}), rings at the crown ${got.rings}`);
  await context.close();
}

/** the tower's silhouette over the panel: rays through a grid over the panel's rectangle (unbatched, so it is the tower's own meshes) */
const towerOverlap = (page) => page.evaluate(() => {
  const X = window.__xini, w = X.world, T = X.THREE, r = X.hero.root.getBoundingClientRect(), tower = w.director.tower.group;
  const rc = new T.Raycaster(); let hits = 0, n = 0, minGap = Infinity;
  for (let y = r.top; y <= r.bottom; y += 8) for (let x = r.left; x <= r.right + 200; x += 8) {
    rc.setFromCamera(new T.Vector2((x / w.view.w) * 2 - 1, -(y / w.view.h) * 2 + 1), w.camera);
    if (rc.intersectObject(tower, true).length) { if (x <= r.right) hits++; else minGap = Math.min(minGap, x - r.right); }
    n++;
  }
  return { hits, minGap };
});

if (parts.includes('desktop')) {
  // (HERO.md's four, then two near-square screens, which still take the wide framing)
  for (const size of [[1440, 900], [1920, 1080], [1280, 720], [1024, 768], [1000, 960], [820, 800]]) {
    const { page, context, errors } = await open(browser, { size, query: '?skipintro&nobatch' });
    await settled(page);
    const M = await measure(page), I = await page.evaluate(() => window.__xini.heroIn());
    const fr = M.parts.frame, top = fr[1], bottom = fr[1] + fr[3], right = fr[0] + fr[2];
    const tw = await towerOverlap(page);
    const pts = tracePoints(M.trace), turnX = pts.length >= 3 ? pts[1][0] : NaN;
    const rule = M.parts.rule, pwr = M.parts.pwr, ruleEnd = rule[0] + rule[2];
    await page.screenshot({ path: `${dir}/desktop-${size.join('x')}.png` });
    verdict(top > I.bandTop && bottom < I.bandBottom && tw.hits === 0 && turnX - right >= 0 && ruleEnd < pwr[0] && !errors.length,
      `${size.join('x').padEnd(9)} k ${M.k.toFixed(3)}${M.wrap ? ' (strip wrapped)' : ''}: ${f1(top - I.bandTop)} px under the bar, ${f1(I.bandBottom - bottom)} px over the route strip; tower over the panel at ${tw.hits} points (nearest tower ${f1(tw.minGap)} px right of it); trace runs ${f1(turnX - right)} px right of the frame before it turns; rule ends ${f1(pwr[0] - ruleEnd)} px before PWR${errors.length ? `; errors ${errors}` : ''}`);
    await context.close();
  }
}

if (parts.includes('phone')) {
  for (const size of [[390, 844], [844, 390]]) {
    const { page, context, errors } = await open(browser, { size, dpr: 2 });
    await settled(page);
    const M = await measure(page), I = await page.evaluate(() => window.__xini.heroIn());
    const r = await page.evaluate(() => {
      const h = window.__xini.hero, vw = innerWidth, vh = innerHeight;
      const texts = [...h.root.querySelectorAll('*')].filter((e) => [...e.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim()) && !e.closest('.h6__sr'));
      const boxes = texts.map((e) => { const b = e.getBoundingClientRect(); return { t: e.textContent.trim().slice(0, 14), fs: parseFloat(getComputedStyle(e).fontSize), b: [b.left, b.top, b.right, b.bottom] }; });
      const f = h.root.getBoundingClientRect(), trim = h.root.querySelector('.h6__trim').getBoundingClientRect();
      const over = [f, trim, ...texts.map((e) => e.getBoundingClientRect())].filter((b) => b.left < -0.5 || b.top < -0.5 || b.right > vw + 0.5 || b.bottom > vh + 0.5).length;
      const ring = h.leader.querySelector('.h6-leader__ring'), lead = h.leader.getBoundingClientRect();
      return { boxes, over, minFs: Math.min(...boxes.map((x) => x.fs)), ringIn: +ring.getAttribute('r') - +ring.getAttribute('stroke-width') / 2, lead: [lead.left, lead.top, lead.right, lead.bottom], vw, vh };
    });
    // the trace against the text boxes and the ring
    const pts = tracePoints(M.trace), seg = (a, b, B) => { // does segment ab cross box B (inflated 2 px)?
      for (let t = 0; t <= 1; t += 0.01) { const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t; if (x > B[0] - 2 && x < B[2] + 2 && y > B[1] - 2 && y < B[3] + 2) return true; }
      return false;
    };
    const crossText = r.boxes.filter((x) => pts.slice(1).some((p, i) => seg(pts[i], p, x.b))).map((x) => x.t);
    const [cx, cy] = M.ring, dist = (a, b) => { let m = Infinity; for (let t = 0; t <= 1; t += 0.005) m = Math.min(m, Math.hypot(a[0] + (b[0] - a[0]) * t - cx, a[1] + (b[1] - a[1]) * t - cy)); return m; };
    // (it starts on the ring's stroke, outside its hole, and only moves away: nowhere nearer the centre than its start)
    const start = Math.hypot(pts[0][0] - cx, pts[0][1] - cy), ringGap = Math.min(...pts.slice(1).map((p, i) => dist(pts[i], p)));
    await page.screenshot({ path: `${dir}/phone-${size.join('x')}.png` });
    verdict(r.over === 0 && r.minFs >= 10 && !crossText.length && ringGap >= start - 0.01 && start >= r.ringIn && !errors.length,
      `${size.join('x').padEnd(9)} k ${M.k.toFixed(3)} ${M.compact ? 'compact' : 'desktop layout'}${M.wrap ? ' (wrapped)' : ''}: ${r.over} boxes off screen; smallest text ${r.minFs} px; trace crosses text ${JSON.stringify(crossText)}; trace starts ${f1(start)} px from the ring's centre (its hole ${f1(r.ringIn)}) and never comes closer (${f1(ringGap)}); band ${f1(I.bandTop)}–${f1(I.bandBottom)}${errors.length ? `; errors ${errors}` : ''}`);
    if (size[0] === 390) {
      // the arrangement: every part's place inside the frame against the playground's phone layout (same gutter, same k)
      const ref = await openRef(browser, { size, dpr: 2, query: '?static=1&shot=1&compact=1' });
      const R = await measure(ref.page);
      let worst = 0, at = '';
      for (const [n, a] of Object.entries(M.parts)) {
        const b = R.parts[n]; if (!a[2] && !a[3] && !b[2] && !b[3]) continue; // not drawn in either (the far pad on phones)
        const e = Math.max(Math.abs(a[0] - M.parts.frame[0] - (b[0] - R.parts.frame[0])), Math.abs(a[1] - M.parts.frame[1] - (b[1] - R.parts.frame[1])), Math.abs(a[2] - b[2]), Math.abs(a[3] - b[3]));
        if (e > worst) { worst = e; at = n; }
      }
      // and the capture against target-6a-390.png, over the panel (the playground's frame there; the site's sits lower or higher)
      const RF = R.parts.frame, dy = M.parts.frame[1] - RF[1];
      const al = await align(ref.page, 'reference/hero-6a/target-6a-390.png', `${dir}/phone-390x844.png`, [RF[0] * 2, RF[1] * 2, RF[2] * 2, RF[3] * 2], 6, [0, Math.round(dy * 2)]);
      verdict(worst <= 1 && Math.abs(al.dx) <= 2 && Math.abs(al.dy - dy * 2) <= 2,
        `390x844 arrangement: parts within ${f1(worst)} px of the playground's phone layout (${at}); k ${M.k.toFixed(4)} vs ${R.k.toFixed(4)}; strip rows ${M.parts.role[1] > M.parts.label[1] + 5 ? 2 : 1}; capture vs target-6a-390 best at (${al.dx}, ${al.dy}) device px for a frame ${f1(dy * 2)} device px lower`);
      await ref.context.close();
    }
    await context.close();
  }
}

if (parts.includes('resize')) {
  const CASES = [[[1440, 900], [390, 844]], [[390, 844], [1440, 900]], [[390, 844], [844, 390]]];
  const grab = async (page) => { await page.waitForTimeout(500); await settled(page); const M = await measure(page); return { frame: M.parts.frame, end: M.ring.slice(0, 2), lead: !M.leaderHidden }; };
  for (const [A, B] of CASES) {
    const a = await open(browser, { size: A });
    await settled(a.page);
    await a.page.setViewportSize({ width: B[0], height: B[1] });
    const got = await grab(a.page); await a.context.close();
    const b = await open(browser, { size: B });
    const want = await grab(b.page); await b.context.close();
    const dfr = Math.max(...got.frame.map((v, k) => Math.abs(v - want.frame[k]))), dend = Math.hypot(got.end[0] - want.end[0], got.end[1] - want.end[1]);
    verdict(dfr <= 4 && dend <= 4 && got.lead === want.lead, `${A.join('x')} → ${B.join('x')}: panel off by ${f1(dfr)} px, trace end off by ${f1(dend)} px, leader ${got.lead ? 'shown' : 'hidden'} vs ${want.lead ? 'shown' : 'hidden'}`);
  }
}

await browser.close();
console.log(fail ? `${fail} failed` : 'all passed');
process.exit(fail ? 1 : 0);
