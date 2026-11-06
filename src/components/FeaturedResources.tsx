"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Video, ArrowRight, Sparkles, Star } from "lucide-react";

export default function FeaturedResources() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-electric-cyan/30 text-electric-cyan text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Essential Reading & Masterclasses
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-violet">Resources</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
            Practical playbooks, blueprints, and step-by-step videos to help you build resilient startup data pipelines and autonomous AI chatbots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Book 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 flex flex-col justify-between group glass-card-hover border-electric-cyan/30"
          >
            <div>
              <div className="relative aspect-[3/4] w-full max-w-[220px] mx-auto rounded-xl overflow-hidden shadow-2xl mb-6 bg-slate">
                <Image
                  src="/images/book1-cover.jpg"
                  alt="Basic Data Setup Guide"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="flex items-center gap-1 text-electric-cyan text-xs font-semibold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" /> Part 1 • Handbook
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Basic Data Setup Guide</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Build clean automated pipelines, warehouses (BigQuery/Snowflake), and executive reporting from scratch.
              </p>
            </div>

            <Link
              href="/resources#basic_data_setup_book"
              className="w-full py-2.5 px-4 rounded-lg bg-electric-cyan/10 hover:bg-electric-cyan text-electric-cyan hover:text-obsidian font-semibold text-sm transition-all text-center flex items-center justify-center gap-1.5 border border-electric-cyan/30"
            >
              Explore Book 1 <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 2: Video Masterclass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 flex flex-col justify-between group glass-card-hover border-electric-cyan/30 relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-electric-cyan text-obsidian text-[10px] font-bold uppercase tracking-wider">
              Free Course
            </div>
            <div>
              <div className="relative aspect-[3/4] w-full max-w-[220px] mx-auto rounded-xl overflow-hidden shadow-2xl mb-6 bg-slate">
                <Image
                  src="/images/video-thumbnail.jpg"
                  alt="AI Chatbot Explainer Video"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="flex items-center gap-1 text-electric-cyan text-xs font-semibold uppercase tracking-wider mb-2">
                <Video className="w-3.5 h-3.5" /> 22-Min Video Masterclass
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Chatbot at $0 Investment</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Step-by-step walkthrough of LLM integration, Pinecone RAG, FastAPI backend, and Google Cloud Run deployment.
              </p>
            </div>

            <Link
              href="/resources#build_ai_chatbot_at_no_invest"
              className="w-full py-2.5 px-4 rounded-lg bg-electric-cyan text-obsidian hover:bg-white font-bold text-sm transition-all text-center flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(102,252,241,0.3)]"
            >
              Watch Video Course <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 3: Book 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 flex flex-col justify-between group glass-card-hover border-electric-violet/30"
          >
            <div>
              <div className="relative aspect-[3/4] w-full max-w-[220px] mx-auto rounded-xl overflow-hidden shadow-2xl mb-6 bg-slate">
                <Image
                  src="/images/book2-cover.jpg"
                  alt="AI Chatbot Builder's Guide"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="flex items-center gap-1 text-electric-violet-light text-xs font-semibold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" /> Part 2 • Playbook
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Chatbot Builder's Guide</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                End-to-end blueprint for launching proprietary RAG-based chatbots without third-party platform lock-in.
              </p>
            </div>

            <Link
              href="/resources#build_ai_chatbot_book"
              className="w-full py-2.5 px-4 rounded-lg bg-electric-violet/20 hover:bg-electric-violet text-electric-violet-light hover:text-white font-semibold text-sm transition-all text-center flex items-center justify-center gap-1.5 border border-electric-violet/40"
            >
              Explore Book 2 <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

