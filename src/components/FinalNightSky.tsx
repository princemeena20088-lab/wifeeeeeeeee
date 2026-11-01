import React, { useState } from 'react';
import { TwoTeddyBears, ButterflySvg } from './CuteIllustrations';
import { Heart, Sparkles, ArrowUp, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinalNightSky: React.FC = () => {
  const [heartPulsing, setHeartPulsing] = useState<boolean>(false);

  const handleFinalHeartClick = () => {
    setHeartPulsing(true);
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.8 },
        colors: ['#FDA4AF', '#F43F5E', '#EC4899', '#FBCFE8', '#F59E0B', '#E0E7FF'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setHeartPulsing(false), 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[95vh] bg-gradient-to-b from-[#FFF5F7] via-[#2A1832] to-[#13091B] text-white pt-20 pb-16 px-4 overflow-hidden flex flex-col items-center justify-between">
      {/* Night Sky Stars & Crescent Moon */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Twinkling Stars generated via CSS positions */}
        {[
          { top: '15%', left: '10%', size: 'w-2 h-2', delay: '0s' },
          { top: '22%', left: '25%', size: 'w-1 h-1', delay: '1s' },
          { top: '10%', left: '50%', size: 'w-2 h-2', delay: '1.5s' },
          { top: '18%', left: '75%', size: 'w-1.5 h-1.5', delay: '0.5s' },
          { top: '30%', left: '88%', size: 'w-2 h-2', delay: '2s' },
          { top: '40%', left: '15%', size: 'w-1 h-1', delay: '1.2s' },
          { top: '45%', left: '82%', size: 'w-2 h-2', delay: '0.8s' },
          { top: '55%', left: '30%', size: 'w-1.5 h-1.5', delay: '2.5s' },
          { top: '60%', left: '70%', size: 'w-1 h-1', delay: '1.8s' },
          { top: '70%', left: '12%', size: 'w-2 h-2', delay: '0.3s' },
          { top: '78%', left: '90%', size: 'w-1.5 h-1.5', delay: '1.4s' },
        ].map((star, idx) => (
          <div
            key={idx}
            className={`absolute bg-amber-100 rounded-full animate-sparkle ${star.size}`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              boxShadow: '0 0 8px rgba(254, 240, 138, 0.8)',
            }}
          />
        ))}

        {/* Glowing Crescent Moon */}
        <div className="absolute top-16 right-8 sm:right-24 animate-float">
          <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
            <path
              d="M75 15C55 20 40 40 45 65C50 90 75 95 75 95C40 95 15 70 15 45C15 25 35 15 75 15Z"
              fill="#FEF08A"
              filter="drop-shadow(0 0 15px rgba(254, 240, 138, 0.9))"
            />
          </svg>
        </div>

        {/* Gentle Night Butterflies */}
        <div className="absolute top-28 left-8 sm:left-24 animate-float">
          <ButterflySvg className="w-8 h-8 opacity-70" color="#F472B6" />
        </div>
        <div className="absolute top-48 right-12 sm:right-32 animate-float-delayed">
          <ButterflySvg className="w-6 h-6 opacity-60" color="#C084FC" />
        </div>
      </div>

      {/* Main Night Sky Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Soft Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-pink-200 text-xs font-medium mb-6 shadow-sm backdrop-blur-xs">
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>Under a million stars, I found you</span>
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
        </div>

        {/* Two Teddy Bears Sitting Together */}
        <div className="my-4">
          <TwoTeddyBears variant="night-sky" className="w-72 sm:w-96 h-52 sm:h-60" />
        </div>

        {/* Exact Final Message Block */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-pink-300/30 shadow-2xl max-w-xl mx-auto mt-4 text-center">
          <div className="font-['Playfair_Display'] text-xl sm:text-2xl font-medium text-pink-100 leading-relaxed mb-6">
            &ldquo;Out of all the people in this world, I would still choose you, Ishika. Every single time. ❤️&rdquo;
          </div>

          <div className="font-['Caveat'] text-2xl sm:text-3xl font-bold text-pink-200 leading-relaxed space-y-4">
            <p>
              You are my favourite person, my happiness and my forever.
            </p>
            <p className="text-3xl sm:text-4xl text-rose-300 font-extrabold">
              I love you sooo much, my baby. 🧿💗
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-pink-300/20 flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-pink-300 font-['Outfit'] mb-1">
              Forever yours,
            </span>
            <span className="font-['Caveat'] text-3xl font-bold text-white tracking-wide">
              Your Priyansh 💌
            </span>
          </div>
        </div>

        {/* Final Glowing Heart Animation Button */}
        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={handleFinalHeartClick}
            className={`group relative p-4 rounded-full transition-all duration-300 cursor-pointer ${
              heartPulsing ? 'scale-125' : 'hover:scale-110 active:scale-95'
            }`}
            title="Click for a final love burst"
          >
            <div className="absolute inset-0 bg-rose-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
            <Heart className="w-16 h-16 fill-rose-500 text-rose-400 relative z-10 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
          </button>
          <span className="text-xs text-pink-300 font-['Caveat'] text-lg mt-1">
            Tap the heart to seal our promise forever 🧿
          </span>
        </div>
      </div>

      {/* Back to top button */}
      <div className="relative z-10 mt-12">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-pink-100 text-xs font-medium backdrop-blur-xs transition-all cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Relive from the beginning 💌</span>
        </button>
      </div>
    </section>
  );
};
