import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Calendar, Clock, Activity } from 'lucide-react';

export const LoveCounter: React.FC = () => {
  // Start date: September 15, 2026 (or 2025/2026 depending on the story year; let's set to Sept 15 of the current year or earlier)
  // Let's calculate from September 15th
  const [timeTogether, setTimeTogether] = useState({
    days: 47,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  useEffect(() => {
    // 15 September (First DM)
    // If today is Nov 1, 2026, Sept 15, 2026 is 47 days ago
    const startDate = new Date('2026-09-15T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      let diff = Math.max(0, now.getTime() - startDate.getTime());

      // If system date is in the past or different, ensure positive sensible values
      if (diff <= 0) {
        diff = (47 * 24 * 3600 + 14 * 3600 + 22 * 60 + 10) * 1000;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeTogether({
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Approximate heartbeats since first DM (~75 bpm)
  const estimatedHeartbeats = Math.floor(timeTogether.totalSeconds * 1.25);

  return (
    <section className="relative py-12 px-4 max-w-4xl mx-auto">
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border-2 border-pink-200/90 shadow-xl relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-rose-100/50 via-pink-50/20 to-transparent rounded-full pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 text-rose-500 mb-2">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span className="text-xs font-semibold tracking-wider uppercase font-['Outfit']">
              Every Second Counts · Since 15 September
            </span>
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-4xl font-bold text-rose-950">
            DAYS WE&apos;VE BEEN IN LOVE ⏳💕
          </h2>
          <p className="font-['Caveat'] text-2xl text-rose-600 font-bold mt-1">
            47+ days of laughs, butterflies & forever promises... and counting!
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
          {/* Days */}
          <div className="bg-[#FFF5F8] rounded-2xl p-4 sm:p-5 text-center border border-pink-200/80 shadow-xs flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-5xl font-extrabold text-rose-600 font-['Outfit'] tabular-nums">
              {timeTogether.days}
            </span>
            <span className="text-xs uppercase font-semibold text-rose-400 mt-1 tracking-wider font-['Outfit']">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="bg-[#FFF5F8] rounded-2xl p-4 sm:p-5 text-center border border-pink-200/80 shadow-xs flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-5xl font-extrabold text-rose-600 font-['Outfit'] tabular-nums">
              {timeTogether.hours < 10 ? `0${timeTogether.hours}` : timeTogether.hours}
            </span>
            <span className="text-xs uppercase font-semibold text-rose-400 mt-1 tracking-wider font-['Outfit']">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-[#FFF5F8] rounded-2xl p-4 sm:p-5 text-center border border-pink-200/80 shadow-xs flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-5xl font-extrabold text-rose-600 font-['Outfit'] tabular-nums">
              {timeTogether.minutes < 10 ? `0${timeTogether.minutes}` : timeTogether.minutes}
            </span>
            <span className="text-xs uppercase font-semibold text-rose-400 mt-1 tracking-wider font-['Outfit']">
              Minutes
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-[#FFF5F8] rounded-2xl p-4 sm:p-5 text-center border border-pink-200/80 shadow-xs flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-5xl font-extrabold text-rose-600 font-['Outfit'] tabular-nums animate-pulse">
              {timeTogether.seconds < 10 ? `0${timeTogether.seconds}` : timeTogether.seconds}
            </span>
            <span className="text-xs uppercase font-semibold text-rose-400 mt-1 tracking-wider font-['Outfit']">
              Seconds
            </span>
          </div>
        </div>

        {/* Heartbeats Card & Milestones */}
        <div className="mt-6 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 animate-pulse-heart">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-rose-400 font-semibold font-['Outfit']">
                My Heart Has Beaten For You
              </p>
              <p className="font-['Outfit'] text-lg font-bold text-rose-950 tabular-nums">
                ~{estimatedHeartbeats.toLocaleString()} times & counting
              </p>
            </div>
          </div>

          <div className="bg-rose-50 px-4 py-2 rounded-full border border-rose-200/60 flex items-center gap-2 text-xs font-medium text-rose-700">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Forever Love Progress: <span className="font-bold text-rose-600">∞% Infinite</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};
