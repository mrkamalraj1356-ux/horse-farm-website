'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import {
  Upload,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  FileText,
  BadgePercent,
  Camera
} from 'lucide-react';

export default function SellHorsePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    city: '',
    horseName: '',
    breed: 'Marwari',
    age: '',
    gender: 'Male',
    height: '',
    expectedPrice: '',
    description: '',
  });

  const [simulatedFiles, setSimulatedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setSimulatedFiles((prev) => [...prev, ...names]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmissionId(`SELL-EQ-${Math.floor(10000 + Math.random() * 90000)}`);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      whatsappNumber: '',
      email: '',
      city: '',
      horseName: '',
      breed: 'Marwari',
      age: '',
      gender: 'Male',
      height: '',
      expectedPrice: '',
      description: '',
    });
    setSimulatedFiles([]);
    setIsSubmitted(false);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Private Consignment"
          title="Sell Your Horse"
          subtitle="Entrust your noble horse to our elite equestrian network. We evaluate pedigree, sound health, and temperament to match with distinguished collectors and riders."
        />

        {isSubmitted ? (
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 text-center shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Consignment Dossier Logged
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3">
              Horse Evaluation Request Received
            </h3>

            <p className="text-base text-gray-300 max-w-lg mx-auto mb-6 leading-relaxed">
              Thank you, {formData.fullName}. Your submission for{' '}
              <strong className="text-[#f3e5ab]">{formData.horseName}</strong> has been logged with Reference ID{' '}
              <span className="font-mono text-[#d4af37]">{submissionId}</span>.
            </p>

            <div className="max-w-md mx-auto p-5 rounded-2xl bg-black/60 border border-white/10 text-left text-xs mb-8 space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Horse:</span>
                <span className="text-white font-medium">{formData.horseName} ({formData.breed})</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Valuation Expected:</span>
                <span className="text-[#f3e5ab] font-bold">{formData.expectedPrice}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Owner Contact:</span>
                <span className="text-white">{formData.mobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Next Step:</span>
                <span className="text-emerald-400 font-medium">Veterinary Board Review</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/horses"
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
              >
                Return to Horses
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white bg-white/5 border border-white/10"
              >
                Submit Another Horse
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#d4af37]/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Owner Information */}
              <div className="border-b border-white/10 pb-6">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-4">
                  1. Owner & Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Thakur Ranveer Singh"
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      City / State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Udaipur, Rajasthan"
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      placeholder="+91 98290 12345"
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      placeholder="+91 98290 12345"
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ranveer@studfarm.in"
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Horse Attributes */}
              <div className="border-b border-white/10 pb-6">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-4">
                  2. Horse Specifications
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      Horse Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.horseName}
                      onChange={(e) => setFormData({ ...formData, horseName: e.target.value })}
                      placeholder="e.g. Shamsher"
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      Breed *
                    </label>
                    <select
                      value={formData.breed}
                      onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Marwari">Purebred Marwari</option>
                      <option value="Kathiawari">Kathiawari</option>
                      <option value="Thoroughbred">Thoroughbred</option>
                      <option value="Other">Other Indigenous</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      Age (Years) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={30}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g. 5"
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      Gender *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Male">Stallion (Male)</option>
                      <option value="Female">Mare (Female)</option>
                      <option value="Gelding">Gelding</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      Height (Hands) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      placeholder="e.g. 15.3 hands"
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      Expected Price *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                      placeholder="e.g. ₹3,00,000"
                      className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                    Horse Description, Training & Lineage
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe bloodlines, sire/dam, training disciplines, show achievements, or unique traits..."
                    className="w-full bg-[#16181e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Section 3: Photo Upload Simulation */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-2">
                  3. Horse Photographs & Video Links
                </h4>
                <div className="border-2 border-dashed border-white/20 hover:border-[#d4af37]/60 rounded-2xl p-6 text-center transition-colors">
                  <Camera className="w-10 h-10 text-[#d4af37] mx-auto mb-2 opacity-70" />
                  <p className="text-xs text-gray-300 font-medium mb-1">
                    Upload Profile Photos (Conformation, Head profile with ears, Movement)
                  </p>
                  <p className="text-[11px] text-gray-500 mb-4">
                    PNG, JPG, or WEBP up to 25MB each
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Select Files</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleSimulateUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {simulatedFiles.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {simulatedFiles.map((fn, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#f3e5ab]"
                      >
                        ✓ {fn}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing Consignment...' : 'Submit Horse for Sale'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
