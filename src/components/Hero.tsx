"use client";

import { motion } from "framer-motion";
import { Sparkles, Gamepad2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full glass border border-neon-purple/30 text-neon-purple text-sm font-semibold tracking-wide uppercase"
        >
          Data for Everyone
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          <span className="text-white">Turn data into </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-violet to-neon-purple">
            intelligent agents instantly
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
        >
          Visualize, communicate, and iterate on AI pipelines in minutes. 
          Empower your team with Agentic Data Intelligence!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative max-w-3xl mx-auto mb-8"
        >
          <div className="flex items-center bg-white rounded-full p-2 pl-6 shadow-[0_0_40px_rgba(178,0,255,0.3)] transition-all hover:shadow-[0_0_60px_rgba(178,0,255,0.5)]">
            <input 
              type="text" 
              placeholder="An agentic data pipeline in playful yellow..."
              className="flex-1 bg-transparent border-none outline-none text-gray-900 text-lg w-full"
            />
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-electric-violet to-neon-purple text-white font-bold text-lg hover:opacity-90 transition-opacity">
              <Sparkles className="w-5 h-5" /> Generate
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <a
            href="https://play.d4e.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-neon-purple/50 text-white font-medium hover:bg-neon-purple/10 transition-colors"
          >
            <Gamepad2 className="w-5 h-5 text-neon-purple" />
            Looking to unwind? Check out the <span className="font-bold text-neon-purple">Party Games Hub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
