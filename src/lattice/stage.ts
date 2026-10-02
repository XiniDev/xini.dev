import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  PerspectiveCamera,
  Plane,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from './three.ts';
import { gsap } from 'gsap';
import type { BootApi } from './index.ts';
import {
  CAMERA,
  CHROME,
  COLOURS,
  DUST,
  FIT,
  GROUP,
  INTRO,
  LANDING,
  LIFT,
  LOW_POWER,
  PHONE_MAX_WIDTH,
  POINTER,
  POINTS,
  SHADER,
  TIMELINE,
} from './config.ts';
import { drawnPosition, type DisplaceUniforms } from './displace.ts';
import { readLanding, type LandingScreen } from './landing.ts';
import { buildTimeline, createState, killTimeline, scrubTimeline } from './timeline.ts';
import type { FormsReply, LandingReply, WorkerRequest } from './worker.ts';
import pointsVertex from './shaders/points.vert.glsl?raw';
import pointsFragment from './shaders/points.frag.glsl?raw';
import dustVertex from './shaders/dust.vert.glsl?raw';
import dustFragment from './shaders/dust.frag.glsl?raw';

const glsl = (v: number) => (Number.isInteger(v) ? v.toFixed(1) : v < 0 ? `(${v})` : String(v));
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const pointDefines = () => ({
  LATTICE_PI: glsl(Math.PI),
  LATTICE_TAU: glsl(Math.PI * 2),
  STAGGER_SPREAD: glsl(SHADER.staggerSpread),
  STAGGER_WINDOW: glsl(SHADER.staggerWindow),
  TURB_ROTATE_BASE: glsl(SHADER.turbRotateBase),
  TURB_ROTATE_RAND: glsl(SHADER.turbRotateRand),
  TURB_SCALE: glsl(SHADER.turbScale),
  TURB_NOISE: glsl(SHADER.turbNoise),
  IDLE_NOISE: glsl(SHADER.idleNoise),
  NOISE_FREQ_X: glsl(SHADER.noiseFreq[0]),
  NOISE_FREQ_Y: glsl(SHADER.noiseFreq[1]),
  NOISE_FREQ_Z: glsl(SHADER.noiseFreq[2]),
  NOISE_SPEED_X: glsl(SHADER.noiseSpeed[0]),
  NOISE_SPEED_Y: glsl(SHADER.noiseSpeed[1]),
  NOISE_SPEED_Z: glsl(SHADER.noiseSpeed[2]),
  INTRO_SPREAD: glsl(SHADER.introSpread),
  INTRO_WINDOW: glsl(SHADER.introWindow),
  POINTER_RADIUS: glsl(SHADER.pointerRadius),
  POINTER_PUSH_XY: glsl(SHADER.pointerPushXY),
  POINTER_PUSH_Z: glsl(SHADER.pointerPushZ),
  PULSE_THRESHOLD: glsl(SHADER.pulseThreshold),
  PULSE_FREQ_X: glsl(SHADER.pulseFreqX),
  PULSE_SPEED: glsl(SHADER.pulseSpeed),
  PULSE_FREQ_Y: glsl(SHADER.pulseFreqY),
  PULSE_CALM: glsl(SHADER.pulseCalm),
  BIG_THRESHOLD: glsl(SHADER.bigThreshold),
  SIZE_BASE: glsl(SHADER.sizeBase),
  SIZE_RAND: glsl(SHADER.sizeRand),
  SIZE_BIG: glsl(SHADER.sizeBig),
  ALPHA_BASE: glsl(SHADER.alphaBase),
  ALPHA_RAND: glsl(SHADER.alphaRand),
  CORE_RADIUS: glsl(SHADER.coreRadius),
  GLOW_BASE: glsl(SHADER.glowBase),
  GLOW_BIG: glsl(SHADER.glowBig),
  PULSE_COLOUR: glsl(SHADER.pulseColour),
  SOFT_WEIGHT: glsl(SHADER.softWeight),
  CORE_WEIGHT: glsl(SHADER.coreWeight),
  PULSE_ALPHA_BASE: glsl(SHADER.pulseAlphaBase),
  PULSE_ALPHA: glsl(SHADER.pulseAlpha),
});

const dustDefines = () => ({
  DUST_DRIFT_Y: glsl(DUST.driftY),
  DUST_DRIFT_Y_SPEED: glsl(DUST.driftYSpeed),
  DUST_DRIFT_Y_PHASE: glsl(DUST.driftYPhase),
  DUST_DRIFT_X: glsl(DUST.driftX),
  DUST_DRIFT_X_SPEED: glsl(DUST.driftXSpeed),
  DUST_DRIFT_X_PHASE: glsl(DUST.driftXPhase),
  DUST_SIZE_BASE: glsl(DUST.sizeBase),
  DUST_SIZE_RAND: glsl(DUST.sizeRand),
  DUST_SIZE_SCALE: glsl(DUST.sizeScale),
  DUST_ALPHA_BASE: glsl(DUST.alphaBase),
  DUST_ALPHA_RAND: glsl(DUST.alphaRand),
});

type Hook = Record<string, unknown>;

const yieldToMain = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

export async function start(api: BootApi): Promise<void> {
  await yieldToMain();
  const root = document.documentElement;
  const stage = document.querySelector<HTMLElement>('.stage')!;
  const pin = stage.querySelector<HTMLElement>('.pin')!;
  const canvas = pin.querySelector<HTMLCanvasElement>('canvas.gl')!;
  const featured = pin.querySelector<HTMLElement>('.featured')!;
  const beats = [...pin.querySelectorAll<HTMLElement>('.beat')];
  const rail = pin.querySelector<HTMLElement>('.rail')!;
  const railButtons = [...rail.querySelectorAll<HTMLButtonElement>('button')];
  const vignette = pin.querySelector<HTMLElement>('.vignette')!;
  const reduce = api.reduce;
  const narrowQuery = matchMedia(`(max-width: ${PHONE_MAX_WIDTH}px)`);
  const lowPower = narrowQuery.matches || (navigator.hardwareConcurrency || 8) <= LOW_POWER.maxCores;
  const profile = lowPower ? POINTS.lowPower : POINTS.desktop;
  const count = profile.count;

  const renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  const dpr = Math.min(devicePixelRatio || 1, profile.dprCap);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(new Color(getComputedStyle(root).getPropertyValue('--void').trim()), 1);
  await yieldToMain();

  const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
  const pendingLanding = new Map<number, (reply: LandingReply) => void>();
  let resolveForms: (reply: FormsReply) => void = () => {};
  const formsReady = new Promise<FormsReply>((resolve, reject) => {
    resolveForms = resolve;
    worker.onerror = (event) => reject(new Error(event.message || 'worker failed'));
  });
  worker.onmessage = ({ data }: MessageEvent<FormsReply | LandingReply>) => {
    if (data.type === 'forms') resolveForms(data);
    else pendingLanding.get(data.id)?.(data);
  };
  const send = (message: WorkerRequest) => worker.postMessage(message);
  send({ type: 'forms', count, dust: profile.dust });

  let landingId = 0;
  const requestLanding = () => {
    const id = ++landingId;
    const { input, screen } = readLanding(pin, featured);
    return new Promise<{ reply: LandingReply; screen: LandingScreen }>((resolve) => {
      pendingLanding.set(id, (reply) => {
        pendingLanding.delete(id);
        resolve({ reply, screen });
      });
      send({ type: 'landing', id, count, input });
    });
  };

  const [forms, firstLanding] = await Promise.all([formsReady, requestLanding()]);
  await yieldToMain();

  const scene = new Scene();
  const camera = new PerspectiveCamera(CAMERA.fov, canvas.clientWidth / Math.max(1, canvas.clientHeight), CAMERA.near, CAMERA.far);
  const group = new Group();
  scene.add(group);

  const geometry = new BufferGeometry();
  const attribute = (data: Float32Array, size: number) => new BufferAttribute(data, size);
  geometry.setAttribute('position', attribute(forms.forms[0]!, 3));
  geometry.setAttribute('aStart', attribute(forms.start, 3));
  geometry.setAttribute('aRand', attribute(forms.rand, 4));
  const landingAttribute = attribute(firstLanding.reply.positions, 3);
  const later: [string, BufferAttribute][] = [
    ['aB', attribute(forms.forms[1]!, 3)],
    ['aC', attribute(forms.forms[2]!, 3)],
    ['aD', attribute(forms.forms[3]!, 3)],
    ['aE', landingAttribute],
  ];
  const uploadNext = () => {
    const next = later.shift();
    if (next) geometry.setAttribute(...next);
  };

  const S = createState(reduce);
  const uniforms = {
    uMorph: { value: 0 },
    uIntro: { value: S.intro },
    uTime: { value: 0 },
    uCalm: { value: reduce ? 1 : 0 },
    uLock: { value: 0 },
    uSize: { value: profile.size as number },
    uPixelRatio: { value: dpr },
    uAlpha: { value: profile.alpha as number },
    uPointer: { value: new Vector3(99, 99, 0) },
    uPointerStrength: { value: 0 },
    uColor: { value: new Vector3(...COLOURS.base) },
    uHot: { value: new Vector3(...COLOURS.hot) },
  };
  const material = new ShaderMaterial({
    uniforms,
    defines: pointDefines(),
    vertexShader: pointsVertex,
    fragmentShader: pointsFragment,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const points = new Points(geometry, material);
  points.frustumCulled = false;
  group.add(points);

  const dustGeometry = new BufferGeometry();
  dustGeometry.setAttribute('position', attribute(forms.dust, 3));
  dustGeometry.setAttribute('aR', attribute(forms.dustRand, 1));
  const dustMaterial = new ShaderMaterial({
    uniforms: { uTime: uniforms.uTime, uPixelRatio: uniforms.uPixelRatio, uDust: { value: new Vector3(...COLOURS.dust) } },
    defines: dustDefines(),
    vertexShader: dustVertex,
    fragmentShader: dustFragment,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const dust = new Points(dustGeometry, dustMaterial);
  dust.frustumCulled = false;
  scene.add(dust);

  await yieldToMain();

  let landing = firstLanding;
  let landingVersion = 1;
  let landingBuiltAt = performance.now();
  let landingTimer = 0;
  const rebuildLanding = async () => {
    clearTimeout(landingTimer);
    const built = await requestLanding();
    if (built.reply.id !== landingId) return;
    (landingAttribute.array as Float32Array).set(built.reply.positions);
    landingAttribute.needsUpdate = true;
    landing = built;
    landingVersion++;
    landingBuiltAt = performance.now();
    kick();
  };
  const scheduleLanding = () => {
    clearTimeout(landingTimer);
    landingTimer = window.setTimeout(rebuildLanding, LANDING.debounceMs);
  };

  const pointer = { x: 0, y: 0, active: 0, last: -Infinity };
  const ndc = new Vector2();
  const ray = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const hit = new Vector3();
  const tan = Math.tan((CAMERA.fov * Math.PI) / 360);
  const t0 = performance.now();
  let frames = 0;
  let introPlayed = false;
  let lastChrome = { rail: -1, vignette: -1, cards: '' };

  const hud = new URLSearchParams(location.search).has('hud') ? document.createElement('p') : undefined;
  let fpsFrames = 0;
  let fpsSince = t0;
  if (hud) {
    hud.className = 'hud';
    hud.setAttribute('aria-hidden', 'true');
    pin.append(hud);
  }
  const hudText = (fps: number) =>
    `${count.toLocaleString('en-GB')} points, ${fps} fps, pixel ratio ${Number(dpr.toFixed(2))}`;
  if (hud) hud.textContent = hudText(0);

  const setActive = (index: number) =>
    railButtons.forEach((b, i) => (i === index ? b.setAttribute('aria-current', 'step') : b.removeAttribute('aria-current')));

  const render = (now: number) => {
    const t = reduce ? 0 : (now - t0) / 1000;
    const m = S.morph;
    if (m > 0) while (later.length) uploadNext();
    const narrow = narrowQuery.matches;
    uniforms.uTime.value = t;
    uniforms.uMorph.value = m;
    uniforms.uIntro.value = S.intro;
    uniforms.uLock.value = S.lock;

    const visW = 2 * S.dist * tan * camera.aspect;
    const fits = [...(narrow ? FIT.phone : FIT.desktop).map(([share, span]) => (visW * share) / span), 1];
    const lifts = narrow ? LIFT.phone : LIFT.desktop;
    const k = Math.min(3, Math.floor(Math.max(0, m)));
    const f = smooth(m - k);
    group.scale.setScalar(Math.min(GROUP.scaleCap, lerp(fits[k]!, fits[k + 1]!, f)));
    group.position.x = narrow ? 0 : S.shift * Math.min((visW / 2) * GROUP.shiftShare, GROUP.shiftMax);
    group.position.y = lerp(lifts[k]!, lifts[k + 1]!, f);

    const presence = clamp01(m) * clamp01(4 - m);
    const wanted = !reduce && now - pointer.last < POINTER.activeMs ? 1 : 0;
    pointer.active += (wanted - pointer.active) * POINTER.ease;
    const free = 1 - S.lock;
    group.rotation.y =
      m * GROUP.turnPerForm + Math.sin(t * GROUP.swaySpeed) * GROUP.swayAmplitude * presence + pointer.x * POINTER.tiltY * pointer.active * free;
    group.rotation.x = S.rotX - pointer.y * POINTER.tiltX * pointer.active * free;

    const orbit = Math.sin(t * CAMERA.orbitSpeed) * CAMERA.orbitAmplitude * free;
    camera.position.set(Math.sin(orbit) * S.dist, CAMERA.height * free, Math.cos(orbit) * S.dist);
    camera.lookAt(0, 0, 0);
    uniforms.uAlpha.value = profile.alpha * (1 - (1 - TIMELINE.crossfade.alphaFloor) * S.fade);

    const railOpacity = 1 - S.lock;
    if (railOpacity !== lastChrome.rail) {
      rail.style.opacity = String(railOpacity);
      rail.style.visibility = S.lock > CHROME.railHiddenAt ? 'hidden' : '';
      rail.style.pointerEvents = S.lock > CHROME.railPointerOffAt ? 'none' : '';
      lastChrome.rail = railOpacity;
    }
    const vignetteOpacity = 1 - CHROME.vignetteLockFade * S.lock;
    if (vignetteOpacity !== lastChrome.vignette) {
      vignette.style.opacity = String(vignetteOpacity);
      lastChrome.vignette = vignetteOpacity;
    }
    const cards = S.fade > 0.5 ? 'auto' : 'none';
    if (cards !== lastChrome.cards) {
      featured.style.pointerEvents = cards;
      lastChrome.cards = cards;
    }

    group.updateMatrixWorld();
    ndc.set(pointer.x, pointer.y);
    ray.setFromCamera(ndc, camera);
    if (ray.ray.intersectPlane(plane, hit)) {
      group.worldToLocal(hit);
      uniforms.uPointer.value.copy(hit);
    }
    uniforms.uPointerStrength.value = pointer.active * free;
    dust.rotation.y = -group.rotation.y * DUST.counterRotation;
    setActive(Math.max(0, Math.min(4, Math.round(m))));
    renderer.render(scene, camera);
    uploadNext();
    frames++;

    if (hud) {
      fpsFrames++;
      if (now - fpsSince > 1000) {
        hud.textContent = hudText(Math.round((fpsFrames * 1000) / (now - fpsSince)));
        fpsFrames = 0;
        fpsSince = now;
      }
    }
  };

  let onStage = true;
  let lost = false;
  let raf = 0;
  const want = () => onStage && !document.hidden && !lost && !root.classList.contains('no-gl');
  const frame = (now: number) => {
    raf = 0;
    if (!want()) return;
    render(now);
    if (!reduce) raf = requestAnimationFrame(frame);
  };
  function kick() {
    if (want() && !raf) raf = requestAnimationFrame(frame);
  }
  let introTween: gsap.core.Tween | undefined;
  const update = () => {
    if (want()) {
      if (introTween?.paused()) introTween.resume();
      kick();
      return;
    }
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    scrub?.finish();
    introTween?.pause();
    gsap.ticker.sleep();
  };

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    kick();
  };
  resize();

  const range = () => {
    const start = stage.getBoundingClientRect().top + scrollY;
    return { start, end: start + stage.offsetHeight - pin.clientHeight };
  };
  const onProgress = (progress: number) => {
    if (progress * TIMELINE.total >= TIMELINE.imagesFrom) api.loadImages();
    kick();
  };
  let tl = buildTimeline({ beats, featured, state: S, reduce });
  let scrub = scrubTimeline(tl, range, reduce, onProgress);
  api.setRange(range);

  const teardown = () => killTimeline(tl, scrub, [...beats, featured, rail, vignette]);
  api.onFallback(teardown);

  await yieldToMain();
  if (api.timeAt() > 0) while (later.length) uploadNext();
  if (reduce || api.timeAt() > INTRO.skipAfter) S.intro = 1;
  else {
    introPlayed = true;
    introTween = gsap.to(S, { intro: 1, duration: INTRO.duration, delay: INTRO.delay, ease: INTRO.ease });
  }

  if (renderer.extensions.has('KHR_parallel_shader_compile')) await renderer.compileAsync(scene, camera);
  else renderer.compile(scene, camera);
  await yieldToMain();
  api.handOff();

  new ResizeObserver(() => {
    resize();
    scheduleLanding();
  }).observe(canvas);
  addEventListener('orientationchange', scheduleLanding);
  api.onLayout(scheduleLanding);
  const afterFonts = () => document.fonts?.ready.then(() => rebuildLanding());
  afterFonts();
  document.fonts?.addEventListener('loading', afterFonts);
  new MutationObserver(scheduleLanding).observe(featured, { subtree: true, childList: true, characterData: true });

  addEventListener(
    'pointermove',
    (event) => {
      if (reduce || (event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return;
      const r = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((event.clientY - r.top) / r.height) * 2 + 1;
      pointer.last = performance.now();
    },
    { passive: true },
  );

  new IntersectionObserver(([entry]) => {
    onStage = !!entry?.isIntersecting;
    update();
  }).observe(stage);
  document.addEventListener('visibilitychange', update);

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    lost = true;
    update();
    api.fallback();
  });
  canvas.addEventListener('webglcontextrestored', () => {
    lost = false;
    try {
      const reading = readingTime();
      root.classList.remove('no-gl');
      tl = buildTimeline({ beats, featured, state: S, reduce });
      scrub = scrubTimeline(tl, range, reduce, onProgress);
      api.setRange(range);
      api.onFallback(teardown);
      api.jump(reading, true);
      lastChrome = { rail: -1, vignette: -1, cards: '' };
      scheduleLanding();
      update();
    } catch {
      root.classList.add('no-gl');
    }
  });

  function readingTime() {
    const centre = innerHeight / 2;
    let best = 0;
    let bestDistance = Infinity;
    beats.forEach((beat, i) => {
      const r = beat.getBoundingClientRect();
      const d = Math.abs((r.top + r.bottom) / 2 - centre);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    });
    return TIMELINE.jumpTargets[best] ?? 0;
  }

  update();

  if (import.meta.env.MODE === 'test') {
    const attrs = () => ({
      position: geometry.getAttribute('position').array,
      aB: geometry.getAttribute('aB').array,
      aC: geometry.getAttribute('aC').array,
      aD: geometry.getAttribute('aD').array,
      aE: geometry.getAttribute('aE').array,
      aStart: geometry.getAttribute('aStart').array,
      aRand: geometry.getAttribute('aRand').array,
    });
    const loseExtension = renderer.getContext().getExtension('WEBGL_lose_context');
    const scrollTime = () => scrub.progress() * TIMELINE.total;
    const settle = async (timeout = 8000) => {
      const until = performance.now() + timeout;
      let lastY = -1;
      let still = 0;
      while (performance.now() < until) {
        still = scrollY === lastY ? still + 1 : 0;
        lastY = scrollY;
        if (still >= 4 && Math.abs(tl.time() - scrollTime()) < 0.002 && !gsap.isTweening(S) && !gsap.isTweening(tl)) return true;
        await new Promise((r) => setTimeout(r, 50));
      }
      return false;
    };
    const hook: Hook = {
      ready: true,
      state: () => ({
        morph: S.morph,
        shift: S.shift,
        dist: S.dist,
        rotX: S.rotX,
        intro: S.intro,
        lock: S.lock,
        fade: S.fade,
        time: scrollTime(),
        tlTime: tl.time(),
        introPlayed,
        frames,
        count,
        dpr,
        lowPower,
        landingVersion,
        landingBuiltAt,
        pointerActive: pointer.active,
        alpha: uniforms.uAlpha.value,
        baseAlpha: profile.alpha,
        pointerStrength: uniforms.uPointerStrength.value,
        calm: uniforms.uCalm.value,
      }),
      settle,
      jumpTo: async (t: number) => {
        api.jump(t, true);
        await settle();
        render(performance.now());
        return (hook.state as () => unknown)();
      },
      rebuildLanding,
      projectLanding: () => {
        render(performance.now());
        const u: DisplaceUniforms = {
          morph: uniforms.uMorph.value,
          intro: uniforms.uIntro.value,
          time: uniforms.uTime.value,
          calm: uniforms.uCalm.value,
          lock: uniforms.uLock.value,
          pointerX: uniforms.uPointer.value.x,
          pointerY: uniforms.uPointer.value.y,
          pointerStrength: uniforms.uPointerStrength.value,
        };
        const a = attrs();
        const r = canvas.getBoundingClientRect();
        const v = new Vector3();
        points.updateMatrixWorld(true);
        camera.updateMatrixWorld();
        const xy: number[] = [];
        for (let i = 0; i < count; i++) {
          v.set(...drawnPosition(i, a, u)).applyMatrix4(points.matrixWorld).project(camera);
          xy.push(r.left + ((v.x + 1) / 2) * r.width, r.top + ((1 - v.y) / 2) * r.height);
        }
        const now = readLanding(pin, featured).screen;
        return { xy, kind: [...landing.reply.kind], owner: [...landing.reply.owner], cards: now.cards, lines: now.lines, builtLines: landing.screen.lines.length };
      },
      loseContext: () => loseExtension?.loseContext(),
      restoreContext: () => loseExtension?.restoreContext(),
      pointerMove: (x: number, y: number) => {
        pointer.x = x;
        pointer.y = y;
        pointer.last = performance.now();
      },
    };
    (window as unknown as { __lattice: Hook }).__lattice = hook;
  }
}
