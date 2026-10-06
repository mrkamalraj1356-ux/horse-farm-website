import React from 'react';
import Link from 'next/link';
import { FARM_CONFIG } from '@/data/config';
import { HORSES_DATA, getFeaturedHorses } from '@/data/horses';
import HorseCard from '@/components/HorseCard';
import SectionHeading from '@/components/SectionHeading';
import FarmGallery from '@/components/FarmGallery';
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Compass,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Users,
  Clock,
  Camera,
  CheckCircle2
} from 'lucide-react';

import HomeHero from '@/components/HomeHero';

// =========================================================================
// YOG MAYA RANGE - PERMANENT FARM PHOTO GALLERY
// Easy-to-edit image data structure: Add, remove, or update image paths below.
// Place your farm photos into the /public/images/gallery/ directory.
// =========================================================================
const galleryImages = [
  "/images/gallery/farm-1.jpg",
  "/images/gallery/farm-2.jpg",
  "/images/gallery/farm-3.jpg",
  "/images/gallery/farm-4.jpg",
  "/images/gallery/farm-5.jpg",
  "/images/gallery/farm-6.jpg",
  "/images/gallery/farm-7.jpg",
  "/images/gallery/farm-8.jpg",
  "/images/gallery/farm-9.jpg"
];


export default function HomePage() {
  const featuredHorses = getFeaturedHorses();

  const whyChooseFeatures = [
    {
      icon: Award,
      title: 'Noble Heritage Bloodlines',
      description: 'Preserving purebred Marwari and Kathiawari genetics with certified ancestry records dating back multiple generations.'
    },
    {
      icon: ShieldCheck,
      title: 'World-Class Equine Care',
      description: 'Climate-regulated mahogany stables, customized high-protein organic nutrition, and 24/7 resident veterinary supervision.'
    },
    {
      icon: Users,
      title: 'Master Classical Trainers',
      description: 'Decades of experience in classical dressage, positive reinforcement, royal procession training, and endurance trail conditioning.'
    },
    {
      icon: HeartHandshake,
      title: 'Trusted & Ethical Ownership',
      description: 'Transparent veterinary soundness certifications, clean digital radiographs, microchip verification, and smooth handover documentation.'
    },
    {
      icon: Compass,
      title: 'Private Viewing & Trials',
      description: 'Exclusive private farm appointments and curated trial riding sessions on our Olympic-dimension silica sand arena.'
    },
    {
      icon: Clock,
      title: 'Lifetime Sanctuary Support',
      description: 'Comprehensive post-purchase guidance covering dietary regimens, training progression, and boarding arrangements.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Explore Horses',
      description: 'Browse our curated collection of purebred Marwari and Kathiawari horses with authentic, dedicated photo and video portfolios.'
    },
    {
      number: '02',
      title: 'Choose Your Horse',
      description: 'Compare temperament, training level, height, and pedigree to find the exact companion matching your riding or breeding aspirations.'
    },
    {
      number: '03',
      title: 'Submit Enquiry',
      description: 'Send a streamlined purchase or booking request. Our confidential concierge coordinates directly with you—no public phone numbers exposed.'
    },
    {
      number: '04',
      title: 'Our Team Connects',
      description: 'Our equine directors arrange private viewing, vet inspections, transport logistics, and official registry transfers.'
    }
  ];

  const farmExperiences = [
    {
      title: 'Royal Mahogany Stables',
      tag: 'Sanctuary Facilities',
      image: '/farm/stables.jpg',
      description: 'Spacious 14x14 ft individual boxes with automatic misting, rubberized orthopedic flooring, and private paddock turnouts.'
    },
    {
      title: 'Olympic Training Arena',
      tag: 'Classical Schooling',
      image: '/farm/arena.jpg',
      description: 'State-of-the-art silica sand and textile footing designed to cushion joints and foster rhythmic cadence during high-level dressage.'
    },
    {
      title: 'Desert Trail Expeditions',
      tag: 'Heritage Lifestyle',
      image: '/farm/riding.jpg',
      description: 'Authentic cross-country trails spanning golden sand dunes, honoring the endurance and courage of historic warrior steeds.'
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. CINEMATIC FULL-SCREEN HORSE VIDEO HERO SECTION */}
      <HomeHero />


      {/* 2. STATS OVERVIEW BAR */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#d4af37]/30 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {FARM_CONFIG.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black gold-gradient-text font-serif">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-gray-300 font-medium uppercase tracking-wider mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED HORSES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionHeading
          badge="Royal Collection"
          title="Featured Horses"
          subtitle="Discover some of our exceptional horses, each with their own verified lineage, unique photography, and dedicated video showcase."
        />

        {/* Strict Horse Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHorses.map((horse, idx) => (
            <HorseCard key={horse.id} horse={horse} priority={idx < 2} />
          ))}
        </div>

        {/* View All Horses CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/horses"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#f3e5ab] bg-[#d4af37]/15 border border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            <span>View Complete Collection ({HORSES_DATA.length} Horses)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. WHY CHOOSE OUR FARM */}
      <section className="py-24 bg-[#0a0c10] border-y border-white/5 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="The Royal Standard"
            title="Why Choose Our Farm"
            subtitle="Setting an uncompromising benchmark for noble bloodline preservation, veterinary transparency, and compassionate equine stewardship."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="glass-card glass-card-hover rounded-2xl p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-[#c5a059] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    <span>Certified Farm Guarantee</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (01 - 04) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionHeading
          badge="Seamless Process"
          title="How It Works"
          subtitle="A discreet, transparent, and concierge-guided path from initial discovery to trial riding and registered ownership."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="relative glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl font-black text-[#d4af37]/30 font-mono block mb-4">
                  {st.number}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {st.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-gray-600">
                  <ArrowRight className="w-5 h-5 text-[#d4af37]/60" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. FARM EXPERIENCE (CINEMATIC SHOWCASE) */}
      <section className="py-24 bg-[#090b0e] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Equestrian Lifestyle"
            title="The Sanctuary Experience"
            subtitle="Immerse yourself in our tranquil 150-acre Rajasthan estate, where centuries of royal equine culture are brought to life."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {farmExperiences.map((exp, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden glass-card border border-white/10 flex flex-col justify-between aspect-[3/4]"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/40 to-transparent" />

                <div className="relative z-10 p-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-black bg-[#d4af37]">
                    {exp.tag}
                  </span>
                </div>

                <div className="relative z-10 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f3e5ab] hover:underline"
                  >
                    <span>Read about our facilities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. YOG MAYA RANGE PERMANENT FARM PHOTO GALLERY */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Yog Maya Range</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Inside <span className="gold-gradient-text">Yog Maya Range</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400 font-light max-w-2xl leading-relaxed">
              A glimpse into our horses, facilities and the beautiful surroundings of Yog Maya Range.
            </p>
          </div>

          <Link
            href="/gallery"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] hover:opacity-90 hover:scale-105 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] w-fit shrink-0"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Permanent photo gallery grid */}
        <FarmGallery images={galleryImages} />
      </section>

      {/* 8. FINAL CALL TO ACTION (CTA) */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0a0c10] via-[#121419] to-[#07080a] border-t border-[#d4af37]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/50 flex items-center justify-center mx-auto mb-6 p-1">
            <img
              src="/images/logo/horse-county-emblem.png"
              alt="HORSE COUNTY"
              className="w-full h-full object-contain rounded-full drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
            />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white capitalize font-serif tracking-tight">
            Ready to Find Your <br />
            <span className="gold-gradient-text">Perfect Horse?</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Whether you are looking to acquire an exhibition champion, schedule a private stud viewing, or submit your own horse for valuation, our equestrian concierge is at your service.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/buy"
              className="px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-transform"
            >
              Buy a Horse
            </Link>

            <Link
              href="/book"
              className="px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all hover:border-[#d4af37]"
            >
              Book a Horse
            </Link>

            <Link
              href="/sell"
              className="px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white bg-transparent hover:bg-white/5 border border-white/15 transition-all"
            >
              Sell Your Horse
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
