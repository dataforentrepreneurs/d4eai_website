import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service & License Agreement | d4e.ai",
  description: "Master Services Agreement, Self-Hosted Software License, and Free Beta Evaluation Terms for DIAD.",
};

export default function TermsPage() {
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
            Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Master Terms of Service & Software License
          </h1>
          <p className="text-gray-400 text-xs font-mono">Last Updated: October 2026</p>
        </div>

        <div className="glass-card p-6 sm:p-10 space-y-8 text-sm text-gray-300 leading-relaxed border-electric-cyan/20">
          
          <div>
            <h2 className="text-lg font-bold text-white mb-2">1. License Grant & Permitted Use</h2>
            <p>
              Data for Entrepreneurs (&quot;Vendor&quot;, &quot;D4E&quot;) grants the customer or beta evaluation participant (&quot;Customer&quot;) a non-exclusive, non-transferable, revocable commercial license to deploy and execute the DIAD container software engine within Customer&apos;s internal Google Cloud Platform infrastructure. Customer shall not reverse engineer, decompile, resell as a competing SaaS, redistribute, or sublicense the core container image.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">2. Intellectual Property (IP) Ownership & Partitioning</h2>
            <p className="mb-2">
              <strong className="text-white">Customer IP:</strong> Customer exclusively retains 100% right, title, and ownership over all customer databases, raw sales records, customer PII, canonical schemas, custom dbt transformation models, and BigQuery analytics tables created during the use of DIAD.
            </p>
            <p>
              <strong className="text-white">Vendor IP:</strong> Vendor exclusively retains 100% right, title, and ownership in and to the DIAD core engine, multi-agent orchestration architecture, Text-to-SQL prompt chaining workflows, container binaries, and documentation.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">3. Free Beta Evaluation & Trademark Logo License</h2>
            <p>
              Pilot participants under the Free Beta Program receive software licenses, installation automation, and onboarding technical support at S$0 for ninety (90) days. In exchange, Customer grants Vendor a non-exclusive, worldwide, royalty-free license to display Customer&apos;s brand trade name and logo on d4e.ai and marketing presentations, and agrees to provide one approved written testimonial.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">4. Data Processing Addendum (Singapore PDPA & EU GDPR)</h2>
            <p>
              Customer acts as Data Controller and Vendor acts as Data Intermediary/Processor. The Software implements automated PII masking and least-privilege IAM controls adhering to the Singapore PDPA Protection Obligation and Transfer Limitation Obligation. European transfers incorporate EU GDPR Module 2 Standard Contractual Clauses.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, each party&apos;s total aggregate liability arising out of or related to this Agreement shall be limited to the total fees paid by Customer in the preceding 12 months. During any Free Beta Evaluation period, Vendor&apos;s total liability shall be S$0.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
