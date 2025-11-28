"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "./project-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const projects = [
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
    title: "WSMath",
    description:
      "WS Math is an online portfolio for a professional math tutor specializing in IB, A-levels, and IGCSE curricula. The website showcases the tutor's expertise, teaching philosophy, and success stories.",
    image: "/projects/wsmath-logo.png",
    link: "https://www.wsmath.com/",
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

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.5;

    const step = () => {
      const container = scrollRef.current;
      if (container && !isPausedRef.current) {
        container.scrollLeft += speed;

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    isDraggingRef.current = false;
    setIsDragging(false);
  };

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
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container || !isDraggingRef.current) return;

    e.preventDefault();

    const deltaX = e.clientX - startXRef.current;
    container.scrollLeft = scrollLeftRef.current - deltaX;
  };

  return (
    <section id="projects" className="py-20 bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-12">
          My <span className="text-emerald-500">Projects</span>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-2 rounded"></div>
        </h2>

        {/* Horizontally scrolling project cards */}
        <div
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`relative z-10 flex gap-8 mb-16 overflow-x-auto pb-6 pt-4 scroll-smooth no-scrollbar select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[320px] md:w-[360px] lg:w-[380px] flex"
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