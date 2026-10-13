'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import BrandLogo from '@/components/BrandLogo';
import {
  Shield,
  Tag,
  User as UserIcon,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Lock,
  Phone,
  Mail
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, quickDemoLogin, user } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await login(identifier, password);
    setLoading(false);

    if (res.success) {
      router.push('/dashboard');
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  const handleDemo = async (role: 'admin' | 'seller' | 'customer') => {
    setLoading(true);
    setError('');
    const res = await quickDemoLogin(role);
    setLoading(false);

    if (res.success) {
      if (role === 'admin') router.push('/admin');
      else if (role === 'seller') router.push('/seller');
      else router.push('/dashboard');
    } else {
      setError(res.error || 'Demo login failed');
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Card Header with Emblem */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-4 p-1">
            <img
              src="/images/logo/horse-county-emblem.png"
              alt="Horse County"
              className="w-full h-full object-contain rounded-full drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Horse County Portal
          </h2>
          <p className="text-xs text-[#f3e5ab] tracking-widest uppercase mt-1">
            HORSES • HERITAGE • PASSION
          </p>
        </div>

        {/* Main Login Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/30 shadow-2xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                Mobile Number or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="+91 98765 43210 or name@domain.com"
                  className="w-full bg-[#14161b] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                Password / Mobile OTP
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password (or 123456 in dev)"
                  className="w-full bg-[#14161b] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_5px_20px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all disabled:opacity-50 mt-2 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Quick Demo Access Switcher */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold text-center mb-3">
              One-Click Role Login
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemo('admin')}
                disabled={loading}
                className="py-2.5 px-2 rounded-xl text-[11px] font-semibold text-center border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#f3e5ab] hover:bg-[#d4af37]/20 transition-all cursor-pointer flex flex-col items-center gap-1"
              >
                <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemo('seller')}
                disabled={loading}
                className="py-2.5 px-2 rounded-xl text-[11px] font-semibold text-center border border-white/15 bg-white/5 text-gray-200 hover:bg-white/10 transition-all cursor-pointer flex flex-col items-center gap-1"
              >
                <Tag className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Seller</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemo('customer')}
                disabled={loading}
                className="py-2.5 px-2 rounded-xl text-[11px] font-semibold text-center border border-white/15 bg-white/5 text-gray-200 hover:bg-white/10 transition-all cursor-pointer flex flex-col items-center gap-1"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Buyer</span>
              </button>
            </div>
          </div>

          {/* Links to Register */}
          <div className="mt-6 text-center text-xs text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-[#d4af37] font-semibold hover:underline">
              Create User / Seller Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
