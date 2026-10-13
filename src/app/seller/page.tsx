'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { SellerSubmission } from '@/lib/types';
import SectionHeading from '@/components/SectionHeading';
import {
  Tag,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  Eye,
  FileText,
  Camera
} from 'lucide-react';

export default function SellerDashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [submissions, setSubmissions] = useState<SellerSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubmissions() {
      if (!user) return;
      setLoading(true);
      try {
        const res = await fetch('/api/sell');
        if (res.ok) {
          const data = await res.json();
          setSubmissions(data.submissions || []);
        }
      } catch (err) {
        console.error('Error fetching submissions:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      loadSubmissions();
    }
  }, [user, authLoading]);

  if (authLoading) {
    return <div className="pt-32 text-center text-gray-400">Verifying seller access...</div>;
  }

  if (!user || (user.role !== 'seller' && user.role !== 'admin')) {
    return (
      <div className="pt-28 pb-24 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-[#d4af37]/30 text-center">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-4">
            <Tag className="w-8 h-8 text-[#d4af37]" />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif mb-2">
            Seller Portal Access
          </h2>
          <p className="text-xs text-gray-400 mb-6 leading-relaxed">
            Please sign in with a registered Seller or Admin account to manage your horse consignments and valuation submissions.
          </p>
          <Link
            href="/auth/login"
            className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] block"
          >
            Sign In to Seller Portal
          </Link>
        </div>
      </div>
    );
  }

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;
  const approvedCount = submissions.filter((s) => s.status === 'approved').length;
  const rejectedCount = submissions.filter((s) => s.status === 'rejected').length;

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/30 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Seller Dashboard
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
              {user.name}
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Consignment Registry • Stud Submissions & Valuation Status
            </p>
          </div>

          <Link
            href="/sell"
            className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Submit New Horse</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-5 border border-white/10 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Total Submissions</span>
            <span className="text-3xl font-black text-white font-serif">{submissions.length}</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-amber-500/30 text-center">
            <span className="text-xs text-amber-300 uppercase tracking-wider block mb-1">Pending Review</span>
            <span className="text-3xl font-black text-amber-400 font-serif">{pendingCount}</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 text-center">
            <span className="text-xs text-emerald-300 uppercase tracking-wider block mb-1">Approved & Live</span>
            <span className="text-3xl font-black text-emerald-400 font-serif">{approvedCount}</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 text-center">
            <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Rejected</span>
            <span className="text-3xl font-black text-gray-300 font-serif">{rejectedCount}</span>
          </div>
        </div>

        {/* Consignment Submissions Table */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white font-serif">
              My Submitted Consignments
            </h3>
            <span className="text-xs text-gray-400">
              {submissions.length} Records
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-400 text-xs">Loading consignment listings...</div>
          ) : submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-[#14161c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#d4af37]/40 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <img
                      src={sub.images?.[0] || '/horses/sultan/sultan-1.jpg'}
                      alt={sub.horseName}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-white font-serif">
                          {sub.horseName}
                        </h4>
                        <span className="text-xs text-gray-400">({sub.breed})</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300 font-mono mt-1">
                        <div>Ref: <span className="text-[#d4af37]">{sub.refId}</span></div>
                        <div>Age: <span>{sub.age} Yrs</span></div>
                        <div>Gender: <span>{sub.gender}</span></div>
                        <div>Expected: <span className="text-[#f3e5ab] font-bold">{sub.expectedPrice}</span></div>
                      </div>

                      {sub.adminNotes && (
                        <div className="mt-2 text-xs text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                          <strong className="text-[#f3e5ab]">Stud Board Review:</strong> {sub.adminNotes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                        sub.status === 'approved'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                          : sub.status === 'rejected'
                          ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                          : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {sub.status === 'approved' ? '✓ Approved & Live' : sub.status === 'rejected' ? '✗ Rejected' : '⏳ Pending Review'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400 text-xs">
              <Camera className="w-10 h-10 text-[#d4af37] mx-auto mb-2 opacity-50" />
              <p className="mb-4">You have not submitted any horses for sale consignment yet.</p>
              <Link
                href="/sell"
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
              >
                Submit Your First Horse
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
