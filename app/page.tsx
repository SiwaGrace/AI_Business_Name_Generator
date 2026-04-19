"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import GeneratorPanel from "@/components/GeneratorPanel";
import ArchetypeCards from "@/components/ArchetypeCards";
import FeatureGrid from "@/components/FeatureGrid";

const STORAGE_KEY = "savedNames";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [result, setResult] = useState<string[] | string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [savedNames, setSavedNames] = useState<
    {
      name: string;
      tag: string;
    }[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedNames(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load saved names from localStorage", error);
    }
  }, []);

  const saveToStorage = (items: typeof savedNames) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save saved names to localStorage", error);
    }
  };

  const handleToggleFavorite = (name: string) => {
    setSavedNames((current) => {
      const alreadySaved = current.some((item) => item.name === name);
      const next = alreadySaved
        ? current.filter((item) => item.name !== name)
        : [{ name, tag: "AI Generated" }, ...current];
      saveToStorage(next);
      return next;
    });
  };

  const starred = useMemo(
    () =>
      savedNames.reduce<Record<string, boolean>>((map, item) => {
        map[item.name] = true;
        return map;
      }, {}),
    [savedNames],
  );

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-overlay/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col flex-1 min-h-screen lg:ml-52">
        <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />

        <main className="flex-1 flex flex-col lg:flex-row gap-0">
          <div className="flex-1 px-4 md:px-8 py-6 space-y-10">
            <GeneratorPanel
              onResult={setResult}
              onPending={setIsPending}
              isPending={isPending}
            />
            <ArchetypeCards
              result={result}
              starred={starred}
              onFavoriteToggle={handleToggleFavorite}
            />
            <FeatureGrid />
          </div>

          <aside className="hidden w-64 shrink-0 flex-col gap-6 border-l border-border bg-surface px-5 py-6 xl:flex">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted">
                Saved Names
              </p>
              <p className="mb-5 text-[10px] uppercase tracking-widest text-muted/60">
                Your Curated Collection
              </p>
              <div className="space-y-3">
                {savedNames.length === 0 ? (
                  <p className="text-sm text-muted">
                    No favorites yet. Click the star icon on a generated name to
                    save it.
                  </p>
                ) : (
                  <>
                    {savedNames.slice(0, 3).map((n) => (
                      <div
                        key={n.name}
                        className="group flex cursor-pointer items-center justify-between rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/25 hover:bg-bg"
                      >
                        <div>
                          <p className="text-sm font-semibold text-heading">
                            {n.name}
                          </p>
                          <p className="text-[11px] text-muted">{n.tag}</p>
                        </div>
                        <span className="text-accent transition-transform group-hover:scale-110">
                          ★
                        </span>
                      </div>
                    ))}
                    {savedNames.length > 3 && (
                      <Link
                        href="/starred"
                        className="flex items-center justify-center gap-1 text-xs text-primary hover:underline"
                      >
                        more
                        <ArrowRight size={12} />
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="mt-auto">
              <button className="flex w-full items-center justify-center gap-1.5 text-xs text-muted transition-colors hover:text-heading">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                Help Center
              </button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
