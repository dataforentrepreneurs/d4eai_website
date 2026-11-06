"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Video,
  PlayCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Cloud,
  Code2,
  ShoppingBag,
  Clock,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

interface Chapter {
  time: number;
  timeStr: string;
  title: string;
  category?: string;
}

const chapters: Chapter[] = [
  { time: 0, timeStr: "0:00", title: "Introduction", category: "Intro" },
  { time: 72, timeStr: "1:12", title: "Key reason to stick around", category: "Intro" },
  { time: 116, timeStr: "1:56", title: "(Chapter 1) Foundation & Architecture", category: "Chapter 1" },
  { time: 133, timeStr: "2:13", title: "Purpose & Value Proposition", category: "Chapter 1" },
  { time: 152, timeStr: "2:32", title: "Startup Strategy", category: "Chapter 1" },
  { time: 192, timeStr: "3:12", title: "Core LLM Concepts", category: "Chapter 1" },
  { time: 260, timeStr: "4:20", title: "High-level View", category: "Chapter 1" },
  { time: 317, timeStr: "5:17", title: "(Chapter 2) Backend Integration", category: "Chapter 2" },
  { time: 340, timeStr: "5:40", title: "FastAPI Project Setup", category: "Chapter 2" },
  { time: 400, timeStr: "6:40", title: "RAG Setup with Pinecone", category: "Chapter 2" },
  { time: 539, timeStr: "8:59", title: "LLM Setup (Mistral / Gemini)", category: "Chapter 2" },
  { time: 592, timeStr: "9:52", title: "Injecting RAG Context into LLM", category: "Chapter 2" },
  { time: 635, timeStr: "10:35", title: "Fallback & Resilience Strategy", category: "Chapter 2" },
  { time: 737, timeStr: "12:17", title: "(Chapter 3) Cloud Deployment with GCP", category: "Chapter 3" },
  { time: 781, timeStr: "13:01", title: "Dockerizing FastAPI App", category: "Chapter 3" },
  { time: 837, timeStr: "13:57", title: "Pushing to Google Artifact Registry", category: "Chapter 3" },
  { time: 848, timeStr: "14:08", title: "Deploying to Google Cloud Run", category: "Chapter 3" },
  { time: 900, timeStr: "15:00", title: "Testing Production Endpoint", category: "Chapter 3" },
  { time: 950, timeStr: "15:50", title: "Optional Add-ons & Monitoring", category: "Chapter 3" },
  { time: 1020, timeStr: "17:00", title: "(Chapter 4) Frontend Integration", category: "Chapter 4" },
  { time: 1026, timeStr: "17:06", title: "Chatbot Placement Strategies", category: "Chapter 4" },
  { time: 1068, timeStr: "17:48", title: "Choosing Frontend Stack", category: "Chapter 4" },
  { time: 1123, timeStr: "18:43", title: "React Live Demo", category: "Chapter 4" },
  { time: 1267, timeStr: "21:07", title: "(Chapter 5) Wrap-Up & Roadmap", category: "Chapter 5" },
];

export default function ResourcesPage() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "video" | "book1" | "book2">("all");
  const [activeChapter, setActiveChapter] = useState<Chapter>(chapters[0]);
  const [isToc1Open, setIsToc1Open] = useState(false);
  const [isToc2Open, setIsToc2Open] = useState(false);

  const videoSrc = `https://www.youtube.com/embed/NofI0hwgRxc?enablejsapi=1&start=${activeChapter.time}&autoplay=1`;

  const handleSelectChapter = (ch: Chapter) => {
    setActiveChapter(ch);
  };

  return (
    <div className="min-h-screen py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-electric-cyan/30 text-electric-cyan text-sm font-semibold tracking-wide uppercase mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Knowledge Base for Founders & Builders
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            Founder <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-violet">Resources</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Bestselling books, hands-on production code guides, and video masterclasses designed to help you construct resilient data foundations and intelligent AI agents.
          </motion.p>

          {/* Quick Filter Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === "all"
                  ? "bg-electric-cyan text-obsidian shadow-[0_0_20px_rgba(102,252,241,0.4)]"
                  : "glass text-gray-300 hover:text-white hover:border-electric-cyan/40"
              }`}
            >
              All Resources
            </button>
            <button
              onClick={() => setSelectedFilter("video")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedFilter === "video"
                  ? "bg-electric-cyan text-obsidian shadow-[0_0_20px_rgba(102,252,241,0.4)]"
                  : "glass text-gray-300 hover:text-white hover:border-electric-cyan/40"
              }`}
            >
              <Video className="w-4 h-4" /> Free Video Course
            </button>
            <button
              onClick={() => setSelectedFilter("book1")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedFilter === "book1"
                  ? "bg-electric-cyan text-obsidian shadow-[0_0_20px_rgba(102,252,241,0.4)]"
                  : "glass text-gray-300 hover:text-white hover:border-electric-cyan/40"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Part 1: Data Setup Guide
            </button>
            <button
              onClick={() => setSelectedFilter("book2")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedFilter === "book2"
                  ? "bg-electric-violet text-white shadow-[0_0_20px_rgba(178,0,255,0.4)]"
                  : "glass text-gray-300 hover:text-white hover:border-electric-violet/40"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Part 2: AI Chatbot Guide
            </button>
          </div>
        </div>

        <div className="space-y-28">

          {/* SECTION 1: VIDEO MASTERCLASS */}
          {(selectedFilter === "all" || selectedFilter === "video") && (
            <motion.section
              id="build_ai_chatbot_at_no_invest"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 md:p-10 border-electric-cyan/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-electric-cyan/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-[rgba(102,252,241,0.15)]">
                <div>
                  <div className="flex items-center gap-2 text-electric-cyan text-sm font-semibold tracking-wider uppercase mb-2">
                    <Video className="w-4 h-4" /> Free Full-Length Video Course
                  </div>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                    Build a Pro-Level AI Chatbot at $0 Investment
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg mt-2 max-w-3xl">
                    Master end-to-end LLM integration, Pinecone RAG pipelines, FastAPI backend, and Google Cloud Run deployment with zero 3rd-party vendor lock-in.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.youtube.com/watch?v=NofI0hwgRxc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-electric-cyan text-obsidian font-bold text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(102,252,241,0.3)]"
                  >
                    <PlayCircle className="w-4 h-4" /> Watch on YouTube
                  </a>
                  <a
                    href="https://github.com/dataforentrepreneurs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg glass border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> GitHub Code Repo
                  </a>
                </div>
              </div>

              {/* YouTube Video Embed Player */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-[rgba(102,252,241,0.25)] bg-slate">
                    <iframe
                      id="chatbot-video-player"
                      className="w-full h-full"
                      src={videoSrc}
                      title="Build a Pro-Level AI Chatbot at $0 Investment"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>

                  {/* Currently Playing Chapter Badge */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-obsidian/60 border border-[rgba(102,252,241,0.15)]">
                    <div className="flex items-center gap-3">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-electric-cyan"></span>
                      </span>
                      <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">Current Chapter:</span>
                      <span className="text-sm font-semibold text-white">
                        [{activeChapter.timeStr}] {activeChapter.title}
                      </span>
                    </div>
                    <span className="text-xs text-electric-cyan font-mono">
                      Click any timestamp on the right to jump & play
                    </span>
                  </div>
                </div>

                {/* Interactive Clickable Chapters Strip */}
                <div className="lg:col-span-4 glass rounded-2xl p-4 border border-[rgba(102,252,241,0.15)] flex flex-col h-[520px]">
                  <div className="flex items-center justify-between pb-3 border-b border-[rgba(102,252,241,0.15)] mb-3">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Clock className="w-4 h-4 text-electric-cyan" /> Interactive Chapters
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{chapters.length} Timestamps</span>
                  </div>

                  <div className="overflow-y-auto space-y-2 pr-1 custom-scrollbar flex-1">
                    {chapters.map((ch, idx) => {
                      const isCurrent = activeChapter.time === ch.time;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectChapter(ch)}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-3 ${
                            isCurrent
                              ? "bg-electric-cyan/20 border border-electric-cyan text-white shadow-[0_0_15px_rgba(102,252,241,0.2)]"
                              : "hover:bg-slate/70 text-gray-300 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                                isCurrent
                                  ? "bg-electric-cyan text-obsidian"
                                  : "bg-slate text-electric-cyan-dim"
                              }`}
                            >
                              {ch.timeStr}
                            </span>
                            <span className="text-xs truncate font-medium">{ch.title}</span>
                          </div>
                          <PlayCircle
                            className={`w-4 h-4 flex-shrink-0 ${
                              isCurrent ? "text-electric-cyan" : "text-gray-500 opacity-60"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* What You'll Learn Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[rgba(102,252,241,0.1)]">
                <div className="p-4 rounded-xl bg-slate/40 border border-slate">
                  <Cpu className="w-6 h-6 text-electric-cyan mb-2" />
                  <h4 className="text-sm font-bold text-white mb-1">1. LLM & Strategy</h4>
                  <p className="text-xs text-gray-400">
                    Mistral 7B & Gemini models, prompt optimization, architecture blueprints.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate/40 border border-slate">
                  <Database className="w-6 h-6 text-electric-violet-light mb-2" />
                  <h4 className="text-sm font-bold text-white mb-1">2. RAG & FastAPI</h4>
                  <p className="text-xs text-gray-400">
                    Pinecone vector indexing, live semantic search, and asynchronous endpoints.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate/40 border border-slate">
                  <Cloud className="w-6 h-6 text-electric-cyan mb-2" />
                  <h4 className="text-sm font-bold text-white mb-1">3. Google Cloud Run</h4>
                  <p className="text-xs text-gray-400">
                    Dockerizing, Google Artifact Registry, zero-scale serverless deployment.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate/40 border border-slate">
                  <Code2 className="w-6 h-6 text-electric-violet-light mb-2" />
                  <h4 className="text-sm font-bold text-white mb-1">4. React & Resilience</h4>
                  <p className="text-xs text-gray-400">
                    Clean front-end widget integration, robust fallback logic, and interaction logging.
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {/* SECTION 2: BOOK 1 - BASIC DATA SETUP GUIDE */}
          {(selectedFilter === "all" || selectedFilter === "book1") && (
            <motion.section
              id="basic_data_setup_book"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 md:p-12 border-electric-cyan/30 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Book Cover */}
                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative group max-w-[280px] sm:max-w-[320px] w-full">
                    <div className="absolute -inset-2 bg-gradient-to-r from-electric-cyan to-electric-violet rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition duration-500"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[rgba(102,252,241,0.3)] bg-slate">
                      <Image
                        src="/images/book1-cover.jpg"
                        alt="Data for Entrepreneurs: Basic Data Setup Guide Book Cover"
                        width={380}
                        height={520}
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Book Description & Links */}
                <div className="lg:col-span-8">
                  <div className="inline-block px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-semibold tracking-wider uppercase mb-3">
                    Part 1 • Foundational Guide
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
                    Basic Data Setup Guide
                  </h2>
                  <p className="text-electric-cyan text-base md:text-lg font-medium mb-4">
                    A Compass for Your Start-up Data Journey
                  </p>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                    The definitive handbook designed to guide you confidently through the complexities of building a robust data foundation. Written by Nikhil Sahai, an industry leader with over 15 years of hands-on data and AI architecture experience.
                  </p>

                  {/* Highlights checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {[
                      "Automated pipelines from multi-channel sources",
                      "Cloud data warehouse setup (BigQuery & Snowflake)",
                      "Executive dashboards in Looker, Tableau & Power BI",
                      "Actionable startup growth & unit economics analytics",
                      "Prevent data silos, bad metrics & wasted infra spend",
                      "Built specifically for startup velocity & lean budgets",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-electric-cyan flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Purchase Options */}
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-electric-cyan" /> Available On Leading Bookstores:
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      <a
                        href="https://a.co/d/gCwuHPW"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-electric-cyan text-obsidian text-xs font-bold hover:bg-white transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(102,252,241,0.25)]"
                      >
                        Amazon Kindle <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://a.co/d/0bv4Z9y"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg glass border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5"
                      >
                        Amazon Paperback <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://a.co/d/aSnbeEl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg glass border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5"
                      >
                        Amazon Hardcover <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://books.google.com.sg/books?id=gwFAEQAAQBAJ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg glass border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5"
                      >
                        Google Books <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://books.apple.com/us/book/data-for-entrepreneurs-part-i-basic-data-setup-guide/id6740886315"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg glass border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5"
                      >
                        Apple Books <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://store.pothi.com/book/nikhil-sahai-data-entrepreneurs-part-1-basic-data-setup-guide/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg glass border border-electric-cyan/40 text-electric-cyan text-xs font-medium hover:bg-electric-cyan/10 transition-colors flex items-center gap-1.5"
                      >
                        Pothi (India Print) <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Toggle Table of Contents */}
                  <div>
                    <button
                      onClick={() => setIsToc1Open(!isToc1Open)}
                      className="inline-flex items-center gap-2 text-sm text-electric-cyan hover:underline font-semibold"
                    >
                      <Layers className="w-4 h-4" />
                      {isToc1Open ? "Hide Table of Contents" : "View Complete Table of Contents"}
                      {isToc1Open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <AnimatePresence>
                      {isToc1Open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 p-5 rounded-xl bg-obsidian/60 border border-[rgba(102,252,241,0.2)] text-sm space-y-3"
                        >
                          <div>
                            <span className="font-bold text-white block">Part I: Foundations of Startup Data</span>
                            <span className="text-gray-400 text-xs">
                              Why data matters early on, identifying key business signals, understanding data debt, and setting up tracking without slowing down engineering.
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-white block">Part II: Core Architecture & Pipelines</span>
                            <span className="text-gray-400 text-xs">
                              Data modeling for agile startups, choosing warehouses (BigQuery vs. Snowflake vs. Postgres), and building resilient ETL/ELT pipelines using Airflow & modern tools.
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-white block">Part III: Reporting, Metrics & Dashboards</span>
                            <span className="text-gray-400 text-xs">
                              Building actionable dashboards with Looker & Tableau, defining single sources of truth, cohort retention, and financial metrics.
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-white block">Part IV: Scaling & Governance</span>
                            <span className="text-gray-400 text-xs">
                              Data privacy compliance, access control, avoiding runaway query costs, and scaling from MVP to enterprise tier.
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </div>
            </motion.section>
          )}

          {/* SECTION 3: BOOK 2 - AI CHATBOT BUILDER'S GUIDE */}
          {(selectedFilter === "all" || selectedFilter === "book2") && (
            <motion.section
              id="build_ai_chatbot_book"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 md:p-12 border-electric-violet/30 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Book Cover */}
                <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
                  <div className="relative group max-w-[280px] sm:max-w-[320px] w-full">
                    <div className="absolute -inset-2 bg-gradient-to-r from-electric-violet to-neon-purple rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition duration-500"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[rgba(178,0,255,0.3)] bg-slate">
                      <Image
                        src="/images/book2-cover.jpg"
                        alt="Data for Entrepreneurs: AI Chatbot Builder's Guide Book Cover"
                        width={380}
                        height={520}
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Book Description & Links */}
                <div className="lg:col-span-8 order-2 lg:order-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-electric-violet/10 border border-electric-violet/30 text-electric-violet-light text-xs font-semibold tracking-wider uppercase mb-3">
                    Part 2 • AI Playbook
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
                    AI Chatbot Builder's Guide
                  </h2>
                  <p className="text-electric-violet-light text-base md:text-lg font-medium mb-4">
                    A Practical Playbook for Startups to Build Smart AI Chatbots
                  </p>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                    A hands-on, zero-fluff playbook for entrepreneurs, product leads, and developers. Demystifies deploying an enterprise-grade LLM chatbot powered by Retrieval-Augmented Generation (RAG)—from first prompt to serverless cloud deployment.
                  </p>

                  {/* Highlights checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {[
                      "Build production-grade bots without expensive SaaS lock-in",
                      "Vector databases & RAG using Pinecone and open embeddings",
                      "FastAPI backend architecture with context injection",
                      "Serverless hosting on Google Cloud Run with Docker",
                      "Fallback models & logging user queries for continuous tuning",
                      "Frontend embed walkthrough in modern React & Next.js",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-electric-violet-light flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Purchase Options */}
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-electric-violet-light" /> Available On Leading Bookstores:
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      <a
                        href="https://www.amazon.in/dp/B0FDS5XF2H"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-electric-violet text-white text-xs font-bold hover:bg-neon-purple transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(178,0,255,0.3)]"
                      >
                        Amazon Kindle <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://www.amazon.com/dp/9811775915"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg glass border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5"
                      >
                        Amazon Paperback <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://play.google.com/store/books/details?id=JgNnEQAAQBAJ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg glass border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5"
                      >
                        Google Books <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://books.apple.com/us/book/ai-chatbot-builders-guide/id6747532436?ls=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg glass border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5"
                      >
                        Apple Books <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://store.pothi.com/book/nikhil-sahai-ai-chatbot-builder%E2%80%99s-guide-data-entrepreneurs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg glass border border-electric-violet/40 text-electric-violet-light text-xs font-medium hover:bg-electric-violet/10 transition-colors flex items-center gap-1.5"
                      >
                        Pothi (India Hardcover) <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Toggle Table of Contents */}
                  <div>
                    <button
                      onClick={() => setIsToc2Open(!isToc2Open)}
                      className="inline-flex items-center gap-2 text-sm text-electric-violet-light hover:underline font-semibold"
                    >
                      <Layers className="w-4 h-4" />
                      {isToc2Open ? "Hide Table of Contents" : "View Complete Table of Contents"}
                      {isToc2Open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <AnimatePresence>
                      {isToc2Open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 p-5 rounded-xl bg-obsidian/60 border border-[rgba(178,0,255,0.2)] text-sm space-y-3"
                        >
                          <div>
                            <span className="font-bold text-white block">Part I: Foundations</span>
                            <span className="text-gray-400 text-xs">
                              Introduction to conversational agents, evolution of LLMs, hosted vs. local deployment trade-offs, and choosing between fine-tuning and RAG.
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-white block">Part II: Building the Chatbot Step-by-Step</span>
                            <span className="text-gray-400 text-xs">
                              Preparing your knowledge base, implementing RAG with Pinecone, building FastAPI endpoints, secure API token handling, and frontend embedding.
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-white block">Part III: Cloud Deployment & Scaling</span>
                            <span className="text-gray-400 text-xs">
                              Containerizing with Docker, deployment on Google Cloud Run, rate limiting, structured telemetry, and automatic model failover logic.
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-white block">Part IV: Production Appendices</span>
                            <span className="text-gray-400 text-xs">
                              Production code snippets, alerts architecture, observability stack, prompt engineering recipes, and common pitfalls to avoid.
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </div>
            </motion.section>
          )}

          {/* Bottom Callout: Need 1:1 Consultation */}
          <div className="glass-card p-8 md:p-10 text-center border-electric-cyan/20">
            <ShieldCheck className="w-12 h-12 text-electric-cyan mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Need Hands-On Architecture or Consulting?</h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm md:text-base">
              Work directly with Nikhil Sahai and the Data for Entrepreneurs team to audit your startup data infrastructure, build custom RAG pipelines, or deploy DIAD in your cloud.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-electric-cyan to-electric-violet text-obsidian font-bold hover:opacity-90 transition-opacity"
              >
                Schedule Founder Consultation
              </a>
              <a
                href="/diad"
                className="px-6 py-3 rounded-xl glass border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Explore DIAD Platform
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
