import ThreeBackground from "@/components/ThreeBackground";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import FeaturedResources from "@/components/FeaturedResources";
import ApiSnippet from "@/components/ApiSnippet";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <div className="relative">
        <Hero />
        <FeatureCards />
        <FeaturedResources />
        <ApiSnippet />
        <Testimonials />

        {/* Bottom CTA */}
        <section className="py-24 relative z-10 text-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-12 md:p-16 border-electric-cyan/30 relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-electric-cyan/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-electric-violet/20 rounded-full blur-[100px] pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-electric-cyan/30 text-electric-cyan text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Start Building Today
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                Ready to Empower Your Startup with Data & AI?
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Whether you are exploring our bestselling books, watching our zero-cost chatbot masterclass, or deploying DIAD in your cloud, take the next step toward a data-driven future.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/resources"
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric-cyan to-electric-cyan-dim text-obsidian font-bold text-base hover:shadow-[0_0_30px_rgba(102,252,241,0.5)] transition-all"
                >
                  Explore Resources & Books
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-colors"
                >
                  Book 1:1 Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
