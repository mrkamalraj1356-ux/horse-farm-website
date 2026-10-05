import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className = ''
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 mb-3`}>
          <span>❖</span>
          <span>{badge}</span>
          <span>❖</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white capitalize">
        <span className="gold-gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className={`mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 flex items-center gap-2 ${centered ? 'justify-center' : 'justify-start'}`}>
        <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/60" />
        <span className="w-2 h-2 rotate-45 border border-[#d4af37] bg-[#d4af37]/30" />
        <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/60" />
      </div>
    </div>
  );
}
