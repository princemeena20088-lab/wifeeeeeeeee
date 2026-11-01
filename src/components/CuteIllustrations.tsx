import React from 'react';

interface TeddyProps {
  pose?: 'holding-heart' | 'waving' | 'shy' | 'blushing' | 'holding-flower';
  className?: string;
  onClick?: () => void;
  isWaving?: boolean;
}

export const TeddyBear: React.FC<TeddyProps> = ({
  pose = 'holding-heart',
  className = 'w-32 h-32',
  onClick,
  isWaving = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none cursor-pointer group ${className}`}
      title="Click me!"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
      >
        {/* Soft Shadow */}
        <ellipse cx="100" cy="182" rx="55" ry="10" fill="#F472B6" fillOpacity="0.18" />

        {/* Left Ear */}
        <circle cx="58" cy="58" r="26" fill="#D4A373" />
        <circle cx="58" cy="58" r="16" fill="#FFCCD5" />

        {/* Right Ear */}
        <circle cx="142" cy="58" r="26" fill="#D4A373" />
        <circle cx="142" cy="58" r="16" fill="#FFCCD5" />

        {/* Feet */}
        <ellipse cx="65" cy="165" rx="22" ry="16" fill="#D4A373" />
        <ellipse cx="65" cy="165" rx="13" ry="9" fill="#FFCCD5" />
        {/* Foot paw pads */}
        <circle cx="57" cy="158" r="3" fill="#FB7185" />
        <circle cx="65" cy="155" r="3" fill="#FB7185" />
        <circle cx="73" cy="158" r="3" fill="#FB7185" />

        <ellipse cx="135" cy="165" rx="22" ry="16" fill="#D4A373" />
        <ellipse cx="135" cy="165" rx="13" ry="9" fill="#FFCCD5" />
        {/* Foot paw pads */}
        <circle cx="127" cy="158" r="3" fill="#FB7185" />
        <circle cx="135" cy="155" r="3" fill="#FB7185" />
        <circle cx="143" cy="158" r="3" fill="#FB7185" />

        {/* Body */}
        <ellipse cx="100" cy="130" rx="52" ry="46" fill="#E29578" />
        {/* Belly */}
        <ellipse cx="100" cy="132" rx="34" ry="30" fill="#FFEDD5" />

        {/* Head */}
        <circle cx="100" cy="92" r="52" fill="#E29578" />

        {/* Snout */}
        <ellipse cx="100" cy="104" rx="24" ry="18" fill="#FFF1E6" />
        {/* Nose */}
        <ellipse cx="100" cy="96" rx="9" ry="7" fill="#8B5E3C" />
        <path
          d="M100 103V111M94 111C96 114 98 115 100 115C102 115 104 114 106 111"
          stroke="#8B5E3C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Eyes with sparkle */}
        <circle cx="80" cy="84" r="6" fill="#3D2B1F" />
        <circle cx="82" cy="82" r="2.2" fill="white" />
        <circle cx="78.5" cy="85.5" r="1.2" fill="white" />

        <circle cx="120" cy="84" r="6" fill="#3D2B1F" />
        <circle cx="122" cy="82" r="2.2" fill="white" />
        <circle cx="118.5" cy="85.5" r="1.2" fill="white" />

        {/* Blushing cheeks */}
        <ellipse cx="70" cy="100" rx="9" ry="6" fill="#FDA4AF" fillOpacity="0.8" />
        <ellipse cx="130" cy="100" rx="9" ry="6" fill="#FDA4AF" fillOpacity="0.8" />

        {/* Arms / Pose specific */}
        {pose === 'waving' || isWaving ? (
          <>
            {/* Left resting arm */}
            <ellipse cx="52" cy="130" rx="16" ry="24" fill="#D4A373" transform="rotate(15 52 130)" />
            {/* Right waving arm */}
            <g className="animate-wave-hand">
              <ellipse cx="150" cy="100" rx="15" ry="26" fill="#D4A373" transform="rotate(-40 150 100)" />
              <circle cx="162" cy="84" r="13" fill="#D4A373" />
              <circle cx="162" cy="84" r="7" fill="#FFCCD5" />
            </g>
          </>
        ) : (
          <>
            {/* Left Arm */}
            <ellipse cx="56" cy="128" rx="16" ry="24" fill="#D4A373" transform="rotate(25 56 128)" />
            {/* Right Arm */}
            <ellipse cx="144" cy="128" rx="16" ry="24" fill="#D4A373" transform="rotate(-25 144 128)" />
          </>
        )}

        {/* Heart held in paws */}
        {(pose === 'holding-heart' || pose === 'blushing') && (
          <g className="animate-pulse-heart" style={{ transformOrigin: '100px 130px' }}>
            <path
              d="M100 148C100 148 72 130 72 114C72 102 82 96 90 100C95 102 98 106 100 109C102 106 105 102 110 100C118 96 128 102 128 114C128 130 100 148 100 148Z"
              fill="#F43F5E"
            />
            {/* Heart reflection */}
            <path
              d="M80 108C78 114 80 120 84 125"
              stroke="#FDA4AF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Tiny cute paws holding heart */}
            <ellipse cx="78" cy="128" rx="10" ry="8" fill="#E29578" transform="rotate(20 78 128)" />
            <ellipse cx="122" cy="128" rx="10" ry="8" fill="#E29578" transform="rotate(-20 122 128)" />
          </g>
        )}
      </svg>
    </div>
  );
};

export const TwoTeddyBears: React.FC<{
  variant?: 'first-meetup' | 'kiss' | 'proposal' | 'night-sky';
  className?: string;
}> = ({ variant = 'first-meetup', className = 'w-72 h-48' }) => {
  if (variant === 'night-sky') {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <svg viewBox="0 0 340 220" fill="none" className="w-full h-full drop-shadow-xl">
          {/* Cloud cushion */}
          <ellipse cx="170" cy="195" rx="120" ry="20" fill="#E0E7FF" fillOpacity="0.4" />
          <ellipse cx="140" cy="190" rx="60" ry="18" fill="#FCE7F3" fillOpacity="0.6" />
          <ellipse cx="200" cy="190" rx="60" ry="18" fill="#EDE9FE" fillOpacity="0.6" />

          {/* Left Bear (Priyansh) */}
          <g transform="translate(60, 40)">
            {/* Ears */}
            <circle cx="45" cy="45" r="16" fill="#B45309" />
            <circle cx="45" cy="45" r="10" fill="#FBCFE8" />
            <circle cx="105" cy="45" r="16" fill="#B45309" />
            <circle cx="105" cy="45" r="10" fill="#FBCFE8" />
            {/* Body */}
            <ellipse cx="75" cy="115" rx="36" ry="34" fill="#C2783F" />
            {/* Head */}
            <circle cx="75" cy="72" r="36" fill="#C2783F" />
            {/* Snout */}
            <ellipse cx="75" cy="80" rx="16" ry="12" fill="#FEF3C7" />
            <ellipse cx="75" cy="76" rx="6" ry="4" fill="#78350F" />
            <path d="M75 80V85M72 85C73.5 87 76.5 87 78 85" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
            {/* Smiling closed eyes */}
            <path d="M62 68C64 64 68 64 70 68" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M80 68C82 64 86 64 88 68" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
            <ellipse cx="58" cy="78" rx="6" ry="4" fill="#FDA4AF" />
            <ellipse cx="92" cy="78" rx="6" ry="4" fill="#FDA4AF" />
          </g>

          {/* Right Bear (Ishika) with cute pink bow */}
          <g transform="translate(145, 45)">
            {/* Ears */}
            <circle cx="45" cy="45" r="15" fill="#D97706" />
            <circle cx="45" cy="45" r="9" fill="#FCE7F3" />
            <circle cx="95" cy="45" r="15" fill="#D97706" />
            <circle cx="95" cy="45" r="9" fill="#FCE7F3" />
            {/* Pink Bow on ear */}
            <path d="M96 38C90 32 90 44 96 38ZM96 38C102 32 102 44 96 38Z" fill="#F43F5E" />
            <circle cx="96" cy="38" r="3" fill="#FFE4E6" />
            {/* Body */}
            <ellipse cx="70" cy="112" rx="34" ry="32" fill="#E39556" />
            {/* Head */}
            <circle cx="70" cy="72" r="34" fill="#E39556" />
            {/* Snout */}
            <ellipse cx="70" cy="80" rx="15" ry="11" fill="#FFFBEB" />
            <ellipse cx="70" cy="76" rx="5" ry="3.5" fill="#78350F" />
            <path d="M70 79V84M67 84C68.5 86 71.5 86 73 84" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
            {/* Sweet happy eyes with lashes */}
            <path d="M58 68C60 64 64 64 66 68" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M74 68C76 64 80 64 82 68" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
            <ellipse cx="54" cy="78" rx="6" ry="4" fill="#FB7185" />
            <ellipse cx="86" cy="78" rx="6" ry="4" fill="#FB7185" />
          </g>

          {/* Shared cozy knit scarf wrapped around both */}
          <path
            d="M125 125C135 118 165 116 185 122C195 125 205 132 205 140C185 148 140 148 125 135Z"
            fill="#FB7185"
            stroke="#F43F5E"
            strokeWidth="1.5"
          />
          <path d="M155 135L150 165L165 165L168 135" fill="#FB7185" />
          {/* Fringe */}
          <line x1="150" y1="165" x2="150" y2="171" stroke="#F43F5E" strokeWidth="1.5" />
          <line x1="155" y1="165" x2="155" y2="171" stroke="#F43F5E" strokeWidth="1.5" />
          <line x1="160" y1="165" x2="160" y2="171" stroke="#F43F5E" strokeWidth="1.5" />
          <line x1="165" y1="165" x2="165" y2="171" stroke="#F43F5E" strokeWidth="1.5" />

          {/* Floating glowing heart between them */}
          <g className="animate-float" style={{ transformOrigin: '170px 30px' }}>
            <path
              d="M170 42C170 42 154 28 154 16C154 6 162 2 170 9C178 2 186 6 186 16C186 28 170 42 170 42Z"
              fill="#F43F5E"
              filter="drop-shadow(0px 0px 8px rgba(244,63,94,0.6))"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'kiss') {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <svg viewBox="0 0 320 200" fill="none" className="w-full h-full drop-shadow-md">
          {/* Left Bear leaning right to kiss */}
          <g transform="translate(50, 30)">
            <ellipse cx="60" cy="140" rx="36" ry="10" fill="#F472B6" fillOpacity="0.2" />
            <circle cx="35" cy="40" r="16" fill="#D4A373" />
            <circle cx="35" cy="40" r="10" fill="#FFCCD5" />
            <circle cx="95" cy="40" r="16" fill="#D4A373" />
            <circle cx="95" cy="40" r="10" fill="#FFCCD5" />
            {/* Body */}
            <ellipse cx="70" cy="105" rx="34" ry="30" fill="#E29578" transform="rotate(10 70 105)" />
            {/* Head tilted forward */}
            <circle cx="75" cy="65" r="34" fill="#E29578" />
            {/* Snout touching */}
            <ellipse cx="88" cy="72" rx="16" ry="12" fill="#FFF1E6" />
            <ellipse cx="94" cy="68" rx="5" ry="4" fill="#8B5E3C" />
            {/* Pout / kiss mouth */}
            <circle cx="96" cy="77" r="2.5" fill="#8B5E3C" />
            {/* Content happy closed eyes */}
            <path d="M62 60C64 56 68 56 70 60" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M78 60C80 56 84 56 86 60" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" />
            {/* Heavy blush */}
            <ellipse cx="62" cy="72" rx="8" ry="5" fill="#FB7185" fillOpacity="0.85" />
          </g>

          {/* Right Bear blushing deeply with kiss mark */}
          <g transform="translate(130, 30)">
            <ellipse cx="70" cy="140" rx="36" ry="10" fill="#F472B6" fillOpacity="0.2" />
            <circle cx="45" cy="40" r="16" fill="#E8B48F" />
            <circle cx="45" cy="40" r="10" fill="#FFCCD5" />
            <circle cx="100" cy="40" r="16" fill="#E8B48F" />
            <circle cx="100" cy="40" r="10" fill="#FFCCD5" />
            {/* Flower / Bow on right bear */}
            <circle cx="102" cy="32" r="5" fill="#FDA4AF" />
            <circle cx="102" cy="32" r="2" fill="#FFF" />
            {/* Body */}
            <ellipse cx="65" cy="105" rx="34" ry="30" fill="#E8B48F" transform="rotate(-6 65 105)" />
            {/* Head */}
            <circle cx="65" cy="65" r="34" fill="#E8B48F" />
            {/* Snout */}
            <ellipse cx="56" cy="72" rx="16" ry="12" fill="#FFF1E6" />
            <ellipse cx="50" cy="68" rx="5" ry="4" fill="#8B5E3C" />
            <path d="M52 75C54 78 58 78 60 75" stroke="#8B5E3C" strokeWidth="2" strokeLinecap="round" />
            {/* Shy blushing closed eyes with flutter */}
            <path d="M58 59C60 55 64 55 66 59" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M76 59C78 55 82 55 84 59" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" />
            {/* Extra deep blush */}
            <ellipse cx="48" cy="74" rx="9" ry="6" fill="#F43F5E" fillOpacity="0.6" />
            <ellipse cx="80" cy="74" rx="8" ry="5" fill="#FB7185" fillOpacity="0.85" />
            {/* Cute red lipstick kiss mark on cheek! */}
            <g transform="translate(42, 68) scale(0.6)">
              <path
                d="M4 8C8 4 14 4 18 8M4 9C8 13 14 13 18 9"
                stroke="#E11D48"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          </g>

          {/* Floating kisses & sparkle burst */}
          <g className="animate-float" style={{ transformOrigin: '160px 40px' }}>
            <path
              d="M160 48C160 48 148 36 148 26C148 18 154 14 160 20C166 14 172 18 172 26C172 36 160 48 160 48Z"
              fill="#E11D48"
            />
            <path
              d="M182 32C182 32 174 24 174 18C174 12 178 9 182 13C186 9 190 12 190 18C190 24 182 32 182 32Z"
              fill="#FB7185"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'proposal') {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <svg viewBox="0 0 340 220" fill="none" className="w-full h-full drop-shadow-lg">
          {/* Glowing Aura */}
          <circle cx="170" cy="110" r="100" fill="#FCE7F3" fillOpacity="0.4" filter="blur(20px)" />

          {/* Left Bear kneeling on one knee with ring box */}
          <g transform="translate(30, 40)">
            <ellipse cx="65" cy="145" rx="35" ry="10" fill="#F472B6" fillOpacity="0.2" />
            {/* Ears */}
            <circle cx="35" cy="40" r="15" fill="#D4A373" />
            <circle cx="35" cy="40" r="9" fill="#FFCCD5" />
            <circle cx="95" cy="40" r="15" fill="#D4A373" />
            <circle cx="95" cy="40" r="9" fill="#FFCCD5" />
            {/* Body */}
            <ellipse cx="65" cy="105" rx="32" ry="28" fill="#E29578" />
            {/* Head */}
            <circle cx="70" cy="65" r="32" fill="#E29578" />
            {/* Snout */}
            <ellipse cx="78" cy="72" rx="14" ry="11" fill="#FFF1E6" />
            <ellipse cx="80" cy="68" rx="5" ry="4" fill="#8B5E3C" />
            <path d="M80 73V78M77 78C79 80 82 80 84 78" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round" />
            {/* Loving wide eyes looking up */}
            <circle cx="64" cy="58" r="4.5" fill="#3D2B1F" />
            <circle cx="65.5" cy="56.5" r="1.5" fill="white" />
            <circle cx="80" cy="58" r="4.5" fill="#3D2B1F" />
            <circle cx="81.5" cy="56.5" r="1.5" fill="white" />
            <ellipse cx="60" cy="68" rx="6" ry="4" fill="#FDA4AF" />
            <ellipse cx="88" cy="68" rx="6" ry="4" fill="#FDA4AF" />
            {/* Arm holding open velvet ring box */}
            <ellipse cx="98" cy="98" rx="14" ry="8" fill="#D4A373" transform="rotate(-15 98 98)" />
            {/* Velvet red ring box */}
            <path d="M102 96L116 88L126 95L112 103Z" fill="#991B1B" />
            <path d="M102 96L112 103L112 110L102 103Z" fill="#7F1D1D" />
            <path d="M112 103L126 95L126 102L112 110Z" fill="#B91C1C" />
            {/* Open lid */}
            <path d="M102 96L116 88L118 76L104 84Z" fill="#B91C1C" />
            {/* Glowing Ring inside box */}
            <circle cx="114" cy="93" r="5" stroke="#FDE047" strokeWidth="2" fill="none" />
            <polygon points="114,84 117,89 114,92 111,89" fill="#38BDF8" />
            {/* Sparkles */}
            <circle cx="114" cy="84" r="2" fill="white" />
          </g>

          {/* Right Bear with paws on mouth, touched and happy */}
          <g transform="translate(170, 30)">
            <ellipse cx="65" cy="155" rx="35" ry="10" fill="#F472B6" fillOpacity="0.2" />
            <circle cx="35" cy="40" r="15" fill="#E8B48F" />
            <circle cx="35" cy="40" r="9" fill="#FFCCD5" />
            <circle cx="95" cy="40" r="15" fill="#E8B48F" />
            <circle cx="95" cy="40" r="9" fill="#FFCCD5" />
            {/* Head & Body */}
            <ellipse cx="65" cy="115" rx="34" ry="30" fill="#E8B48F" />
            <circle cx="65" cy="68" r="34" fill="#E8B48F" />
            {/* Starry happy eyes */}
            <path d="M52 60L54 54L56 60L62 62L56 64L54 70L52 64L46 62Z" fill="#F43F5E" />
            <path d="M74 60L76 54L78 60L84 62L78 64L76 70L74 64L68 62Z" fill="#F43F5E" />
            {/* Glowing blush */}
            <ellipse cx="46" cy="76" rx="8" ry="5" fill="#FB7185" />
            <ellipse cx="84" cy="76" rx="8" ry="5" fill="#FB7185" />
            {/* Paws held to mouth in surprise */}
            <ellipse cx="58" cy="84" rx="9" ry="8" fill="#D4A373" />
            <ellipse cx="72" cy="84" rx="9" ry="8" fill="#D4A373" />
          </g>

          {/* Glowing Proposal Ribbon & Time Stamp 2:58 */}
          <g transform="translate(135, 15)">
            <rect x="0" y="0" width="70" height="24" rx="12" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
            <text x="35" y="16" textAnchor="middle" fill="#E11D48" fontSize="11" fontWeight="700" fontFamily="sans-serif">
              2:58 AM 💍
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // default: first meetup
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 320 200" fill="none" className="w-full h-full drop-shadow-md">
        {/* Left Bear (shy, slight blush, holding hands or reaching out) */}
        <g transform="translate(40, 35)">
          <ellipse cx="60" cy="135" rx="34" ry="10" fill="#F472B6" fillOpacity="0.2" />
          <circle cx="35" cy="40" r="16" fill="#D4A373" />
          <circle cx="35" cy="40" r="10" fill="#FFCCD5" />
          <circle cx="95" cy="40" r="16" fill="#D4A373" />
          <circle cx="95" cy="40" r="10" fill="#FFCCD5" />
          <ellipse cx="65" cy="105" rx="32" ry="28" fill="#E29578" />
          <circle cx="65" cy="65" r="32" fill="#E29578" />
          <ellipse cx="65" cy="72" rx="14" ry="11" fill="#FFF1E6" />
          <ellipse cx="65" cy="68" rx="5" ry="4" fill="#8B5E3C" />
          <path d="M65 73V77M62 77C63.5 79 66.5 79 68 77" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round" />
          {/* Shy eyes */}
          <circle cx="54" cy="58" r="4.5" fill="#3D2B1F" />
          <circle cx="55.5" cy="56.5" r="1.5" fill="white" />
          <circle cx="74" cy="58" r="4.5" fill="#3D2B1F" />
          <circle cx="75.5" cy="56.5" r="1.5" fill="white" />
          {/* Overthinking blush sweat drop */}
          <ellipse cx="48" cy="70" rx="7" ry="5" fill="#FDA4AF" />
          <ellipse cx="80" cy="70" rx="7" ry="5" fill="#FDA4AF" />
          <path d="M86 50C86 47 88 45 88 45C88 45 90 47 90 50C90 52 88 53 88 53C88 53 86 52 86 50Z" fill="#38BDF8" />
        </g>

        {/* Right Bear (welcoming, soft smile, holding little pink rose flower) */}
        <g transform="translate(150, 35)">
          <ellipse cx="65" cy="135" rx="34" ry="10" fill="#F472B6" fillOpacity="0.2" />
          <circle cx="35" cy="40" r="16" fill="#E8B48F" />
          <circle cx="35" cy="40" r="10" fill="#FFCCD5" />
          <circle cx="95" cy="40" r="16" fill="#E8B48F" />
          <circle cx="95" cy="40" r="10" fill="#FFCCD5" />
          <ellipse cx="65" cy="105" rx="32" ry="28" fill="#E8B48F" />
          <circle cx="65" cy="65" r="32" fill="#E8B48F" />
          <ellipse cx="65" cy="72" rx="14" ry="11" fill="#FFF1E6" />
          <ellipse cx="65" cy="68" rx="5" ry="4" fill="#8B5E3C" />
          <path d="M65 73V77M62 77C63.5 80 66.5 80 68 77" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round" />
          {/* Warm caring eyes */}
          <circle cx="54" cy="58" r="4.5" fill="#3D2B1F" />
          <circle cx="55.5" cy="56.5" r="1.5" fill="white" />
          <circle cx="74" cy="58" r="4.5" fill="#3D2B1F" />
          <circle cx="75.5" cy="56.5" r="1.5" fill="white" />
          <ellipse cx="48" cy="70" rx="7" ry="5" fill="#FB7185" />
          <ellipse cx="80" cy="70" rx="7" ry="5" fill="#FB7185" />

          {/* Little pink rose held out */}
          <path d="M25 95Q20 90 28 80" stroke="#16A34A" strokeWidth="2.5" fill="none" />
          <circle cx="30" cy="78" r="6" fill="#F43F5E" />
          <circle cx="30" cy="78" r="3" fill="#FDA4AF" />
        </g>

        {/* Floating nervousness fading to butterflies */}
        <g className="animate-float" style={{ transformOrigin: '150px 20px' }}>
          <path
            d="M150 24C150 24 142 16 142 9C142 3 147 0 150 5C153 0 158 3 158 9C158 16 150 24 150 24Z"
            fill="#FB7185"
          />
        </g>
      </svg>
    </div>
  );
};

export const ButterflySvg: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-6 h-6', color = '#F472B6' }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    {/* Left wings */}
    <g style={{ transformOrigin: '20px 20px', animation: 'butterfly-wing 0.8s ease-in-out infinite' }}>
      <ellipse cx="12" cy="14" rx="9" ry="11" fill={color} fillOpacity="0.85" transform="rotate(-20 12 14)" />
      <ellipse cx="13" cy="26" rx="6" ry="8" fill={color} fillOpacity="0.7" transform="rotate(-10 13 26)" />
      <circle cx="12" cy="14" r="3" fill="#FFF" fillOpacity="0.6" />
    </g>
    {/* Right wings */}
    <g style={{ transformOrigin: '20px 20px', animation: 'butterfly-wing 0.8s ease-in-out infinite' }}>
      <ellipse cx="28" cy="14" rx="9" ry="11" fill={color} fillOpacity="0.85" transform="rotate(20 28 14)" />
      <ellipse cx="27" cy="26" rx="6" ry="8" fill={color} fillOpacity="0.7" transform="rotate(10 27 26)" />
      <circle cx="28" cy="14" r="3" fill="#FFF" fillOpacity="0.6" />
    </g>
    {/* Butterfly Body */}
    <ellipse cx="20" cy="20" rx="2" ry="10" fill="#4A3B43" />
    {/* Antennae */}
    <path d="M20 10Q16 5 14 5M20 10Q24 5 26 5" stroke="#4A3B43" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const WashiTapeStrip: React.FC<{
  className?: string;
  pattern?: 'dots' | 'stripes' | 'pink';
}> = ({ className = 'w-24 h-6', pattern = 'dots' }) => {
  return (
    <div
      className={`relative inline-block opacity-85 shadow-sm transform -rotate-2 select-none pointer-events-none ${className}`}
      style={{
        background:
          pattern === 'dots'
            ? 'radial-gradient(#F472B6 1px, #FFF0F5 1px)'
            : 'repeating-linear-gradient(45deg, #FFE4E6, #FFE4E6 6px, #FFF1F2 6px, #FFF1F2 12px)',
        backgroundSize: pattern === 'dots' ? '8px 8px' : 'auto',
        clipPath:
          'polygon(0% 0%, 5% 40%, 0% 100%, 95% 100%, 100% 60%, 95% 0%)',
      }}
    />
  );
};

export const WaxSeal: React.FC<{
  className?: string;
  text?: string;
}> = ({ className = 'w-12 h-12', text = 'P❤️I' }) => (
  <div
    className={`rounded-full flex items-center justify-center font-bold text-white shadow-md select-none border-2 border-rose-300/40 ${className}`}
    style={{
      background: 'radial-gradient(circle at 35% 35%, #FB7185, #BE123C 85%)',
      boxShadow: '0 4px 10px rgba(190, 18, 60, 0.35), inset 0 2px 4px rgba(255,255,255,0.4)',
    }}
  >
    <span className="font-['Caveat'] text-base tracking-wide drop-shadow">{text}</span>
  </div>
);
