"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { FORMSPREE_FALLBACK_ENDPOINT, trackEvent } from "@/lib/analytics";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const touchedFieldsRef = useRef<Set<string>>(new Set());
  const lastFieldRef = useRef<string>("");
  const submittedRef = useRef<boolean>(false);
  const snapshotRef = useRef({ name: "", email: "", message: "" });

  useEffect(() => {
    snapshotRef.current = { name, email, message };
  }, [name, email, message]);

  const flushAbandonIfNeeded = useCallback(() => {
    if (submittedRef.current || touchedFieldsRef.current.size === 0) return;
    const snap = snapshotRef.current;
    const completed: string[] = [];
    if (snap.name.trim()) completed.push("name");
    if (snap.email.trim()) completed.push("email");
    if (snap.message.trim()) completed.push("message");

    trackEvent(
      "contact_form_abandon",
      {
        last_field_touched: lastFieldRef.current || "none",
        fields_completed: completed.join(","),
        fields_completed_count: completed.length,
      },
      { beacon: true }
    );
    touchedFieldsRef.current.clear();
  }, []);

  useEffect(() => {
    const handlePageHide = () => flushAbandonIfNeeded();
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      flushAbandonIfNeeded();
    };
  }, [flushAbandonIfNeeded]);

  const markField = (fieldName: string) => {
    lastFieldRef.current = fieldName;
    if (!touchedFieldsRef.current.has(fieldName)) {
      touchedFieldsRef.current.add(fieldName);
      trackEvent("contact_field_interacted", { field_name: fieldName });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch(FORMSPREE_FALLBACK_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          _replyto: email.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      submittedRef.current = true;
      setSubmitStatus("success");
      trackEvent("contact_form_submit", {
        message_length: message.trim().length,
      });
      trackEvent("generate_lead", {
        lead_type: "contact_form",
      });
    } catch {
      setSubmitStatus("error");
      setErrorMessage(
        "Unable to send message right now. Please email support@dataforentrepreneurs.com directly."
      );
      trackEvent("contact_form_error", { reason: "network_or_http_error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-track-section="contact_main" className="min-h-[80vh] py-24 relative z-10 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in <span className="text-electric-cyan">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
              Have questions about our agentic data intelligence platform, consulting services, or resources? We&apos;d love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate flex items-center justify-center border border-[rgba(102,252,241,0.2)]">
                  <Mail className="w-5 h-5 text-electric-cyan" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Email</div>
                  <a href="mailto:support@dataforentrepreneurs.com" className="text-lg text-gray-300 hover:text-white transition-colors">
                    support@dataforentrepreneurs.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate flex items-center justify-center border border-[rgba(138,43,226,0.2)]">
                  <Phone className="w-5 h-5 text-electric-violet-light" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Phone</div>
                  <div className="text-lg text-gray-300">
                    (+65) 8379 5958
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 md:p-12"
          >
            {submitStatus === "success" ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Nikhil and the Data for Entrepreneurs team will reply shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setMessage("");
                    submittedRef.current = false;
                    touchedFieldsRef.current.clear();
                    setSubmitStatus("idle");
                  }}
                  className="px-5 py-2.5 rounded-lg bg-slate text-white text-xs font-semibold hover:bg-slate/80 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus === "error" && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onFocus={() => markField("name")}
                    onChange={(e) => {
                      markField("name");
                      setName(e.target.value);
                    }}
                    className="w-full bg-obsidian/50 border border-slate rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-cyan transition-colors"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="_replyto"
                    required
                    value={email}
                    onFocus={() => markField("email")}
                    onChange={(e) => {
                      markField("email");
                      setEmail(e.target.value);
                    }}
                    className="w-full bg-obsidian/50 border border-slate rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-cyan transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={message}
                    onFocus={() => markField("message")}
                    onChange={(e) => {
                      markField("message");
                      setMessage(e.target.value);
                    }}
                    className="w-full bg-obsidian/50 border border-slate rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-cyan transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-electric-cyan text-obsidian font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
