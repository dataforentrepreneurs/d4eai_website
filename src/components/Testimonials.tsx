"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Team's approach to data strategy is revolutionary. Our startup has seen tangible improvements in our decision-making and product telemetry from week one.",
    author: "Alex R.",
    role: "CEO & Co-Founder",
    company: "SaaS Analytics Startup",
  },
  {
    quote:
      "The insights provided in both the books and DIAD transformed our approach to customer AI. A must-read and must-use platform for any ambitious entrepreneur.",
    author: "Priya S.",
    role: "Founder & Product Lead",
    company: "Fintech Scaleup",
  },
  {
    quote:
      "From consulting to zero-lockin execution, the expertise shared by Data for Entrepreneurs has been instrumental in keeping our cloud costs low while scaling AI models.",
    author: "Michael T.",
    role: "Head of Data Engineering",
    company: "Commerce Platform",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative z-10 border-t border-[rgba(102,252,241,0.06)] bg-obsidian/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Trusted by <span className="text-electric-cyan">Founders & Builders</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            See how startups leverage our architecture guides, books, and DIAD platform to scale with clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 flex flex-col justify-between group glass-card-hover border-electric-cyan/20"
            >
              <div>
                <div className="flex items-center gap-1 text-electric-cyan mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-electric-cyan/30 mb-4" />
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate">
                <div className="font-bold text-white text-sm">{item.author}</div>
                <div className="text-xs text-electric-cyan-dim">{item.role}</div>
                <div className="text-xs text-gray-500">{item.company}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
