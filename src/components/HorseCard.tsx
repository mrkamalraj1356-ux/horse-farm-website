import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Horse } from '@/data/horses';
import { ArrowUpRight, Calendar, Heart, Shield, Sparkles } from 'lucide-react';

interface HorseCardProps {
  horse: Horse;
  priority?: boolean;
}

export default function HorseCard({ horse, priority = false }: HorseCardProps) {
  // Ensure we use the horse's FIRST image exclusively
  const primaryImage = horse.images[0] || `/horses/${horse.id}/${horse.id}-1.jpg`;

  const getStatusBadge = (status: Horse['availability']) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'Booked':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'In Training':
        return 'bg-sky-950/80 text-sky-300 border-sky-500/40';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden glass-card glass-card-hover flex flex-col justify-between">
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#16181e]">
        <img
          src={primaryImage}
          alt={`${horse.name} - ${horse.breed} ${horse.genderRole}`}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span
            className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-md ${getStatusBadge(
              horse.availability
            )}`}
          >
            {horse.availability}
          </span>

          <span className="text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/60 text-[#f3e5ab] border border-[#d4af37]/30 backdrop-blur-md">
            {horse.breed}
          </span>
        </div>

        {/* Price Tag Overlay at Bottom of Image */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {horse.price}
          </div>
          <span className="text-[10px] text-gray-300 uppercase tracking-widest font-light">
            Pedigree Valuation
          </span>
        </div>

        {/* Video Indicator if Horse Has Dedicated Videos */}
        {horse.videos.length > 0 && (
          <div className="absolute bottom-3 right-3 z-10 bg-black/70 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-0.5 flex items-center gap-1 text-[11px] text-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>{horse.videos.length} {horse.videos.length === 1 ? 'Video' : 'Videos'}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
              {horse.name}
            </h3>
            <span className="text-xs text-gray-400 font-mono">
              {horse.height}
            </span>
          </div>

          <p className="text-xs text-gray-400 font-light line-clamp-2 mb-4 leading-relaxed">
            {horse.description}
          </p>

          {/* Specs Micro Pills */}
          <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/5 mb-4 text-xs">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 tracking-wider">Age & Gender</span>
              <span className="text-gray-200 font-medium">{horse.ageDisplay} • {horse.genderRole}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 tracking-wider">Lineage</span>
              <span className="text-gray-200 font-medium truncate" title={horse.lineage}>{horse.lineage.split('x')[0] || horse.lineage}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            href={`/horses/${horse.id}`}
            className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold text-center text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 flex items-center justify-center gap-1"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
          </Link>

          {horse.availability === 'Available' ? (
            <Link
              href={`/buy?horse=${horse.id}`}
              className="py-2.5 px-3.5 rounded-lg text-xs font-semibold text-center text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] hover:opacity-90 transition-opacity"
            >
              Buy / Enquire
            </Link>
          ) : (
            <Link
              href={`/book?horse=${horse.id}`}
              className="py-2.5 px-3.5 rounded-lg text-xs font-semibold text-center text-white bg-[#1e2229] hover:bg-[#252a33] border border-white/10 transition-colors"
            >
              Book Viewing
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
