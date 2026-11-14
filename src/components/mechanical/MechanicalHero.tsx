import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-zinc-900 border-b border-zinc-200 overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Top Action & Breadcrumb Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDivisions}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 hover:bg-[#F01B25] text-zinc-800 hover:text-white transition-all text-xs font-mono-tech uppercase font-bold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Divisions</span>
            </button>

            {/* Breadcrumb matching mockup: — Home / Divisions / Mechanical */}
            <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-500 font-semibold tracking-wider">
              <span className="text-[#F01B25] font-black">—</span>
              <span>Home</span>
              <span className="text-zinc-300">/</span>
              <span>Divisions</span>
              <span className="text-zinc-300">/</span>
              <span className="text-zinc-900 font-bold">Mechanical</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-mono-tech text-zinc-400 uppercase tracking-widest font-semibold">
              DIVISION 01 // ROTATING & STATIC ASSETS
            </span>
            <button
              onClick={onOpenQuote}
              className="px-5 py-2 rounded-full bg-[#F01B25] hover:bg-zinc-950 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-[#F01B25]/20 cursor-pointer"
            >
              <span>Request Quote / RFQ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main 2-Column Hero: Typography & Slanted Industrial Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 sm:pt-12">
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-grotesk font-black uppercase tracking-tight text-zinc-950 leading-[0.95]"
              >
                MECHANICAL <br />
                <span className="text-[#4A607A] font-extrabold">ENGINEERING SOLUTIONS.</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg font-outfit text-zinc-600 max-w-xl font-normal leading-relaxed pl-4 border-l-2 border-zinc-300"
            >
              Comprehensive mechanical equipment solutions designed to support industrial operations through reliable products, technical expertise, and global sourcing partnerships.
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={onScrollToCategories}
              className="pt-4 flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="w-5 h-8 rounded-full border-2 border-zinc-400 group-hover:border-[#F01B25] flex items-start justify-center p-1 transition-colors">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-[#F01B25] transition-colors"
                />
              </div>
              <span className="text-xs font-mono-tech text-zinc-500 group-hover:text-zinc-950 uppercase tracking-widest font-semibold transition-colors">
                Scroll to explore
              </span>
            </motion.div>
          </div>

          {/* Right Column: Industrial Equipment Showcase with Diagonal Slanted Cut */}
          <div
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-200/90 shadow-2xl bg-zinc-100 group"
              style={{
                clipPath: 'polygon(6% 0%, 100% 0%, 100% 100%, 0% 100%)',
              }}
            >
              <img
                src="/images/rotating_equipment.jpg"
                alt="Mechanical Engineering Solutions"
                className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out ${
                  isHovered ? 'scale-108' : 'scale-102'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Technical Badge */}
              <div className="absolute bottom-5 left-8 right-6 flex items-center justify-between text-white text-xs font-mono-tech">
                <span className="px-3 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 font-bold uppercase tracking-wider">
                  HEAVY INDUSTRIAL ROTATING ASSETS
                </span>
                <span className="text-zinc-300 font-semibold hidden sm:inline-block">
                  API 610 / 617 / ASME VIII
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
