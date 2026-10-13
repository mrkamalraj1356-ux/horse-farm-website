'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Horse } from '@/lib/types';
import { ArrowUpRight, Heart, Play } from 'lucide-react';

interface HorseCardProps {
  horse: Horse;
  priority?: boolean;
}

export default function HorseCard({ horse, priority = false }: HorseCardProps) {
  const [likesCount, setLikesCount] = useState(horse.likesCount || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const primaryImage = (horse.images && horse.images.length > 0)
    ? horse.images[0]
    : `/horses/${horse.id}/${horse.id}-1.jpg`;

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiking) return;

    setIsLiking(true);
    // Optimistic update
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikesCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    try {
      const res = await fetch(`/api/horses/${horse.id}/like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setIsLiked(data.liked);
        setLikesCount(data.count);
      }
    } catch {
      // Revert on error
      setIsLiked(!nextLiked);
      setLikesCount((prev) => (!nextLiked ? prev + 1 : Math.max(0, prev - 1)));
    } finally {
      setIsLiking(false);
    }
  };

  const getStatusBadge = (status: Horse['availability']) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'Booked':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'In Training':
        return 'bg-sky-950/80 text-sky-300 border-sky-500/40';
      case 'Sold':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/40';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden glass-card glass-card-hover flex flex-col justify-between border border-white/10 hover:border-[#d4af37]/40 transition-all duration-300">
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#14161b]">
        <img
          src={primaryImage}
          alt={`${horse.name} - ${horse.breed} ${horse.genderRole || horse.gender}`}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/50 pointer-events-none" />

        {/* Top Badges & Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-md ${getStatusBadge(
                horse.availability
              )}`}
            >
              {horse.availability}
            </span>

            <span className="text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/60 text-[#f3e5ab] border border-[#d4af37]/30 backdrop-blur-md">
              {horse.breed}
            </span>
          </div>

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isLiked
                ? 'bg-rose-600/80 border-rose-400 text-white'
                : 'bg-black/50 border-white/20 text-gray-300 hover:text-white hover:border-[#d4af37]'
            }`}
            title="Add to Wishlist"
            aria-label="Wishlist Horse"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Price Tag Overlay at Bottom of Image */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="text-xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-serif">
            {horse.price || 'Contact for Price'}
          </div>
          <span className="text-[10px] text-gray-300 uppercase tracking-widest font-light">
            Pedigree Valuation
          </span>
        </div>

        {/* Video Indicator */}
        {horse.videos && horse.videos.length > 0 && (
          <div className="absolute bottom-3 right-3 z-10 bg-black/70 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-0.5 flex items-center gap-1 text-[10px] text-gray-200">
            <Play className="w-2.5 h-2.5 fill-red-500 text-red-500" />
            <span>{horse.videos.length} {horse.videos.length === 1 ? 'Video' : 'Videos'}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <h3 className="text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors font-serif">
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
          <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-white/5 mb-4 text-xs">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 tracking-wider">Age & Gender</span>
              <span className="text-gray-200 font-medium">
                {horse.ageDisplay || `${horse.age} Years`} • {horse.genderRole || horse.gender}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 tracking-wider">Lineage</span>
              <span className="text-gray-200 font-medium truncate" title={horse.lineage}>
                {horse.lineage?.split('x')[0] || horse.lineage || 'Royal Heritage'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            href={`/horses/${horse.id}`}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-center text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 flex items-center justify-center gap-1"
          >
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
          </Link>

          {horse.availability === 'Available' ? (
            <Link
              href={`/buy?horse=${horse.id}`}
              className="py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] hover:opacity-90 transition-opacity shadow-md"
            >
              Enquire
            </Link>
          ) : (
            <Link
              href={`/book?horse=${horse.id}`}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-center text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
            >
              Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
