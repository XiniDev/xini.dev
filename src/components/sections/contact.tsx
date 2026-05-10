"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { GithubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { XTwitter } from "@/components/icons/x-twitter";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const contacts: {
  name: string;
  Icon: IconComponent;
  link: string;
}[] = [
  {
    name: "Email",
    Icon: Mail,
    link: "mailto:anxinizlol@gmail.com",
  },
  {
    name: "GitHub",
    Icon: GithubIcon,
    link: "https://github.com/XiniDev",
  },
  {
    name: "Twitter",
    Icon: XTwitter,
    link: "https://x.com/XiniDev",
  },
  {
    name: "LinkedIn",
    Icon: LinkedinIcon,
    link: "https://www.linkedin.com/in/xinidev/",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-zinc-950 text-zinc-300 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="text-emerald-400">Contact</span> Me
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 mx-auto mt-3 rounded" />
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contacts.map(({ name, Icon, link }, index) => (
            <motion.a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col items-center p-8 rounded-2xl bg-zinc-900/70 backdrop-blur-md border border-emerald-500/15 hover:border-emerald-400/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition transform hover:-translate-y-2 duration-300"
            >
              <div className="text-emerald-400 mb-4 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]">
                <Icon className="size-12" />
              </div>

              <h3 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition">
                {name}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
