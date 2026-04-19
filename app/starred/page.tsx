"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { X } from "lucide-react";

const STORAGE_KEY = "savedNames";

const StarredPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedNames, setSavedNames] = useState<{ name: string; tag: string }[]>(
    [],
  );

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

  const handleRemoveFavorite = (nameToRemove: string) => {
    const updatedNames = savedNames.filter((item) => item.name !== nameToRemove);
    setSavedNames(updatedNames);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNames));
    } catch (error) {
      console.error("Failed to save updated favorites to localStorage", error);
    }
  };

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

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-heading mb-6">
              Starred Names
            </h1>
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
                      <h3 className="text-lg font-semibold text-heading">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-accent">★</span>
                        <button
                          onClick={() => handleRemoveFavorite(item.name)}
                          className="text-muted hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                          title="Remove from favorites"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-muted">{item.tag}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StarredPage;
