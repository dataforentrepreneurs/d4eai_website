"use client";

import { motion } from "framer-motion";
import { Users, Lightbulb, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-gray-400">
            Empowering startups with data strategies that scale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-10 mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <Users className="w-8 h-8 text-electric-cyan" />
            <h2 className="text-2xl font-bold text-white">Who We Are</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            <strong>Data for Entrepreneurs</strong> is a platform dedicated to helping startups, small businesses, and emerging founders make smarter decisions through data.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            We provide books, consulting services, and AI tools that enable founders to build foundational data systems and production-ready chatbots using open-source technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-electric-violet/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <Lightbulb className="w-8 h-8 text-electric-violet-light" />
              <h2 className="text-2xl font-bold text-white">What We Offer</h2>
            </div>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-electric-violet rounded-full" />
                Step-by-step startup-focused data guides
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-electric-violet rounded-full" />
                AI chatbot playbooks and open-source stacks
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-electric-violet rounded-full" />
                1:1 consulting for founders & teams
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-electric-violet rounded-full" />
                Production Agentic Intelligence infrastructure
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-electric-cyan/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <Target className="w-8 h-8 text-electric-cyan" />
              <h2 className="text-2xl font-bold text-white">Why Work With Us</h2>
            </div>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-electric-cyan rounded-full" />
                No dependency on third-party tools
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-electric-cyan rounded-full" />
                Speed — Go live in weeks, not months
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-electric-cyan rounded-full" />
                Startup-friendly, scalable pricing
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-electric-cyan rounded-full" />
                Proven leadership — 15+ years of experience
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
