"use client";

import ThemeToggle from "@/constants/ThemeToggle";
import { Menu, Settings } from "lucide-react";
import { useSyncExternalStore } from "react";

interface HeaderProps {
  onMenuToggle: () => void;
}


export default function Header({ onMenuToggle }: HeaderProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-8 h-14 border-b border-border bg-bg/80 backdrop-blur-md">
      {/* Left: Hamburger (mobile) + Logo (mobile only) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-surface text-muted hover:text-heading transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-primary to-primary-dim rounded-lg flex items-center justify-center text-on-primary">
            <span
              className="material-symbols-outlined text-lg"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
          </div>
          <span className="text-2xl font-bold text-heading font-['Plus_Jakarta_Sans'] tracking-tight">
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
      <div className="flex items-center gap-2">
        {mounted ? (
          <ThemeToggle />
        ) : (
          <div className="h-9 w-9 rounded-full bg-surface" aria-hidden="true" />
        )}
        <button className="p-2 rounded-lg hover:bg-surface text-muted hover:text-heading transition-colors hidden sm:flex">
          <Settings size={16} />
        </button>
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-accent to-primary-dim flex items-center justify-center text-xs font-bold text-on-primary">
          JD
        </div>
      </div>
    </header>
  );
}
