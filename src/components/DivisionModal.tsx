import React from 'react';
import { X, ArrowUpRight, ShieldCheck, FileText, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DivisionItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  items: string[];
}

interface DivisionModalProps {
  division: DivisionItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: (divisionTitle?: string) => void;
}

export const DivisionModal: React.FC<DivisionModalProps> = ({
  division,
  isOpen,
  onClose,
  onOpenQuote,
}) => {
  if (!isOpen || !division) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-white text-zinc-900 w-full h-full min-h-screen overflow-y-auto selection:bg-[#F01B25] selection:text-white flex flex-col justify-between"
        >
          {/* Top Full-Page Header */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-zinc-200 py-4 px-6 md:px-12 shadow-sm">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-[#F01B25] text-white font-mono-tech text-xs font-bold uppercase">
                  DIVISION {division.number}
                </span>
                <span className="text-xs font-mono-tech text-zinc-500 uppercase tracking-widest font-semibold">
                  TECH ENER-G CORE CAPABILITIES
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 hover:bg-[#F01B25] text-zinc-800 hover:text-white border border-zinc-200/90 transition-all duration-300 font-mono-tech text-xs font-bold uppercase cursor-pointer"
                aria-label="Close page"
              >
                <span>Close Page</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="max-w-[1400px] mx-auto w-full px-6 sm:px-10 md:px-12 py-10 md:py-14 space-y-10 flex-1">
            {/* Division Title & Tagline */}
            <div className="space-y-3 border-b border-zinc-200 pb-6">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-grotesk font-extrabold text-zinc-950 uppercase tracking-tight leading-tight">
                {division.title}
              </h1>
              <p className="text-lg sm:text-xl font-outfit text-[#F01B25] font-semibold">
                {division.tagline}
              </p>
            </div>

            {/* Hero Image Banner */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-zinc-200 shadow-md">
              <img
                src={division.image}
                alt={division.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm sm:text-base font-outfit text-zinc-100 max-w-2xl font-light leading-relaxed drop-shadow-md">
                  {division.description}
                </p>

                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/80 border border-white/20 backdrop-blur-md text-xs font-mono-tech text-white font-bold uppercase">
                  <ShieldCheck className="w-4 h-4 text-[#F01B25]" /> CERTIFIED INDUSTRIAL SUPPLY
                </div>
              </div>
            </div>

            {/* Scope of Supply List */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <div className="flex items-center gap-2 text-sm font-mono-tech font-bold text-zinc-950 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-[#F01B25]" /> Scope of Supply & Equipment List ({division.items.length} Categories)
                </div>
                <span className="text-xs font-mono-tech text-zinc-500 font-semibold">API / ASME & EN ISO COMPLIANT</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {division.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-[#F01B25]/50 transition-all duration-300 flex items-start gap-3 group"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#F01B25]/10 text-[#F01B25] font-mono-tech text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#F01B25] group-hover:text-white transition-colors">
                      {idx + 1}
                    </span>
                    <p className="text-base font-outfit font-medium text-zinc-800 group-hover:text-zinc-950 transition-colors leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action Footer */}
            <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-600 font-semibold">
                <FileText className="w-4 h-4 text-[#F01B25]" /> Need specific MTRs, datasheets or customized RFQ for {division.title}?
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenQuote(division.title);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F01B25] hover:bg-zinc-950 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#F01B25]/20 cursor-pointer"
              >
                <span>Request Division Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
