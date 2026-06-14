"use client";

import { type ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";

import { useVolumetric } from "@/components/volumetric/context";

const REACH = 0.82;

function Hi({ children }: { children: ReactNode }) {
  return <span className="text-bio-emerald">{children}</span>;
}

interface NodeDef {
  x: number;
  y: number;
  align: "left" | "right" | "center";
  label: string;
  body: ReactNode;
  href?: string;
}

const NODES: NodeDef[] = [
  {
    x: 17,
    y: 28,
    align: "left",
    label: "PROFILE",
    body: (
      <>
        Hey there! I&apos;m <Hi>Xini</Hi> — deeply passionate about <Hi>coding</Hi>,{" "}
        <Hi>AI</Hi> &amp; <Hi>game development</Hi>.
      </>
    ),
  },
  {
    x: 83,
    y: 28,
    align: "right",
    label: "ETHOS",
    body: (
      <>
        Turning my wildest imaginations into <Hi>reality with code</Hi>.
      </>
    ),
  },
  {
    x: 16,
    y: 72,
    align: "left",
    label: "EDUCATION",
    body: (
      <>
        <Hi>BSc Computer Science</Hi> · Warwick
        <br />
        <Hi>MSc Artificial Intelligence</Hi> · St Andrews
      </>
    ),
  },
  {
    x: 84,
    y: 72,
    align: "right",
    label: "BEYOND",
    body: (
      <>
        Into <Hi>games, art &amp; world-building</Hi> — always chasing the latest{" "}
        <Hi>tech &amp; design</Hi>.
      </>
    ),
  },
  {
    x: 50,
    y: 90,
    align: "center",
    label: "COLLAB",
    href: "#contact",
    body: (
      <>
        Excited to create something awesome? <Hi>Let&apos;s team up →</Hi>
      </>
    ),
  },
];

function tip(v: number) {
  return 50 + (v - 50) * REACH;
}

function NodeCard({
  node,
  scale,
  opacity,
  borderColor,
  boxShadow,
}: {
  node: NodeDef;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  borderColor: MotionValue<string>;
  boxShadow: MotionValue<string>;
}) {
  const content = (
    <>
      <span className="mb-1 block font-mono text-[10px] tracking-[0.3em] text-bio-emerald">
        {node.label}
      </span>
      <p className="text-sm leading-snug text-text-100">{node.body}</p>
    </>
  );
  const cls = `block w-60 rounded-xl border glass px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bio-emerald ${
    node.align === "right"
      ? "text-right"
      : node.align === "center"
        ? "text-center"
        : "text-left"
  }`;
  const inner = node.href ? (
    <motion.a
      href={node.href}
      className={cls}
      style={{ borderColor, boxShadow }}
      whileHover={{ scale: 1.05 }}
    >
      {content}
    </motion.a>
  ) : (
    <motion.div
      className={cls}
      style={{ borderColor, boxShadow }}
      whileHover={{ scale: 1.05 }}
    >
      {content}
    </motion.div>
  );

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <motion.div style={{ scale, opacity }}>{inner}</motion.div>
    </div>
  );
}

function NodeItem({
  node,
  index,
  progress,
}: {
  node: NodeDef;
  index: number;
  progress: MotionValue<number>;
}) {
  const center = (index + 0.5) / NODES.length;
  const span = 1 / NODES.length;
  const focus = useTransform(progress, [center - span, center, center + span], [0, 1, 0]);

  const x2 = tip(node.x);
  const y2 = tip(node.y);

  const lineOpacity = useTransform(focus, [0, 1], [0.16, 0.85]);
  const lineWidth = useTransform(focus, [0, 1], [1, 2]);
  const dotScale = useTransform(focus, [0, 1], [1, 1.9]);
  const dotShadow = useTransform(focus, [0, 1], [
    "0 0 6px 0px rgba(16,185,129,0.5)",
    "0 0 16px 3px rgba(16,185,129,0.95)",
  ]);
  const cardScale = useTransform(focus, [0, 1], [1, 1.1]);
  const cardOpacity = useTransform(focus, [0, 1], [0.5, 1]);
  const cardBorder = useTransform(focus, [0, 1], [
    "rgba(255,255,255,0.1)",
    "rgba(16,185,129,0.55)",
  ]);
  const cardShadow = useTransform(focus, [0, 1], [
    "0 0 0px 0px rgba(16,185,129,0)",
    "0 0 28px 0px rgba(16,185,129,0.28)",
  ]);

  return (
    <>
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.line
          x1="50"
          y1="50"
          x2={x2}
          y2={y2}
          stroke="#10b981"
          strokeWidth={lineWidth}
          strokeOpacity={lineOpacity}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <motion.span
        aria-hidden
        className="absolute size-2 rounded-full bg-bio-emerald"
        style={{
          left: `${x2}%`,
          top: `${y2}%`,
          x: "-50%",
          y: "-50%",
          scale: dotScale,
          boxShadow: dotShadow,
        }}
      />

      <NodeCard
        node={node}
        scale={cardScale}
        opacity={cardOpacity}
        borderColor={cardBorder}
        boxShadow={cardShadow}
      />
    </>
  );
}

function RadialDiagram({ progress }: { progress: MotionValue<number> }) {
  const { pointerX, pointerY } = useVolumetric();
  const rotateY = useTransform(pointerX, [-1, 1], [-16, 16]);
  const rotateX = useTransform(pointerY, [-1, 1], [12, -12]);

  return (
    <div className="absolute inset-0 hidden md:block">
      {NODES.map((n, i) => (
        <NodeItem key={n.label} node={n} index={i} progress={progress} />
      ))}

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bio-emerald/20"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[12rem] font-bold leading-none text-white/[0.04]"
          >
            01
          </span>
          <motion.div
            role="img"
            aria-label="Xini logo"
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1000,
              backgroundImage: "url(/icon.svg)",
            }}
            whileHover={{ scale: 1.08 }}
            className="relative z-10 size-32 bg-contain bg-center bg-no-repeat drop-shadow-[0_0_28px_rgba(16,185,129,0.5)]"
          />
        </div>
        <span className="font-mono text-xs tracking-[0.3em] text-text-300">
          DESIGNER · DEVELOPER · CREATOR
        </span>
      </div>
    </div>
  );
}

function Stacked() {
  return (
    <div className="mx-auto w-full max-w-md space-y-5 py-10">
      <div className="flex flex-col items-center gap-3">
        <div
          aria-label="Xini logo"
          role="img"
          className="size-24 bg-contain bg-center bg-no-repeat drop-shadow-[0_0_20px_rgba(16,185,129,0.45)]"
          style={{ backgroundImage: "url(/icon.svg)" }}
        />
        <span className="font-mono text-xs tracking-[0.3em] text-text-300">
          DESIGNER · DEVELOPER · CREATOR
        </span>
      </div>
      {NODES.map((n) =>
        n.href ? (
          <a
            key={n.label}
            href={n.href}
            className="block rounded-xl border border-white/10 glass px-4 py-3"
          >
            <span className="mb-1 block font-mono text-[10px] tracking-[0.3em] text-bio-emerald">
              {n.label}
            </span>
            <p className="text-sm leading-snug text-text-100">{n.body}</p>
          </a>
        ) : (
          <div
            key={n.label}
            className="rounded-xl border border-white/10 glass px-4 py-3"
          >
            <span className="mb-1 block font-mono text-[10px] tracking-[0.3em] text-bio-emerald">
              {n.label}
            </span>
            <p className="text-sm leading-snug text-text-100">{n.body}</p>
          </div>
        )
      )}
    </div>
  );
}

export function AboutScene({ progress }: { progress: MotionValue<number> }) {
  const { reducedMotion } = useVolumetric();

  if (reducedMotion) {
    return (
      <div className="flex flex-1 items-center justify-center overflow-hidden px-6">
        <Stacked />
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6">
      <RadialDiagram progress={progress} />
      <div className="w-full md:hidden">
        <Stacked />
      </div>
    </div>
  );
}
