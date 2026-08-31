import React from 'react';
import { X, ArrowUpRight, CheckCircle2, ShieldCheck, FileText, Layers } from 'lucide-react';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl rounded-3xl bg-[#0A0A0A] border border-white/15 p-6 sm:p-10 md:p-12 shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto z-10 red-border-glow"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#F01B25] transition-colors focus:outline-none z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Eyebrow Header */}
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <div className="px-3 py-1 rounded-md bg-[#F01B25] text-white font-mono-tech text-xs font-bold uppercase">
              DIVISION {division.number}
            </div>
            <span className="text-xs font-mono-tech text-zinc-400 uppercase tracking-widest">
              TECH ENER-G CORE CAPABILITIES
            </span>
          </div>

          {/* Division Title & Tagline */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-tight">
              {division.title}
            </h2>
            <p className="text-sm sm:text-base font-outfit text-[#F01B25] font-semibold">
              {division.tagline}
            </p>
          </div>

          {/* Hero Image Banner */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/15 shadow-xl">
            <img
              src={division.image}
              alt={division.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs sm:text-sm font-outfit text-zinc-200 max-w-2xl font-light leading-relaxed drop-shadow-md">
                {division.description}
              </p>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/80 border border-white/20 backdrop-blur-md text-[11px] font-mono-tech text-white font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-[#F01B25]" /> CERTIFIED INDUSTRIAL SUPPLY
              </div>
            </div>
          </div>

          {/* Comprehensive Offerings / Equipment Breakdown List */}
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#F01B25]" /> Scope of Supply & Equipment List ({division.items.length} Categories)
              </div>
              <span className="text-xs font-mono-tech text-zinc-500">API / ASME & EN ISO COMPLIANT</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {division.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#F01B25]/50 transition-all duration-300 flex items-start gap-3 group"
                >
                  <span className="w-6 h-6 rounded-full bg-[#F01B25]/20 text-[#F01B25] font-mono-tech text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#F01B25] group-hover:text-white transition-colors">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-outfit font-medium text-zinc-200 group-hover:text-white transition-colors leading-relaxed">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Footer */}
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400">
              <FileText className="w-4 h-4 text-[#F01B25]" /> Need specific MTRs, datasheets or customized RFQ for {division.title}?
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenQuote(division.title);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F01B25] hover:bg-white hover:text-black text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#F01B25]/30 active:scale-95"
            >
              Request Division Quote
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
