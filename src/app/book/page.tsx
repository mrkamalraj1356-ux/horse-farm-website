'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { HORSES_DATA } from '@/data/horses';
import SectionHeading from '@/components/SectionHeading';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
  MapPin
} from 'lucide-react';

function BookHorseFormContent() {
  const searchParams = useSearchParams();
  const preselectedHorseId = searchParams.get('horse') || '';

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    email: '',
    selectedHorseId: preselectedHorseId,
    preferredDate: '',
    bookingPurpose: 'Private Viewing & Trial',
    timeSlot: 'Morning (09:00 AM - 12:00 PM)',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  useEffect(() => {
    if (preselectedHorseId) {
      setFormData((prev) => ({ ...prev, selectedHorseId: preselectedHorseId }));
    }
  }, [preselectedHorseId]);

  const selectedHorse = HORSES_DATA.find(
    (h) => h.id.toLowerCase() === formData.selectedHorseId.toLowerCase()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setBookingCode(`BK-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      mobile: '',
      whatsapp: '',
      email: '',
      selectedHorseId: '',
      preferredDate: '',
      bookingPurpose: 'Private Viewing & Trial',
      timeSlot: 'Morning (09:00 AM - 12:00 PM)',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Exclusive Sanctuary Access"
          title="Book a Horse"
          subtitle="Reserve a private viewing, trial riding session, or stud consultation at our private Rajasthan equestrian sanctuary."
        />

        {isSubmitted ? (
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 text-center shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Appointment Reserved
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3">
              Booking Request Received
            </h3>

            <p className="text-base text-gray-300 max-w-lg mx-auto mb-6 leading-relaxed">
              Thank you, {formData.name}. We have scheduled your visit request for{' '}
              <strong className="text-[#f3e5ab]">{formData.preferredDate || 'your preferred date'}</strong>. Our Stud Concierge will contact you within 4 hours to finalize hospitality arrangements.
            </p>

            <div className="max-w-md mx-auto p-5 rounded-2xl bg-black/60 border border-white/10 text-left text-xs mb-8 space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Reservation Code:</span>
                <span className="text-[#f3e5ab] font-mono font-bold">{bookingCode}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Horse:</span>
                <span className="text-white font-medium">
                  {selectedHorse ? selectedHorse.name : 'General Sanctuary Visit'}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Purpose:</span>
                <span className="text-white">{formData.bookingPurpose}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Slot:</span>
                <span className="text-[#d4af37]">{formData.timeSlot}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/horses"
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
              >
                Explore More Horses
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white bg-white/5 border border-white/10"
              >
                Book Another Session
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#d4af37]/20 shadow-2xl">
            {selectedHorse && (
              <div className="mb-8 p-4 rounded-2xl bg-[#16181e] border border-[#d4af37]/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedHorse.images[0]}
                    alt={selectedHorse.name}
                    className="w-14 h-14 rounded-xl object-cover border border-[#d4af37]/50"
                  />
                  <div>
                    <div className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
                      Appointment Candidate
                    </div>
                    <div className="text-lg font-bold text-white">
                      {selectedHorse.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {selectedHorse.breed} • Status: {selectedHorse.availability}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/horses/${selectedHorse.id}`}
                  className="text-xs text-[#d4af37] hover:underline hidden sm:block"
                >
                  View Details →
                </Link>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kunwar Yashraj Singh"
                    className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="yashraj@heritage.in"
                    className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 99887 76655"
                    className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+91 99887 76655"
                    className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Select Horse *
                  </label>
                  <select
                    required
                    value={formData.selectedHorseId}
                    onChange={(e) => setFormData({ ...formData, selectedHorseId: e.target.value })}
                    className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="">-- Choose Horse to Book --</option>
                    {HORSES_DATA.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.breed} - {h.availability})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (02:00 PM - 04:30 PM)">Afternoon (02:00 PM - 04:30 PM)</option>
                    <option value="Golden Hour (04:30 PM - 06:30 PM)">Golden Hour (04:30 PM - 06:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                  Booking Purpose
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    'Private Viewing & Trial',
                    'Classical Riding Session',
                    'Breeding Consultation',
                    'Farm & Stables Tour'
                  ].map((purpose) => (
                    <button
                      key={purpose}
                      type="button"
                      onClick={() => setFormData({ ...formData, bookingPurpose: purpose })}
                      className={`p-3 rounded-xl text-xs text-center border transition-all ${
                        formData.bookingPurpose === purpose
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f3e5ab] font-bold'
                          : 'bg-[#16181e] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {purpose}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                  Message / Hospitality Accommodations
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Number of guests, prior riding experience, transport pickup requirements..."
                  className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Confirming Slot...'
                  ) : (
                    <>
                      <span>Send Booking Request</span>
                      <Calendar className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookHorsePage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-gray-400">Loading booking portal...</div>}>
      <BookHorseFormContent />
    </Suspense>
  );
}
