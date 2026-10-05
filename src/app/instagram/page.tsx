'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FARM_CONFIG } from '@/data/config';
import { INSTAGRAM_POSTS, InstagramPost } from '@/data/instagram';
import SectionHeading from '@/components/SectionHeading';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  X,
  ExternalLink,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { InstagramIcon } from '@/components/SocialIcons';

export default function InstagramPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'reels' | 'images'>('all');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  const filteredPosts = INSTAGRAM_POSTS.filter((post) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'reels') return post.type === 'reel';
    if (activeTab === 'images') return post.type === 'image';
    return true;
  });

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Instagram Profile Header Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#d4af37]/30 shadow-2xl mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Avatar with Royal Gradient Ring */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#8c7026] shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-black">
                  <img
                    src="/horses/sultan/sultan-1.jpg"
                    alt={FARM_CONFIG.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1 border-2 border-black">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                    <span>@{FARM_CONFIG.instagramUsername}</span>
                    <span className="text-[10px] text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                      Verified Stud
                    </span>
                  </h1>
                  <p className="text-xs text-[#c5a059] uppercase tracking-widest mt-0.5">
                    {FARM_CONFIG.tagline}
                  </p>
                </div>

                <a
                  href={`https://instagram.com/${FARM_CONFIG.instagramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] hover:opacity-90 transition-opacity shadow-lg"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Follow on Instagram</span>
                </a>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center sm:justify-start gap-8 text-xs text-gray-300 border-y border-white/5 py-3">
                <div>
                  <strong className="text-white font-bold text-sm block">128</strong>
                  <span className="text-gray-400">Posts</span>
                </div>
                <div>
                  <strong className="text-white font-bold text-sm block">42.8K</strong>
                  <span className="text-gray-400">Followers</span>
                </div>
                <div>
                  <strong className="text-white font-bold text-sm block">184</strong>
                  <span className="text-gray-400">Following</span>
                </div>
              </div>

              {/* Bio */}
              <div className="text-xs text-gray-300 leading-relaxed font-light">
                <p className="font-semibold text-white">👑 {FARM_CONFIG.name}</p>
                <p>🐎 Indigenous Marwari & Kathiawari Bloodline Sanctuary</p>
                <p>📍 {FARM_CONFIG.location}</p>
                <p>📩 Enquiries & Private Viewings: concierge@royalmarwarhorses.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex items-center justify-center gap-3 mb-8 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'all'
                ? 'bg-white/10 text-[#d4af37] border border-[#d4af37]/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Media
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reels')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              activeTab === 'reels'
                ? 'bg-white/10 text-[#d4af37] border border-[#d4af37]/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Reels</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'images'
                ? 'bg-white/10 text-[#d4af37] border border-[#d4af37]/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Photos
          </button>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-[#d4af37]/50 cursor-pointer transition-all duration-300"
            >
              <img
                src={post.mediaUrl}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Reel Indicator icon top right */}
              {post.type === 'reel' && (
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-white">
                  <Play className="w-3.5 h-3.5 fill-current text-[#d4af37]" />
                </div>
              )}

              {/* Hover Dark Overlay with Stats */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white text-xs font-bold">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Instagram Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-[#121418] border border-[#d4af37]/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media side */}
            <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden aspect-square md:aspect-auto">
              {selectedPost.videoUrl ? (
                <video
                  src={selectedPost.videoUrl}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={selectedPost.mediaUrl}
                  alt={selectedPost.caption}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Details side */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d4af37]">
                    <img
                      src="/horses/sultan/sultan-1.jpg"
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{FARM_CONFIG.instagramUsername}</span>
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                    </h4>
                    <span className="text-[10px] text-gray-400">{FARM_CONFIG.name}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-light mb-6 whitespace-pre-line">
                  {selectedPost.caption}
                </p>

                {selectedPost.horseTag && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs mb-4">
                    <span className="text-gray-400 block text-[10px] uppercase">Featured Horse</span>
                    <Link
                      href={`/horses/${selectedPost.horseTag.toLowerCase()}`}
                      className="font-bold text-[#d4af37] hover:underline"
                    >
                      View {selectedPost.horseTag}'s Profile →
                    </Link>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-gray-300">
                  <div className="flex items-center gap-4">
                    <Heart className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                    <MessageCircle className="w-5 h-5 hover:text-white cursor-pointer" />
                    <Share2 className="w-5 h-5 hover:text-white cursor-pointer" />
                  </div>
                  <Bookmark className="w-5 h-5 hover:text-white cursor-pointer" />
                </div>

                <div className="text-xs font-bold text-white">
                  {selectedPost.likes.toLocaleString()} likes
                </div>

                <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {selectedPost.date}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
