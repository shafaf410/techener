import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import { MechanicalCategory, MechanicalProduct, MECHANICAL_CATEGORIES } from '../../data/mechanicalDivisionData';
import { ProductDetailModal } from './ProductDetailModal';

interface CategoryDetailViewProps {
  category: MechanicalCategory;
  onBackToCategories: () => void;
  onOpenQuote: (productTitle?: string) => void;
  onSelectCategory?: (category: MechanicalCategory) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  onBackToCategories,
  onOpenQuote,
  onSelectCategory,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<MechanicalProduct | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<MechanicalProduct | null>(category.products[0] || null);

  // Split products into two columns (5 and 5 for pumps)
  const midpoint = Math.ceil(category.products.length / 2);
  const col1 = category.products.slice(0, midpoint);
  const col2 = category.products.slice(midpoint);

  return (
    <div className="w-full space-y-16">
      {/* Category Navigation Strip / Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-zinc-200">
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
          <span>All Mechanical Categories</span>
        </button>
      </div>

      {/* SECTION 4 FROM MOCKUP: Angled Industrial Banner with IMAGES for every item */}
      <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-300 grid grid-cols-1 lg:grid-cols-12 bg-[#0C1A2A] text-white">
        {/* Left Side: Industrial Facility Photograph with Dynamic Active Product Preview */}
        <div className="lg:col-span-4 relative min-h-[340px] sm:min-h-[420px] overflow-hidden bg-black">
          <img
            src="/images/rotating_equipment.jpg"
            alt="Industrial Equipment Facility"
            className="w-full h-full object-cover object-center opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A2A] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0C1A2A]" />

          {/* Interactive Floating Active Pump Preview on Hover */}
          {hoveredProduct && (
            <motion.div
              key={hoveredProduct.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex flex-col justify-end p-6 z-10"
            >
              <div className="p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 space-y-3">
                <div className="w-full h-32 bg-white rounded-xl p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={hoveredProduct.image}
                    alt={hoveredProduct.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono-tech font-bold text-[#F01B25] uppercase tracking-wider">
                    FEATURED SPECIFICATION
                  </div>
                  <div className="text-base font-grotesk font-extrabold uppercase text-white truncate">
                    {hoveredProduct.title}
                  </div>
                  <div className="text-xs font-outfit text-zinc-300 line-clamp-1 font-light">
                    {hoveredProduct.description}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side: Dark Navy Container with Breadcrumb, Title, RFQ Button & 10 ITEMS WITH IMAGES */}
        <div className="lg:col-span-8 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-8 bg-gradient-to-br from-[#0C1A2A] to-[#08121C]">
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-widest">
              <span>Mechanical</span>
              <span>/</span>
              <span className="text-white font-bold">{category.title}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-grotesk font-black uppercase tracking-tight text-white leading-none">
              INDUSTRIAL {category.title}
            </h2>

            <p className="text-xs sm:text-sm font-outfit text-zinc-300 max-w-2xl font-light leading-relaxed">
              A comprehensive range of pumping solutions for demanding industrial applications, fluid transfer, and process requirements.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenQuote(`Industrial ${category.title} Scope`)}
                className="px-6 py-3 rounded-xl bg-[#F01B25] hover:bg-white text-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#F01B25]/25 cursor-pointer"
              >
                <span>REQUEST QUOTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 10 PUMP ITEMS EQUIPPED WITH IMAGES (Solving "it has no images make it with images") */}
          <div className="pt-6 border-t border-white/10 space-y-2">
            <div className="text-[11px] font-mono-tech text-[#F01B25] font-bold uppercase tracking-widest flex items-center gap-2 pb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25] animate-pulse" />
              <span>EQUIPMENT CATALOGUE // {category.products.length} CERTIFIED PRODUCT LINES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Column 1 */}
              <div className="space-y-2">
                {col1.map((product, idx) => (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredProduct(product)}
                    onClick={() => setSelectedProduct(product)}
                    className="group flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#F01B25]/60 transition-all cursor-pointer"
                  >
                    {/* Number Badge */}
                    <span className="text-xs font-mono-tech font-bold text-zinc-400 group-hover:text-[#F01B25] w-6 shrink-0">
                      0{idx + 1}
                    </span>

                    {/* PRODUCT IMAGE THUMBNAIL (From PPTX) */}
                    <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-sm border border-white/20 group-hover:scale-105 transition-transform">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Product Name */}
                    <span className="text-xs sm:text-sm font-grotesk font-bold uppercase tracking-tight text-zinc-200 group-hover:text-white truncate flex-1">
                      {product.title}
                    </span>

                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#F01B25] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="space-y-2">
                {col2.map((product, idx) => (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredProduct(product)}
                    onClick={() => setSelectedProduct(product)}
                    className="group flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#F01B25]/60 transition-all cursor-pointer"
                  >
                    {/* Number Badge */}
                    <span className="text-xs font-mono-tech font-bold text-zinc-400 group-hover:text-[#F01B25] w-6 shrink-0">
                      {idx + col1.length < 9 ? `0${idx + col1.length + 1}` : `${idx + col1.length + 1}`}
                    </span>

                    {/* PRODUCT IMAGE THUMBNAIL (From PPTX) */}
                    <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-sm border border-white/20 group-hover:scale-105 transition-transform">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Product Name */}
                    <span className="text-xs sm:text-sm font-grotesk font-bold uppercase tracking-tight text-zinc-200 group-hover:text-white truncate flex-1">
                      {product.title}
                    </span>

                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#F01B25] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL DETAILED 10-PRODUCT VISUAL GRID (High-Res Equipment Cards) */}
      <div className="space-y-8 pt-4">
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
