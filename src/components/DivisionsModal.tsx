import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Layers, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DivisionItem } from './DivisionModal';
import { DIVISIONS_DATA } from './DivisionsSection';

interface DivisionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDivision: (division: DivisionItem) => void;
}

export const DivisionsModal: React.FC<DivisionsModalProps> = ({
  isOpen,
  onClose,
  onSelectDivision,
}) => {
  const [activeDivision, setActiveDivision] = useState<DivisionItem>(DIVISIONS_DATA[0]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl rounded-3xl bg-[#0A0A0A] border border-white/15 p-6 sm:p-10 md:p-14 shadow-2xl space-y-10 max-h-[92vh] overflow-y-auto z-10 red-border-glow text-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#F01B25] transition-colors focus:outline-none z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded-md bg-white shadow-md border border-white/20">
                    <img src="/logo.png" alt="Tech Ener-G Logo" className="h-5 w-auto object-contain" />
                  </div>
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    03 / TECH ENER-G DIVISIONS
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight">
                  OUR 5 CORE <br />
                  <span className="text-[#F01B25]">INDUSTRIAL DIVISIONS.</span>
                </h2>
              </div>
              <p className="text-sm font-outfit text-zinc-300 max-w-md leading-relaxed">
                Tech Ener-G operates across 5 specialized divisions supplying certified equipment, precision instrumentation, flow control, electrical systems, and filtration technologies.
              </p>
            </div>

            {/* Interactive Divisions Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left List of 5 Divisions */}
              <div className="lg:col-span-7 space-y-3">
                <div className="divide-y divide-white/10 border-t border-b border-white/10">
                  {DIVISIONS_DATA.map((division) => (
                    <div
                      key={division.id}
                      onMouseEnter={() => setActiveDivision(division)}
                      onClick={() => {
                        onClose();
                        onSelectDivision(division);
                      }}
                      className={`group py-4 px-4 sm:px-5 cursor-pointer transition-all duration-300 flex items-center justify-between rounded-xl ${
                        activeDivision.id === division.id
                          ? 'bg-white/10 border-l-4 border-l-[#F01B25] pl-6'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className="font-mono-tech text-sm font-bold text-[#F01B25]">
                          {division.number}
                        </span>
                        <div>
                          <h3
                            className={`font-grotesk text-base sm:text-lg font-bold uppercase transition-all duration-300 ${
                              activeDivision.id === division.id
                                ? 'text-white translate-x-1'
                                : 'text-zinc-300 group-hover:text-white'
                            }`}
                          >
                            {division.title}
                          </h3>
                          <p className="text-xs font-outfit text-zinc-400 group-hover:text-zinc-300 transition-colors line-clamp-1 mt-0.5">
                            {division.items.length} Scope Categories • {division.items[0]}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="hidden sm:inline-block text-[10px] font-mono-tech text-zinc-400 group-hover:text-[#F01B25] uppercase transition-colors font-semibold">
                          VIEW PAGE
                        </span>
                        <ArrowUpRight
                          className={`w-5 h-5 transition-all duration-300 ${
                            activeDivision.id === division.id
                              ? 'text-[#F01B25] opacity-100 translate-x-1 -translate-y-1'
                              : 'text-zinc-500 opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Live Image-Centric Division Preview Box */}
              <div className="lg:col-span-5">
                <div className="relative h-[440px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl red-border-glow flex flex-col justify-between p-6 group">
                  {/* Animated Background Image */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeDivision.id}
                      src={activeDivision.image}
                      alt={activeDivision.title}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full object-cover object-center transform-gpu transition-transform duration-700 group-hover:scale-105"
                    />
                  </AnimatePresence>

                  {/* Gradient Vignette Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/30 pointer-events-none" />

                  {/* Floating Top Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse" />
                      <span className="text-[11px] font-mono-tech text-white font-bold tracking-wider uppercase">
                        DIVISION {activeDivision.number}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono-tech bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-white uppercase font-semibold border border-white/15">
                      PREVIEW
                    </span>
                  </div>

                  {/* Floating Bottom Content Overlay */}
                  <div className="relative z-10 space-y-4 pt-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                        TECH ENER-G DIVISION
                      </span>
                      <h3 className="text-2xl font-grotesk font-extrabold text-white uppercase leading-tight drop-shadow-lg">
                        {activeDivision.title}
                      </h3>
                    </div>

                    <p className="text-xs font-outfit text-zinc-200 leading-relaxed font-light line-clamp-2">
                      {activeDivision.description}
                    </p>

                    {/* Scope Highlights Preview */}
                    <div className="space-y-1.5 pt-3 border-t border-white/15">
                      <div className="text-[10px] font-mono-tech text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-[#F01B25]" /> Scope Highlights ({activeDivision.items.length} Total):
                      </div>
                      <ul className="grid grid-cols-1 gap-1">
                        {activeDivision.items.slice(0, 3).map((item, i) => (
                          <li key={i} className="text-xs font-outfit text-zinc-200 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F01B25] shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Open Division Page Button */}
                    <button
                      onClick={() => {
                        onClose();
                        onSelectDivision(activeDivision);
                      }}
                      className="w-full py-3 rounded-xl bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#F01B25]/30 active:scale-95"
                    >
                      <span>Open Division Page & Specs</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/15 text-xs font-mono-tech text-zinc-400">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F01B25]" />
                All 5 divisions backed by ISO 9001 quality compliance.
              </span>
              <span>SELECT A DIVISION TO VIEW FULL SPECIFICATIONS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
