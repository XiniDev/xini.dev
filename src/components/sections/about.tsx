"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-zinc-950 text-zinc-300 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[480px] w-[480px] rounded-full bg-emerald-700/10 blur-[140px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="text-emerald-400">About</span> Me
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 mx-auto mt-3 rounded" />
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="md:w-1/3 flex justify-center"
          >
            <div className="relative p-6 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-emerald-500/20 hover:border-emerald-400/60 transition shadow-[0_0_40px_rgba(16,185,129,0.1)]">
              <Image
                src="/icon.svg"
                alt="XiniDev Logo"
                width={200}
                height={200}
                style={{ height: "auto" }}
                className="rounded-md drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-emerald-500/30 animate-pulse pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:w-2/3 space-y-6 text-lg leading-relaxed"
          >
            <p>
              Hey there! I&apos;m{" "}
              <span className="text-emerald-400 font-medium">Xini</span>. I&apos;m
              deeply passionate about{" "}
              <span className="text-emerald-400 font-medium">coding, AI</span>,
              and{" "}
              <span className="text-emerald-400 font-medium">
                game development
              </span>
              . There&apos;s nothing more exciting to me than turning my wildest
              imaginations into reality with code. I studied{" "}
              <span className="text-emerald-400 font-medium">
                BSc Computer Science
              </span>{" "}
              at the University of Warwick and{" "}
              <span className="text-emerald-400 font-medium">
                MSc Artificial Intelligence
              </span>{" "}
              at the University of St Andrews, where I got to work on a variety
              of projects with some amazing people.
            </p>
            <p>
              Beyond coding, I&apos;m really into{" "}
              <span className="text-emerald-400 font-medium">
                games, art, and world-building
              </span>{" "}
              — these interests constantly spark new ideas and keep me
              inspired. I&apos;m always eager to learn new things and dive into
              the latest{" "}
              <span className="text-emerald-400 font-medium">
                tech and design trends
              </span>
              .
            </p>
            <p>
              If you&apos;re excited about creating something awesome,{" "}
              <span className="text-emerald-400 font-medium">
                let&apos;s team up
              </span>{" "}
              and make it happen!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
