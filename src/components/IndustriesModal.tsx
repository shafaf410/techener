import React, { useState } from 'react';
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
          />

          {/* Modal Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl rounded-3xl bg-[#0A0A0A] border border-white/15 p-6 sm:p-10 md:p-14 shadow-2xl space-y-10 max-h-[92vh] overflow-y-auto z-10 red-border-glow text-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#F01B25] transition-colors focus:outline-none z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded-md bg-white shadow-md border border-white/20">
                    <img src="/logo.png" alt="Tech Ener-G Logo" className="h-5 w-auto object-contain" />
                  </div>
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    02 / SECTORS WE CATER TO
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight">
                  INDUSTRIES <br />
                  <span className="text-[#F01B25]">WE CATER TO.</span>
                </h2>
              </div>
              <p className="text-sm font-outfit text-zinc-300 max-w-md leading-relaxed">
                Delivering engineered components and tailored technical procurement for critical energy and industrial applications worldwide.
              </p>
            </div>

            {/* Industries 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {INDUSTRIES.map((industry) => (
                <div
                  key={industry.id}
                  className="group relative p-6 md:p-8 rounded-2xl bg-[#121212] border border-white/10 hover:border-[#F01B25]/60 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-2xl overflow-hidden"
                >
                  {/* Top Realistic Image Canvas */}
                  <div className="relative w-full h-52 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#F01B25]/40 transition-colors shadow-lg">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover object-center transform-gpu group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/30 to-black/50 pointer-events-none" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black/80 border border-white/20 backdrop-blur-md">
                        {industry.icon}
                        <span className="font-mono-tech text-xs font-bold text-white tracking-wider">
                          CHAPTER {industry.number}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-tech bg-black/60 border border-white/15 backdrop-blur-md px-2.5 py-1 rounded text-zinc-300 uppercase tracking-widest font-semibold">
                        CRITICAL SECTOR
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-grotesk font-extrabold text-white uppercase group-hover:text-[#F01B25] transition-colors">
                      {industry.title}
                    </h3>
                    <div className="text-xs font-mono-tech text-[#F01B25] font-semibold tracking-wider">
                      {industry.subtitle}
                    </div>
                    <p className="text-xs sm:text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                      {industry.description}
                    </p>
                  </div>

                  {/* Key Supplied Components */}
                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="text-[10px] font-mono-tech text-zinc-400 uppercase tracking-wider">
                      Key Supplied Components:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {industry.keyProducts.map((prod, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono-tech text-zinc-300"
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
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-[#F01B25] hover:text-white border border-white/10 text-xs font-mono-tech font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Request Sector Quote</span>
                    <ArrowUpRight className="w-4 h-4 text-[#F01B25] group-hover:text-white" />
                  </button>
                </div>
              ))}
            </div>

            {/* Modal Bottom Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-[#F01B25]" />
                <span>ISO 9001:2015 Certified Supply Chain Management</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="px-7 py-3.5 rounded-xl bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 flex items-center gap-2 shadow-xl shadow-[#F01B25]/30"
              >
                <span>Request General Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
