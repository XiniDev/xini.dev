"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle, Vec2 } from "ogl";

import { useVolumetric } from "./context";
import { fluidVertex, fluidFragment } from "./shaders/fluid";
import { FluidSim, detectFluidCaps, pickSimRes } from "./webgl/fluid-sim";

export default function Canvas({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { uniformsRef } = useVolumetric();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let renderer: Renderer;
    try {
      renderer = new Renderer({
        canvas,
        dpr,
        alpha: false,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      document.documentElement.classList.add("no-webgl");
      canvas.remove();
      return;
    }

    const gl = renderer.gl;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const minSide = Math.min(
      container.clientWidth || window.innerWidth,
      container.clientHeight || window.innerHeight
    );
    const reducedNow = uniformsRef.current.uReducedMotion > 0.5;
    const caps = detectFluidCaps(renderer);
    const useSim = !!caps && !reducedNow && !(!fine && minSide < 480);

    gl.clearColor(0.02, 0.063, 0.051, 1);

    const program = new Program(gl, {
      vertex: fluidVertex,
      fragment: (useSim ? "#define USE_FLUID\n" : "") + fluidFragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(1, 1) },
        uScroll: { value: 0 },
        uPointer: { value: new Vec2(0, 0) },
        uStir: { value: 0 },
        uPointerVel: { value: new Vec2(0, 0) },
        uClick: { value: new Vec2(0.5, 0.5) },
        uClickAge: { value: 999 },
        uReducedMotion: { value: uniformsRef.current.uReducedMotion },
        ...(useSim
          ? { tFluid: { value: null }, uFluidScale: { value: new Vec2(0.18, 0.12) } }
          : {}),
      },
    });

    if (!program.attributeLocations) {
      document.documentElement.classList.add("no-webgl");
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
      return;
    }

    const U = program.uniforms as Record<string, { value: any }>;
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let sim: FluidSim | null = null;
    if (useSim && caps) {
      try {
        sim = new FluidSim(gl, renderer, caps, pickSimRes(caps.isGL2, fine, dpr));
      } catch {
        sim = null;
      }
    }

    const resize = () => {
      renderer.setSize(
        container.clientWidth || window.innerWidth,
        container.clientHeight || window.innerHeight
      );
      U.uResolution.value.set(gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let clickStart = -10;
    const onPointerDown = (e: PointerEvent) => {
      if (uniformsRef.current.uReducedMotion > 0.5) return;
      const ux = e.clientX / window.innerWidth;
      const uyTop = e.clientY / window.innerHeight;
      if (sim) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 1.4;
        sim.addClick(ux, 1 - uyTop, Math.cos(ang) * sp, Math.sin(ang) * sp, 1.0);
      } else {
        clickStart = performance.now() / 1000;
        U.uClick.value.set(ux, uyTop);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);

    let raf = 0;
    let disposed = false;
    let visible = true;
    let onScreen = true;
    let started = 0;
    let firstFrame = true;
    let lastPx = 0;
    let lastPy = 0;
    let stir = 0;
    let velX = 0;
    let velY = 0;
    let last = performance.now();
    let firstSimFrame = true;

    const active = () => visible && onScreen && !disposed;

    const loop = (now: number) => {
      if (!active()) {
        raf = 0;
        return;
      }
      const u = uniformsRef.current;
      const reduced = u.uReducedMotion > 0.5;

      let dt = (now - last) / 1000;
      last = now;
      if (firstSimFrame) {
        firstSimFrame = false;
        dt = 1 / 60;
      }
      dt = Math.min(dt, 1 / 30);

      if (!started) started = now;
      const time = reduced ? 0 : (now - started) / 1000;

      const dx = u.uPointerX - lastPx;
      const dy = u.uPointerY - lastPy;
      lastPx = u.uPointerX;
      lastPy = u.uPointerY;

      const speed = Math.min(Math.hypot(dx, dy) * 6, 1);
      stir = reduced ? 0 : speed > stir ? speed : stir * 0.92 + speed * 0.08;

      const K = 8.0;
      let tvx = dx * K;
      let tvy = -dy * K;
      const tvLen = Math.hypot(tvx, tvy);
      if (tvLen > 1) {
        tvx /= tvLen;
        tvy /= tvLen;
      }
      velX = reduced ? 0 : velX * 0.85 + tvx * 0.15;
      velY = reduced ? 0 : velY * 0.85 + tvy * 0.15;

      if (sim && !reduced) {
        try {
          const mx = (u.uPointerX + 1) * 0.5;
          const my = 1 - (u.uPointerY + 1) * 0.5;
          const vx = (dx * 0.5) / Math.max(dt, 1e-3);
          const vy = (-dy * 0.5) / Math.max(dt, 1e-3);
          const aspect =
            (gl.drawingBufferWidth || 1) / (gl.drawingBufferHeight || 1);
          sim.step(renderer, dt, time, mx, my, vx, vy, aspect);
          U.tFluid.value = sim.texture;
        } catch {
          sim?.dispose();
          sim = null;
          if (U.tFluid) U.tFluid.value = null;
        }
      }

      U.uTime.value = time;
      U.uScroll.value = u.uScroll;
      U.uPointer.value.set(u.uPointerX, u.uPointerY);
      U.uStir.value = stir;
      U.uPointerVel.value.set(velX, velY);
      if (!sim) U.uClickAge.value = reduced ? 999 : now / 1000 - clickStart;
      U.uReducedMotion.value = u.uReducedMotion;
      renderer.render({ scene: mesh });
      if (firstFrame) {
        firstFrame = false;
        onReady?.();
      }
      raf = requestAnimationFrame(loop);
    };

    const resume = () => {
      if (active() && !raf) {
        last = performance.now();
        firstSimFrame = true;
        raf = requestAnimationFrame(loop);
      }
    };

    raf = requestAnimationFrame(loop);

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) resume();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver((entries) => {
      onScreen = entries[0]?.isIntersecting ?? true;
      if (onScreen) resume();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(container);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      disposed = true;
      cancelAnimationFrame(raf);
      document.documentElement.classList.add("no-webgl");
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      sim?.dispose();
      program.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [uniformsRef, onReady]);

  return <div ref={containerRef} className="h-full w-full" />;
}
