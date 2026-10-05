'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FARM_CONFIG } from '@/data/config';
import SectionHeading from '@/components/SectionHeading';
import {
  MapPin,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building,
  Plane
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    email: '',
    enquiryType: 'Buy a Horse',
    horseName: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Concierge Desk"
          title="Let's Connect"
          subtitle="Reach out to our stud directors for private viewings, acquisition counsel, or pedigree lineage verification."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Sanctuary Location & Details (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-[#d4af37]/20 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white font-serif">
                Sanctuary & Stud Concierge
              </h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                To maintain the tranquility of our horses and ensure absolute discretion for distinguished guests, all visits to {FARM_CONFIG.name} are arranged strictly by prior appointment.
              </p>

              <div className="space-y-4 text-xs text-gray-300 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Estate Address</strong>
                    <span>{FARM_CONFIG.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Concierge Email</strong>
                    <span>{FARM_CONFIG.supportEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Viewing & Trial Hours</strong>
                    <span>Tuesday – Sunday: 08:30 AM – 05:30 PM (Mondays Sanctuary Rest)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Travel & Helipad Access</strong>
                    <span>Private helipad on grounds; Jodhpur Airport (JDH) 45 minutes by VIP chauffeured transfer.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Owner direct mobile numbers are safeguarded per sanctuary security policy.</span>
              </div>
            </div>

            {/* Quick Farm Image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 relative">
              <img
                src="/farm/hero-bg.jpg"
                alt="Sanctuary grounds"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-[#f3e5ab] font-medium">
                  {FARM_CONFIG.name} — Rajasthan Valley
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (Col 7) */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 text-center shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Enquiry Successfully Sent
                </h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto mb-6">
                  Thank you, {formData.name}. Our Equine Concierge will review your request regarding{' '}
                  <strong className="text-[#f3e5ab]">{formData.enquiryType}</strong> and connect with you promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#d4af37]/20 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Yashvardhan Rathore"
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
                        placeholder="yash@heritage.com"
                        className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+91 98765 43210"
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
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                        Enquiry Type *
                      </label>
                      <select
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                        className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="Buy a Horse">Buy a Horse</option>
                        <option value="Sell Your Horse">Sell Your Horse</option>
                        <option value="Book a Horse">Book a Horse / Trial</option>
                        <option value="General Enquiry">General Stud Enquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                        Horse of Interest (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.horseName}
                        onChange={(e) => setFormData({ ...formData, horseName: e.target.value })}
                        placeholder="e.g. Sultan, Noor, Rajveer"
                        className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share your questions, schedule requirements, or equine preferences..."
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      'Transmitting...'
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
