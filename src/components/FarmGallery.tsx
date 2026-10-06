'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';

interface FarmGalleryProps {
  images: string[];
}

export default function FarmGallery({ images }: FarmGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Helper to get formatted title from filename
  const getFormattedName = (src: string, index: number) => {
    try {
      const filename = src.split('/').pop()?.split('.')[0] || `photo-${index + 1}`;
      return filename
        .split(/[-_]/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    } catch {
      return `Photo ${index + 1}`;
    }
  };

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev === 0 ? images.length - 1 : (prev ?? 0) - 1));
  }, [selectedIdx, images.length]);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev === images.length - 1 ? 0 : (prev ?? 0) + 1));
  }, [selectedIdx, images.length]);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedIdx, handlePrev, handleNext]);

  const handleImageError = (src: string) => {
    setFailedImages((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <div className="w-full">
      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, idx) => {
          const isFailed = failedImages[src];
          const name = getFormattedName(src, idx);

          return (
            <div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-[#d4af37]/60 transition-all duration-500 cursor-pointer shadow-xl bg-[#0b0d12]"
            >
              {isFailed ? (
                // Elegant luxury placeholder while photos are being prepared
                <div className="absolute inset-0 bg-gradient-to-br from-[#121620] via-[#0d1017] to-[#080a0f] flex flex-col items-center justify-center p-6 text-center select-none">
                  <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[#d4af37] transition-all duration-300">
                    <Camera className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <h4 className="text-sm font-semibold text-white tracking-wide mb-1 group-hover:text-[#d4af37] transition-colors">
                    {name}
                  </h4>
                  <span className="text-[10px] text-[#d4af37]/80 uppercase tracking-[0.2em] font-medium">
                    Yog Maya Range
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono mt-3 px-2 py-0.5 rounded bg-black/40 border border-white/5 truncate max-w-[200px]">
                    {src}
                  </span>
                </div>
              ) : (
                <>
                  <img
                    src={src}
                    alt={`Yog Maya Range - ${name}`}
                    onError={() => handleImageError(src)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Bottom caption bar */}
                  <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between z-10">
                    <div>
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#d4af37] block mb-1">
                        Yog Maya Range
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white drop-shadow">
                        {name}
                      </h4>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                      <Maximize2 className="w-4 h-4 text-[#d4af37]" />
                    </div>
                  </div>
                </>
              )}

              {/* Gold corner accent on hover */}
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between z-10 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30">
                ❖ Yog Maya Range
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {String(selectedIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={() => setSelectedIdx(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Stage with Prev / Next */}
          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-12 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white hover:text-[#d4af37] transition-all hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="relative max-w-full max-h-[75vh] rounded-2xl overflow-hidden glass-card border border-[#d4af37]/30 shadow-2xl flex items-center justify-center">
              {failedImages[images[selectedIdx]] ? (
                <div className="w-[320px] sm:w-[500px] h-[340px] bg-gradient-to-br from-[#121620] via-[#0d1017] to-[#080a0f] flex flex-col items-center justify-center p-8 text-center select-none">
                  <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-[#d4af37]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {getFormattedName(images[selectedIdx], selectedIdx)}
                  </h3>
                  <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-3">
                    Yog Maya Range Farm Gallery
                  </p>
                  <p className="text-xs text-gray-400 max-w-xs leading-relaxed mb-4">
                    Photo placeholder ready. Place your farm image file at this path to display it here.
                  </p>
                  <code className="text-[11px] text-gray-300 font-mono px-3 py-1 rounded bg-black/60 border border-white/10">
                    {images[selectedIdx]}
                  </code>
                </div>
              ) : (
                <img
                  src={images[selectedIdx]}
                  alt={`Yog Maya Range - ${getFormattedName(images[selectedIdx], selectedIdx)}`}
                  onError={() => handleImageError(images[selectedIdx])}
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl"
                />
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:-right-12 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white hover:text-[#d4af37] transition-all hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div
            className="w-full max-w-6xl text-center py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-medium text-white tracking-wide">
              {getFormattedName(images[selectedIdx], selectedIdx)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Yog Maya Range • Equine & Facility Showcase
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
