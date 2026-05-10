"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-zinc-950/70 backdrop-blur-xl border-b border-emerald-500/10 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="#hero" className="flex items-center gap-2 group">
          <Image
            src="/icon.svg"
            alt="xini.dev logo"
            width={28}
            height={28}
            style={{ height: "auto" }}
            className="group-hover:opacity-80 transition drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          />
          <span className="text-lg font-semibold text-emerald-400 group-hover:text-emerald-300 transition">
            xini.dev
          </span>
        </Link>

        <ul className="hidden md:flex gap-8 text-zinc-300 font-medium">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:text-emerald-400 transition relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-emerald-400 after:transition-all hover:after:w-full"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-zinc-300 hover:text-emerald-400"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-t border-emerald-500/10 px-6 py-4 space-y-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="block text-zinc-300 hover:text-emerald-400 transition"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
