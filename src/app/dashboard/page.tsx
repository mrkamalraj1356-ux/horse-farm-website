'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Enquiry, Booking, Horse } from '@/lib/types';
import {
  User as UserIcon,
  Shield,
  Tag,
  Calendar,
  Heart,
  MessageSquare,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function BuyerDashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'enquiries' | 'bookings' | 'wishlist' | 'profile'>('enquiries');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [savedHorses, setSavedHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;
      setLoading(true);
      try {
        const [enqRes, bkRes, horsesRes] = await Promise.all([
          fetch('/api/enquiries'),
          fetch('/api/bookings'),
          fetch('/api/horses?status=approved')
        ]);

        if (enqRes.ok) {
          const data = await enqRes.json();
          setEnquiries(data.enquiries || []);
        }

        if (bkRes.ok) {
          const data = await bkRes.json();
          setBookings(data.bookings || []);
        }

        if (horsesRes.ok) {
          const data = await horsesRes.json();
          setSavedHorses((data.horses || []).slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      loadDashboardData();
    }
  }, [user, authLoading]);

  if (authLoading) {
    return <div className="pt-32 text-center text-gray-400">Verifying session...</div>;
  }

  if (!user) {
    return (
      <div className="pt-28 pb-24 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-[#d4af37]/30 text-center">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-8 h-8 text-[#d4af37]" />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif mb-2">
            Sign In Required
          </h2>
          <p className="text-xs text-gray-400 mb-6 leading-relaxed">
            Please sign in to access your horse acquisition enquiries, booking requests, and saved stable favorites.
          </p>
          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] block"
            >
              Sign In to Account
            </Link>
            <Link
              href="/horses"
              className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white bg-white/5 border border-white/10 block"
            >
              Explore Horses First
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/30 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#d4af37] to-[#f3e5ab] text-black font-black text-2xl flex items-center justify-center font-serif shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab]">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {user.email} • {user.phone} • {user.city || 'India'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
              >
                Admin Control
              </Link>
            )}
            {user.role === 'seller' && (
              <Link
                href="/seller"
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
              >
                Seller Portal
              </Link>
            )}
            <Link
              href="/horses"
              className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20"
            >
              Browse Horses
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10">
          {[
            { id: 'enquiries', label: `My Enquiries (${enquiries.length})`, icon: MessageSquare },
            { id: 'bookings', label: `My Bookings (${bookings.length})`, icon: Calendar },
            { id: 'wishlist', label: `Saved Horses (${savedHorses.length})`, icon: Heart },
            { id: 'profile', label: 'Profile Details', icon: UserIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#d4af37] text-black font-bold shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: My Enquiries */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {enquiries.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#d4af37]/40 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#d4af37] font-bold">
                          {enq.refNumber}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                            enq.status === 'Confirmed'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                              : enq.status === 'In Discussion'
                              ? 'bg-sky-950/80 text-sky-300 border-sky-500/40'
                              : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          {enq.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-white font-serif">
                        {enq.horseName ? `Inquiry for ${enq.horseName}` : 'General Stud Acquisition'}
                      </h4>

                      <p className="text-xs text-gray-300 font-light max-w-2xl leading-relaxed">
                        {enq.message || 'Standard acquisition request logged.'}
                      </p>

                      {enq.notes && enq.notes.length > 0 && (
                        <div className="mt-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-300">
                          <strong className="text-[#f3e5ab]">Concierge Update:</strong> {enq.notes[enq.notes.length - 1]}
                        </div>
                      )}
                    </div>

                    <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0">
                      {enq.horseId && (
                        <Link
                          href={`/horses/${enq.horseId}`}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 flex items-center gap-1.5"
                        >
                          <span>View Horse</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center border border-white/10">
                <MessageSquare className="w-12 h-12 text-[#d4af37] mx-auto mb-3 opacity-60" />
                <h4 className="text-lg font-bold text-white mb-1">No Active Enquiries</h4>
                <p className="text-xs text-gray-400 mb-6">
                  You have not submitted any horse acquisition inquiries yet.
                </p>
                <Link
                  href="/horses"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
                >
                  Explore Available Horses
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: My Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {bookings.map((bk) => (
                  <div
                    key={bk.id}
                    className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#d4af37]/40 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#d4af37] font-bold">
                          {bk.bookingCode}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                            bk.status === 'confirmed'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                              : bk.status === 'rejected'
                              ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                              : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          {bk.status}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">
                          {bk.type} Experience
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-white font-serif">
                        {bk.targetName}
                      </h4>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 font-mono">
                        <div>Date: <span className="text-[#f3e5ab]">{bk.preferredDate}</span></div>
                        <div>Slot: <span className="text-[#f3e5ab]">{bk.timeSlot}</span></div>
                        <div>Guests: <span className="text-[#f3e5ab]">{bk.guestsCount || 1}</span></div>
                      </div>

                      {bk.notes && bk.notes.length > 0 && (
                        <div className="mt-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-300">
                          <strong className="text-[#f3e5ab]">Concierge Update:</strong> {bk.notes[bk.notes.length - 1]}
                        </div>
                      )}
                    </div>

                    <div className="shrink-0">
                      <span className="text-xs text-gray-400">
                        {bk.status === 'confirmed' ? '✓ Schedule Finalized' : 'Awaiting Concierge Confirmation'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center border border-white/10">
                <Calendar className="w-12 h-12 text-[#d4af37] mx-auto mb-3 opacity-60" />
                <h4 className="text-lg font-bold text-white mb-1">No Bookings Scheduled</h4>
                <p className="text-xs text-gray-400 mb-6">
                  You have not scheduled any trial viewings, farmhouse retreats, or schooling sessions.
                </p>
                <Link
                  href="/book"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
                >
                  Book an Experience
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Favorites */}
        {activeTab === 'wishlist' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedHorses.map((horse) => (
                <div key={horse.id} className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                    <img src={horse.images?.[0]} alt={horse.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-[#d4af37]">
                      {horse.breed}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-serif">{horse.name}</h4>
                    <p className="text-xs text-gray-400 mb-4">{horse.price} • {horse.ageDisplay}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/horses/${horse.id}`}
                      className="py-2 text-center rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-white"
                    >
                      Profile
                    </Link>
                    <Link
                      href={`/buy?horse=${horse.id}`}
                      className="py-2 text-center rounded-lg text-xs font-bold bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-black"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Profile Details */}
        {activeTab === 'profile' && (
          <div className="glass-card rounded-3xl p-8 border border-white/10 max-w-xl">
            <h3 className="text-xl font-bold text-white font-serif mb-6">
              Account Information
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-400">Full Name:</span>
                <span className="text-white font-semibold">{user.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-400">Mobile Number:</span>
                <span className="text-white font-semibold">{user.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-400">Email Address:</span>
                <span className="text-white font-semibold">{user.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-400">Account Role:</span>
                <span className="text-[#d4af37] font-semibold uppercase">{user.role}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-400">Location:</span>
                <span className="text-white">{user.city || 'India'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
