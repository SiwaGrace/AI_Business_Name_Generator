import { Brain, Globe, Layers, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Neural Semantics",
    description:
      "Our AI doesn't just combine words; it understands the cultural weight and phonetic resonance of every syllable.",
    layout: "wide",
    gradient: "from-violet-600/20 via-namelify-accent/10 to-transparent",
    accent: "text-violet-400",
    iconBg: "bg-surface",
    iconSize: 20,
    titleSize: "text-lg",
    descSize: "text-sm",
  },
  {
    icon: Globe,
    title: "Domain Sync",
    description: "Real-time availability for .com, .ai, and .io",
    layout: "center",
    gradient: "from-sky-600/15 to-transparent",
    accent: "text-sky-400",
    iconBg: "bg-sky-400/10",
    iconSize: 22,
    titleSize: "text-base",
    descSize: "text-xs",
  },
  {
    icon: Layers,
    title: "Brand Kits",
    description: "Instantly generate logos & palettes for your new name.",
    layout: "horizontal",
    gradient: "from-fuchsia-600/15 to-transparent",
    accent: "text-fuchsia-400",
    iconBg: "bg-fuchsia-400/10",
    iconSize: 22,
    titleSize: "text-base",
    descSize: "text-xs",
  },
];

export default function FeatureGrid() {
  return (
    <section className="max-w-4xl mx-auto w-full pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {features.slice(0, 2).map((feature, index) => (
          <div
            key={feature.title}
            className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/25 ${
              feature.layout === "wide" ? "lg:col-span-2" : ""
            } ${feature.layout === "center" ? "flex flex-col items-center justify-center text-center" : ""}`}
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-60`}
            />
            <div className="relative z-10">
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${feature.iconBg} ${feature.accent} ${
                  feature.layout === "center"
                    ? "h-12 w-12 rounded-full mb-3"
                    : ""
                }`}
              >
                <feature.icon size={feature.iconSize} />
              </div>
              <h3
                className={`mb-2 font-heading font-black text-heading ${feature.titleSize} ${
                  feature.layout === "center" ? "mb-1" : ""
                }`}
              >
                {feature.title}
              </h3>
              <p className={`leading-relaxed text-body ${feature.descSize}`}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.slice(2).map((feature) => (
          <div
            key={feature.title}
            className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/25 ${
              feature.layout === "horizontal" ? "flex items-center gap-5" : ""
            }`}
          >
            <div
              className={`absolute inset-0 bg-linear-to-r ${feature.gradient} opacity-60`}
            />
            <div className="relative z-10">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${feature.iconBg} ${feature.accent} ${
                  feature.layout === "horizontal" ? "mb-0" : "mb-4"
                }`}
              >
                <feature.icon size={feature.iconSize} />
              </div>
              <div
                className={feature.layout === "horizontal" ? "" : "text-center"}
              >
                <h3
                  className={`font-heading font-black text-heading ${feature.titleSize} ${
                    feature.layout === "horizontal" ? "mb-1" : "mb-2"
                  }`}
                >
                  {feature.title}
                </h3>
                <p className={`leading-relaxed text-body ${feature.descSize}`}>
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}

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
