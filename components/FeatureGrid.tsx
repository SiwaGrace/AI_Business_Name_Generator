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
          className={`lg:col-span-2 relative overflow-hidden bg-namelify-card border border-white/8 rounded-2xl p-6 hover:border-namelify-accent/30 transition-all duration-300 group`}
        >
          <div
            className={`absolute inset-0 bg-linear-to-br ${features[0].gradient} opacity-60`}
          />
          <div className="relative z-10">
            <div
              className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${features[0].accent}`}
            >
              <Brain size={20} />
            </div>
            <h3 className="text-lg font-black text-white mb-2">
              {features[0].title}
            </h3>
            <p className="text-sm text-namelify-muted leading-relaxed">
              {features[0].description}
            </p>
          </div>
        </div>

        {/* Domain Sync */}
        <div className="relative overflow-hidden bg-namelify-card border border-white/8 rounded-2xl p-6 hover:border-sky-400/30 transition-all duration-300 group text-center flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-linear-to-br from-sky-600/15 to-transparent opacity-60" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-sky-400/10 flex items-center justify-center text-sky-400 mb-3">
              <Globe size={22} />
            </div>
            <h3 className="text-base font-black text-white mb-1">
              Domain Sync
            </h3>
            <p className="text-xs text-namelify-muted leading-relaxed">
              Real-time availability for .com, .ai, and .io
            </p>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Brand Kits */}
        <div className="relative overflow-hidden bg-namelify-card border border-white/8 rounded-2xl p-6 hover:border-fuchsia-400/30 transition-all duration-300 group flex items-center gap-5">
          <div className="absolute inset-0 bg-linear-to-r from-fuchsia-600/15 to-transparent opacity-60" />
          <div className="relative z-10 w-12 h-12 rounded-full bg-fuchsia-400/10 flex items-center justify-center text-fuchsia-400 shrink-0">
            <Layers size={22} />
          </div>
          <div className="relative z-10">
            <h3 className="text-base font-black text-white mb-1">Brand Kits</h3>
            <p className="text-xs text-namelify-muted leading-relaxed">
              Instantly generate logos & palettes for your new name.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden bg-linear-to-br from-namelify-accent/20 to-violet-600/20 border border-namelify-accent/20 rounded-2xl p-6 flex flex-col justify-between hover:border-namelify-accent/50 transition-all duration-300 group">
          <div>
            <h3 className="text-lg font-black text-white mb-1">
              Join 10k+ Creators
            </h3>
            <p className="text-xs text-namelify-muted">
              Ready to define your space in the market?
            </p>
          </div>
          <button className="mt-4 self-start flex items-center gap-2 px-5 py-2.5 bg-white text-namelify-dark rounded-xl text-sm font-bold hover:bg-namelify-accent hover:text-white transition-all group-hover:shadow-lg">
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
