import React from 'react';
import Link from 'next/link';
import { FARM_CONFIG } from '@/data/config';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withLink?: boolean;
  className?: string;
}

export default function BrandLogo({ size = 'md', withLink = true, className = '' }: BrandLogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-sm font-semibold tracking-wider',
    md: 'text-base font-bold tracking-widest',
    lg: 'text-xl font-bold tracking-[0.2em]',
    xl: 'text-2xl font-extrabold tracking-[0.25em]',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[10px] tracking-[0.3em]',
    lg: 'text-xs tracking-[0.35em]',
    xl: 'text-sm tracking-[0.4em]',
  };

  const content = (
    <div className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Luxury Horse Head Silhouette Emblem */}
      <div className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-[#2a2418] via-[#1a1712] to-[#0d0c0a] border border-[#d4af37]/40 p-2 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-[#d4af37] transition-all duration-300 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-[#d4af37] fill-current transform group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          {/* Refined Royal Horse Head Silhouette with inward lyre ears */}
          <path d="M 28 85 C 26 75, 25 60, 30 45 C 33 36, 38 27, 43 18 C 45 14, 48 11, 51 15 C 53 18, 54 24, 52 29 C 55 24, 58 12, 63 15 C 66 18, 65 26, 62 33 C 71 35, 78 40, 84 48 C 88 53, 89 60, 82 64 C 77 67, 72 65, 68 62 C 65 67, 58 72, 54 75 C 48 80, 42 85, 28 85 Z" />
          {/* Subtle eye and bridle detail */}
          <circle cx="62" cy="46" r="2.5" fill="#121316" />
          <path d="M 50 33 Q 63 43 72 58" stroke="#121316" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>
      </div>

      <div className="flex flex-col leading-tight">
        <span className={`text-[#fcf9f2] uppercase ${titleSizes[size]} group-hover:text-[#d4af37] transition-colors duration-300`}>
          {FARM_CONFIG.name}
        </span>
        <span className={`text-[#c5a059] uppercase font-light ${subtitleSizes[size]}`}>
          EQUESTRIAN
        </span>
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" aria-label={`${FARM_CONFIG.name} Home`}>
        {content}
      </Link>
    );
  }

  return content;
}
