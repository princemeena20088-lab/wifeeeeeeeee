import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TeddyBear } from './CuteIllustrations';
import { Sparkles, Trophy, Play, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FallingItem {
  id: number;
  x: number; // percentage 5% to 95%
  y: number; // percentage 0% to 100%
  type: 'kiss' | 'heart' | 'rose' | 'sparkle';
  points: number;
  symbol: string;
  speed: number;
}

export const CatchKissesGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [basketX, setBasketX] = useState<number>(50); // percentage 0 to 100

  const itemsRef = useRef<FallingItem[]>([]);
  const [renderedItems, setRenderedItems] = useState<FallingItem[]>([]);
  const requestRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Start game
  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(15);
    setScore(0);
    setGameOver(false);
    itemsRef.current = [];
    setRenderedItems([]);
    setBasketX(50);
  };

  // Timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          setGameOver(true);
          try {
            confetti({
              particleCount: 70,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#FB7185', '#F43F5E', '#FDA4AF', '#F59E0B'],
            });
          } catch {
            // ignore
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Game Loop
  const updateGame = useCallback(() => {
    if (!isPlaying) return;

    // Randomly spawn new items
    if (Math.random() < 0.08) {
      const types: ('kiss' | 'heart' | 'rose' | 'sparkle')[] = ['kiss', 'kiss', 'heart', 'rose', 'sparkle'];
      const chosen = types[Math.floor(Math.random() * types.length)];
      let points = 10;
      let symbol = '💋';
      if (chosen === 'heart') {
        points = 15;
        symbol = '❤️';
      } else if (chosen === 'rose') {
        points = 20;
        symbol = '🌹';
      } else if (chosen === 'sparkle') {
        points = 25;
        symbol = '✨';
      }

      itemsRef.current.push({
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: 0,
        type: chosen,
        points,
        symbol,
        speed: Math.random() * 0.7 + 0.8,
      });
    }

    // Move items down and check collision
    const nextItems: FallingItem[] = [];
    const basketRange = 14; // hitbox width in percentage

    for (const item of itemsRef.current) {
      item.y += item.speed;

      // Check collision near bottom (y >= 82% and y <= 94%)
      if (item.y >= 80 && item.y <= 92) {
        if (Math.abs(item.x - basketX) < basketRange) {
          // Caught!
          setScore((s) => s + item.points);
          continue; // Item collected
        }
      }

      // Keep if not off-screen
      if (item.y < 100) {
        nextItems.push(item);
      }
    }

    itemsRef.current = nextItems;
    setRenderedItems([...nextItems]);

    requestRef.current = requestAnimationFrame(updateGame);
  }, [isPlaying, basketX]);

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, updateGame]);

  // Handle Mouse/Touch Move
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isPlaying) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(8, Math.min(92, x)));
  };

  // Keyboard controls
  useEffect(() => {
    if (!isPlaying) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setBasketX((x) => Math.max(8, x - 6));
      } else if (e.key === 'ArrowRight') {
        setBasketX((x) => Math.min(92, x + 6));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  return (
    <section className="relative py-16 px-4 max-w-3xl mx-auto">
      {/* Chapter kicker */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-rose-500 mb-2">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="text-xs font-semibold tracking-wider uppercase font-['Outfit']">
            Chapter 07 · Mini Game
          </span>
          <Sparkles className="w-4 h-4 animate-spin-slow" />
        </div>
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-rose-950">
          CATCH PRIYANSH&apos;S KISSES 🧸💋
        </h2>
        <p className="font-['Caveat'] text-2xl text-rose-600 font-bold mt-1">
          Catch as many kisses, roses & hearts in 15 seconds!
        </p>
      </div>

      {/* Game Card Container */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-pink-200/90 shadow-xl relative overflow-hidden">
        {/* Game HUD */}
        <div className="flex items-center justify-between mb-4 border-b border-rose-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold text-rose-400 font-['Outfit']">
              Score:
            </span>
            <span className="font-['Outfit'] text-2xl font-black text-rose-600 tabular-nums">
              {score}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold text-rose-400 font-['Outfit']">
              Time:
            </span>
            <span
              className={`font-['Outfit'] text-2xl font-black tabular-nums ${
                timeLeft <= 5 ? 'text-red-500 animate-ping' : 'text-rose-950'
              }`}
            >
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Playable Canvas Area */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-b from-[#FFF5F8] via-[#FFFDF9] to-[#FFE4EC] border border-rose-200/80 overflow-hidden cursor-ew-resize select-none touch-none shadow-inner"
        >
          {/* Decorative background clouds */}
          <div className="absolute top-4 left-6 text-3xl opacity-40 pointer-events-none">☁️</div>
          <div className="absolute top-8 right-12 text-2xl opacity-40 pointer-events-none">☁️</div>
          <div className="absolute top-20 left-1/3 text-xl opacity-30 pointer-events-none">🌸</div>

          {/* Falling Items */}
          {renderedItems.map((item) => (
            <div
              key={item.id}
              className="absolute text-2xl sm:text-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform filter drop-shadow-xs"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.symbol}
            </div>
          ))}

          {/* Teddy Basket Catcher at bottom */}
          <div
            className="absolute bottom-2 transform -translate-x-1/2 transition-transform duration-75 pointer-events-none flex flex-col items-center"
            style={{ left: `${basketX}%` }}
          >
            <div className="w-14 sm:w-16 h-14 sm:h-16 relative">
              <TeddyBear pose="holding-heart" className="w-full h-full" />
            </div>
            <div className="w-20 sm:w-24 h-4 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full shadow-md flex items-center justify-center -mt-2">
              <span className="text-[9px] text-white font-bold tracking-wider">ISHIKA&apos;S BASKET</span>
            </div>
          </div>

          {/* Overlay: Game Start Screen */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
              <span className="text-4xl animate-bounce mb-2">💋</span>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-rose-950 mb-1">
                Ready, Ishika?
              </h3>
              <p className="text-xs text-rose-600 max-w-xs mb-5 font-['Outfit']">
                Move your finger or mouse left & right to catch all the kisses and roses Priyansh sends!
              </p>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm rounded-full shadow-lg shadow-rose-300/60 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Game (15s)</span>
              </button>
            </div>
          )}

          {/* Overlay: Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20 animate-float">
              <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 mb-2">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-rose-950 mb-1">
                You Caught {score} Points of Love! 💕
              </h3>
              <p className="font-['Caveat'] text-2xl text-rose-600 font-bold max-w-sm mb-4">
                &ldquo;Reward unlocked: Unlimited lifetime kisses, cuddles & happiness from Priyansh!&rdquo;
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-full shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>

        {/* Controls guidance */}
        <p className="text-center text-[11px] text-rose-400 font-['Outfit'] mt-3">
          Tip: Move left/right using touch on phone or mouse/arrow keys on computer.
        </p>
      </div>
    </section>
  );
};
