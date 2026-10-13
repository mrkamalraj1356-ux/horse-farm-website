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
  Camera,
  AlertCircle,
  Loader2,
  X
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
    videoUrl: ''
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploadingFiles(true);
    setErrorMsg('');

    const files = Array.from(e.target.files);
    const formPayload = new FormData();
    files.forEach((file) => formPayload.append('files', file));

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formPayload
      });
      const data = await res.json();
      if (res.ok && data.urls) {
        setUploadedImages((prev) => [...prev, ...data.urls]);
      } else {
        setErrorMsg(data.error || 'Failed to upload image. Please ensure files are under 35MB (JPG/PNG/WEBP).');
      }
    } catch {
      setErrorMsg('Network error uploading files.');
    } finally {
      setIsUploadingFiles(false);
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: uploadedImages
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionId(data.refId);
        setIsSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Submission failed. Please check form fields.');
      }
    } catch {
      setErrorMsg('Network error connecting to consignment registry.');
    } finally {
      setIsSubmitting(false);
    }
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
      videoUrl: ''
    });
    setUploadedImages([]);
    setIsSubmitted(false);
    setErrorMsg('');
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

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3 font-serif">
              Horse Evaluation Request Received
            </h3>

            <p className="text-base text-gray-300 max-w-lg mx-auto mb-6 leading-relaxed">
              Thank you, {formData.fullName}. Your consignment submission for{' '}
              <strong className="text-[#f3e5ab]">{formData.horseName}</strong> has been logged with Reference ID{' '}
              <span className="font-mono text-[#d4af37]">{submissionId}</span>.
            </p>

            <div className="max-w-md mx-auto p-5 rounded-2xl bg-black/60 border border-white/10 text-left text-xs mb-8 space-y-2.5">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Horse:</span>
                <span className="text-white font-medium">{formData.horseName} ({formData.breed})</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Valuation Expected:</span>
                <span className="text-[#f3e5ab] font-bold font-serif">{formData.expectedPrice}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Owner Contact:</span>
                <span className="text-white">{formData.mobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-amber-400 font-semibold">Pending Veterinary & Stud Board Review</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/horses"
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
              >
                Return to Horses
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
              >
                Submit Another Horse
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#d4af37]/20 shadow-2xl">
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center gap-3 text-xs text-rose-300">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

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
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
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
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
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
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
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
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
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
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
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
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      Breed *
                    </label>
                    <select
                      value={formData.breed}
                      onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Marwari">Purebred Marwari</option>
                      <option value="Kathiawari">Kathiawari</option>
                      <option value="Thoroughbred">Thoroughbred</option>
                      <option value="Indigenous Other">Other Indigenous</option>
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
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                      Gender *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Male">Stallion (Male)</option>
                      <option value="Female">Mare (Female)</option>
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
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
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
                      className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
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
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
                    Video Showcase Link (YouTube / Drive)
                  </label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://youtu.be/... or https://youtube.com/shorts/..."
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Section 3: Photo Upload Section */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-2">
                  3. Horse Photographs
                </h4>
                <div className="border-2 border-dashed border-white/20 hover:border-[#d4af37]/60 rounded-2xl p-6 text-center transition-colors">
                  <Camera className="w-10 h-10 text-[#d4af37] mx-auto mb-2 opacity-70" />
                  <p className="text-xs text-gray-300 font-medium mb-1">
                    Upload Authentic Horse Photos (Side Conformation, Front Head with Lyre Ears, Movement)
                  </p>
                  <p className="text-[11px] text-gray-500 mb-4">
                    PNG, JPG, or WEBP up to 35MB each
                  </p>

                  <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors">
                    {isUploadingFiles ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                        <span>Uploading Images...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-[#d4af37]" />
                        <span>Select Images from Device</span>
                      </>
                    )}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploadingFiles}
                      className="hidden"
                    />
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs text-gray-400 mb-2 font-medium">Uploaded Photographs ({uploadedImages.length}):</div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {uploadedImages.map((url, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-[#d4af37]/40 group">
                          <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeUploadedImage(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/80 text-rose-400 hover:text-rose-200"
                            title="Remove image"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || isUploadingFiles}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Logging Consignment Dossier...' : 'Submit Horse for Evaluation'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
