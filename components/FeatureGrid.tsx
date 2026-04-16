import { Brain, Globe, Layers, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Neural Semantics",
    description:
      "Our AI doesn't just combine words; it understands the cultural weight and phonetic resonance of every syllable.",
    wide: true,
    gradient: "from-violet-600/20 via-namelify-accent/10 to-transparent",
    accent: "text-violet-400",
  },
  {
    icon: Globe,
    title: "Domain Sync",
    description: "Real-time availability for .com, .ai, and .io",
    wide: false,
    gradient: "from-sky-600/15 to-transparent",
    accent: "text-sky-400",
  },
  {
    icon: Layers,
    title: "Brand Kits",
    description: "Instantly generate logos & palettes for your new name.",
    wide: false,
    gradient: "from-fuchsia-600/15 to-transparent",
    accent: "text-fuchsia-400",
  },
];

export default function FeatureGrid() {
  return (
    <section className="max-w-4xl mx-auto w-full pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Neural Semantics - wide on desktop */}
        <div
          className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/25 lg:col-span-2`}
        >
          <div
            className={`absolute inset-0 bg-linear-to-br ${features[0].gradient} opacity-60`}
          />
          <div className="relative z-10">
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-surface ${features[0].accent}`}
            >
              <Brain size={20} />
            </div>
            <h3 className="mb-2 font-heading text-lg font-black text-heading">
              {features[0].title}
            </h3>
            <p className="text-sm leading-relaxed text-body">
              {features[0].description}
            </p>
          </div>
        </div>

        {/* Domain Sync */}
        <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-sky-400/30">
          <div className="absolute inset-0 bg-linear-to-br from-sky-600/15 to-transparent opacity-60" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sky-400/10 text-sky-400">
              <Globe size={22} />
            </div>
            <h3 className="mb-1 font-heading text-base font-black text-heading">
              Domain Sync
            </h3>
            <p className="text-xs leading-relaxed text-body">
              Real-time availability for .com, .ai, and .io
            </p>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Brand Kits */}
        <div className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-fuchsia-400/30">
          <div className="absolute inset-0 bg-linear-to-r from-fuchsia-600/15 to-transparent opacity-60" />
          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fuchsia-400/10 text-fuchsia-400">
            <Layers size={22} />
          </div>
          <div className="relative z-10">
            <h3 className="mb-1 font-heading text-base font-black text-heading">Brand Kits</h3>
            <p className="text-xs leading-relaxed text-body">
              Instantly generate logos & palettes for your new name.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-accent/20 bg-linear-to-br from-accent-dim to-primary-glow p-6 transition-all duration-300 hover:border-accent/45">
          <div>
            <h3 className="mb-1 font-heading text-lg font-black text-heading">
              Join 10k+ Creators
            </h3>
            <p className="text-xs text-body">
              Ready to define your space in the market?
            </p>
          </div>
          <button className="mt-4 flex self-start items-center gap-2 rounded-xl bg-heading px-5 py-2.5 text-sm font-bold text-bg transition-all hover:bg-accent hover:text-on-primary group-hover:shadow-lg">
            Get Started
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
