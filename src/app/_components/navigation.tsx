"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Brand */}
        <Link href="#hero" className="flex items-center gap-2">
          <Image
            src="/icon.svg"
            alt="Logo"
            width={28}
            height={28}
            className="hover:opacity-80 transition"
          />
          <span className="text-lg font-semibold text-emerald-400 hover:text-emerald-300 transition">
            xini.dev
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
          <li><Link href="#hero" className="hover:text-emerald-400 transition">Home</Link></li>
          <li><Link href="#about" className="hover:text-emerald-400 transition">About</Link></li>
          <li><Link href="#projects" className="hover:text-emerald-400 transition">Projects</Link></li>
          <li><Link href="#contact" className="hover:text-emerald-400 transition">Contact</Link></li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-300 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800 px-6 py-4 space-y-4">
          <Link href="#hero" className="block text-gray-300 hover:text-emerald-400">Home</Link>
          <Link href="#about" className="block text-gray-300 hover:text-emerald-400">About</Link>
          <Link href="#projects" className="block text-gray-300 hover:text-emerald-400">Projects</Link>
          <Link href="#contact" className="block text-gray-300 hover:text-emerald-400">Contact</Link>
        </div>
      )}
    </nav>
  );
}
