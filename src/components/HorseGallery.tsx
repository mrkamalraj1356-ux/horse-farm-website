'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Camera
} from 'lucide-react';

interface HorseGalleryProps {
  horseName: string;
  horseId: string;
  images: string[];
}

export default function HorseGallery({ horseName, horseId, images }: HorseGalleryProps) {
  // Validate that all images belong to THIS horse
  const validImages = images.filter((img) => img.includes(`/horses/${horseId}/`));
  const displayImages = validImages.length > 0 ? validImages : images;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  if (!displayImages || displayImages.length === 0) {
    return (
      <div className="rounded-2xl p-12 text-center glass-card border border-[#d4af37]/20">
        <Camera className="w-12 h-12 text-[#d4af37] mx-auto mb-3 opacity-60" />
        <h4 className="text-lg font-bold text-white mb-1">More Photos Coming Soon</h4>
        <p className="text-xs text-gray-400">
          Official photographic portfolio for {horseName} is being cataloged by our stud concierge.
        </p>
      </div>
    );
  }

  const currentImage = displayImages[currentIndex];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image Stage */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden glass-card border border-[#d4af37]/20 group">
        <img
          src={currentImage}
          alt={`${horseName} - Photo ${currentIndex + 1}`}
          className="w-full h-full object-cover object-center transition-all duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Counter Badge */}
        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs text-gray-200">
          Photo {currentIndex + 1} of {displayImages.length}
        </div>

        {/* Exclusive Horse Attribution Badge */}
        <div className="absolute top-4 right-4 z-10 bg-[#0d0e12]/80 backdrop-blur-md border border-[#d4af37]/40 px-3 py-1 rounded-full text-xs text-[#d4af37] flex items-center gap-1.5 font-medium">
          <span>❖</span>
          <span>Verified {horseName} Media Only</span>
        </div>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-[#d4af37] text-white hover:text-black border border-white/20 hover:border-[#d4af37] backdrop-blur-md transition-all duration-300"
          title="Open Fullscreen Lightbox"
          aria-label="Fullscreen view"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Previous / Next Arrow Controls */}
        {displayImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 opacity-80 group-hover:opacity-100"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 opacity-80 group-hover:opacity-100"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                currentIndex === idx
                  ? 'border-[#d4af37] scale-[1.02] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
              }`}
            >
              <img
                src={img}
                alt={`${horseName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {currentIndex === idx && (
                <div className="absolute inset-0 bg-[#d4af37]/15 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8">
          {/* Header */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div>
              <h3 className="text-xl font-bold tracking-wider text-[#d4af37]">
                {horseName} Photographic Portfolio
              </h3>
              <p className="text-xs text-gray-400">
                Image {currentIndex + 1} of {displayImages.length} • Strict Horse-Specific Media
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Image Stage */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={currentImage}
              alt={`${horseName} fullscreen ${currentIndex + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {displayImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/70 hover:bg-[#d4af37] text-white hover:text-black border border-white/20 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/70 hover:bg-[#d4af37] text-white hover:text-black border border-white/20 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Footer Thumbnails */}
          <div className="w-full max-w-4xl flex items-center justify-center gap-3 overflow-x-auto py-2">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  currentIndex === idx
                    ? 'border-[#d4af37] scale-105'
                    : 'border-white/20 opacity-50 hover:opacity-90'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
