"use client";

import { useState } from "react";
import DottedBackground from "./dotted-background";

export default function Hero() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isResetting, setIsResetting] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 40;
    const y = (e.clientY / innerHeight - 0.5) * 40;
    setRotate({ x: y, y: -x });
    setIsResetting(false);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsResetting(true);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-screen flex justify-center items-center text-center text-white relative overflow-hidden select-none"
    >
      {/* Dotted Background */}
      <DottedBackground />

      {/* Content wrapper that tilts */}
      <div
        className={isResetting ? "transition-transform duration-300" : ""}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        <h1 className="text-8xl font-extrabold mb-6 tracking-tight">
          <span className="text-emerald-500">XINI</span>
        </h1>
        <p className="text-3xl text-gray-300 mb-12">
          Designer • Developer • Creator
        </p>

        <div className="flex gap-6 justify-center">
          <a
            href="#projects"
            className="bg-emerald-600 text-white py-4 px-8 rounded-xl text-xl font-semibold hover:bg-emerald-700 transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-gray-500 text-gray-200 py-4 px-8 rounded-xl text-xl font-semibold hover:bg-gray-800 transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
