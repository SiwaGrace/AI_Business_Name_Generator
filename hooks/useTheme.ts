"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function getInitialTheme() {
  if (typeof window === "undefined") return true;

  const saved = window.localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    return saved === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useTheme() {
  const mounted = useMounted();
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.toggle("light", !isDark);
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark, mounted]);

  return { isDark, setIsDark, mounted };
}
