"use client";

import { useState, useEffect } from "react";
import DottedBackground from "./dotted-background";

export default function Hero() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isResetting, setIsResetting] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const touchCheck = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(touchCheck);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 40;
    const y = (e.clientY / innerHeight - 0.5) * 40;
    setRotate({ x: y, y: -x });
    setIsResetting(false);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setRotate({ x: 0, y: 0 });
    setIsResetting(true);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-screen flex justify-center items-center text-center text-white relative overflow-hidden select-none px-4"
    >
      {/* Dotted Background */}
      <DottedBackground />

      {/* Content wrapper that tilts */}
      <div
        className={isResetting ? "transition-transform duration-300" : ""}
        style={{
          transform: isTouchDevice
            ? "none"
            : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        <h1 className="text-5xl sm:text-8xl font-extrabold mb-4 sm:mb-6 tracking-tight">
          <span className="text-emerald-500">XINI</span>
        </h1>
        <p className="text-xl sm:text-3xl text-gray-300 mb-8 sm:mb-12">
          Designer • Developer • Creator
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <a
            href="#projects"
            className="bg-emerald-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-lg sm:text-xl font-semibold hover:bg-emerald-700 transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-gray-500 text-gray-200 py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-lg sm:text-xl font-semibold hover:bg-gray-800 transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
