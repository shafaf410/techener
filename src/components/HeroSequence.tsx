import React from 'react';
import { ArrowDown, ArrowUpRight, Info } from 'lucide-react';

interface HeroSequenceProps {
  onOpenQuote: () => void;
  onOpenAbout: () => void;
}

export const HeroSequence: React.FC<HeroSequenceProps> = ({ onOpenQuote, onOpenAbout }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505] flex flex-col justify-end">
      {/* 100% BACKGROUND HERO VIDEO */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center opacity-65"
        >
          <source src="/video01.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Subtle Dark Vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 pointer-events-none" />
      </div>

      {/* HERO SECTION CONTENT */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pb-10 sm:pb-14 md:pb-16 pointer-events-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Headline & CTA Boxes Under Text */}
          <div className="max-w-3xl space-y-5">
            {/* Translucent Dark Glass Logo Container */}
            <div className="inline-flex items-center px-6 py-3.5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl w-fit transition-all duration-300 hover:border-[#F01B25]/50 hover:bg-black/70">
              <img
                src="/logo.png"
                alt="Tech Ener-G Logo"
                className="h-14 sm:h-18 md:h-22 lg:h-26 w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] filter brightness-110"
              />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-grotesk font-extrabold text-white tracking-tight uppercase leading-[0.95] drop-shadow-2xl">
              CUT COST <br />
              <span className="text-[#F01B25]">NOT THE QUALITY.</span>
            </h1>

            {/* CTA Buttons Directly Under Text */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#industries"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-md bg-[#F01B25] text-white font-mono-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black red-glow shadow-lg shadow-[#F01B25]/30"
              >
                <span>Explore Solutions</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <button
                onClick={onOpenAbout}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300"
              >
                <Info className="w-4 h-4 text-[#F01B25]" />
                <span>About Us</span>
              </button>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-black/60 hover:bg-black/80 border border-white/15 text-zinc-300 hover:text-white font-mono-tech font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300"
              >
                Request Quote
              </button>
            </div>
          </div>

          {/* Scroll Indicator on Bottom Right */}
          <a
            href="#industries"
            className="flex items-center gap-3 text-zinc-300 hover:text-white font-mono-tech text-[11px] tracking-widest uppercase animate-bounce shrink-0 lg:mb-2 transition-colors"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-4 h-4 text-[#F01B25]" />
          </a>
        </div>
      </div>
    </div>
  );
};
