// v5 #16: the Memory screens show the real projects. For each project at 1600x900 and 390x844: capture Memory with
// it on show, find the screen on the capture (its plane's corners projected), and compare the mean brightness of its
// inner 70 % with the same part of the source (a rough guide: within about 15 %). Writes side-by-side sheets of each screen and
// its source for the eye (colours, legible text, no moire, Gloam bright).
//   node tools/v5/check-16-screens.mjs [outDir]
import { mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { launch, open, goTo } from './lib.mjs';

const out = process.argv[2] || '.shots/v5-checks/16';
mkdirSync(out, { recursive: true });
const SRC = ['src/shared/data/img/voetutor.webp', 'src/shared/data/img/gloam.webp', 'src/shared/data/img/saltancy-website.webp'];
const CROP = [null, [0.5, 0.48, 1.18], null]; // as drawScreen frames them (districts.js SCREEN_CROP)
const browser = await launch();
const rows = [];
for (const size of ['wide', 'phone']) {
  const { page, context } = await open(browser, { size, query: '?skipintro&capture' });
  await goTo(page, 3, 15000); await goTo(page, 4, 15000);
  for (const i of [0, 1, 2]) {
    await page.evaluate((k) => window.__xini.project(k), i);
    await page.waitForTimeout(2600); // the module seats and the screen powers on
    const quad = await page.evaluate((k) => {
      const w = window.__xini.world, scr = w.director.mem.screens[k];
      scr.updateMatrixWorld(true);
      return [[-106, 59.5], [106, 59.5], [106, -59.5], [-106, -59.5]].map(([x, y]) => { const s = w.toScreen(scr.localToWorld(new scr.position.constructor(x, y, 0))); return [s.x, s.y]; });
    }, i);
    const file = `${out}/${size}-project-${i + 1}.png`;
    // (the page's chrome hidden for the measurement: the card and the leader overlap the screen at some sizes)
    const hide = await page.addStyleTag({ content: '.stop, .stop .card, .stop .card *, .lead, .bar, .route, .cue { visibility: hidden !important; }' });
    await page.waitForTimeout(200);
    await page.screenshot({ path: file });
    await hide.evaluate((e) => e.remove());
    rows.push({ size, i, file, quad });
  }
  await context.close();
}
await browser.close();

const py = `
import json, sys
from PIL import Image, ImageDraw, ImageStat
rows, src, crop, out = json.loads(sys.argv[1]), json.loads(sys.argv[2]), json.loads(sys.argv[3]), sys.argv[4]
W, H = 1536, 862
res = []
for r in rows:
    cap = Image.open(r['file']).convert('RGB')
    # the screen's inner 70 % (its corners can sit behind the foreground or the bezel), and the same part of the source
    q = r['quad']; lerp = lambda a, b, t: (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)
    at = lambda u, v: lerp(lerp(q[0], q[1], u), lerp(q[3], q[2], u), v)
    inner = [at(0.15, 0.15), at(0.85, 0.15), at(0.85, 0.85), at(0.15, 0.85)]
    mask = Image.new('L', cap.size, 0); ImageDraw.Draw(mask).polygon(inner, fill=255)
    seen = ImageStat.Stat(cap.convert('L'), mask).mean[0]
    im = Image.open(src[r['i']]).convert('RGB'); c = crop[r['i']]
    cx, cy, z = c if c else (0.5, 0, 1)
    sc = max(W / im.width, H / im.height) * z; dw, dh = im.width * sc, im.height * sc
    dx = min(0, max(W - dw, W / 2 - cx * dw)); dy = 0 if cy == 0 else min(0, max(H - dh, H / 2 - cy * dh))
    vis = im.crop((round(-dx / sc), round(-dy / sc), round((W - dx) / sc), round((H - dy) / sc)))
    want = ImageStat.Stat(vis.convert('L').crop((round(vis.width * 0.15), round(vis.height * 0.15), round(vis.width * 0.85), round(vis.height * 0.85)))).mean[0]
    x0 = max(0, min(p[0] for p in r['quad'])); y0 = max(0, min(p[1] for p in r['quad'])); x1 = min(cap.width, max(p[0] for p in r['quad'])); y1 = min(cap.height, max(p[1] for p in r['quad']))
    shot = cap.crop((int(x0), int(y0), int(x1), int(y1))); h = 360
    a = shot.resize((max(1, round(shot.width * h / shot.height)), h)); b = vis.resize((round(vis.width * h / vis.height), h))
    sheet = Image.new('RGB', (a.width + b.width + 10, h), 'white'); sheet.paste(a, (0, 0)); sheet.paste(b, (a.width + 10, 0))
    sheet.save(f"{out}/{r['size']}-project-{r['i'] + 1}-vs-source.png")
    res.append([r['size'], r['i'] + 1, round(seen, 1), round(want, 1)])
print(json.dumps(res))
`;
const res = JSON.parse(execFileSync('python', ['-I', '-c', py, JSON.stringify(rows), JSON.stringify(SRC), JSON.stringify(CROP), out]).toString());
let fail = 0;
for (const [size, p, seen, want] of res) {
  const d = (seen - want) / want, ok = Math.abs(d) <= 0.15;
  if (!ok) fail++;
  console.log(`${size.padEnd(5)} project ${p}: screen mean ${seen} vs source ${want} (${(d * 100).toFixed(0)} %) → ${out}/${size}-project-${p}-vs-source.png  ${ok ? 'PASS' : 'FAIL'}`);
}
writeFileSync(`${out}/screens.json`, JSON.stringify(res));
process.exit(fail ? 1 : 0);
