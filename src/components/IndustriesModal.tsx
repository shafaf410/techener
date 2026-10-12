import React from 'react';
import { Flame, Zap, HardHat, Factory, ArrowUpRight, X, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Industry {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyProducts: string[];
  icon: React.ReactNode;
  image: string;
}

const INDUSTRIES: Industry[] = [
  {
    id: 'oil-gas',
    number: '01',
    title: 'OIL & GAS',
    subtitle: 'UPSTREAM, MIDSTREAM & REFINING',
    description: 'Supplying heavy-wall API 6D pipeline valves, high-yield drill pipes, explosion-proof instrumentation, and severe service chokes to offshore rigs and onshore refineries.',
    keyProducts: ['API 6A / 6D Valves', 'Pipes & Flanges', 'Instrumentation Tubing', 'Severe Service Chokes'],
    icon: <Flame className="w-5 h-5 text-[#F01B25]" />,
    image: '/images/industry_oil_gas.jpg',
  },
  {
    id: 'power-generation',
    number: '02',
    title: 'POWER GENERATION',
    subtitle: 'THERMAL, UTILITY & TURBINE STATIONS',
    description: 'Providing high-pressure steam valves (BS 1873), industrial turbine lubricants, online UPS battery architectures, and boiler pressure tubes for power plants.',
    keyProducts: ['Steam Globe Valves', 'Synthetic Turbine Oils', 'Industrial UPS & Battery Banks', 'Boiler Pressure Tubing'],
    icon: <Zap className="w-5 h-5 text-[#F01B25]" />,
    image: '/images/industry_power_gen.jpg',
  },
  {
    id: 'construction',
    number: '03',
    title: 'CONSTRUCTION',
    subtitle: 'CIVIL INFRASTRUCTURE & PLANT ERECTION',
    description: 'High-strength structural steel framing, heavy hydraulic tensioners, civil infrastructure consumables, and certified safety PPE for mega projects across the Middle East.',
    keyProducts: ['Structural Steel', 'Hydraulic Tensioning Tools', 'Fastener Systems', 'EN Certified PPE'],
    icon: <HardHat className="w-5 h-5 text-[#F01B25]" />,
    image: '/images/industry_construction.jpg',
  },
  {
    id: 'manufacturing',
    number: '04',
    title: 'MANUFACTURING',
    subtitle: 'HEAVY MACHINERY & PROCESS AUTOMATION',
    description: 'Rotating equipment pumps, hydraulic cylinders, automated control valves, and workshop machinery powering manufacturing facilities.',
    keyProducts: ['API 610 Process Pumps', 'Hydraulic Cylinders & Manifolds', 'Actuated Control Valves', 'Lubricant Greases'],
    icon: <Factory className="w-5 h-5 text-[#F01B25]" />,
    image: '/images/industry_manufacturing.jpg',
  },
];

interface IndustriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: (productTitle?: string) => void;
}

export const IndustriesModal: React.FC<IndustriesModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className="fixed inset-0 z-[100] bg-white text-zinc-900 w-full h-full min-h-screen overflow-y-auto overscroll-contain selection:bg-[#F01B25] selection:text-white flex flex-col justify-between"
        >
          {/* Main Content Area */}
          <main className="max-w-[1400px] mx-auto w-full px-6 sm:px-10 md:px-12 pt-28 sm:pt-32 pb-14 space-y-12 flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                02 // SECTORS WE CATER TO
              </span>
              <button
                onClick={onClose}
                className="group flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 hover:bg-[#F01B25] text-zinc-800 hover:text-white border border-zinc-200 transition-all font-mono-tech text-xs font-bold uppercase cursor-pointer"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-8">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-grotesk font-extrabold text-zinc-950 uppercase tracking-tight leading-[0.95]">
                  INDUSTRIES <br />
                  <span className="text-[#F01B25]">WE CATER TO.</span>
                </h1>
              </div>
              <p className="text-base font-outfit text-zinc-600 max-w-lg leading-relaxed font-normal">
                Delivering engineered components and tailored technical procurement for critical energy and industrial applications worldwide.
              </p>
            </div>

            {/* Industries 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {INDUSTRIES.map((industry) => (
                <div
                  key={industry.id}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-[#F01B25]/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 overflow-hidden"
                >
                  {/* Top Realistic Image Canvas */}
                  <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-zinc-200 shadow-md">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover object-center transform-gpu group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black/75 border border-white/20 backdrop-blur-md">
                        {industry.icon}
                        <span className="font-mono-tech text-xs font-bold text-white tracking-wider">
                          CHAPTER {industry.number}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-tech bg-black/60 border border-white/15 backdrop-blur-md px-2.5 py-1 rounded text-zinc-200 uppercase tracking-widest font-semibold">
                        CRITICAL SECTOR
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-grotesk font-extrabold text-zinc-950 uppercase group-hover:text-[#F01B25] transition-colors">
                      {industry.title}
                    </h3>
                    <div className="text-xs font-mono-tech text-[#F01B25] font-semibold tracking-wider">
                      {industry.subtitle}
                    </div>
                    <p className="text-sm font-outfit text-zinc-600 leading-relaxed font-normal">
                      {industry.description}
                    </p>
                  </div>

                  {/* Key Supplied Components */}
                  <div className="space-y-3 border-t border-zinc-200/80 pt-4">
                    <div className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider font-semibold">
                      Key Supplied Components:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {industry.keyProducts.map((prod, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-white border border-zinc-200 text-xs font-mono-tech text-zinc-700 font-medium shadow-sm"
                        >
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Request Quote for this sector */}
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuote(industry.title);
                    }}
                    className="w-full py-3.5 rounded-xl bg-white hover:bg-[#F01B25] hover:text-white border border-zinc-200 text-xs font-mono-tech font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 text-zinc-900 shadow-sm cursor-pointer"
                  >
                    <span>Request Sector Quote</span>
                    <ArrowUpRight className="w-4 h-4 text-[#F01B25] group-hover:text-white" />
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-zinc-200">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-600 font-semibold">
                <ShieldCheck className="w-5 h-5 text-[#F01B25]" />
                <span>ISO 9001:2015 Certified Supply Chain Management</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="px-8 py-4 rounded-xl bg-[#F01B25] hover:bg-zinc-950 font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#F01B25]/20 cursor-pointer"
              >
                <span>Request General Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
