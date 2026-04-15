"use client";

import { useState } from "react";
import { Star, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

const archetypes = [
  {
    badge: "High Confidence",
    badgeColor: "text-emerald-400 bg-emerald-400/10",
    name: "Velocean",
    description: "Deep tech maritime logistics.",
    domain: "velocean.io",
    domainStatus: "available",
    starred: true,
  },
  {
    badge: "Premium Match",
    badgeColor: "text-amber-400 bg-amber-400/10",
    name: "Marisys",
    description: "Data-driven ocean intelligence.",
    domain: "marisys.com",
    domainStatus: "premium",
    starred: false,
  },
  {
    badge: "Modern Classic",
    badgeColor: "text-sky-400 bg-sky-400/10",
    name: "AquaBloom",
    description: "Sustainable aquatic ecosystems.",
    domain: "aquabloom.net",
    domainStatus: "available",
    starred: false,
  },
  {
    badge: "High Confidence",
    badgeColor: "text-emerald-400 bg-emerald-400/10",
    name: "Novalux",
    description: "Next-gen fintech infrastructure.",
    domain: "novalux.io",
    domainStatus: "available",
    starred: false,
  },
  {
    badge: "Creative Pick",
    badgeColor: "text-fuchsia-400 bg-fuchsia-400/10",
    name: "Kryptalis",
    description: "Decentralized exchange protocol.",
    domain: "kryptalis.xyz",
    domainStatus: "available",
    starred: false,
  },
  {
    badge: "Premium Match",
    badgeColor: "text-amber-400 bg-amber-400/10",
    name: "Solvara",
    description: "Renewable energy data platform.",
    domain: "solvara.com",
    domainStatus: "premium",
    starred: false,
  },
];

export default function ArchetypeCards() {
  const [starred, setStarred] = useState<Record<string, boolean>>(
    Object.fromEntries(archetypes.map((a) => [a.name, a.starred]))
  );
  const [showing, setShowing] = useState(3);

  const toggleStar = (name: string) => {
    setStarred((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const visible = archetypes.slice(0, showing);

  return (
    <section className="max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-white tracking-tight">
          Generated Archetypes
        </h2>
        <span className="text-xs text-nomina-muted bg-white/5 px-3 py-1 rounded-full border border-white/8">
          Showing {showing} of {archetypes.length}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((arc) => (
          <div
            key={arc.name}
            className="group bg-nomina-card border border-white/8 rounded-2xl p-5 hover:border-nomina-accent/30 hover:shadow-xl hover:shadow-nomina-accent/5 transition-all duration-300 cursor-pointer"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${arc.badgeColor}`}
              >
                {arc.badge}
              </span>
              <button
                onClick={() => toggleStar(arc.name)}
                className={`transition-colors ${
                  starred[arc.name]
                    ? "text-nomina-accent"
                    : "text-nomina-muted hover:text-nomina-accent"
                }`}
              >
                <Star size={14} fill={starred[arc.name] ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Name & Description */}
            <h3 className="text-2xl font-black text-white mb-1 group-hover:text-nomina-accent transition-colors">
              {arc.name}
            </h3>
            <p className="text-sm text-nomina-muted leading-relaxed mb-5">
              {arc.description}
            </p>

            {/* Domain */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {arc.domainStatus === "available" ? (
                  <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle size={12} className="text-amber-400 shrink-0" />
                )}
                <span className="text-xs text-nomina-muted">
                  {arc.domain}
                  {arc.domainStatus === "premium" && (
                    <span className="ml-1 text-amber-400">premium</span>
                  )}
                  {arc.domainStatus === "available" && (
                    <span className="ml-1 text-emerald-400">available</span>
                  )}
                </span>
              </div>
              <ArrowRight
                size={14}
                className="text-nomina-muted group-hover:text-nomina-accent group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Show more */}
      {showing < archetypes.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowing((v) => Math.min(v + 3, archetypes.length))}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-sm text-nomina-muted hover:text-white hover:border-nomina-accent/40 transition-all"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}
