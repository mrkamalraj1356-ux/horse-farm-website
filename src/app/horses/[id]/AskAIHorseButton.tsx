'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface AskAIHorseButtonProps {
  horseName: string;
  horseId: string;
}

export default function AskAIHorseButton({ horseName, horseId }: AskAIHorseButtonProps) {
  const handleClick = () => {
    const event = new CustomEvent('open-ai-chat', {
      detail: {
        query: `Tell me about ${horseName}`
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/40 transition-colors flex items-center justify-center gap-2 group"
    >
      <Sparkles className="w-4 h-4 text-[#d4af37] group-hover:rotate-12 transition-transform" />
      <span>Ask AI About {horseName}</span>
    </button>
  );
}
