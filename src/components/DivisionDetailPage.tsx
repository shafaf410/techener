import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, FileText, Layers, Building2, PhoneCall, Mail, ChevronRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { DivisionItem } from './DivisionModal';

interface DivisionDetailPageProps {
  division: DivisionItem;
  onBack: () => void;
  onOpenQuote: (productTitle?: string) => void;
  onSelectOtherDivision: (division: DivisionItem) => void;
  allDivisions: DivisionItem[];
}

export const DivisionDetailPage: React.FC<DivisionDetailPageProps> = ({
  division,
  onBack,
  onOpenQuote,
  onSelectOtherDivision,
  allDivisions,
}) => {
  useEffect(() => {
    const container = document.getElementById('division-detail-scroll-container');
    if (container) {
      container.scrollTop = 0;
    }
  }, [division]);

  if (!division) return null;

  return (
    <div
      id="division-detail-scroll-container"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      className="fixed inset-0 z-[100] w-full h-full bg-[#050505] text-[#F4F4F4] font-outfit overflow-y-auto overscroll-contain"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen bg-[#050505]"
      >
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 py-4 px-6 md:px-12 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#F01B25] hover:bg-[#F01B25] text-white transition-all duration-300 text-xs font-mono-tech uppercase font-bold"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to All Divisions</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-mono-tech text-zinc-400 uppercase">
              TECH ENER-G DIVISIONS // 0{division.number}
            </span>
            <button
              onClick={() => onOpenQuote(division.title)}
              className="px-5 py-2.5 rounded-md bg-[#F01B25] hover:bg-white hover:text-black text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#F01B25]/20"
            >
              <span>Inquire For Division</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={division.image}
            alt={division.title}
            className="w-full h-full object-cover object-center opacity-25 filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-md bg-[#F01B25] text-white font-mono-tech text-xs font-bold uppercase tracking-wider">
              DIVISION {division.number}
            </span>
            <span className="text-xs font-mono-tech text-zinc-400 tracking-widest uppercase">
              TECH ENER-G CAPABILITY CATALOG
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.95] max-w-5xl drop-shadow-2xl">
            {division.title}
          </h1>

          <p className="text-xl sm:text-2xl font-outfit text-[#F01B25] font-semibold max-w-4xl">
            {division.tagline}
          </p>

          <p className="text-lg sm:text-xl font-outfit text-zinc-200 max-w-4xl leading-relaxed font-light pt-2">
            {division.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono-tech text-zinc-200">
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/5 border border-white/15 backdrop-blur-md">
              <ShieldCheck className="w-5 h-5 text-[#F01B25]" /> API / ASME / BS Standards Compliant
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/5 border border-white/15 backdrop-blur-md">
              <Award className="w-5 h-5 text-[#F01B25]" /> EN-ISO 10204 3.1 Certified
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/5 border border-white/15 backdrop-blur-md">
              <Layers className="w-5 h-5 text-[#F01B25]" /> {division.items.length} Scope Categories
            </div>
          </div>
        </div>
      </section>

      {/* Main Detailed Breakdown Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="space-y-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#F01B25] animate-pulse" />
            <span className="text-xs sm:text-sm font-mono-tech font-bold text-[#F01B25] uppercase tracking-widest">
              DETAILED SCOPE OF SUPPLY & EQUIPMENT SPECIFICATIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-grotesk font-extrabold text-white uppercase tracking-tight">
            COMPREHENSIVE EQUIPMENT INDEX
          </h2>
          <p className="text-base font-outfit text-zinc-300 max-w-3xl leading-relaxed">
            Tech Ener-G supplies genuine, certified industrial components across all categories under the {division.title}.
          </p>
        </div>

        {/* Equipment & Scope Cards Grid (Enlarged) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {division.items.map((item, index) => (
            <div
              key={index}
              className="group p-8 sm:p-10 rounded-3xl bg-[#0A0A0A] border border-white/15 hover:border-[#F01B25]/70 transition-all duration-300 space-y-6 flex flex-col justify-between hover:translate-y-[-4px] shadow-2xl red-border-glow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#F01B25]/20 text-[#F01B25] font-mono-tech text-sm font-black flex items-center justify-center group-hover:bg-[#F01B25] group-hover:text-white transition-colors">
                    0{index + 1}
                  </span>
                  <span className="text-xs font-mono-tech text-zinc-400 font-bold uppercase tracking-widest border border-white/10 px-3 py-1 rounded-md bg-white/5">
                    SPECIFICATION READY
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-grotesk font-extrabold text-white uppercase group-hover:text-[#F01B25] transition-colors leading-snug">
                  {item}
                </h3>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-2.5 text-sm font-outfit text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#F01B25] shrink-0" />
                  <span>Full Material & Mill Test Reports (MTR) Available</span>
                </div>

                <button
                  onClick={() => onOpenQuote(`${division.title} - ${item}`)}
                  className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-[#F01B25] border border-white/10 hover:border-[#F01B25] text-white font-mono-tech text-xs sm:text-sm font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md"
                >
                  <span>Request Specific Quote</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Division Technical Capability Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0A0A0A] border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center red-border-glow">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono-tech font-bold text-[#F01B25] uppercase tracking-widest">
              // TECHNICAL CONSULTATION & SOURCING
            </span>
            <h3 className="text-2xl sm:text-4xl font-grotesk font-extrabold text-white uppercase leading-tight">
              REQUIRE CUSTOM SPECIFICATIONS OR MILL TEST REPORTS FOR THIS DIVISION?
            </h3>
            <p className="text-sm font-outfit text-zinc-300 leading-relaxed max-w-2xl font-light">
              Our engineering support desk provides technical compliance verification, EN-ISO 10204 3.1 certification, third-party inspection reports (TPI), and rapid global procurement for the {division.title}.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <button
              onClick={() => onOpenQuote(division.title)}
              className="w-full py-4 rounded-xl bg-[#F01B25] hover:bg-white hover:text-black text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#F01B25]/30"
            >
              <span>Submit RFQ For {division.title}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="mailto:sales@techener-g.com"
              className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#F01B25]" />
              <span>sales@techener-g.com</span>
            </a>
          </div>
        </div>

        {/* Browse Other Divisions Footer Navigation */}
        <div className="space-y-6 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech font-bold text-zinc-400 uppercase tracking-widest">
              EXPLORE OTHER DIVISIONS
            </span>
            <button
              onClick={onBack}
              className="text-xs font-mono-tech text-[#F01B25] hover:underline uppercase"
            >
              View All 5 Divisions →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allDivisions
              .filter((d) => d.id !== division.id)
              .slice(0, 4)
              .map((otherDiv) => (
                <div
                  key={otherDiv.id}
                  onClick={() => onSelectOtherDivision(otherDiv)}
                  className="p-5 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-[#F01B25]/60 transition-all duration-300 cursor-pointer group space-y-2"
                >
                  <span className="text-[10px] font-mono-tech text-[#F01B25] font-bold uppercase">
                    DIVISION {otherDiv.number}
                  </span>
                  <h4 className="text-base font-grotesk font-bold text-zinc-300 group-hover:text-white uppercase transition-colors flex items-center justify-between">
                    <span>{otherDiv.title}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[#F01B25] transition-colors" />
                  </h4>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Bottom Footer Callout */}
      <footer className="py-12 bg-[#0A0A0A] border-t border-white/10 text-center space-y-4">
        <div className="text-xs font-mono-tech text-zinc-400">
          TECH ENER-G TRADING FZE • {division.title.toUpperCase()}
        </div>
        <p className="text-xs font-outfit text-zinc-500">
          Serving Power Generation, Oil & Gas, Petrochemicals & Heavy Manufacturing across MENA, Africa, Asia & Europe.
        </p>
      </footer>
    </motion.div>
  </div>
  );
};
