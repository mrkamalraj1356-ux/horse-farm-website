'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { HORSES_DATA, Horse } from '@/data/horses';
import { FARM_CONFIG } from '@/data/config';
import SectionHeading from '@/components/SectionHeading';
import {
  CheckCircle2,
  ShieldCheck,
  Send,
  Sparkles,
  Phone,
  MessageSquare,
  Mail,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

function BuyHorseFormContent() {
  const searchParams = useSearchParams();
  const preselectedHorseId = searchParams.get('horse') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    city: '',
    selectedHorseId: preselectedHorseId,
    contactPreference: 'WhatsApp',
    experienceLevel: 'Experienced Rider',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

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
      setReferenceNumber(`EQ-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      whatsappNumber: '',
      email: '',
      city: '',
      selectedHorseId: '',
      contactPreference: 'WhatsApp',
      experienceLevel: 'Experienced Rider',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Direct Acquisition"
          title="Find Your Perfect Horse"
          subtitle="Submit your acquisition enquiry. Our discreet stud concierge handles all ownership transfers, veterinary inspections, and private trials."
        />

        {/* Success Confirmation State */}
        {isSubmitted ? (
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Enquiry Confirmed
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3">
              Thank you, {formData.fullName}.
            </h3>

            <p className="text-base text-gray-300 max-w-lg mx-auto mb-6 leading-relaxed">
              Your enquiry has been received. Our team will contact you shortly via {formData.contactPreference} to discuss {selectedHorse ? selectedHorse.name : 'your chosen horse'} and arrange next steps.
            </p>

            {/* Reference Receipt Card */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-black/60 border border-white/10 text-left text-xs mb-8 space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Reference Number:</span>
                <span className="text-[#f3e5ab] font-mono font-bold">{referenceNumber}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Horse Inquired:</span>
                <span className="text-white font-medium">
                  {selectedHorse ? `${selectedHorse.name} (${selectedHorse.breed})` : 'General Acquisition'}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Preferred Channel:</span>
                <span className="text-white">{formData.contactPreference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Target Location:</span>
                <span className="text-white">{formData.city || 'India'}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/horses"
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
              >
                Browse Other Horses
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white bg-white/5 border border-white/10 hover:border-white/30"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Enquiry Form */
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#d4af37]/20 shadow-2xl relative">
            {/* Selected Horse Quick Glance if active */}
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
                      Selected Candidate
                    </div>
                    <div className="text-lg font-bold text-white">
                      {selectedHorse.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {selectedHorse.breed} • {selectedHorse.ageDisplay} • {selectedHorse.price}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/horses/${selectedHorse.id}`}
                  className="text-xs text-[#d4af37] hover:underline hidden sm:block"
                >
                  View Full Profile →
                </Link>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Full Name <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Maharaja Vikram Singh"
                    className="w-full bg-[#16181e] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    City / State <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full bg-[#16181e] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Mobile */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Mobile Number <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#16181e] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#16181e] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Email Address <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vikram@estate.in"
                    className="w-full bg-[#16181e] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Select Horse */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Select Horse <span className="text-[#d4af37]">*</span>
                  </label>
                  <select
                    required
                    value={formData.selectedHorseId}
                    onChange={(e) => setFormData({ ...formData, selectedHorseId: e.target.value })}
                    className="w-full bg-[#16181e] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="">-- Choose a Horse from Collection --</option>
                    {HORSES_DATA.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} — {h.breed} ({h.ageDisplay}, {h.price}) [{h.availability}]
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Preferred Contact Channel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['WhatsApp', 'Phone Call', 'Email'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, contactPreference: method })}
                        className={`py-3 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                          formData.contactPreference === method
                            ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f3e5ab] font-semibold'
                            : 'bg-[#16181e] border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your equestrian requirements, stable arrangements, or if you wish to book an on-site veterinary trial..."
                  className="w-full bg-[#16181e] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Concierge Privacy Notice */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-gray-400">
                <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-300">Confidentiality Guarantee:</strong> Owner
                  and client identity details are kept strictly private. Your enquiry is transmitted
                  directly to the Chief Stud Director.
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.6)] transform hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Buy Enquiry</span>
                      <Send className="w-4 h-4" />
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

export default function BuyHorsePage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-gray-400">Loading acquisition portal...</div>}>
      <BuyHorseFormContent />
    </Suspense>
  );
}
