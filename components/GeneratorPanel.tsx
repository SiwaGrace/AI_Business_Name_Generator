"use client";

import { useState } from "react";
import { Zap, ChevronDown } from "lucide-react";

const industries = [
  "Fintech & Web3",
  "Health & Wellness",
  "SaaS & Productivity",
  "E-Commerce",
  "AI & Robotics",
  "Education",
  "Legal & Compliance",
];

const tones = [
  "Minimalist",
  "Futuristic",
  "Organic",
  "Whimsical",
  "Bold",
  "Playful",
];

export default function GeneratorPanel() {
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("Fintech & Web3");
  const [suggestions, setSuggestions] = useState(12);
  const [selectedTones, setSelectedTones] = useState<string[]>(["Minimalist"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleTone = (tone: string) => {
    setSelectedTones((prev) =>
      prev.includes(tone) ? prev.filter((t) => t !== tone) : [...prev, tone],
    );
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-nomina-accent/10 to-transparent blur-2xl -z-10" />

      <div className="bg-nomina-card border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
            Name Your Vision.
          </h1>
          <p className="text-nomina-muted text-sm md:text-base max-w-sm mx-auto leading-relaxed">
            The Kinetic Editorial AI engine crafts names that resonate, disrupt,
            and endure.
          </p>
        </div>

        <div className="space-y-5">
          {/* Business Description */}
          <div>
            <label className="block text-[11px] font-semibold tracking-widest text-nomina-muted uppercase mb-2">
              Business Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your brand's soul, mission, and unique frequency..."
              className="w-full bg-nomina-input border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-nomina-muted/50 resize-none focus:outline-none focus:border-nomina-accent/50 focus:ring-1 focus:ring-nomina-accent/30 transition-all"
            />
          </div>

          {/* Industry + Suggestions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Industry Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold tracking-widest text-nomina-muted uppercase mb-2">
                Industry
              </label>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="w-full flex items-center justify-between bg-nomina-input border border-white/8 rounded-xl px-4 py-3 text-sm text-white hover:border-nomina-accent/40 transition-colors"
                >
                  {industry}
                  <ChevronDown
                    size={14}
                    className={`text-nomina-muted transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-nomina-panel border border-white/10 rounded-xl overflow-hidden z-10 shadow-xl">
                    {industries.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => {
                          setIndustry(ind);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          ind === industry
                            ? "bg-nomina-accent/20 text-nomina-accent"
                            : "text-nomina-muted hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Suggestions Slider */}
            <div>
              <label className="block text-[11px] font-semibold tracking-widest text-nomina-muted uppercase mb-2">
                Suggestions ({suggestions})
              </label>
              <div className="flex items-center h-11.5">
                <input
                  type="range"
                  min={4}
                  max={24}
                  value={suggestions}
                  onChange={(e) => setSuggestions(Number(e.target.value))}
                  className="w-full accent-nomina-accent cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Vocal Tone */}
          <div>
            <label className="block text-[11px] font-semibold tracking-widest text-nomina-muted uppercase mb-3">
              Vocal Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {tones.map((tone) => (
                <button
                  key={tone}
                  onClick={() => toggleTone(tone)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    selectedTones.includes(tone)
                      ? "bg-nomina-accent border-nomina-accent text-white shadow-lg shadow-nomina-accent/20"
                      : "bg-transparent border-white/15 text-nomina-muted hover:border-nomina-accent/40 hover:text-white"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-linear-to-r from-nomina-accent to-violet-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-nomina-accent/25 disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap size={16} />
                Generate Identity
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
