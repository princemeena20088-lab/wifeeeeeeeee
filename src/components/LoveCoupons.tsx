import React, { useState, useEffect } from 'react';
import { Ticket, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Coupon {
  id: string;
  title: string;
  description: string;
  icon: string;
  code: string;
  validity: string;
}

export const LoveCoupons: React.FC = () => {
  const coupons: Coupon[] = [
    {
      id: 'coupon-1',
      title: '100 Tight Bear Hugs',
      description: 'Whenever you feel low or cold, redeem this for a non-stop tight cuddle from Priyansh.',
      icon: '🧸',
      code: 'HUGS-100-FOREVER',
      validity: 'Valid Forever',
    },
    {
      id: 'coupon-2',
      title: 'Late Night Ice Cream & Gossip',
      description: 'Priyansh will get you your favourite ice cream and listen to all your sweet talks.',
      icon: '🍨',
      code: 'ICE-CREAM-SWEET',
      validity: 'No Expiry',
    },
    {
      id: 'coupon-3',
      title: '1 Hour of Complaining-Free Listening',
      description: 'You speak, vent, or laugh — Priyansh will listen patiently without a single argument.',
      icon: '👂✨',
      code: 'PATIENT-PRIYANSH',
      validity: 'Whenever Ishu Needs',
    },
    {
      id: 'coupon-4',
      title: 'Instant Forehead & Cheek Kiss Pass',
      description: 'Redeemable on demand for unlimited soft kisses on your forehead and cute cheeks.',
      icon: '💋',
      code: 'KISS-PASS-MWAH',
      validity: 'Unlimited Use',
    },
    {
      id: 'coupon-5',
      title: 'Win Any Argument Card',
      description: 'Show this card during any dispute and Priyansh immediately surrenders: "Ishika is always right!"',
      icon: '👑',
      code: 'ISHU-ALWAYS-RIGHT',
      validity: 'One-Time Secret Pass',
    },
    {
      id: 'coupon-6',
      title: 'Midnight Blanket & Movie Marathon',
      description: 'Wrapped in one cozy blanket, holding hands and watching whatever movie Ishika chooses.',
      icon: '🍿',
      code: 'CUDDLE-CINEMA',
      validity: 'Valid Anytime',
    },
  ];

  const [redeemedMap, setRedeemedMap] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('ishika_redeemed_coupons');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const handleRedeem = (couponId: string, e: React.MouseEvent) => {
    if (redeemedMap[couponId]) return;

    const newMap = { ...redeemedMap, [couponId]: true };
    setRedeemedMap(newMap);
    try {
      localStorage.setItem('ishika_redeemed_coupons', JSON.stringify(newMap));
    } catch {
      // ignore
    }

    // Confetti celebration
    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#FB7185', '#F43F5E', '#FDA4AF', '#EC4899', '#FDE047'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative py-16 px-4 max-w-5xl mx-auto">
      {/* Chapter kicker */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-rose-500 mb-2">
          <Ticket className="w-4 h-4 animate-spin-slow" />
          <span className="text-xs font-semibold tracking-wider uppercase font-['Outfit']">
            Chapter 06 · Love Currency
          </span>
          <Sparkles className="w-4 h-4 animate-spin-slow" />
        </div>
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-5xl font-bold text-rose-950">
          PRIYANSH&apos;S COUPONS FOR ISHIKA 🎟️💕
        </h2>
        <p className="font-['Caveat'] text-2xl text-rose-600 font-bold mt-1">
          Handcrafted love vouchers · Tap to redeem anytime!
        </p>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => {
          const isRedeemed = !!redeemedMap[coupon.id];
          return (
            <div
              key={coupon.id}
              className={`relative bg-[#FFFDF9] rounded-3xl p-6 border-2 transition-all duration-300 shadow-md flex flex-col justify-between overflow-hidden group ${
                isRedeemed
                  ? 'border-emerald-300/80 bg-emerald-50/20'
                  : 'border-pink-200/90 hover:border-pink-300 hover:shadow-xl'
              }`}
            >
              {/* Perforated ticket notch circles */}
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFF5F7] border border-pink-200" />
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFF5F7] border border-pink-200" />

              {/* Perforated dashed divider line */}
              <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 border-t-2 border-dashed border-pink-200/50 pointer-events-none" />

              {/* Top part of coupon */}
              <div className="pb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl select-none">{coupon.icon}</span>
                  <span className="text-[10px] font-mono tracking-widest text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                    {coupon.code}
                  </span>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-rose-950 leading-snug mb-1">
                  {coupon.title}
                </h3>
                <p className="text-xs text-rose-700/80 font-['Outfit'] leading-relaxed">
                  {coupon.description}
                </p>
              </div>

              {/* Bottom part of coupon */}
              <div className="pt-8 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-rose-400 font-['Outfit'] block">
                    Validity
                  </span>
                  <span className="font-['Caveat'] text-lg font-bold text-rose-600">
                    {coupon.validity}
                  </span>
                </div>

                {/* Redeem button or stamped state */}
                {isRedeemed ? (
                  <div className="rotate-[-6deg] bg-rose-600 text-white font-['Caveat'] text-lg font-bold px-3 py-1 rounded-lg shadow-sm border border-rose-300 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-pink-200" />
                    <span>Redeemed ❤️</span>
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleRedeem(coupon.id, e)}
                    className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-xs rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Redeem 🎟️</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
