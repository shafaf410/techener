import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  specifications: string[];
  applications: string[];
}

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'pipes-fittings-flanges',
    number: '01',
    title: 'PIPES, FITTINGS & FLANGES',
    description: 'High-yield seamless and welded piping, ANSI/ASME forged flanges, and heavy-duty industrial pipe fittings for extreme pressure and thermal application.',
    image: '/images/pipes_fittings.jpg',
    specifications: ['Carbon Steel (A106, A53, API 5L)', 'Stainless Steel (304/304L, 316/316L)', 'Alloy & Duplex Steels', 'ANSI B16.5, B16.47 Flanges'],
    applications: ['Oil & Gas Refineries', 'Power Plants', 'Chemical Processing'],
  },
  {
    id: 'electrical-instrumentation',
    number: '02',
    title: 'ELECTRICAL & INSTRUMENTATION PRODUCTS',
    description: 'Explosion-proof junction boxes, hazardous-area control systems, industrial sensors, cables, and field instrumentation for automated energy plants.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    specifications: ['ATEX / IECEx Certified', 'IP66 / IP67 Weatherproof Enclosures', 'High-Temp Control Cabling'],
    applications: ['Offshore Rigs', 'Substation Automation', 'Manufacturing Plants'],
  },
  {
    id: 'industrial-lubrication',
    number: '03',
    title: 'INDUSTRIAL LUBRICATION',
    description: 'Synthetic turbine oils, high-performance gear lubricants, anti-wear hydraulic fluids, and specialized greases designed for high-stress machinery.',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1000&q=80',
    specifications: ['ISO VG Grade Lubricants', 'Synthetic & Mineral Formulations', 'Anti-Corrosion Additives'],
    applications: ['Turbines & Compressors', 'Heavy Machinery', 'Hydraulic Systems'],
  },
  {
    id: 'construction-materials',
    number: '04',
    title: 'CONSTRUCTION MATERIALS',
    description: 'Structural steel beams, structural fasteners, heavy civil infrastructure supplies, and industrial building consumables.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    specifications: ['High-Strength Structural Steel', 'ASTM Heavy Hex Bolts', 'Corrosion-Resistant Coatings'],
    applications: ['Civil Infrastructure', 'Plant Construction', 'Structural Steel Framing'],
  },
  {
    id: 'instrumentation-tubes-valves',
    number: '05',
    title: 'INSTRUMENTATION TUBES, FITTINGS & VALVES',
    description: 'Precision tube fittings, twin-ferrule compression connectors, needle valves, manifold blocks, and seamless stainless instrumentation tubing.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    specifications: ['Sizes: 1/16" to 2"', '316 SS & Monel Alloys', 'Pressures up to 10,000 PSI'],
    applications: ['Sampling Systems', 'Analyser Houses', 'Process Control Loops'],
  },
  {
    id: 'industrial-tools-machinery',
    number: '06',
    title: 'INDUSTRIAL TOOLS & MACHINERY',
    description: 'Pneumatic torque wrenches, hydraulic bolt tensioners, heavy machining equipment, and industrial workshop machinery.',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    specifications: ['Calibrated Hydraulic Torque Tools', 'Pneumatic Impact Machinery', 'Precision Aligners'],
    applications: ['Flange Bolting', 'Plant Maintenance', 'Field Mechanical Servicing'],
  },
  {
    id: 'rotating-equipment',
    number: '07',
    title: 'ROTATING EQUIPMENT',
    description: 'Centrifugal process pumps, positive displacement pumps, gas compressors, industrial blowers, and mechanical seals.',
    image: '/images/rotating_equipment.jpg',
    specifications: ['API 610 Process Pumps', 'High-Efficiency Electric Drives', 'Mechanical Seals & Couplings'],
    applications: ['Hydrocarbon Transfer', 'Water Treatment', 'Gas Compression'],
  },
  {
    id: 'hydraulic-cylinders-accumulators',
    number: '08',
    title: 'HYDRAULIC CYLINDERS, FITTINGS, MANIFOLDS & ACCUMULATORS',
    description: 'High-pressure hydraulic actuators, custom manifold blocks, bladder/diaphragm accumulators, and heavy fluid power fittings.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    specifications: ['Operating Pressure up to 700 Bar', 'Custom Cylinder Bores', 'ASME / PED Accumulator Vessels'],
    applications: ['Heavy Lift Rigs', 'Valve Actuation Skid', 'Industrial Presses'],
  },
  {
    id: 'industrial-valves',
    number: '09',
    title: 'INDUSTRIAL VALVES',
    description: 'Full-spectrum gate, globe, check, ball, butterfly, ESD, and control valves backed by over 20,000 inventory items.',
    image: '/images/industrial_valves.jpg',
    specifications: ['Cast & Forged Steel', 'API 600, 602, 6D, 6A, ASME B16.34', 'Class 150 to 4500 LBS'],
    applications: ['Flow Control Rigs', 'Pipeline Manifolds', 'Steam & Utility Lines'],
  },
  {
    id: 'industrial-equipment',
    number: '10',
    title: 'INDUSTRIAL EQUIPMENT',
    description: 'Process heat exchangers, pressure vessels, filtration skids, and heavy material handling industrial systems.',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1000&q=80',
    specifications: ['ASME Boiler & Pressure Vessel Code', 'Custom Skid Fabrication', 'High-Capacity Separators'],
    applications: ['Upstream Oil Processing', 'Refinery Skids', 'Power Utilities'],
  },
  {
    id: 'ups-batteries',
    number: '11',
    title: 'UPS & BATTERIES',
    description: 'Industrial uninterruptible power supply (UPS) systems, VRLA/NiCd battery banks, and critical backup power architectures.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    specifications: ['Online Double Conversion UPS', 'Long-Life Industrial NiCd / VRLA', 'SCADA Monitoring Interface'],
    applications: ['Substation Emergency Power', 'Control Room Backup', 'Data Centers'],
  },
  {
    id: 'ppe',
    number: '12',
    title: 'PPE (PERSONAL PROTECTIVE EQUIPMENT)',
    description: 'Certified flame-resistant coveralls, fall protection harnesses, H2S gas detection monitors, respiratory protection, and safety helmets.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    specifications: ['EN & ANSI Certified Safety Gear', 'FR Nomex / Cotton Coveralls', 'Multi-Gas Personal Detectors'],
    applications: ['Hazardous Plant Operation', 'Refinery Turnarounds', 'Offshore Safety'],
  },
];

interface ProductsSectionProps {
  onSelectProduct: (product: ProductCategory) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(PRODUCT_CATEGORIES[0]);
  const [showAll, setShowAll] = useState(false);

  const displayedCategories = showAll ? PRODUCT_CATEGORIES : PRODUCT_CATEGORIES.slice(0, 4);

  return (
    <section id="products" className="relative py-12 lg:py-16 bg-[#050505] border-t border-white/10 flex flex-col justify-center min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
              03 / COMPREHENSIVE PRODUCT SOLUTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-grotesk font-extrabold text-white uppercase tracking-tight">
              ENGINEERED <br />
              <span className="text-zinc-500">INDUSTRIAL CATALOG.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm font-outfit text-zinc-400 max-w-md leading-relaxed">
            Supplying certified industrial components directly from leading global manufacturers to energy, utility, and heavy manufacturing operators.
          </p>
        </div>

        {/* Interactive Typographic Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {displayedCategories.map((cat) => (
                <div
                  key={cat.id}
                  onMouseEnter={() => setActiveCategory(cat)}
                  onClick={() => onSelectProduct(cat)}
                  className={`group py-3.5 px-4 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    activeCategory.id === cat.id
                      ? 'bg-white/5 border-l-4 border-l-[#F01B25] pl-6'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="font-mono-tech text-xs font-bold text-[#F01B25]">
                      {cat.number}
                    </span>
                    <h3
                      className={`font-grotesk text-sm md:text-lg font-bold uppercase transition-all duration-300 ${
                        activeCategory.id === cat.id
                          ? 'text-white translate-x-1'
                          : 'text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      {cat.title}
                    </h3>
                  </div>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-all duration-300 ${
                      activeCategory.id === cat.id
                        ? 'text-[#F01B25] opacity-100 translate-x-1 -translate-y-1'
                        : 'text-zinc-600 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* SHOW ALL > Toggle Button */}
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>{showAll ? 'SHOW BRIEF VIEW' : 'SHOW ALL 12 CATEGORIES'}</span>
              <ChevronRight className={`w-4 h-4 text-[#F01B25] transition-transform duration-300 ${showAll ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
            </button>
          </div>

          {/* Right Live Full-Card Image-Centric Preview Box */}
          <div className="lg:col-span-5">
            <div className="relative h-[440px] lg:h-[480px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl red-border-glow flex flex-col justify-between p-6 group">
              {/* Full Background Image with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeCategory.id}
                  src={activeCategory.image}
                  alt={activeCategory.title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover object-center transform-gpu transition-transform duration-700 group-hover:scale-105"
                />
              </AnimatePresence>

              {/* Gradient Vignette Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30 pointer-events-none" />

              {/* Floating Top Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse" />
                  <span className="text-[10px] font-mono-tech text-white font-bold tracking-wider uppercase">
                    CATEGORY {activeCategory.number}
                  </span>
                </div>

                <span className="text-[9px] font-mono-tech bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full text-zinc-200 uppercase font-semibold border border-white/15">
                  READY FOR SOURCING
                </span>
              </div>

              {/* Floating Bottom Content Overlay */}
              <div className="relative z-10 space-y-4 pt-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    TECH ENER-G CATALOG
                  </span>
                  <h3 className="text-xl md:text-2xl font-grotesk font-extrabold text-white uppercase leading-tight drop-shadow-lg">
                    {activeCategory.title}
                  </h3>
                </div>

                <p className="text-xs font-outfit text-zinc-200 leading-relaxed font-light drop-shadow line-clamp-2">
                  {activeCategory.description}
                </p>

                {/* Specs List */}
                <div className="space-y-1.5 pt-2 border-t border-white/15">
                  <div className="text-[10px] font-mono-tech text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                    <SlidersHorizontal className="w-3 h-3 text-[#F01B25]" /> Key Specifications:
                  </div>
                  <ul className="grid grid-cols-1 gap-1">
                    {activeCategory.specifications.slice(0, 2).map((spec, i) => (
                      <li key={i} className="text-xs font-outfit text-zinc-200 flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-[#F01B25] shrink-0" />
                        <span className="truncate">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onSelectProduct(activeCategory)}
                  className="w-full py-3 rounded-xl bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#F01B25]/30"
                >
                  View Complete Specifications
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
