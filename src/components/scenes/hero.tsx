"use client";

import { type CSSProperties } from "react";
import { motion, useTransform, type Variants } from "framer-motion";

import { useVolumetric } from "@/components/volumetric/context";
import { useCoarsePointer } from "@/lib/use-coarse-pointer";
import { HeroCTA } from "./hero-cta";

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const WORDMARK =
  "font-display font-semibold leading-none tracking-tight text-[clamp(4rem,18vw,11rem)]";

const WORDMARK_FILL: CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, var(--bio-emerald) 0%, var(--bio-teal) 52%, var(--bio-emerald) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

function Dot() {
  return (
    <span
      aria-hidden
      className="mx-1 inline-block size-[5px] -translate-y-[3px] rounded-full align-middle bg-bio-emerald shadow-[0_0_8px_var(--bio-emerald)] sm:mx-2"
    />
  );
}

export function HeroScene() {
  const { pointerX, pointerY, reducedMotion } = useVolumetric();
  const coarse = useCoarsePointer();

  const g = !reducedMotion && !coarse ? 1 : 0;
  const wordX = useTransform(pointerX, [-1, 1], [-18 * g, 18 * g]);
  const wordY = useTransform(pointerY, [-1, 1], [-12 * g, 12 * g]);
  const wordRotY = useTransform(pointerX, [-1, 1], [-8 * g, 8 * g]);
  const wordRotX = useTransform(pointerY, [-1, 1], [6 * g, -6 * g]);
  const tagX = useTransform(pointerX, [-1, 1], [-9 * g, 9 * g]);
  const tagY = useTransform(pointerY, [-1, 1], [-6 * g, 6 * g]);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reducedMotion ? 0 : 0.2,
        staggerChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };
  const letter: Variants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: "45%" },
    show: {
      opacity: 1,
      y: "0%",
      transition: { duration: reducedMotion ? 0.3 : 0.9, ease: REVEAL_EASE },
    },
  };
  const rise: Variants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: REVEAL_EASE },
    },
  };

  return (
    <div className="flex flex-1 select-none flex-col items-center justify-center px-6 text-center">
      <motion.h1
        aria-label="XINI"
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          x: wordX,
          y: wordY,
          rotateX: wordRotX,
          rotateY: wordRotY,
          transformPerspective: 1000,
        }}
        className={"flex " + WORDMARK}
      >
        {"XINI".split("").map((c, i) => (
          <motion.span
            key={i}
            aria-hidden
            variants={letter}
            style={WORDMARK_FILL}
            className="inline-block drop-shadow-[0_0_30px_rgba(16,185,129,0.45)]"
          >
            {c}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.p
          variants={rise}
          style={{ x: tagX, y: tagY }}
          className="mt-6 mb-10 font-mono text-sm tracking-[0.06em] text-text-100 sm:text-xl sm:tracking-[0.2em]"
        >
          Designer <Dot /> Developer <Dot /> Creator
        </motion.p>
        <motion.div variants={rise} className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <HeroCTA href="#projects" variant="plasma">
            View Projects
          </HeroCTA>
          <HeroCTA href="#contact" variant="frost">
            Contact Me
          </HeroCTA>
        </motion.div>
      </motion.div>
    </div>
  );
}
