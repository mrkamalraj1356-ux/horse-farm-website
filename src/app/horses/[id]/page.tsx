import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HORSES_DATA, getHorseById, getSimilarHorses } from '@/data/horses';
import { FARM_CONFIG } from '@/data/config';
import HorseGallery from '@/components/HorseGallery';
import HorseVideoSection from '@/components/HorseVideoSection';
import HorseCard from '@/components/HorseCard';
import SectionHeading from '@/components/SectionHeading';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Share2,
  FileText,
  BadgeCheck,
  Award
} from 'lucide-react';
import AskAIHorseButton from './AskAIHorseButton';

export async function generateStaticParams() {
  return HORSES_DATA.map((horse) => ({
    id: horse.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const horse = getHorseById(id);

  if (!horse) {
    return {
      title: `Horse Not Found | ${FARM_CONFIG.name}`,
    };
  }

  return {
    title: `${horse.name} - ${horse.breed} ${horse.genderRole} | ${FARM_CONFIG.name}`,
    description: horse.description,
    openGraph: {
      title: `${horse.name} (${horse.breed}) - ${FARM_CONFIG.name}`,
      description: horse.description,
      images: [horse.images[0]],
    },
  };
}

export default async function HorseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const horse = getHorseById(id);

  if (!horse) {
    notFound();
  }

  const similarHorses = getSimilarHorses(horse.id, 3);

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/horses" className="hover:text-white transition-colors">
            Horses
          </Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">{horse.name}</span>
          <span className="ml-auto text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full hidden sm:inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Profile: {horse.name} Media Exclusively</span>
          </span>
        </div>

        {/* Top Split: Left Gallery vs Right Info Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Left Column: Dedicated Photo Gallery (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <HorseGallery
              horseName={horse.name}
              horseId={horse.id}
              images={horse.images}
            />

            {/* Quick Pedigree Certification Banner */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    Passport & Microchip Verified
                  </div>
                  <div className="text-gray-400 font-mono text-[11px]">
                    ID: {horse.passportId}
                  </div>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <div className="text-[#c5a059] font-medium">{horse.lineage}</div>
                <div className="text-gray-500 text-[10px]">Registered Stud Ancestry</div>
              </div>
            </div>
          </div>

          {/* Right Column: Horse Information & CTAs (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]">
                    {horse.breed}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${
                      horse.availability === 'Available'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                        : horse.availability === 'Booked'
                        ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                        : 'bg-sky-950/80 text-sky-300 border-sky-500/40'
                    }`}
                  >
                    {horse.availability}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-serif mt-2">
                  {horse.name}
                </h1>
                <p className="text-sm text-gray-400 font-light mt-1">
                  {horse.genderRole} • {horse.ageDisplay} • {horse.height}
                </p>

                {/* Price Display */}
                <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 block font-light">
                      Acquisition Valuation
                    </span>
                    <span className="text-3xl font-extrabold text-white gold-gradient-text font-serif">
                      {horse.price}
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-gray-400">
                    <div>Includes Full Vet Check</div>
                    <div className="text-[#d4af37]">Health Guarantee Included</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="text-sm text-gray-300 leading-relaxed font-light space-y-3">
                <p>{horse.description}</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {horse.detailedStory}
                </p>
              </div>

              {/* Key Specs Grid */}
              <div className="rounded-2xl glass-card p-5 border border-white/10">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#d4af37]" />
                  <span>Conformation & Attributes</span>
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {horse.specs.map((sp, idx) => (
                    <div key={idx} className="flex flex-col pb-2 border-b border-white/5">
                      <span className="text-[10px] uppercase text-gray-500 tracking-wider">
                        {sp.label}
                      </span>
                      <span className="text-gray-200 font-medium mt-0.5 truncate">
                        {sp.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3">
                {horse.availability === 'Available' ? (
                  <Link
                    href={`/buy?horse=${horse.id}`}
                    className="py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_5px_20px_rgba(212,175,55,0.4)] hover:opacity-95 text-center flex items-center justify-center gap-2"
                  >
                    <span>Buy This Horse</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-400 bg-white/5 border border-white/10 text-center cursor-not-allowed"
                  >
                    Currently Reserved
                  </button>
                )}

                <Link
                  href={`/book?horse=${horse.id}`}
                  className="py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#d4af37] text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#d4af37]" />
                  <span>Book This Horse</span>
                </Link>
              </div>

              {/* Ask AI About This Horse Button */}
              <AskAIHorseButton horseName={horse.name} horseId={horse.id} />

              <div className="text-[11px] text-gray-500 text-center pt-1">
                Owner contact privacy protected. All requests managed via Stud Concierge.
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Video Section: "Watch [Name] in Action" */}
        <HorseVideoSection horse={horse} />

        {/* Detailed Veterinary, Training & Temperament Cards */}
        <section className="py-16 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-[#d4af37]" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                Training & Temperament
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                <strong>Training:</strong> {horse.training}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong>Temperament:</strong> {horse.temperament}
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                Veterinary & Soundness
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                <strong>Health Status:</strong> {horse.health}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Full physical exam, dental check, and hoof balance report available upon enquiry.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-[#d4af37]" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                Breeding & Experience
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                <strong>Experience:</strong> {horse.experience}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong>Lineage:</strong> {horse.lineage}
              </p>
            </div>
          </div>
        </section>

        {/* Similar Horses (Showing 3 OTHER horses with THEIR OWN distinct media) */}
        <section className="py-16 border-t border-white/10">
          <SectionHeading
            badge="Sanctuary Collection"
            title="Similar Horses"
            subtitle={`Other prestigious horses bred with equal dedication at ${FARM_CONFIG.name}.`}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarHorses.map((simHorse) => (
              <HorseCard key={simHorse.id} horse={simHorse} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
