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
  const [isDragging, setIsDragging] = useState(false);

  // --- NEW: snap-by-card auto-advance ---
  const activeIndexRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  const getStepPx = (): number => {
    const container = scrollRef.current;
    if (!container) return 0;
    // Your wrapper has w-[320px] md:w-[360px] lg:w-[380px] and parent gap-8 (32px)
    // We compute real step using DOM so it matches breakpoints perfectly.
    const first = container.querySelector<HTMLElement>("[data-project-item]");
    if (!first) return 0;

    // distance between the left of item 0 and item 1 = card width + gap
    const second = first.nextElementSibling as HTMLElement | null;
    if (second) {
      const a = first.offsetLeft;
      const b = second.offsetLeft;
      return Math.max(1, b - a);
    }

    // fallback: approximate
    return first.getBoundingClientRect().width + 32;
  };

  const normalizeToLoop = (nextLeft: number) => {
    const container = scrollRef.current;
    if (!container) return nextLeft;
    const loopWidth = container.scrollWidth / 2;
    if (loopWidth <= 0) return nextLeft;

    // keep within [0, loopWidth)
    let x = nextLeft % loopWidth;
    if (x < 0) x += loopWidth;
    return x;
  };

  const animateScrollTo = (targetLeft: number, duration = 550) => {
    const container = scrollRef.current;
    if (!container) return;

    // Use shortest path considering loop boundary
    const loopWidth = container.scrollWidth / 2;
    const from = container.scrollLeft;

    // normalize target into [0, loopWidth)
    const target = normalizeToLoop(targetLeft);

    // choose direction that travels less distance
    let delta = target - from;
    if (loopWidth > 0) {
      if (delta > loopWidth / 2) delta -= loopWidth;
      if (delta < -loopWidth / 2) delta += loopWidth;
    }

    const start = performance.now();
    isAnimatingRef.current = true;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeInOutCubic(t);
      const next = from + delta * eased;

      // while animating, keep scrollLeft in a safe range
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

  const stepToIndex = (idx: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const step = getStepPx();
    if (!step) return;

    const loopCount = projects.length;
    const nextIndex = ((idx % loopCount) + loopCount) % loopCount; // 0..loopCount-1
    activeIndexRef.current = nextIndex;

    const target = nextIndex * step;
    animateScrollTo(target);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const startAuto = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        if (isPausedRef.current || isDraggingRef.current || isAnimatingRef.current)
          return;
        stepToIndex(activeIndexRef.current + 1);
      }, 2200); // how long each card stays before jumping
    };

    // start
    startAuto();

    // keep loop position stable on resize (breakpoints change card width)
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
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    isPausedRef.current = false;

    // Snap to nearest card after drag
    const container = scrollRef.current;
    if (!container) return;
    const step = getStepPx();
    if (!step) return;

    const loopWidth = container.scrollWidth / 2;
    const left = normalizeToLoop(container.scrollLeft);
    const nearest = Math.round(left / step);
    activeIndexRef.current = ((nearest % projects.length) + projects.length) % projects.length;
    container.scrollLeft = normalizeToLoop(activeIndexRef.current * step);
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      isPausedRef.current = false;

      // same snap behavior
      const container = scrollRef.current;
      if (!container) return;
      const step = getStepPx();
      if (!step) return;

      const left = normalizeToLoop(container.scrollLeft);
      const nearest = Math.round(left / step);
      activeIndexRef.current =
        ((nearest % projects.length) + projects.length) % projects.length;
      container.scrollLeft = normalizeToLoop(activeIndexRef.current * step);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container || !isDraggingRef.current) return;

    e.preventDefault();

    const deltaX = e.clientX - startXRef.current;
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

  return (
    <section id="projects" className="py-20 bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-12">
          My <span className="text-emerald-500">Projects</span>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-2 rounded" />
        </h2>

        {/* Horizontally scrolling project cards */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className={`relative z-10 flex gap-8 mb-16 overflow-x-auto pb-6 pt-4 no-scrollbar select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {loopingProjects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              data-project-item
              className="flex-shrink-0 w-[320px] md:w-[360px] lg:w-[380px] flex items-stretch"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* CTA Button */}
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
