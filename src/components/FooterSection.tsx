import React, { useState } from 'react';
import { Mail, PhoneCall, MapPin, ArrowUpRight, MessageSquare, ShieldCheck, Globe, Building2, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterSectionProps {
  onOpenQuote: () => void;
  onOpenContact: () => void;
  onOpenAbout: () => void;
  onSelectDivision: (divisionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenQuote,
  onOpenContact,
  onOpenAbout,
  onSelectDivision,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const tickerItems = [
    'TECH ENER-G TRADING FZE',
    'GLOBAL INDUSTRIAL PIPING & VALVES',
    'API 6D / ASME B16.34 CERTIFIED',
    'EXECUTIVE TOWER B1 • AJMAN FREE ZONE • UAE',
    'OIL & GAS • PETROCHEMICAL • POWER • MARINE',
    'DIRECT OEM SOURCING & ROTATING EQUIPMENT',
    '24/7 TECHNICAL ADVISORY & RAPID LOGISTICS',
  ];

  return (
    <footer
      id="footer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-gradient-to-b from-[#060305] via-[#14050a] to-[#040203] animate-mesh-bg text-white border-t border-white/10 pb-12 overflow-hidden transition-colors duration-500"
    >
      {/* 1. Continuous High-Tech Sliding Laser Beam at top transition boundary */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none z-20">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#F01B25] to-transparent animate-sliding-laser opacity-90 shadow-[0_0_15px_#F01B25]" />
      </div>

      {/* 2. Interactive Cursor-Tracking Hover Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 z-0"
        style={{
          opacity: isHovered ? 1 : 0.35,
          background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(240, 27, 37, 0.14), transparent 65%)`,
        }}
      />

      {/* 3. Ambient Flowing Glow Orbs & Technical Grid */}
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-[#F01B25]/20 rounded-full blur-[170px] pointer-events-none animate-orb-1" />
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-[#7A000A]/20 rounded-full blur-[150px] pointer-events-none animate-orb-2" />
      <div className="absolute inset-0 grid-bg-overlay opacity-30 pointer-events-none" />

      {/* 4. Sliding Kinetic Ticker Ribbon directly beneath the section boundary */}
      <div className="w-full border-b border-white/10 bg-black/40 backdrop-blur-md overflow-hidden py-3 mb-16 select-none relative z-10">
        <div className="animate-marquee-infinite flex items-center gap-10 whitespace-nowrap font-mono-tech text-[11px] font-semibold text-zinc-400 tracking-widest">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div key={index} className="flex items-center gap-10">
              <span className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25] shadow-[0_0_8px_#F01B25]" />
                {item}
              </span>
              <span className="text-zinc-600 font-light">//</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
        {/* Massive Editorial Final Call to Action with Scroll & Hover Sliding Animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-5xl border-b border-white/10 pb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F01B25]/10 border border-[#F01B25]/30 text-[#F01B25] font-mono-tech text-xs uppercase font-bold tracking-wider backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-ping" />
            // PARTNER WITH TECH ENER-G
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-grotesk font-extrabold uppercase tracking-tight leading-[0.95] cursor-default hover-sheen-headline transition-all duration-300">
            POWERING INDUSTRY. DELIVERING EXCELLENCE.
          </h2>

          <p className="text-base text-zinc-300 max-w-2xl font-outfit font-light leading-relaxed">
            Partner with Tech Ener-G Trading FZE. Discover how our commitment to technical excellence and global manufacturer bridges can optimize your energy and industrial supply chain.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Action Button with Sliding Sheen Effect */}
            <button
              onClick={onOpenContact}
              className="relative overflow-hidden group px-8 py-3.5 rounded-lg bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 red-glow shadow-xl shadow-[#F01B25]/30 flex items-center gap-2.5"
            >
              {/* Sliding Light Sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
              <span className="relative z-10">CONTACT OUR TEAM</span>
              <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Secondary Action Button with Sliding Glare */}
            <button
              onClick={onOpenQuote}
              className="relative overflow-hidden group px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
              <span className="relative z-10">REQUEST A QUOTE</span>
            </button>

            {/* WhatsApp Direct Action Button */}
            <a
              href="https://wa.me/971568939519"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/15 text-white font-mono-tech text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#F01B25]/30 to-transparent -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
              <MessageSquare className="w-4 h-4 text-[#F01B25] relative z-10" />
              <span className="relative z-10">Direct WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* Multi-Column Architectural Footer Grid with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/10 pb-16"
        >
          {/* Column 1: Company Profile & HQ Address */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-md">
                <img
                  src="/logo-white.png"
                  alt="Tech Ener-G Logo"
                  className="h-5 w-auto object-contain"
                />
              </div>
              <span className="font-grotesk font-bold text-lg text-white uppercase tracking-tight">
                TECH ENER-G
              </span>
            </div>

            <p className="text-xs font-outfit text-zinc-400 leading-relaxed font-light">
              Bridging premier global valve & equipment manufacturers with energy, utility, and heavy process operators across MENA and worldwide.
            </p>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <div className="text-[11px] font-mono-tech text-[#F01B25] font-bold uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> GLOBAL HEADQUARTERS
              </div>
              <p className="text-xs font-outfit text-zinc-300 leading-relaxed">
                Tech Ener-G Trading FZE<br />
                Executive Office-B1-410 (F), Tower B1<br />
                Ajman Free Zone, Ajman, United Arab Emirates
              </p>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech text-zinc-400">
              <li>
                <a href="#" className="hover:text-[#F01B25] hover:translate-x-1 transition-all duration-200 flex items-center gap-1 inline-flex">
                  // HOME
                </a>
              </li>
              <li>
                <button onClick={onOpenAbout} className="hover:text-[#F01B25] hover:translate-x-1 transition-all duration-200 flex items-center gap-1 text-left inline-flex">
                  // ABOUT US
                </button>
              </li>
              <li>
                <a href="#divisions" className="hover:text-[#F01B25] hover:translate-x-1 transition-all duration-200 flex items-center gap-1 inline-flex">
                  // DIVISIONS
                </a>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-[#F01B25] hover:translate-x-1 transition-all duration-200 flex items-center gap-1 text-left inline-flex">
                  // CONTACT US
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: 5 Core Divisions */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
              OUR 5 CORE DIVISIONS
            </h4>
            <ul className="space-y-2 text-xs font-outfit text-zinc-400">
              <li className="hover:text-white hover:translate-x-1.5 transition-all duration-200 cursor-pointer flex items-center gap-1" onClick={() => onSelectDivision('mechanical')}>
                • Mechanical Division
              </li>
              <li className="hover:text-white hover:translate-x-1.5 transition-all duration-200 cursor-pointer flex items-center gap-1" onClick={() => onSelectDivision('instrumentation')}>
                • Instrumentation & Fluid Solutions
              </li>
              <li className="hover:text-white hover:translate-x-1.5 transition-all duration-200 cursor-pointer flex items-center gap-1" onClick={() => onSelectDivision('flow-control')}>
                • Flow Control Division
              </li>
              <li className="hover:text-white hover:translate-x-1.5 transition-all duration-200 cursor-pointer flex items-center gap-1" onClick={() => onSelectDivision('electrical-inst')}>
                • Electrical & Instrumentation
              </li>
              <li className="hover:text-white hover:translate-x-1.5 transition-all duration-200 cursor-pointer flex items-center gap-1" onClick={() => onSelectDivision('filtration')}>
                • Filtration Division
              </li>
            </ul>
          </div>

          {/* Column 4: Associate Partners */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
              OUR ASSOCIATES
            </h4>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#F01B25]/40 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center group">
                <img src="/comp1.png" alt="Associate Partner 1" className="h-10 w-auto object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300" />
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#F01B25]/40 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center group">
                <img src="/images/autel-logo-sito.svg" alt="Autel Logo" className="h-10 w-auto object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Legal & Compliance */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono-tech text-zinc-400">
          <div className="flex items-center gap-6">
            <span>© 2026 TECH ENER-G TRADING FZE</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F01B25]" /> ISO 9001:2015
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#F01B25]" /> UAE & GLOBAL SUPPLY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

