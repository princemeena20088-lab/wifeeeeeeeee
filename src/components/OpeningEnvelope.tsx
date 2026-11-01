import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TeddyBear, WaxSeal, ButterflySvg } from './CuteIllustrations';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';

interface OpeningEnvelopeProps {
  onOpenComplete?: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  onOpenComplete,
  isOpen,
  setIsOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpening(true);

    // Sweet celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FDA4AF', '#F43F5E', '#EC4899', '#FBCFE8', '#FFCCD5', '#F59E0B'],
      });
    } catch {
      // fallback
    }

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      if (onOpenComplete) onOpenComplete();
    }, 900);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Decorative dreamy background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-pink-200/50 via-rose-100/40 to-purple-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating little stickers around envelope */}
      <div className="absolute top-12 left-8 sm:left-24 animate-float opacity-80 pointer-events-none">
        <span className="text-3xl">🎀</span>
      </div>
      <div className="absolute top-20 right-8 sm:right-24 animate-float-delayed opacity-80 pointer-events-none">
        <ButterflySvg className="w-8 h-8" color="#EC4899" />
      </div>
      <div className="absolute bottom-24 left-10 sm:left-32 animate-float opacity-75 pointer-events-none">
        <span className="text-3xl">🌸</span>
      </div>
      <div className="absolute bottom-20 right-10 sm:right-36 animate-float-delayed opacity-75 pointer-events-none">
        <span className="text-3xl">🧸</span>
      </div>

      <div className="relative max-w-xl w-full flex flex-col items-center text-center z-10">
        {/* Soft Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-sm font-medium mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-rose-500 animate-spin-slow" />
          <span>Made with endless love by Priyansh</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
        </div>

        {/* Heading */}
        <h1 className="font-['Playfair_Display'] text-3xl sm:text-5xl font-bold text-rose-950 tracking-tight leading-tight mb-4 text-balance">
          A little world made just for you, <span className="text-rose-500 font-['Caveat'] text-4xl sm:text-6xl font-bold ml-1">Ishika ❤️</span>
        </h1>

        <p className="font-['Outfit'] text-rose-800/80 text-base sm:text-lg max-w-md mx-auto mb-8 font-light">
          Every moment with you is my favourite page in life. Touch the envelope to unveil what my heart has kept for you.
        </p>

        {/* Interactive Envelope Container */}
        <div className="relative w-72 sm:w-88 h-64 sm:h-72 my-4 perspective-1000 flex items-center justify-center">
          {!isOpen ? (
            /* Closed Envelope Card */
            <div
              onClick={handleOpen}
              className={`group relative w-full h-full cursor-pointer transition-all duration-700 ease-out transform ${
                isOpening ? 'scale-105' : 'hover:scale-[1.02]'
              }`}
            >
              {/* Envelope Body */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F7] via-[#FFE4EC] to-[#FCCEE0] rounded-2xl shadow-xl border border-pink-200/80 overflow-hidden flex flex-col justify-end p-6">
                {/* Envelope lining design */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-rose-100/60 to-transparent pointer-events-none" />

                {/* Diagonal envelope crease lines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    background:
                      'linear-gradient(to top right, transparent 49.5%, #FDA4AF 50%, transparent 50.5%), linear-gradient(to top left, transparent 49.5%, #FDA4AF 50%, transparent 50.5%)',
                  }}
                />

                {/* Wax Seal Center Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="transition-transform duration-300 group-hover:scale-110 active:scale-95">
                    <WaxSeal text="Ishika ❤️" className="w-16 h-16 sm:w-20 sm:h-20" />
                  </div>
                  <span className="font-['Caveat'] text-rose-700 font-bold text-lg mt-3 bg-white/80 px-3 py-0.5 rounded-full shadow-sm backdrop-blur-xs">
                    Click to Open 💌
                  </span>
                </div>

                {/* Little cute corner stamp */}
                <div className="absolute top-4 right-4 rotate-6 border border-dashed border-rose-300 rounded p-1.5 bg-white/70">
                  <span className="text-xs font-['Caveat'] font-bold text-rose-600">Special Delivery 🧿</span>
                </div>
              </div>

              {/* Envelope Flap animation */}
              <div
                className={`absolute top-0 left-0 right-0 h-1/2 origin-top rounded-t-2xl transition-transform duration-700 ease-in-out z-10 ${
                  isOpening ? 'rotate-x-180 -translate-y-1' : ''
                }`}
                style={{
                  background: 'linear-gradient(135deg, #FFD1DC 0%, #FCCEE0 100%)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  borderTop: '1px solid #FBCFE8',
                }}
              />
            </div>
          ) : (
            /* Opened Surprise Reveal */
            <div className="w-full h-full bg-white/95 rounded-2xl shadow-2xl border-2 border-rose-200/80 p-6 flex flex-col items-center justify-center relative animate-float">
              {/* Corner decorative ribbons */}
              <div className="absolute -top-3 -right-3 text-2xl rotate-12">🎀</div>
              <div className="absolute -top-3 -left-3 text-2xl -rotate-12">✨</div>

              {/* Revealed Cute Teddy Bear Holding Heart */}
              <TeddyBear pose="holding-heart" className="w-32 h-32 sm:w-36 sm:h-36" />

              {/* Required Exact Text */}
              <div className="mt-2 text-center">
                <p className="font-['Caveat'] text-2xl sm:text-3xl font-bold text-rose-600 tracking-wide">
                  I love you sooooo much, my Ishika 🧿💕
                </p>
                <p className="text-xs text-rose-400 mt-1 font-['Outfit']">
                  Every beat of my heart belongs to you
                </p>
              </div>

              {/* Close / Replay small control */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute bottom-2 text-[11px] text-rose-400 hover:text-rose-600 underline cursor-pointer"
              >
                close envelope
              </button>
            </div>
          )}
        </div>

        {/* Action Button */}
        {!isOpen ? (
          <button
            onClick={handleOpen}
            className="mt-6 px-8 py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white font-medium text-base rounded-full shadow-lg shadow-rose-300/60 hover:shadow-xl hover:shadow-rose-400/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
          >
            <span>Open your surprise 💌</span>
            <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform" />
          </button>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-3">
            <a
              href="#song-section"
              className="px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-medium text-base rounded-full shadow-lg shadow-rose-300/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore Our Love Story 📖</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <span className="text-xs text-rose-400 font-['Caveat'] text-lg">
              Scroll down to listen to our song & relive our memories ↓
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
