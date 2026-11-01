"use client";

import { useState } from "react";
import TrustCenter from "@/components/TrustCenter";
import PilotRegistrationModal from "@/components/PilotRegistrationModal";
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
  Clock,
  Layers,
  ShoppingBag,
  BarChart3,
  Globe,
  CheckCircle2
} from "lucide-react";

export default function DiadPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"customer" | "internal">("customer");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cloud Cost Calculator State
  const [calcOrders, setCalcOrders] = useState(2500);
  const [calcQueries, setCalcQueries] = useState(150);
  const [calcDocs, setCalcDocs] = useState(35);

  const costCloudRun = (calcQueries * 30 > 2000000) ? ((calcQueries * 30 - 2000000) * 0.0000004).toFixed(2) : "0.00";
  const costBq = (0.50 + (calcOrders * 0.0011)).toFixed(2);
  const costSecrets = "0.45";
  const costAi = ((calcQueries * 30 * 0.002) + (calcDocs * 0.02)).toFixed(2);
  const totalCost = (parseFloat(costCloudRun) + parseFloat(costBq) + parseFloat(costSecrets) + parseFloat(costAi)).toFixed(2);

  const psCommand = `irm https://raw.githubusercontent.com/dataforentrepreneurs/DIAD_Scaffold/main/setup.ps1 | iex`;

  const handleDownloadClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    // Always open modal so credentials & license terms can be reviewed or edited
    setIsModalOpen(true);
  };

  const handleCopy = () => {
    try {
      const existingLead = localStorage.getItem("diad_pilot_lead");
      if (!existingLead) {
        setIsModalOpen(true);
        return;
      }
    } catch {}
    navigator.clipboard.writeText(psCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const steps = [
    {
      num: "01",
      title: "1-Click Installation",
      description: "Paste the 1-line PowerShell command or run setup.bat. The installer verifies your environment and opens your private setup dashboard."
    },
    {
      num: "02",
      title: "Connect Docs & Stores",
      description: "Link your Google Drive policies, Notion SOPs, and Shopify/WooCommerce credentials with guided clicks. Keys are vaulted into GCP Secret Manager."
    },
    {
      num: "03",
      title: "1-Click GCP Pipeline",
      description: "Bootstrap BigQuery datasets, run dbt analytical marts (Customer 360 & Order Dossiers), and deploy pre-built Cloud Run containers in ~30s."
    },
    {
      num: "04",
      title: "Automated Day 2+ Cadence",
      description: "Automated Cloud Schedulers trigger incremental updates daily at 2:00 AM. Changed docs are detected via SHA-256 hashes with zero maintenance."
    }
  ];

  const features = [
    {
      icon: <Lock className="w-6 h-6 text-emerald-400" />,
      title: "100% Data Sovereignty",
      description: "All orders, financial records, and vector embeddings reside strictly inside your own Google Cloud account. Zero multi-tenant data sharing."
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-electric-cyan" />,
      title: "Storefront Customer Chatbot",
      description: "Instant order status tracking, return policy answers, and FAQ guidance with automatic customer PII masking and 24/7 uptime."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-neon-purple" />,
      title: "Executive Text-to-SQL Advisor",
      description: "Natural-language business intelligence over BigQuery. Query revenue trends, returning customer rates, and inventory alerts instantly."
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: "Automated Recurring Cadences",
      description: "Hands-off daily synchronization for e-commerce orders and weekly updates for team knowledge bases via Google Cloud Scheduler."
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-obsidian text-white">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-electric-violet/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[450px] h-[350px] bg-electric-cyan/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-electric-cyan/30 text-electric-cyan text-xs font-mono tracking-wider uppercase mb-6"
          >
            <Sparkles className="w-4 h-4 text-electric-cyan" />
            Turnkey E-Commerce AI | Deployed in Under 30 Minutes
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-100 to-electric-cyan bg-clip-text text-transparent"
          >
            Data In A Day (DIAD)
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light"
          >
            Turn your store's raw data into an intelligent AI assistant that knows everything about your business — running <strong>100% inside your own Google Cloud account</strong>.
          </motion.p>
        </div>

        {/* 1-Click Deployment Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card p-6 sm:p-10 max-w-4xl mx-auto mb-20 border-electric-violet/40 relative overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-neon-purple/20 rounded-xl border border-neon-purple/40">
                <Terminal className="w-6 h-6 text-neon-purple" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Deploy DIAD On Your Machine</h2>
                <p className="text-xs text-gray-400">Download the 1-click batch installer, or copy the PowerShell command below.</p>
              </div>
            </div>

            <button
              onClick={handleDownloadClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-violet to-neon-purple text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-neon-purple/20 flex-shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download 1-Click Installer (.bat)
            </button>
          </div>

          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            Running the setup script downloads the verified DIAD release bundle, configures your local environment, and launches the guided Onboarding Suite at <code className="text-electric-cyan bg-slate px-2 py-0.5 rounded font-mono">http://localhost:8000</code>.
          </p>

          {/* Terminal Command Box */}
          <div className="bg-obsidian/95 border border-electric-cyan/30 rounded-xl p-4 sm:p-5 relative font-mono text-xs sm:text-sm text-electric-cyan flex items-center justify-between gap-4 shadow-inner">
            <span className="selection:bg-neon-purple selection:text-white break-all">
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

          <div className="flex items-center gap-6 mt-6 text-xs text-gray-400 flex-wrap">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No coding required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pre-built Cloud Run containers</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% private to your GCP</span>
          </div>
        </motion.div>

        {/* Self-Hosted Cloud Operating Cost Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 sm:p-10 max-w-4xl mx-auto mb-20 border-electric-cyan/30 relative overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono uppercase tracking-wider mb-2">
                💰 Cloud Cost Transparency
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Self-Hosted Cloud Operating Cost Calculator</h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Calculate your estimated monthly Google Cloud bill. 100% billed directly to GCP with <strong className="text-white">zero vendor markup</strong>.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex-shrink-0">
              ⚡ GCP Free Tier: 2M req/mo & 10GB BQ Included
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Monthly Orders */}
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-200 mb-2">
                  <span>Monthly Store Order Volume:</span>
                  <span className="text-electric-cyan font-mono font-bold">{calcOrders.toLocaleString()} orders/mo</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="25000"
                  step="100"
                  value={calcOrders}
                  onChange={(e) => setCalcOrders(parseInt(e.target.value))}
                  className="w-full accent-electric-cyan h-2 bg-slate/60 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[0.7rem] text-gray-500 mt-1">
                  <span>100</span>
                  <span>10,000</span>
                  <span>25,000+</span>
                </div>
              </div>

              {/* Slider 2: Daily AI Queries */}
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-200 mb-2">
                  <span>Daily AI Inquiries (Customer + Staff BI):</span>
                  <span className="text-electric-cyan font-mono font-bold">{calcQueries.toLocaleString()} queries/day</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="3000"
                  step="10"
                  value={calcQueries}
                  onChange={(e) => setCalcQueries(parseInt(e.target.value))}
                  className="w-full accent-electric-cyan h-2 bg-slate/60 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[0.7rem] text-gray-500 mt-1">
                  <span>10/day</span>
                  <span>1,000/day</span>
                  <span>3,000+/day</span>
                </div>
              </div>

              {/* Slider 3: Knowledge Base Docs */}
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-200 mb-2">
                  <span>Knowledge Base Documents (Drive / Notion / Confluence):</span>
                  <span className="text-electric-cyan font-mono font-bold">{calcDocs} documents</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={calcDocs}
                  onChange={(e) => setCalcDocs(parseInt(e.target.value))}
                  className="w-full accent-electric-cyan h-2 bg-slate/60 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[0.7rem] text-gray-500 mt-1">
                  <span>5 docs</span>
                  <span>100 docs</span>
                  <span>300+ docs</span>
                </div>
              </div>

              {/* Incremental GDrive Sync Note */}
              <div className="p-3.5 rounded-xl bg-electric-cyan/5 border border-electric-cyan/20 text-xs text-gray-300 leading-relaxed flex items-start gap-3">
                <span className="text-base flex-shrink-0">🔄</span>
                <div>
                  <strong className="text-electric-cyan">Zero-Waste Incremental Sync Active:</strong> Google Drive is pulled <strong>only when changes are made</strong>. DIAD verifies document SHA-256 hashes and <code className="text-electric-cyan font-mono">modifiedTime</code> timestamps. Unchanged files are never re-vectorized or billed twice.
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 bg-obsidian/90 border border-slate/60 rounded-xl p-5 flex flex-col justify-between shadow-inner">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Estimated Monthly Infrastructure Bill
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Google Cloud Run:</span>
                    <span className="font-mono text-white">S$ {costCloudRun} (Free Tier)</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>BigQuery Data Warehouse:</span>
                    <span className="font-mono text-white">S$ {costBq}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Secret Manager & Schedulers:</span>
                    <span className="font-mono text-white">S$ {costSecrets}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Vector Search & AI Inference:</span>
                    <span className="font-mono text-white">S$ {costAi}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate/80 pt-4 mt-6 flex justify-between items-baseline">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Total Estimated GCP:</span>
                <span className="text-2xl font-extrabold text-electric-cyan font-mono">
                  ~S$ {totalCost} <span className="text-xs text-gray-400 font-normal">/mo</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">Why Merchants Choose DIAD</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Enterprise-grade BigQuery marts, vector embeddings, and dual AI agents without hiring a data engineering team.
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

        {/* Dual AI Chatbot Interactive Preview Showcase */}
        <div className="mb-24 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">Two Specialized AI Assistants Out-of-the-Box</h2>
            <p className="text-gray-400 text-sm sm:text-base">One public bot to delight your customers; one private advisor to run your business.</p>
          </div>

          {/* Toggle Pills */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate/70 p-1.5 rounded-xl border border-slate flex gap-2">
              <button
                onClick={() => setActiveTab("customer")}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "customer"
                    ? "bg-electric-cyan text-obsidian shadow-lg shadow-electric-cyan/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Customer Support Assistant
              </button>
              <button
                onClick={() => setActiveTab("internal")}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "internal"
                    ? "bg-neon-purple text-white shadow-lg shadow-neon-purple/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Executive BI Advisor
              </button>
            </div>
          </div>

          {/* Active Preview Card */}
          <div className="glass-card p-8 border-electric-cyan/20 rounded-2xl relative overflow-hidden">
            {activeTab === "customer" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-xs font-mono text-electric-cyan uppercase tracking-wider block mb-2">Public Storefront Assistant</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Instant Order Resolution & Store FAQs</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Connects directly to your BigQuery transactional warehouse and Pinecone knowledge base. Answers tracking questions, resolves return queries, and suggests products while masking sensitive customer data.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-electric-cyan" /> 1-line script embed for Shopify & WooCommerce</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-electric-cyan" /> Order tracking dossier lookup</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-electric-cyan" /> Automatic PII and privacy masking</li>
                  </ul>
                </div>
                <div className="bg-obsidian/90 p-5 rounded-xl border border-electric-cyan/30 text-xs font-sans space-y-3">
                  <div className="bg-slate/40 p-3 rounded-lg text-gray-300">
                    <strong>Shopper:</strong> "Where is my order #1002?"
                  </div>
                  <div className="bg-electric-cyan/10 p-3 rounded-lg text-electric-cyan border border-electric-cyan/20">
                    <strong>AI Assistant:</strong> "Your order #1002 was fulfilled via FedEx (Tracking: 94001000...). It is currently Out for Delivery and expected by 4:00 PM today!"
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-xs font-mono text-neon-purple uppercase tracking-wider block mb-2">Private Internal BI Advisor</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Natural Language Text-to-SQL Analytics</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Runs secure queries over BigQuery data marts (Customer 360, Order Dossiers) and private Notion/Confluence SOPs. Ask revenue trends and inventory health questions in plain English.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-neon-purple" /> Dynamic Text-to-SQL execution in BigQuery</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-neon-purple" /> Customer LTV and cohort insights</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-neon-purple" /> Instant operational SOP retrieval</li>
                  </ul>
                </div>
                <div className="bg-obsidian/90 p-5 rounded-xl border border-neon-purple/30 text-xs font-sans space-y-3">
                  <div className="bg-slate/40 p-3 rounded-lg text-gray-300">
                    <strong>Founder:</strong> "What was our total revenue and refund rate last week?"
                  </div>
                  <div className="bg-neon-purple/10 p-3 rounded-lg text-gray-200 border border-neon-purple/20">
                    <strong>BI Advisor:</strong> "Last week revenue totaled $48,320 across 412 orders. The refund rate was 2.4% (down 0.8% from previous week). Top selling category: Fine Jewelry."
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4-Step Process Section */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">From Zero to Production in 4 Steps</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              The entire onboarding pipeline is automated through the local wizard.
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

        {/* Trust & Governance Center */}
        <TrustCenter />

        {/* Embed Anywhere Callout */}
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Embed Your Chatbot in Under 1 Minute</h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-6 leading-relaxed">
            Copy the 1-line script tag into your Shopify <code>theme.liquid</code>, WooCommerce header, or HTML footer. Your floating assistant is instantly live for all customers.
          </p>

          <div className="bg-obsidian p-4 rounded-xl max-w-xl mx-auto border border-electric-cyan/20 text-center font-mono text-xs text-electric-cyan mb-8 overflow-x-auto">
            <code>
              {`<script src="/diad-chat-widget.js" defer></script>`}
            </code>
          </div>

          <button
            onClick={handleDownloadClick}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-electric-cyan text-obsidian font-extrabold text-base hover:bg-electric-cyan/90 transition-colors shadow-lg shadow-electric-cyan/20 group cursor-pointer"
          >
            Launch DIAD Setup Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Pilot Registration & Consent Modal */}
        <PilotRegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Version & Build Timestamp Footer Badge */}
        <div className="mt-16 pt-6 border-t border-slate/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-gray-400">
          <span>DIAD Self-Hosted AI Data Platform • Zero-Custody Edition</span>
          <span className="text-electric-cyan font-semibold">
            🟢 Latest Push Active: v1.0.6 • Build: 2026-11-02 02:10 SGT (UTC+8)
          </span>
        </div>

      </div>
    </div>
  );
}
