"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { GithubIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import { useVolumetric } from "@/components/volumetric/context";
import { useCoarsePointer } from "@/lib/use-coarse-pointer";

type Bay = "WEB" | "AI" | "GAMES";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  live?: boolean;
  bay: Bay;
}

const projects: Project[] = [
  {
    title: "Saltancy Website",
    description:
      "Saltancy is my consultancy company that provides comprehensive, end-to-end technical consultancy and custom software development tailored to specific business requirements. Our core engineering services encompass full-stack web application development, cross-platform mobile apps, scalable backend architecture, cloud deployment, and seamless third-party API integrations. This is Saltancy's landing page.",
    image: "/projects/saltancy-web.webp",
    link: "https://github.com/XiniDev/saltancy-web",
    bay: "WEB",
  },
  {
    title: "Vault of Excellence",
    description:
      "Vault of Excellence is a scalable commerce and tutoring platform built on Next.js and Supabase. It enables educators to bridge the gap between content and sales by providing customizable webpages. Tutors can curate instructional materials and market them through personalized storefronts, directly connecting their expertise to students.",
    image: "/projects/voe.webp",
    link: "https://voetutor.com",
    bay: "WEB",
  },
  {
    title: "WSMath",
    description:
      "WSMath is an online portfolio for an international mathematics exam strategist. Built with Next.js and Tailwind CSS, it features a sleek, responsive design and SEO optimization to attract potential clients. It also contains a custom CMS with Zero Trust login for easy content management.",
    image: "/projects/wsmath.webp",
    link: "https://www.wsmath.com/",
    bay: "WEB",
  },
  {
    title: "Notes API",
    description:
      "A secure RESTful API for managing user-specific notes with CRUD operations, following OWASP principles. MongoDB with Mongoose database for efficient data modeling and querying, containing advanced filtering features.",
    image: "/projects/notes-api.webp",
    link: "https://github.com/XiniDev/notes-api",
    bay: "WEB",
  },
  {
    title: "DBridger",
    description:
      "DBridger is a secure PyQt6 desktop gateway connecting legacy databases to Google Gemini. It acts as an autonomous agent that navigates relational schemas to answer natural language queries. By utilizing local execution, dynamic mapping, and automated PII redaction, it provides enterprise-grade conversational analytics while ensuring sensitive data remains on-device.",
    image: "/projects/dbridger.webp",
    link: "https://github.com/XiniDev/dbridger",
    bay: "AI",
  },
  {
    title: "LeadingOnes DAC",
    description:
      "An implementation of Dyna-DDQN model-based deep-RL agent to improve learning quality and sample efficiency in the LeadingOnes (1+1) RLS benchmark in Dynamic Algorithm Configuration (Biedenkapp 2022).",
    image: "/projects/lo-dac.webp",
    link: "https://github.com/XiniDev/LeadingOnesDAC",
    bay: "AI",
  },
  {
    title: "AI Search Algorithms",
    description:
      "Uninformed and informed search algorithms for solving flight-route problems on an NxN polar grid, with bidirecitonal search too.",
    image: "/projects/ai-search-algorithms.webp",
    link: "https://github.com/XiniDev/AI-Search-Algorithms",
    bay: "AI",
  },
  {
    title: "NullVector",
    description:
      "NullVector is a Processing (Java) platformer where you battle enemies and a boss named Zorp using gravity-affected projectiles. Features include smart AI, bounce damage, boss phases, friendly fire, and a full GUI with health bars and debug tools.",
    image: "/projects/nullvector.webp",
    link: "https://github.com/XiniDev/NullVector-Processing",
    bay: "GAMES",
  },
  {
    title: "Jungle Game & JunGUI",
    description:
      "A full implementation of the Jungle board game in Java, including a Swing-based GUI (JunGUI). Features multiplayer support, legal move highlighting, cultural-inspired UI design, and complete game logic with flexible OOP encapsulation.",
    image: "/projects/jungle-board-game.webp",
    link: "https://github.com/XiniDev/Jungle-Board-Game-Java",
    bay: "GAMES",
  },
  {
    title: "Overthrow Synthetica",
    description:
      "Overthrow Synthetica is a game jam demo created in collaboration with Codethulu over two weeks for the Warwick Game Dev Society. It showcases advanced game development techniques using ThreeJS and WebGL.",
    image: "/projects/overthrow-synthetica.webp",
    link: "https://github.com/BlueTentProductions/overthrow-synthetica",
    live: true,
    bay: "GAMES",
  },
  {
    title: "ECS Platformer Demo",
    description:
      "A platformer demo testing the Entity-Component-System (ECS) architecture. Developed in C++ and SDL2, it demonstrates responsive controls and flexible entity management.",
    image: "/projects/ecs-demo.webp",
    link: "https://github.com/XiniDev/Golden-Gun",
    bay: "GAMES",
  },
];

const BAYS: { n: string; name: Bay; start: number }[] = [
  { n: "01", name: "WEB", start: 0 },
  { n: "02", name: "AI", start: 4 },
  { n: "03", name: "GAMES", start: 7 },
];

const SPACING = 780;

function GithubButton() {
  return (
    <Button asChild variant="plasma" size="lg" className="h-12 gap-2 rounded-xl px-6">
      <a href="https://github.com/XiniDev" target="_blank" rel="noopener noreferrer">
        <GithubIcon className="size-5" />
        See All on GitHub
        <ArrowUpRight className="size-4" />
      </a>
    </Button>
  );
}

function ProjectCard({
  project,
  lite,
  sizes = "(max-width: 768px) 86vw, 48rem",
}: {
  project: Project;
  lite?: boolean;
  sizes?: string;
}) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block w-full overflow-hidden rounded-2xl border border-white/10 ${
        lite ? "lite-glass" : "glass"
      } transition-colors hover:border-bio-emerald/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-emerald`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-1000/70 via-transparent to-transparent" />
        {project.live && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink-1000/70 px-2.5 py-1 font-mono text-[10px] tracking-widest text-bio-emerald backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-bio-emerald" />
            LIVE
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-text-100 md:text-xl">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-300">
          {project.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-bio-emerald">
          View Project
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}

function GridFloor({ camZ }: { camZ: MotionValue<number> }) {
  const y = useTransform(camZ, (v) => (((v * 1600) % 80) + 80) % 80);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 overflow-hidden"
      style={{
        width: 2600,
        height: 2800,
        transform: "translate(-50%, -50%) translateY(380px) rotateX(81deg)",
        maskImage:
          "radial-gradient(ellipse 45% 55% at 50% 32%, #000 0%, transparent 72%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 45% 55% at 50% 32%, #000 0%, transparent 72%)",
        opacity: 0.45,
      }}
    >
      <motion.div
        className="absolute inset-[-120px]"
        style={{
          y,
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.16) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

function BayGate({
  bay,
  count,
  camZ,
}: {
  bay: (typeof BAYS)[number];
  count: number;
  camZ: MotionValue<number>;
}) {
  const d = useTransform(
    camZ,
    (v) => bay.start - Math.min(bay.start, 0.5) - v * (count - 1)
  );
  const z = useTransform(d, (v) => -v * SPACING);
  const transform = useMotionTemplate`translate(-50%, -50%) translate3d(0px, -340px, ${z}px)`;
  const opacity = useTransform(d, [-0.4, 0, 1.6, 3.2], [0, 1, 1, 0]);
  const blur = useTransform(d, [0, 3], [0, 5]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      aria-hidden
      className="absolute left-1/2 top-1/2"
      style={{ transform, opacity, filter }}
    >
      <div className="relative px-7 py-2.5">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-bio-emerald/60" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-bio-emerald/60" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-bio-emerald/60" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-bio-emerald/60" />
        <span className="whitespace-nowrap font-mono text-xs tracking-[0.4em] text-bio-emerald drop-shadow-[0_0_12px_rgba(16,185,129,0.55)]">
          BAY {bay.n} / {bay.name}
        </span>
      </div>
    </motion.div>
  );
}

function ProjectPlaque({
  project,
  index,
  count,
  camZ,
  lite,
}: {
  project: Project;
  index: number;
  count: number;
  camZ: MotionValue<number>;
  lite: boolean;
}) {
  const d = useTransform(camZ, (v) => index - v * (count - 1));
  const z = useTransform(d, (v) => -v * SPACING);
  const spread = useTransform(d, (v) => Math.min(Math.abs(v), 2.4));
  const baseOx = (index % 2 ? 1 : -1) * 380;
  const baseOy = ((index % 3) - 1) * 110;
  const ox = useTransform(spread, (s) => baseOx * s);
  const oy = useTransform(spread, (s) => baseOy * s);
  const transform = useMotionTemplate`translate(-50%, -50%) translate3d(${ox}px, ${oy}px, ${z}px)`;
  const opacity = useTransform(d, [-0.55, -0.3, 0, 3.2, 4.6], [0, 1, 1, 1, 0]);
  const blur = useTransform(d, [-0.55, 0, 1.2, 4.6], [3, 0, 2, 8]);
  const brightness = useTransform(d, [0, 4], [1, 0.5]);
  const filter = useMotionTemplate`blur(${lite ? 0 : blur}px) brightness(${lite ? 1 : brightness})`;
  const tint = useTransform(d, [0, 2.4], [0, 0.22]);
  const visibility = useTransform(d, (v) => (v < -0.7 || v > 4.8 ? "hidden" : "visible"));
  const pointerEvents = useTransform(d, (v) => (Math.abs(v) < 0.5 ? "auto" : "none"));

  const [focal, setFocal] = useState(() => Math.abs(d.get()) < 0.5);
  useMotionValueEvent(d, "change", (v) => {
    const next = Math.abs(v) < 0.5;
    setFocal((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[86vw] max-w-3xl"
      style={{ transform, opacity, filter, visibility, pointerEvents }}
      inert={!focal}
    >
      <div className="relative">
        <ProjectCard project={project} lite={lite} />
        {!lite && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl bg-bio-cyangreen"
            style={{ opacity: tint }}
          />
        )}
      </div>
    </motion.div>
  );
}

function ProjectGrid() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <span className="font-mono text-xs tracking-[0.35em] text-bio-emerald">
        02 / PROJECTS
      </span>
      <h2 className="mb-10 mt-2 font-display text-3xl font-semibold text-text-100 sm:text-4xl">
        Selected Work
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard
            key={p.title}
            project={p}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 22rem"
          />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <GithubButton />
      </div>
    </div>
  );
}

export function ProjectsScene({ progress }: { progress: MotionValue<number> }) {
  const { pointerX, pointerY, reducedMotion } = useVolumetric();
  const lite = useCoarsePointer();

  const camZ = useSpring(progress, { stiffness: 80, damping: 26, restDelta: 0.0005 });
  const count = projects.length;

  const g = lite ? 0 : 1;
  const bankY = useTransform(pointerX, [-1, 1], [-7 * g, 7 * g]);
  const bankX = useTransform(pointerY, [-1, 1], [5 * g, -5 * g]);

  const focalIndex = useTransform(camZ, (v) =>
    Math.min(count - 1, Math.max(0, Math.round(v * (count - 1))))
  );
  const specimen = useTransform(focalIndex, (i) => String(i + 1).padStart(2, "0"));
  const bayName = useTransform(focalIndex, (i) => projects[i].bay as string);

  if (reducedMotion || lite) return <ProjectGrid />;

  return (
    <div className="relative isolate flex flex-1 flex-col">
      <span
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[7%] -z-10 select-none font-display text-[20vw] font-bold leading-none text-white/[0.03]"
      >
        02
      </span>

      <h2 className="flex items-center justify-center gap-4 px-8 pt-16 font-mono text-xs font-normal tracking-[0.4em] text-text-300 md:pt-20">
        <span className="h-px w-10 bg-bio-emerald/30" />
        SELECTED WORK
        <span className="h-px w-10 bg-bio-emerald/30" />
      </h2>

      <div className="relative flex-1 [perspective:1400px]">
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ rotateX: bankX, rotateY: bankY }}
        >
          {!lite && <GridFloor camZ={camZ} />}
          {BAYS.map((b) => (
            <BayGate key={b.name} bay={b} count={count} camZ={camZ} />
          ))}
          {projects.map((p, i) => (
            <ProjectPlaque
              key={p.title}
              project={p}
              index={i}
              count={count}
              camZ={camZ}
              lite={lite}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative px-8 pb-10 md:px-16">
        <div className="text-center font-mono text-xs tracking-[0.3em] text-text-300">
          SPECIMEN <motion.span className="text-bio-emerald">{specimen}</motion.span> /{" "}
          {String(count).padStart(2, "0")}
          <span className="mx-3 text-text-500">·</span>
          BAY: <motion.span className="text-bio-emerald">{bayName}</motion.span>
        </div>
        <div className="absolute bottom-10 right-8 md:right-16">
          <GithubButton />
        </div>
      </div>
    </div>
  );
}
