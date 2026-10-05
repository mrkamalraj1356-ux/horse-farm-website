'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GALLERY_ITEMS, GalleryItem } from '@/data/gallery';
import { HORSES_DATA } from '@/data/horses';
import SectionHeading from '@/components/SectionHeading';
import {
  Maximize2,
  X,
  Play,
  Camera,
  Film,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { getYouTubeEmbedUrl } from '@/utils/media';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'horses', label: 'Horses' },
    { id: 'farm', label: 'Farm & Stables' },
    { id: 'training', label: 'Training Arena' },
    { id: 'riding', label: 'Riding & Trails' },
    { id: 'events', label: 'Events' },
    { id: 'behind_scenes', label: 'Behind the Scenes' }
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Collect all verified videos from horses
  const allHorseVideos = HORSES_DATA.flatMap((h) =>
    h.videos.map((v) => ({
      ...v,
      horseId: h.id,
      horseName: h.name,
      horseBreed: h.breed
    }))
  );

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Visual Archive"
          title="Sanctuary Gallery"
          subtitle="Explore the timeless beauty of our Marwari & Kathiawari horses, state-of-the-art facilities, and desert training grounds. Strict media attribution guarantees each horse’s media is authentic."
        />

        {/* Category Filters Bar */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-black shadow-lg scale-105'
                  : 'bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-[#d4af37]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-[#d4af37]/60 aspect-[4/3] cursor-pointer transition-all duration-500"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/60 text-[#d4af37] border border-[#d4af37]/30 backdrop-blur-md">
                  {item.category.replace('_', ' ')}
                </span>
                {item.horseName && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab]">
                    {item.horseName} Only
                  </span>
                )}
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <h4 className="text-base font-bold text-white group-hover:text-[#d4af37] transition-colors mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-300 font-light line-clamp-1">
                  {item.description}
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-black/70 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Showcase Section */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <SectionHeading
            badge="Motion Archives"
            title="Equestrian Video Showcase"
            subtitle="Watch authentic cadence, free canters, and traditional procession schooling. Every video clip is strictly separated by horse."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allHorseVideos.map((video) => (
              <div
                key={video.id}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] bg-black">
                  {getYouTubeEmbedUrl(video.src) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(video.src)!}
                      title={video.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={video.src}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 left-2 z-10 bg-black/70 px-2 py-0.5 rounded-md text-[10px] text-[#d4af37] border border-[#d4af37]/30">
                    {video.horseName}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-white mb-1">
                      {video.title}
                    </h5>
                    <p className="text-xs text-gray-400 font-light mb-3">
                      {video.description}
                    </p>
                  </div>

                  <Link
                    href={`/horses/${video.horseId}`}
                    className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View {video.horseName}'s full profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8">
          <div className="w-full max-w-5xl flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div>
              <h3 className="text-xl font-bold text-[#d4af37]">
                {selectedItem.title}
              </h3>
              <p className="text-xs text-gray-400">
                {selectedItem.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-4">
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          <div className="w-full max-w-5xl pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <div>Category: <span className="text-white capitalize">{selectedItem.category.replace('_', ' ')}</span></div>
            {selectedItem.horseId && (
              <Link
                href={`/horses/${selectedItem.horseId}`}
                className="text-[#d4af37] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View {selectedItem.horseName} Horse Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
