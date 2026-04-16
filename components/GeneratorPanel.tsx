"use client";

import { handleGenerate } from "@/actions/generateNameAction";
import { Zap, ChevronDown } from "lucide-react";
import { useState, type FormEvent } from "react";

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
const countOptions = [1, 2, 3, 4, 5];

export default function GeneratorPanel() {
  const [result, setResult] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("Fintech & Web3");
  const [count, setCount] = useState(2);
  const [length, setLength] = useState(12);
  const [selectedTones, setSelectedTones] = useState<string[]>(["Minimalist"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleTone = (tone: string) => {
    setSelectedTones((prev) =>
      prev.includes(tone) ? prev.filter((t) => t !== tone) : [...prev, tone],
    );
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    try {
      const formData = new FormData(event.currentTarget);
      const countInput = formData.get("count");
      const parsedCount =
        typeof countInput === "string" ? parseInt(countInput, 10) : count;
      const safeCount = Number.isNaN(parsedCount) ? count : parsedCount;
      formData.set("count", String(safeCount));
      const lengthInput = formData.get("length");
      const parsedLength =
        typeof lengthInput === "string" ? parseInt(lengthInput, 10) : length;
      const safeLength = Number.isNaN(parsedLength) ? length : parsedLength;
      formData.set("length", String(safeLength));
      const response = await handleGenerate(null, formData);
      if (!response) throw new Error("No response");
      let names: string[] = [];

      // Clean markdown if present
      try {
        const clean = response
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        console.log("Clean response:", clean);

        const names = clean
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean);
      } catch (err) {
        console.error("Parsing failed:", err);

        const names = response
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean);
      }
      console.log("Parsed names:", names);
      setResult(names);
    } catch (error) {
      console.error(error);
      setResult([
        "An error occurred while generating the name. Please try again.",
      ] as string[]);
    } finally {
      setIsPending(false);
    }
  };
  const lengthStyle =
    length <= 8 ? "Focused" : length <= 16 ? "Balanced" : "Expansive";

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-namelify-accent/10 to-transparent blur-2xl -z-10" />

      <div className="bg-namelify-card border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
            Name Your Vision.
          </h1>
          <p className="text-namelify-muted text-sm md:text-base max-w-sm mx-auto leading-relaxed">
            The Kinetic Editorial AI engine crafts names that resonate, disrupt,
            and endure.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Business Description */}
          <div>
            <label className="block text-[11px] font-semibold tracking-widest text-namelify-muted uppercase mb-2">
              Business Description
            </label>
            <textarea
              rows={4}
              name="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your brand's soul, mission, and unique frequency..."
              required
              className="w-full bg-namelify-input border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-namelify-muted/50 resize-none focus:outline-none focus:border-namelify-accent/50 focus:ring-1 focus:ring-namelify-accent/30 transition-all"
            />
          </div>

          {/* Industry + Length */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Industry Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold tracking-widest text-namelify-muted uppercase mb-2">
                Industry
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="w-full flex items-center justify-between bg-namelify-input border border-white/8 rounded-xl px-4 py-3 text-sm text-white hover:border-namelify-accent/40 transition-colors"
                >
                  {industry}
                  <ChevronDown
                    size={14}
                    className={`text-namelify-muted transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-namelify-panel border border-white/10 rounded-xl overflow-hidden z-10 shadow-xl">
                    {industries.map((ind) => (
                      <button
                        type="button"
                        key={ind}
                        onClick={() => {
                          setIndustry(ind);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          ind === industry
                            ? "bg-namelify-accent/20 text-namelify-accent"
                            : "text-namelify-muted hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Length Slider */}
            <div>
              <label className="block text-[11px] font-semibold tracking-widest text-namelify-muted uppercase mb-2">
                Name Variations
              </label>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">
                    {length} suggestions
                  </span>
                  <span className="rounded-full border border-namelify-accent/40 bg-namelify-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-namelify-accent">
                    {lengthStyle}
                  </span>
                </div>
                <input
                  type="range"
                  name="length"
                  min={4}
                  max={24}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full accent-namelify-accent cursor-pointer"
                />
                <div className="mt-2 flex items-center justify-between text-[11px] text-namelify-muted">
                  <span>Focused</span>
                  <span>Expansive</span>
                </div>
              </div>
            </div>
          </div>
          {/* Name Length (words per name) */}
          <div>
            <label className="block text-[11px] font-semibold tracking-widest text-namelify-muted uppercase mb-2">
              Name Length
            </label>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                  Words per name
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-namelify-muted">
                  {count} {count === 1 ? "Word" : "Words"}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {countOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setCount(option)}
                    className={`h-9 rounded-lg text-sm font-semibold border transition-all ${
                      count === option
                        ? "bg-namelify-accent border-namelify-accent text-white shadow-lg shadow-namelify-accent/20"
                        : "bg-transparent border-white/15 text-namelify-muted hover:border-namelify-accent/40 hover:text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-namelify-muted">
                Controls how many words each generated name should contain.
              </p>
            </div>
          </div>

          {/* Vocal Tone */}
          <div>
            <label className="block text-[11px] font-semibold tracking-widest text-namelify-muted uppercase mb-3">
              Vocal Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {tones.map((tone) => (
                <button
                  type="button"
                  key={tone}
                  onClick={() => toggleTone(tone)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    selectedTones.includes(tone)
                      ? "bg-namelify-accent border-namelify-accent text-white shadow-lg shadow-namelify-accent/20"
                      : "bg-transparent border-white/15 text-namelify-muted hover:border-namelify-accent/40 hover:text-white"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
          <input type="hidden" name="industry" value={industry} />
          <input
            type="hidden"
            name="tone"
            value={
              selectedTones.length ? selectedTones.join(", ") : "Minimalist"
            }
          />
          <input type="hidden" name="count" value={count} />

          {/* CTA */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 rounded-xl bg-linear-to-r from-namelify-accent to-violet-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-namelify-accent/25 disabled:opacity-70 cursor-pointer"
          >
            {isPending ? (
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
        </form>
        {result && (
          <div className="mt-6 rounded-xl border border-white/10 bg-namelify-panel p-4">
            <p className="text-[11px] font-semibold tracking-widest text-namelify-muted uppercase mb-2">
              Generated Names
            </p>
            {result.map((name: string) => (
              <div key={name}>
                <p className="text-sm text-namelify-muted">{name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
