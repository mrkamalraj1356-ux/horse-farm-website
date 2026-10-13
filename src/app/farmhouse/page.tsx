import React from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import { getFarmhousePackages } from '@/lib/db';
import {
  Building2,
  CheckCircle2,
  Calendar,
  Users,
  Camera,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Phone
} from 'lucide-react';

export const metadata = {
  title: 'Yog Maya Range — Luxury Farmhouse & Event Venue | Horse County',
  description: 'Yog Maya Range is our private 150-acre Rajasthan farmhouse and equestrian sanctuary. Host pre-wedding photoshoots, private celebrations, and stable retreats.'
};

export const revalidate = 0;

export default async function FarmhousePage() {
  const packages = await getFarmhousePackages();

  const facilities = [
    {
      title: 'Royal Mahogany Stables',
      description: 'Spacious 14x14 ft individual boxes with automatic misting, rubberized orthopedic flooring, and private paddock turnouts.',
      image: '/farm/stables.jpg',
      specs: '14x14 ft Boxes • Climate-Regulated'
    },
    {
      title: 'Olympic-Dimension Training Arena',
      description: 'State-of-the-art silica sand and textile footing designed to cushion joints and foster rhythmic cadence during high-level dressage.',
      image: '/farm/arena.jpg',
      specs: '60x20m Olympic Dimension • Silica Sand'
    },
    {
      title: 'Desert Heritage Trails & Pastures',
      description: 'Open golden sand dunes and nutrient-rich pasture paddocks allowing natural socialization and invigorating trail expeditions.',
      image: '/farm/pasture.jpg',
      specs: '150-Acre Estate • Sand Dune Trails'
    },
    {
      title: 'VIP Guest Lounge & Villa',
      description: 'Air-conditioned hospitality suite with traditional Rajasthani architectural detailing, dressing rooms, and private dining pavilions.',
      image: '/farm/heritage.jpg',
      specs: 'Private Dressing Suite • Luxury Dining'
    }
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <SectionHeading
          badge="150-Acre Rajasthan Sanctuary"
          title="Yog Maya Range"
          subtitle="Experience the tranquil charm of Yog Maya Range. A prestigious equestrian estate crafted for luxury farm stays, royal pre-wedding photoshoots, and private celebrations."
        />

        {/* Hero Banner Grid */}
        <div className="relative rounded-3xl overflow-hidden glass-card border border-[#d4af37]/30 shadow-2xl mb-16 aspect-[16/8] sm:aspect-[21/9] min-h-[360px] flex items-end p-6 sm:p-12">
          <img
            src="/farm/hero-bg.jpg"
            alt="Yog Maya Range Equestrian Sanctuary"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/40 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] mb-3">
              <Building2 className="w-3.5 h-3.5 text-black" />
              <span>Sanctuary & Estate</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight">
              Where Royal Heritage Meets Desert Serenity
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 mt-2 font-light leading-relaxed">
              Located in Jodhpur, Rajasthan, Yog Maya Range provides exclusive private access to purebred warhorses, pristine arenas, and curated Rajasthani hospitality.
            </p>
          </div>
        </div>

        {/* Facilities Section */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Estate Facilities & Amenities
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl mx-auto">
              Engineered to meet the highest international equestrian standards with authentic royal Rajasthani comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className="group glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] text-[#f3e5ab] font-mono">
                    {fac.specs}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white mb-2 font-serif group-hover:text-[#d4af37] transition-colors">
                      {fac.title}
                    </h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Packages Section */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-2">
              <span>❖</span>
              <span>Hospitality & Events</span>
              <span>❖</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              Yog Maya Range Packages
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl mx-auto">
              Curated experiences tailored for photoshoots, private celebrations, and stable day retreats.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl overflow-hidden glass-card p-6 sm:p-8 flex flex-col justify-between border ${
                  pkg.popular ? 'border-[#d4af37] shadow-[0_0_35px_rgba(212,175,55,0.2)]' : 'border-white/10'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-black font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
                    {pkg.tag}
                  </span>
                  <h4 className="text-2xl font-bold text-white font-serif mb-2">
                    {pkg.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-extrabold gold-gradient-text font-serif">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-gray-400 font-light">/ package</span>
                  </div>

                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-2.5 py-4 border-y border-white/10 mb-6 text-xs text-gray-300">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Duration: {pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Capacity: {pkg.guestCapacity}</span>
                    </div>

                    <div className="pt-2 text-[11px] font-semibold text-[#f3e5ab] uppercase tracking-wider">
                      Inclusions:
                    </div>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/book?type=farmhouse&packageId=${pkg.id}`}
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] text-center hover:opacity-95 transition-opacity shadow-md"
                >
                  Book Package
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Location & Visiting Concierge */}
        <section className="glass-card rounded-3xl p-8 sm:p-12 border border-[#d4af37]/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold block mb-2">
                Sanctuary Concierge
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-4">
                Plan Your Private Visit to Yog Maya Range
              </h3>
              <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                To maintain equine tranquility and exclusive privacy for guests, all visits to Yog Maya Range are arranged strictly by prior appointment.
              </p>

              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#d4af37]" />
                  <span>Marwar Heritage Valley, Jodhpur, Rajasthan, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <span>Concierge Helpline: +91 291 294 8800</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span>Visiting Hours: 08:00 AM – 06:30 PM (Tuesday – Sunday)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
              <Link
                href="/book?type=farmhouse"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_10px_25px_rgba(212,175,55,0.4)] text-center"
              >
                Schedule Visit Request
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 text-center"
              >
                Contact Concierge
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
