"use client";

import React, { useEffect, useState } from "react";

const STORAGE_KEY = "savedNames";

const StarredPage = () => {
  const [savedNames, setSavedNames] = useState<{ name: string; tag: string }[]>([]);

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

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-heading mb-6">Starred Names</h1>
        {savedNames.length === 0 ? (
          <p className="text-muted">No starred names yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedNames.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-heading">{item.name}</h3>
                  <span className="text-accent">★</span>
                </div>
                <p className="text-sm text-muted">{item.tag}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StarredPage;
