// Projects.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import ProjectCard from "./project-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const projects = [
  {
    title: "WSMath",
    description:
      "WSMath is an online portfolio for an international mathematics exam strategist. Built with Next.js and Tailwind CSS, it features a sleek, responsive design and SEO optimization to attract potential clients. It also contains a custom CMS with Zero Trust login for easy content management.",
    image: "/projects/wsmath.jpg",
    link: "https://www.wsmath.com/",
  },
  {
    title: "LeadingOnes DAC",
    description:
      "An implementation of Dyna-DDQN model-based deep-RL agent to improve learning quality and sample efficiency in the LeadingOnes (1+1) RLS benchmark in Dynamic Algorithm Configuration (Biedenkapp 2022).",
    image: "/projects/lo-dac.png",
    link: "https://github.com/XiniDev/LeadingOnesDAC",
  },
  {
    title: "AI Search Algorithms",
    description:
      "Uninformed and informed search algorithms for solving flight-route problems on an NxN polar grid, with bidirecitonal search too.",
    image: "/projects/ai-search-algorithms.png",
    link: "https://github.com/XiniDev/AI-Search-Algorithms",
  },
  {
    title: "NullVector",
    description:
      "NullVector is a Processing (Java) platformer where you battle enemies and a boss named Zorp using gravity-affected projectiles. Features include smart AI, bounce damage, boss phases, friendly fire, and a full GUI with health bars and debug tools.",
    image: "/projects/nullvector.png",
    link: "https://github.com/XiniDev/NullVector-Processing",
  },
  {
    title: "Jungle Game & JunGUI",
    description:
      "A full implementation of the Jungle board game in Java, including a Swing-based GUI (JunGUI). Features multiplayer support, legal move highlighting, cultural-inspired UI design, and complete game logic with flexible OOP encapsulation.",
    image: "/projects/jungle-board-game.png",
    link: "https://github.com/XiniDev/Jungle-Board-Game-Java",
  },
  {
    title: "Notes API",
    description:
      "A secure RESTful API for managing user-specific notes with CRUD operations, following OWASP principles. MongoDB with Mongoose database for efficient data modeling and querying, containing advanced filtering features.",
    image: "/projects/notes-api.png",
    link: "https://github.com/XiniDev/notes-api",
  },
  {
    title: "Overthrow Synthetica",
    description:
      "Overthrow Synthetica is a game jam demo created in collaboration with Codethulu over two weeks for the Warwick Game Dev Society. It showcases advanced game development techniques using ThreeJS and WebGL.",
    image: "/projects/overthrow-synthetica.png",
    link: "https://github.com/BlueTentProductions/overthrow-synthetica",
  },
  {
    title: "ECS Platformer Demo",
    description:
      "A platformer demo testing the Entity-Component-System (ECS) architecture. Developed in C++ and SDL2, it demonstrates responsive controls and flexible entity management.",
    image: "/projects/ecs-demo.png",
    link: "https://github.com/XiniDev/Golden-Gun",
  },
];

// Duplicate for looping
const loopingProjects = [...projects, ...projects];

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const activeIndexRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  const DRAG_MULTIPLIER = 1.85; // <— makes small drags move further
  const VELOCITY_BOOST = 0.75; // <— stronger “throw” effect
  const MAX_THROW_CARDS = 6; // <— max cards it can fly through
  const SNAP_DURATION_BASE = 420;

  const getStepPx = (): number => {
    const container = scrollRef.current;
    if (!container) return 0;

    const first = container.querySelector<HTMLElement>("[data-project-item]");
    if (!first) return 0;

    const second = first.nextElementSibling as HTMLElement | null;
    if (second) {
      const a = first.offsetLeft;
      const b = second.offsetLeft;
      return Math.max(1, b - a);
    }

    return first.getBoundingClientRect().width + 32; // gap-8
  };

  const normalizeToLoop = (nextLeft: number) => {
    const container = scrollRef.current;
    if (!container) return nextLeft;
    const loopWidth = container.scrollWidth / 2;
    if (loopWidth <= 0) return nextLeft;

    let x = nextLeft % loopWidth;
    if (x < 0) x += loopWidth;
    return x;
  };

  const animateScrollTo = (targetLeft: number, duration = 550) => {
    const container = scrollRef.current;
    if (!container) return;

    const loopWidth = container.scrollWidth / 2;
    const from = container.scrollLeft;
    const target = normalizeToLoop(targetLeft);

    let delta = target - from;
    if (loopWidth > 0) {
      if (delta > loopWidth / 2) delta -= loopWidth;
      if (delta < -loopWidth / 2) delta += loopWidth;
    }

    const start = performance.now();
    isAnimatingRef.current = true;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      const next = from + delta * eased;

      container.scrollLeft = normalizeToLoop(next);

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        container.scrollLeft = normalizeToLoop(from + delta);
        isAnimatingRef.current = false;
      }
    };

    requestAnimationFrame(tick);
  };

  const stepToIndex = (idx: number, duration?: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const step = getStepPx();
    if (!step) return;

    const loopCount = projects.length;
    const nextIndex = ((idx % loopCount) + loopCount) % loopCount;
    activeIndexRef.current = nextIndex;

    animateScrollTo(nextIndex * step, duration ?? 550);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const startAuto = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        if (
          isPausedRef.current ||
          isDraggingRef.current ||
          isAnimatingRef.current
        )
          return;
        stepToIndex(activeIndexRef.current + 1);
      }, 2200);
    };

    startAuto();

    const onResize = () => {
      const step = getStepPx();
      if (!step) return;
      container.scrollLeft = normalizeToLoop(activeIndexRef.current * step);
    };

    window.addEventListener("resize", onResize);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    isPausedRef.current = true;

    startXRef.current = e.clientX;
    scrollLeftRef.current = container.scrollLeft;

    // velocity tracking
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const finishDragWithThrowAndSnap = () => {
    const container = scrollRef.current;
    if (!container) return;

    const step = getStepPx();
    if (!step) return;

    const left = normalizeToLoop(container.scrollLeft);
    const baseIndex = Math.round(left / step);

    // “throw” based on velocity (px/ms -> cards)
    const v = velocityRef.current; // px/ms (positive means mouse moved right)
    // Convert to scroll direction:
    // Our scrollLeft increases when content moves left, and in handleMouseMove we do (scrollLeftRef - deltaX*mult).
    // So if mouse moved right (deltaX positive), scrollLeft decreased => we want negative card delta.
    const cardsFromVelocity = (-v * VELOCITY_BOOST * 140) / step; // 140 is a tuned scaler

    const throwCards = Math.max(
      -MAX_THROW_CARDS,
      Math.min(MAX_THROW_CARDS, Math.round(cardsFromVelocity))
    );

    const nextIndexRaw = baseIndex + throwCards;
    const nextIndex =
      ((nextIndexRaw % projects.length) + projects.length) % projects.length;

    activeIndexRef.current = nextIndex;

    // longer distance => slightly longer duration (feels like gliding)
    const distCards = Math.min(MAX_THROW_CARDS, Math.abs(throwCards));
    const duration = SNAP_DURATION_BASE + distCards * 90;

    animateScrollTo(nextIndex * step, duration);
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);
    isPausedRef.current = false;

    finishDragWithThrowAndSnap();
  };

  const handleMouseLeave = () => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);
    isPausedRef.current = false;

    finishDragWithThrowAndSnap();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container || !isDraggingRef.current) return;

    e.preventDefault();

    const now = performance.now();
    const dx = e.clientX - startXRef.current;

    const deltaX = dx * DRAG_MULTIPLIER;

    // velocity (px/ms) computed on raw mouse movement (not amplified)
    const dt = Math.max(1, now - lastTimeRef.current);
    const vx = (e.clientX - lastXRef.current) / dt;
    // smooth velocity a bit (low-pass filter)
    velocityRef.current = velocityRef.current * 0.75 + vx * 0.25;

    lastXRef.current = e.clientX;
    lastTimeRef.current = now;

    const loopWidth = container.scrollWidth / 2;

    let nextScrollLeft = scrollLeftRef.current - deltaX;

    // Wrap both directions
    if (nextScrollLeft < 0) {
      nextScrollLeft += loopWidth;
      scrollLeftRef.current += loopWidth;
    } else if (nextScrollLeft >= loopWidth * 2) {
      nextScrollLeft -= loopWidth;
      scrollLeftRef.current -= loopWidth;
    }

    container.scrollLeft = nextScrollLeft;
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <section id="projects" className="py-20 bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          My <span className="text-emerald-500">Projects</span>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-2 rounded" />
        </h2>

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onDragStart={handleDragStart}
          className={`relative z-10 flex gap-8 mb-16 overflow-x-auto pb-6 pt-4 no-scrollbar select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {loopingProjects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              data-project-item
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="flex-shrink-0 w-[320px] md:w-[360px] lg:w-[380px] flex items-stretch"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://github.com/XiniDev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-emerald-700 transition"
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
            See All Projects on GitHub
            <FontAwesomeIcon icon={faUpRightFromSquare} className="text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
}
