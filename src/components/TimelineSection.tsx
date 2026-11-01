import React, { useState } from 'react';
import {
  MessageCircleHeart,
  Heart,
  Sparkles,
  Clock,
  Calendar,
  Send,
  Eye,
} from 'lucide-react';
import {
  TwoTeddyBears,
  ButterflySvg,
  WashiTapeStrip,
} from './CuteIllustrations';
import confetti from 'canvas-confetti';

interface MemoryCardProps {
  date: string;
  title: string;
  subtitle: string;
  message: string[];
  illustration: React.ReactNode;
  tapeColor?: 'pink' | 'dots' | 'stripes';
  specialGlow?: boolean;
  timeTag?: string;
  memoryIndex: number;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  date,
  title,
  subtitle,
  message,
  illustration,
  tapeColor = 'dots',
  specialGlow = false,
  timeTag,
  memoryIndex,
}) => {
  const [likes, setLikes] = useState<number>(0);
  const [isBlushing, setIsBlushing] = useState<boolean>(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => prev + 1);
    setIsBlushing(true);
    setTimeout(() => setIsBlushing(false), 800);

    // Mini confetti burst near click
    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      confetti({
        particleCount: 20,
        spread: 45,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#FB7185', '#F43F5E', '#FDA4AF', '#E11D48'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative pl-6 sm:pl-10 pb-16 last:pb-4 group">
      {/* Vertical Timeline line */}
      <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 via-pink-200 to-rose-200" />

      {/* Timeline Node Badge with cute heart */}
      <div
        className={`absolute left-0 sm:left-2 top-3 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125 z-10 shadow-sm ${
          specialGlow
            ? 'bg-rose-500 text-white ring-4 ring-rose-200 animate-pulse-heart'
            : 'bg-white border-2 border-rose-400 text-rose-500'
        }`}
      >
        <Heart className="w-3.5 h-3.5 fill-current" />
      </div>

      {/* Main Memory Scrapbook Card */}
      <div
        className={`relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border transition-all duration-300 shadow-md hover:shadow-xl ${
          specialGlow
            ? 'border-rose-400 ring-2 ring-rose-300/40 shadow-rose-200/50 bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F8] to-[#FFFDF9]'
            : 'border-pink-200/90 hover:border-pink-300'
        }`}
      >
        {/* Top Washi Tape */}
        <div className="absolute -top-3 left-8 pointer-events-none">
          <WashiTapeStrip pattern={tapeColor} className="w-24 h-6" />
        </div>

        {/* Header with Date, Time, and Title */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pt-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wider font-['Outfit']">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
            {timeTag && (
              <>
                <span className="text-rose-300">·</span>
                <span className="inline-flex items-center gap-1 text-rose-600 bg-rose-100/90 px-2 py-0.5 rounded-full font-bold">
                  <Clock className="w-3 h-3" />
                  Time: {timeTag}
                </span>
              </>
            )}
          </div>

          {/* Interactive Heart Reaction button */}
          <button
            onClick={handleHeartClick}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              likes > 0
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200'
            } ${isBlushing ? 'scale-110' : ''}`}
            title="Tap to send love to this memory"
          >
            <Heart className={`w-3.5 h-3.5 ${likes > 0 ? 'fill-white' : 'fill-rose-400 text-rose-400'}`} />
            <span>{likes === 0 ? 'Relive with love' : `${likes} Love Sent`}</span>
          </button>
        </div>

        <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-rose-950 mb-1 flex items-center gap-2">
          <span>{title}</span>
          <span className="font-['Caveat'] text-rose-500 text-xl font-normal">
            {subtitle}
          </span>
        </h3>

        {/* Illustration Container */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-b from-rose-50/60 to-pink-50/40 border border-rose-100/80 flex items-center justify-center relative overflow-hidden">
          {specialGlow && (
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200/30 via-pink-200/40 to-rose-200/30 animate-pulse pointer-events-none" />
          )}
          {illustration}
        </div>

        {/* Original Message Letter in Handwritten Style */}
        <div className="lined-paper rounded-2xl p-5 sm:p-6 border border-pink-200/80 shadow-inner">
          <div className="font-['Caveat'] text-xl sm:text-2xl text-[#3D2630] font-semibold tracking-wide space-y-4">
            {message.map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Footer stamp */}
        <div className="mt-4 flex items-center justify-between text-xs text-rose-400 font-['Outfit']">
          <span className="font-['Caveat'] text-base text-rose-500 font-bold">
            Memory #{memoryIndex} of infinity
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-400" />
            Locked in our hearts forever
          </span>
        </div>
      </div>
    </div>
  );
};

export const TimelineSection: React.FC = () => {
  return (
    <section className="relative py-16 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 text-rose-500 mb-2">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="text-xs font-semibold tracking-wider uppercase font-['Outfit']">
            Chapter 01 · Handpicked Milestones
          </span>
          <Sparkles className="w-4 h-4 animate-spin-slow" />
        </div>
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-5xl font-bold text-rose-950 tracking-tight">
          OUR MOST HIGHLIGHTED DATES ❤️
        </h2>
        <p className="font-['Caveat'] text-2xl text-rose-600 font-bold mt-2">
          From a simple DM to our forever promise...
        </p>
      </div>

      {/* Timeline items */}
      <div className="relative">
        {/* Memory 1: 15 September — Our First DM 💌 */}
        <MemoryCard
          memoryIndex={1}
          date="15 September"
          title="15 September"
          subtitle="— Our First DM 💌"
          tapeColor="dots"
          illustration={
            <div className="flex flex-col items-center justify-center py-4 w-full">
              {/* Cute Chat Bubble Illustration */}
              <div className="relative max-w-md w-full flex flex-col gap-3">
                <div className="self-end bg-rose-500 text-white rounded-2xl rounded-tr-xs px-4 py-3 shadow-md max-w-[85%] font-['Caveat'] text-xl font-bold flex items-center gap-2">
                  <span>Hey Ishika... ❤️</span>
                  <Send className="w-4 h-4 text-rose-200" />
                </div>
                <div className="self-start bg-white text-rose-800 rounded-2xl rounded-tl-xs px-4 py-3 shadow-sm border border-rose-200 max-w-[85%] font-['Caveat'] text-xl font-bold flex items-center gap-2">
                  <span>Hey Priyansh ✨</span>
                  <span className="text-sm">🌸</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-rose-400 text-xs font-['Outfit'] flex items-center gap-1">
                  <MessageCircleHeart className="w-3.5 h-3.5 text-rose-500" />
                  The DM that changed my whole life
                </span>
                <span className="animate-float text-lg">💌</span>
              </div>
            </div>
          }
          message={[
            "Ye meri life ka sabse best day tha. Mene bhout jyada sahi kara....\nEs date ko me kabhi nahi bhul sakta. Es din se meri happiness fir se aane lag gyi...\nI love u soo much Ishika ❤️",
          ]}
        />

        {/* Memory 2: 12 October — Our First Meetup 🥹💗 */}
        <MemoryCard
          memoryIndex={2}
          date="12 October"
          title="12 October"
          subtitle="— Our First Meetup 🥹💗"
          tapeColor="stripes"
          illustration={
            <div className="py-2 flex flex-col items-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
                <TwoTeddyBears variant="first-meetup" className="w-56 sm:w-64 h-36" />
                {/* Real Photo Polaroid Preview - Best Smile (12 Oct) */}
                <div className="bg-white p-2 pb-4 rounded-xl shadow-md border border-pink-200 rotate-2 max-w-[155px]">
                  <div className="w-28 h-28 rounded-lg overflow-hidden bg-rose-50 border border-rose-100">
                    <img
                      src="/assets/aistudio/photo_2_2026-11-01_12-55-37_503189e2.jpg"
                      alt="Best Smile - Our 12 October Meetup"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] text-center font-['Caveat'] text-rose-800 font-bold mt-1">
                    Best Smile · 12 Oct 💕
                  </p>
                </div>
              </div>
              <span className="text-xs text-rose-400 font-['Outfit'] mt-1">
                From shaking hands & overthinking to absolute peace by your side
              </span>
            </div>
          }
          message={[
            "Suru me bhout jyada nervous tha. Kya hoga, kese baat karunga, kuch ulta bol diya toh, me pasand nhi aaya toh sab kharab ho gya toh. Pata nhi kitni jyada overthinking kari thi mene. Par tere se milne ke baad dhire dhire sab overthinking thik ho gyi....",
            "Me toh mere looks ko leke bhout jyada hi insecure hu, kuch jyada hi..... Par abb jab tu mere sath he toh meko insecurity nahi hoti. Abb meko dar ni lagta log kya sochenge. Bas ab tu kya sochegi meko esi chij se fark padta hee.",
            "I love u soo much Ishikaaa ❤️\nMwaaaaaaahhhhhh 💋",
          ]}
        />

        {/* Memory 3: 13 October — The Proposal 💍 (Special Glowing Heart & 2:58) */}
        <MemoryCard
          memoryIndex={3}
          date="13 October"
          title="13 October"
          subtitle="— The Proposal 💍"
          timeTag="2:58"
          specialGlow={true}
          tapeColor="pink"
          illustration={
            <div className="py-3 flex flex-col items-center relative">
              <TwoTeddyBears variant="proposal" className="w-72 sm:w-88 h-48" />
              {/* Fluttering butterflies around ring */}
              <div className="absolute top-2 left-6 animate-float">
                <ButterflySvg className="w-7 h-7" color="#E11D48" />
              </div>
              <div className="absolute top-4 right-8 animate-float-delayed">
                <ButterflySvg className="w-6 h-6" color="#F472B6" />
              </div>
              <span className="text-xs text-rose-600 font-bold font-['Outfit'] mt-1 bg-white/80 px-3 py-1 rounded-full shadow-xs">
                A magical night at 2:58 AM · Forever my wife 💍✨
              </span>
            </div>
          }
          message={[
            "Meri life ka sabse jyada happy moment. Abhi bhi butterflies aajati he. Kya hi best memory thi.....",
            "I hope apan hamesa ese hi sath rahe...\nHamesa hi ek dusre ka sath de, hamesa ek dusre ko samjhe, support kare.\nGalti hone pe daant lagae, chore ke na jae..",
            "Gusse me bhi baat kare. Esa nahi ki gussa ho toh 2-3 din tak baat hi nahi kari, kyuki chup rehne se kuch thik nhi hona.",
            "Agar seriously relationship rakhna he toh kahi baar ek dusre ko maaf karna padega. Bhout sari misunderstanding, overthinking hogi but last me ham dono bas ek hi hai.",
            "Ham bas ham hi hai or hame sath hi rehna he.......",
            "Or kabhi esi situation bhi aai jab hame esa lage ki syd samne vala badal gya he toh us time pe overthinking nahi karini.",
            "Kyuki life me problem daily kuch na kuch ho jata he jisse mood off rehta he or sahi se baat nhi kr pate.....\nEska ye matlab nhi he ki pyar khatam ho gya... Pyar koi saman thori he jo khatam ho jaega....",
            "Ishika sunn i love u soo much. Hamesa bas tujhse hi pyar karunga. Forever u r my wife. Mene tujhe accept kar liya.......",
            "Mere liye tu sabse imp he. Me hamesa patient rakhunga tujhe, hamesa maaf kar dunga. Mujhe sach me tu chahiye. Me bhout jyada serious huu.........",
            "I lovee u soooo much Ishikaaaaa ❤️",
            "(Promise hamesa tera hi rahunga or tere hi sath rahunga) 🧿",
          ]}
        />

        {/* Memory 4: 28 October — Our First Cheek Kiss 🥺💋 */}
        <MemoryCard
          memoryIndex={4}
          date="28 October"
          title="28 October"
          subtitle="— Our First Cheek Kiss 🥺💋"
          tapeColor="dots"
          illustration={
            <div className="py-2 flex flex-col items-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
                <TwoTeddyBears variant="kiss" className="w-56 sm:w-64 h-36" />
                {/* Real Photo Polaroid with 1st cheek kiss marks (photo_1) */}
                <div className="bg-white p-2 pb-4 rounded-xl shadow-md border border-rose-300 -rotate-2 max-w-[155px]">
                  <div className="w-28 h-28 rounded-lg overflow-hidden bg-rose-50 border border-rose-200">
                    <img
                      src="/assets/aistudio/photo_1_2026-11-01_12-55-37_10b80228.jpg"
                      alt="1st Cheek Kiss - Ishika & Priyansh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] text-center font-['Caveat'] text-rose-800 font-bold mt-1">
                    1st Cheek Kiss 💋❤️
                  </p>
                </div>
              </div>
              <span className="text-xs text-rose-400 font-['Outfit'] mt-1">
                Blushing cheeks, racing heartbeats & the sweetest shy smile
              </span>
            </div>
          }
          message={[
            "Kuch bahi bolna abhi bhi saram aa ri he. Kitni jyada cutie lag ri thi sach me yrr. Tu bhout saram aati hee. Man karta he bas tujhe dekhta rahu paas beth keee.\n\nMwaaaaaaaaahhhhhh 💋❤️",
          ]}
        />
      </div>
    </section>
  );
};
