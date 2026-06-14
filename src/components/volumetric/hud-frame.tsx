"use client";

import Link from "next/link";
import { motion, useTransform } from "framer-motion";

import { useVolumetric, type ChamberId } from "./context";

const CHAMBERS: { id: ChamberId; n: string; label: string }[] = [
  { id: "hero", n: "00", label: "IGNITION" },
  { id: "about", n: "01", label: "ABOUT" },
  { id: "projects", n: "02", label: "PROJECTS" },
  { id: "contact", n: "03", label: "CONTACT" },
];

export function HudFrame() {
  const { scrollYProgress, activeChamber } = useVolumetric();
  const depth = useTransform(scrollYProgress, (v) =>
    Math.round(v * 100)
      .toString()
      .padStart(3, "0")
  );
  const headTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const active = CHAMBERS.find((c) => c.id === activeChamber) ?? CHAMBERS[0];

  return (
    <div className="pointer-events-none fixed inset-0 z-40 font-mono text-[10px] tracking-[0.3em] text-text-300">
      <span aria-hidden className="absolute left-4 top-4 h-4 w-4 border-l border-t border-bio-emerald/40" />
      <span aria-hidden className="absolute right-4 top-4 h-4 w-4 border-r border-t border-bio-emerald/40" />
      <span aria-hidden className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-bio-emerald/40" />
      <span aria-hidden className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-bio-emerald/40" />

      <div aria-hidden className="absolute left-8 top-8 flex items-baseline gap-2">
        <span className="text-bio-emerald">{active.n}</span>
        <span>{active.label}</span>
      </div>

      <div aria-hidden className="absolute bottom-8 left-8 flex items-baseline gap-2">
        <span className="text-text-500">DEPTH</span>
        <motion.span className="text-bio-emerald">{depth}</motion.span>
      </div>

      <nav
        aria-label="Chamber navigation"
        className="pointer-events-auto absolute right-7 top-1/2 flex -translate-y-1/2 flex-col items-center gap-6"
      >
        <div aria-hidden className="relative h-44 w-[3px] rounded-full bg-white/10">
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top rounded-full"
            style={{
              scaleY: scrollYProgress,
              backgroundImage:
                "linear-gradient(to bottom, var(--bio-emerald), var(--bio-teal))",
            }}
          />
          <motion.span
            className="absolute left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bio-emerald shadow-[0_0_12px_3px_rgba(16,185,129,0.95)]"
            style={{ top: headTop }}
          />
        </div>
        <ul className="flex flex-col gap-4">
          {CHAMBERS.map((c) => (
            <li key={c.id}>
              <Link
                href={`#${c.id}`}
                aria-label={c.label}
                className={`block size-2 rounded-full ring-1 transition-all ${
                  activeChamber === c.id
                    ? "scale-125 bg-bio-emerald ring-bio-emerald shadow-[0_0_14px_2px_rgba(16,185,129,0.9)]"
                    : "bg-transparent ring-white/30 hover:ring-bio-emerald/70"
                }`}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
