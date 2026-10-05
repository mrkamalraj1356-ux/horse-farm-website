import React from 'react';
import Link from 'next/link';
import BrandLogo from './BrandLogo';
import { FARM_CONFIG } from '@/data/config';
import {
  ShieldCheck,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './SocialIcons';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative bg-[#07080a] border-t border-[#d4af37]/20 pt-20 pb-12 overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-[#d4af37]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1 & 2: Brand & Story */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <BrandLogo size="lg" />
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-md">
              A premier breeding sanctuary dedicated to the pure preservation, training, and ethical stewardship of the regal Marwari and Kathiawari horses. Where centuries of royal equestrian heritage meet world-class equine care.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="/instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37] flex items-center justify-center text-gray-300 hover:text-[#d4af37] transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37] flex items-center justify-center text-gray-300 hover:text-[#d4af37] transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37] flex items-center justify-center text-gray-300 hover:text-[#d4af37] transition-all"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-[#c5a059] bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1.5 rounded-full w-fit mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Certified Pedigree & Ethical Bloodline Sanctuary</span>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/horses" className="hover:text-white transition-colors">
                  All Horses Catalog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Media & Farm Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Heritage & Stables
                </Link>
              </li>
              <li>
                <Link href="/instagram" className="hover:text-white transition-colors">
                  Instagram Highlights
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              Equestrian Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
              <li>
                <Link href="/buy" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Buy a Horse</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Book Private Viewing</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Sell Your Horse</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Concierge Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Farm Sanctuary Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              Sanctuary Concierge
            </h4>
            <div className="flex flex-col gap-3 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{FARM_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{FARM_CONFIG.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Visiting Hours: 08:00 AM - 06:00 PM (By Appointment)</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/book"
                className="inline-block w-full text-center py-2 px-4 rounded-md text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] hover:opacity-95 transition-opacity"
              >
                Schedule Farm Visit
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {currentYear} {FARM_CONFIG.name}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#c5a059] font-medium tracking-wider">
              {FARM_CONFIG.subTagline}
            </span>
            <span className="text-gray-600">•</span>
            <span>Client Presentation Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
