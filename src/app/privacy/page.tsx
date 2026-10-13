import React from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import { FARM_CONFIG } from '@/data/config';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Horse County',
  description: 'Our privacy standards and client confidentiality protocols at Horse County & Yog Maya Range.'
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Confidentiality Guarantee"
          title="Privacy Policy"
          subtitle="How Horse County & Yog Maya Range safeguard client identity, financial transactions, and equine ownership records."
        />

        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 text-xs text-gray-300 leading-relaxed font-light">
          <section className="space-y-3">
            <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>1. Information We Collect</span>
            </h3>
            <p>
              When you submit a horse acquisition enquiry, request a private viewing trial, register for an account, or consign a horse for valuation on <strong>Horse County</strong>, we collect necessary contact information including your full name, mobile number, email address, city, and specific equestrian requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#d4af37]" />
              <span>2. Client Identity & Owner Protection</span>
            </h3>
            <p>
              We maintain a strict discretion protocol. Direct telephone numbers and private residential addresses of horse sellers and distinguished buyers are never displayed publicly on the website. All communication and viewing appointments are facilitated through the Chief Stud Concierge.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#d4af37]" />
              <span>3. Use of Information</span>
            </h3>
            <p>
              Your information is utilized solely for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li>Facilitating horse trials, pedigree documentation, and ownership registration.</li>
              <li>Coordinating farmhouse bookings and event hospitality at Yog Maya Range.</li>
              <li>Responding to AI and concierge inquiries.</li>
              <li>Verifying veterinary certifications and seller consignment dossiers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#d4af37]" />
              <span>4. Data Security & Contact</span>
            </h3>
            <p>
              We implement industry-standard encryption and access controls. If you wish to update or remove your account details from our registry, contact our desk at <strong className="text-[#f3e5ab]">{FARM_CONFIG.supportEmail}</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
