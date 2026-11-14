import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ShieldCheck, Award, Layers, ChevronDown, Wrench, Flame, Gauge } from 'lucide-react';

interface MechanicalHeroProps {
  onBackToDivisions: () => void;
  onOpenQuote: () => void;
  onScrollToCategories: () => void;
}

export const MechanicalHero: React.FC<MechanicalHeroProps> = ({
  onBackToDivisions,
  onOpenQuote,
  onScrollToCategories,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Subtle cursor tilt / responsive movement
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-28 sm:pt-36 pb-20 md:pb-28 bg-[#050505] text-white border-b border-white/10 overflow-hidden"
    >
      {/* Ambient background energy orbs */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-[#F01B25]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-red-950/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Grid Pattern Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 space-y-10">
        {/* 1. Top Action & Breadcrumb Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <button
            onClick={onBackToDivisions}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-[#F01B25] border border-white/10 hover:border-[#F01B25] text-xs font-mono-tech uppercase font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Divisions</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-tech text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
              TECH ENER-G // MECHANICAL DIVISION // 01
            </span>
            <button
              onClick={onOpenQuote}
              className="px-5 py-2 rounded-full bg-[#F01B25] hover:bg-white text-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-[#F01B25]/25 cursor-pointer"
            >
              <span>Request Quote / RFQ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Main 2-Column Hero: Typography & Interactive Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vertical Clipping-Mask Headline & Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Division Pill */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse shadow-[0_0_8px_#F01B25]" />
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                DIVISION 01 // ROTATING & STATIC ASSETS
              </span>
            </div>

            {/* Headline with Vertical Clipping-Mask Reveal */}
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-grotesk font-extrabold uppercase tracking-tight text-white leading-[0.96]"
              >
                HEAVY INDUSTRIAL <span className="text-[#F01B25]">MACHINERY,</span> PIPING & ROTATING ASSETS.
              </motion.h1>
            </div>

            {/* Supporting Description with Staggered Upward Movement */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl font-outfit text-zinc-300 max-w-2xl font-light leading-relaxed"
            >
              Providing API 610/676 certified pumps, high-pressure gas compressors, and TEMA heat exchangers engineered for offshore drilling, refining, and severe process operations across MENA and worldwide.
            </motion.p>

            {/* Key Assurance Metric Pills */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-tech text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-[#F01B25]" /> API 610 / 618 / 676 Standard
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-tech text-zinc-300">
                <Award className="w-4 h-4 text-[#F01B25]" /> EN-ISO 10204 3.1 Certified
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-tech text-zinc-300">
                <Layers className="w-4 h-4 text-[#F01B25]" /> 22 Scope Product Lines
              </div>
            </motion.div>

            {/* Action Button Row */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={onScrollToCategories}
                className="group px-8 py-4 rounded-xl bg-[#F01B25] hover:bg-white text-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#F01B25]/30 flex items-center gap-2.5 cursor-pointer"
              >
                <span>EXPLORE 3 CORE CATEGORIES</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={onOpenQuote}
                className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                REQUEST DIRECT RFQ
              </button>
            </motion.div>
          </div>

          {/* Right Column: Hero Interactive Visual with Scale & Cursor-Responsive Tilt */}
          <div className="lg:col-span-5">
            <motion.div
              ref={visualRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg) translateZ(10px)`,
                transition: 'transform 0.15s ease-out'
              }}
              className="relative aspect-[4/5] sm:aspect-square w-full rounded-3xl overflow-hidden bg-zinc-900 border border-white/15 shadow-2xl group cursor-pointer"
            >
              <img
                src="/images/mechanical/centrifugal-pumps.webp"
                alt="Tech Ener-G Industrial Mechanical Equipment"
                className="w-full h-full object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* High-tech HUD Vignette & Blueprint Lines */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

              {/* Technical Reticle / HUD Elements */}
              <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-ping" />
                <span className="text-[10px] font-mono-tech text-white font-bold tracking-widest uppercase">
                  ACTIVE ENGINEERING SPEC
                </span>
              </div>

              <div className="absolute top-5 right-5 text-[10px] font-mono-tech text-zinc-400 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                P&ID CLASS A1
              </div>

              {/* Bottom Visual Tag */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                <div className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25]" />
                  <span>CORE INDUSTRIAL ASSETS</span>
                </div>
                <div className="text-xl sm:text-2xl font-grotesk font-extrabold uppercase">
                  PUMPS • COMPRESSORS • HEAT EXCHANGERS
                </div>
                <p className="text-xs font-outfit text-zinc-300 font-light line-clamp-2">
                  Engineered for maximum lifecycle durability in severe operating conditions.
                </p>
              </div>

              {/* Interactive Hover Border Accent */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#F01B25]/60 rounded-3xl transition-colors duration-500 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
