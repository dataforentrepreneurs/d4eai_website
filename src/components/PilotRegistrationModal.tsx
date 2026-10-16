"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  Download,
  Terminal,
  Check,
  Copy,
  ArrowRight,
  Sparkles,
  Building2,
  Mail,
  User,
  Globe
} from "lucide-react";

export interface RegistrationData {
  fullName: string;
  brandName: string;
  workEmail: string;
  storeUrl: string;
  storeTier: string;
}

interface PilotRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: RegistrationData) => void;
}

export default function PilotRegistrationModal({
  isOpen,
  onClose,
  onSuccess
}: PilotRegistrationModalProps) {
  const [fullName, setFullName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [storeTier, setStoreTier] = useState("Growth");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const psCommand = `irm https://raw.githubusercontent.com/dataforentrepreneurs/DIAD_Scaffold/main/setup.ps1 | iex`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !brandName.trim() || !workEmail.trim() || !storeUrl.trim()) {
      setErrorMsg("Please complete all required fields.");
      return;
    }
    if (!agreed) {
      setErrorMsg("Please accept the Free Community License and Pilot Logo Agreement.");
      return;
    }

    setErrorMsg("");
    const leadData: RegistrationData = {
      fullName: fullName.trim(),
      brandName: brandName.trim(),
      workEmail: workEmail.trim(),
      storeUrl: storeUrl.trim(),
      storeTier
    };

    // Store consent & registration locally
    try {
      localStorage.setItem("diad_pilot_lead", JSON.stringify({
        ...leadData,
        registeredAt: new Date().toISOString(),
        consentAccepted: true
      }));
    } catch {}

    // Trigger automatic download of setup.bat
    const link = document.createElement("a");
    link.href = "/setup.bat";
    link.download = "setup.bat";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsSubmitted(true);
    if (onSuccess) {
      onSuccess(leadData);
    }
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(psCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-obsidian/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl glass-card border border-electric-cyan/40 bg-obsidian/95 shadow-2xl p-6 sm:p-8 rounded-2xl z-10 text-white my-8"
        >
          {/* Close button */}
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate/50 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Free Pilot Activation
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                  Activate Your Free DIAD License
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  DIAD is 100% free (S$0 software licensing fee) and runs completely inside your own Google Cloud account. Please confirm your brand details below to unlock your setup package.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-electric-cyan" />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Tan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate/40 border border-slate focus:border-electric-cyan focus:outline-none text-sm text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-electric-cyan" />
                      Store / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. Acme Lifestyle"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate/40 border border-slate focus:border-electric-cyan focus:outline-none text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-electric-cyan" />
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="alex@acmelifestyle.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate/40 border border-slate focus:border-electric-cyan focus:outline-none text-sm text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-electric-cyan" />
                      Store Website URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                      placeholder="https://acmelifestyle.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate/40 border border-slate focus:border-electric-cyan focus:outline-none text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Monthly Order Volume (for recommended cloud budget)
                  </label>
                  <select
                    value={storeTier}
                    onChange={(e) => setStoreTier(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate/40 border border-slate focus:border-electric-cyan focus:outline-none text-sm text-white"
                  >
                    <option value="Boutique" className="bg-obsidian text-white">Boutique (&lt; 1,000 orders/mo • ~S$25-S$35 cloud bill)</option>
                    <option value="Growth" className="bg-obsidian text-white">Growth Retail (1,000 – 10,000 orders/mo • ~S$50-S$80 cloud bill)</option>
                    <option value="Scaling" className="bg-obsidian text-white">Scaling Omnichannel (10,000+ orders/mo • ~S$100-S$150 cloud bill)</option>
                  </select>
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 p-3.5 rounded-xl bg-electric-cyan/5 border border-electric-cyan/20 cursor-pointer hover:bg-electric-cyan/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate text-electric-cyan focus:ring-0 focus:outline-none cursor-pointer"
                    />
                    <span className="text-xs text-gray-300 leading-relaxed">
                      I agree to the{" "}
                      <Link href="/diad/terms" target="_blank" className="text-electric-cyan underline hover:text-white">
                        DIAD Free Community Terms
                      </Link>{" "}
                      and{" "}
                      <Link href="/diad/privacy" target="_blank" className="text-electric-cyan underline hover:text-white">
                        Zero-Telemetry Privacy Policy
                      </Link>
                      . In exchange for free self-hosted platform access, I grant Data for Entrepreneurs permission to display our brand name and logo on d4e.ai as an early pilot partner.
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!agreed}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    agreed
                      ? "bg-gradient-to-r from-electric-cyan to-emerald-400 text-obsidian hover:opacity-95 shadow-electric-cyan/20 cursor-pointer"
                      : "bg-slate/50 text-gray-500 cursor-not-allowed border border-slate"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Agree & Download Setup Kit (.bat)
                </button>
              </form>
            </div>
          ) : (
            /* Success State */
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Setup Kit Ready for {brandName}!
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                Your download of <code className="text-electric-cyan font-mono">setup.bat</code> has started. Follow the steps below to launch your onboarding suite.
              </p>

              {/* Onboarding Instructions */}
              <div className="text-left bg-obsidian p-4 rounded-xl border border-electric-cyan/20 mb-6 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-electric-cyan/20 text-electric-cyan flex items-center justify-center font-bold flex-shrink-0 text-[0.7rem]">1</span>
                  <span>Double-click the downloaded <strong>setup.bat</strong> file (or run in PowerShell).</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-electric-cyan/20 text-electric-cyan flex items-center justify-center font-bold flex-shrink-0 text-[0.7rem]">2</span>
                  <span>The script configures your environment and opens <code className="text-electric-cyan font-mono">http://localhost:8000</code> in your browser.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-electric-cyan/20 text-electric-cyan flex items-center justify-center font-bold flex-shrink-0 text-[0.7rem]">3</span>
                  <span>Link your Google Cloud project and connect your store data with 1-click guided prompts.</span>
                </div>
              </div>

              {/* Direct Command Alternative */}
              <div className="mb-6">
                <p className="text-xs text-gray-400 mb-2 font-mono text-left">Or paste directly into PowerShell:</p>
                <div className="bg-obsidian border border-slate rounded-xl p-3 flex items-center justify-between gap-3 text-left">
                  <code className="text-electric-cyan font-mono text-xs break-all">
                    {psCommand}
                  </code>
                  <button
                    onClick={handleCopyCommand}
                    className="flex-shrink-0 p-2 rounded-lg bg-electric-violet/30 text-white hover:bg-electric-violet/50 border border-electric-violet/40 transition-colors"
                    title="Copy Command"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/setup.bat"
                  download="setup.bat"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate hover:bg-slate/80 text-white text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Again
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-electric-cyan text-obsidian font-bold text-xs hover:bg-electric-cyan/90 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
