"use client";

import ThemeToggle from "@/constants/ThemeToggle";
import { Menu, Settings, Sparkles } from "lucide-react";
import { useSyncExternalStore } from "react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-bg/85 px-4 backdrop-blur-md md:px-8">
      {/* Left: Hamburger (mobile) + Logo (mobile only) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-heading lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary-dim text-on-primary shadow-lg shadow-primary-glow/70">
            <Sparkles size={16} />
          </div>
          <span className="font-heading text-2xl font-bold tracking-tight text-heading">
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
        {/* <button className="hidden rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-heading sm:flex">
          <Settings size={16} />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-accent to-primary-dim text-xs font-bold text-on-primary shadow-lg shadow-primary-glow/60">
          JD
        </div> */}
      </div>
    </header>
  );
}
