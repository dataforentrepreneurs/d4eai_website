"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-[80vh] py-24 relative z-10 flex items-center">
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
              Have questions about our agentic data intelligence platform, consulting services, or resources? We'd love to hear from you.
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
            <form action="https://formspree.io/f/mvgzepkj" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
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
                  className="w-full bg-obsidian/50 border border-slate rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-cyan transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-electric-cyan text-obsidian font-bold rounded-lg hover:bg-white transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
