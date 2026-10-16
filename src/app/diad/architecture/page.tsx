import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Layers, ShieldCheck, Database, Cpu, Lock, DollarSign, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "DIAD Technical Architecture & Zero-Custody Blueprint | d4e.ai",
  description: "Self-hosted technical topology, Google Cloud IAM least-privilege standards, and transparent cloud cost calculator for DIAD.",
};

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-obsidian text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/diad#trust-center" className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan hover:underline mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to DIAD Trust Center
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-electric-cyan/40 text-electric-cyan text-xs font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-electric-cyan" />
            Technical Architecture Blueprint
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Zero-Custody Topology & Cloud Cost Blueprint
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            DIAD runs 100% inside your sovereign Google Cloud project. Data for Entrepreneurs maintains zero centralized databases and never hosts your sales records.
          </p>
        </div>

        {/* Section 1: Three-Layer Boundary */}
        <div className="glass-card p-6 sm:p-8 mb-10 border-electric-cyan/30">
          <h2 className="text-xl font-bold text-white mb-4">Three-Layer Security & Data Boundary Model</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            DIAD completely isolates raw sales data, application binaries, and ephemeral AI inference into three distinct security perimeters:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-obsidian/80 p-5 rounded-xl border border-electric-cyan/30">
              <h3 className="font-bold text-electric-cyan text-sm mb-2 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Layer A: Sovereign Data (100% Customer Cloud)
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                BigQuery raw orders, customer profiles, dbt gold marts, and Secret Manager keys reside strictly in your selected GCP region (e.g. Singapore asia-southeast1). Never touches D4E servers.
              </p>
            </div>

            <div className="bg-obsidian/80 p-5 rounded-xl border border-neon-purple/40">
              <h3 className="font-bold text-neon-purple text-sm mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Layer B: Software Engine (Cloud Run)
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                The core multi-agent engine runs as a serverless container within your Cloud Run instance under a dedicated, least-privilege service account. Scale-to-zero enabled.
              </p>
            </div>

            <div className="bg-obsidian/80 p-5 rounded-xl border border-electric-violet/40">
              <h3 className="font-bold text-electric-violet-light text-sm mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Layer C: AI Inference (Zero Data Retention)
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                When executives or storefront visitors query DIAD, prompt context is transmitted over TLS 1.3 with real-time PII masking under contractual zero-training enterprise terms.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: IAM Least Privilege */}
        <div className="glass-card p-6 sm:p-8 mb-10 border-slate">
          <h2 className="text-xl font-bold text-white mb-4">IAM Principle of Least Privilege</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            DIAD executes under a dedicated service account (<code className="text-electric-cyan font-mono">diad-cloud-run-sa</code>) provisioned with the minimum permissions required for operation. DIAD is never granted project owner or administrator privileges:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate rounded-lg">
              <thead className="bg-slate text-gray-300 uppercase font-mono">
                <tr>
                  <th className="p-3">IAM Role</th>
                  <th className="p-3">Technical Scope</th>
                  <th className="p-3">Operational Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate text-gray-300">
                <tr>
                  <td className="p-3 font-mono text-electric-cyan">roles/bigquery.jobUser</td>
                  <td className="p-3">Execute BigQuery jobs</td>
                  <td className="p-3">Runs automated transformation pipelines and Text-to-SQL analytics.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-electric-cyan">roles/bigquery.dataEditor</td>
                  <td className="p-3">Read/write datasets</td>
                  <td className="p-3">Materializes staging views and dbt customer_360 gold marts.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-electric-cyan">roles/secretmanager.secretAccessor</td>
                  <td className="p-3">Read designated secrets</td>
                  <td className="p-3">Fetches encrypted API keys from Google Secret Manager at runtime.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-electric-cyan">roles/storage.objectViewer</td>
                  <td className="p-3">Read Storage buckets</td>
                  <td className="p-3">Loads document sync files and CSV uploads from private buckets.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Cost Calculator */}
        <div className="glass-card p-6 sm:p-8 border-electric-cyan/30">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-electric-cyan" />
            Transparent Self-Hosted Cloud Operating Cost Calculator
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            Because DIAD leverages serverless Google Cloud architecture with automated scale-to-zero capabilities, client infrastructure bills are minimal:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-xs border border-slate rounded-lg">
              <thead className="bg-slate text-gray-300 uppercase font-mono">
                <tr>
                  <th className="p-3">GCP Infrastructure Service</th>
                  <th className="p-3">Typical Production Usage</th>
                  <th className="p-3 text-right">Estimated Monthly Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-white">Google Cloud Run</td>
                  <td className="p-3">Internal Chatbot + Public Storefront Widget (free tier: 2M reqs/mo)</td>
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

          <div className="p-4 rounded-xl bg-obsidian/70 border border-slate text-xs text-gray-300">
            <span className="font-bold text-white">Zero Vendor Lock-In Guarantee: </span>
            If you ever cancel your DIAD license, your BigQuery data warehouse and dbt transformation models remain in your Google Cloud account forever. You can connect them instantly to Looker, Tableau, or PowerBI.
          </div>
        </div>

      </div>
    </div>
  );
}
