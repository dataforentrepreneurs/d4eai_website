import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Shield, Lock, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "DIAD Security Whitepaper & AI Governance | d4e.ai",
  description: "Comprehensive answers to the 10 enterprise security questions, AICPA SOC 2 alignment, and responsible AI governance for DIAD.",
};

export default function SecurityPage() {
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

  return (
    <div className="min-h-screen pt-28 pb-20 bg-obsidian text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/diad#trust-center" className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan hover:underline mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to DIAD Trust Center
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-electric-cyan/40 text-electric-cyan text-xs font-mono uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5 text-electric-cyan" />
            Security & Governance Whitepaper
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            The 10 Founder Security FAQs & AI Governance Policy
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Enterprise retail and e-commerce brand owners buy from software vendors who demonstrate uncompromising security, privacy, and architectural transparency.
          </p>
        </div>

        {/* The 10 Questions */}
        <div className="glass-card p-6 sm:p-10 mb-10 border-electric-cyan/30">
          <h2 className="text-2xl font-bold text-white mb-6">The 10 Critical Enterprise Security Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-slate pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-base font-bold text-white mb-2 flex items-start gap-2">
                  <span className="text-electric-cyan font-mono">Q{idx + 1}.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SOC 2 & Responsible AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="glass-card p-6 border-slate">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-electric-cyan" />
              AICPA SOC 2 Type II Alignment
            </h3>
            <ul className="text-xs text-gray-300 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0 mt-0.5" />
                <span><strong>CC6 (Logical Access):</strong> Customer GCP IAM least-privilege service account & MFA.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0 mt-0.5" />
                <span><strong>CC7 (Operations):</strong> Cloud Monitoring health checks & Cloud Scheduler alerts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0 mt-0.5" />
                <span><strong>CC8 (Change Management):</strong> Versioned container releases tracked in Git.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0 mt-0.5" />
                <span><strong>Cryptography:</strong> AES-256 encryption at rest; TLS 1.3 in transit.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6 border-slate">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-neon-purple" />
              Responsible AI & Guardrails
            </h3>
            <ul className="text-xs text-gray-300 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neon-purple flex-shrink-0 mt-0.5" />
                <span><strong>Zero Model Training:</strong> Contractual zero-retention prevents LLM training.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neon-purple flex-shrink-0 mt-0.5" />
                <span><strong>Automated PII Redaction:</strong> Regex filters strip emails and phone numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neon-purple flex-shrink-0 mt-0.5" />
                <span><strong>SQL Injection Guardrails:</strong> Deterministic dry-run syntax verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neon-purple flex-shrink-0 mt-0.5" />
                <span><strong>Query Cost Ceiling:</strong> Hard 1 GB maximum bytes billed limit per query.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Vulnerability Disclosure */}
        <div className="glass-card p-6 border-electric-cyan/20">
          <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-electric-cyan" />
            Coordinated Vulnerability Disclosure & Incident Response Policy
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
            Security inquiries and vulnerability reports should be directed to <code className="text-electric-cyan font-mono">security@d4e.ai</code>. We commit to a 24-hour SLA acknowledgment, 48-hour initial triage, and rapid patch deployment. Ethical security researchers operating in good faith are protected under our Safe Harbor provision.
          </p>
        </div>

      </div>
    </div>
  );
}
