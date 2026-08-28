"use client";

import { useEffect } from "react";

type Seg = { dwell?: number; hop?: [number, number]; len: number };
type SegPx = { seg: Seg; start: number; len: number };
type StrokeDef = { t: number; dx: number; dz: number; w: number; em?: boolean };
type CamState = {
  x: number;
  y: number;
  z: number;
  rot: number;
  active: number;
  dwell: number;
  t: number;
};

export default function FacetEngine() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;

    const viewport = document.getElementById("viewport");
    const world = document.getElementById("world");
    const spacer = document.getElementById("spacer");
    const sections = ["home", "about", "projects", "contact"].map((id) =>
      document.getElementById(id)
    ) as HTMLElement[];
    const strokes = Array.from(
      document.querySelectorAll<HTMLElement>(".wstroke")
    );
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".pcard"));
    const ghost = document.getElementById("ghost");
    const specEl = document.getElementById("spec");
    const bayEl = document.getElementById("bayname");
    const ticksEl = document.getElementById("ticks");
    const hudN = document.getElementById("hud-n");
    const hudStop = document.getElementById("hud-stop");
    const hudLap = document.getElementById("hud-lap");
    const navBtns = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".hud-nav button")
    );

    if (
      !viewport ||
      !world ||
      !spacer ||
      !ghost ||
      !specEl ||
      !bayEl ||
      !ticksEl ||
      !hudN ||
      !hudStop ||
      !hudLap ||
      sections.some((s) => !s)
    ) {
      return () => {
        root.classList.remove("js");
      };
    }

    const STOP_NAMES = ["Home", "About", "Projects", "Contact"];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const BAYS = [
      { name: "Web", start: 0 },
      { name: "AI", start: 4 },
      { name: "Games", start: 7 }
    ];
    const N = cards.length;

    /* segments of the lap, lengths in vh */
    const SEGS: Seg[] = [
      { dwell: 0, len: 70 },
      { hop: [0, 1], len: 95 },
      { dwell: 1, len: 110 },
      { hop: [1, 2], len: 95 },
      { dwell: 2, len: 520 },
      { hop: [2, 3], len: 95 },
      { dwell: 3, len: 105 }
    ];

    /* world strokes: path position t (0..4 wraps), lateral x offset, z offset, width, emerald flag */
    const STROKE_DEFS: StrokeDef[] = [
      { t: 0.5, dx: -160, dz: -120, w: 70 },
      { t: 0.5, dx: 360, dz: 80, w: 10, em: true },
      { t: 1.5, dx: -80, dz: -160, w: 56 },
      { t: 2.5, dx: 120, dz: -90, w: 64 },
      { t: 3.3, dx: -140, dz: 60, w: 8, em: true },
      { t: 3.6, dx: 80, dz: -140, w: 48 }
    ];

    let mode3d = false;
    let stops: { x: number; y: number; z: number }[] = [];
    let segPx: SegPx[] = [];
    let totalPx = 0;
    let STEP = 600;
    let running = false;
    let cam = { x: 0, y: 0, z: 0, rot: 0 };
    let activeStop = 0;
    let stripF = 0;
    let lastSpec = -1;
    let lastBay = "";
    let lastLap = -1;
    let lastActive = -1;
    let rafId = 0;

    function clamp(v: number, a: number, b: number) {
      return v < a ? a : v > b ? b : v;
    }
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }
    function smooth(t: number) {
      return t * t * (3 - 2 * t);
    }

    function bayOf(i: number) {
      return i < 4 ? "Web" : i < 7 ? "AI" : "Games";
    }

    function pathPos(t: number) {
      const i = Math.floor(t) % 4,
        j = (i + 1) % 4,
        u = t - Math.floor(t);
      const A = stops[i],
        B = stops[j];
      return { x: lerp(A.x, B.x, u), y: lerp(A.y, B.y, u), z: lerp(A.z, B.z, u) };
    }

    function measure() {
      const W = innerWidth,
        H = innerHeight;
      stops = [
        { x: 0, y: 0, z: 0 },
        { x: 1.35 * W, y: -0.85 * H, z: -0.5 * W },
        { x: 2.7 * W, y: 0, z: -1.0 * W },
        { x: 1.35 * W, y: 0.85 * H, z: -0.5 * W }
      ];
      sections.forEach(function (s, i) {
        s.style.setProperty("--sx", stops[i].x + "px");
        s.style.setProperty("--sy", stops[i].y + "px");
        s.style.setProperty("--sz", stops[i].z + "px");
      });
      strokes.forEach(function (el, k) {
        const d = STROKE_DEFS[k];
        const p = pathPos(d.t);
        el.style.width = d.w + "px";
        el.style.background = d.em ? "var(--em-deep)" : "var(--ink-1)";
        el.style.transform =
          "translate(-50%, -50%) translate3d(" +
          (p.x + d.dx) +
          "px," +
          p.y * 0.4 +
          "px," +
          (p.z + d.dz) +
          "px) skewX(-30deg)";
      });
      segPx = [];
      totalPx = 0;
      SEGS.forEach(function (seg) {
        const L = (seg.len / 100) * H;
        segPx.push({ seg: seg, start: totalPx, len: L });
        totalPx += L;
      });
      spacer!.style.height = totalPx + H + "px";
      STEP = (cards[0] ? cards[0].offsetWidth : 480) + 90;
    }

    function cameraAt(s: number): CamState {
      s = clamp(s, 0, totalPx - 1);
      for (let k = 0; k < segPx.length; k++) {
        const e = segPx[k];
        if (s <= e.start + e.len || k === segPx.length - 1) {
          const t = clamp((s - e.start) / e.len, 0, 1);
          if (e.seg.dwell !== undefined) {
            const st = stops[e.seg.dwell];
            return {
              x: st.x,
              y: st.y,
              z: st.z,
              rot: 0,
              active: e.seg.dwell,
              dwell: e.seg.dwell,
              t: t
            };
          }
          const A = stops[e.seg.hop![0]],
            B = stops[e.seg.hop![1]];
          const u = smooth(t);
          const pull = Math.sin(u * Math.PI) * 0.45 * innerWidth;
          const sw = Math.sin(u * Math.PI) * 6 * (B.x - A.x >= 0 ? 1 : -1);
          return {
            x: lerp(A.x, B.x, u),
            y: lerp(A.y, B.y, u),
            z: lerp(A.z, B.z, u) + pull,
            rot: sw,
            active: t < 0.5 ? e.seg.hop![0] : e.seg.hop![1],
            dwell: -1,
            t: t
          };
        }
      }
      /* unreachable while segPx is populated (measure() always runs first) */
      return { x: 0, y: 0, z: 0, rot: 0, active: 0, dwell: -1, t: 0 };
    }

    function stripProgressAt(s: number) {
      let d2: SegPx | undefined;
      segPx.forEach(function (e) {
        if (e.seg.dwell === 2) d2 = e;
      });
      if (!d2) return 0;
      return clamp((s - d2.start) / d2.len, 0, 1);
    }

    function updateStrip() {
      const f = stripF * (N - 1);
      const spec = Math.round(f);
      for (let i = 0; i < N; i++) {
        const o = i - f;
        const ao = Math.abs(o);
        cards[i].style.transform =
          "translate(-50%, -50%) translate3d(" +
          o * STEP +
          "px," +
          -o * STEP * 0.16 +
          "px," +
          -ao * 150 +
          "px)";
        cards[i].style.opacity = String(
          ao < 0.5 ? 1 : clamp(0.55 - ao * 0.07, 0.15, 0.5)
        );
        cards[i].style.pointerEvents = ao < 0.5 ? "auto" : "none";
        if (ao < 0.5) cards[i].removeAttribute("inert");
        else cards[i].setAttribute("inert", "");
      }
      if (spec !== lastSpec) {
        lastSpec = spec;
        specEl!.textContent = String(spec + 1).padStart(2, "0");
        const b = bayOf(spec);
        if (b !== lastBay) {
          lastBay = b;
          bayEl!.textContent = b;
          ghost!.textContent = b.toUpperCase();
        }
        const ts = ticksEl!.children;
        for (let k = 0; k < ts.length; k++) ts[k].classList.toggle("on", k === spec);
      }
    }

    function updateHud(c: CamState, s: number) {
      if (c.active !== lastActive) {
        lastActive = c.active;
        activeStop = c.active;
        hudN!.textContent = "0" + c.active;
        hudStop!.textContent = STOP_NAMES[c.active];
        navBtns.forEach(function (b, i) {
          b.classList.toggle("on", i === c.active);
        });
        sections.forEach(function (sec, i) {
          if (i === c.active) sec.removeAttribute("inert");
          else sec.setAttribute("inert", "");
        });
      }
      const lap = Math.round((s / totalPx) * 100);
      if (lap !== lastLap) {
        lastLap = lap;
        hudLap!.textContent = String(lap).padStart(3, "0");
      }
    }

    function frame() {
      if (!running) return;
      const s = scrollY;
      const c = cameraAt(s);
      const k = 0.16;
      cam.x += (c.x - cam.x) * k;
      cam.y += (c.y - cam.y) * k;
      cam.z += (c.z - cam.z) * k;
      cam.rot += (c.rot - cam.rot) * k;
      world!.style.transform =
        "rotateY(" +
        cam.rot +
        "deg) translate3d(" +
        -cam.x +
        "px," +
        -cam.y +
        "px," +
        -cam.z +
        "px)";
      const W = innerWidth,
        H = innerHeight;
      sections.forEach(function (sec, i) {
        const st = stops[i];
        const d = Math.hypot(
          (st.x - cam.x) / W,
          (st.y - cam.y) / H,
          (st.z - cam.z) / W
        );
        sec.style.opacity = String(clamp(1.15 - d * 0.55, 0.2, 1));
      });
      const target = stripProgressAt(s);
      stripF += (target - stripF) * 0.14;
      if (Math.abs(target - stripF) < 0.0005) stripF = target;
      updateStrip();
      updateHud(c, s);
      rafId = requestAnimationFrame(frame);
    }

    function scrollTargetFor(stop: number) {
      for (let k = 0; k < segPx.length; k++) {
        if (segPx[k].seg.dwell === stop) {
          return segPx[k].start + (stop === 0 ? 0 : 2);
        }
      }
      return 0;
    }

    function enter3d() {
      root.classList.add("mode-3d");
      measure();
      const s = scrollTargetFor(activeStop);
      scrollTo({ top: s, behavior: "instant" });
      const c = cameraAt(s);
      cam = { x: c.x, y: c.y, z: c.z, rot: 0 };
      stripF = stripProgressAt(s);
      lastSpec = -1;
      lastBay = "";
      lastLap = -1;
      lastActive = -1;
      running = true;
      rafId = requestAnimationFrame(frame);
    }

    function leave3d() {
      running = false;
      root.classList.remove("mode-3d");
      world!.style.transform = "";
      sections.forEach(function (sec) {
        sec.style.opacity = "";
        sec.removeAttribute("inert");
        sec.style.removeProperty("--sx");
        sec.style.removeProperty("--sy");
        sec.style.removeProperty("--sz");
      });
      cards.forEach(function (c) {
        c.style.transform = "";
        c.style.opacity = "";
        c.style.pointerEvents = "";
        c.removeAttribute("inert");
      });
      spacer!.style.height = "";
      const target = sections[activeStop];
      rafId = requestAnimationFrame(function () {
        target.scrollIntoView({ behavior: "instant" });
      });
    }

    function setMode() {
      const want = fine && !reduce && innerWidth >= 1024 && innerHeight >= 560;
      if (want === mode3d) {
        if (mode3d) measure();
        return;
      }
      mode3d = want;
      if (want) enter3d();
      else leave3d();
    }

    /* ticks */
    const tickBtns: HTMLButtonElement[] = [];
    for (let i = 0; i < N; i++) {
      const b = document.createElement("button");
      b.setAttribute("aria-label", "Project " + (i + 1));
      b.innerHTML = "<i></i>";
      if (i === 0) b.classList.add("on");
      const idx = i;
      b.addEventListener("click", function () {
        let d2: SegPx | undefined;
        segPx.forEach(function (e) {
          if (e.seg.dwell === 2) d2 = e;
        });
        if (d2)
          scrollTo({
            top: d2.start + (idx / (N - 1)) * d2.len,
            behavior: reduce ? "auto" : "smooth"
          });
      });
      ticksEl.appendChild(b);
      tickBtns.push(b);
    }

    /* go-to buttons (hud nav, hero ctas, collab card, next lap) */
    const goHandlers: Array<[HTMLElement, (ev: Event) => void]> = [];
    Array.from(document.querySelectorAll<HTMLElement>("[data-go]")).forEach(
      function (el) {
        const handler = function (ev: Event) {
          const stop = parseInt(el.getAttribute("data-go")!, 10);
          if (mode3d) {
            ev.preventDefault();
            scrollTo({
              top: scrollTargetFor(stop),
              behavior: reduce ? "auto" : "smooth"
            });
          } else if (el.tagName === "BUTTON") {
            sections[stop].scrollIntoView({
              behavior: reduce ? "auto" : "smooth"
            });
          }
        };
        el.addEventListener("click", handler);
        goHandlers.push([el, handler]);
      }
    );

    /* track active section in flow mode (for mode switches) */
    const flowIO = new IntersectionObserver(
      function (entries) {
        if (mode3d) return;
        entries.forEach(function (e) {
          if (e.isIntersecting)
            activeStop = sections.indexOf(e.target as HTMLElement);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach(function (s) {
      flowIO.observe(s);
    });

    /* flow reveals */
    const fxIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            fxIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    Array.from(document.querySelectorAll(".fx")).forEach(function (el) {
      fxIO.observe(el);
    });

    let rt: ReturnType<typeof setTimeout> | undefined;
    const onResize = function () {
      clearTimeout(rt);
      rt = setTimeout(setMode, 120);
    };
    addEventListener("resize", onResize);

    setMode();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      clearTimeout(rt);
      removeEventListener("resize", onResize);
      goHandlers.forEach(function ([el, handler]) {
        el.removeEventListener("click", handler);
      });
      tickBtns.forEach(function (b) {
        b.remove();
      });
      flowIO.disconnect();
      fxIO.disconnect();
      /* restore any 3D-mode inline state (mirrors leave3d, without scrolling) */
      world.style.transform = "";
      sections.forEach(function (sec) {
        sec.style.opacity = "";
        sec.removeAttribute("inert");
        sec.style.removeProperty("--sx");
        sec.style.removeProperty("--sy");
        sec.style.removeProperty("--sz");
      });
      cards.forEach(function (c) {
        c.style.transform = "";
        c.style.opacity = "";
        c.style.pointerEvents = "";
        c.removeAttribute("inert");
      });
      strokes.forEach(function (el) {
        el.style.width = "";
        el.style.background = "";
        el.style.transform = "";
      });
      spacer.style.height = "";
      root.classList.remove("mode-3d");
      root.classList.remove("js");
    };
  }, []);

  return null;
}
