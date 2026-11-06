"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "DIAD", href: "/diad" },
  { name: "Play", href: "/play" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-[rgba(102,252,241,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden glass border border-electric-cyan/30 p-1 flex items-center justify-center group-hover:border-electric-cyan transition-colors bg-obsidian/60 shadow-[0_0_15px_rgba(102,252,241,0.2)]">
                <Image
                  src="/images/d4e_logo.png"
                  alt="Data for Entrepreneurs Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white block group-hover:text-electric-cyan transition-colors">d4e.ai</span>
                <span className="text-[0.65rem] text-electric-cyan font-mono tracking-widest uppercase block -mt-0.5">Data for Entrepreneurs</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-electric-cyan ${
                    isActive ? "text-electric-cyan" : "text-gray-300"
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
            <a href="https://play.d4e.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/50 hover:bg-neon-purple/30 transition-all">
              <Gamepad2 className="w-4 h-4" /> Party Games Hub
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-20 left-0 w-full border-t border-[rgba(102,252,241,0.1)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-electric-cyan/10 text-electric-cyan"
                      : "text-gray-300 hover:bg-slate hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <a href="https://play.d4e.ai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full mt-4 px-5 py-3 text-base font-medium rounded-md bg-neon-purple/20 text-neon-purple border border-neon-purple/50 hover:bg-neon-purple/30">
              <Gamepad2 className="w-5 h-5" /> Party Games Hub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
