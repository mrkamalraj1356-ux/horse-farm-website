'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import BrandLogo from './BrandLogo';
import { useAuth } from '@/context/AuthContext';
import {
  Menu,
  X,
  Sparkles,
  ChevronRight,
  User as UserIcon,
  Shield,
  Tag,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Building2,
  Compass,
  Calendar
} from 'lucide-react';
import { InstagramIcon } from './SocialIcons';

interface NavbarProps {
  onOpenAI?: () => void;
}

export default function Navbar({ onOpenAI }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Horses', href: '/horses' },
    { label: 'Buy', href: '/buy' },
    { label: 'Sell', href: '/sell' },
    { label: 'Farmhouse', href: '/farmhouse' },
    { label: 'Bookings', href: '/book' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleAIClick = () => {
    if (onOpenAI) {
      onOpenAI();
    } else {
      const event = new CustomEvent('open-ai-chat');
      window.dispatchEvent(event);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    router.push('/');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#08090bcc] backdrop-blur-xl border-b border-[#d4af37]/20 shadow-[0_10px_35px_rgba(0,0,0,0.85)] py-2.5'
            : 'bg-gradient-to-b from-[#08090bcc] via-[#08090b55] to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <BrandLogo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden 2xl:flex items-center gap-5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[11px] tracking-widest uppercase transition-colors duration-200 py-1 font-semibold ${
                      isActive
                        ? 'text-[#d4af37]'
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

            {/* Compressed Desktop Nav for standard laptops (xl) */}
            <nav className="hidden xl:flex 2xl:hidden items-center gap-4">
              {[
                { label: 'Horses', href: '/horses' },
                { label: 'Buy', href: '/buy' },
                { label: 'Sell', href: '/sell' },
                { label: 'Farmhouse', href: '/farmhouse' },
                { label: 'Bookings', href: '/book' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact', href: '/contact' }
              ].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[11px] tracking-wider uppercase transition-colors py-1 font-medium ${
                      isActive ? 'text-[#d4af37] font-bold' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons: User Account + Ask AI */}
            <div className="hidden lg:flex items-center gap-3">
              {/* User Account Button & Dropdown */}
              <div ref={dropdownRef} className="relative">
                {user ? (
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#121418] hover:border-[#d4af37] transition-all text-xs font-medium text-white"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#f3e5ab] text-black font-bold text-[10px] flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#f3e5ab] uppercase font-bold text-[9px]">
                      {user.role}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gray-300 hover:text-white px-3.5 py-1.5 rounded-full border border-white/10 hover:border-[#d4af37]/50 bg-white/5 transition-all"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Sign In</span>
                  </Link>
                )}

                {/* Account Popover Menu */}
                {userDropdownOpen && user && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#0f1116] border border-[#d4af37]/30 shadow-[0_15px_40px_rgba(0,0,0,0.9)] p-2 z-50 animate-hero-fade-in">
                    <div className="p-2.5 border-b border-white/10 mb-1">
                      <div className="text-xs font-bold text-white truncate">{user.name}</div>
                      <div className="text-[10px] text-gray-400 truncate">{user.email}</div>
                    </div>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl text-xs text-white hover:bg-[#d4af37]/20 hover:text-[#f3e5ab] transition-colors"
                      >
                        <Shield className="w-4 h-4 text-[#d4af37]" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    {user.role === 'seller' && (
                      <Link
                        href="/seller"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl text-xs text-white hover:bg-[#d4af37]/20 hover:text-[#f3e5ab] transition-colors"
                      >
                        <Tag className="w-4 h-4 text-[#d4af37]" />
                        <span>Seller Portal</span>
                      </Link>
                    )}

                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl text-xs text-white hover:bg-[#d4af37]/20 hover:text-[#f3e5ab] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#d4af37]" />
                      <span>My Enquiries & Bookings</span>
                    </Link>

                    <div className="h-[1px] bg-white/10 my-1" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Ask AI Button */}
              <button
                type="button"
                onClick={handleAIClick}
                className="group relative flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transform hover:scale-[1.02] transition-all duration-300"
              >
                <img
                  src="/images/logo/horse-county-emblem.png"
                  alt="HC"
                  className="w-4 h-4 rounded-full object-contain shrink-0"
                />
                <span>Ask AI</span>
                <Sparkles className="w-3.5 h-3.5 text-black animate-pulse" />
              </button>
            </div>

            {/* Mobile Hamburger Header Items */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                type="button"
                onClick={handleAIClick}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
                aria-label="Ask AI Assistant"
              >
                <Sparkles className="w-3 h-3 text-black" />
                <span>AI</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2 rounded-xl text-gray-300 hover:text-white bg-white/10 border border-white/15 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#d4af37]" /> : <Menu className="w-5 h-5 text-white" />}
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
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <BrandLogo size="sm" withLink={true} />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Bar in Mobile Drawer */}
              {user ? (
                <div className="my-4 p-3 rounded-xl bg-[#16181e] border border-[#d4af37]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white truncate">{user.name}</div>
                      <div className="text-[10px] text-[#d4af37] uppercase font-semibold">{user.role} Account</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-1.5 text-rose-400 hover:text-rose-300"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="my-4">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Sign In / Register</span>
                  </Link>
                </div>
              )}

              {/* Mobile Links */}
              <div className="py-2 flex flex-col gap-1.5">
                {user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/15 border border-[#d4af37]/30"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>Admin Management</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#d4af37]" />
                  </Link>
                )}

                {user?.role === 'seller' && (
                  <Link
                    href="/seller"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/15 border border-[#d4af37]/30"
                  >
                    <span className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>Seller Portal</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#d4af37]" />
                  </Link>
                )}

                {user && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-white/5"
                  >
                    <span className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-[#d4af37]" />
                      <span>My Dashboard</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>
                )}

                <div className="h-[1px] bg-white/10 my-2" />

                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-xs tracking-wider uppercase transition-colors ${
                        isActive
                          ? 'bg-[#d4af37]/15 text-[#d4af37] font-semibold border-l-2 border-[#d4af37]'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAIClick();
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-lg"
              >
                <img
                  src="/images/logo/horse-county-emblem.png"
                  alt="HC"
                  className="w-4 h-4 rounded-full object-contain"
                />
                <span>Ask AI Assistant</span>
              </button>

              <div className="text-center pt-2 text-[10px] tracking-[0.25em] uppercase text-[#c5a059]/80 font-medium">
                HORSES • HERITAGE • PASSION
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
