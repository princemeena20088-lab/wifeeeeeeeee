import React, { useState } from 'react';
import { TeddyBear, WaxSeal, ButterflySvg, WashiTapeStrip } from './CuteIllustrations';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MessageLetterSection: React.FC = () => {
  const [hugCount, setHugCount] = useState<number>(0);
  const [showBearHugMessage, setShowBearHugMessage] = useState<boolean>(false);

  const handleBearClick = () => {
    setHugCount((prev) => prev + 1);
    setShowBearHugMessage(true);

    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#FB7185', '#FDA4AF', '#F43F5E', '#FECDD3'],
      });
    } catch {
      // fallback
    }

    setTimeout(() => setShowBearHugMessage(false), 2400);
  };

  return (
    <section className="relative py-16 px-4 max-w-3xl mx-auto">
      {/* Chapter kicker */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-rose-500 mb-2">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="text-xs font-semibold tracking-wider uppercase font-['Outfit']">
            Chapter 02 · Straight From The Heart
          </span>
          <Sparkles className="w-4 h-4 animate-spin-slow" />
        </div>
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-rose-950">
          A MESSAGE FOR MY BABY 🧸
        </h2>
        <p className="font-['Caveat'] text-2xl text-rose-600 font-bold mt-1">
          Open this whenever you doubt how precious you are to me...
        </p>
      </div>

      {/* Scrapbook Letter Container */}
      <div className="relative bg-[#FFFBF7] rounded-3xl p-6 sm:p-12 shadow-2xl border-2 border-pink-200/90 overflow-hidden paper-pattern">
        {/* Washi tape on four corners */}
        <div className="absolute -top-3 -left-3 pointer-events-none">
          <WashiTapeStrip pattern="stripes" className="w-24 h-6 rotate-[-35deg]" />
        </div>
        <div className="absolute -top-3 -right-3 pointer-events-none">
          <WashiTapeStrip pattern="pink" className="w-24 h-6 rotate-[35deg]" />
        </div>
        <div className="absolute -bottom-3 -left-3 pointer-events-none">
          <WashiTapeStrip pattern="pink" className="w-24 h-6 rotate-[35deg]" />
        </div>
        <div className="absolute -bottom-3 -right-3 pointer-events-none">
          <WashiTapeStrip pattern="stripes" className="w-24 h-6 rotate-[-35deg]" />
        </div>

        {/* Decorative stickers floating on the letter */}
        <div className="absolute top-6 right-8 text-2xl animate-float opacity-80 pointer-events-none">
          🌸
        </div>
        <div className="absolute bottom-8 left-8 text-2xl animate-float-delayed opacity-80 pointer-events-none">
          🎀
        </div>

        {/* Letter Head */}
        <div className="border-b border-rose-200/60 pb-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WaxSeal text="For Ishu" className="w-10 h-10" />
            <div>
              <p className="font-['Caveat'] text-xl font-bold text-rose-800">
                To My Forever Cutie, Ishika
              </p>
              <p className="text-[11px] text-rose-400 font-['Outfit']">
                Handwritten with unconditional love
              </p>
            </div>
          </div>
          <span className="font-['Caveat'] text-lg text-rose-400 font-bold">
            Only for you 🧿
          </span>
        </div>

        {/* The Handwritten Message */}
        <div className="lined-paper rounded-2xl p-6 sm:p-8 border border-pink-100 shadow-sm relative mb-8">
          <div className="font-['Caveat'] text-2xl sm:text-3xl text-[#3B1F2B] font-bold leading-relaxed space-y-5">
            <p className="first-letter:text-4xl first-letter:text-rose-500 first-letter:font-bold">
              Mera pyara baccha Ishika, teko jitna pyar karu utna hi kam he. I loveeee uuu sooo much babe....
            </p>
            <p>
              U r perfect. Meko bas tu hi chahiye. Mat soch ki tu best nhi he. Agar hoga bhi koi tere se accha, meko fir bhi tu chahiye. Har situation me, har time, har jagah bas tu hi chahiye. Meko bas tu hi chahiye mera pyara sa baccha. ❤️
            </p>
          </div>
        </div>

        {/* Cute Animated Teddy Bear Holding a Big Heart */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="relative">
            <TeddyBear
              pose="holding-heart"
              className="w-40 h-40 sm:w-44 sm:h-44 transition-transform hover:scale-110 active:scale-95"
              onClick={handleBearClick}
            />

            {/* Hug count badge */}
            {hugCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                {hugCount} hugs given!
              </span>
            )}

            {/* Hug speech bubble */}
            {showBearHugMessage && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs font-['Caveat'] font-bold text-base px-3 py-1 rounded-full shadow-lg whitespace-nowrap animate-pulse">
                Warm Teddy Hug for Ishika! 🧸💕
              </div>
            )}
          </div>

          <p className="text-xs text-rose-400 font-['Outfit'] mt-3 flex items-center gap-1.5 cursor-pointer" onClick={handleBearClick}>
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>Tap teddy bear to give Ishika a warm tight hug</span>
          </p>
        </div>
      </div>
    </section>
  );
};
