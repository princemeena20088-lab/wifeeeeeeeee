import React from 'react';
import { Heart, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeaderProps {
  isPlaying: boolean;
  onSendLove?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isPlaying, onSendLove }) => {
  const handleLoveClick = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.1 },
        colors: ['#FB7185', '#FDA4AF', '#F43F5E'],
      });
    } catch {
      // ignore
    }
    if (onSendLove) onSendLove();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF5F7]/90 backdrop-blur-md border-b border-rose-200/60 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg sm:text-xl font-bold tracking-tight text-rose-950 whitespace-nowrap shrink-0 font-['Playfair_Display'] hover:text-rose-600 transition-colors"
        >
          Priyansh & Ishika <span className="text-rose-500 font-['Caveat'] text-2xl font-bold">Forever ❤️</span>
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-rose-800/80">
          <a
            href="#timeline"
            className="hover:text-rose-950 transition-colors whitespace-nowrap shrink-0"
          >
            Memories
          </a>
          <a
            href="#gallery"
            className="hover:text-rose-950 transition-colors whitespace-nowrap shrink-0"
          >
            Reel & Photos
          </a>
          <a
            href="#coupons"
            className="hover:text-rose-950 transition-colors whitespace-nowrap shrink-0"
          >
            Coupons
          </a>
          <a
            href="#game"
            className="hover:text-rose-950 transition-colors whitespace-nowrap shrink-0"
          >
            Catch Kisses
          </a>
          <a
            href="#certificate"
            className="hover:text-rose-950 transition-colors whitespace-nowrap shrink-0"
          >
            Certificate
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleLoveClick}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Send Love 💌</span>
          </button>
        </div>
      </div>
    </header>
  );
};
