"use client";

import { motion } from "framer-motion";
import { Database, Bot, LineChart, Shield } from "lucide-react";

const features = [
  {
    icon: <Database className="w-8 h-8" />,
    title: "Data Pipelines",
    description: "Automated, scalable infrastructure tailored for early-stage startups and growing businesses.",
    color: "text-electric-cyan"
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "Agentic Chatbots",
    description: "Deploy pro-level, LLM-powered bots with RAG architecture and zero third-party lock-in.",
    color: "text-electric-violet-light"
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: "Advanced Analytics",
    description: "Turn raw data into actionable insights with beautiful, automated dashboards.",
    color: "text-electric-cyan"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure by Design",
    description: "Enterprise-grade security ensuring your proprietary data remains safe and compliant.",
    color: "text-electric-violet-light"
  }
];

export default function FeatureCards() {
  return (
    <section className="py-24 relative z-10 bg-obsidian/40 border-y border-[rgba(102,252,241,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Platform Capabilities</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to transform your raw data into a powerful asset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 group glass-card-hover"
            >
              <div className={`mb-6 p-4 rounded-xl inline-block bg-slate/50 border border-slate group-hover:border-[rgba(102,252,241,0.3)] transition-colors ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
