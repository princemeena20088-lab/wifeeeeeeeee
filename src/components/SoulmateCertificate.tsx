import React, { useRef } from 'react';
import { Award, Download, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { WaxSeal } from './CuteIllustrations';
import confetti from 'canvas-confetti';

export const SoulmateCertificate: React.FC = () => {
  const certificateRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    // Generate high quality canvas rendering for crisp image download
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 840;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw luxury parchment background
    const gradient = ctx.createLinearGradient(0, 0, 1200, 840);
    gradient.addColorStop(0, '#FFFDF9');
    gradient.addColorStop(0.5, '#FFF5F8');
    gradient.addColorStop(1, '#FFF0F5');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 840);

    // Outer decorative border
    ctx.strokeStyle = '#F472B6';
    ctx.lineWidth = 10;
    ctx.strokeRect(30, 30, 1140, 780);

    // Inner gold border
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 3;
    ctx.strokeRect(45, 45, 1110, 750);

    // Decorative corner dots
    ctx.fillStyle = '#FB7185';
    [
      [55, 55],
      [1145, 55],
      [55, 785],
      [1145, 785],
    ].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Header Text
    ctx.fillStyle = '#E11D48';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ROYAL DECREE OF UNCONDITIONAL LOVE', 600, 110);

    ctx.fillStyle = '#831843';
    ctx.font = 'bold 50px serif';
    ctx.fillText('Official Lifetime Soulmate & Wife Certificate', 600, 180);

    ctx.fillStyle = '#9D174D';
    ctx.font = '22px sans-serif';
    ctx.fillText('This official keepsake solemnly honors and certifies that:', 600, 230);

    // Honoree Name: Ishika
    ctx.fillStyle = '#E11D48';
    ctx.font = 'bold italic 68px cursive, serif';
    ctx.fillText('Ishika Patil ❤️', 600, 320);

    // Decorative divider line
    ctx.strokeStyle = '#FDA4AF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 350);
    ctx.lineTo(850, 350);
    ctx.stroke();

    // Vow Text
    ctx.fillStyle = '#4C0519';
    ctx.font = '24px serif';
    ctx.fillText('is hereby and forever recognized as Priyansh\'s soulmate, best friend,', 600, 400);
    ctx.fillText('happiness, and the only girl of his heart and life.', 600, 440);

    ctx.font = 'italic 20px sans-serif';
    ctx.fillStyle = '#9F1239';
    ctx.fillText('"Forever u r my wife. Mene tujhe accept kar liya. Out of all the people in this world,', 600, 500);
    ctx.fillText('I would still choose you, Ishika. Every single time. 🧿"', 600, 535);

    // Stamp & Date Details
    ctx.fillStyle = '#BE185D';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('SEALED ON: 13 OCTOBER · 2:58 AM', 600, 600);
    ctx.fillText('STATUS: VALID IN EVERY UNIVERSE (NO EXPIRY)', 600, 630);

    // Signatures
    ctx.textAlign = 'left';
    ctx.fillStyle = '#9D174D';
    ctx.font = 'bold 24px cursive';
    ctx.fillText('Priyansh 💌', 250, 710);
    ctx.font = '16px sans-serif';
    ctx.fillText('Giver of Heart (Priyansh)', 250, 735);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#9D174D';
    ctx.font = 'bold 24px cursive';
    ctx.fillText('Ishika ❤️', 950, 710);
    ctx.font = '16px sans-serif';
    ctx.fillText('Recipient of Endless Love', 950, 735);

    // Convert canvas to downloadable image
    const link = document.createElement('a');
    link.download = 'Ishika_Priyansh_Soulmate_Certificate.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#F43F5E', '#FDA4AF', '#FDE047'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative py-16 px-4 max-w-4xl mx-auto">
      {/* Chapter kicker */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-rose-500 mb-2">
          <Award className="w-4 h-4 animate-spin-slow" />
          <span className="text-xs font-semibold tracking-wider uppercase font-['Outfit']">
            Chapter 08 · Official Keepsake
          </span>
          <Sparkles className="w-4 h-4 animate-spin-slow" />
        </div>
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-5xl font-bold text-rose-950">
          OFFICIAL WIFE & SOULMATE CERTIFICATE 📜👑
        </h2>
        <p className="font-['Caveat'] text-2xl text-rose-600 font-bold mt-1">
          A royal decree sealed with forever promises
        </p>
      </div>

      {/* The Certificate Frame */}
      <div
        ref={certificateRef}
        className="relative bg-gradient-to-br from-[#FFFDF9] via-[#FFF5F8] to-[#FFF0F5] rounded-3xl p-6 sm:p-12 border-4 border-rose-300 shadow-2xl relative overflow-hidden text-center"
      >
        {/* Inner Gold Filigree Border */}
        <div className="absolute inset-3 border-2 border-amber-300/60 rounded-2xl pointer-events-none" />

        {/* Decorative Corner Ornaments */}
        <div className="absolute top-6 left-6 text-xl text-amber-500 pointer-events-none">⚜️</div>
        <div className="absolute top-6 right-6 text-xl text-amber-500 pointer-events-none">⚜️</div>
        <div className="absolute bottom-6 left-6 text-xl text-amber-500 pointer-events-none">⚜️</div>
        <div className="absolute bottom-6 right-6 text-xl text-amber-500 pointer-events-none">⚜️</div>

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Header */}
          <div className="inline-flex items-center gap-2 text-rose-500 font-bold tracking-widest text-[11px] uppercase font-['Outfit'] mb-2">
            <span>Official Royal Decree of Love</span>
          </div>

          <h3 className="font-['Playfair_Display'] text-2xl sm:text-4xl font-extrabold text-rose-950 tracking-tight leading-tight mb-3">
            Lifetime Soulmate & Wife Certificate
          </h3>

          <p className="text-xs sm:text-sm text-rose-700 font-['Outfit'] mb-6">
            This solemn certificate declares to all of existence that:
          </p>

          {/* Honoree */}
          <div className="my-4 py-2">
            <span className="font-['Caveat'] text-4xl sm:text-6xl font-bold text-rose-600 tracking-wide drop-shadow-xs block">
              Ishika Patil ❤️
            </span>
            <div className="w-48 sm:w-64 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mt-2" />
          </div>

          {/* Declaration Statement */}
          <p className="font-['Playfair_Display'] text-base sm:text-lg text-rose-900 leading-relaxed max-w-lg mx-auto mb-4">
            is officially recognized as Priyansh&apos;s soulmate, best friend, infinite happiness, and forever wife in heart and soul.
          </p>

          <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 sm:p-5 my-6 max-w-md mx-auto">
            <p className="font-['Caveat'] text-xl sm:text-2xl text-rose-800 font-bold leading-snug">
              &ldquo;Forever u r my wife. Mene tujhe accept kar liya. Out of all the people in this world, I would still choose you, Ishika. Every single time. 🧿&rdquo;
            </p>
          </div>

          {/* Wax Seal & Dates */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-rose-200/60 mt-6">
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-semibold text-rose-400 font-['Outfit'] block">
                Conferred By
              </span>
              <span className="font-['Caveat'] text-2xl font-bold text-rose-800">
                Priyansh 💌
              </span>
            </div>

            {/* Center Wax Seal */}
            <div className="flex flex-col items-center">
              <WaxSeal text="Official 🧿" className="w-14 h-14" />
              <span className="text-[10px] font-bold text-rose-500 font-['Outfit'] mt-1">
                SEALED: 13 OCT · 2:58 AM
              </span>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-[10px] uppercase font-semibold text-rose-400 font-['Outfit'] block">
                Accepted With Love By
              </span>
              <span className="font-['Caveat'] text-2xl font-bold text-rose-800">
                Ishika 💕
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Action Button */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <button
          onClick={handleDownload}
          className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-bold text-sm rounded-full shadow-lg shadow-rose-300/60 hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Download Keepsake Certificate (High Res Image) 👑</span>
        </button>
        <span className="text-xs text-rose-400 font-['Caveat'] text-lg">
          Save it directly to your phone photos or post on your story! 📸✨
        </span>
      </div>
    </section>
  );
};
