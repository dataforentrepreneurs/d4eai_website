"use client";

import { motion } from "framer-motion";
import { Gamepad2, ArrowRight } from "lucide-react";

export default function PlayPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-12 max-w-3xl mx-auto border-electric-violet/30"
        >
          <div className="w-20 h-20 mx-auto bg-electric-violet/20 rounded-full flex items-center justify-center mb-8 border border-electric-violet/50">
            <Gamepad2 className="w-10 h-10 text-electric-violet-light" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Party Games Hub</h1>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            Experience our interactive multiplayer games hub powered by real-time agentic data streams and WebSockets. The ultimate party experience brought to you by Data for Entrepreneurs.
          </p>
          <a
            href="https://play.d4e.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-electric-violet text-white font-bold text-lg hover:bg-electric-violet-light transition-colors group"
          >
            Launch Play.d4e.ai
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
