import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ShieldCheck, Award, Layers, Wrench, CheckCircle2, ChevronRight, FileText, PhoneCall } from 'lucide-react';
import { DivisionItem } from '../DivisionModal';
import { MECHANICAL_CATEGORIES, MechanicalCategory, MechanicalProduct } from '../../data/mechanicalDivisionData';
import { MechanicalHero } from './MechanicalHero';
import { CategoryCard } from './CategoryCard';
import { CategoryDetailView } from './CategoryDetailView';
import { ClientLogoMarquee } from './ClientLogoMarquee';

interface MechanicalDivisionExperienceProps {
  division: DivisionItem;
  onBack: () => void;
  onOpenQuote: (productTitle?: string) => void;
}

export const MechanicalDivisionExperience: React.FC<MechanicalDivisionExperienceProps> = ({
  division,
  onBack,
  onOpenQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MechanicalCategory | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Scroll to categories on CTA click
  const scrollToCategories = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to top whenever category view changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  // Handle category selection with pushState for browser back button support
  const handleSelectCategory = (cat: MechanicalCategory) => {
    setSelectedCategory(cat);
    try {
      window.history.pushState({ mechanicalCategory: cat.id }, '', `/division/mechanical-division?category=${cat.id}`);
    } catch (e) {
      // Fallback if sandboxed
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    try {
      window.history.pushState(null, '', '/division/mechanical-division');
    } catch (e) {
      // Fallback
    }
  };

  // Browser back button popstate listener
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;
      if (state && state.mechanicalCategory) {
        const found = MECHANICAL_CATEGORIES.find((c) => c.id === state.mechanicalCategory);
        if (found) setSelectedCategory(found);
      } else {
        setSelectedCategory(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div
      ref={containerRef}
      id="division-detail-scroll-container"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      className="fixed inset-0 z-[100] w-full h-full bg-[#050505] text-zinc-900 font-outfit overflow-y-auto overscroll-contain selection:bg-[#F01B25] selection:text-white"
    >
      {/* 1. Cinematic Page Opening Hero Sequence */}
      <MechanicalHero
        onBackToDivisions={onBack}
        onOpenQuote={() => onOpenQuote('Mechanical Division')}
        onScrollToCategories={scrollToCategories}
      />

      {/* Main Dynamic Workspace Area */}
      <div className="bg-[#FAFBFB] text-zinc-900 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 sm:py-24 space-y-24">
          {/* A. If a category is selected -> Render Category Detail View with Products */}
          {selectedCategory ? (
            <CategoryDetailView
              category={selectedCategory}
              onBackToCategories={handleBackToCategories}
              onOpenQuote={onOpenQuote}
            />
          ) : (
            /* B. Default Category Overview: 3 Core Cards with Premium Hover Effects */
            <div ref={categoriesRef} className="space-y-12">
              <div className="space-y-4 border-b border-zinc-200 pb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F01B25] animate-pulse" />
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] uppercase tracking-widest">
                    CORE MECHANICAL EQUIPMENT PILLARS
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-3xl sm:text-5xl font-grotesk font-extrabold text-zinc-950 uppercase tracking-tight leading-[0.98]">
                      CHOOSE A MECHANICAL CATEGORY
                    </h2>
                    <p className="text-base font-outfit text-zinc-600 max-w-2xl leading-relaxed pt-2 font-normal">
                      Click any equipment pillar to explore complete technical parameters, operational specifications, and sub-type catalogs.
                    </p>
                  </div>
                  <span className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider font-semibold">
                    3 Specialized Categories • 22 Product Lines
                  </span>
                </div>
              </div>

              {/* 3 Main Category Cards (Pumps, Compressors, Heat Exchangers) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MECHANICAL_CATEGORIES.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    index={index}
                    onSelect={handleSelectCategory}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 8. Dedicated Client Logo Showcase — Continuous Gliding Marquee */}
          <ClientLogoMarquee />

          {/* 9. Comprehensive Scope & Standards Breakdown */}
          <section className="space-y-10 border-t border-zinc-200 pt-16">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F01B25] animate-pulse" />
                <span className="text-xs font-mono-tech font-bold text-[#F01B25] uppercase tracking-widest">
                  GLOBAL SOURCING & FABRICATION BRIDGES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-grotesk font-extrabold text-zinc-950 uppercase tracking-tight">
                CERTIFIED ENGINEERING STANDARDS & PROTOCOLS
              </h2>
              <p className="text-sm sm:text-base font-outfit text-zinc-600 max-w-3xl leading-relaxed">
                Every mechanical asset procured through Tech Ener-G Trading FZE adheres to the strictest global manufacturing specifications and international quality certifications.
              </p>
            </div>

            {/* Standards & Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-2xl bg-white border border-zinc-200/90 shadow-sm hover:border-[#F01B25]/60 hover:shadow-xl transition-all duration-300 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F01B25]/10 text-[#F01B25] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-grotesk font-extrabold uppercase text-zinc-950">
                  API & ASME COMPLIANT
                </h3>
                <p className="text-xs sm:text-sm font-outfit text-zinc-600 leading-relaxed font-light">
                  Built to API 610, API 617, API 618, API 676, and ASME Boiler & Pressure Vessel Code Sec VIII Div 1 & 2 for high pressure hydrocarbon service.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-zinc-200/90 shadow-sm hover:border-[#F01B25]/60 hover:shadow-xl transition-all duration-300 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F01B25]/10 text-[#F01B25] flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-grotesk font-extrabold uppercase text-zinc-950">
                  EN-ISO 10204 3.1 MTR
                </h3>
                <p className="text-xs sm:text-sm font-outfit text-zinc-600 leading-relaxed font-light">
                  100% full material heat traceability, chemical composition verification, hydrostatic test certificates, and third-party Lloyd's/DNV witness reports.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-zinc-200/90 shadow-sm hover:border-[#F01B25]/60 hover:shadow-xl transition-all duration-300 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F01B25]/10 text-[#F01B25] flex items-center justify-center font-bold">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-grotesk font-extrabold uppercase text-zinc-950">
                  CUSTOM SIZING & RETROFIT
                </h3>
                <p className="text-xs sm:text-sm font-outfit text-zinc-600 leading-relaxed font-light">
                  Our application engineering team provides customized hydraulic sizing, thermal calculations, and reverse-engineered legacy replacements for obsolete machinery.
                </p>
              </div>
            </div>

            {/* Bottom Call to Action Banner */}
            <div className="p-8 sm:p-12 rounded-3xl bg-[#080808] text-white border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                  DIRECT ENGINEERING INQUIRY
                </div>
                <h3 className="text-2xl sm:text-4xl font-grotesk font-extrabold uppercase tracking-tight">
                  NEED ADVANCED SIZING OR CUSTOM PROCUREMENT?
                </h3>
                <p className="text-sm font-outfit text-zinc-400 font-light leading-relaxed">
                  Connect directly with Tech Ener-G's engineering sales team for comprehensive technical datasheets, MTR documentation, and rapid commercial quotations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
                <button
                  onClick={() => onOpenQuote('Mechanical Division Engineering RFP')}
                  className="px-8 py-4 rounded-xl bg-[#F01B25] hover:bg-white text-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#F01B25]/30 flex items-center gap-2 cursor-pointer"
                >
                  <span>REQUEST QUOTATION</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/971502737026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#F01B25]" />
                  <span>DIRECT WHATSAPP</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
