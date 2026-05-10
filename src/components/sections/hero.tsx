"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isResetting, setIsResetting] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
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
    <AuroraBackground
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
        className={`relative z-10 flex flex-col items-center justify-center px-4 text-center ${
          isResetting ? "transition-transform duration-300" : ""
        }`}
        style={{
          transform: isTouchDevice
            ? "none"
            : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold mb-4 sm:mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-emerald-300 to-emerald-600 drop-shadow-[0_0_30px_rgba(16,185,129,0.35)]">
          XINI
        </h1>
        <p className="text-xl sm:text-3xl text-zinc-200 mb-8 sm:mb-12 font-light tracking-wide">
          Designer <span className="text-emerald-400">•</span> Developer{" "}
          <span className="text-emerald-400">•</span> Creator
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 sm:h-14 px-6 sm:px-8 text-lg sm:text-xl rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)]"
          >
            <a href="#projects">View Projects</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 sm:h-14 px-6 sm:px-8 text-lg sm:text-xl rounded-xl border-emerald-400/40 bg-white/5 backdrop-blur-md text-zinc-100 hover:border-emerald-400 hover:bg-white/10 hover:text-zinc-100 dark:border-emerald-400/40 dark:bg-white/5 dark:hover:border-emerald-400 dark:hover:bg-white/10"
          >
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
