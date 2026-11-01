import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Music2,
  Heart,
  Sparkles,
  Disc3,
  RotateCcw,
} from 'lucide-react';
import { ButterflySvg } from './CuteIllustrations';

interface AudioPlayerSectionProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const AudioPlayerSection: React.FC<AudioPlayerSectionProps> = ({
  isPlaying,
  setIsPlaying,
}) => {
  const defaultAudioSrc = '/assets/aistudio/Aankhon_Se_Batana___Dikshant_Viral_Song_Official_Video__1__8b21c8ae.mp3';
  const [audioSrc, setAudioSrc] = useState<string>(defaultAudioSrc);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showFirstPlayNote, setShowFirstPlayNote] = useState<boolean>(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState<boolean>(false);
  const [customFileName, setCustomFileName] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Autoplay handler: Attempt immediate play on mount, or upon first user interaction
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            if (!hasPlayedOnce) {
              setHasPlayedOnce(true);
              setShowFirstPlayNote(true);
            }
          })
          .catch(() => {
            // Browser blocked unprompted autoplay. Wait for first touch/click
            const startOnInteraction = () => {
              if (audioRef.current) {
                audioRef.current.play().then(() => {
                  setIsPlaying(true);
                  if (!hasPlayedOnce) {
                    setHasPlayedOnce(true);
                    setShowFirstPlayNote(true);
                  }
                }).catch(() => {});
              }
              window.removeEventListener('click', startOnInteraction);
              window.removeEventListener('touchstart', startOnInteraction);
            };

            window.addEventListener('click', startOnInteraction, { once: true });
            window.addEventListener('touchstart', startOnInteraction, { once: true });
          });
      }
    };

    playAudio();
  }, [setIsPlaying]);

  // Synchronize audio element state with isPlaying prop
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn('Audio play prevented:', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (!hasPlayedOnce && !isPlaying) {
      setHasPlayedOnce(true);
      setShowFirstPlayNote(true);
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioSrc(url);
      setCustomFileName(file.name);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="song-section" className="relative py-16 px-4 scroll-mt-12 overflow-hidden">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Dreamy glow when playing */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isPlaying ? 'opacity-100' : 'opacity-20'
        }`}
      >
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl" />
      </div>

      {/* Floating music notes and tiny hearts when playing */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-2xl top-12 left-12 animate-float text-pink-400">🎶</span>
          <span className="absolute text-xl top-24 right-16 animate-float-delayed text-rose-400">🎵</span>
          <span className="absolute text-2xl bottom-16 left-20 animate-float text-pink-500">💕</span>
          <span className="absolute text-xl bottom-12 right-24 animate-float-delayed text-rose-300">🌸</span>
          <div className="absolute top-1/3 left-6 animate-float">
            <ButterflySvg className="w-8 h-8" color="#F472B6" />
          </div>
          <div className="absolute top-2/3 right-8 animate-float-delayed">
            <ButterflySvg className="w-7 h-7" color="#E11D48" />
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Cute message above player (Preserved exact text) */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-rose-500 mb-2">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span className="text-xs font-semibold tracking-wider uppercase font-['Outfit']">
              Chapter 04 · Our Special Song
            </span>
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <p className="font-['Caveat'] text-2xl sm:text-3xl text-rose-600 font-bold max-w-lg mx-auto">
            &ldquo;Some feelings don&apos;t need words... just listen with your heart. 🥹💗&rdquo;
          </p>
        </div>

        {/* First play secret reveal message modal / card */}
        {showFirstPlayNote && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-rose-100/95 via-pink-100/90 to-purple-100/95 border border-rose-300 shadow-md text-center animate-float relative">
            <button
              onClick={() => setShowFirstPlayNote(false)}
              className="absolute top-2 right-3 text-rose-400 hover:text-rose-600 text-sm font-bold cursor-pointer"
              title="Close note"
            >
              ✕
            </button>
            <p className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1 font-['Outfit']">
              A whisper for Ishika 💌
            </p>
            <p className="font-['Caveat'] text-xl sm:text-2xl text-rose-800 font-bold leading-snug">
              &ldquo;Ye song bhi hamari memories ka ek chhota sa part hai. Bas aankhon se samajh jana... ❤️🫶🏻&rdquo;
            </p>
          </div>
        )}

        {/* The Music Player Scrapbook Card */}
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-pink-200/90 relative overflow-hidden">
          {/* Scrapbook Tape details on corners */}
          <div className="absolute -top-3 left-8 w-24 h-6 washi-tape rotate-[-2deg] rounded-sm pointer-events-none" />
          <div className="absolute -top-3 right-8 w-24 h-6 washi-tape rotate-[3deg] rounded-sm pointer-events-none" />

          {/* Vinyl & Turntable Art Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
            {/* Spinning Vinyl Record */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
              {/* Turntable needle */}
              <div
                className={`absolute top-0 right-4 w-12 h-20 origin-top-right transition-transform duration-700 z-20 pointer-events-none ${
                  isPlaying ? 'rotate-12 translate-x-1' : '-rotate-12 translate-x-4'
                }`}
              >
                <div className="w-1.5 h-16 bg-slate-400 rounded-full mx-auto shadow-sm" />
                <div className="w-4 h-5 bg-rose-400 rounded-sm shadow-md mx-auto -mt-1" />
              </div>

              {/* The Disc */}
              <div
                className={`w-full h-full rounded-full bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-900 p-2 shadow-2xl border-4 border-stone-700 flex items-center justify-center transition-transform ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
                style={{
                  boxShadow: isPlaying
                    ? '0 0 25px rgba(244, 63, 94, 0.4), inset 0 0 10px rgba(0,0,0,0.8)'
                    : '0 8px 20px rgba(0,0,0,0.15)',
                }}
              >
                {/* Grooves */}
                <div className="w-full h-full rounded-full border border-stone-700/60 p-2 flex items-center justify-center">
                  <div className="w-full h-full rounded-full border border-stone-700/80 p-2 flex items-center justify-center">
                    <div className="w-full h-full rounded-full border border-stone-700/60 p-2 flex items-center justify-center">
                      {/* Album Center Sticker */}
                      <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-purple-400 flex flex-col items-center justify-center text-center p-2 shadow-inner border-2 border-white/60">
                        <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
                        <span className="text-[9px] sm:text-[10px] font-bold text-white tracking-wide font-['Outfit'] mt-0.5">
                          PRIYANSH & ISHIKA
                        </span>
                        <span className="text-[8px] text-rose-100 font-['Caveat']">Forever 🧿</span>
                        <div className="w-3 h-3 rounded-full bg-stone-900 border border-white/40 mt-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Song Meta & Interactive Visualizer */}
            <div className="flex-1 text-center sm:text-left flex flex-col items-center sm:items-start w-full">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-['Outfit'] flex items-center gap-1.5">
                <Music2 className="w-3.5 h-3.5 text-rose-500" />
                Priyansh&apos;s Dedicated Song
              </span>

              {/* Exact Song Title */}
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-rose-950 mt-1 mb-1">
                Aankhon Se Batana – Hum Samajh Jaenge ❤️
              </h3>

              <p className="text-sm text-rose-700/70 font-['Caveat'] text-lg mb-4">
                Dikshant · Sung with love, dedicated to my soulmate Ishika
              </p>

              {/* Glowing Audio Visualizer Bars */}
              <div className="flex items-end gap-1.5 h-10 px-3 py-1 bg-rose-50/80 rounded-xl border border-rose-100 mb-4 w-full sm:w-auto justify-center sm:justify-start">
                {[45, 75, 30, 95, 60, 85, 40, 100, 70, 50, 90, 65, 80, 45].map((height, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-rose-500 to-pink-300 rounded-full transition-all duration-300"
                    style={{
                      height: isPlaying ? `${Math.max(15, (height * (currentTime % 2 === 0 ? 0.9 : 1.2)) % 100)}%` : '20%',
                      opacity: isPlaying ? 0.9 : 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Play / Pause Primary CTA */}
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-300/60 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
                  aria-label={isPlaying ? 'Pause song' : 'Play song'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white text-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white text-white ml-1" />
                  )}
                </button>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-rose-800">
                    {isPlaying ? 'Playing our song 💕' : 'Click to Play for Ishika'}
                  </span>
                  <span className="text-[11px] text-rose-400 font-['Outfit']">
                    {customFileName ? `Custom track: ${customFileName}` : 'High Quality Audio'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar & Timing */}
          <div className="mt-6 pt-4 border-t border-rose-100">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-rose-500 w-10 text-right">
                {formatTime(currentTime)}
              </span>

              <div className="relative flex-1 group py-2">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <span className="text-xs font-mono text-rose-400 w-10">
                {formatTime(duration)}
              </span>
            </div>

            {/* Bottom Controls: Volume & Upload Option */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-2 text-xs text-rose-600">
              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
              </div>

              {/* Reset to Original Song / Upload your own MP3 */}
              <div className="flex items-center gap-3">
                {customFileName && (
                  <button
                    onClick={() => {
                      setAudioSrc(defaultAudioSrc);
                      setCustomFileName(null);
                    }}
                    className="flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-700 underline cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset to original song
                  </button>
                )}

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-medium transition-colors cursor-pointer"
                  title="Upload your own song file"
                >
                  <Upload className="w-3.5 h-3.5 text-rose-500" />
                  <span>Replace / Upload MP3</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/mp3,audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
