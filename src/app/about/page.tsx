import React from 'react';
import Link from 'next/link';
import { FARM_CONFIG } from '@/data/config';
import SectionHeading from '@/components/SectionHeading';
import {
  Award,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const facilities = [
    {
      title: 'Climate-Regulated Royal Stables',
      image: '/farm/stables.jpg',
      desc: 'Spacious individual mahogany boxes equipped with automated misters, non-slip rubberized paving, and continuous fresh spring water circulation.'
    },
    {
      title: 'Olympic Silica Sand Arena',
      image: '/farm/arena.jpg',
      desc: 'All-weather 60m x 20m arena with laser-graded silica footing engineered to provide optimal concussion absorption and propulsion for dressage schooling.'
    },
    {
      title: '150-Acre Turnout Pastures',
      image: '/farm/pasture.jpg',
      desc: 'Fenced grazing paddocks seeded with organic Bermuda and alfalfa grass, enabling natural equine herd dynamics and cardiovascular fitness.'
    }
  ];

  const trainers = [
    {
      name: 'Rathore Bhanwar Singh',
      role: 'Master of Equitation & Royal Stud Director',
      exp: '38 Years Experience',
      desc: 'Hereditary equestrian master trained in Rajput cavalry horsemanship, classical high-school airs, and indigenous breed genetics.'
    },
    {
      name: 'Dr. Ananya Mathur, MVSc',
      role: 'Chief Veterinary Surgeon & Nutritionist',
      exp: '14 Years Equine Medicine',
      desc: 'Specialist in equine sports orthopedics, reproductive ultrasonography, and customized metabolic nutrition plans.'
    },
    {
      name: 'Devraj Chauhan',
      role: 'Lead Classical Trainer & Saddle Master',
      exp: '16 Years Dressage',
      desc: 'Gold medalist in national endurance championships with a deep focus on gentle, trusting groundwork and harmonious cadence.'
    }
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Royal Heritage"
          title="About Our Sanctuary"
          subtitle="A legacy founded on unconditional reverence for India's legendary warhorse breeds, blending historic chivalry with progressive 21st-century equine science."
        />

        {/* Section 1: Our Story */}
        <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              The Living Legend of Marwar
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              Preserving the Courageous Steeds of Kings
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              Founded in {FARM_CONFIG.establishedYear}, {FARM_CONFIG.name} was established with a singular devotion: to preserve and elevate the purebred Marwari and Kathiawari horse breeds. For millennia, these noble horses carried Rajput warriors through impossible desert battles, famed for their supernatural loyalty, acute hearing, and inward-curling ears that touch in an iconic lyrical arch.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              Today, our 150-acre sanctuary in Rajasthan stands as an internationally recognized center of breeding excellence. We operate with strict pedigree registries, verified microchips, and an uncompromising code of ethical, positive horsemanship.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center flex-1">
                <span className="text-2xl font-bold gold-gradient-text block">35+</span>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider">Years Active</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center flex-1">
                <span className="text-2xl font-bold gold-gradient-text block">140+</span>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider">Foals Reared</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center flex-1">
                <span className="text-2xl font-bold gold-gradient-text block">100%</span>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider">Soundness</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card border border-[#d4af37]/30 shadow-2xl">
            <img
              src="/farm/heritage.jpg"
              alt="Marwar Royal Horse Heritage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Archival Sanctuary Heritage
              </span>
              <h4 className="text-xl font-bold text-white mt-1">
                Rajasthan Marwar Heritage Valley
              </h4>
            </div>
          </div>
        </section>

        {/* Section 2: Our Mission */}
        <section className="mb-24 rounded-3xl p-8 sm:p-12 glass-card border border-[#d4af37]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Our Guiding Purpose
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4 font-serif">
              Ethical Stewardship, Proven Bloodlines & Lifelong Partnership
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light mb-6">
              Our mission is to establish the Marwari and Kathiawari horse not only as national heritage symbols, but as premier competitive performers in modern dressage, endurance trail riding, and exhibition arts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Zero inbreeding tolerance policy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>24/7 open paddock freedom & social herd living</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Holistic veterinary & dental screening</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Transparent client vetting & trial guarantees</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: World-Class Facilities */}
        <section className="mb-24">
          <SectionHeading
            badge="Estate Infrastructure"
            title="World-Class Facilities"
            subtitle="Engineered to royal specifications for supreme athletic conditioning, rehabilitation, and equine contentment."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-[#d4af37]/50 transition-all flex flex-col justify-between"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-white mb-2">{fac.title}</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Master Trainers & Care Team */}
        <section className="mb-24">
          <SectionHeading
            badge="Equine Leadership"
            title="Trainers & Specialists"
            subtitle="Meet the caretakers and masters responsible for nurturing our champions from foalhood to exhibition glory."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainers.map((tr, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-[#d4af37] uppercase tracking-wider font-semibold">
                    {tr.exp}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1 mb-1">
                    {tr.name}
                  </h4>
                  <p className="text-xs text-[#c5a059] font-medium mb-4">
                    {tr.role}
                  </p>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {tr.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center p-12 rounded-3xl glass-card border border-[#d4af37]/30">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Experience the Legacy in Person
          </h3>
          <p className="text-sm text-gray-300 max-w-lg mx-auto mb-6">
            We welcome serious equestrians, collectors, and breed connoisseurs for private farm walkthroughs and stud viewings.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
          >
            <span>Schedule Private Viewing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
