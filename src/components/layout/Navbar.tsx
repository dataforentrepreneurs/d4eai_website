"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "DIAD", href: "/diad" },
  { name: "Resources", href: "/resources" },
  { name: "AI Games Lab", href: "/play" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Company Name with uploaded favicon.ico */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden glass border border-white/15 p-1 flex items-center justify-center group-hover:border-electric-cyan/50 transition-colors bg-slate/90 shadow-sm">
                <Image
                  src="/favicon.ico"
                  alt="Data for Entrepreneurs Favicon"
                  width={28}
                  height={28}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white block group-hover:text-electric-cyan transition-colors">
                  d4e.ai
                </span>
                <span className="text-[0.62rem] text-electric-cyan font-mono tracking-widest uppercase block -mt-0.5">
                  Data for Entrepreneurs
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    isActive ? "text-electric-cyan font-semibold" : "text-gray-300"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="h-0.5 w-full bg-electric-cyan mt-1 rounded-full"
                    />
                  )}
                </Link>
              );
            })}

            <Link
              href="/diad"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-electric-cyan text-obsidian hover:bg-white transition-all shadow-[0_0_15px_rgba(56,189,248,0.25)]"
            >
              Launch DIAD <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-20 left-0 w-full border-t border-white/10 shadow-2xl">
          <div className="px-3 pt-3 pb-4 space-y-1 sm:px-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-electric-cyan/10 text-electric-cyan font-semibold"
                      : "text-gray-300 hover:bg-slate hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/diad"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-electric-cyan text-obsidian font-bold text-sm"
              >
                Launch DIAD <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
