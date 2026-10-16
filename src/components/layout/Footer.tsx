import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(102,252,241,0.1)] glass mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div>
                <span className="font-bold text-2xl tracking-tight text-white block">d4e.ai</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm mb-6">
              Empowering startups with Agentic Data Intelligence. Transform your business with robust data infrastructure and AI integrations.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/dataforeps" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-cyan transition-colors" aria-label="X Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 3.98H5.078z"/></svg>
              </a>
              <a href="https://github.com/dataforentrepreneurs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-cyan transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/data-for-entrepreneurs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-cyan transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.924 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-electric-cyan text-sm transition-colors">Home</Link></li>
              <li><Link href="/diad" className="text-gray-400 hover:text-electric-cyan text-sm transition-colors">DIAD Platform</Link></li>
              <li><Link href="/play" className="text-gray-400 hover:text-electric-cyan text-sm transition-colors">Play (Games Hub)</Link></li>
              <li><Link href="/resources" className="text-gray-400 hover:text-electric-cyan text-sm transition-colors">Resources & Books</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-electric-cyan text-sm transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-electric-cyan text-sm transition-colors">Contact</Link></li>
              <li><a href="https://play.d4e.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-cyan text-sm transition-colors">PartyGamesHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Data for Entrepreneurs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/diad/terms" className="hover:text-electric-cyan transition-colors">
              DIAD Terms
            </Link>
            <Link href="/diad/privacy" className="hover:text-electric-cyan transition-colors">
              Privacy Policy
            </Link>
            <Link href="/diad#trust-center" className="hover:text-electric-cyan transition-colors">
              Trust Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
