import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Server, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "DIAD Subprocessor Registry | d4e.ai",
  description: "Official real-time register of third-party subprocessors for DIAD, detailing processing locations and security certifications.",
};

export default function SubprocessorsPage() {
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
      name: "Stripe Payments Singapore Pte. Ltd.",
      hq: "Singapore",
      role: "Payment Processing & Subscriptions (Commercial Phase)",
      data: "Customer billing details, corporate UEN",
      location: "Singapore & Global Financial Cloud",
      compliance: "PCI-DSS Level 1, MAS Major Payment Institution License"
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
    <div className="min-h-screen pt-28 pb-20 bg-obsidian text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/diad#trust-center" className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan hover:underline mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to DIAD Trust Center
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-electric-cyan/40 text-electric-cyan text-xs font-mono uppercase tracking-wider mb-4">
            <Server className="w-3.5 h-3.5 text-electric-cyan" />
            Official Governance Document
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Third-Party Subprocessor Registry
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            In compliance with the Singapore Personal Data Protection Act (PDPA 2012) and EU GDPR, this register details all third-party providers handling ephemeral data within DIAD.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 mb-10 border-electric-cyan/30">
          <h2 className="text-xl font-bold text-white mb-4">Active Subprocessors</h2>
          <div className="overflow-x-auto mb-6">
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
        </div>

        <div className="glass-card p-6 sm:p-8 border-slate">
          <h2 className="text-lg font-bold text-white mb-3">Client-Direct Business Accounts</h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Enterprise clients with strict data privacy mandates can connect their direct OpenAI Team / Enterprise accounts, Google Cloud Vertex AI projects, and dedicated Pinecone pods to DIAD. Doing so ensures direct zero-retention BAAs between your organization and the underlying infrastructure providers.
          </p>
        </div>

      </div>
    </div>
  );
}
