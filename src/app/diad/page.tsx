"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Copy,
  Check,
  Download,
  Zap,
  ShieldCheck,
  Database,
  Bot,
  Sparkles,
  ArrowRight,
  Lock,
  CheckCircle2,
  Layers,
  Cpu,
  Globe
} from "lucide-react";

export default function DiadPage() {
  const [copied, setCopied] = useState(false);

  const psCommand = `iwr "https://diad.d4e.ai/DIAD_release_v1.0.zip" -OutFile "$env:TEMP\\DIAD.zip"; Expand-Archive "$env:TEMP\\DIAD.zip" -DestinationPath "$home\\DIAD" -Force; Remove-Item "$env:TEMP\\DIAD.zip"; cd "$home\\DIAD"; .\\setup.ps1`;

  const handleCopy = () => {
    navigator.clipboard.writeText(psCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const steps = [
    {
      num: "01",
      title: "1-Click PowerShell Setup",
      description: "Copy and run the PowerShell script on your Windows machine. It automatically extracts the engine and installs dependencies."
    },
    {
      num: "02",
      title: "Launch Local Onboarding Hub",
      description: "The setup script launches your private onboarding wizard locally at http://localhost:8000. No external server tracking."
    },
    {
      num: "03",
      title: "Connect Data & API Keys",
      description: "Input your OpenAI & Pinecone keys and link your Google Drive, Notion, Firestore, or GA4 export data through simple clicks."
    },
    {
      num: "04",
      title: "Auto-Deploy Chatbots to GCP",
      description: "Click 'Deploy' to automatically build & launch private Internal & Customer-Facing AI Chatbots on your own Google Cloud account."
    }
  ];

  const features = [
    {
      icon: <Lock className="w-6 h-6 text-electric-cyan" />,
      title: "100% Data Ownership & Privacy",
      description: "All pipeline processing runs locally on your PC and inside your own Google Cloud project. Zero third-party data sharing."
    },
    {
      icon: <Zap className="w-6 h-6 text-neon-purple" />,
      title: "Clicks-Only Web Wizard",
      description: "No coding required. A guided step-by-step onboarding mentor leads you through credential setup and deployment."
    },
    {
      icon: <Bot className="w-6 h-6 text-electric-cyan" />,
      title: "Dual Agentic AI Chatbots",
      description: "Deploy an Internal BI Chatbot for business intelligence and a public Customer Support Chatbot for instant query resolution."
    },
    {
      icon: <Database className="w-6 h-6 text-electric-violet-light" />,
      title: "Multi-Source Knowledge Graph",
      description: "Seamlessly ingest PDFs, Notion docs, Google Drive files, e-commerce transaction logs, and BigQuery analytics."
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-obsidian text-white">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-electric-violet/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[300px] bg-electric-cyan/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-electric-cyan/30 text-electric-cyan text-xs font-mono tracking-wider uppercase mb-6"
          >
            <Sparkles className="w-4 h-4 text-electric-cyan" />
            1-Minute Deployment | Clicks-Only Setup
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-electric-cyan bg-clip-text text-transparent"
          >
            Data In A Day (DIAD)
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light"
          >
            Turn your store's raw data into an AI chatbot that knows everything about your business — deployed in under 30 minutes, running entirely inside your own Google Cloud account.
          </motion.p>
        </div>

        {/* Main Installation Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card p-6 sm:p-10 max-w-4xl mx-auto mb-20 border-electric-violet/40 relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-neon-purple/20 rounded-xl border border-neon-purple/40">
                <Terminal className="w-6 h-6 text-neon-purple" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Deploy DIAD Agent on Your Computer</h2>
                <p className="text-xs text-gray-400">Download the 1-click batch installer, or copy the PowerShell command.</p>
              </div>
            </div>

            <a
              href="/setup.bat"
              download="setup.bat"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-violet to-neon-purple text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-neon-purple/20 flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              Download 1-Click Installer (.bat)
            </a>
          </div>

          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            The setup engine will download your release package, configure Python dependencies, and open your Onboarding Dashboard at <code className="text-electric-cyan bg-slate px-2 py-0.5 rounded font-mono">http://localhost:8000</code>.
          </p>

          {/* PowerShell Code Box */}
          <div className="bg-obsidian/90 border border-electric-cyan/20 rounded-xl p-4 sm:p-5 relative group font-mono text-xs sm:text-sm overflow-x-auto text-electric-cyan-dim flex items-center justify-between gap-4 shadow-inner">
            <span className="text-electric-cyan selection:bg-neon-purple selection:text-white break-all">
              {psCommand}
            </span>
            <button
              onClick={handleCopy}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-xs font-semibold transition-all ${
                copied
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-electric-violet/30 text-white border border-electric-violet/50 hover:bg-electric-violet/50"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Command
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">Why Entrepreneurs Choose DIAD</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Enterprise-grade data infrastructure and AI intelligence without needing a data engineering team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 glass-card-hover border-electric-cyan/10"
              >
                <div className="p-3 bg-slate/60 rounded-xl inline-block border border-slate mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4-Step Process Section */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">Select Your AI Workspace in 4 Easy Steps</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Access customer support assistance or internal business intelligence powered by your Google Cloud warehouse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass p-6 rounded-2xl relative border-electric-violet/20 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-extrabold text-electric-cyan/40 font-mono mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Embed Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 sm:p-12 max-w-5xl mx-auto border-electric-cyan/30 text-center"
        >
          <div className="w-16 h-16 bg-electric-cyan/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-electric-cyan/40">
            <Globe className="w-8 h-8 text-electric-cyan" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Embed Your Chatbots Anywhere</h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Once deployed to your GCP Cloud Run instance, embed your customer support widget into Shopify, WordPress, or custom web apps with a single line of JavaScript.
          </p>

          <div className="bg-obsidian p-4 rounded-xl max-w-2xl mx-auto border border-electric-cyan/20 text-left font-mono text-xs text-electric-cyan mb-8 overflow-x-auto">
            <code>
              {`<script src="https://your-cloud-run-url.a.run.app/external_chatbot.js"></script>`}
            </code>
          </div>

          <a
            href="/setup.bat"
            download="setup.bat"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-electric-cyan text-obsidian font-extrabold text-base hover:bg-electric-cyan/90 transition-colors shadow-lg shadow-electric-cyan/20 group"
          >
            Launch DIAD Setup Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </div>
  );
}
