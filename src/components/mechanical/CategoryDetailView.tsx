import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { MechanicalCategory, MechanicalProduct, MECHANICAL_CATEGORIES } from '../../data/mechanicalDivisionData';
import { ProductDetailModal } from './ProductDetailModal';

interface CategoryDetailViewProps {
  category: MechanicalCategory;
  onBackToCategories: () => void;
  onOpenQuote: (productTitle?: string) => void;
  onSelectCategory?: (category: MechanicalCategory) => void;
  initialProductId?: string | null;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  onBackToCategories,
  onOpenQuote,
  onSelectCategory,
  initialProductId,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<MechanicalProduct | null>(() => {
    if (initialProductId) {
      return category.products.find((p) => p.id === initialProductId) || null;
    }
    return null;
  });

  useEffect(() => {
    if (initialProductId) {
      const found = category.products.find((p) => p.id === initialProductId);
      if (found) setSelectedProduct(found);
    }
  }, [initialProductId, category]);

  return (
    <div className="w-full space-y-10">
      {/* Category Navigation Strip / Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          {MECHANICAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition-all cursor-pointer ${
                cat.id === category.id
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              <span>{cat.title}</span>
              <span className="ml-2 text-[10px] opacity-75">({cat.products.length})</span>
            </button>
          ))}
        </div>

        <button
          onClick={onBackToCategories}
          className="group inline-flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-zinc-600 hover:text-[#F01B25] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Mechanical Division</span>
        </button>
      </div>

      {/* Clean Light-Theme Category Header (Zero Blue Card) */}
      <div className="space-y-6 pt-2 pb-6 border-b border-zinc-200">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded bg-[#F01B25] text-white font-mono-tech text-xs font-bold uppercase tracking-wider">
              CATEGORY {category.number}
            </span>
            <span className="text-xs font-mono-tech text-zinc-500 tracking-widest uppercase font-semibold">
              {category.products.length} CERTIFIED PRODUCT LINES
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-grotesk font-black uppercase tracking-tight text-zinc-950 leading-none">
            INDUSTRIAL {category.title}
          </h2>

          <p className="text-base sm:text-lg font-outfit text-zinc-600 max-w-3xl leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Quick Stats Pills & RFQ Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-3">
            {category.stats.map((stat, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-2 text-xs font-mono-tech"
              >
                <span className="text-zinc-500 font-semibold">{stat.label}:</span>
                <strong className="text-zinc-900 font-bold">{stat.value}</strong>
              </div>
            ))}
          </div>

          <button
            onClick={() => onOpenQuote(`Industrial ${category.title} Scope`)}
            className="px-6 py-2.5 rounded-xl bg-[#F01B25] hover:bg-zinc-950 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-[#F01B25]/20 cursor-pointer"
          >
            <span>REQUEST QUOTATION FOR {category.title.toUpperCase()}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FULL DETAILED PRODUCT VISUAL GRID (High-Res Equipment Cards) */}
      <div className="space-y-8 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F01B25] animate-pulse" />
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] uppercase tracking-widest">
                COMPLETE VISUAL GALLERY
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-grotesk font-extrabold uppercase tracking-tight text-zinc-950">
              {category.title.toUpperCase()} EQUIPMENT CATALOGUE ({category.products.length} PRODUCTS)
            </h3>
          </div>
          <span className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider">
            Click any product to inspect engineering specs & certifications
          </span>
        </div>

        {/* Product Cards Grid with High-Res Images & Zero Cropping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {category.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProduct(product)}
              className="group relative rounded-2xl bg-white border border-zinc-200 hover:border-[#F01B25] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Product Visual Container with Pure White Background & Crisp Containment */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border-b border-zinc-100 flex items-center justify-center p-6 group-hover:bg-zinc-50/60 transition-colors">
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
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-900 font-mono-tech text-[10px] font-bold shadow-2xs">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </div>
              </div>

              {/* Product Info Block */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="text-xl font-grotesk font-extrabold uppercase tracking-tight text-zinc-950 group-hover:text-[#F01B25] transition-colors leading-tight">
                    {product.title}
                  </h4>
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
                      VIEW SPECIFICATIONS
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

      {/* Individual Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenQuote={onOpenQuote}
      />
    </div>
  );
};
