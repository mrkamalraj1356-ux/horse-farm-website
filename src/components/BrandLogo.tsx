import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withLink?: boolean;
  className?: string;
}

export default function BrandLogo({
  size = 'md',
  withLink = true,
  className = ''
}: BrandLogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12',
    lg: 'w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13',
    xl: 'w-14 h-14 sm:w-16 sm:h-16',
  };

  const titleSizes = {
    sm: 'text-sm sm:text-base font-bold tracking-[0.14em]',
    md: 'text-base sm:text-lg md:text-xl font-bold tracking-[0.16em]',
    lg: 'text-lg sm:text-xl md:text-2xl font-bold tracking-[0.18em]',
    xl: 'text-2xl sm:text-3xl font-extrabold tracking-[0.2em]',
  };

  const taglineSizes = {
    sm: 'text-[8px] sm:text-[9px] tracking-[0.22em]',
    md: 'text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em]',
    lg: 'text-[10px] sm:text-[11px] tracking-[0.26em]',
    xl: 'text-xs sm:text-sm tracking-[0.3em]',
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer ${className}`}>
      {/* Official Circular Gold HC + Horse Emblem */}
      <img
        src="/images/logo/horse-county-emblem.png"
        alt="HORSE COUNTY Emblem"
        className={`${iconSizes[size]} object-contain rounded-full drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-105 shrink-0`}
        loading="eager"
      />

      {/* Official Typography Lockup: HORSE COUNTY + Tagline */}
      <div className="flex flex-col justify-center leading-none select-none">
        <span className={`font-serif font-black uppercase text-white gold-gradient-text transition-colors duration-300 ${titleSizes[size]}`}>
          HORSE COUNTY
        </span>
        <span className={`uppercase font-medium text-[#c5a059] mt-1 sm:mt-1.5 ${taglineSizes[size]}`}>
          HORSES • HERITAGE • PASSION
        </span>
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link
        href="/"
        aria-label="HORSE COUNTY Home"
        className="inline-flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4af37] rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
}
