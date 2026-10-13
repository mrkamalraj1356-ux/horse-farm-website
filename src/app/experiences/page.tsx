import React from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import { getExperiences } from '@/lib/db';
import {
  Award,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Compass,
  Sparkles
} from 'lucide-react';

export const metadata = {
  title: 'Equestrian Experiences & Schooling | Horse County',
  description: 'Participate in classical dressage masterclasses, desert dune trail rides, and royal horse riding experiences at Horse County & Yog Maya Range.'
};

export const revalidate = 0;

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Royal Riding & Schooling"
          title="Equestrian Experiences"
          subtitle="Immerse yourself in authentic classical horsemanship under master trainers. Every session is conducted with personalized attention to rider balance and equine harmony."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-[#d4af37]/50 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30">
                  {exp.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white font-serif">
                  {exp.price}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Duration: {exp.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-serif mb-2 group-hover:text-[#d4af37] transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="space-y-2 py-3 border-y border-white/10 mb-6 text-xs text-gray-300">
                    <span className="text-[10px] uppercase tracking-wider text-[#f3e5ab] font-semibold block">
                      Inclusions:
                    </span>
                    {exp.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/book?type=experience&targetId=${exp.id}`}
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] text-center hover:opacity-95 transition-opacity shadow-md"
                >
                  Book Session
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Philosophy Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-[#d4af37]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-serif mb-1">
                Equestrian Safety & Master Supervision
              </h4>
              <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
                All riding sessions are conducted with certified safety gear and guided by riders trained in classical dressage and ethical horsemanship traditions.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#d4af37] shrink-0"
          >
            Custom Academy Enquiries
          </Link>
        </div>
      </div>
    </div>
  );
}
