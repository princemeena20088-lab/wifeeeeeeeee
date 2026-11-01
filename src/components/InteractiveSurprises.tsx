import React, { useState } from 'react';
import { TeddyBear, WaxSeal, ButterflySvg } from './CuteIllustrations';
import {
  Heart,
  Sparkles,
  Gift,
  Mail,
  Smile,
  X,
  Flame,
  Stars,
  MessageCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveSurprises: React.FC = () => {
  // 1. Waving Teddy Bear state
  const [isBearWaving, setIsBearWaving] = useState(false);
  const [bearMessage, setBearMessage] = useState<string | null>(null);

  // 2. Kiss Animation state
  const [kissParticles, setKissParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // 3. Love message reveal state
  const [showLoveMessageModal, setShowLoveMessageModal] = useState(false);

  // 4. Mini heart counter state
  const [heartCount, setHeartCount] = useState<number>(100);

  // 5. Final surprise envelope state
  const [showEnvelopeModal, setShowEnvelopeModal] = useState(false);

  // 6. Secret Virtual Love Letter hidden trigger
  const [showSecretLetter, setShowSecretLetter] = useState(false);

  // Audio tone generation for sweet chimes
  const playCuteChime = (freq = 523.25) => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // AudioContext may be restricted
    }
  };

  // Bear wave handler
  const handleBearWave = () => {
    setIsBearWaving(true);
    playCuteChime(659.25);
    const messages = [
      'Hi Ishika cutie! 👋🧸',
      'Priyansh loves you the most! 💕',
      'You are the prettiest girl ever! 🌸',
      'Sending 100 cuddles to you! 🧸✨',
      'Always smiling because of you! 🧿',
    ];
    setBearMessage(messages[Math.floor(Math.random() * messages.length)]);
    setTimeout(() => {
      setIsBearWaving(false);
    }, 2500);
  };

  // Kiss button handler
  const handleSendKiss = (e: React.MouseEvent) => {
    playCuteChime(880);
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    // Spawn 10 flying kiss particles
    const newKisses = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: (rect.left + rect.width / 2) + (Math.random() * 120 - 60),
      y: (rect.top) - (Math.random() * 50 + 20),
    }));

    setKissParticles((prev) => [...prev, ...newKisses]);

    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#E11D48', '#FB7185', '#F43F5E', '#FDA4AF'],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setKissParticles((prev) => prev.slice(8));
    }, 1500);
  };

  // Heart counter click
  const handleHeartCounterClick = () => {
    playCuteChime(587.33);
    setHeartCount((prev) => prev + 1);
  };

  return (
    <section className="relative py-16 px-4 max-w-4xl mx-auto">
      {/* Chapter kicker */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-rose-500 mb-2">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="text-xs font-semibold tracking-wider uppercase font-['Outfit']">
            Chapter 03 · Playful Moments
          </span>
          <Sparkles className="w-4 h-4 animate-spin-slow" />
        </div>
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-5xl font-bold text-rose-950">
          LITTLE INTERACTIVE SURPRISES 🎀
        </h2>
        <p className="font-['Caveat'] text-2xl text-rose-600 font-bold mt-1">
          Every button is packed with tiny love surprises just for Ishika!
        </p>
      </div>

      {/* Grid of Surprises */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SURPRISE 1: Waving Teddy Bear */}
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-pink-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-['Outfit']">
              Interactive Teddy
            </span>
            <span className="text-xs text-rose-400 font-['Caveat'] text-base">Tap to wave 👋</span>
          </div>

          <div className="my-2 relative">
            <TeddyBear
              pose="waving"
              isWaving={isBearWaving}
              className="w-36 h-36 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              onClick={handleBearWave}
            />

            {bearMessage && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-rose-500 text-white font-['Caveat'] font-bold text-lg px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap animate-bounce z-20">
                {bearMessage}
              </div>
            )}
          </div>

          <button
            onClick={handleBearWave}
            className="mt-3 px-5 py-2 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Smile className="w-3.5 h-3.5 text-rose-500" />
            <span>Make Teddy Wave & Greet Ishika</span>
          </button>
        </div>

        {/* SURPRISE 2: "Send me a kiss 💋" Button */}
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-pink-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-['Outfit']">
              Kiss Delivery
            </span>
            <span className="text-xs text-rose-400 font-['Caveat'] text-base">Unlimited kisses!</span>
          </div>

          <div className="my-auto py-4 flex flex-col items-center">
            <div className="text-5xl animate-pulse-heart mb-2 select-none">💋</div>
            <p className="font-['Caveat'] text-2xl text-rose-800 font-bold max-w-xs">
              Every time you tap, Priyansh sends a sweet kiss right to your cheek!
            </p>
          </div>

          {/* Send me a kiss button */}
          <button
            onClick={handleSendKiss}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-md shadow-rose-300/50 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Send me a kiss 💋</span>
          </button>
        </div>

        {/* SURPRISE 3: Mini Heart Counter */}
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-pink-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-['Outfit']">
              Love Meter & Counter
            </span>
            <span className="text-xs text-rose-400 font-['Caveat'] text-base">Keep collecting!</span>
          </div>

          <div className="my-3 flex flex-col items-center">
            <div
              onClick={handleHeartCounterClick}
              className="w-20 h-20 rounded-full bg-rose-50 border-2 border-rose-300 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-90 transition-transform shadow-inner group"
              title="Click to add hearts"
            >
              <Heart className="w-10 h-10 fill-rose-500 text-rose-500 group-hover:animate-ping" />
            </div>

            <div className="mt-3">
              <span className="text-3xl font-extrabold text-rose-950 font-['Outfit'] tabular-nums">
                {heartCount}
              </span>
              <p className="font-['Caveat'] text-xl text-rose-600 font-bold">
                Hearts showered upon my Ishika 💕
              </p>
            </div>
          </div>

          <button
            onClick={handleHeartCounterClick}
            className="px-5 py-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Click to Send More Love (+1)</span>
          </button>
        </div>

        {/* SURPRISE 4: Cute "I love you" Button & Final Surprise Envelope */}
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-pink-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-['Outfit']">
              Secret Revelations
            </span>
            <span className="text-xs text-rose-400 font-['Caveat'] text-base">Touch to reveal</span>
          </div>

          <div className="my-auto py-2 flex flex-col items-center gap-3 w-full">
            {/* "I love you" button */}
            <button
              onClick={() => {
                playCuteChime(784);
                setShowLoveMessageModal(true);
              }}
              className="w-full px-5 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-bold text-sm transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-rose-500 group-hover:rotate-45 transition-transform" />
              <span>Tap &ldquo;I Love You&rdquo; for a surprise ✨</span>
            </button>

            {/* Final Surprise Envelope Button */}
            <button
              onClick={() => {
                playCuteChime(880);
                setShowEnvelopeModal(true);
              }}
              className="w-full px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-sm shadow-sm hover:shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Open Final Surprise Envelope 💌</span>
            </button>
          </div>

          {/* Hidden Feature to reveal a virtual love letter when clicked */}
          <div className="w-full pt-3 border-t border-rose-100 mt-2">
            <button
              onClick={() => {
                playCuteChime(987.77);
                setShowSecretLetter(true);
              }}
              className="text-xs text-rose-400 hover:text-rose-600 underline font-['Caveat'] text-base cursor-pointer flex items-center justify-center gap-1 mx-auto"
            >
              <Gift className="w-3.5 h-3.5 text-rose-400" />
              <span>Psst... click here for a secret love letter 🤫💌</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flying kisses particle overlay */}
      {kissParticles.map((k) => (
        <span
          key={k.id}
          className="fixed pointer-events-none select-none z-50 animate-float text-3xl"
          style={{
            left: `${k.x}px`,
            top: `${k.y}px`,
            filter: 'drop-shadow(0 2px 8px rgba(225, 29, 72, 0.4))',
          }}
        >
          💋
        </span>
      ))}

      {/* MODAL 1: "I love you" surprise message */}
      {showLoveMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-rose-300 relative text-center animate-float">
            <button
              onClick={() => setShowLoveMessageModal(false)}
              className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 fill-rose-500" />
            </div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-rose-950 mb-2">
              My Sweetest Confession 💗
            </h3>
            <p className="font-['Caveat'] text-2xl text-rose-800 font-bold leading-relaxed mb-6">
              &ldquo;Ishika, if I had a flower for every time you made me smile, I would walk in an endless garden forever.&rdquo;
            </p>
            <p className="text-xs text-rose-400 font-['Outfit'] mb-6">
              You are the best decision my heart has ever made.
            </p>
            <button
              onClick={() => setShowLoveMessageModal(false)}
              className="px-6 py-2.5 rounded-full bg-rose-500 text-white font-medium text-xs shadow-md hover:bg-rose-600 cursor-pointer"
            >
              I Love You Too Priyansh! ❤️
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: Final surprise envelope */}
      {showEnvelopeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-rose-300 relative animate-float">
            <button
              onClick={() => setShowEnvelopeModal(false)}
              className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-4">
              <WaxSeal text="Ishika 💌" className="w-14 h-14 mx-auto mb-2" />
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-rose-950">
                A Sweet Note From My Heart
              </h3>
            </div>
            <div className="lined-paper rounded-2xl p-5 border border-pink-200 shadow-inner mb-6">
              <p className="font-['Caveat'] text-2xl text-rose-900 font-bold leading-relaxed">
                Ishika, thank you for being the calm to my chaos, the smile behind my days, and the home my soul always searched for. I promise to cherish you, laugh with you, hold your hand through everything, and love you more and more each passing day. 🧿💕
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={() => setShowEnvelopeModal(false)}
                className="px-6 py-2.5 rounded-full bg-rose-500 text-white font-medium text-xs shadow-md hover:bg-rose-600 cursor-pointer"
              >
                Keep In My Heart Forever ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Hidden Virtual Love Letter Surprise */}
      {showSecretLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
          <div className="bg-[#FFFBF7] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-pink-300 relative paper-pattern">
            <button
              onClick={() => setShowSecretLetter(false)}
              className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4 border-b border-rose-200 pb-3">
              <span className="text-2xl">🧸</span>
              <div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-rose-950">
                  Virtual Love Letter · Priyansh to Ishika
                </h3>
                <p className="text-[11px] text-rose-400 font-['Outfit']">
                  You discovered the hidden heart secret 🗝️
                </p>
              </div>
            </div>
            <div className="lined-paper rounded-2xl p-5 border border-pink-200/90 shadow-inner mb-5">
              <p className="font-['Caveat'] text-2xl text-rose-900 font-bold leading-relaxed">
                My dear Ishika,
                <br /><br />
                Even when the world is noisy, in my head it&apos;s always just you and me. Thank you for choosing me, for understanding my quiet thoughts, and for making my world so gentle and bright. I am yours completely, today and every tomorrow.
                <br /><br />
                Mwaaah! 💋
              </p>
            </div>
            <div className="text-right">
              <p className="font-['Caveat'] text-2xl text-rose-600 font-bold">
                Forever your Priyansh ❤️
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
