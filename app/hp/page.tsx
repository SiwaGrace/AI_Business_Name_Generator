import Link from "next/link";
import { Zap, Star, Globe, ArrowRight, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Names",
    description:
      "Describe your idea and get tailored name suggestions based on your industry, tone, and style.",
    accent: "text-primary",
    glow: "bg-primary/10",
  },
  {
    icon: Globe,
    title: "Domain Availability",
    description:
      "Instantly check if your favourite name's .com, .ai, or .io domain is available — right in the app.",
    accent: "text-accent",
    glow: "bg-accent/10",
  },
  {
    icon: Star,
    title: "Save Favourites",
    description:
      "Star the names you love and build a curated collection you can come back to anytime.",
    accent: "text-primary",
    glow: "bg-primary/10",
  },
];

const examples = [
  { name: "Velocean", tag: "Tech & Marine", dot: "bg-emerald-400" },
  { name: "Novalux", tag: "Fintech", dot: "bg-primary" },
  { name: "AquaBloom", tag: "Sustainability", dot: "bg-emerald-400" },
  { name: "Kryptalis", tag: "Web3", dot: "bg-accent" },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "var(--bg)", color: "var(--text-body)" }}
    >
      {/* Background mesh */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
          style={{ backgroundColor: "var(--accent)" }}
        />
      </div>

      {/* Nav */}
      <nav
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <span
          className="text-xl font-black tracking-tight"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-heading)",
          }}
        >
          Nomina<span style={{ color: "var(--primary)" }}>AI</span>
        </span>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/generate"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--text-heading)",
            }}
          >
            <Zap size={14} />
            Try It Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-20">
        {/* Badge */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8 border"
          style={{
            backgroundColor: "var(--primary-glow)",
            borderColor: "var(--border-hover)",
            color: "var(--primary)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--primary)" }}
          />
          Powered by Gemini 2.5 Flash
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-4xl"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-heading)",
          }}
        >
          Stop Wasting Hours <br className="hidden md:block" />
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Naming Your Project.
          </span>
        </h1>

        <p
          className="text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          Describe your idea. Get AI-generated names tailored to your industry
          and tone — with domain availability checked instantly.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/generate"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all hover:opacity-90 active:scale-[0.98] shadow-xl"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--primary-dim) 100%)",
              color: "#f0ebff",
              boxShadow: "0 8px 32px var(--primary-glow)",
            }}
          >
            <Zap size={18} />
            Generate Names Free
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-medium border transition-all hover:border-[var(--border-hover)]"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            See how it works
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Example names preview */}
      <section className="relative z-10 flex justify-center px-6 pb-20">
        <div
          className="w-full max-w-lg rounded-2xl border p-5 shadow-2xl"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "0 0 60px var(--primary-glow)",
          }}
        >
          {/* Mock terminal bar */}
          <div
            className="flex items-center gap-2 mb-4 pb-4 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span
              className="text-xs ml-2"
              style={{ color: "var(--text-faint)", fontFamily: "monospace" }}
            >
              generated_names.json
            </span>
          </div>
          <div className="space-y-2">
            {examples.map((ex) => (
              <div
                key={ex.name}
                className="flex items-center justify-between px-4 py-3 rounded-xl border transition-colors hover:border-[var(--border-hover)]"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${ex.dot}`} />
                  <span
                    className="font-bold text-sm"
                    style={{
                      color: "var(--text-heading)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {ex.name}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {ex.tag}
                  </span>
                </div>
                <Star
                  size={13}
                  style={{ color: "var(--primary)" }}
                  fill="currentColor"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="relative z-10 px-6 md:px-12 pb-24 max-w-5xl mx-auto"
        id="how-it-works"
      >
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--primary)" }}
          >
            What You Get
          </p>
          <h2
            className="text-3xl md:text-4xl font-black"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-heading)",
            }}
          >
            Everything you need to find the right name.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="relative rounded-2xl border p-6 transition-all hover:shadow-lg group"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.glow} ${f.accent}`}
              >
                <f.icon size={20} />
              </div>
              <h3
                className="text-base font-bold mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-heading)",
                }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 px-6 pb-24">
        <div
          className="max-w-3xl mx-auto rounded-3xl p-10 text-center border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-card) 100%)",
            borderColor: "var(--border-hover)",
            boxShadow: "0 0 80px var(--primary-glow)",
          }}
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, var(--primary-glow) 0%, transparent 70%)",
            }}
          />
          <h2
            className="text-3xl md:text-4xl font-black mb-4 relative z-10"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-heading)",
            }}
          >
            Ready to name your vision?
          </h2>
          <p
            className="text-base mb-8 relative z-10"
            style={{ color: "var(--text-muted)" }}
          >
            Free to use. No account needed. Just describe your idea and go.
          </p>
          <Link
            href="/generate"
            className="relative z-10 inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, var(--primary), var(--primary-dim))",
              color: "#f0ebff",
              boxShadow: "0 8px 32px var(--primary-glow)",
            }}
          >
            <Zap size={18} />
            Start Generating
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 text-center py-8 text-xs border-t tracking-widest uppercase"
        style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
      >
        NominaAI · Powered by Gemini · Built for Makers
      </footer>
    </div>
  );
}
