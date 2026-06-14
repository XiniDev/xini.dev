"use client";

import {
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type SVGProps,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

import { GithubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { XTwitter } from "@/components/icons/x-twitter";
import { Button } from "@/components/ui/button";
import { useVolumetric } from "@/components/volumetric/context";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface ContactDef {
  name: string;
  Icon: IconComponent;
  link: string;
  x: number;
  y: number;
}

const contacts: ContactDef[] = [
  { name: "Email", Icon: Mail, link: "mailto:xini@saltancy.com", x: 20, y: 28 },
  { name: "GitHub", Icon: GithubIcon, link: "https://github.com/XiniDev", x: 80, y: 28 },
  {
    name: "LinkedIn",
    Icon: LinkedinIcon,
    link: "https://www.linkedin.com/in/xinidev/",
    x: 20,
    y: 72,
  },
  { name: "Twitter", Icon: XTwitter, link: "https://x.com/XiniDev", x: 80, y: 72 },
];

const WORDMARK_FILL: CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, var(--bio-emerald) 0%, var(--bio-teal) 52%, var(--bio-emerald) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

function ContactNode({
  contact,
  reduced,
  mode,
}: {
  contact: ContactDef;
  reduced: boolean;
  mode: "radial" | "grid";
}) {
  const { name, Icon, link, x, y } = contact;
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 15 });
  const sy = useSpring(my, { stiffness: 150, damping: 15 });
  const [hover, setHover] = useState(false);
  const isMail = link.startsWith("mailto");

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const orb = (
    <motion.a
      ref={ref}
      href={link}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        reset();
        setHover(false);
      }}
      style={reduced ? undefined : { x: sx, y: sy }}
      whileHover={reduced ? undefined : { scale: 1.06 }}
      className="group relative flex size-24 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/10 glass transition-colors hover:border-bio-emerald/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-emerald md:size-28"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at center, rgba(16,185,129,0.3), transparent 70%)",
        }}
      />
      <Icon className="size-8 text-bio-emerald drop-shadow-[0_0_14px_rgba(16,185,129,0.65)] transition-transform duration-300 group-hover:scale-110 md:size-9" />
      <span className="text-xs font-medium text-text-100 transition-colors group-hover:text-bio-emerald md:text-sm">
        {name}
      </span>
    </motion.a>
  );

  if (mode === "grid") return orb;

  return (
    <>
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          x1="50"
          y1="50"
          x2={x}
          y2={y}
          stroke="#10b981"
          strokeOpacity={hover ? 0.8 : 0.22}
          strokeWidth={hover ? 1.8 : 1}
          strokeDasharray="2 3"
          vectorEffect="non-scaling-stroke"
          className={reduced ? "" : "beam-flow"}
          style={{ transition: "stroke-opacity 0.3s ease, stroke-width 0.3s ease" }}
        />
      </svg>
      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        {orb}
      </div>
    </>
  );
}

function SaltancyCore({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.2), transparent 62%)",
        }}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-1/2 size-80 rounded-full border border-dashed border-bio-emerald/25 ${
          reduced ? "" : "core-ring-spin"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bio-emerald/15"
      />

      <div className="relative flex w-72 flex-col items-center gap-3 rounded-2xl border border-bio-emerald/30 glass-strong px-7 py-7 text-center shadow-[0_0_60px_-14px_rgba(16,185,129,0.55)] md:w-80">
        <span className="font-mono text-[10px] tracking-[0.35em] text-bio-emerald">
          CONSULTANCY
        </span>
        <span
          className="font-display text-4xl font-semibold leading-none md:text-5xl"
          style={WORDMARK_FILL}
        >
          Saltancy
        </span>
        <p className="text-sm leading-relaxed text-text-300">
          End-to-end technical consultancy &amp; custom software. Need a team to
          build it? Let&apos;s team up.
        </p>
        <Button
          asChild
          variant="plasma"
          size="lg"
          className="mt-1 h-11 gap-2 rounded-xl px-6"
        >
          <a
            href="https://www.saltancy.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Saltancy
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export function ContactScene() {
  const { pointerX, pointerY, reducedMotion } = useVolumetric();
  const g = reducedMotion ? 0 : 1;
  const rotateY = useTransform(pointerX, [-1, 1], [-7 * g, 7 * g]);
  const rotateX = useTransform(pointerY, [-1, 1], [5 * g, -5 * g]);

  return (
    <div className="relative isolate flex flex-1 flex-col overflow-hidden px-6">
      <span
        aria-hidden
        className="pointer-events-none absolute left-[5%] top-[8%] -z-10 select-none font-display text-[20vw] font-bold leading-none text-white/[0.03]"
      >
        03
      </span>

      <h2 className="flex items-center justify-center gap-4 px-8 pt-16 font-mono text-xs font-normal tracking-[0.4em] text-text-300 md:pt-20">
        <span className="h-px w-10 bg-bio-emerald/30" />
        LET&apos;S TEAM UP
        <span className="h-px w-10 bg-bio-emerald/30" />
      </h2>

      <div className="relative flex flex-1 items-center justify-center">
        <div className="relative hidden aspect-[16/10] w-full max-w-4xl [perspective:1200px] md:block">
          <motion.div
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={{ rotateX, rotateY }}
          >
            {contacts.map((c) => (
              <ContactNode key={c.name} contact={c} reduced={reducedMotion} mode="radial" />
            ))}
            <div
              className="absolute left-1/2 top-1/2 z-20"
              style={{ transform: "translate(-50%, -50%) translateZ(60px)" }}
            >
              <SaltancyCore reduced={reducedMotion} />
            </div>
          </motion.div>
        </div>

        <div className="flex w-full max-w-md flex-col items-center gap-10 py-6 md:hidden">
          <SaltancyCore reduced={reducedMotion} />
          <div className="grid w-full grid-cols-2 gap-4">
            {contacts.map((c) => (
              <ContactNode key={c.name} contact={c} reduced={reducedMotion} mode="grid" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 pb-10 font-mono text-xs tracking-[0.35em] text-text-500">
        <span className="h-px w-8 bg-text-500/40" />
        END OF TRANSMISSION
        <span className="h-px w-8 bg-text-500/40" />
      </div>
    </div>
  );
}
