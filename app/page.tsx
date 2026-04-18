"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import GeneratorPanel from "@/components/GeneratorPanel";
import ArchetypeCards from "@/components/ArchetypeCards";
import FeatureGrid from "@/components/FeatureGrid";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [result, setResult] = useState<string[] | string | null>(null);
  const [isPending, setIsPending] = useState(false);

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
            <ArchetypeCards result={result} />
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
                {/* TODO: replace with localStorage starred names */}
                {savedNames.map((n) => (
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

const savedNames = [
  { name: "Velocean", tag: "Tech & Marine" },
  { name: "Lumina", tag: "Innovation" },
  { name: "Marisys", tag: "Data & Ocean" },
];
