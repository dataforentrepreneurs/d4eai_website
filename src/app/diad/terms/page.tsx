import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "DIAD Terms of Service & Free Community License | d4e.ai",
  description: "Terms of Service, Free Self-Hosted Software License, Best-Effort Support, and 30-Day Notice Guarantee for DIAD.",
};

export default function DiadTermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-obsidian text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/diad#trust-center" className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan hover:underline mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to DIAD Trust Center
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-electric-cyan/40 text-electric-cyan text-xs font-mono uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5 text-electric-cyan" />
            DIAD Software Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            DIAD Terms of Service & Free Community License
          </h1>
          <p className="text-gray-400 text-xs font-mono">Last Updated: October 2026 • Status: Active Free Product Tier</p>
        </div>

        <div className="glass-card p-6 sm:p-10 space-y-8 text-sm text-gray-300 leading-relaxed border-electric-cyan/20">
          
          <div className="p-4 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-electric-cyan flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-200 space-y-1">
              <p className="font-bold text-white text-sm">Free Community & Pilot Offering</p>
              <p>DIAD is provided free of charge (S$0 software licensing fee) for self-hosted deployment within your Google Cloud project. No credit card is required to install or operate the software.</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">1. Software License Grant & Self-Hosted Execution</h2>
            <p>
              Data for Entrepreneurs (&quot;Vendor&quot;, &quot;D4E&quot;) grants the customer, evaluator, or commercial brand (&quot;Customer&quot;) a non-exclusive, non-transferable, revocable commercial license to deploy and execute the DIAD container software engine within Customer&apos;s internal Google Cloud Platform infrastructure. Customer shall not reverse engineer, decompile, resell as a competing multi-tenant SaaS, redistribute, or sublicense the core container binaries.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">2. Support Model & Zero SLA Liability</h2>
            <p className="mb-2">
              DIAD is self-hosted software deployed directly into Customer&apos;s isolated cloud environment. Vendor provides best-effort founder guidance, documentation, and installation automation scripts. 
            </p>
            <p>
              Because DIAD is provided free of software licensing fees and executes on Customer&apos;s own cloud resources, Vendor does not provide strict Service Level Agreements (SLAs), uptime guarantees, or financial remedies for operational interruptions. Customer maintains administrative control over their GCP environment.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">3. No Hard Expiration & 30-Day Transition Guarantee</h2>
            <p className="mb-2">
              DIAD does not enforce an arbitrary 90-day cut-off or trial expiration countdown. Customer may continue deploying and using DIAD free of charge during the active product release.
            </p>
            <p>
              In the event that Vendor introduces paid enterprise subscription tiers or changes commercial pricing in the future, Vendor guarantees a minimum of <strong className="text-white">thirty (30) days advance written notice</strong> before any fee structure takes effect. Customer is never auto-billed.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">4. Intellectual Property Partitioning & Zero Lock-In</h2>
            <p className="mb-2">
              <strong className="text-white">Customer IP & Data Independence:</strong> Customer exclusively retains 100% right, title, and ownership over all customer databases, raw sales records, customer PII, canonical schemas, custom dbt transformation models, and BigQuery analytics tables created during the use of DIAD. Even if Customer ceases using DIAD, all BigQuery datasets and analytical models remain 100% Customer&apos;s property with zero lock-in.
            </p>
            <p>
              <strong className="text-white">Vendor IP:</strong> Vendor exclusively retains 100% right, title, and ownership in and to the DIAD core engine, multi-agent orchestration architecture, Text-to-SQL prompt chaining workflows, container binaries, and documentation.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">5. Brand Logo & Evaluation License</h2>
            <p>
              In consideration of the S$0 software license and automated deployment tooling, Customer grants Vendor a non-exclusive, worldwide, royalty-free license to display Customer&apos;s brand trade name and logo on d4e.ai and marketing presentations, and agrees to provide one approved written testimonial or case study snippet following successful deployment.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">6. Data Processing & Privacy (PDPA & GDPR)</h2>
            <p>
              Customer acts as Data Controller and Vendor acts as Data Intermediary/Processor. DIAD includes automated PII masking before query analysis. Because DIAD runs self-hosted in Customer&apos;s GCP account, Vendor servers never ingest, store, or mirror Customer transactional data. Transfers adhere to the Singapore Personal Data Protection Act (PDPA) and EU GDPR requirements.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, each party&apos;s total aggregate liability arising out of or related to this Agreement shall be limited to the total software fees paid by Customer to Vendor in the preceding twelve (12) months. During any free or pilot tier where software fees are S$0, Vendor&apos;s total aggregate liability shall strictly be S$0.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
