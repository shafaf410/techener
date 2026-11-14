import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck, Award, Wrench, PhoneCall } from 'lucide-react';
import { DivisionItem } from '../DivisionModal';
import { MECHANICAL_CATEGORIES, MechanicalCategory } from '../../data/mechanicalDivisionData';
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
  // Default to Pumps category so the industrial pumps section with images is visible immediately
  const [selectedCategory, setSelectedCategory] = useState<MechanicalCategory>(MECHANICAL_CATEGORIES[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailSectionRef = useRef<HTMLDivElement>(null);

  // Initialize category from URL query param if present
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('category');
      if (catParam) {
        const found = MECHANICAL_CATEGORIES.find((c) => c.id === catParam);
        if (found) setSelectedCategory(found);
      }
    } catch (e) {
      // Fallback
    }
  }, []);

  // Browser back button popstate listener
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;
      if (state && state.mechanicalCategory) {
        const found = MECHANICAL_CATEGORIES.find((c) => c.id === state.mechanicalCategory);
        if (found) setSelectedCategory(found);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectCategory = (cat: MechanicalCategory) => {
    setSelectedCategory(cat);
    try {
      window.history.pushState({ mechanicalCategory: cat.id }, '', `/division/mechanical-division?category=${cat.id}`);
    } catch (e) {
      // Fallback
    }
    if (detailSectionRef.current) {
      detailSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToDetail = () => {
    if (detailSectionRef.current) {
      detailSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="division-detail-scroll-container"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      className="fixed inset-0 z-[100] w-full h-full bg-white text-zinc-900 font-outfit overflow-y-auto overscroll-contain selection:bg-[#F01B25] selection:text-white"
    >
      {/* 1. Cinematic Page Opening Hero Sequence (Light Industrial Aesthetic) */}
      <MechanicalHero
        onBackToDivisions={onBack}
        onOpenQuote={() => onOpenQuote('Mechanical Division')}
        onScrollToCategories={handleScrollToDetail}
      />

      {/* Main Content Area */}
      <div className="bg-white text-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 sm:py-16 space-y-20">
          
          {/* 2. SECTION 2 FROM MOCKUP: OUR MECHANICAL PORTFOLIO */}
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200/80 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                  <span className="font-black">—</span>
                  <span>OUR MECHANICAL PORTFOLIO</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-grotesk font-black uppercase tracking-tight text-zinc-950 max-w-2xl leading-tight">
                  Explore our range of mechanical equipment and engineered solutions for diverse industrial applications.
                </h2>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 self-start md:self-end">
                <button
                  onClick={() => {
                    const currentIndex = MECHANICAL_CATEGORIES.findIndex((c) => c.id === selectedCategory.id);
                    const prevIndex = (currentIndex - 1 + MECHANICAL_CATEGORIES.length) % MECHANICAL_CATEGORIES.length;
                    handleSelectCategory(MECHANICAL_CATEGORIES[prevIndex]);
                  }}
                  className="w-10 h-10 rounded-full border border-zinc-200 hover:border-[#F01B25] hover:bg-zinc-50 flex items-center justify-center transition-all cursor-pointer text-zinc-700"
                  aria-label="Previous Category"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const currentIndex = MECHANICAL_CATEGORIES.findIndex((c) => c.id === selectedCategory.id);
                    const nextIndex = (currentIndex + 1) % MECHANICAL_CATEGORIES.length;
                    handleSelectCategory(MECHANICAL_CATEGORIES[nextIndex]);
                  }}
                  className="w-10 h-10 rounded-full border border-zinc-200 hover:border-[#F01B25] hover:bg-zinc-50 flex items-center justify-center transition-all cursor-pointer text-zinc-700"
                  aria-label="Next Category"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3 Main Portfolio Cards (Pumps, Compressors, Heat Exchangers) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {MECHANICAL_CATEGORIES.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                  isSelected={selectedCategory.id === category.id}
                  onSelect={handleSelectCategory}
                />
              ))}
            </div>
          </section>

          {/* 3. SECTION 3 FROM MOCKUP: OUR PARTNERSHIPS / TRUSTED BY INDUSTRY LEADERS */}
          <ClientLogoMarquee />

          {/* 4. SECTION 4 FROM MOCKUP: CATEGORY DETAIL & 10 PRODUCTS WITH IMAGES */}
          <section ref={detailSectionRef}>
            <CategoryDetailView
              category={selectedCategory}
              onBackToCategories={() => {
                if (containerRef.current) {
                  containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onOpenQuote={onOpenQuote}
              onSelectCategory={handleSelectCategory}
            />
          </section>

          {/* 5. Engineering Standards & Quality Protocols */}
          <section className="space-y-10 border-t border-zinc-200 pt-16">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F01B25] animate-pulse" />
                <span className="text-xs font-mono-tech font-bold text-[#F01B25] uppercase tracking-widest">
                  GLOBAL SOURCING & FABRICATION BRIDGES
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-grotesk font-extrabold text-zinc-950 uppercase tracking-tight">
                CERTIFIED ENGINEERING STANDARDS & PROTOCOLS
              </h3>
              <p className="text-sm sm:text-base font-outfit text-zinc-600 max-w-3xl leading-relaxed">
                Every mechanical asset procured through Tech Ener-G Trading FZE adheres to the strictest global manufacturing specifications and international quality certifications.
              </p>
            </div>

            {/* Standards & Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-2xl bg-[#F8F9FA] border border-zinc-200/90 hover:border-[#F01B25]/60 hover:shadow-xl transition-all duration-300 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F01B25]/10 text-[#F01B25] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-grotesk font-extrabold uppercase text-zinc-950">
                  API & ASME COMPLIANT
                </h4>
                <p className="text-xs sm:text-sm font-outfit text-zinc-600 leading-relaxed font-light">
                  Built to API 610, API 617, API 618, API 676, and ASME Boiler & Pressure Vessel Code Sec VIII Div 1 & 2 for high pressure hydrocarbon service.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#F8F9FA] border border-zinc-200/90 hover:border-[#F01B25]/60 hover:shadow-xl transition-all duration-300 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F01B25]/10 text-[#F01B25] flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-grotesk font-extrabold uppercase text-zinc-950">
                  EN-ISO 10204 3.1 MTR
                </h4>
                <p className="text-xs sm:text-sm font-outfit text-zinc-600 leading-relaxed font-light">
                  100% full material heat traceability, chemical composition verification, hydrostatic test certificates, and third-party Lloyd's/DNV witness reports.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#F8F9FA] border border-zinc-200/90 hover:border-[#F01B25]/60 hover:shadow-xl transition-all duration-300 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F01B25]/10 text-[#F01B25] flex items-center justify-center font-bold">
                  <Wrench className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-grotesk font-extrabold uppercase text-zinc-950">
                  CUSTOM SIZING & RETROFIT
                </h4>
                <p className="text-xs sm:text-sm font-outfit text-zinc-600 leading-relaxed font-light">
                  Our application engineering team provides customized hydraulic sizing, thermal calculations, and reverse-engineered replacements for obsolete plant machinery.
                </p>
              </div>
            </div>

            {/* Bottom Call to Action Banner */}
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0C1A2A] text-white border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                  DIRECT ENGINEERING INQUIRY
                </div>
                <h4 className="text-2xl sm:text-4xl font-grotesk font-extrabold uppercase tracking-tight">
                  NEED ADVANCED SIZING OR CUSTOM PROCUREMENT?
                </h4>
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
