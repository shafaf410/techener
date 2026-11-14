import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Layers, ChevronRight } from 'lucide-react';
import { MechanicalCategory } from '../../data/mechanicalDivisionData';

interface CategoryCardProps {
  category: MechanicalCategory;
  index: number;
  isSelected?: boolean;
  onSelect: (category: MechanicalCategory) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  index,
  isSelected = false,
  onSelect,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(category)}
      className="group relative rounded-3xl overflow-hidden border border-zinc-200 hover:border-[#F01B25] bg-white shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between transform-gpu"
    >
      {/* 1. Large Industrial Background Visual with Smooth 1.0 -> 1.06 Scale */}
      <div className="relative h-[280px] sm:h-[340px] w-full overflow-hidden bg-zinc-950">
        <img
          src={category.image}
          alt={category.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* 2. Gradient Overlay (darkens on hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-colors duration-500 group-hover:from-black/95 group-hover:via-black/50" />

        {/* Top Header Floating Badges */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 border border-white/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse" />
            <span className="text-[11px] font-mono-tech text-white font-bold tracking-wider uppercase">
              CATEGORY 0{category.number}
            </span>
          </div>

          <span className="text-[10px] font-mono-tech bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white uppercase font-bold border border-white/20">
            {category.products.length} PRODUCT LINES
          </span>
        </div>

        {/* Floating Tagline Over Image */}
        <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-1">
          <div className="text-[11px] font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
            {category.subtitle}
          </div>
          <div className="text-sm font-outfit text-zinc-300 line-clamp-1 font-light">
            {category.tagline}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* 3. Category Title moves slightly upward on hover */}
          <h3 className="text-2xl sm:text-3xl font-grotesk font-extrabold text-zinc-950 uppercase tracking-tight group-hover:text-[#F01B25] transition-all duration-300 group-hover:-translate-y-1">
            {category.title}
          </h3>

          <p className="text-sm font-outfit text-zinc-600 leading-relaxed font-normal">
            {category.description}
          </p>
        </div>

        {/* Quick Specs Pill Strip */}
        <div className="pt-2 border-t border-zinc-100 flex flex-wrap gap-2 text-[11px] font-mono-tech text-zinc-600">
          {category.stats.slice(0, 2).map((st, i) => (
            <span key={i} className="px-2.5 py-1 rounded bg-zinc-100 border border-zinc-200">
              {st.label}: <strong className="text-zinc-900">{st.value}</strong>
            </span>
          ))}
        </div>

        {/* 4 & 5. Explore Products label reveals itself and arrow translates horizontally */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-zinc-900 group-hover:text-[#F01B25] transition-colors flex items-center gap-1.5">
            <span>EXPLORE {category.title.toUpperCase()}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#F01B25]" />
          </span>

          <div className="w-10 h-10 rounded-full bg-zinc-100 group-hover:bg-[#F01B25] text-zinc-800 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1.5 shadow-sm group-hover:shadow-md">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 6. Thin Accent Line animates across the card border */}
      <div className="h-[3px] w-0 bg-[#F01B25] group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
  );
};
