"use client";

import { Menu, Moon, Settings } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onMenuToggle: () => void;
}

const navLinks = ["Explore", "Pricing", "Guides"];

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-8 h-14 border-b border-white/5 bg-namelify-dark/80 backdrop-blur-md">
      {/* Left: Hamburger (mobile) + Logo (mobile only) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-namelify-muted hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-primary to-primary-container rounded-lg flex items-center justify-center text-white">
            <span
              className="material-symbols-outlined text-lg"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
          </div>
          <span className="text-2xl font-bold text-[#36274e] dark:text-[#fcf4ff] font-['Plus_Jakarta_Sans'] tracking-tight">
            Namelify AI
          </span>
        </div>
      </div>

      {/* Center Nav */}
      {/* <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link}
            href="#"
            className={`text-sm font-medium transition-colors ${
              link === "Explore"
                ? "text-white border-b-2 border-namelify-accent pb-0.5"
                : "text-namelify-muted hover:text-white"
            }`}
          >
            {link}
          </Link>
        ))}
      </nav> */}

      {/* Right */}
      {/* <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-white/10 text-namelify-muted hover:text-white transition-colors hidden sm:flex">
          <Moon size={16} />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 text-namelify-muted hover:text-white transition-colors hidden sm:flex">
          <Settings size={16} />
        </button>
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-namelify-accent to-violet-600 flex items-center justify-center text-xs font-bold text-white">
          JD
        </div>
      </div> */}
    </header>
  );
}
