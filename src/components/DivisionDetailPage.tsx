import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, Layers, Mail, ChevronRight, Award, PhoneCall, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DivisionItem } from './DivisionModal';
import { MECHANICAL_PRODUCTS, MechanicalProduct, MECHANICAL_CATEGORIES } from '../data/mechanicalDivisionData';
import { ProductDetailModal } from './mechanical/ProductDetailModal';
import { ClientLogoMarquee } from './mechanical/ClientLogoMarquee';

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
  const [selectedProduct, setSelectedProduct] = useState<MechanicalProduct | null>(null);
  const [activeCategoryTab, setActiveCategoryTab] = useState<'pumps' | 'compressors' | 'heat-exchangers'>('pumps');

  useEffect(() => {
    const container = document.getElementById('division-detail-scroll-container');
    if (container) {
      container.scrollTop = 0;
    }
  }, [division]);

  if (!division) return null;

  const isMechanical =
    division.id === 'mechanical-division' ||
    division.id === 'mechanical' ||
    division.id.toLowerCase().includes('mechanical') ||
    division.number === '01';

  // Specific pump, compressor, and heat exchanger lists from PPTX
  const pumpProducts = MECHANICAL_PRODUCTS.filter((p) => p.category === 'pumps');
  const compressorProducts = MECHANICAL_PRODUCTS.filter((p) => p.category === 'compressors');
  const heatExchangerProducts = MECHANICAL_PRODUCTS.filter((p) => p.category === 'heat-exchangers');

  const currentCategoryProducts =
    activeCategoryTab === 'pumps'
      ? pumpProducts
      : activeCategoryTab === 'compressors'
      ? compressorProducts
      : heatExchangerProducts;

  // Image mapping for the other mechanical cards
  const getCardImage = (index: number) => {
    switch (index) {
      case 0:
        return '/images/mechanical/centrifugal-pumps.webp';
      case 1:
        return '/images/rotating_equipment.jpg';
      case 2:
        return '/images/pipes_fittings.jpg';
      case 3:
        return '/images/industrial_valves.jpg';
      case 4:
        return '/images/valve_butterfly.jpg';
      case 5:
        return '/images/industry_oil_gas.jpg';
      case 6:
        return '/images/industry_manufacturing.jpg';
      default:
        return division.image;
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
                  <span>Divisions</span>
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

          {/* Equipment & Scope Cards Grid */}
          <div className="space-y-10">
            {division.items.map((item, index) => {
              const isPumpsCard = index === 0 && isMechanical;

              // 1. FEATURED SUPER-CARD FOR CARD 01: PUMP, COMPRESSOR, HEAT EXCHANGER WITH ALL IMAGES
              if (isPumpsCard) {
                return (
                  <div
                    key={index}
                    className="rounded-3xl bg-white border-2 border-[#F01B25] shadow-2xl overflow-hidden space-y-8 p-6 sm:p-10 transition-all duration-300"
                  >
                    {/* Card 01 Header Strip */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-xl bg-[#F01B25] text-white font-mono-tech text-sm font-black flex items-center justify-center shadow-md shadow-[#F01B25]/30">
                            01
                          </span>
                          <span className="text-xs font-mono-tech text-[#F01B25] font-bold uppercase tracking-widest border border-[#F01B25]/40 px-3 py-1 rounded-md bg-red-50">
                            SPECIFICATION READY • WITH FULL PRODUCT IMAGERY
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-4xl font-grotesk font-black text-zinc-950 uppercase tracking-tight">
                          PUMP, COMPRESSOR, HEAT EXCHANGER
                        </h3>
                        <p className="text-xs sm:text-sm font-outfit text-zinc-600 max-w-2xl">
                          Extracted directly from technical documentation. Click any equipment model to inspect engineering parameters and request datasheets.
                        </p>
                      </div>

                      {/* Category Switcher Tabs (Pumps / Compressors / Heat Exchangers) */}
                      <div className="flex flex-wrap items-center gap-2 bg-zinc-100 p-1.5 rounded-2xl border border-zinc-200">
                        <button
                          onClick={() => setActiveCategoryTab('pumps')}
                          className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            activeCategoryTab === 'pumps'
                              ? 'bg-[#F01B25] text-white shadow-md'
                              : 'text-zinc-700 hover:text-black hover:bg-white'
                          }`}
                        >
                          Pumps ({pumpProducts.length})
                        </button>
                        <button
                          onClick={() => setActiveCategoryTab('compressors')}
                          className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            activeCategoryTab === 'compressors'
                              ? 'bg-[#F01B25] text-white shadow-md'
                              : 'text-zinc-700 hover:text-black hover:bg-white'
                          }`}
                        >
                          Compressors ({compressorProducts.length})
                        </button>
                        <button
                          onClick={() => setActiveCategoryTab('heat-exchangers')}
                          className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            activeCategoryTab === 'heat-exchangers'
                              ? 'bg-[#F01B25] text-white shadow-md'
                              : 'text-zinc-700 hover:text-black hover:bg-white'
                          }`}
                        >
                          Heat Exchangers ({heatExchangerProducts.length})
                        </button>
                      </div>
                    </div>

                    {/* IMAGES GALLERY: ALL EQUIPMENT PRODUCTS WITH CRISP UNCLIPPED IMAGES */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono-tech font-bold text-zinc-500 uppercase tracking-wider">
                        <span>
                          Showing {currentCategoryProducts.length} {activeCategoryTab.toUpperCase()} Models with Technical Images
                        </span>
                        <span className="text-[#F01B25]">Click Any Model to Inspect Specs</span>
                      </div>

                      {/* Responsive Grid of Equipment with High-Res Images */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {currentCategoryProducts.map((product, pIdx) => (
                          <div
                            key={product.id}
                            onClick={() => setSelectedProduct(product)}
                            className="group relative rounded-2xl bg-zinc-50 border border-zinc-200/90 hover:border-[#F01B25] hover:bg-white hover:shadow-xl transition-all duration-300 p-3.5 flex flex-col justify-between cursor-pointer space-y-3"
                          >
                            {/* Product Image Container */}
                            <div className="relative aspect-square w-full rounded-xl bg-white p-3 flex items-center justify-center overflow-hidden border border-zinc-100 group-hover:border-[#F01B25]/30 shadow-2xs">
                              <img
                                src={product.image}
                                alt={product.title}
                                loading="lazy"
                                className="max-h-full max-w-full w-auto h-auto object-contain transform-gpu group-hover:scale-110 transition-transform duration-500 ease-out"
                              />

                              <span className="absolute top-2 left-2 text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-zinc-900 text-white">
                                {pIdx < 9 ? `0${pIdx + 1}` : pIdx + 1}
                              </span>
                            </div>

                            {/* Product Title & Tag */}
                            <div className="space-y-1">
                              <div className="text-[10px] font-mono-tech font-bold text-[#F01B25] uppercase tracking-wider truncate">
                                {product.tag}
                              </div>
                              <h4 className="text-xs sm:text-sm font-grotesk font-extrabold uppercase text-zinc-950 group-hover:text-[#F01B25] transition-colors line-clamp-1 leading-snug">
                                {product.title}
                              </h4>
                            </div>

                            {/* Bottom Micro Action */}
                            <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-[11px] font-mono-tech font-bold text-zinc-600 group-hover:text-[#F01B25]">
                              <span>SPECS</span>
                              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card 01 Footer Strip */}
                    <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-outfit text-zinc-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#F01B25] shrink-0" />
                        <span>All 22 equipment lines supplied with EN-ISO 10204 3.1 MTR & API/ASME compliance documentation</span>
                      </div>

                      <button
                        onClick={() => onOpenQuote('Mechanical Division - Pumps, Compressors & Heat Exchangers')}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F01B25] hover:bg-zinc-950 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-[#F01B25]/20 cursor-pointer"
                      >
                        <span>Request Specific Quote For 01</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              }

              // 2. STANDARD EQUIPMENT CARDS (02 THROUGH 07) WITH INDUSTRIAL IMAGES
              return (
                <div
                  key={index}
                  className="group rounded-3xl bg-zinc-50 border border-zinc-200/90 hover:border-[#F01B25] hover:bg-white hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 md:grid-cols-12"
                >
                  {/* Left Product Visual for this Card */}
                  <div className="md:col-span-4 relative aspect-[16/10] md:aspect-auto md:min-h-[260px] overflow-hidden bg-zinc-900">
                    <img
                      src={getCardImage(index)}
                      alt={item}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="w-10 h-10 rounded-xl bg-white/90 text-zinc-950 font-mono-tech text-sm font-black flex items-center justify-center shadow-md">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] font-mono-tech font-bold text-white uppercase tracking-widest px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20">
                        SPECIFICATION READY
                      </span>
                    </div>
                  </div>

                  {/* Right Content Block */}
                  <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[11px] font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                        <span>DIVISION {division.number} // SCOPE ITEM 0{index + 1}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-grotesk font-black text-zinc-950 uppercase group-hover:text-[#F01B25] transition-colors leading-snug">
                        {item}
                      </h3>

                      <p className="text-xs sm:text-sm font-outfit text-zinc-600 font-normal leading-relaxed">
                        Supplied with complete manufacturing mill certificates, mechanical testing reports, and third-party inspection dossiers.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs font-outfit text-zinc-600">
                        <CheckCircle2 className="w-4 h-4 text-[#F01B25] shrink-0" />
                        <span>Full Material & Mill Test Reports (MTR) Available</span>
                      </div>

                      <button
                        onClick={() => onOpenQuote(`${division.title} - ${item}`)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-[#F01B25] border border-zinc-200 hover:border-[#F01B25] text-zinc-900 hover:text-white font-mono-tech text-xs font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Request Specific Quote</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
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
