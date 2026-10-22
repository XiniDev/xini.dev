// v5 #5: the sound-on sting.
// A. First switch-on: five relay clicks scheduled 0.05–0.33 s after the click, the whine from 0.38 s, and the slam
//    within 15 ms of the `when` given to music.start (2.2 s after the click, with impact). A second switch-on
//    schedules no boot cues and passes fadeIn.
// B. Switched off during the sting: nothing of it plays after the next switch-on, and it does not replay.
// C. Switched on during the visual boot with the impact frame >= 0.6 s away: the slam and the music's first chord
//    land on the impact frame (page clock converted to the context clock).
import { chromium } from 'playwright';
import { launch, open, outputPeak, BASE } from './lib.mjs';

const watchStarts = (page) => page.evaluate(() => {
  const s = window.__xini.sfx, attach = s.attach.bind(s);
  window.__mstart = [];
  s.attach = (ctx) => {
    const r = attach(ctx), start = s.music.start;
    s.music.start = (when, o) => { window.__mstart.push({ when, o: { ...o }, t0: ctx.currentTime, n: window.__audio.starts.length }); return start(when, o); };
    return r;
  };
});
const clickSound = async (page) => { const b = await page.locator('.bar__sound').boundingBox(); await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); };
// the sources one switch-on scheduled synchronously, relative to its click
const scheduled = (page, k) => page.evaluate((k) => {
  // (the boot cues are scheduled before music.start in the same tick; the music's own first notes come after it)
  const m = window.__mstart[k];
  const S = window.__audio.starts.slice(Math.max(0, m.n - 40), m.n).filter((x) => Math.abs(x.at - m.t0) < 0.03);
  return { t0: m.t0, when: m.when - m.t0, o: m.o, relays: S.filter((x) => x.type === 'square').map((x) => x.when - m.t0), whine: S.filter((x) => x.type === 'sawtooth').map((x) => x.when - m.t0), sines: S.filter((x) => x.type === 'sine').map((x) => x.when - m.t0) };
}, k);

let fail = 0;
const report = (ok, msg) => { if (!ok) fail++; console.log(`${msg}  ${ok ? 'PASS' : 'FAIL'}`); };
const f3 = (a) => a.map((x) => x.toFixed(3)).join(', ');

// A
{
  const browser = await launch();
  const { page, context } = await open(browser, { audio: true });
  await watchStarts(page);
  await clickSound(page);
  await page.waitForTimeout(3000);
  const a = await scheduled(page, 0);
  const slam = a.sines.filter((x) => Math.abs(x - a.when) <= 0.015);
  report(a.relays.length === 5 && a.relays.every((x) => x >= 0.05 - 1e-6 && x <= 0.33 + 1e-6), `first switch-on: relays at ${f3(a.relays)} s after the click`);
  report(a.whine.length === 1 && Math.abs(a.whine[0] - 0.38) < 0.002, `whine starts at ${f3(a.whine)} s`);
  report(Math.abs(a.when - 2.2) < 0.002 && a.o.impact === true && slam.length > 0, `music.start(when = +${a.when.toFixed(3)} s, impact: ${a.o.impact}); slam starts at +${f3(slam)} s (within 15 ms)`);
  await clickSound(page); await page.waitForTimeout(1200); await clickSound(page); await page.waitForTimeout(500);
  const b = await scheduled(page, 1);
  report(b.relays.length === 0 && b.whine.length === 0 && b.o.fadeIn === 0.8 && !b.o.impact, `second switch-on: ${b.relays.length} relays, ${b.whine.length} whine, fadeIn ${b.o.fadeIn}, impact ${!!b.o.impact}`);
  await context.close(); await browser.close();
}

// B
{
  const browser = await launch();
  const { page, context } = await open(browser, { audio: true });
  await watchStarts(page);
  await clickSound(page);
  await page.waitForTimeout(500);
  await clickSound(page); // off, mid-sting
  await page.waitForTimeout(1200);
  await page.evaluate(() => { window.__xini.sfx.musicBus.gain.value = 0; });
  await clickSound(page); // on again: the clock resumes where it stopped, before the old slam's time
  const c = await scheduled(page, 1);
  await page.waitForTimeout(300); // the toggle's own snap decays
  const peak = await outputPeak(page, 2.4);
  await context.close(); await browser.close();
  report(c.relays.length === 0 && c.whine.length === 0 && peak < -60, `off during the sting, on again: no new boot cues, output (music muted) peaks ${peak === -Infinity ? '-inf' : peak.toFixed(1)} dBFS over the old slam's time`);
}

// C
{
  const browser = await chromium.launch({ headless: true, args: ['--autoplay-policy=no-user-gesture-required', '--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader', ...(process.platform === 'win32' ? ['--use-angle=d3d11'] : [])] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.addInitScript(() => { window.__audio = { starts: [] }; const st = AudioScheduledSourceNode.prototype.start; AudioScheduledSourceNode.prototype.start = function (w = 0, ...r) { window.__audio.starts.push({ type: this.type ?? null, when: w, at: this.context.currentTime }); return st.call(this, w, ...r); }; });
  await page.goto(BASE + '?boot', { waitUntil: 'load' });
  await page.waitForFunction(() => window.__xini?.world?.director?.intro && window.__xini.world.director.intro.t > 0.45, null, { timeout: 60000, polling: 'raf' });
  await watchStarts(page);
  const r = await page.evaluate(() => new Promise((res) => {
    const d = window.__xini.world.director, s = window.__xini.sfx;
    const ahead = d.bootImpact();
    s.toggle();
    // at the impact frame: the context time being heard then (the same page-to-context mapping the site uses)
    const loop = () => {
      if (d.intro?.hit || !d.intro) {
        const m = window.__mstart[0], ts = s.ctx.getOutputTimestamp?.();
        res({ ahead, when: m.when, t0: m.t0, current: s.ctx.currentTime, heard: ts?.performanceTime > 0 ? ts.contextTime + (performance.now() - ts.performanceTime) / 1000 : null, state: s.ctx.state });
      }
      else requestAnimationFrame(loop);
    };
    loop();
  }));
  await context.close(); await browser.close();
  // AUDIO.md: the impact frame's page time converted to ctx.currentTime. (Printed for information: what the output
  // device was playing at that frame, i.e. how late the slam is heard after the picture.)
  const off = r.current - r.when;
  report(r.ahead >= 0.6 && Math.abs(off) <= 0.02, `on during the boot (${r.ahead.toFixed(2)} s before the impact frame): slam and first chord at ctx ${r.when.toFixed(3)}; ctx.currentTime at the impact frame ${r.current.toFixed(3)} (${(off * 1000).toFixed(0)} ms); heard ${r.heard === null ? 'n/a' : ((r.when - r.heard) * 1000).toFixed(0) + ' ms after the frame (output latency, not compensated)'}`);
}
process.exit(fail ? 1 : 0);
