"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import GeneratorPanel from "@/components/GeneratorPanel";
import ArchetypeCards from "@/components/ArchetypeCards";
import FeatureGrid from "@/components/FeatureGrid";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-nomina-dark flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Layout */}
      <div className="flex flex-col flex-1 min-h-screen lg:ml-52">
        <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />

        <main className="flex-1 flex flex-col lg:flex-row gap-0">
          {/* Center Content */}
          <div className="flex-1 px-4 md:px-8 py-6 space-y-10">
            <GeneratorPanel />
            <ArchetypeCards />
            <FeatureGrid />
          </div>

          {/* Right Panel */}
          <aside className="hidden xl:flex flex-col w-64 shrink-0 border-l border-white/5 bg-nomina-panel px-5 py-6 gap-6">
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-nomina-muted uppercase mb-4">
                Saved Names
              </p>
              <p className="text-[10px] tracking-widest text-nomina-muted/50 uppercase mb-5">
                Your Curated Collection
              </p>
              <div className="space-y-3">
                {savedNames.map((n) => (
                  <div
                    key={n.name}
                    className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {n.name}
                      </p>
                      <p className="text-[11px] text-nomina-muted">{n.tag}</p>
                    </div>
                    <span className="text-nomina-accent group-hover:scale-110 transition-transform">
                      ★
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <button className="w-full py-3 rounded-xl bg-linear-to-r from-nomina-accent to-violet-500 text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-nomina-accent/20">
                Upgrade to Pro
              </button>
              <button className="w-full text-xs text-nomina-muted flex items-center justify-center gap-1.5 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-nomina-accent inline-block" />
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
