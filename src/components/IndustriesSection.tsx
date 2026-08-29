import React, { useState } from 'react';
import { Flame, Zap, HardHat, Factory, ArrowUpRight } from 'lucide-react';

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

interface IndustriesSectionProps {
  onOpenQuote: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenQuote }) => {
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  const displayedIndustries = showAllIndustries ? INDUSTRIES : INDUSTRIES.slice(0, 2);

  return (
    <section id="industries" className="relative py-24 md:py-32 bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
              04 / SECTOR EXPERTISE
            </span>
            <h2 className="text-4xl sm:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight">
              INDUSTRIES <br />
              <span className="text-zinc-500">WE CATER TO.</span>
            </h2>
          </div>
          <p className="text-sm font-outfit text-zinc-400 max-w-md leading-relaxed">
            Delivering engineered components and tailored technical procurement for critical energy and industrial applications worldwide.
          </p>
        </div>

        {/* Editorial Chapters Layout with Realistic HD Images */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedIndustries.map((industry) => (
              <div
                key={industry.id}
                className="group relative p-6 md:p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-[#F01B25]/50 transition-all duration-500 flex flex-col justify-between space-y-6 shadow-2xl overflow-hidden"
              >
                {/* Background Glow Effect */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#F01B25]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#F01B25]/10 transition-colors" />

                {/* Top Realistic Image Canvas */}
                <div className="relative w-full h-56 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#F01B25]/40 transition-colors shadow-lg">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover object-center transform-gpu group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-black/50 pointer-events-none" />

                  {/* Floating Chapter Pill over Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black/75 border border-white/20 backdrop-blur-md">
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

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-grotesk font-extrabold text-white uppercase group-hover:text-[#F01B25] transition-colors leading-tight">
                      {industry.title}
                    </h3>
                    <div className="text-xs font-mono-tech text-[#F01B25] font-semibold tracking-wider">
                      {industry.subtitle}
                    </div>
                  </div>

                  <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                    {industry.description}
                  </p>
                </div>

                {/* Key Products Tag List */}
                <div className="space-y-3 border-t border-white/10 pt-5">
                  <div className="text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider">
                    Key Supplied Components:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {industry.keyProducts.map((prod, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono-tech text-zinc-300"
                      >
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SHOW ALL SECTORS > Toggle Button */}
          <button
            onClick={() => setShowAllIndustries(!showAllIndustries)}
            className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>{showAllIndustries ? 'SHOW BRIEF VIEW' : 'SHOW ALL SECTORS (4 INDUSTRIES)'}</span>
            <ArrowUpRight className={`w-4 h-4 text-[#F01B25] transition-transform duration-300 ${showAllIndustries ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>
        </div>
      </div>
    </section>
  );
};
