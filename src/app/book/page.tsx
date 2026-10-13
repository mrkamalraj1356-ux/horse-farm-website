'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Horse, FarmhousePackage, HorseExperience, BookingType } from '@/lib/types';
import SectionHeading from '@/components/SectionHeading';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
  Building2,
  Camera,
  Award,
  AlertCircle,
  CreditCard,
  PhoneCall
} from 'lucide-react';

function BookHorseFormContent() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as BookingType) || 'horse';
  const preselectedHorseId = searchParams.get('horse') || '';
  const preselectedTargetId = searchParams.get('targetId') || '';

  const [bookingType, setBookingType] = useState<BookingType>(initialType);
  const [horses, setHorses] = useState<Horse[]>([]);
  const [packages, setPackages] = useState<FarmhousePackage[]>([]);
  const [experiences, setExperiences] = useState<HorseExperience[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    email: '',
    targetId: preselectedHorseId || preselectedTargetId || '',
    preferredDate: '',
    timeSlot: 'Morning (09:00 AM - 12:00 PM)',
    guests: 2,
    purpose: 'Private Viewing & Trial',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [advancePaymentOption, setAdvancePaymentOption] = useState<'manual' | 'online'>('manual');

  useEffect(() => {
    async function loadData() {
      try {
        const [horsesRes, pkgRes, expRes] = await Promise.all([
          fetch('/api/horses?status=approved'),
          fetch('/api/horses'), // or standard
          fetch('/api/horses')
        ]);

        if (horsesRes.ok) {
          const data = await horsesRes.json();
          setHorses(data.horses || []);
        }

        // Local packages list
        setPackages([
          {
            id: 'pkg-day-retreat',
            name: 'Royal Sanctuary Day Pass & Stable Tour',
            tag: 'Day Experience',
            duration: '6 Hours',
            guestCapacity: 'Up to 10',
            price: '₹15,000',
            rawPrice: 15000,
            features: ['Mahogany stables tour', 'Arena demo', 'Traditional high-tea'],
            description: 'Experience the daily royal rhythm of Yog Maya Range.',
            image: '/farm/stables.jpg'
          },
          {
            id: 'pkg-royal-photoshoot',
            name: 'Heritage Pre-Wedding & Film Photoshoot',
            tag: 'Creative Production',
            duration: 'Full Day',
            guestCapacity: 'Up to 25',
            price: '₹45,000',
            rawPrice: 45000,
            features: ['2 Champion Horses with handlers', 'Desert dunes & sand arena', 'VIP Dressing villa'],
            description: 'Equestrian cinematic backdrop in Rajasthan.',
            image: '/farm/hero-bg.jpg'
          },
          {
            id: 'pkg-private-event',
            name: 'Yog Maya Range Private Event & Celebration',
            tag: 'Exclusive Estate',
            duration: 'Evening / Full Day',
            guestCapacity: '50 - 250 Guests',
            price: '₹1,20,000',
            rawPrice: 120000,
            features: ['Amphitheater lawn buyout', 'Royal horse welcome procession', 'Concierge setup'],
            description: 'Private anniversaries, birthdays, and banquets.',
            image: '/farm/heritage.jpg'
          }
        ]);

        setExperiences([
          {
            id: 'exp-dressage',
            title: 'Classical Dressage & Riding Masterclass',
            category: 'Schooling',
            duration: '90 Min',
            price: '₹5,000 / rider',
            rawPrice: 5000,
            description: '1-on-1 dressage instruction on trained Marwari steeds.',
            inclusions: ['Helmet & gear', 'Arena schooling'],
            image: '/farm/arena.jpg',
            available: true
          },
          {
            id: 'exp-trail-ride',
            title: 'Sunset Desert Dune Trail Ride',
            category: 'Trail',
            duration: '2 Hours',
            price: '₹7,500 / rider',
            rawPrice: 7500,
            description: 'Guided cross-country trek across golden sand dunes.',
            inclusions: ['Saddle & bridle', 'Lead escort'],
            image: '/farm/riding.jpg',
            available: true
          }
        ]);
      } catch (err) {
        console.error('Error fetching booking data:', err);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (preselectedHorseId) {
      setBookingType('horse');
      setFormData((prev) => ({ ...prev, targetId: preselectedHorseId }));
    }
  }, [preselectedHorseId]);

  const selectedHorse = horses.find(
    (h) => h.id.toLowerCase() === formData.targetId.toLowerCase()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: bookingType
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBookingCode(data.bookingCode);
        setIsSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to register booking. Please verify form details.');
      }
    } catch {
      setErrorMsg('Network error connecting to booking service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      mobile: '',
      whatsapp: '',
      email: '',
      targetId: '',
      preferredDate: '',
      timeSlot: 'Morning (09:00 AM - 12:00 PM)',
      guests: 2,
      purpose: 'Private Viewing & Trial',
      message: ''
    });
    setIsSubmitted(false);
    setErrorMsg('');
  };

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Exclusive Sanctuary Access"
          title="Book Your Experience"
          subtitle="Reserve a private horse trial, Yog Maya Range farmhouse event, or classical riding masterclass at our Rajasthan sanctuary."
        />

        {isSubmitted ? (
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 text-center shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Reservation Formally Registered
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3 font-serif">
              Booking Request Received
            </h3>

            <p className="text-base text-gray-300 max-w-lg mx-auto mb-6 leading-relaxed">
              Thank you, {formData.name}. We have logged your request for{' '}
              <strong className="text-[#f3e5ab]">{formData.preferredDate}</strong>. Our Stud & Farm Concierge will contact you within 4 hours to confirm hospitality arrangements.
            </p>

            <div className="max-w-md mx-auto p-5 rounded-2xl bg-black/60 border border-white/10 text-left text-xs mb-8 space-y-2.5">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Reservation Code:</span>
                <span className="text-[#f3e5ab] font-mono font-bold">{bookingCode}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Booking Category:</span>
                <span className="text-white capitalize">{bookingType} Experience</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Preferred Date & Slot:</span>
                <span className="text-white">{formData.preferredDate} ({formData.timeSlot.split(' ')[0]})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Confirmation Status:</span>
                <span className="text-emerald-400 font-semibold">Logged — Concierge Review Active</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/horses"
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
              >
                Explore More Horses
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
              >
                Book Another Session
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#d4af37]/20 shadow-2xl">
            {/* Booking Type Category Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8 p-1.5 rounded-2xl bg-[#14161c] border border-white/10">
              {[
                { type: 'horse', label: 'Horse Trial', icon: Award },
                { type: 'farmhouse', label: 'Yog Maya Range', icon: Building2 },
                { type: 'experience', label: 'Equestrian Schooling', icon: Calendar },
                { type: 'event', label: 'Photoshoot & Event', icon: Camera },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = bookingType === tab.type;
                return (
                  <button
                    key={tab.type}
                    type="button"
                    onClick={() => {
                      setBookingType(tab.type as BookingType);
                      setFormData((prev) => ({ ...prev, targetId: '' }));
                    }}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#d4af37] text-black shadow-lg font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center gap-3 text-xs text-rose-300">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Selected Horse Banner if booking horse */}
            {bookingType === 'horse' && selectedHorse && (
              <div className="mb-8 p-4 rounded-2xl bg-[#14161c] border border-[#d4af37]/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedHorse.images?.[0] || `/horses/${selectedHorse.id}/${selectedHorse.id}-1.jpg`}
                    alt={selectedHorse.name}
                    className="w-14 h-14 rounded-xl object-cover border border-[#d4af37]/50"
                  />
                  <div>
                    <div className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                      Selected Candidate
                    </div>
                    <div className="text-lg font-bold text-white font-serif">
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
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
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
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
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
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
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
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Dynamic Target Selection based on Tab */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    {bookingType === 'horse' ? 'Select Horse *' : bookingType === 'farmhouse' ? 'Select Farmhouse Package *' : 'Select Experience *'}
                  </label>
                  {bookingType === 'horse' ? (
                    <select
                      required
                      value={formData.targetId}
                      onChange={(e) => setFormData({ ...formData, targetId: e.target.value })}
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="">-- Choose Horse --</option>
                      {horses.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name} ({h.breed} - {h.availability})
                        </option>
                      ))}
                    </select>
                  ) : bookingType === 'farmhouse' || bookingType === 'event' ? (
                    <select
                      required
                      value={formData.targetId}
                      onChange={(e) => setFormData({ ...formData, targetId: e.target.value })}
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="">-- Choose Package / Event --</option>
                      {packages.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.price})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      required
                      value={formData.targetId}
                      onChange={(e) => setFormData({ ...formData, targetId: e.target.value })}
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="">-- Choose Schooling Option --</option>
                      {experiences.map((exp) => (
                        <option key={exp.id} value={exp.id}>
                          {exp.title} ({exp.price})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Preferred Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (02:00 PM - 04:30 PM)">Afternoon (02:00 PM - 04:30 PM)</option>
                    <option value="Golden Hour (04:30 PM - 06:30 PM)">Golden Hour (04:30 PM - 06:30 PM)</option>
                    <option value="Full Day Exclusive">Full Day Exclusive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                  Booking Purpose
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    'Private Viewing & Trial',
                    'Classical Riding Session',
                    'Photoshoot / Pre-Wedding',
                    'Farmhouse Sanctuary Visit'
                  ].map((purpose) => (
                    <button
                      key={purpose}
                      type="button"
                      onClick={() => setFormData({ ...formData, purpose })}
                      className={`p-3 rounded-xl text-xs text-center border transition-all cursor-pointer ${
                        formData.purpose === purpose
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f3e5ab] font-bold'
                          : 'bg-[#14161b] border-white/10 text-gray-400 hover:text-white'
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
                  placeholder="Number of guests attending, prior riding background, transport pickup or dietary requirements..."
                  className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Payment Workflow Selector */}
              <div className="p-4 rounded-2xl bg-[#14161c] border border-white/10">
                <div className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-3">
                  Confirmation Preference
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAdvancePaymentOption('manual')}
                    className={`p-3 rounded-xl text-xs text-left border flex items-start gap-3 transition-all cursor-pointer ${
                      advancePaymentOption === 'manual'
                        ? 'bg-[#d4af37]/15 border-[#d4af37] text-white'
                        : 'bg-black/40 border-white/10 text-gray-400'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">Manual Concierge Booking</div>
                      <div className="text-[11px] text-gray-400">Concierge verifies slot availability and coordinates directly.</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdvancePaymentOption('online')}
                    className={`p-3 rounded-xl text-xs text-left border flex items-start gap-3 transition-all cursor-pointer ${
                      advancePaymentOption === 'online'
                        ? 'bg-[#d4af37]/15 border-[#d4af37] text-white'
                        : 'bg-black/40 border-white/10 text-gray-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">Online Advance Confirmation</div>
                      <div className="text-[11px] text-gray-400">Instant reservation with token advance where enabled.</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    'Confirming Slot...'
                  ) : (
                    <>
                      <span>Submit Booking Request</span>
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
