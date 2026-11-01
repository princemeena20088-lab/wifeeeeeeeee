import React, { useEffect, useState, useCallback } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const BackgroundEffects: React.FC = () => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);

  // Click anywhere to spawn mini hearts
  const handleGlobalClick = useCallback((e: MouseEvent) => {
    // Ignore clicks if user clicked a button/input directly, but still allow if they want hearts
    const colors = ['#FB7185', '#F43F5E', '#EC4899', '#D946EF', '#FDA4AF', '#F472B6'];
    const newParticles: HeartParticle[] = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + Math.random() + i,
      x: e.clientX + (Math.random() * 40 - 20),
      y: e.clientY + (Math.random() * 40 - 20),
      size: Math.floor(Math.random() * 12) + 14,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles((prev) => [...prev.slice(-30), ...newParticles]);
  }, []);

  // Cursor trail
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (Math.random() > 0.4) return; // throttle
    const newPoint = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setTrail((prev) => [...prev.slice(-12), newPoint]);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 1200));
      setTrail((prev) => prev.filter((t) => Date.now() - t.id < 600));
    }, 200);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [handleGlobalClick, handleMouseMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Background drifting hearts */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute text-rose-300 text-2xl animate-float"
          style={{ top: '15%', left: '8%', animationDuration: '6s' }}
        >
          💕
        </div>
        <div
          className="absolute text-pink-300 text-xl animate-float-delayed"
          style={{ top: '35%', right: '10%', animationDuration: '7s' }}
        >
          🌸
        </div>
        <div
          className="absolute text-rose-200 text-3xl animate-float"
          style={{ top: '65%', left: '5%', animationDuration: '8s' }}
        >
          💖
        </div>
        <div
          className="absolute text-purple-200 text-2xl animate-float-delayed"
          style={{ top: '80%', right: '8%', animationDuration: '6.5s' }}
        >
          ✨
        </div>
        <div
          className="absolute text-pink-300 text-xl animate-float"
          style={{ top: '50%', left: '92%', animationDuration: '9s' }}
        >
          🦋
        </div>
      </div>

      {/* Gentle roaming butterflies */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          top: '22%',
          left: '14%',
          animation: 'float 7s infinite ease-in-out',
        }}
      >
        <span className="text-xl inline-block transform -rotate-12 animate-pulse">🦋</span>
      </div>

      <div
        className="absolute transition-all duration-1000 ease-in-out hidden sm:block"
        style={{
          top: '58%',
          right: '12%',
          animation: 'float-reverse 8s infinite ease-in-out',
        }}
      >
        <span className="text-xl inline-block transform rotate-12">🦋</span>
      </div>

      {/* Click Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-float pointer-events-none select-none transition-all duration-1000 ease-out"
          style={{
            left: p.x,
            top: p.y,
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: 0.9,
          }}
        >
          ❤️
        </span>
      ))}

      {/* Cursor Heart & Sparkle Trail */}
      {trail.map((t, idx) => (
        <span
          key={t.id}
          className="absolute rounded-full pointer-events-none select-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: t.x + (idx % 2 === 0 ? 6 : -6),
            top: t.y + (idx % 2 === 0 ? 8 : -8),
            fontSize: `${10 + (idx % 3) * 3}px`,
            opacity: (idx + 1) / trail.length * 0.7,
            filter: 'drop-shadow(0 0 4px rgba(244, 114, 182, 0.4))',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
          }}
        >
          {idx % 3 === 0 ? '✨' : idx % 3 === 1 ? '💖' : '🌸'}
        </span>
      ))}
    </div>
  );
};
