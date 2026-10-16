"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Server,
  Layers,
  FileText,
  Lock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  DollarSign,
  Cpu,
  ExternalLink,
  Shield,
  AlertCircle,
  Database
} from "lucide-react";

export default function TrustCenter() {
  const [activeTab, setActiveTab] = useState<"architecture" | "security" | "subprocessors" | "legal">("architecture");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "Where does our customer, product, and sales data physically live?",
      a: "100% inside your own Google Cloud project (BigQuery in your chosen region, e.g. Singapore asia-southeast1). Data for Entrepreneurs maintains zero centralized databases and never hosts your sales records."
    },
    {
      q: "Does DIAD copy, mirror, or store our transactional records on D4E servers?",
      a: "Never. DIAD operates on a strict Zero-Custody Architecture. We maintain zero centralized databases, zero analytical telemetry sinks, and zero external mirrors."
    },
    {
      q: "Who owns the cloud infrastructure, IAM permissions, and encryption keys?",
      a: "You do. Your company provisions, owns, and controls the Google Cloud project, billing account, IAM access policies, and KMS encryption keys."
    },
    {
      q: "Does DIAD have backdoor administrative access to our production data?",
      a: "No. You generate a dedicated, least-privilege service account key on your local machine. DIAD is granted strictly restricted permissions (bigquery.jobUser, bigquery.dataEditor, secretmanager.secretAccessor). You can inspect, audit, or revoke access in your GCP IAM console at any moment."
    },
    {
      q: "Do commercial AI models train on our confidential business data?",
      a: "Never. DIAD interfaces exclusively with enterprise Zero Data Retention (ZDR) endpoints from OpenAI and Google Gemini. Your business documents and schema context are never used to train foundational AI models."
    },
    {
      q: "What customer information ever crosses outside our Google Cloud project?",
      a: "Only real-time, anonymized query context when an AI assistant is asked a specific question. Our automated PII Redaction Engine actively masks customer emails, phone numbers, and street addresses before transmission."
    },
    {
      q: "What third-party subprocessors are involved in running DIAD?",
      a: "Google Cloud Platform (Host), OpenAI / Gemini (Inference), Pinecone (Vector Index), Stripe (Billing). Full details, physical locations, and security certifications are disclosed in our Subprocessor Register."
    },
    {
      q: "What happens if we cancel our DIAD subscription?",
      a: "Your BigQuery data warehouse, dbt models, and analytical tables remain in your Google Cloud account forever. You retain 100% ownership of your transformed data and models with zero vendor lock-in."
    },
    {
      q: "Is DIAD compliant with the Singapore Personal Data Protection Act (PDPA)?",
      a: "Yes. By executing inside your private cloud perimeter with real-time PII masking and zero cross-border database mirroring, DIAD adheres to Singapore PDPA Protection and Transfer Limitation obligations."
    },
    {
      q: "How do we receive software updates, patches, and feature releases?",
      a: "Through versioned, cryptographically signed Docker container images pulled directly from Google Artifact Registry or GitHub Container Registry into your Cloud Run instance."
    }
  ];

  const subprocessors = [
    {
      name: "Google Cloud Platform (GCP)",
      hq: "Mountain View, CA, USA",
      role: "Cloud Run, BigQuery, Secret Manager, Cloud Storage",
      data: "Raw e-commerce orders, customer analytics, dbt gold marts",
      location: "Client Selected Region (Default: asia-southeast1 Singapore)",
      compliance: "ISO 27001, SOC 2/3, PCI-DSS, MTCS Level 3"
    },
    {
      name: "OpenAI, LLC",
      hq: "San Francisco, CA, USA",
      role: "LLM Inference (Text-to-SQL, Storefront AI Assistant)",
      data: "Ephemeral query prompts with PII masked",
      location: "United States (Enterprise ZDR Tier)",
      compliance: "Zero Data Retention (ZDR), SOC 2 Type II, TLS 1.3"
    },
    {
      name: "Google Cloud (Gemini API)",
      hq: "Mountain View, CA, USA",
      role: "Vertex AI / Gemini LLM Fallback & Text Embeddings",
      data: "Ephemeral context prompts",
      location: "Global / Singapore (asia-southeast1)",
      compliance: "SOC 2 Type II, ISO 27001, HIPAA Compliant"
    },
    {
      name: "Pinecone Systems, Inc.",
      hq: "New York, NY, USA",
      role: "Managed Vector Database for Knowledge RAG",
      data: "Vector embeddings of indexed documents (chunks)",
      location: "AWS / GCP Singapore (asia-southeast1)",
      compliance: "SOC 2 Type II, HIPAA, AES-256 Encryption"
    },
    {
      name: "Stripe Payments Singapore",
      hq: "Singapore",
      role: "Payment Processing & Subscriptions (Commercial Phase)",
      data: "Customer billing details, corporate UEN",
      location: "Singapore & Global Financial Cloud",
      compliance: "PCI-DSS Level 1, MAS MPI License"
    },
    {
      name: "Cloudflare, Inc.",
      hq: "San Francisco, CA, USA",
      role: "Web Application Firewall (WAF), CDN & Edge Proxy",
      data: "Ephemeral web traffic metadata",
      location: "Global Anycast Edge Network",
      compliance: "ISO 27001, SOC 2 Type II, DDoS Mitigation"
    }
  ];

  return (
    <section id="trust-center" className="py-20 border-t border-electric-cyan/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-electric-cyan/40 text-electric-cyan text-xs font-mono uppercase tracking-widest mb-4">
            <ShieldCheck className="w-4 h-4 text-electric-cyan" />
            Institutional Trust & Governance Center
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Enterprise Security & Zero-Custody Architecture
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Your data warehouse, raw databases, and credentials stay 100% inside your private Google Cloud environment. We never take custody of your records.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "architecture"
                ? "bg-electric-cyan text-obsidian shadow-lg shadow-electric-cyan/20"
                : "glass text-gray-300 hover:text-white hover:border-electric-cyan/40"
            }`}
          >
            <Layers className="w-4 h-4" />
            Architecture & Cloud Costs
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "security"
                ? "bg-electric-cyan text-obsidian shadow-lg shadow-electric-cyan/20"
                : "glass text-gray-300 hover:text-white hover:border-electric-cyan/40"
            }`}
          >
            <Shield className="w-4 h-4" />
            Security FAQ & AI Governance
          </button>

          <button
            onClick={() => setActiveTab("subprocessors")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "subprocessors"
                ? "bg-electric-cyan text-obsidian shadow-lg shadow-electric-cyan/20"
                : "glass text-gray-300 hover:text-white hover:border-electric-cyan/40"
            }`}
          >
            <Server className="w-4 h-4" />
            Subprocessor Register
          </button>

          <button
            onClick={() => setActiveTab("legal")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "legal"
                ? "bg-electric-cyan text-obsidian shadow-lg shadow-electric-cyan/20"
                : "glass text-gray-300 hover:text-white hover:border-electric-cyan/40"
            }`}
          >
            <FileText className="w-4 h-4" />
            Terms, Privacy & DPA
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="glass-card p-6 sm:p-10 border-electric-cyan/30">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: ARCHITECTURE */}
            {activeTab === "architecture" && (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Zero-Custody Technical Topology</h3>
                    <p className="text-sm text-gray-400">All data transformations run on your private Cloud Run & BigQuery instance.</p>
                  </div>
                  <Link
                    href="/diad/architecture"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-electric-violet/30 text-electric-cyan border border-electric-cyan/40 text-xs font-semibold hover:bg-electric-violet/50 transition-colors w-fit"
                  >
                    View Full Architecture Blueprint
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 3 Boundary Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-obsidian/80 p-5 rounded-xl border border-electric-cyan/30">
                    <div className="flex items-center gap-2 text-electric-cyan font-bold text-sm mb-3">
                      <Database className="w-4 h-4" />
                      Layer A: Sovereign Data (100% GCP)
                    </div>
                    <ul className="text-xs text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0 mt-0.5" />
                        <span>All raw orders & customer PII reside in your private BigQuery.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0 mt-0.5" />
                        <span>Selected physical region (e.g. Singapore asia-southeast1).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0 mt-0.5" />
                        <span>Zero data ever touches D4E centralized servers.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-obsidian/80 p-5 rounded-xl border border-neon-purple/40">
                    <div className="flex items-center gap-2 text-neon-purple font-bold text-sm mb-3">
                      <Cpu className="w-4 h-4" />
                      Layer B: Software Engine (Cloud Run)
                    </div>
                    <ul className="text-xs text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neon-purple flex-shrink-0 mt-0.5" />
                        <span>Runs as a sealed container inside your Cloud Run service.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neon-purple flex-shrink-0 mt-0.5" />
                        <span>Governed by least-privilege IAM service account.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neon-purple flex-shrink-0 mt-0.5" />
                        <span>Processes queries in-memory with automatic scale-to-zero.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-obsidian/80 p-5 rounded-xl border border-electric-violet/40">
                    <div className="flex items-center gap-2 text-electric-violet-light font-bold text-sm mb-3">
                      <Lock className="w-4 h-4" />
                      Layer C: AI Inference (Zero Retention)
                    </div>
                    <ul className="text-xs text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-violet flex-shrink-0 mt-0.5" />
                        <span>Real-time regex PII masking strips emails & phones.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-violet flex-shrink-0 mt-0.5" />
                        <span>Only ephemeral prompt context sent via TLS 1.3.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-violet flex-shrink-0 mt-0.5" />
                        <span>Contractual Zero Data Retention (ZDR) guarantee.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Cloud Cost Calculator */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-electric-cyan" />
                    Transparent Self-Hosted Cloud Operating Cost Calculator
                  </h4>
                  <p className="text-xs text-gray-400 mb-4">
                    Because DIAD runs on serverless GCP primitives with scale-to-zero, your actual monthly cloud bill is negligible:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate rounded-lg">
                      <thead className="bg-slate text-gray-300 uppercase font-mono">
                        <tr>
                          <th className="p-3">GCP Infrastructure Component</th>
                          <th className="p-3">Typical Production Usage</th>
                          <th className="p-3 text-right">Estimated Monthly Bill</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate text-gray-300">
                        <tr>
                          <td className="p-3 font-medium text-white">Google Cloud Run</td>
                          <td className="p-3">Customer Chat + BI Queries (scale-to-zero, free 2M reqs/mo)</td>
                          <td className="p-3 text-right text-electric-cyan font-mono">S$8 – S$15 / mo</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-white">Google BigQuery</td>
                          <td className="p-3">Sales Storage + Daily dbt Marts (10GB storage & 1TB queries free)</td>
                          <td className="p-3 text-right text-electric-cyan font-mono">S$3 – S$8 / mo</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-white">Secret Manager & Cloud Scheduler</td>
                          <td className="p-3">6 secrets + 4 daily/hourly automated cron jobs</td>
                          <td className="p-3 text-right text-electric-cyan font-mono">&lt; S$1.00 / mo</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-white">AI Inference (OpenAI / Gemini)</td>
                          <td className="p-3">~5,000 storefront interactions + daily executive BI summaries</td>
                          <td className="p-3 text-right text-electric-cyan font-mono">S$10 – S$35 / mo</td>
                        </tr>
                        <tr className="bg-electric-cyan/10 font-bold text-white">
                          <td className="p-3">Total Estimated Infrastructure Bill</td>
                          <td className="p-3">Billed directly by Google Cloud & AI providers</td>
                          <td className="p-3 text-right text-electric-cyan text-sm font-mono font-extrabold">~S$25 – S$60 / month</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: SECURITY FAQ */}
            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Security Whitepaper & The 10 Enterprise FAQs</h3>
                    <p className="text-sm text-gray-400">Direct answers to the 10 most critical enterprise security questions.</p>
                  </div>
                  <Link
                    href="/diad/security"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-electric-violet/30 text-electric-cyan border border-electric-cyan/40 text-xs font-semibold hover:bg-electric-violet/50 transition-colors w-fit"
                  >
                    View Full Security Whitepaper
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* FAQ Accordion List */}
                <div className="space-y-3 mb-10">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-slate rounded-xl overflow-hidden bg-obsidian/60 transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate/50 transition-colors"
                      >
                        <span className="font-semibold text-sm sm:text-base text-white">
                          <span className="text-electric-cyan font-mono mr-2">Q{idx + 1}.</span>
                          {faq.q}
                        </span>
                        {openFaq === idx ? (
                          <ChevronUp className="w-5 h-5 text-electric-cyan flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>

                      {openFaq === idx && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-slate bg-slate/20">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Compliance & Vulnerability Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate">
                  <div className="p-4 rounded-xl bg-obsidian/70 border border-slate">
                    <h5 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-electric-cyan" />
                      AICPA SOC 2 Type II Controls Alignment
                    </h5>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Enforces CC6 (IAM least-privilege), CC7 (Cloud Monitoring error health alerts), CC8 (cryptographically signed container digests), and AES-256 / TLS 1.3 encryption across all flows.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-obsidian/70 border border-slate">
                    <h5 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-neon-purple" />
                      Coordinated Vulnerability Disclosure SLA
                    </h5>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Monitored security inbox at <code className="text-electric-cyan">security@d4e.ai</code>. 24-hour SLA acknowledgment, 48-hour initial triage, and Safe Harbor protections for ethical researchers.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: SUBPROCESSORS */}
            {activeTab === "subprocessors" && (
              <motion.div
                key="subprocessors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Third-Party Subprocessor Registry</h3>
                    <p className="text-sm text-gray-400">Complete transparency regarding all external services handling ephemeral query context.</p>
                  </div>
                  <Link
                    href="/diad/subprocessors"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-electric-violet/30 text-electric-cyan border border-electric-cyan/40 text-xs font-semibold hover:bg-electric-violet/50 transition-colors w-fit"
                  >
                    View Official Subprocessor Registry
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-left text-xs border border-slate rounded-lg">
                    <thead className="bg-slate text-gray-300 uppercase font-mono">
                      <tr>
                        <th className="p-3">Subprocessor</th>
                        <th className="p-3">HQ</th>
                        <th className="p-3">Service Role</th>
                        <th className="p-3">Processing Location</th>
                        <th className="p-3">Certifications</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate text-gray-300">
                      {subprocessors.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-slate/30 transition-colors">
                          <td className="p-3 font-semibold text-white">{sub.name}</td>
                          <td className="p-3 text-gray-400">{sub.hq}</td>
                          <td className="p-3">{sub.role}</td>
                          <td className="p-3 font-mono text-electric-cyan text-[0.7rem]">{sub.location}</td>
                          <td className="p-3 font-mono text-neon-purple text-[0.7rem]">{sub.compliance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-xl bg-obsidian/70 border border-slate text-xs text-gray-300 leading-relaxed">
                  <span className="font-bold text-white">30-Day Subprocessor Change Notification Commitment: </span>
                  Data for Entrepreneurs provides at least thirty (30) days advance written email notice to administrative contacts prior to engaging any new subprocessor. Customers maintain full opt-out rights.
                </div>
              </motion.div>
            )}

            {/* TAB 4: LEGAL & TERMS */}
            {activeTab === "legal" && (
              <motion.div
                key="legal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Terms of Service, Privacy Policy & DPA</h3>
                    <p className="text-sm text-gray-400">Institutional legal agreements governing self-hosted software licensing and data processing.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/terms"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-violet/30 text-electric-cyan border border-electric-cyan/40 text-xs font-semibold hover:bg-electric-violet/50 transition-colors"
                    >
                      Master Terms
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/privacy"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-violet/30 text-electric-cyan border border-electric-cyan/40 text-xs font-semibold hover:bg-electric-violet/50 transition-colors"
                    >
                      Privacy Policy
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-obsidian/70 p-5 rounded-xl border border-slate">
                    <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-electric-cyan" />
                      IP Partitioning & Zero-Custody Protection
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed mb-3">
                      You exclusively own 100% of your sales records, customer PII, BigQuery schemas, and transformed dbt gold marts. D4E retains IP ownership of the container binaries and orchestration prompt chains.
                    </p>
                    <div className="text-[0.7rem] font-mono text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                      ✔ Zero Vendor Lock-In: Query your BigQuery warehouse anytime with Tableau, Looker, or Python.
                    </div>
                  </div>

                  <div className="bg-obsidian/70 p-5 rounded-xl border border-slate">
                    <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-neon-purple" />
                      Free Beta Evaluation & Logo Exchange
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed mb-3">
                      Pilot partners evaluate DIAD with S$0 software fees for 90 days in exchange for a non-exclusive license to feature their brand logo and written testimonial on d4e.ai. Mutual S$0 liability cap during beta.
                    </p>
                    <div className="text-[0.7rem] font-mono text-neon-purple bg-neon-purple/10 p-2 rounded border border-neon-purple/20">
                      ✔ Protected 90-Day evaluation with 14-day mutual cancellation notice.
                    </div>
                  </div>
                </div>

                {/* DPA & SLA Summary */}
                <div className="bg-obsidian/70 p-5 rounded-xl border border-slate text-xs text-gray-300 space-y-3">
                  <h4 className="font-bold text-white text-sm">Data Processing Addendum (Singapore PDPA 2012 & EU GDPR)</h4>
                  <p className="leading-relaxed">
                    Customer designates itself as Data Controller; Data for Entrepreneurs acts as Data Intermediary/Processor. Complies with PDPA Protection Obligation and Transfer Limitation Obligation. Integrates EU GDPR Module 2 Standard Contractual Clauses (SCCs).
                  </p>
                  <div className="pt-2 border-t border-slate flex flex-wrap gap-4 text-gray-400">
                    <span>SLA Targets: <strong className="text-white">P1 Critical &lt; 4h</strong></span>
                    <span>P2 Major &lt; 12h</span>
                    <span>P3 General &lt; 2 business days</span>
                    <span>Zero-Day CVE Patches: <strong className="text-white">&lt; 48 hours</strong></span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
