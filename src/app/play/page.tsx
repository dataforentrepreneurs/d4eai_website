"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Radio, ArrowUpRight, Sparkles } from "lucide-react";

export default function PlayPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-14 max-w-4xl mx-auto border-white/15 relative overflow-hidden"
        >
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-electric-cyan/30 text-electric-cyan text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Experimental AI Showcase • Powered by d4e
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            AI Games & <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-violet">Interactive Lab</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            An applied demonstration of Data for Entrepreneurs' real-time agentic architecture. We push the boundaries of multi-agent coordination, sub-50ms WebSocket synchronization, and dynamic LLM game masters.
          </p>

          {/* Technical feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
            <div className="p-4 rounded-xl bg-slate/50 border border-white/10">
              <Radio className="w-5 h-5 text-electric-cyan mb-2" />
              <div className="text-sm font-bold text-white mb-1">Real-Time WebSockets</div>
              <div className="text-xs text-gray-400">
                Sub-50ms state synchronization across distributed multiplayer sessions.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate/50 border border-white/10">
              <Cpu className="w-5 h-5 text-electric-violet-light mb-2" />
              <div className="text-sm font-bold text-white mb-1">Agentic Game Masters</div>
              <div className="text-xs text-gray-400">
                LLM-driven rulesets, adaptive storytelling, and dynamic challenge generation.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate/50 border border-white/10">
              <Zap className="w-5 h-5 text-electric-cyan mb-2" />
              <div className="text-sm font-bold text-white mb-1">Serverless Scaling</div>
              <div className="text-xs text-gray-400">
                Cloud Run and zero-custody container scaling with automated load distribution.
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://play.d4e.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric-cyan to-electric-cyan-dim text-obsidian font-bold text-base hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all"
            >
              Launch AI Games Lab
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href="/diad"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Learn about the underlying DIAD stack
            </a>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
