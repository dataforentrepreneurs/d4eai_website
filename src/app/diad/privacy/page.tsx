import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "DIAD Privacy Policy & Zero-Telemetry Guarantee | d4e.ai",
  description: "Self-Hosted Privacy Architecture, Zero-Telemetry Guarantee, and Automated PII Redaction for DIAD.",
};

export default function DiadPrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-obsidian text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/diad#trust-center" className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan hover:underline mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to DIAD Trust Center
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-electric-cyan/40 text-electric-cyan text-xs font-mono uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5 text-electric-cyan" />
            DIAD Privacy Policy
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            DIAD Privacy Policy & Zero-Telemetry Guarantee
          </h1>
          <p className="text-gray-400 text-xs font-mono">Last Updated: October 2026 • Scope: DIAD Platform & Agents</p>
        </div>

        <div className="glass-card p-6 sm:p-10 space-y-8 text-sm text-gray-300 leading-relaxed border-electric-cyan/20">
          
          <div className="p-5 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-electric-cyan flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-white mb-1">Self-Hosted Zero-Telemetry Guarantee</h2>
              <p className="text-xs text-gray-200">
                DIAD is designed from the ground up on a zero-intermediary architecture. When you deploy DIAD in your Google Cloud Platform account, <strong>your business data never touches Data for Entrepreneurs servers</strong>.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">1. Data Architecture: No Intermediary Servers</h2>
            <p className="mb-2">
              Unlike multi-tenant SaaS tools that ingest your transactional data into third-party data warehouses, DIAD deploys entirely inside your own GCP project:
            </p>
            <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
              <li><strong className="text-white">Customer BigQuery:</strong> Your raw orders, inventory levels, margins, and customer dossiers live in your private BigQuery dataset.</li>
              <li><strong className="text-white">Customer Cloud Run:</strong> The multi-agent chatbot and API execute inside your private Cloud Run container instance.</li>
              <li><strong className="text-white">Customer GCP Secret Manager:</strong> Your database credentials and API keys are stored directly in your cloud vault.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-obsidian border border-electric-cyan/20">
            <h2 className="text-lg font-bold text-electric-cyan mb-2">2. What We Guarantee We Never Collect</h2>
            <ul className="space-y-2 text-xs text-gray-200">
              <li>✔ <strong>Zero Runtime Telemetry in Deployed DIAD Production Services:</strong> Deployed Cloud Run containers and BigQuery warehouses contain zero hidden diagnostic beacons or phone-home calls back to D4E. The local Setup Wizard (<code>localhost:8000</code>) records only anonymous setup stage-timing diagnostics (tab/step durations, disableable via <code>DIAD_NO_TELEMETRY=1</code>) with zero business data, credentials, filenames, or queries.</li>
              <li>✔ <strong>Zero Transactional Mirroring:</strong> We do not log, capture, or store your order history, sales volume, customer addresses, or revenue data.</li>
              <li>✔ <strong>Zero Training on Customer Data:</strong> We never use your business documents, policies, or customer conversations to train public foundation models.</li>
              <li>✔ <strong>Zero Data Brokering:</strong> Your business intelligence is never sold, shared, or brokered to advertisers or market research firms.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">3. Automated Real-Time PII Redaction</h2>
            <p>
              DIAD enforces an automated regex-based redaction engine at the API gateway layer before any natural language query or database output is formatted for LLM evaluation. Customer email addresses (e.g., <code>j***@gmail.com</code>) and customer phone numbers (e.g., <code>+65****67</code>) are masked in-flight, preventing accidental leakage of customer personal identity information.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">4. AI Subprocessors & Direct Billing</h2>
            <p>
              DIAD connects directly to industry-standard AI foundation models (such as Google Cloud Vertex AI, OpenAI, or Pinecone) using API credentials configured by Customer. Communication occurs directly between Customer&apos;s Cloud Run instance and the AI provider endpoint via TLS 1.3 encryption. We recommend business/enterprise agreements with your chosen AI providers to ensure zero retention on prompts.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">5. Compliance & Regulatory Alignment</h2>
            <p>
              DIAD is architected to facilitate Customer&apos;s compliance with the Singapore Personal Data Protection Act (PDPA), EU General Data Protection Regulation (GDPR), and California Consumer Privacy Act (CCPA). Under these frameworks, Customer acts as Data Controller, and DIAD operates within Customer&apos;s direct technological control.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">6. Website Analytics, Setup Timing &amp; Pilot Registration on d4e.ai</h2>
            <p className="mb-2">
              While deployed <strong>DIAD production services</strong> (Cloud Run &amp; BigQuery) in your Google Cloud account strictly maintain zero telemetry and zero phone-home behavior, our public marketing website (<code>d4e.ai</code>) uses Google Analytics 4, Microsoft Clarity (with Balanced input masking), and first-party engagement metrics (page views, scroll depth, active time, video playback, and button clicks) to understand which documentation and demos are most helpful.
            </p>
            <p className="mb-2">
              The local <strong>DIAD Onboarding Setup Wizard</strong> (<code>localhost:8000</code>) also records anonymous stage-timing diagnostics (tab/step durations and completion milestones—never your business name, GCP project ID, API keys, service account files, uploaded filenames, or chatbot queries) to help improve onboarding speed; teams can disable it anytime by setting <code>DIAD_NO_TELEMETRY=1</code> before launching the wizard.
            </p>
            <p>
              When you voluntarily submit the <strong>DIAD Free Pilot Activation</strong> or Contact form on <code>d4e.ai</code>, the profile information you enter (name, brand name, work email, storefront URL, and optional company logo) is transmitted to Data for Entrepreneurs solely to provision your community license, contact you regarding pilot support, and display your brand logo if consented.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">7. Privacy Inquiries &amp; DPA Requests</h2>
            <p>
              If your enterprise compliance team requires a signed Data Processing Addendum (DPA), custom security assessment, or assistance with privacy inquiries, please contact our Data Protection Officer at:
            </p>
            <div className="mt-2 inline-block px-4 py-2 rounded-lg bg-obsidian border border-electric-cyan/30 text-electric-cyan font-mono text-xs">
              privacy@d4e.ai
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
