import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { AboutConfig, TimelineMilestone } from '../../types/about';

interface AboutTimelineSectionProps {
  config: AboutConfig;
}

export const AboutTimelineSection: React.FC<AboutTimelineSectionProps> = ({ config }) => {
  const { timeline } = config;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMilestone = timeline.milestones[activeIndex] || timeline.milestones[0];

  // Split the year into prefix and suffix for the signature two-tone oversized year display matching reference
  const getYearParts = (yearStr: string) => {
    if (yearStr.length === 4) {
      return {
        prefix: yearStr.slice(0, 2),
        suffix: yearStr.slice(2),
      };
    }
    return {
      prefix: '',
      suffix: yearStr,
    };
  };

  const { prefix, suffix } = getYearParts(activeMilestone.year);

  return (
    <section className="w-full bg-[#070707] text-white py-20 sm:py-28 px-6 md:px-12 border-b border-white/10 relative overflow-hidden">
      {/* Background ambient red glow */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#F01B25]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Main Journey Stage matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center justify-between">
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-6 bg-[#F01B25]" />
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                {timeline.eyebrow}
              </span>
            </div>

            <h3 className="text-4xl sm:text-6xl lg:text-7xl font-grotesk font-extrabold uppercase tracking-tight text-white leading-[0.92]">
              {timeline.title}
            </h3>

            {/* Active Milestone Card with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className="p-7 rounded-2xl bg-[#121212] border border-white/10 space-y-3 max-w-xl"
              >
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-[#F01B25] uppercase tracking-wider">
                  <Calendar className="w-4 h-4" />
                  <span>MILESTONE: {activeMilestone.year}</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-grotesk font-extrabold text-white uppercase tracking-tight">
                  {activeMilestone.title}
                </h4>
                <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-normal">
                  {activeMilestone.summary}
                </p>
                {activeMilestone.highlight && (
                  <div className="pt-2 text-xs font-mono-tech text-zinc-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25]" />
                    <span>{activeMilestone.highlight}</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Next / Previous Controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev > 0 ? prev - 1 : timeline.milestones.length - 1))
                }
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono-tech uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                ← Prev Year
              </button>
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev < timeline.milestones.length - 1 ? prev + 1 : 0))
                }
                className="px-5 py-2 rounded-full bg-[#F01B25] hover:bg-red-600 text-white text-xs font-mono-tech uppercase font-bold tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Milestone</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Signature Oversized Two-Tone Year Display matching reference image */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end select-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.year}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-8xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-grotesk font-extrabold tracking-tighter leading-none flex items-center"
              >
                {prefix && (
                  <span className="text-zinc-800 font-outline-subtle text-stroke-zinc">
                    {prefix}
                  </span>
                )}
                <span className="text-[#F01B25] drop-shadow-[0_0_50px_rgba(240,27,37,0.35)]">
                  {suffix}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Horizontal Interactive Timeline Navigator Bar matching reference */}
        <div className="pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
            {timeline.milestones.map((m, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={m.year}
                  onClick={() => setActiveIndex(idx)}
                  className={`py-3.5 px-4 rounded-xl border font-mono-tech text-xs sm:text-sm font-bold uppercase transition-all duration-200 cursor-pointer text-center ${
                    isActive
                      ? 'bg-[#F01B25] text-white border-[#F01B25] shadow-lg shadow-[#F01B25]/30'
                      : 'bg-[#111111] text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="tracking-widest">{m.year}</div>
                  <div className="text-[10px] font-normal truncate mt-0.5 opacity-80">
                    {m.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
