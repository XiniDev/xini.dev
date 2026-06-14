"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";

export type ChamberId = "hero" | "about" | "projects" | "contact";

type ChamberRef = RefObject<HTMLElement | null>;

export interface VolumetricUniforms {
  uTime: number;
  uScroll: number;
  uPointerX: number;
  uPointerY: number;
  uReducedMotion: number;
}

interface VolumetricContextValue {
  scrollYProgress: MotionValue<number>;
  camera: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reducedMotion: boolean;
  progressionOn: boolean;
  registerChamber: (id: ChamberId, ref: ChamberRef) => () => void;
  activeChamber: ChamberId;
  uniformsRef: RefObject<VolumetricUniforms>;
}

const VolumetricContext = createContext<VolumetricContextValue | null>(null);

export function useVolumetric(): VolumetricContextValue {
  const ctx = useContext(VolumetricContext);
  if (!ctx) {
    throw new Error("useVolumetric must be used within <VolumetricProvider>");
  }
  return ctx;
}

export function VolumetricProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion() ?? false;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const progressionOn = mounted && !reducedMotion;

  const { scrollYProgress } = useScroll();
  const camera = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  });

  const pointerXRaw = useMotionValue(0);
  const pointerYRaw = useMotionValue(0);
  const pointerX = useSpring(pointerXRaw, { stiffness: 120, damping: 20 });
  const pointerY = useSpring(pointerYRaw, { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (!progressionOn) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      pointerXRaw.set((e.clientX / window.innerWidth) * 2 - 1);
      pointerYRaw.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [progressionOn, pointerXRaw, pointerYRaw]);

  const uniformsRef = useRef<VolumetricUniforms>({
    uTime: 0,
    uScroll: 0,
    uPointerX: 0,
    uPointerY: 0,
    uReducedMotion: reducedMotion ? 1 : 0,
  });
  useMotionValueEvent(camera, "change", (v) => {
    uniformsRef.current.uScroll = v;
  });
  useMotionValueEvent(pointerX, "change", (v) => {
    uniformsRef.current.uPointerX = v;
  });
  useMotionValueEvent(pointerY, "change", (v) => {
    uniformsRef.current.uPointerY = v;
  });
  useEffect(() => {
    uniformsRef.current.uReducedMotion = reducedMotion ? 1 : 0;
  }, [reducedMotion]);

  const chambersRef = useRef<{ id: ChamberId; ref: ChamberRef }[]>([]);
  const [activeChamber, setActiveChamber] = useState<ChamberId>("hero");
  const activeRef = useRef<ChamberId>("hero");

  const registerChamber = useCallback((id: ChamberId, ref: ChamberRef) => {
    chambersRef.current = [
      ...chambersRef.current.filter((c) => c.id !== id),
      { id, ref },
    ];
    return () => {
      chambersRef.current = chambersRef.current.filter((c) => c.id !== id);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", () => {
    const mid = window.innerHeight / 2;
    for (const c of chambersRef.current) {
      const el = c.ref.current;
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) {
        if (activeRef.current !== c.id) {
          activeRef.current = c.id;
          setActiveChamber(c.id);
        }
        return;
      }
    }
  });

  const value = useMemo<VolumetricContextValue>(
    () => ({
      scrollYProgress,
      camera,
      pointerX,
      pointerY,
      reducedMotion,
      progressionOn,
      registerChamber,
      activeChamber,
      uniformsRef,
    }),
    [
      scrollYProgress,
      camera,
      pointerX,
      pointerY,
      reducedMotion,
      progressionOn,
      registerChamber,
      activeChamber,
    ]
  );

  return (
    <VolumetricContext.Provider value={value}>
      {children}
    </VolumetricContext.Provider>
  );
}
