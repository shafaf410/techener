import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, ShieldCheck, Layers, Award, PhoneCall, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DivisionItem } from './DivisionModal';
import { MECHANICAL_CATEGORIES, MechanicalCategory, MechanicalProduct } from '../data/mechanicalDivisionData';
import { ProductDetailModal } from './mechanical/ProductDetailModal';
import { ClientLogoMarquee } from './mechanical/ClientLogoMarquee';
import { CategoryDetailView } from './mechanical/CategoryDetailView';

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
  onSelectOtherDivision: _onSelectOtherDivision,
  allDivisions: _allDivisions,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<MechanicalProduct | null>(null);
  const [isMergedGalleryOpen, setIsMergedGalleryOpen] = useState<boolean>(false);
  const [activeSeparatedCategory, setActiveSeparatedCategory] = useState<MechanicalCategory>(MECHANICAL_CATEGORIES[0]);
  const [targetProductId, setTargetProductId] = useState<string | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('product') || null;
    } catch {
      return null;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<MechanicalCategory | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        return MECHANICAL_CATEGORIES.find((c) => c.id === catParam.toLowerCase()) || null;
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Handle browser back/forward popstate
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const params = new URLSearchParams(window.location.search);
      const catParam = (e.state && e.state.category) || params.get('category');
      const prodParam = (e.state && e.state.product) || params.get('product');

      if (catParam) {
        const found = MECHANICAL_CATEGORIES.find((c) => c.id === catParam.toLowerCase());
        setSelectedCategory(found || null);
        setTargetProductId(prodParam || null);
      } else {
        setSelectedCategory(null);
        setTargetProductId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const container = document.getElementById('division-detail-scroll-container');
    if (container) {
      container.scrollTop = 0;
    }
  }, [division, selectedCategory]);

  if (!division) return null;

  const isMechanical =
    division.id === 'mechanical-division' ||
    division.id === 'mechanical' ||
    division.id.toLowerCase().includes('mechanical') ||
    division.number === '01';

  const handleSelectCategory = (cat: MechanicalCategory, productId?: string) => {
    setSelectedCategory(cat);
    setTargetProductId(productId || null);
    const searchUrl = productId
      ? `/division/${division.id}?category=${cat.id}&product=${productId}`
      : `/division/${division.id}?category=${cat.id}`;
    window.history.pushState({ category: cat.id, product: productId }, '', searchUrl);
    const container = document.getElementById('division-detail-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToDivision = () => {
    setSelectedCategory(null);
    setTargetProductId(null);
    window.history.pushState({}, '', `/division/${division.id}`);
    const container = document.getElementById('division-detail-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      id="division-detail-scroll-container"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      className="fixed inset-0 z-[100] w-full h-full bg-white text-zinc-900 font-outfit overflow-y-auto overscroll-contain selection:bg-[#F01B25] selection:text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen bg-white"
      >
        {/* If a dedicated category inside page is selected */}
        {selectedCategory ? (
          <div className="min-h-screen bg-white">
            {/* Category Page Top Strip */}
            <section className="relative pt-24 sm:pt-28 pb-8 overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
              <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-zinc-200/60">
                  <button
                    onClick={handleBackToDivision}
                    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 hover:bg-[#F01B25] text-zinc-800 hover:text-white transition-all text-xs font-mono-tech uppercase font-bold cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    <span>Back to Mechanical Division</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-500 font-semibold tracking-wider">
                    <span className="text-[#F01B25] font-black">—</span>
                    <span>Home</span>
                    <span className="text-zinc-300">/</span>
                    <button onClick={onBack} className="hover:text-black cursor-pointer">Divisions</button>
                    <span className="text-zinc-300">/</span>
                    <button onClick={handleBackToDivision} className="hover:text-black cursor-pointer">{division.title}</button>
                    <span className="text-zinc-300">/</span>
                    <span className="text-zinc-900 font-bold">{selectedCategory.title}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded bg-[#F01B25] text-white font-mono-tech text-xs font-bold uppercase tracking-wider">
                      CATEGORY {selectedCategory.number}
                    </span>
                    <span className="text-xs font-mono-tech text-zinc-500 tracking-widest uppercase font-semibold">
                      {selectedCategory.products.length} CERTIFIED PRODUCT LINES
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-grotesk font-black text-zinc-950 uppercase tracking-tight leading-tight">
                    {selectedCategory.title}
                  </h1>
                  <p className="text-base sm:text-lg font-outfit text-[#F01B25] font-bold">
                    {selectedCategory.tagline}
                  </p>
                </div>
              </div>
            </section>

            {/* Dedicated Category Experience (Clean light theme, zero blue card) */}
            <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 sm:py-14">
              <CategoryDetailView
                category={selectedCategory}
                onBackToCategories={handleBackToDivision}
                onOpenQuote={onOpenQuote}
                onSelectCategory={(cat) => handleSelectCategory(cat)}
                initialProductId={targetProductId}
              />
            </main>
          </div>
        ) : (
          /* Main Division Overview */
          <div className="min-h-screen bg-white">
            {/* Top Hero Banner Section */}
            <section className="relative pt-24 sm:pt-28 pb-14 md:pb-20 overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
              <div className="absolute inset-0 z-0 opacity-10">
                <img
                  src={division.image}
                  alt={division.title}
                  className="w-full h-full object-cover object-center scale-105"
                />
              </div>

              <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 space-y-6">
                {/* Top Action & Breadcrumb Strip */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-zinc-200/60">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onBack}
                      className="group flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 hover:bg-[#F01B25] text-zinc-800 hover:text-white transition-all text-xs font-mono-tech uppercase font-bold cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                      <span>Back to All Divisions</span>
                    </button>

                    <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-500 font-semibold tracking-wider">
                      <span className="text-[#F01B25] font-black">—</span>
                      <span>Home</span>
                      <span className="text-zinc-300">/</span>
                      <button onClick={onBack} className="hover:text-black cursor-pointer">Divisions</button>
                      <span className="text-zinc-300">/</span>
                      <span className="text-zinc-900 font-bold">{division.title}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-xs font-mono-tech text-zinc-400 uppercase tracking-widest font-semibold">
                      DIVISION {division.number} // CORE CAPABILITIES
                    </span>
                    <button
                      onClick={() => onOpenQuote(division.title)}
                      className="px-5 py-2 rounded-full bg-[#F01B25] hover:bg-zinc-950 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-[#F01B25]/20 cursor-pointer"
                    >
                      <span>Inquire For Division</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-md bg-[#F01B25] text-white font-mono-tech text-xs font-bold uppercase tracking-wider">
                      DIVISION {division.number}
                    </span>
                    <span className="text-xs font-mono-tech text-zinc-500 tracking-widest uppercase font-semibold">
                      TECH ENER-G CAPABILITY CATALOG
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-grotesk font-black text-zinc-950 uppercase tracking-tight leading-[0.96] max-w-5xl">
                    {division.title}
                  </h1>

                  <p className="text-lg sm:text-xl font-outfit text-[#F01B25] font-bold max-w-4xl">
                    {division.tagline}
                  </p>

                  <p className="text-base sm:text-lg font-outfit text-zinc-600 max-w-4xl leading-relaxed font-normal">
                    {division.description}
                  </p>
                </div>

                {/* Quick Metrics Bar */}
                <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono-tech text-zinc-700">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-zinc-200 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-[#F01B25]" /> API / ASME / BS Standards Compliant
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-zinc-200 shadow-xs">
                    <Award className="w-4 h-4 text-[#F01B25]" /> EN-ISO 10204 3.1 Certified
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-zinc-200 shadow-xs">
                    <Layers className="w-4 h-4 text-[#F01B25]" /> {division.items.length} Scope Categories
                  </div>
                </div>
              </div>
            </section>

            {/* Client Logos Marquee */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8">
              <ClientLogoMarquee />
            </div>

            {/* Main Detailed Breakdown Section: COMPREHENSIVE EQUIPMENT INDEX */}
            <section className="py-12 sm:py-16 max-w-[1400px] mx-auto px-6 md:px-12 space-y-12">
              <div className="space-y-3 border-b border-zinc-200 pb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F01B25] animate-pulse" />
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] uppercase tracking-widest">
                    DETAILED SCOPE OF SUPPLY & EQUIPMENT SPECIFICATIONS
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-grotesk font-black text-zinc-950 uppercase tracking-tight">
                  COMPREHENSIVE EQUIPMENT INDEX
                </h2>
                <p className="text-sm sm:text-base font-outfit text-zinc-600 max-w-3xl leading-relaxed">
                  Tech Ener-G supplies genuine, certified industrial components across all categories under {division.title}. Explore verified equipment lines with full material traceability and engineering documentation.
                </p>
              </div>

              {/* Equipment & Scope Editorial Directory List */}
              <div className="border-t border-zinc-200/80 divide-y divide-zinc-200/80">
                {division.items.map((item, index) => {
                  const itemNumber = index + 1;
                  const formattedNumber = itemNumber < 10 ? `0${itemNumber}` : `${itemNumber}`;
                  const isMergedPumpsRow = isMechanical && index === 0;

                  // ROW 01: Merged at first as "PUMP, COMPRESSOR, HEAT EXCHANGER"
                  if (isMergedPumpsRow) {
                    return (
                      <div key={index} className="group transition-all">
                        {/* Merged Title Row at First */}
                        <div
                          onClick={() => setIsMergedGalleryOpen(!isMergedGalleryOpen)}
                          className="py-6 sm:py-9 flex items-center justify-between gap-4 sm:gap-8 cursor-pointer select-none transition-all"
                        >
                          {/* Left: Number + Merged Title (Clean, NO subtitle line) */}
                          <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                            <span className="text-sm sm:text-base font-mono-tech font-bold text-zinc-400 group-hover:text-[#F01B25] transition-colors duration-300 w-8 sm:w-12 shrink-0">
                              {formattedNumber}
                            </span>

                            <h3 className="text-2xl sm:text-4xl md:text-5xl font-grotesk font-black uppercase tracking-tight text-zinc-300 group-hover:text-zinc-950 transition-colors duration-300 truncate">
                              {item}
                            </h3>
                          </div>

                          {/* Right: Toggle Button with rotating chevron */}
                          <div className="flex items-center gap-4 shrink-0">
                            <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-zinc-400 group-hover:text-[#F01B25] transition-colors hidden md:inline-block">
                              {isMergedGalleryOpen ? 'COLLAPSE SUB-OPTIONS' : 'EXPLORE 3 CATEGORIES'}
                            </span>
                            <div
                              className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                isMergedGalleryOpen
                                  ? 'bg-[#F01B25] border-[#F01B25] text-white shadow-lg shadow-[#F01B25]/25'
                                  : 'border-zinc-200 bg-white text-zinc-400 group-hover:bg-[#F01B25] group-hover:border-[#F01B25] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#F01B25]/25 group-hover:scale-105'
                              }`}
                            >
                              <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ${isMergedGalleryOpen ? 'rotate-180' : ''}`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* On Click: Smoothly reveals the 3 Sub-Options (Pumps, Compressors, Heat Exchangers) */}
                        <AnimatePresence>
                          {isMergedGalleryOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden pl-4 sm:pl-10 md:pl-16 border-l-2 border-[#F01B25]/40 ml-4 sm:ml-6 md:ml-7 mb-4 divide-y divide-zinc-200/70 bg-zinc-50/60 rounded-r-2xl"
                            >
                              {MECHANICAL_CATEGORIES.map((cat, i) => (
                                <div
                                  key={cat.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectCategory(cat);
                                  }}
                                  className="group/sub py-5 sm:py-7 pr-4 sm:pr-8 flex items-center justify-between gap-4 cursor-pointer select-none transition-all hover:bg-white"
                                >
                                  {/* Left: Sub-number + Title */}
                                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                                    <span className="text-xs sm:text-sm font-mono-tech font-bold text-[#F01B25] w-6 shrink-0">
                                      0{i + 1}
                                    </span>

                                    <div className="space-y-1 min-w-0">
                                      <h4 className="text-xl sm:text-3xl md:text-4xl font-grotesk font-black uppercase tracking-tight text-zinc-400 group-hover/sub:text-zinc-950 transition-colors duration-200 truncate">
                                        {cat.title}
                                      </h4>
                                      <p className="text-[11px] sm:text-xs font-mono-tech text-zinc-400 group-hover/sub:text-zinc-600 uppercase tracking-wider">
                                        {cat.products.length} Models • {cat.tagline}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Right: Circular Arrow Button */}
                                  <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-zinc-400 group-hover/sub:text-[#F01B25] transition-colors hidden sm:inline-block">
                                      VIEW {cat.title.toUpperCase()} PAGE
                                    </span>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-400 group-hover/sub:bg-[#F01B25] group-hover/sub:border-[#F01B25] group-hover/sub:text-white group-hover/sub:shadow-md group-hover/sub:shadow-[#F01B25]/20 group-hover/sub:scale-105 transition-all duration-200">
                                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/sub:translate-x-0.5 group-hover/sub:-translate-y-0.5 transition-transform duration-200" />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  // Rows 02 Through 07: Clean Editorial Rows that darken on hover
                  return (
                    <div
                      key={index}
                      onClick={() => onOpenQuote(`${division.title} - ${item}`)}
                      className="group py-6 sm:py-9 flex items-center justify-between gap-4 sm:gap-8 cursor-pointer select-none transition-all"
                    >
                      {/* Left: Number + Title */}
                      <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                        <span className="text-sm sm:text-base font-mono-tech font-bold text-zinc-400 group-hover:text-[#F01B25] transition-colors duration-300 w-8 sm:w-12 shrink-0">
                          {formattedNumber}
                        </span>

                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-grotesk font-black uppercase tracking-tight text-zinc-300 group-hover:text-zinc-950 transition-colors duration-300 truncate">
                          {item}
                        </h3>
                      </div>

                      {/* Right: Circular Arrow Button that lights up on hover */}
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-zinc-400 group-hover:text-[#F01B25] transition-colors hidden md:inline-block">
                          REQUEST SPECIFIC QUOTE
                        </span>
                        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-400 group-hover:bg-[#F01B25] group-hover:border-[#F01B25] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#F01B25]/25 group-hover:scale-105 transition-all duration-300">
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Division Technical Consultation Banner */}
              <div className="p-8 sm:p-12 rounded-3xl bg-[#0C1A2A] text-white border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
                <div className="lg:col-span-8 space-y-4">
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] uppercase tracking-widest">
                    // TECHNICAL CONSULTATION & SOURCING
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-grotesk font-extrabold text-white uppercase leading-tight">
                    REQUIRE CUSTOM SPECIFICATIONS OR MILL TEST REPORTS FOR {division.title.toUpperCase()}?
                  </h3>
                  <p className="text-sm font-outfit text-zinc-300 leading-relaxed max-w-2xl font-light">
                    Our engineering support desk provides technical compliance verification, EN-ISO 10204 3.1 certification, third-party inspection reports (TPI), and rapid global procurement for {division.title}.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
                  <button
                    onClick={() => onOpenQuote(division.title)}
                    className="w-full py-4 rounded-xl bg-[#F01B25] hover:bg-white hover:text-black text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#F01B25]/30 cursor-pointer"
                  >
                    <span>Submit RFQ For {division.title}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://wa.me/971502737026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4 text-[#F01B25]" />
                    <span>DIRECT WHATSAPP INQUIRY</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}
      </motion.div>

      {/* Dedicated Interactive Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenQuote={onOpenQuote}
      />
    </div>
  );
};
