import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Commercial Privacy Policy | d4e.ai",
  description: "Commercial Privacy Policy and Self-Hosted Software Zero-Telemetry Guarantee for d4e.ai and DIAD.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Commercial Privacy Policy & Zero-Telemetry Guarantee
          </h1>
          <p className="text-gray-400 text-xs font-mono">Last Updated: October 2026</p>
        </div>

        <div className="glass-card p-6 sm:p-10 space-y-8 text-sm text-gray-300 leading-relaxed border-electric-cyan/20">
          
          <div>
            <h2 className="text-lg font-bold text-white mb-2">1. Marketing Website (d4e.ai) Privacy Notice</h2>
            <p>
              When visitors access d4e.ai, book consultations, or download installer files, we collect standard server logs (IP address, browser type) and voluntary business contact details (name, corporate email, storefront URL). Payment processing is managed securely by Stripe Payments Singapore; we never store raw credit card numbers.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-obsidian border border-electric-cyan/30">
            <h2 className="text-lg font-bold text-electric-cyan mb-2">2. Self-Hosted Software Zero-Telemetry Guarantee</h2>
            <p className="mb-3">
              With respect to the self-hosted DIAD engine deployed within Customer&apos;s Google Cloud project:
            </p>
            <ul className="space-y-2 text-xs text-gray-200">
              <li>✔ <strong>Zero Diagnostic Phone-Home:</strong> DIAD contains zero background diagnostic beacons, tracking pixels, or phone-home telemetry.</li>
              <li>✔ <strong>Zero Business Data Ingestion:</strong> Vendor does not collect, mirror, or inspect your sales transactions, profit margins, inventory levels, or customer records.</li>
              <li>✔ <strong>Zero Third-Party Advertising:</strong> Data processed within your DIAD instance is never sold, leased, or utilized for commercial advertising.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">3. Automated PII Redaction Engine</h2>
            <p>
              Before any transactional row or customer question is processed for vector indexing or LLM inference, it passes through real-time regex filters masking emails (e.g. j***@gmail.com) and phone numbers (+65****67).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">4. Contact Information</h2>
            <p>
              For privacy inquiries, DPA execution, or data rights requests, contact our Data Protection Officer at <code className="text-electric-cyan font-mono">privacy@d4e.ai</code>.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
