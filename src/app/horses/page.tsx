'use client';

import React, { useState, useMemo } from 'react';
import { HORSES_DATA, Horse } from '@/data/horses';
import HorseCard from '@/components/HorseCard';
import SectionHeading from '@/components/SectionHeading';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  Filter
} from 'lucide-react';

export default function HorsesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedAge, setSelectedAge] = useState<string>('All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');

  const filteredHorses = useMemo(() => {
    return HORSES_DATA.filter((horse) => {
      // 1. Search name or breed
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = horse.name.toLowerCase().includes(q);
        const matchBreed = horse.breed.toLowerCase().includes(q);
        const matchDesc = horse.description.toLowerCase().includes(q);
        if (!matchName && !matchBreed && !matchDesc) return false;
      }

      // 2. Breed
      if (selectedBreed !== 'All' && horse.breed !== selectedBreed) {
        return false;
      }

      // 3. Gender
      if (selectedGender !== 'All' && horse.gender !== selectedGender) {
        return false;
      }

      // 4. Age
      if (selectedAge !== 'All') {
        if (selectedAge === 'Young (3-4)' && (horse.age < 3 || horse.age > 4)) return false;
        if (selectedAge === 'Prime (5-6)' && (horse.age < 5 || horse.age > 6)) return false;
        if (selectedAge === 'Mature (7+)' && horse.age < 7) return false;
      }

      // 5. Price
      if (selectedPrice !== 'All') {
        if (selectedPrice === '< 2.5L' && horse.rawPrice >= 250000) return false;
        if (selectedPrice === '2.5L - 3.5L' && (horse.rawPrice < 250000 || horse.rawPrice > 350000)) return false;
        if (selectedPrice === '> 3.5L' && horse.rawPrice <= 350000) return false;
      }

      // 6. Availability
      if (selectedAvailability !== 'All' && horse.availability !== selectedAvailability) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedBreed,
    selectedGender,
    selectedAge,
    selectedPrice,
    selectedAvailability
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBreed('All');
    setSelectedGender('All');
    setSelectedAge('All');
    setSelectedPrice('All');
    setSelectedAvailability('All');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedBreed !== 'All' ||
    selectedGender !== 'All' ||
    selectedAge !== 'All' ||
    selectedPrice !== 'All' ||
    selectedAvailability !== 'All';

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeading
          badge="Purebred Pedigree"
          title="Our Horses"
          subtitle="Explore our collection of carefully selected horses. Each horse is cataloged with verified health, ancestry records, and distinct photographic and video documentation."
        />

        {/* Search & Filter Toolbar */}
        <div className="glass-card rounded-2xl p-6 border border-[#d4af37]/20 shadow-xl mb-12">
          {/* Top Row: Search Bar */}
          <div className="relative mb-6">
            <Search className="w-5 h-5 text-[#d4af37] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by horse name (e.g. Sultan, Rajveer, Noor)..."
              className="w-full bg-[#16181e] border border-white/10 focus:border-[#d4af37] rounded-xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Selects Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Breed Filter */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                Breed
              </label>
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="w-full bg-[#16181e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="All">All Breeds</option>
                <option value="Marwari">Marwari</option>
                <option value="Kathiawari">Kathiawari</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                Gender
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full bg-[#16181e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male (Stallion)</option>
                <option value="Female">Female (Mare/Filly)</option>
              </select>
            </div>

            {/* Age Filter */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                Age Bracket
              </label>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="w-full bg-[#16181e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="All">All Ages</option>
                <option value="Young (3-4)">3 - 4 Years</option>
                <option value="Prime (5-6)">5 - 6 Years</option>
                <option value="Mature (7+)">7+ Years</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                Price Valuation
              </label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full bg-[#16181e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="All">All Valuations</option>
                <option value="< 2.5L">Under ₹2.5 Lakh</option>
                <option value="2.5L - 3.5L">₹2.5L - ₹3.5 Lakh</option>
                <option value="> 3.5L">Above ₹3.5 Lakh</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                Availability
              </label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full bg-[#16181e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="In Training">In Training</option>
              </select>
            </div>
          </div>

          {/* Bottom Filter Status Bar */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="font-semibold text-[#d4af37]">{filteredHorses.length}</span>
              <span>horses match your criteria</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">Strict individual horse media verification active</span>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#d4af37] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filteredHorses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHorses.map((horse) => (
              <HorseCard key={horse.id} horse={horse} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-16 text-center border border-white/10 max-w-lg mx-auto">
            <span className="text-4xl block mb-3">🐎</span>
            <h3 className="text-xl font-bold text-white mb-2">No Horses Match These Filters</h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              We couldn't find any horses matching your exact search. Try adjusting your breed, price bracket, or age criteria.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-lg text-xs font-semibold text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
