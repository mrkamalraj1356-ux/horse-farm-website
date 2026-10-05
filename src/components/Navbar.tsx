'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from './BrandLogo';
import { FARM_CONFIG } from '@/data/config';
import {
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Compass,
  PhoneCall
} from 'lucide-react';
import { InstagramIcon } from './SocialIcons';

interface NavbarProps {
  onOpenAI?: () => void;
}

export default function Navbar({ onOpenAI }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Horses', href: '/horses' },
    { label: 'Buy a Horse', href: '/buy' },
    { label: 'Sell Your Horse', href: '/sell' },
    { label: 'Book a Horse', href: '/book' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
  ];

  const handleAIClick = () => {
    if (onOpenAI) {
      onOpenAI();
    } else {
      const event = new CustomEvent('open-ai-chat');
      window.dispatchEvent(event);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0b0dd9] backdrop-blur-md border-b border-[#d4af37]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-gradient-to-b from-[#08090bcc] via-[#08090b66] to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <BrandLogo size="md" />

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs tracking-wider uppercase transition-colors duration-300 py-1 font-medium ${
                      isActive
                        ? 'text-[#d4af37] font-semibold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Instagram & Ask AI buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/instagram"
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gray-300 hover:text-[#d4af37] px-3 py-1.5 rounded-full border border-white/10 hover:border-[#d4af37]/40 bg-white/5 transition-all duration-300"
                title="View Instagram Feed"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Instagram</span>
              </Link>

              <button
                type="button"
                onClick={handleAIClick}
                className="group relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transform hover:scale-[1.02] transition-all duration-300"
              >
                <span className="text-sm">🐎</span>
                <span>Ask AI</span>
                <Sparkles className="w-3.5 h-3.5 text-black animate-pulse" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                type="button"
                onClick={handleAIClick}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] touch-manipulation cursor-pointer active:scale-95 transition-transform"
                aria-label="Ask AI Assistant"
              >
                <span>🐎</span>
                <span>AI</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2.5 rounded-xl text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 touch-manipulation cursor-pointer active:scale-95 transition-all"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#d4af37]" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99999] xl:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-[85%] max-w-sm h-full bg-[#0d0e12] border-l border-[#d4af37]/30 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <BrandLogo size="sm" withLink={false} />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-3 px-4 rounded-lg text-sm tracking-wider uppercase transition-colors ${
                        isActive
                          ? 'bg-[#d4af37]/15 text-[#d4af37] font-semibold border-l-2 border-[#d4af37]'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/instagram"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider text-gray-300 bg-white/5 border border-white/10 hover:border-[#d4af37]/40"
              >
                <InstagramIcon className="w-4 h-4 text-[#d4af37]" />
                <span>Instagram Feed</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAIClick();
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-lg"
              >
                <span className="text-base">🐎</span>
                <span>Ask AI Assistant</span>
              </button>

              <div className="text-center pt-2 text-[11px] text-gray-500">
                {FARM_CONFIG.tagline}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
