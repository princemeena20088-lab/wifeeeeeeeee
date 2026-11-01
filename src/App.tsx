import React, { useState } from 'react';
import { Header } from './components/Header';
import { BackgroundEffects } from './components/BackgroundEffects';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { LoveCounter } from './components/LoveCounter';
import { TimelineSection } from './components/TimelineSection';
import { PolaroidGallery } from './components/PolaroidGallery';
import { MessageLetterSection } from './components/MessageLetterSection';
import { LoveCoupons } from './components/LoveCoupons';
import { CatchKissesGame } from './components/CatchKissesGame';
import { SoulmateCertificate } from './components/SoulmateCertificate';
import { InteractiveSurprises } from './components/InteractiveSurprises';
import { AudioPlayerSection } from './components/AudioPlayerSection';
import { FinalNightSky } from './components/FinalNightSky';
import { Heart } from 'lucide-react';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlayingSong, setIsPlayingSong] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#4A3B43] flex flex-col font-['Outfit'] selection:bg-rose-200 selection:text-rose-900 relative">
      {/* Global Interactive Cursor & Background Floating Hearts */}
      <BackgroundEffects />

      {/* Top Bar Header */}
      <Header
        isPlaying={isPlayingSong}
        onSendLove={() => {
          // Trigger love reaction
        }}
      />

      <main className="flex-1 flex flex-col">
        {/* Opening Envelope Experience */}
        <OpeningEnvelope
          isOpen={isEnvelopeOpen}
          setIsOpen={setIsEnvelopeOpen}
        />

        {/* SECTION 4: Our Special Song (Custom Vinyl Player with Autoplay) */}
        <div id="song-section">
          <AudioPlayerSection
            isPlaying={isPlayingSong}
            setIsPlaying={setIsPlayingSong}
          />
        </div>

        {/* NEW 2: Live Days We've Been In Love Counter */}
        <div id="counter">
          <LoveCounter />
        </div>

        {/* SECTION 1: Our Most Highlighted Dates Timeline */}
        <div id="timeline">
          <TimelineSection />
        </div>

        {/* NEW 3: Our Real Polaroid Scrapbook Gallery & Video Reel */}
        <div id="gallery">
          <PolaroidGallery />
        </div>

        {/* SECTION 2: A Message For My Baby (Letter style with Teddy) */}
        <div id="letter">
          <MessageLetterSection />
        </div>

        {/* NEW 4: Priyansh's Redeemable Love Coupons */}
        <div id="coupons">
          <LoveCoupons />
        </div>

        {/* NEW 5: Catch Priyansh's Kisses 15-Second Mini Game */}
        <div id="game">
          <CatchKissesGame />
        </div>

        {/* NEW 7: Official Lifetime Wife & Soulmate Certificate */}
        <div id="certificate">
          <SoulmateCertificate />
        </div>

        {/* SECTION 3: Little Interactive Surprises */}
        <div id="surprises">
          <InteractiveSurprises />
        </div>

        {/* FINAL SCREEN: Animated Night Sky & Two Teddy Bears */}
        <div id="forever">
          <FinalNightSky />
        </div>
      </main>

      {/* Romantic Scrapbook Footer */}
      <footer className="bg-[#13091B] text-pink-200/80 py-10 px-4 border-t border-pink-900/40 text-center relative z-20">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-rose-400">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span className="font-['Caveat'] text-2xl font-bold text-pink-200">
              Made with infinite love for Ishika Patil
            </span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          </div>
          <p className="text-xs text-pink-300/60 font-['Outfit']">
            Protected by forever promises 🧿 · 15 Sep &bull; 12 Oct &bull; 13 Oct (2:58 AM) &bull; 28 Oct
          </p>
          <p className="text-[11px] text-pink-400/50 mt-1 font-['Caveat'] text-base">
            Every moment with you is my favourite memory. Forever yours, Priyansh.
          </p>
        </div>
      </footer>
    </div>
  );
}
