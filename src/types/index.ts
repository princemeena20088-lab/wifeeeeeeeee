export interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

export interface FloatingElement {
  id: number;
  type: 'heart' | 'butterfly' | 'sparkle' | 'flower';
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
}
