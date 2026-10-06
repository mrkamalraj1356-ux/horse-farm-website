'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Calendar,
  Volume2,
  VolumeX,
  Compass,
  ArrowUpRight,
  ShoppingBag,
  Tag
} from 'lucide-react';

// =========================================================================
// HERO VIDEO URL VARIABLE (Easy to edit)
// Change this path or URL whenever you upload your actual horse video.
// =========================================================================
const HERO_VIDEO_URL = "/videos/horse-hero.mp4";

export default function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showBuySellMenu, setShowBuySellMenu] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Guarantee autoplay by setting muted attribute explicitly in the DOM
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoLoaded(true);
          })
          .catch(() => {
            // Autoplay policy handled gracefully
          });
      }
    }
  }, []);

  // Handle outside clicks to close the Buy/Sell popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowBuySellMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-24 sm:pt-32 sm:pb-28 overflow-hidden bg-[#08090b]">
      {/* 1. HORSE VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* High-res horse poster image displayed while video loads or as fallback */}
        <img
          src="/horses/sultan/sultan-2.jpg"
          alt="Horse County - Yog Maya Range Purebred Horse"
          className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.55] transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {!videoError && (
          <video
            ref={videoRef}
            src={HERO_VIDEO_URL}
            poster="/horses/sultan/sultan-2.jpg"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            onCanPlay={() => setIsVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-out ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Cinematic Multi-Layer Gradient Overlays */}
        {/* Layer A: Vertical balance (dark at top for navbar legibility, transparent in middle for vibrant horse prominence, dark at bottom for smooth stats transition) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090b]/85 via-[#08090b]/30 to-[#08090b]" />

        {/* Layer B: Vignette around edges to frame the horse and center the viewer's focus */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,9,11,0.7)_95%)]" />

        {/* Layer C: Subtle golden ambient warmth behind center title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[340px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* 2. HERO CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Equestrian Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#f3e5ab] bg-[#d4af37]/15 border border-[#d4af37]/40 mb-5 sm:mb-7 backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.2)] animate-hero-fade-in opacity-0">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Equestrian Excellence • Royal Bloodlines</span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>

        {/* MAIN WEBSITE NAME: HORSE COUNTY */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider sm:tracking-widest text-white font-serif leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] animate-hero-fade-in-up animation-delay-100 opacity-0">
          Horse County
        </h1>

        {/* SHORT TAGLINE: Discover. Connect. Ride. */}
        <p className="mt-3 sm:mt-5 text-base sm:text-xl md:text-2xl lg:text-3xl text-[#f3e5ab] font-light tracking-[0.25em] sm:tracking-[0.35em] uppercase font-serif italic drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] animate-hero-fade-in-up animation-delay-200 opacity-0">
          Discover. Connect. Ride.
        </p>

        {/* FARM / BUSINESS NAME: Yog Maya Range (Secondary brand identity) */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3 sm:gap-4 animate-hero-fade-in-up animation-delay-350 opacity-0">
          <span className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
          <span className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.35em] uppercase text-[#d4af37] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Yog Maya Range
          </span>
          <span className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
        </div>

        {/* Brief luxury descriptor */}
        <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-300 max-w-xl font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] animate-hero-fade-in-up animation-delay-350 opacity-0">
          India&apos;s premier sanctuary for purebred Marwari and Kathiawari champions. Authentic lineage, certified veterinary soundness, and royal classical horsemanship.
        </p>

        {/* 3. HERO CTA BUTTONS */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto animate-hero-fade-in-up animation-delay-500 opacity-0">
          {/* CTA 1: Explore Horses */}
          <Link
            href="/horses"
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_10px_35px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.7)] transform hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Explore Horses</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* CTA 2: Buy / Sell a Horse (with interactive dropdown connecting to /buy and /sell) */}
          <div ref={menuRef} className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowBuySellMenu(!showBuySellMenu)}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#d4af37]/70 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:scale-[1.03]"
              aria-expanded={showBuySellMenu}
            >
              <span>Buy / Sell a Horse</span>
              <ChevronDown
                className={`w-4 h-4 text-[#d4af37] transition-transform duration-200 ${
                  showBuySellMenu ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu connecting cleanly to existing /buy and /sell routes */}
            {showBuySellMenu && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 rounded-2xl bg-[#0e1015]/95 backdrop-blur-2xl border border-[#d4af37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2.5 z-50 animate-hero-fade-in"
              >
                <Link
                  href="/buy"
                  onClick={() => setShowBuySellMenu(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#d4af37]/15 transition-colors group text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#f3e5ab] flex items-center gap-1">
                      <span>Buy a Horse</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Acquire registered pedigree horses
                    </div>
                  </div>
                </Link>

                <div className="h-[1px] bg-white/10 my-1" />

                <Link
                  href="/sell"
                  onClick={() => setShowBuySellMenu(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#d4af37]/15 transition-colors group text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                    <Tag className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#f3e5ab] flex items-center gap-1">
                      <span>Sell Your Horse</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
                    </div>
                    <div className="text-[10px] text-gray-400">
                      List with concierge verification
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* CTA 3: Book a Horse */}
          <Link
            href="/book"
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fcf9f2] bg-[#0a0b0d]/70 hover:bg-[#d4af37]/15 border border-[#d4af37]/40 hover:border-[#d4af37] backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.03] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>Book a Horse</span>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 sm:mt-14 flex flex-col items-center gap-2 text-gray-400 opacity-70 animate-bounce animate-hero-fade-in animation-delay-650">
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll to Discover</span>
          <ChevronDown className="w-4 h-4 text-[#d4af37]" />
        </div>
      </div>

      {/* 4. DISCREET AMBIENT VIDEO SOUND TOGGLE (Bottom-Right) */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:block">
        <button
          type="button"
          onClick={toggleSound}
          title={isMuted ? 'Unmute Horse Video' : 'Mute Video'}
          className="p-3 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-[#d4af37] border border-white/10 hover:border-[#d4af37]/50 backdrop-blur-md transition-all shadow-lg cursor-pointer"
          aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
}
