import React, { useState } from 'react';
import { WashiTapeStrip } from './CuteIllustrations';
import {
  Sparkles,
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
  Film,
  Camera,
  Upload,
  Plus,
} from 'lucide-react';

interface PhotoItem {
  id: number;
  src: string;
  caption: string;
  date: string;
  rotation: string;
  tag: string;
}

export const PolaroidGallery: React.FC = () => {
  const base = import.meta.env.BASE_URL;
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

  const defaultPhotos: PhotoItem[] = [
    {
      id: 1,
      src: `${base}assets/aistudio/photo_1_2026-11-01_12-55-37_10b80228.jpg`,
      caption: '28 October · Our 1st cheek kiss with sweet lipstick marks 💋',
      date: '28 October Memory',
      rotation: '-rotate-2',
      tag: '1st Cheek Kiss 💋',
    },
    {
      id: 2,
      src: `${base}assets/aistudio/photo_2_2026-11-01_12-55-37_503189e2.jpg`,
      caption: 'The brightest, most precious smile that captured my heart ☀️💕',
      date: '12 October Meetup',
      rotation: 'rotate-2',
      tag: 'Image Best Smile ✨',
    },
    {
      id: 3,
      src: `${base}assets/aistudio/photo_3_2026-11-01_12-55-37_fce7fb99.jpg`,
      caption: 'Me with our cute little cat friend 🐱',
      date: 'Cute Cat Date',
      rotation: '-rotate-1',
      tag: 'Cat Lover Priyansh 🐱',
    },
    {
      id: 4,
      src: `${base}assets/aistudio/photo_4_2026-11-01_12-55-37_fefff6a9.jpg`,
      caption: 'Bas tu hi chahiye mera pyara sa baccha ❤️',
      date: 'Forever Together',
      rotation: 'rotate-3',
      tag: 'Image My World 🧿',
    },
  ];

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const stored = localStorage.getItem('ishika_custom_photos');
      if (stored) {
        const parsed = JSON.parse(stored);
        return [...defaultPhotos, ...parsed];
      }
    } catch {
      // fallback
    }
    return defaultPhotos;
  });

  const uploadInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        if (url) {
          const item: PhotoItem = {
            id: Date.now() + index,
            src: url,
            caption: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ') || '12 Oct Memory 💕',
            date: '12 October Memory',
            rotation: index % 2 === 0 ? '-rotate-2' : 'rotate-2',
            tag: '12 Oct Meetup 📸',
          };
          setPhotos((prev) => {
            const updated = [...prev, item];
            try {
              const customOnly = updated.filter((p) => typeof p.id === 'number' && p.id > 10);
              localStorage.setItem('ishika_custom_photos', JSON.stringify(customOnly));
            } catch {
              // ignore
            }
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsVideoMuted(videoRef.current.muted);
  };

  return (
    <section className="relative py-16 px-4 max-w-5xl mx-auto">
      {/* Chapter kicker */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-rose-500 mb-2">
          <Camera className="w-4 h-4 animate-spin-slow" />
          <span className="text-xs font-semibold tracking-wider uppercase font-['Outfit']">
            Chapter 05 · Captured Memories
          </span>
          <Sparkles className="w-4 h-4 animate-spin-slow" />
        </div>
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-5xl font-bold text-rose-950">
          OUR POLAROID SCRAPBOOK GALLERY 📸❤️
        </h2>
        <p className="font-['Caveat'] text-2xl text-rose-600 font-bold mt-1">
          Real moments, real smiles, real forever love...
        </p>
      </div>

      {/* Main Layout: Video Reel on Left/Center + Polaroid Photo Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* VIDEO REEL SPOTLIGHT CARD (5 Cols on Desktop) */}
        <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl p-5 sm:p-6 border-2 border-pink-200/90 shadow-xl relative overflow-hidden flex flex-col items-center">
          {/* Top Washi Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
            <WashiTapeStrip pattern="dots" className="w-28 h-6" />
          </div>

          <div className="w-full flex items-center justify-between mb-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 font-['Outfit']">
              <Film className="w-3.5 h-3.5" />
              <span>OUR SPECIAL REEL 🎥</span>
            </div>
            <span className="text-[11px] text-rose-400 font-['Caveat'] text-sm">
              &ldquo;I love you in every universe&rdquo;
            </span>
          </div>

          {/* Video Container (Vertical Reel aspect ratio) */}
          <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/16] rounded-2xl overflow-hidden shadow-md bg-stone-900 border-2 border-rose-200 group">
            <video
              ref={videoRef}
              src={`${base}assets/aistudio/video_2026-11-01_12-55-37_ece40f93.mp4`}
              playsInline
              loop
              className="w-full h-full object-cover"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            />

            {/* Video overlay controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-between p-4 pointer-events-none">
              {/* Top tag */}
              <div className="flex items-center justify-between">
                <span className="bg-black/40 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-full border border-white/20">
                  @ishika.patil_11 💕
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVideoMute();
                  }}
                  className="pointer-events-auto w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
                  title={isVideoMuted ? 'Unmute' : 'Mute'}
                >
                  {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Bottom Play/Pause & Title */}
              <div className="flex items-center justify-between pointer-events-auto">
                <div>
                  <p className="text-white text-xs font-semibold font-['Outfit'] drop-shadow">
                    Priyansh & Ishika Reel
                  </p>
                  <p className="text-pink-200 text-[10px] font-['Caveat'] text-sm drop-shadow">
                    A thousand years & a thousand more 🧿
                  </p>
                </div>
                <button
                  onClick={toggleVideo}
                  className="w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  {isVideoPlaying ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-rose-500 font-['Caveat'] text-lg text-center mt-4">
            Tap play to watch our love reel together 🍿✨
          </p>
        </div>

        {/* POLAROID PHOTOS GRID (7 Cols on Desktop) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Top upload action bar for adding more 12 Oct photos */}
          <div className="flex items-center justify-between bg-rose-50/70 border border-rose-200/80 rounded-2xl px-4 py-2.5">
            <span className="text-xs font-semibold text-rose-700 font-['Outfit']">
              Have more 12 Oct or scrapbook memories?
            </span>
            <button
              onClick={() => uploadInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add 12 Oct Photos</span>
            </button>
            <input
              ref={uploadInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleUploadPhoto}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`bg-white rounded-2xl p-3 pb-5 shadow-lg border border-pink-200/80 hover:shadow-2xl transition-all duration-300 transform hover:scale-103 hover:rotate-0 cursor-pointer group ${photo.rotation}`}
            >
              {/* Little washi tape on top of polaroid */}
              <div className="w-16 h-4 bg-rose-200/60 rounded-xs mx-auto -mt-4 mb-2 shadow-xs border-dashed border-rose-300 pointer-events-none" />

              {/* Photo Frame */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-rose-50 border border-rose-100">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Tag badge */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {photo.tag}
                </div>

                {/* Hover zoom affordance */}
                <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Handwritten Caption */}
              <div className="mt-3 px-1 text-center">
                <p className="font-['Caveat'] text-xl font-bold text-rose-900 leading-tight">
                  {photo.caption}
                </p>
                <span className="text-[10px] uppercase font-semibold text-rose-400 font-['Outfit'] tracking-wider">
                  {photo.date}
                </span>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-float"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-2 border-rose-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 p-1.5 rounded-full bg-rose-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden border border-rose-200 mb-4 max-h-[65vh] flex items-center justify-center bg-black/5">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="w-full h-full object-contain max-h-[65vh]"
              />
            </div>

            <div className="text-center">
              <span className="inline-block bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                {selectedPhoto.tag}
              </span>
              <p className="font-['Caveat'] text-2xl font-bold text-rose-900">
                {selectedPhoto.caption}
              </p>
              <p className="text-xs text-rose-400 font-['Outfit'] mt-1">
                Priyansh & Ishika · A memory sealed forever in our hearts ❤️
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
