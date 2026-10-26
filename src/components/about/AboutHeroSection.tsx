import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { AboutConfig } from '../../types/about';

interface AboutHeroSectionProps {
  config: AboutConfig;
  onClose: () => void;
  onOpenQuote: () => void;
  onScrollToExplore: () => void;
}

export const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({
  config,
  onClose,
  onOpenQuote,
  onScrollToExplore,
}) => {
  const { hero, brand } = config;

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between bg-[#050505] text-white overflow-hidden">
      {/* Background Architectural Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt="Corporate Headquarters"
          className="w-full h-full object-cover object-center scale-105 animate-fade-in"
        />
        {/* Gradients to match the reference look */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/80" />
        <div className="absolute inset-0 bg-radial-at-t from-transparent via-[#050505]/50 to-[#050505]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none grid-bg-overlay" />
      </div>

      {/* Top Floating Navigation Header */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pt-6 sm:pt-8 flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#F01B25] text-white/90 hover:text-white border border-white/15 transition-all text-xs font-mono-tech uppercase font-bold cursor-pointer backdrop-blur-md"
            aria-label="Back to website"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-ping" />
            <span className="text-xs font-mono-tech tracking-wider text-zinc-400 uppercase">
              ABOUT {brand.name.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 text-xs font-mono-tech text-zinc-300">
            <span className="hover:text-white transition-colors cursor-pointer" onClick={onScrollToExplore}>
              WHO WE ARE
            </span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={onScrollToExplore}>
              VALUES
            </span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={onScrollToExplore}>
              LEADERSHIP
            </span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={onScrollToExplore}>
              ACCREDITATIONS
            </span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={onScrollToExplore}>
              JOURNEY
            </span>
          </div>

          <button
            onClick={onOpenQuote}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F01B25] hover:bg-white text-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#F01B25]/25 cursor-pointer"
          >
            <span>{hero.ctaQuoteText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </header>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-24 my-auto flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-4xl"
        >
          {/* Eyebrow kicker */}
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-6 bg-[#F01B25]" />
            <span className="text-xs sm:text-sm font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
              {hero.eyebrow}
            </span>
          </div>

          {/* Oversized Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-grotesk font-extrabold uppercase tracking-tight leading-[0.92] text-white">
            {hero.titleLine1} <br />
            <span className="text-[#F01B25] drop-shadow-[0_2px_20px_rgba(240,27,37,0.4)]">
              {hero.titleLine2}
            </span>
          </h1>

          {/* Quick Action Button */}
          <div className="pt-4">
            <button
              onClick={onScrollToExplore}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono-tech text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer"
            >
              <span>{hero.ctaScrollText}</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-8 flex items-center justify-between text-xs font-mono-tech text-zinc-500 border-t border-white/10 pt-4">
        <div>{brand.name} • INDUSTRIAL ENGINEERING SOLUTIONS</div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors" onClick={onScrollToExplore}>
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
};
