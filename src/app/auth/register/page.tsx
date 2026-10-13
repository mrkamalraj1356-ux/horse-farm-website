'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Shield,
  Tag,
  User as UserIcon,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    role: 'customer' as 'customer' | 'seller',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.user) {
        await refreshUser();
        if (formData.role === 'seller') router.push('/seller');
        else router.push('/dashboard');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('Network error registering account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-4 p-1">
            <img
              src="/images/logo/horse-county-emblem.png"
              alt="Horse County"
              className="w-full h-full object-contain rounded-full drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Create an Account
          </h2>
          <p className="text-xs text-[#f3e5ab] tracking-widest uppercase mt-1">
            Join the Horse County & Yog Maya Range Community
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/30 shadow-2xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'customer' })}
                  className={`p-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                    formData.role === 'customer'
                      ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f3e5ab]'
                      : 'bg-[#14161b] border-white/10 text-gray-400'
                  }`}
                >
                  Buyer / Enthusiast
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'seller' })}
                  className={`p-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                    formData.role === 'seller'
                      ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f3e5ab]'
                      : 'bg-[#14161b] border-white/10 text-gray-400'
                  }`}
                >
                  Horse Seller / Stud Farm
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Kunwar Yashraj Singh"
                className="w-full bg-[#14161b] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#14161b] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@heritage.in"
                  className="w-full bg-[#14161b] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                  City / Location
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Jodhpur, Rajasthan"
                  className="w-full bg-[#14161b] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create secure password"
                  className="w-full bg-[#14161b] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_5px_20px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all disabled:opacity-50 mt-4 cursor-pointer"
            >
              {loading ? 'Creating Account...' : 'Register Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            Already registered?{' '}
            <Link href="/auth/login" className="text-[#d4af37] font-semibold hover:underline">
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
