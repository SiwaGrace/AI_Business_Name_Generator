"use client";

import { useState } from "react";
import { Star, ArrowRight } from "lucide-react";

export default function ArchetypeCards({
  result,
}: {
  result: string[] | string | null;
}) {
  const [starred, setStarred] = useState<Record<string, boolean>>({});
  const [showing, setShowing] = useState(3);

  const toggleStar = (name: string) => {
    setStarred((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Use real data if available, otherwise empty
  const data: string[] = Array.isArray(result) ? result : [];

  const visible = data.slice(0, showing);

  if (!result || typeof result === "string") return null;

  return (
    <section className="max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-black tracking-tight text-heading">
          Generated Archetypes
        </h2>
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
          Showing {showing} of {data.length}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((item) => (
          <div
            key={item}
            className="group cursor-pointer rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/25 hover:shadow-xl hover:shadow-primary-glow/30"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => toggleStar(item)}
                className={`transition-colors ${
                  starred[item] ? "text-accent" : "text-muted hover:text-accent"
                }`}
              >
                <Star
                  size={14}
                  fill={starred[item] ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Name */}
            <h3 className="mb-3 font-heading text-2xl font-black text-heading transition-colors group-hover:text-accent">
              {item}
            </h3>

            {/* Domain statuses */}
            <div className="flex justify-between items-center mt-4">
              <div>
                <a
                  href={`https://www.namecheap.com/domains/registration/results/?domain=${item}`}
                  target="_blank"
                  className="text-xs text-primary hover:underline"
                >
                  Check Availability
                </a>
              </div>

              {/* Arrow */}
              <div>
                <ArrowRight
                  size={14}
                  className="text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more */}
      {showing < data.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowing((v) => Math.min(v + 3, data.length))}
            className="rounded-xl border border-border px-6 py-2.5 text-sm text-muted transition-all hover:border-primary/35 hover:bg-surface hover:text-heading"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}
