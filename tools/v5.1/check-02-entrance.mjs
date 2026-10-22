// v5.1 #2: the hologram entrance (docs/v5.1/HERO.md, change 2). Parts:
//   frames   2551 × 1265, sway paused: the entrance frozen at 0, 320, 610, 705 and 1040 ms (__xini.hero.seek) next to the
//            playground frozen at the same times (?t=), compared over the panel and the trace; a sheet of both
//   arrive   1440 × 900: arriving at Power on from each of the other stops plays the entrance once; 1.1 s after the
//            arrival nothing animates inside the panel or its leader and no temporary copy is left; at every other
//            stop neither the panel nor the trace or ring shows
//   back     leaving in the middle of the entrance and coming straight back: no leftovers, and the settled panel is the
//            static one (pixels over the panel, against hero.show())
//   reduced  prefers-reduced-motion: the arrival and the departure are plain fades, 200 ms in and 150 ms out
//   boot     a first load: nothing of the panel or the trace during the boot; the entrance starts after its impact frame
//   pacing   1440 × 900: the p95 interval between animation frames during the entrance against the settled panel
//   node tools/v5.1/check-02-entrance.mjs [parts=frames,arrive,back,reduced,boot,pacing] [outDir]
import { execFileSync } from 'node:child_process';
import { launch, open, openRef, settled, measure, align, out, BASE } from './lib.mjs';

const parts = (process.argv[2] || 'frames,arrive,back,reduced,boot,pacing').split(',');
const dir = out(process.argv[3] || '.shots/v5.1-checks/02');
const browser = await launch();
let fail = 0;
const verdict = (ok, line) => { if (!ok) fail++; console.log(`${line}  ${ok ? 'PASS' : 'FAIL'}`); };
const f1 = (v) => v.toFixed(1);

/** fly to a stop and wait until the flight has landed */
const go = async (page, i) => {
  await page.evaluate((n) => window.__xini.goto(n), i);
  await page.waitForFunction((n) => { const w = window.__xini.world; return w.rig.index === n && !w.rig.flying && !w.pending; }, i, { timeout: 20000 });
};
/** what is animating inside the panel and its leader, and what the entrance left behind */
const heroState = (page) => page.evaluate(() => {
  const h = window.__xini.hero, mine = (a) => { const t = a.effect?.target; return t && (h.root.contains(t) || h.leader.contains(t)); };
  return { anims: document.getAnimations().filter(mine).length, temps: h.root.querySelectorAll('.h6__name > .h6__art').length - 1, ghosts: h.root.querySelectorAll('.h6__ghost').length,
    artHidden: h.root.querySelector('.h6__name > .h6__art').style.visibility === 'hidden', dash: h.leader.querySelector('.h6-leader__trace').style.strokeDasharray,
    hidden: h.root.hasAttribute('hidden'), leaderHidden: h.leader.hasAttribute('hidden') };
});
/** count enter() and leave() calls (the director calls them on the same object) */
const countCalls = (page) => page.evaluate(() => {
  const h = window.__xini.hero; window.__calls = { enter: [], leave: [] };
  for (const k of ['enter', 'leave']) { const f = h[k]; h[k] = (o) => { window.__calls[k].push({ t: performance.now(), reduced: !!o?.reduced }); return f(o); }; }
});

if (parts.includes('frames')) {
  const SIZE = [2551, 1265], TIMES = [0, 320, 610, 705, 1040];
  const { page, context } = await open(browser, { size: SIZE });
  await settled(page);
  const S = await measure(page);
  for (const ms of TIMES) {
    await page.evaluate((t) => { const X = window.__xini; X.world.director.enterHero(); X.hero.seek(t); }, ms);
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${dir}/site-${ms}.png` });
  }
  let R;
  for (const ms of TIMES) {
    const ref = await openRef(browser, { size: SIZE, query: `?t=${ms}&shot=1` });
    R ??= await measure(ref.page);
    await ref.page.screenshot({ path: `${dir}/playground-${ms}.png` });
    await ref.context.close();
  }
  const df = [S.parts.frame[0] - R.parts.frame[0], S.parts.frame[1] - R.parts.frame[1]];
  // the panel with the trace's run and the ring: from the frame's left to past the crown
  const region = [R.parts.frame[0] - 10, R.parts.frame[1] - 10, R.ring[0] + 30 - R.parts.frame[0], R.parts.frame[3] + 20];
  for (const ms of TIMES) {
    const a = await align(page, `${dir}/playground-${ms}.png`, `${dir}/site-${ms}.png`, region, 3, [Math.round(df[0]), Math.round(df[1])]);
    // (before 200 ms nothing of the panel is up to align on: only the trace leaving the crown)
    verdict(a.atExpect <= 6 && (ms < 200 || Math.max(Math.abs(a.dx - df[0]), Math.abs(a.dy - df[1])) <= 2),
      `${String(ms).padStart(4)} ms: site against the playground at the same time, frame offset (${f1(df[0])}, ${f1(df[1])}) allowed for: mean difference ${f1(a.atExpect)} (best at (${a.dx}, ${a.dy}), ${f1(a.err)})`);
  }
  // a sheet for the eye: playground over site, at each time
  execFileSync('python', ['-c', `
import sys
from PIL import Image
d, times, box = sys.argv[1], sys.argv[2].split(','), [int(float(v)) for v in sys.argv[3].split(',')]
dy = round(float(sys.argv[4]))
tiles = []
for t in times:
    a = Image.open(f'{d}/playground-{t}.png').convert('RGB').crop((box[0], box[1], box[0] + box[2], box[1] + box[3]))
    b = Image.open(f'{d}/site-{t}.png').convert('RGB').crop((box[0], box[1] + dy, box[0] + box[2], box[1] + box[3] + dy))
    tiles.append((a, b))
w, h = tiles[0][0].size
s = 0.4
sw, sh = int(w * s), int(h * s)
sheet = Image.new('RGB', (len(tiles) * (sw + 8), sh * 2 + 8), 'white')
for i, (a, b) in enumerate(tiles):
    sheet.paste(a.resize((sw, sh), Image.LANCZOS), (i * (sw + 8), 0))
    sheet.paste(b.resize((sw, sh), Image.LANCZOS), (i * (sw + 8), sh + 8))
sheet.save(f'{d}/frames-sheet.png')
`, dir, TIMES.join(','), region.join(','), String(df[1])]);
  console.log(`  sheet (playground over site, ${TIMES.join(', ')} ms): ${dir}/frames-sheet.png; reference: reference/hero-6a/entrance-frames.jpg`);
  await context.close();
}

if (parts.includes('arrive')) {
  const { page, context, errors } = await open(browser, { size: [1440, 900] });
  await settled(page);
  await countCalls(page);
  for (const from of [1, 2, 3, 4, 5]) {
    await go(page, from);
    const away = await heroState(page);
    await page.evaluate(() => { window.__calls.enter = []; });
    await go(page, 0);
    await page.waitForTimeout(1100);
    const st = await heroState(page), n = await page.evaluate(() => window.__calls.enter.length);
    verdict(away.hidden && away.leaderHidden && n === 1 && st.anims === 0 && st.temps === 0 && st.ghosts === 0 && !st.artHidden && !st.dash && !st.hidden && !st.leaderHidden,
      `0${from + 1} → 01: at 0${from + 1} panel ${away.hidden ? 'hidden' : 'SHOWN'}, leader ${away.leaderHidden ? 'hidden' : 'SHOWN'}; entrance played ${n}×; 1.1 s after arrival ${st.anims} animations in the panel, ${st.temps + st.ghosts} temporary copies${st.artHidden || st.dash ? ', inline leftovers' : ''}`);
  }
  if (errors.length) { fail++; console.log('page errors:', errors); }
  await context.close();
}

if (parts.includes('back')) {
  const { page, context } = await open(browser, { size: [1440, 900] });
  await settled(page);
  // the static panel, for comparison
  await page.evaluate(() => window.__xini.hero.show());
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${dir}/back-static.png` });
  const results = [];
  for (const at of [150, 400, 650, 900]) {
    await page.evaluate(() => window.__xini.world.director.enterHero());
    await page.waitForTimeout(at);
    // leave (the flight to the next stop starts), then straight back
    await page.evaluate(() => { const X = window.__xini; X.goto(1); });
    await page.waitForTimeout(60);
    await page.evaluate(() => { const X = window.__xini; X.goto(0); });
    await page.waitForFunction(() => { const w = window.__xini.world; return w.rig.index === 0 && !w.rig.flying && !w.pending; }, null, { timeout: 20000 });
    await page.waitForTimeout(1200);
    const st = await heroState(page);
    await page.screenshot({ path: `${dir}/back-${at}.png` });
    const M = await measure(page);
    const a = await align(page, `${dir}/back-static.png`, `${dir}/back-${at}.png`, M.parts.frame, 0);
    results.push({ at, st, err: a.atExpect });
    verdict(st.anims === 0 && st.temps === 0 && st.ghosts === 0 && !st.artHidden && !st.dash && !st.hidden && !st.leaderHidden && a.atExpect < 1.5,
      `left ${at} ms into the entrance and came back: ${st.anims} animations, ${st.temps + st.ghosts} temporary copies${st.artHidden || st.dash ? ', inline leftovers' : ''}; settled panel against the static one: mean difference ${a.atExpect.toFixed(2)}`);
  }
  await context.close();
}

if (parts.includes('reduced')) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__xini?.ready && !document.documentElement.classList.contains('booting'), null, { timeout: 60000 });
  await page.waitForTimeout(600);
  const rec = () => page.evaluate(() => new Promise((res) => {
    const h = window.__xini.hero, seen = new Map();
    const tick = () => { for (const a of document.getAnimations()) { const t = a.effect?.target; if (t && (h.root.contains(t) || h.leader.contains(t)) && !seen.has(a)) seen.set(a, { el: t === h.root ? 'panel' : t === h.leader ? 'leader' : t.getAttribute('class') || t.tagName, props: [...new Set(a.effect.getKeyframes().flatMap((k) => Object.keys(k).filter((p) => !['offset', 'easing', 'composite', 'computedOffset'].includes(p))))].join('+'), dur: a.effect.getTiming().duration }); } };
    const loop = () => { tick(); if (performance.now() - t0 < 1400) requestAnimationFrame(loop); else res([...seen.values()]); };
    const t0 = performance.now(); loop();
  }));
  await page.evaluate(() => window.__xini.goto(1));
  const outA = await rec();
  await page.waitForFunction(() => { const w = window.__xini.world; return w.rig.index === 1 && !w.rig.flying && !w.pending; }, null, { timeout: 20000 });
  await page.evaluate(() => window.__xini.goto(0));
  const inA = await rec();
  const only = (list, dur) => list.length > 0 && list.every((a) => ['panel', 'leader'].includes(a.el) && a.props === 'opacity' && a.dur === dur);
  verdict(only(inA, 200) && only(outA, 150), `reduced motion: arriving ${JSON.stringify(inA)}; leaving ${JSON.stringify(outA)}`);
  await context.close();
}

if (parts.includes('boot')) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE + '?boot', { waitUntil: 'load' });
  await page.waitForFunction(() => window.__xini?.ready, null, { timeout: 60000 });
  const r = await page.evaluate(() => new Promise((res) => {
    const X = window.__xini, h = X.hero, w = X.world, log = { frames: 0, shownInBoot: 0, hit: null, enter: null, bootEnd: null };
    const hit = w.impact.hit.bind(w.impact); w.impact.hit = (o) => { if (log.hit === null && o?.seq === 'sig') log.hit = performance.now(); return hit(o); };
    const enter = h.enter; h.enter = (o) => { if (log.enter === null) log.enter = performance.now(); return enter(o); };
    const loop = () => {
      const booting = document.documentElement.classList.contains('booting') || !!w.director.intro && !w.director.intro.card;
      if (booting) { log.frames++; if (!h.root.hasAttribute('hidden') || !h.leader.hasAttribute('hidden')) log.shownInBoot++; }
      else if (log.bootEnd === null) log.bootEnd = performance.now();
      if (log.enter !== null && performance.now() - log.enter > 1500) res(log); else requestAnimationFrame(loop);
    };
    loop();
    setTimeout(() => res(log), 12000);
  }));
  verdict(r.frames > 10 && r.shownInBoot === 0 && r.hit !== null && r.enter !== null && r.enter >= r.hit,
    `first load: ${r.frames} boot frames, panel or trace shown in ${r.shownInBoot}; the entrance starts ${r.enter !== null && r.hit !== null ? f1(r.enter - r.hit) : '?'} ms after the boot's impact frame`);
  await context.close();
}

if (parts.includes('pacing')) {
  const { page, context } = await open(browser, { size: [1440, 900] });
  await settled(page);
  await page.waitForTimeout(1500);
  const r = await page.evaluate(async () => {
    const X = window.__xini, rec = (ms) => new Promise((res) => { const ts = []; const f = (t) => { ts.push(t); if (t - ts[0] < ms) requestAnimationFrame(f); else res(ts.slice(1).map((v, i) => v - ts[i])); }; requestAnimationFrame(f); });
    const p95 = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(0.95 * (s.length - 1))]; };
    const during = [], still = [];
    for (let i = 0; i < 6; i++) {
      X.world.director.enterHero(); during.push(...await rec(1040));
      await new Promise((r) => setTimeout(r, 300));
      still.push(...await rec(1040));
    }
    return { during: p95(during), still: p95(still), n: [during.length, still.length] };
  });
  verdict(r.during <= r.still * 1.1, `frame pacing at 1440x900: p95 ${f1(r.during)} ms during the entrance, ${f1(r.still)} ms settled (${f1((r.during / r.still - 1) * 100)} %), ${r.n[0]} and ${r.n[1]} frames`);
  await context.close();
}

await browser.close();
console.log(fail ? `${fail} failed` : 'all passed');
process.exit(fail ? 1 : 0);
