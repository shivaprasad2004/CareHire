import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* LinkedIn-style pure green background with rounded corners */}
      <div className="absolute inset-0 bg-[#00a651] rounded-[4px] shadow-sm"></div>
      
      {/* White "CH" text */}
      <span className="relative z-10 font-bold text-white text-lg tracking-tight leading-none font-sans select-none">
        CH
      </span>
    </div>
  );
};

export const LogoText = () => (
    <div className="flex flex-col justify-center">
        <h1 className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
            Care<span className="text-[#00a651]">Hire</span>
        </h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">Medical Suite</p>
    </div>
);

export default Logo;
