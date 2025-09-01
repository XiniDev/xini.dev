"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo + Brand */}
        <Link href="#hero" className="flex items-center gap-3">
          <Image
            src="/icon.svg"
            alt="Logo"
            width={32}
            height={32}
            className="hover:opacity-80 transition"
          />
          <span className="text-xl font-semibold text-emerald-400 hover:text-emerald-300 transition">
            xini.dev
          </span>
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-8 text-gray-300 font-medium">
          <li>
            <Link href="#hero" className="hover:text-emerald-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className="hover:text-emerald-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="#projects" className="hover:text-emerald-400 transition">
              Projects
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-emerald-400 transition">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
