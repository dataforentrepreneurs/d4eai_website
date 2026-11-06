"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Lightbulb, Target, Sparkles, ExternalLink, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-electric-cyan/30 text-electric-cyan text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Mission & Leadership
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-violet">Data for Entrepreneurs</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Empowering early-stage founders, builders, and growth companies with practical data strategies and zero-vendor-lockin AI systems.
          </p>
        </motion.div>

        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 md:p-12 mb-12 border-electric-cyan/25"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Who We Are</h2>
          </div>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
            <strong>Data for Entrepreneurs</strong> is an education, consulting, and AI tooling platform dedicated to helping startups, emerging founders, and product teams make high-velocity, data-backed decisions.
          </p>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            We author bestselling implementation books, release open-source blueprints, and develop the DIAD (Data In A Day) platform, giving startups complete sovereignty over their data infrastructure and autonomous AI chatbots.
          </p>
        </motion.div>

        {/* What We Offer & Why Work With Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-electric-violet/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-electric-violet/20 text-electric-violet-light">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">What We Offer</h2>
            </div>
            <ul className="space-y-4 text-gray-300 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 bg-electric-violet rounded-full flex-shrink-0" />
                <span><strong>Startup Data Guides:</strong> Step-by-step blueprints for pipelines, warehouses, and metrics.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 bg-electric-violet rounded-full flex-shrink-0" />
                <span><strong>AI Chatbot Playbooks:</strong> Open-source, RAG-powered stacks running serverless on Cloud Run.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 bg-electric-violet rounded-full flex-shrink-0" />
                <span><strong>DIAD Engine:</strong> 1-click generation from store data to live conversational AI.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 bg-electric-violet rounded-full flex-shrink-0" />
                <span><strong>Founder Consulting:</strong> 1:1 architectural audits and strategic roadmap planning.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-electric-cyan/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-electric-cyan/10 text-electric-cyan">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Why Work With Us</h2>
            </div>
            <ul className="space-y-4 text-gray-300 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 bg-electric-cyan rounded-full flex-shrink-0" />
                <span><strong>Zero Vendor Lock-in:</strong> You own 100% of your code, data, models, and cloud credentials.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 bg-electric-cyan rounded-full flex-shrink-0" />
                <span><strong>Speed & Agility:</strong> Go live in days and weeks rather than burning quarters in R&D.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 bg-electric-cyan rounded-full flex-shrink-0" />
                <span><strong>Startup-Friendly Economics:</strong> Built for lean budgets, free tiers, and scalable serverless.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 bg-electric-cyan rounded-full flex-shrink-0" />
                <span><strong>Battle-Tested Leadership:</strong> 15+ years of production experience in high-growth companies.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Founder Bio: Nikhil Sahai */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 border-electric-cyan/30 relative overflow-hidden mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group max-w-[260px] w-full">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-electric-cyan to-electric-violet rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500" />
                <div className="relative rounded-2xl overflow-hidden border border-electric-cyan/40 bg-slate shadow-2xl">
                  <Image
                    src="/images/nik.png"
                    alt="Nikhil Sahai"
                    width={300}
                    height={380}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="inline-block px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-semibold tracking-wider uppercase mb-2">
                Author & Founder
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Nikhil Sahai</h2>
              <p className="text-electric-cyan font-mono text-sm mb-4">
                Master's in Business Analytics (SMU) • 15+ Years in Data & AI Leadership
              </p>
              
              <div className="space-y-3 text-gray-300 text-sm md:text-base leading-relaxed">
                <p>
                  Nikhil Sahai is a seasoned data analytics leader with extensive experience driving business growth across media-streaming, e-commerce, retail, and tech. Over the past decade, he has specialized in architecting scalable data systems from zero to IPO-readiness.
                </p>
                <p>
                  As the author of the <em>Data for Entrepreneurs</em> series (Basic Data Setup Guide and AI Chatbot Builder's Guide), Nikhil translates intricate engineering concepts into practical, founder-friendly playbooks.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-slate">
                <a
                  href="https://www.linkedin.com/in/nikhilsahai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-electric-cyan transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-electric-cyan" />
                  Connect on LinkedIn
                </a>
                <a
                  href="http://www.nikhilsahai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-electric-cyan transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-electric-cyan" />
                  Visit Personal Website
                </a>
              </div>
            </div>

          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric-cyan to-electric-violet text-obsidian font-bold hover:shadow-[0_0_30px_rgba(102,252,241,0.4)] transition-all"
          >
            Explore Founder Resources & Books <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
