import React from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import { FARM_CONFIG } from '@/data/config';
import { Award, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Horse County',
  description: 'Terms and conditions for horse consignment, trials, acquisitions, and farmhouse bookings.'
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Legal Framework"
          title="Terms of Service"
          subtitle="Clear, equitable terms governing horse acquisitions, seller consignments, trial visits, and Yog Maya Range event bookings."
        />

        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 text-xs text-gray-300 leading-relaxed font-light">
          <section className="space-y-3">
            <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <Award className="w-4 h-4 text-[#d4af37]" />
              <span>1. Pedigree & Bloodline Authenticity</span>
            </h3>
            <p>
              Every horse cataloged on <strong>Horse County</strong> is backed by verifiable indigenous stud records, registration passports, or certified microchip documentation. We adhere to zero-tolerance policies regarding fabricated lineages.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>2. Veterinary Soundness & Inspection</span>
            </h3>
            <p>
              Prospective buyers are entitled to conduct on-site physical examinations and trial riding sessions. Third-party veterinary inspections may be arranged by appointment. Soundness reports and digital radiographs reflect condition at the time of examination.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
              <span>3. Seller Consignment & Approval</span>
            </h3>
            <p>
              All seller submissions remain private and pending until reviewed by the Stud Evaluation Board. The platform reserves the right to decline or unpublish any listing that fails to meet pedigree, health, or ethical standards.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#d4af37]" />
              <span>4. Yog Maya Range Bookings & Advance Payments</span>
            </h3>
            <p>
              Farmhouse events, photoshoot packages, and riding sessions at Yog Maya Range must be confirmed with our concierge desk. Cancellation and date reschedule requests must be communicated at least 48 hours in advance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
