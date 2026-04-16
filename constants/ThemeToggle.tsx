"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { isDark, setIsDark, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        aria-label="Theme loading"
        disabled
        className="rounded-full border border-border bg-surface p-2 text-muted"
      >
        <Sun size={20} className="opacity-0" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-full border border-border bg-surface p-2 text-heading transition hover:border-border-hover hover:bg-card hover:scale-110"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
