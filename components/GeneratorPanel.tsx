"use client";

import { useState, type FormEvent } from "react";
import { Zap, ChevronDown } from "lucide-react";
import { handleGenerate } from "@/actions/generateNameAction";

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

type Props = {
  onResult: (result: string[] | string) => void;
  onPending: (pending: boolean) => void;
  isPending: boolean;
  onSearch?: (searchData: {
    description: string;
    industry: string;
    count: number;
    length: number;
    tone: string;
  }) => void;
};

export default function GeneratorPanel({
  onResult,
  onPending,
  isPending,
  onSearch,
}: Props) {
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("Fintech & Web3");
  const [count, setCount] = useState(2);
  const [length, setLength] = useState(12);
  const [selectedTones, setSelectedTones] = useState<string[]>(["Minimalist"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const lengthStyle =
    length <= 8 ? "Focused" : length <= 16 ? "Balanced" : "Expansive";

  const toggleTone = (tone: string) => {
    setSelectedTones((prev) =>
      prev.includes(tone) ? prev.filter((t) => t !== tone) : [...prev, tone],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onPending(true);
    try {
      const formData = new FormData(event.currentTarget);

      const parsedCount = parseInt(formData.get("count") as string, 10);
      formData.set(
        "count",
        String(Number.isNaN(parsedCount) ? count : parsedCount),
      );

      const parsedLength = parseInt(formData.get("length") as string, 10);
      formData.set(
        "length",
        String(Number.isNaN(parsedLength) ? length : parsedLength),
      );

      const response = await handleGenerate(null, formData);
      if (!response) throw new Error("No response");

      // Call onSearch with form data
      if (onSearch) {
        onSearch({
          description: formData.get("text") as string,
          industry: formData.get("industry") as string,
          count: parsedCount || count,
          length: parsedLength || length,
          tone: formData.get("tone") as string,
        });
      }

      onResult(response);
    } catch (error) {
      console.error(error);
      onResult(
        "An error occurred while generating the name. Please try again.",
      );
    } finally {
      onPending(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-b from-primary-glow to-transparent blur-2xl" />

      <div className="shadow-theme-card rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="mb-2 font-heading text-3xl font-black tracking-tight text-heading md:text-4xl">
            Name Your Vision.
          </h1>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-body md:text-base">
            The Kinetic Editorial AI engine crafts names that resonate, disrupt,
            and endure.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Business Description */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-muted">
              Business Description
            </label>
            <textarea
              rows={4}
              name="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your brand's soul, mission, and unique frequency..."
              required
              className="w-full resize-none rounded-xl border border-border bg-input px-4 py-3 text-sm text-body placeholder:text-muted/65 transition-all focus:border-primary/45 focus:outline-none focus:ring-1 focus:ring-primary-glow"
            />
          </div>

          {/* Industry + Suggestions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-muted">
                Industry
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-input px-4 py-3 text-sm text-body transition-colors hover:border-primary/35"
                >
                  {industry}
                  <ChevronDown
                    size={14}
                    className={`text-muted transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="shadow-theme-card absolute top-full right-0 left-0 z-10 mt-1 overflow-hidden rounded-xl border border-border bg-surface">
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
                            ? "bg-accent-dim text-accent"
                            : "text-muted hover:bg-card hover:text-heading"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-muted">
                Name Variations
              </label>
              <div className="rounded-xl border border-border bg-surface px-4 py-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-heading">
                    {length} suggestions
                  </span>
                  <span className="rounded-full border border-accent/35 bg-accent-dim px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
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
                  className="w-full cursor-pointer accent-primary"
                />
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
                  <span>Focused</span>
                  <span>Expansive</span>
                </div>
              </div>
            </div>
          </div>

          {/* Name Length */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-muted">
              Name Length
            </label>
            <div className="rounded-xl border border-border bg-surface px-4 py-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-heading">
                  Words per name
                </span>
                <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
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
                        ? "border-accent bg-accent text-on-primary shadow-lg shadow-accent/20"
                        : "border-border bg-transparent text-muted hover:border-primary/35 hover:text-heading"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-muted">
                Controls how many words each generated name should contain.
              </p>
            </div>
          </div>

          {/* Vocal Tone */}
          <div>
            <label className="mb-3 block text-[11px] font-semibold uppercase tracking-widest text-muted">
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
                      ? "border-accent bg-accent text-on-primary shadow-lg shadow-accent/20"
                      : "bg-transparent border-border text-muted hover:border-primary/35 hover:text-heading"
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

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-accent py-3.5 text-sm font-bold text-on-primary shadow-lg shadow-primary-glow transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary/30 border-t-on-primary" />
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
      </div>
    </div>
  );
}
