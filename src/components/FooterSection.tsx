import React from 'react';
import { Mail, PhoneCall, MapPin, ArrowUpRight, MessageSquare, ShieldCheck, Globe, Building2 } from 'lucide-react';
import { StaggeredText } from './StaggeredText';

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
  return (
    <footer id="footer" className="relative bg-gradient-to-b from-[#060305] via-[#16060c] to-[#040203] animate-mesh-bg text-white border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Animated Color-Shifting Ambient Glow Orbs */}
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-[#F01B25]/20 rounded-full blur-[170px] pointer-events-none animate-orb-1" />
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-[#7A000A]/20 rounded-full blur-[150px] pointer-events-none animate-orb-2" />
      <div className="absolute inset-0 grid-bg-overlay opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
        {/* Massive Editorial Final Call to Action */}
        <div className="space-y-6 max-w-5xl border-b border-white/10 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F01B25]/10 border border-[#F01B25]/30 text-[#F01B25] font-mono-tech text-xs uppercase font-bold">
            06 / INITIATE ENGAGEMENT
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.95]">
            <StaggeredText text="CUT COST, NOT THE QUALITY." staggerDelay={0.08} />
          </h2>

          <p className="text-base text-zinc-300 max-w-2xl font-outfit font-light leading-relaxed">
            Partner with Tech Ener-G Trading FZE. Discover how our commitment to technical excellence and global manufacturer bridges can optimize your energy and industrial supply chain.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenContact}
              className="px-8 py-3.5 rounded-lg bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 red-glow shadow-xl shadow-[#F01B25]/30 flex items-center gap-2.5"
            >
              <span>CONTACT OUR TEAM</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenQuote}
              className="px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
            >
              <span>REQUEST A QUOTE</span>
            </button>

            <a
              href="https://wa.me/971568939519"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/15 text-white font-mono-tech text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#F01B25]" />
              <span>Direct WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Multi-Column Architectural Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/10 pb-16">
          {/* Column 1: Company Profile & HQ Address */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-md">
                <img src="/logo.png" alt="Tech Ener-G Logo" className="h-7 w-auto object-contain filter brightness-110" />
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
                <a href="#" className="hover:text-[#F01B25] transition-colors flex items-center gap-1">
                  // HOME
                </a>
              </li>
              <li>
                <button onClick={onOpenAbout} className="hover:text-[#F01B25] transition-colors flex items-center gap-1 text-left">
                  // ABOUT US
                </button>
              </li>
              <li>
                <a href="#divisions" className="hover:text-[#F01B25] transition-colors flex items-center gap-1">
                  // DIVISIONS
                </a>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-[#F01B25] transition-colors flex items-center gap-1 text-left">
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
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectDivision('mechanical')}>
                • Mechanical Division
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectDivision('instrumentation')}>
                • Instrumentation & Fluid Solutions
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectDivision('flow-control')}>
                • Flow Control Division
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectDivision('electrical-inst')}>
                • Electrical & Instrumentation
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectDivision('filtration')}>
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
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center">
                <img src="/comp1.png" alt="Associate Partner 1" className="h-10 w-auto object-contain filter brightness-110" />
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center">
                <img src="/comp2.png" alt="Associate Partner 2" className="h-10 w-auto object-contain filter brightness-110" />
              </div>
            </div>
          </div>
        </div>

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
