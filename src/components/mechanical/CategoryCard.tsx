import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(category)}
      className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between p-6 sm:p-8 bg-[#F8F9FA] hover:bg-white hover:border-[#F01B25] hover:shadow-xl ${
        isSelected ? 'border-[#F01B25] ring-2 ring-[#F01B25]/20 bg-white' : 'border-zinc-200/90'
      }`}
    >
      {/* Top Number Identifier & Title */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-zinc-400 group-hover:text-[#F01B25] transition-colors">
          <span>0{category.number}</span>
          <span>—</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-grotesk font-black uppercase tracking-tight text-zinc-950 group-hover:text-[#F01B25] transition-colors">
            {category.title}
          </h3>
          <p className="text-xs sm:text-sm font-outfit text-zinc-600 leading-relaxed font-normal min-h-[44px]">
            {category.description}
          </p>
        </div>
      </div>

      {/* Center/Right Product Visual */}
      <div className="relative w-full h-44 my-4 flex items-center justify-center overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          loading="lazy"
          className="max-h-full max-w-full w-auto h-auto object-contain transform-gpu transition-transform duration-500 ease-out group-hover:scale-108 drop-shadow-md"
        />
      </div>

      {/* Bottom Link Action */}
      <div className="pt-4 border-t border-zinc-200/60 flex items-center justify-between">
        <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-zinc-950 group-hover:text-[#F01B25] transition-colors flex items-center gap-1.5">
          <span>EXPLORE {category.title.toUpperCase()}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>

        <span className="text-[10px] font-mono-tech text-zinc-500 font-semibold px-2 py-0.5 rounded bg-zinc-200/60">
          {category.products.length} PRODUCTS
        </span>
      </div>

      {/* Subtle Accent Bottom Indicator */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#F01B25] group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
  );
};
