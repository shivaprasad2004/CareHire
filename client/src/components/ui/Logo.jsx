import React from 'react';

const Logo = ({ className = "w-10 h-10", collapsed = false }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      
      {/* Background Container - The "Box" the user wanted, but Premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-lg shadow-slate-900/20 border border-slate-700/50 overflow-hidden">
         {/* Subtle internal gloss/shine */}
         <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-emerald-400/10 to-transparent opacity-30 rotate-12"></div>
      </div>

      {/* The Icon Symbol - Adjusted for Dark Background */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-3/4 h-3/4 z-10"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" /> {/* carehire-400 (lighter for dark bg) */}
            <stop offset="100%" stopColor="#38bdf8" /> {/* sky-400 */}
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Glow behind the main shape */}
        <path
          d="M65 30C55 20 35 20 25 35C15 50 15 65 30 80L50 90L70 80"
          stroke="url(#logoGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          opacity="0.5"
        />

        {/* The 'C' Shape (Care) - Shield/Leaf */}
        <path
          d="M65 30C55 20 35 20 25 35C15 50 15 65 30 80L50 90L70 80"
          stroke="url(#logoGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* The 'H' Shape (Hire/Human) - Intersecting Pulse */}
        <path
          d="M40 35V65M60 35V65M35 50H65"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.9"
        />
        
        {/* Central Pulse Node */}
        <circle cx="50" cy="50" r="5" fill="white" className="animate-pulse" />
        
        {/* Orbiting Particles (Subtle) */}
        <circle cx="50" cy="50" r="14" stroke="white" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      </svg>
    </div>
  );
};

export const LogoText = () => (
    <div className="flex flex-col justify-center">
        <h1 className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
            Care<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">Hire</span>
        </h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">Medical Suite</p>
    </div>
);

export default Logo;
