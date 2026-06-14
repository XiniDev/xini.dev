"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useScroll, type MotionValue } from "framer-motion";

import { useVolumetric, type ChamberId } from "./context";
import { assertSticky } from "./assert-sticky";

interface SceneRenderProps {
  progress: MotionValue<number>;
}

interface SceneProps {
  id: ChamberId;
  budgetVh?: number;
  className?: string;
  children: ReactNode | ((p: SceneRenderProps) => ReactNode);
}

export function Scene({ id, budgetVh = 250, className, children }: SceneProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { registerChamber } = useVolumetric();

  useEffect(() => registerChamber(id, wrapperRef), [id, registerChamber]);
  useEffect(() => assertSticky(stageRef.current), []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={wrapperRef}
      id={id}
      className={`scene ${className ?? ""}`}
      style={{ "--scene-budget": `${budgetVh}svh` } as CSSProperties}
    >
      <div ref={stageRef} className="scene-stage">
        {typeof children === "function"
          ? (children as (p: SceneRenderProps) => ReactNode)({
              progress: scrollYProgress,
            })
          : children}
      </div>
    </section>
  );
}
