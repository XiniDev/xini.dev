// Shared helpers for the v5 checks: open the site in headless Chromium at a given size, wait until the
// scene is ready, and optionally record what WebAudio does (contexts, connections to the output, every
// source start with its time).
import { launch } from '../browser.mjs';

export const BASE = process.env.XINI_URL || 'http://localhost:5173/';
export { launch };

export const SIZES = { desktop: [1440, 900], phone: [390, 844], landscape: [844, 390], wide: [1600, 900] };

const AUDIO_PROBE = () => {
  const A = (window.__audio = { contexts: [], starts: [], toDest: 0, taps: [] });
  const AC = window.AudioContext;
  window.AudioContext = class extends AC {
    constructor(...a) {
      super(...a);
      A.contexts.push(this);
      const tap = this.createAnalyser(); tap.fftSize = 2048; A.taps.push(tap);
    }
  };
  const connect = AudioNode.prototype.connect;
  AudioNode.prototype.connect = function (dest, ...rest) {
    if (dest && dest === this.context.destination) {
      A.toDest++;
      const tap = A.taps[A.contexts.indexOf(this.context)];
      if (tap && this !== tap) connect.call(this, tap);
    }
    return connect.call(this, dest, ...rest);
  };
  const start = AudioScheduledSourceNode.prototype.start;
  AudioScheduledSourceNode.prototype.start = function (when = 0, ...rest) {
    const f = this.frequency ? this.frequency.value : null;
    A.starts.push({ kind: this.constructor.name, type: this.type ?? null, f, when, at: this.context.currentTime });
    return start.call(this, when, ...rest);
  };
};

export async function open(browser, { size = 'desktop', query = '?skipintro', audio = false, touch = false } = {}) {
  const [width, height] = Array.isArray(size) ? size : SIZES[size];
  const context = await browser.newContext({ viewport: { width, height }, hasTouch: touch, isMobile: touch });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  if (audio) await page.addInitScript(AUDIO_PROBE);
  await page.goto(BASE + query, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__xini?.ready && !document.documentElement.classList.contains('booting'), null, { timeout: 60000 });
  await page.waitForTimeout(400);
  return { page, context, errors };
}

/** peak level (dBFS) seen on the output tap over `seconds` */
export async function outputPeak(page, seconds) {
  return page.evaluate(async (secs) => {
    const tap = window.__audio.taps[0], buf = new Float32Array(tap.fftSize);
    let peak = 0;
    const end = performance.now() + secs * 1000;
    while (performance.now() < end) {
      tap.getFloatTimeDomainData(buf);
      for (const v of buf) peak = Math.max(peak, Math.abs(v));
      await new Promise((r) => setTimeout(r, 20));
    }
    return peak > 0 ? 20 * Math.log10(peak) : -Infinity;
  }, seconds);
}

/** fly to a stop through the site's own navigation and wait for the arrival */
export async function goTo(page, i, timeout = 8000) {
  await page.evaluate((n) => window.__xini.goto(n), i);
  await page.waitForFunction((n) => { const w = window.__xini.world; return w.rig.index === n && !w.rig.flying && !w.pending; }, i, { timeout });
}

export const db = (x) => (x > 0 ? 20 * Math.log10(x) : -Infinity);
