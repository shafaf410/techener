import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ShieldCheck, Layers, Gauge, ChevronRight, Wrench, Sparkles } from 'lucide-react';
import { MechanicalCategory, MechanicalProduct } from '../../data/mechanicalDivisionData';
import { ProductDetailModal } from './ProductDetailModal';

interface CategoryDetailViewProps {
  category: MechanicalCategory;
  onBackToCategories: () => void;
  onOpenQuote: (productTitle?: string) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  onBackToCategories,
  onOpenQuote,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<MechanicalProduct | null>(null);

  return (
    <div className="w-full space-y-16 animate-in fade-in duration-500">
      {/* Category Hero Banner with Cinematic Shared Element Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl p-8 sm:p-12 md:p-16 space-y-8"
      >
        {/* Background Visual with Dark Industrial Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F01B25]/15 rounded-full blur-[160px] pointer-events-none" />
        </div>

        <div className="relative z-10 space-y-6 max-w-5xl">
          {/* Back Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <button
              onClick={onBackToCategories}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-[#F01B25] border border-white/10 hover:border-[#F01B25] text-xs font-mono-tech font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Mechanical Categories</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-tech text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
                CATEGORY 0{category.number} // {category.products.length} PRODUCT LINES
              </span>
              <button
                onClick={() => onOpenQuote(`${category.title} Scope`)}
                className="px-4 py-2 rounded-full bg-[#F01B25] hover:bg-white text-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-[#F01B25]/25 cursor-pointer"
              >
                <span>RFQ For {category.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Category Number & Subtitle */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded bg-[#F01B25] text-white font-mono-tech text-xs font-bold uppercase tracking-wider">
                CATEGORY {category.number}
              </span>
              <span className="text-xs font-mono-tech text-zinc-400 tracking-widest uppercase font-semibold">
                {category.subtitle}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-grotesk font-extrabold uppercase tracking-tight text-white leading-[0.96]">
              {category.title}
            </h1>

            <p className="text-lg sm:text-xl font-outfit text-[#F01B25] font-semibold">
              {category.tagline}
            </p>

            <p className="text-sm sm:text-base font-outfit text-zinc-300 max-w-3xl leading-relaxed font-light">
              {category.description}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            {category.stats.map((st, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider font-semibold">
                  {st.label}
                </div>
                <div className="text-xl sm:text-2xl font-grotesk font-extrabold text-white">
                  {st.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Product Collection Grid */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F01B25] animate-pulse" />
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] uppercase tracking-widest">
                COMPLETE EQUIPMENT PORTFOLIO
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-grotesk font-extrabold uppercase tracking-tight text-zinc-950">
              {category.title.toUpperCase()} SPECIFICATION INDEX
            </h2>
          </div>
          <span className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider">
            Showing {category.products.length} Products // Click for Details & Specs
          </span>
        </div>

        {/* Product Cards Grid with Premium Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {category.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProduct(product)}
              className="group relative rounded-2xl bg-white border border-zinc-200 hover:border-[#F01B25] shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-zinc-50 to-zinc-100/60 border-b border-zinc-100 flex items-center justify-center p-6 group-hover:bg-white transition-colors duration-300">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="max-w-full max-h-full w-auto h-auto object-contain transform-gpu group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-md"
                />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/85 border border-white/20 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25]" />
                  <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-white">
                    {product.tag}
                  </span>
                </div>

                {/* Index Pill */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-900 font-mono-tech text-[10px] font-bold shadow-sm">
                  0{index + 1}
                </div>
              </div>

              {/* Product Info Block */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-grotesk font-extrabold uppercase tracking-tight text-zinc-950 group-hover:text-[#F01B25] transition-colors leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-outfit text-zinc-600 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Key Spec Snippet */}
                <div className="pt-2 border-t border-zinc-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono-tech text-zinc-500">
                    <span>{Object.keys(product.specs)[0] || 'Specification'}:</span>
                    <strong className="text-zinc-800 font-bold truncate max-w-[160px]">
                      {Object.values(product.specs)[0] || 'Standard Certified'}
                    </strong>
                  </div>

                  {/* Explore Details CTA Arrow */}
                  <div className="pt-2 flex items-center justify-between text-xs font-mono-tech font-bold text-[#F01B25] group-hover:text-zinc-950 transition-colors">
                    <span className="tracking-wider uppercase flex items-center gap-1">
                      EXPLORE DETAILS
                    </span>
                    <div className="w-8 h-8 rounded-full bg-red-50 group-hover:bg-[#F01B25] text-[#F01B25] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Animated Accent Line */}
              <div className="h-[3px] w-0 bg-[#F01B25] group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Individual Product Detail Modal / Drawer */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenQuote={onOpenQuote}
      />
    </div>
  );
};

