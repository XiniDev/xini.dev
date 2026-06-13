"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { GithubIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import ProjectCard from "./project-card";

const projects = [
  {
    title: "Saltancy Website",
    description:
      "Saltancy is my consultancy company that provides comprehensive, end-to-end technical consultancy and custom software development tailored to specific business requirements. Our core engineering services encompass full-stack web application development, cross-platform mobile apps, scalable backend architecture, cloud deployment, and seamless third-party API integrations. This is Saltancy's landing page.",
    image: "/projects/saltancy-web.webp",
    link: "https://github.com/XiniDev/saltancy-web",
  },
  {
    title: "DBridger",
    description:
      "DBridger is a secure PyQt6 desktop gateway connecting legacy databases to Google Gemini. It acts as an autonomous agent that navigates relational schemas to answer natural language queries. By utilizing local execution, dynamic mapping, and automated PII redaction, it provides enterprise-grade conversational analytics while ensuring sensitive data remains on-device.",
    image: "/projects/dbridger.webp",
    link: "https://github.com/XiniDev/dbridger",
  },
  {
    title: "Vault of Excellence",
    description:
      "Vault of Excellence is a scalable commerce and tutoring platform built on Next.js and Supabase. It enables educators to bridge the gap between content and sales by providing customizable webpages. Tutors can curate instructional materials and market them through personalized storefronts, directly connecting their expertise to students.",
    image: "/projects/voe.webp",
    link: "https://voetutor.com",
  },
  {
    title: "WSMath",
    description:
      "WSMath is an online portfolio for an international mathematics exam strategist. Built with Next.js and Tailwind CSS, it features a sleek, responsive design and SEO optimization to attract potential clients. It also contains a custom CMS with Zero Trust login for easy content management.",
    image: "/projects/wsmath.webp",
    link: "https://www.wsmath.com/",
  },
  {
    title: "LeadingOnes DAC",
    description:
      "An implementation of Dyna-DDQN model-based deep-RL agent to improve learning quality and sample efficiency in the LeadingOnes (1+1) RLS benchmark in Dynamic Algorithm Configuration (Biedenkapp 2022).",
    image: "/projects/lo-dac.webp",
    link: "https://github.com/XiniDev/LeadingOnesDAC",
  },
  {
    title: "AI Search Algorithms",
    description:
      "Uninformed and informed search algorithms for solving flight-route problems on an NxN polar grid, with bidirecitonal search too.",
    image: "/projects/ai-search-algorithms.webp",
    link: "https://github.com/XiniDev/AI-Search-Algorithms",
  },
  {
    title: "NullVector",
    description:
      "NullVector is a Processing (Java) platformer where you battle enemies and a boss named Zorp using gravity-affected projectiles. Features include smart AI, bounce damage, boss phases, friendly fire, and a full GUI with health bars and debug tools.",
    image: "/projects/nullvector.webp",
    link: "https://github.com/XiniDev/NullVector-Processing",
  },
  {
    title: "Jungle Game & JunGUI",
    description:
      "A full implementation of the Jungle board game in Java, including a Swing-based GUI (JunGUI). Features multiplayer support, legal move highlighting, cultural-inspired UI design, and complete game logic with flexible OOP encapsulation.",
    image: "/projects/jungle-board-game.webp",
    link: "https://github.com/XiniDev/Jungle-Board-Game-Java",
  },
  {
    title: "Notes API",
    description:
      "A secure RESTful API for managing user-specific notes with CRUD operations, following OWASP principles. MongoDB with Mongoose database for efficient data modeling and querying, containing advanced filtering features.",
    image: "/projects/notes-api.webp",
    link: "https://github.com/XiniDev/notes-api",
  },
  {
    title: "Overthrow Synthetica",
    description:
      "Overthrow Synthetica is a game jam demo created in collaboration with Codethulu over two weeks for the Warwick Game Dev Society. It showcases advanced game development techniques using ThreeJS and WebGL.",
    image: "/projects/overthrow-synthetica.webp",
    link: "https://github.com/BlueTentProductions/overthrow-synthetica",
  },
  {
    title: "ECS Platformer Demo",
    description:
      "A platformer demo testing the Entity-Component-System (ECS) architecture. Developed in C++ and SDL2, it demonstrates responsive controls and flexible entity management.",
    image: "/projects/ecs-demo.webp",
    link: "https://github.com/XiniDev/Golden-Gun",
  },
];

const layout: { className: string; featured: boolean }[] = [
  { className: "md:col-span-7 md:row-span-2", featured: true },
  { className: "md:col-span-5 md:row-span-2", featured: true },
  { className: "md:col-span-6", featured: false },
  { className: "md:col-span-6", featured: false },
  { className: "md:col-span-6 lg:col-span-4", featured: false },
  { className: "md:col-span-6 lg:col-span-4", featured: false },
  { className: "md:col-span-12 lg:col-span-4", featured: false },
  { className: "md:col-span-6 lg:col-span-4", featured: false },
  { className: "md:col-span-6 lg:col-span-4", featured: false },
  { className: "md:col-span-12 lg:col-span-4", featured: false },
  { className: "md:col-span-12", featured: false },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 bg-zinc-950 text-zinc-300 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[520px] w-[800px] rounded-full bg-emerald-500/5 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          My <span className="text-emerald-400">Projects</span>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 mx-auto mt-3 rounded" />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[320px] mb-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: Math.min(i * 0.05, 0.4),
                ease: "easeOut",
              }}
              className={layout[i].className}
            >
              <ProjectCard {...project} featured={layout[i].featured} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-lg gap-3 rounded-xl font-bold shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)]"
          >
            <a
              href="https://github.com/XiniDev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="size-6" />
              See All Projects on GitHub
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
