"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useVolumetric } from "@/components/volumetric/context";

export function HeroCTA({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "plasma" | "frost";
  children: ReactNode;
}) {
  const { reducedMotion } = useVolumetric();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reducedMotion ? undefined : { x: sx, y: sy }}
      className="inline-block"
    >
      <Button
        asChild
        variant={variant}
        size="lg"
        className="h-12 rounded-xl px-6 text-lg sm:h-14 sm:px-8 sm:text-xl"
      >
        <a href={href}>{children}</a>
      </Button>
    </motion.div>
  );
}
