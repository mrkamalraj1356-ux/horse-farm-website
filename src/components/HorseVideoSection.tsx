'use client';

import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Maximize,
  Volume2,
  VolumeX,
  Video as VideoIcon,
  Sparkles,
  Film
} from 'lucide-react';
import { Horse } from '@/data/horses';
import { getYouTubeEmbedUrl, isYouTubeUrl } from '@/utils/media';

interface HorseVideoSectionProps {
  horse: Horse;
}

export default function HorseVideoSection({ horse }: HorseVideoSectionProps) {
  // Strict media validation: accept videos that belong to this horse or are valid video URLs
  const validVideos = horse.videos.filter(
    (v) => v.src.includes(`/horses/${horse.id}/`) || isYouTubeUrl(v.src) || v.src.length > 0
  );

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = validVideos[activeVideoIndex];
  const youtubeEmbedUrl = currentVideo ? getYouTubeEmbedUrl(currentVideo.src, false) : null;

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // If a horse does not have any video (e.g. Tara)
  if (!validVideos || validVideos.length === 0) {
    return (
      <section className="py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto rounded-3xl p-10 glass-card border border-[#d4af37]/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
          <Film className="w-12 h-12 text-[#d4af37] mx-auto mb-4 opacity-70" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            Equine Cinematography
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-3">
            Watch {horse.name} in Action
          </h3>
          <p className="text-sm text-gray-300 max-w-lg mx-auto mb-6">
            Video coming soon for {horse.name}. High-definition motion footage and dressage reels are currently being edited by our media team.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
            <span>Strict Media Rule: We never substitute other horses' clips</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
            <span>❖</span>
            <span>Cinematic Motion Footage</span>
            <span>❖</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Watch <span className="gold-gradient-text">{horse.name}</span> in Action
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl font-light">
            Pure, unedited cadence and performance showcasing {horse.name}’s natural gait, headset, and responsive temperament under our master trainers.
          </p>
        </div>

        {/* Video switcher tabs if multiple videos */}
        {validVideos.length > 1 && (
          <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
            {validVideos.map((vid, idx) => (
              <button
                key={vid.id}
                type="button"
                onClick={() => {
                  setActiveVideoIndex(idx);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeVideoIndex === idx
                    ? 'bg-[#d4af37] text-black font-semibold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Video {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Luxury Video Stage */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-[#d4af37]/30 shadow-2xl group aspect-[16/9] max-h-[640px] bg-black">
        {/* CASE A: YOUTUBE VIDEO (youtu.be / youtube.com / shorts) */}
        {youtubeEmbedUrl ? (
          <iframe
            src={youtubeEmbedUrl}
            title={currentVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          /* CASE B: LOCAL MP4 / WEBM VIDEO */
          <>
            <video
              ref={videoRef}
              src={currentVideo.src}
              className="w-full h-full object-cover"
              loop
              muted={isMuted}
              playsInline
              onEnded={() => setIsPlaying(false)}
            />

            {/* Subtle Dark Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-black/40 transition-opacity duration-300 pointer-events-none ${
                isPlaying ? 'opacity-0 group-hover:opacity-40' : 'opacity-60'
              }`}
            />

            {/* Big Center Play Button when paused */}
            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlayToggle}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#f3e5ab] text-black flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.6)] transform hover:scale-110 transition-all duration-300"
                aria-label="Play Video"
              >
                <Play className="w-8 h-8 ml-1 fill-black" />
              </button>
            )}

            {/* Bottom Control Bar for MP4 */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-black/80 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlayToggle}
                  className="p-1.5 rounded-lg text-white hover:text-[#d4af37] transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                </button>

                <button
                  type="button"
                  onClick={handleMuteToggle}
                  className="p-1.5 rounded-lg text-gray-300 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <span className="text-xs text-gray-400 font-mono">
                  {currentVideo.duration}
                </span>
              </div>

              <div className="text-xs text-gray-300 hidden sm:block truncate max-w-md">
                {currentVideo.description}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="p-1.5 rounded-lg text-gray-300 hover:text-white transition-colors"
                  title="Fullscreen"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Top Video Information Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="bg-black/75 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs text-white">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-semibold text-[#d4af37]">{horse.name}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">{currentVideo.title}</span>
          </div>

          <div className="bg-black/75 backdrop-blur-md border border-[#d4af37]/40 px-3 py-1 rounded-full text-[11px] text-[#f3e5ab] font-medium">
            Strict {horse.name} Footage
          </div>
        </div>
      </div>
    </section>
  );
}
