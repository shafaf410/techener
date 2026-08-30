import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ShieldCheck, Globe2, Cpu, Wrench } from 'lucide-react';

interface HeroSequenceProps {
  onOpenQuote: () => void;
  onOpenAbout: () => void;
}

export const HeroSequence: React.FC<HeroSequenceProps> = ({ onOpenQuote, onOpenAbout }) => {
  return (
    <div className="relative w-full bg-[#050505] overflow-hidden">
      {/* 1. HERO SECTION (100vh Viewport) */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-end">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center opacity-70"
          >
            <source src="/video01.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/25 to-black/35 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pb-10 sm:pb-14 md:pb-16 pointer-events-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* Headline & Translucent Logo Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-3xl space-y-5"
            >
              {/* Translucent Dark Glass Logo Container */}
              <div className="inline-flex items-center px-6 py-3.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl w-fit transition-all duration-300 hover:border-[#F01B25]/50 hover:bg-black/60">
                <img
                  src="/logo.png"
                  alt="Tech Ener-G Logo"
                  className="h-14 sm:h-18 md:h-22 lg:h-26 w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] filter brightness-110"
                />
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-grotesk font-extrabold text-white tracking-tight uppercase leading-[0.95] drop-shadow-2xl">
                ACCELERATING YOUR <br />
                <span className="text-[#F01B25]">GROWTH TOGETHER.</span>
              </h1>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#about"
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-md bg-[#F01B25] text-white font-mono-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black red-glow shadow-lg shadow-[#F01B25]/30"
                >
                  <span>Explore Solutions</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300"
                >
                  Request Quote
                </button>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              href="#about"
              className="flex items-center gap-3 text-zinc-300 hover:text-white font-mono-tech text-[11px] tracking-widest uppercase animate-bounce shrink-0 lg:mb-2 transition-colors"
            >
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown className="w-4 h-4 text-[#F01B25]" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* 2. ABOUT TECH ENER-G SECTION (Natural Smooth Scroll Flow) */}
      <section id="about" className="relative py-24 md:py-32 bg-[#080808] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          {/* Header Tag */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#F01B25] rounded-full animate-pulse" />
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                01 / ABOUT TECH ENER-G
              </span>
            </div>
            <span className="text-xs font-mono-tech text-zinc-400">ESTABLISHED 2021 | UAE & GLOBAL</span>
          </div>

          {/* Monumental Headline & Narrative */}
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.95]">
              BRIDGING THE GAP BETWEEN <br />
              <span className="text-[#F01B25]">USERS & MANUFACTURERS.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <p className="text-base font-outfit text-zinc-200 leading-relaxed font-light">
                  Established in 2021, <strong className="text-white font-semibold">Tech Ener-G Trading FZE (TET)</strong> has emerged as a premier supplier serving Power Generation, Oil & Gas, and major industrial sectors across the UAE, MENA region, Africa, Asia, and Europe.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <p className="text-base font-outfit text-zinc-300 leading-relaxed font-light">
                  Backed by a team of qualified engineers, we bridge global equipment manufacturers with regional end-users, providing technical expertise, trusted vendor sourcing, and end-to-end industrial supply chain efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Metric Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-[#F01B25]/50 transition-colors">
              <ShieldCheck className="w-6 h-6 text-[#F01B25] shrink-0" />
              <div>
                <div className="text-lg font-grotesk font-extrabold text-white uppercase">20,000+</div>
                <div className="text-xs font-outfit text-zinc-400">Items Available</div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-[#F01B25]/50 transition-colors">
              <Globe2 className="w-6 h-6 text-[#F01B25] shrink-0" />
              <div>
                <div className="text-lg font-grotesk font-extrabold text-white uppercase">MENA & Global</div>
                <div className="text-xs font-outfit text-zinc-400">Supply Footprint</div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-[#F01B25]/50 transition-colors">
              <Cpu className="w-6 h-6 text-[#F01B25] shrink-0" />
              <div>
                <div className="text-lg font-grotesk font-extrabold text-white uppercase">Engineered</div>
                <div className="text-xs font-outfit text-zinc-400">Flow Control</div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-[#F01B25]/50 transition-colors">
              <Wrench className="w-6 h-6 text-[#F01B25] shrink-0" />
              <div>
                <div className="text-lg font-grotesk font-extrabold text-white uppercase">24/7 Support</div>
                <div className="text-xs font-outfit text-zinc-400">Technical Expertise</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
