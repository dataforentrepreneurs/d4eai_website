"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function ApiSnippet() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `import { D4eAgent } from '@d4e/ai-sdk';

// Initialize your Agentic Data Assistant
const agent = new D4eAgent({
  apiKey: process.env.D4E_API_KEY,
  model: 'd4e-pro-max',
});

// Query your startup's data pipeline
const response = await agent.query({
  instruction: "Analyze Q3 retention metrics and propose a strategy.",
  context: "user_database_v2"
});

console.log(response.insights);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Developer-First <br/>
              <span className="text-electric-cyan">Integration</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We built d4e.ai from the ground up for founders and engineers. Integrate agentic AI into your data pipelines with just a few lines of code. No vendor lock-in, just pure, scalable intelligence.
            </p>
            <ul className="space-y-4">
              {['Seamless Next.js & Node.js SDK', 'Instant Context Retrieval (RAG)', 'Enterprise-grade security & scaling'].map((feature, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <div className="mr-4 p-1 rounded-full bg-electric-violet/20 text-electric-violet">
                    <Check className="w-4 h-4" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate bg-obsidian/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-mono text-gray-400">integrate.ts</span>
              </div>
              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-electric-cyan transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-electric-cyan" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed">
                <code className="text-gray-300">
                  <span className="text-electric-violet-light">import</span> &#123; D4eAgent &#125; <span className="text-electric-violet-light">from</span> <span className="text-electric-cyan-dim">'@d4e/ai-sdk'</span>;<br/><br/>
                  <span className="text-gray-500">// Initialize your Agentic Data Assistant</span><br/>
                  <span className="text-electric-violet-light">const</span> agent = <span className="text-electric-violet-light">new</span> <span className="text-electric-cyan">D4eAgent</span>(&#123;<br/>
                  &nbsp;&nbsp;apiKey: process.env.D4E_API_KEY,<br/>
                  &nbsp;&nbsp;model: <span className="text-electric-cyan-dim">'d4e-pro-max'</span>,<br/>
                  &#125;);<br/><br/>
                  <span className="text-gray-500">// Query your startup's data pipeline</span><br/>
                  <span className="text-electric-violet-light">const</span> response = <span className="text-electric-violet-light">await</span> agent.<span className="text-electric-cyan">query</span>(&#123;<br/>
                  &nbsp;&nbsp;instruction: <span className="text-electric-cyan-dim">"Analyze Q3 retention metrics and propose a strategy."</span>,<br/>
                  &nbsp;&nbsp;context: <span className="text-electric-cyan-dim">"user_database_v2"</span><br/>
                  &#125;);<br/><br/>
                  console.<span className="text-electric-cyan">log</span>(response.insights);
                </code>
              </pre>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
