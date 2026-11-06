"use client";

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-obsidian overflow-hidden pointer-events-none select-none">
      {/* Engineered fine dot matrix grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 25%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 25%, black 40%, transparent 100%)",
        }}
      />

      {/* Subtle top ambient diffused illumination - calm & static */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-electric-cyan/10 via-electric-violet/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle side accent glows */}
      <div className="absolute top-1/3 -left-48 w-[400px] h-[400px] bg-electric-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-48 w-[400px] h-[400px] bg-electric-violet/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Soft gradient floor to ground content */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
