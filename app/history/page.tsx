"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Clock } from "lucide-react";

const STORAGE_KEY_HISTORY = "searchHistory";

const HistoryPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<
    {
      id: string;
      timestamp: number;
      description: string;
      industry: string;
      count: number;
      length: number;
      tone: string;
      results: string[];
    }[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY_HISTORY);
      if (stored) {
        setSearchHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load search history from localStorage", error);
    }
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
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
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-heading mb-8">
              Search History
            </h1>
          </div>
          {searchHistory.length === 0 ? (
            <div className="text-center py-12">
              <Clock size={48} className="mx-auto text-muted mb-4" />
              <p className="text-muted text-lg">No search history yet.</p>
              <p className="text-muted">
                Generate some names to see your history here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {searchHistory.map((search) => (
                <div
                  key={search.id}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  {/* Search Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={16} className="text-muted" />
                        <span className="text-sm text-muted">
                          {formatDate(search.timestamp)}
                        </span>
                      </div>
                      <p className="text-heading font-medium mb-2">
                        "{search.description}"
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-surface px-2 py-1 rounded">
                          {search.industry}
                        </span>
                        <span className="bg-surface px-2 py-1 rounded">
                          {search.count} words
                        </span>
                        <span className="bg-surface px-2 py-1 rounded">
                          {search.length} suggestions
                        </span>
                        <span className="bg-surface px-2 py-1 rounded">
                          {search.tone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="text-lg font-semibold text-heading mb-3">
                      Generated Names ({search.results.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {search.results.map((name, index) => (
                        <div
                          key={index}
                          className="bg-surface border border-border rounded-xl p-3"
                        >
                          <p className="font-medium text-heading">{name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HistoryPage;
