import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl =
    'https://wa.me/971502737026?text=Hello%20Tech%20Ener-G%20team%2C%20I%20have%20an%20inquiry%20regarding%20your%20industrial%20solutions.';

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex items-center gap-3 pointer-events-auto">
      {/* Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2 bg-[#101C2C] text-white px-3.5 py-2 rounded-xl shadow-2xl border border-white/10 text-xs font-mono-tech select-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span className="font-bold text-[#25D366]">WhatsApp Direct</span>
            <span className="text-zinc-400">|</span>
            <span className="text-zinc-200">+971 50 273 7026</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating WhatsApp Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/35 hover:shadow-2xl hover:shadow-[#25D366]/50 transition-all cursor-pointer group"
        aria-label="Direct WhatsApp Chat with Tech Ener-G"
      >
        {/* Ambient Pulsing Radar Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        {/* Official WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 fill-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.83.493 3.555 1.353 5.048L2 22l5.056-1.325a9.98 9.98 0 004.975 1.356c5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2zm0 18.281a8.23 8.23 0 01-4.204-1.15l-.302-.18-3.125.82.834-3.045-.197-.314A8.204 8.204 0 013.78 12.03c0-4.55 3.7-8.25 8.25-8.25s8.25 3.7 8.25 8.25-3.7 8.251-8.25 8.251zm4.52-6.183c-.247-.124-1.464-.723-1.691-.806-.228-.082-.394-.124-.56.124-.165.248-.642.806-.787.971-.144.165-.289.186-.537.062-.248-.124-1.047-.386-1.995-1.231-.738-.658-1.237-1.472-1.381-1.72-.145-.248-.016-.381.108-.504.112-.11.248-.289.372-.434.124-.145.165-.248.248-.413.082-.165.041-.31-.021-.434-.062-.124-.56-1.35-.766-1.849-.202-.486-.407-.42-.56-.428-.144-.008-.31-.01-.475-.01-.166 0-.435.062-.663.31-.227.248-.868.848-.868 2.068s.889 2.399 1.013 2.564c.124.165 1.75 2.672 4.24 3.746.592.256 1.054.409 1.415.524.595.19 1.137.163 1.565.099.477-.072 1.464-.599 1.67-1.178.207-.579.207-1.074.145-1.178-.062-.104-.228-.166-.475-.29z" />
        </svg>
      </motion.a>
    </div>
  );
};

