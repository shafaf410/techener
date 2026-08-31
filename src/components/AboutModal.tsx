import React from 'react';
import { X, ArrowUpRight, ShieldCheck, Globe2, Cpu, Wrench } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onOpenQuote }) => {
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
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl rounded-3xl bg-[#0A0A0A] border border-white/15 p-6 sm:p-10 md:p-14 shadow-2xl space-y-10 max-h-[90vh] overflow-y-auto z-10 red-border-glow"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#F01B25] transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Tag with Logo Icon */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 rounded-md bg-white shadow-md border border-white/20">
                  <img src="/logo.png" alt="Tech Ener-G Logo" className="h-5 w-auto object-contain" />
                </div>
                <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                  ABOUT TECH ENER-G TRADING FZE
                </span>
              </div>
              <span className="text-xs font-mono-tech text-zinc-400">ESTABLISHED 2021 | UAE & GLOBAL</span>
            </div>

            {/* Monumental Headline in Pure White */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.95]">
                CUT COST, <br />
                <span className="text-white">NOT THE QUALITY.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <p className="text-base font-outfit text-zinc-200 leading-relaxed font-light">
                    Established in 2021, <strong className="text-white font-semibold">Tech Ener-G Trading FZE (TET)</strong> has emerged as a premier supplier serving Power Generation, Oil & Gas, and major industrial sectors across the UAE, MENA region, Africa, Asia, and Europe.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <p className="text-base font-outfit text-zinc-200 leading-relaxed font-light">
                    Backed by a team of qualified engineers, we bridge global equipment manufacturers with regional end-users, providing technical expertise, trusted vendor sourcing, and end-to-end industrial supply chain efficiency.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Glass Metric Pills */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#F01B25] shrink-0" />
                <div>
                  <div className="text-sm font-grotesk font-bold text-white uppercase">20,000+</div>
                  <div className="text-[10px] font-outfit text-zinc-400">Items Available</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3">
                <Globe2 className="w-5 h-5 text-[#F01B25] shrink-0" />
                <div>
                  <div className="text-sm font-grotesk font-bold text-white uppercase">MENA & Global</div>
                  <div className="text-[10px] font-outfit text-zinc-400">Supply Network</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3">
                <Cpu className="w-5 h-5 text-[#F01B25] shrink-0" />
                <div>
                  <div className="text-sm font-grotesk font-bold text-white uppercase">Engineered</div>
                  <div className="text-[10px] font-outfit text-zinc-400">Flow Control</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3">
                <Wrench className="w-5 h-5 text-[#F01B25] shrink-0" />
                <div>
                  <div className="text-sm font-grotesk font-bold text-white uppercase">24/7 Service</div>
                  <div className="text-[10px] font-outfit text-zinc-400">Technical Support</div>
                </div>
              </div>
            </div>

            {/* CTA Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15">
              <div className="text-xs font-mono-tech text-zinc-400">
                Ready to initiate procurement?
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="px-7 py-3 rounded-lg bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 flex items-center gap-2 shadow-xl shadow-[#F01B25]/30"
              >
                <span>Request Quotation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
