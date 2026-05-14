"use client";

import { motion } from "framer-motion";
import { BookOpen, Video, PlayCircle } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Founder <span className="text-electric-cyan">Resources</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Books, guides, and videos to help you build data-driven startups from the ground up.
          </motion.p>
        </div>

        <div className="space-y-24">
          {/* Book 1: Basic Data Setup Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="w-full md:w-1/3">
              <div className="aspect-[3/4] rounded-xl bg-slate/50 border border-slate flex items-center justify-center overflow-hidden">
                <BookOpen className="w-20 h-20 text-electric-cyan/50" />
                {/* In a real scenario, use next/image to load /assets/images/book1-cover.jpg */}
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="text-electric-cyan text-sm font-semibold tracking-wider uppercase mb-2">Part 1</div>
              <h2 className="text-3xl font-bold text-white mb-6">Basic Data Setup Guide</h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                The definitive handbook designed to guide you confidently through the complexities of building a robust data foundation. Learn to master data pipelines, scalable infrastructure (BigQuery, Snowflake), and smart reporting (Looker, Tableau).
              </p>
              <div className="flex gap-4">
                <a href="https://a.co/d/gCwuHPW" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-electric-cyan text-obsidian font-semibold rounded-lg hover:bg-white transition-colors">
                  Amazon Kindle
                </a>
                <a href="https://books.apple.com/us/book/data-for-entrepreneurs-part-i-basic-data-setup-guide/id6740886315" target="_blank" rel="noopener noreferrer" className="px-6 py-3 glass border border-electric-cyan/30 text-white font-semibold rounded-lg hover:bg-electric-cyan/10 transition-colors">
                  Apple Books
                </a>
              </div>
            </div>
          </motion.div>

          {/* Book 2: AI Chatbot Builder's Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 flex flex-col md:flex-row-reverse gap-12 items-center"
          >
            <div className="w-full md:w-1/3">
              <div className="aspect-[3/4] rounded-xl bg-slate/50 border border-slate flex items-center justify-center overflow-hidden">
                <BookOpen className="w-20 h-20 text-electric-violet/50" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="text-electric-violet-light text-sm font-semibold tracking-wider uppercase mb-2">Part 2</div>
              <h2 className="text-3xl font-bold text-white mb-6">AI Chatbot Builder's Guide</h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                A practical playbook for startups to build smart AI chatbots. Demystifies the process of deploying a modern LLM-powered chatbot—from zero to launch. Covers RAG logic, FastAPI integration, and Google Cloud Run deployment.
              </p>
              <div className="flex gap-4">
                <a href="https://www.amazon.in/dp/B0FDS5XF2H" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-electric-violet-light text-white font-semibold rounded-lg hover:bg-electric-violet transition-colors">
                  Amazon Kindle
                </a>
                <a href="https://play.google.com/store/books/details?id=JgNnEQAAQBAJ" target="_blank" rel="noopener noreferrer" className="px-6 py-3 glass border border-electric-violet/30 text-white font-semibold rounded-lg hover:bg-electric-violet/10 transition-colors">
                  Google Books
                </a>
              </div>
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-10 flex items-center justify-center gap-3">
              <Video className="w-8 h-8 text-electric-cyan" /> Free Video Course
            </h2>
            <div className="max-w-4xl mx-auto glass-card p-4 aspect-video relative flex items-center justify-center group cursor-pointer border-[rgba(102,252,241,0.2)]">
              {/* Replace with actual embed if required */}
              <div className="absolute inset-0 bg-slate/80 flex flex-col items-center justify-center transition-all group-hover:bg-slate/60">
                <PlayCircle className="w-20 h-20 text-electric-cyan mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <h3 className="text-2xl font-bold text-white">Build a Pro-Level AI Chatbot at $0 Investment</h3>
                <p className="text-gray-300 mt-2">LLM, RAG & FastAPI • Zero 3rd Party Dependency</p>
              </div>
            </div>
            <a href="https://www.youtube.com/watch?v=NofI0hwgRxc" target="_blank" rel="noopener noreferrer" className="inline-block mt-8 px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-obsidian transition-colors">
              Watch Full Video on YouTube
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
