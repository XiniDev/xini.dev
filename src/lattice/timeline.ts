import { gsap } from 'gsap';
import { FINAL_DIST, KEYS, TIMELINE } from './config.ts';
import type { StageRange } from './index.ts';

export type StageState = {
  morph: number;
  shift: number;
  dist: number;
  rotX: number;
  intro: number;
  lock: number;
  fade: number;
};

export const createState = (reduce: boolean): StageState => ({
  morph: 0,
  shift: 0,
  dist: KEYS.distance[0],
  rotX: KEYS.tilt[0],
  intro: reduce ? 1 : 0,
  lock: 0,
  fade: 0,
});

export const SCRUB_EASE = 'expo';

gsap.config({ autoSleep: TIMELINE.tickerSleepFrames });

export function buildTimeline({
  beats,
  featured,
  state,
  reduce,
}: {
  beats: HTMLElement[];
  featured: HTMLElement;
  state: StageState;
  reduce: boolean;
}): gsap.core.Timeline {
  const slide = reduce ? 0 : 1;
  const step = reduce ? 'steps(1)' : TIMELINE.morphEase;
  gsap.set(beats[0]!, { opacity: 1, y: 0 });
  gsap.set(beats.slice(1), { opacity: 0, y: TIMELINE.copyIn.y * slide });
  gsap.set(featured, { opacity: 0 });

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });

  TIMELINE.morphStarts.forEach((t0, i) => {
    tl.to(state, { morph: i + 1, duration: TIMELINE.morphDuration, ease: step }, t0);
    tl.to(beats[i]!, { opacity: 0, y: TIMELINE.copyOut.y * slide, duration: TIMELINE.copyOut.duration, ease: TIMELINE.copyOut.ease }, t0);
    tl.to(beats[i + 1]!, { opacity: 1, y: 0, duration: TIMELINE.copyIn.duration, ease: TIMELINE.copyIn.ease }, t0 + TIMELINE.copyIn.offset);
  });

  const [first, second, third, last] = TIMELINE.morphStarts;
  tl.to(state, { shift: 1, duration: TIMELINE.morphDuration, ease: step }, first);
  tl.to(state, { shift: 0, duration: TIMELINE.morphDuration, ease: step }, last);
  [first, second, third].forEach((t0, i) =>
    tl.to(state, { dist: KEYS.distance[i + 1], rotX: KEYS.tilt[i + 1], duration: TIMELINE.morphDuration, ease: step }, t0),
  );
  tl.to(state, { dist: FINAL_DIST, rotX: KEYS.tilt[4], lock: 1, duration: TIMELINE.morphDuration, ease: step }, last);

  const fade = TIMELINE.crossfade;
  tl.to(state, { fade: 1, duration: fade.duration, ease: fade.ease }, fade.start);
  tl.to(featured, { opacity: 1, duration: fade.duration, ease: fade.ease }, fade.start);
  tl.to({}, { duration: TIMELINE.hold.duration }, TIMELINE.hold.start);
  return tl;
}

export type Scrub = { update(): void; progress(): number; finish(): void; kill(): void };

export function scrubTimeline(
  tl: gsap.core.Timeline,
  range: () => StageRange,
  reduce: boolean,
  onProgress: (progress: number) => void,
): Scrub {
  let tween: gsap.core.Tween | undefined;
  const progress = () => {
    const { start, end } = range();
    return Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, end - start)));
  };
  const update = () => {
    const p = progress();
    if (reduce) tl.progress(p);
    else tween = gsap.to(tl, { progress: p, duration: TIMELINE.scrub, ease: SCRUB_EASE, overwrite: true });
    onProgress(p);
  };
  tl.progress(progress());
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  return {
    update,
    progress,
    finish() {
      tween?.progress(1);
      tween = undefined;
    },
    kill() {
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
      tween?.kill();
    },
  };
}

export function killTimeline(tl: gsap.core.Timeline, scrub: Scrub, elements: HTMLElement[]) {
  scrub.kill();
  tl.kill();
  gsap.set(elements, { clearProps: 'opacity,transform,pointerEvents,visibility' });
}
