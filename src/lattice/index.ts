import { FINALE_FIT, IDLE_LOAD, TIMELINE } from './config.ts';

export type StageRange = { start: number; end: number };

export type BootApi = {
  reduce: boolean;
  timeAt(scrollY?: number): number;
  jump(t: number, instant?: boolean): boolean;
  setRange(resolve: () => StageRange): void;
  handOff(): void;
  fallback(): void;
  loadImages(): void;
  onFallback(listener: () => void): void;
  onLayout(listener: () => void): void;
  followHash(): void;
};

const HASH_TARGETS: Record<string, number> = {
  '#top': TIMELINE.jumpTargets[0],
  '#home': TIMELINE.jumpTargets[0],
  '#about': TIMELINE.jumpTargets[1],
  '#work': TIMELINE.jumpTargets[4],
  '#projects': TIMELINE.jumpTargets[4],
};

function afterFirstPaint(run: () => void) {
  const painted = () => performance.getEntriesByName('first-contentful-paint').length > 0;
  if (painted()) return run();
  if (!PerformanceObserver.supportedEntryTypes?.includes('paint')) {
    requestAnimationFrame(() => requestAnimationFrame(run));
    return;
  }
  const observer = new PerformanceObserver(() => {
    if (!painted()) return;
    observer.disconnect();
    run();
  });
  observer.observe({ type: 'paint', buffered: true });
}

export function boot(): BootApi | undefined {
  const root = document.documentElement;
  const stage = document.querySelector<HTMLElement>('.stage');
  if (!stage) return undefined;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const beats = [...stage.querySelectorAll<HTMLElement>('.beat')];
  const pin = stage.querySelector<HTMLElement>('.pin');
  const featured = stage.querySelector<HTMLElement>('.featured');
  const finale = stage.querySelector<HTMLElement>('.finale');
  const finaleHeading = stage.querySelector<HTMLElement>('#work-heading');
  const railList = stage.querySelector<HTMLElement>('.rail');
  const rail = [...stage.querySelectorAll<HTMLButtonElement>('.rail button')];
  const fallbackListeners: (() => void)[] = [];
  const layoutListeners: (() => void)[] = [];
  const staged = () => root.classList.contains('js') && !root.classList.contains('no-gl');

  let range = (): StageRange => {
    const start = stage.getBoundingClientRect().top + scrollY;
    return { start, end: start + stage.offsetHeight - (pin?.clientHeight ?? innerHeight) };
  };

  const timeAt = (y = scrollY) => {
    const { start, end } = range();
    const progress = end > start ? (y - start) / (end - start) : 0;
    return Math.min(1, Math.max(0, progress)) * TIMELINE.total;
  };

  const jump = (t: number, instant = false) => {
    if (!staged()) return false;
    const { start, end } = range();
    scrollTo({
      top: start + (end - start) * (t / TIMELINE.total) + TIMELINE.jumpNudgePx,
      behavior: instant || reduce ? 'instant' : 'smooth',
    });
    return true;
  };

  let imagesLoaded = false;
  const loadImages = () => {
    if (imagesLoaded) return;
    imagesLoaded = true;
    stage.querySelectorAll('.featured source, .featured img').forEach((el) => {
      for (const attr of ['srcset', 'src']) {
        const value = el.getAttribute(`data-${attr}`);
        if (value) {
          el.setAttribute(attr, value);
          el.removeAttribute(`data-${attr}`);
        }
      }
    });
  };

  const fitFinale = () => {
    if (!finale || !pin || !featured) return;
    finale.classList.remove(...FINALE_FIT.steps.map((step) => `fit-${step}`));
    if (!staged()) return;
    const overflow = () => finale.getBoundingClientRect().bottom - pin.getBoundingClientRect().bottom;
    const stacked = () => getComputedStyle(featured).gridTemplateColumns.split(' ').length === 1;
    for (const step of FINALE_FIT.steps) {
      if (overflow() <= 0) break;
      if (step === 'row' && (!stacked() || finale.clientWidth < FINALE_FIT.rowMinWidth)) continue;
      finale.classList.add(`fit-${step}`);
    }
  };
  const relayout = () => {
    fitFinale();
    layoutListeners.forEach((listener) => listener());
  };

  const copyIndex = (t: number) => TIMELINE.copyWindows.findIndex(([from, to]) => t >= from && t < to);

  let controlling = staged();
  let frame = 0;
  const paint = () => {
    frame = 0;
    if (!controlling) return;
    const t = timeAt();
    const active = copyIndex(t);
    beats.forEach((beat, i) => {
      beat.classList.toggle('is-active', i === active);
      beat.classList.toggle('is-hidden', i !== active);
    });
    featured?.classList.toggle('is-active', t >= TIMELINE.cardsFrom);
    railList?.classList.toggle('is-done', t >= TIMELINE.cardsFrom);
    rail.forEach((button, i) =>
      i === active ? button.setAttribute('aria-current', 'step') : button.removeAttribute('aria-current'),
    );
    if (t >= TIMELINE.imagesFrom) loadImages();
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(paint);
  };

  const stopControlling = () => {
    controlling = false;
    removeEventListener('scroll', schedule);
    removeEventListener('resize', schedule);
    if (frame) cancelAnimationFrame(frame);
    beats.forEach((beat) => beat.classList.remove('is-active', 'is-hidden'));
    featured?.classList.remove('is-active');
    railList?.classList.remove('is-done');
    root.classList.remove('pre');
  };

  const fallback = () => {
    if (root.classList.contains('no-gl')) return;
    const t = timeAt();
    const reading = beats[Math.max(0, copyIndex(t))];
    stopControlling();
    fallbackListeners.splice(0).forEach((listener) => listener());
    root.classList.add('no-gl');
    fitFinale();
    loadImages();
    if (t > 0.05 && reading) reading.scrollIntoView({ block: 'center', behavior: 'instant' });
  };

  const api: BootApi = {
    reduce,
    timeAt,
    jump,
    setRange(resolve) {
      range = resolve;
    },
    handOff: stopControlling,
    fallback,
    loadImages,
    onFallback(listener) {
      fallbackListeners.push(listener);
    },
    onLayout(listener) {
      layoutListeners.push(listener);
    },
    followHash() {
      if (!visitorMoved) followHash();
    },
  };

  document.querySelectorAll<HTMLElement>('[data-go]').forEach((el) =>
    el.addEventListener('click', (event) => {
      const target = TIMELINE.jumpTargets[Number(el.dataset.go)];
      if (target === undefined) return;
      const isSkip = el.classList.contains('skip');
      if (!jump(target, isSkip)) return;
      event.preventDefault();
      if (isSkip) finaleHeading?.focus({ preventScroll: true });
    }),
  );

  finale?.addEventListener('focusin', () => {
    loadImages();
    if (staged() && timeAt() < TIMELINE.finaleFocusBefore) jump(TIMELINE.jumpTargets[4], true);
  });

  let visitorMoved = false;
  for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown'])
    addEventListener(type, () => (visitorMoved = true), { once: true, passive: true });
  const followHash = () => {
    const target = HASH_TARGETS[location.hash];
    if (target !== undefined) jump(target, true);
  };
  addEventListener('hashchange', followHash);

  if (!staged()) return api;

  fitFinale();
  document.fonts?.ready.then(relayout);
  addEventListener('resize', relayout);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  if (location.hash) {
    followHash();
    addEventListener('load', () => requestAnimationFrame(followHash), { once: true });
  }
  paint();

  const nextTask = () => new Promise<void>((resolve) => setTimeout(resolve, 0));
  const loadStage = async () => {
    await import('./three.ts');
    await nextTask();
    await import('gsap');
    await nextTask();
    return import('./stage.ts');
  };
  const start = () =>
    loadStage()
      .then((stageModule) => stageModule.start(api))
      .catch(() => fallback());
  const whenIdle = () => {
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: IDLE_LOAD.timeoutMs });
    else setTimeout(start, IDLE_LOAD.timeoutMs);
  };
  afterFirstPaint(whenIdle);

  return api;
}
