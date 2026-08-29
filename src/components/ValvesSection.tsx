import React, { useState } from 'react';
import { Layers, ShieldCheck, ArrowRight, Activity, Filter, Wrench } from 'lucide-react';
import { StaggeredText } from './StaggeredText';

interface ValveType {
  name: string;
  category: 'Cast' | 'Forged' | 'Specialty';
  sizes: string;
  pressure: string;
  ends: string;
  description: string;
  image?: string;
}

const VALVE_TYPES: ValveType[] = [
  {
    name: 'BALL VALVES',
    category: 'Cast',
    sizes: '1/2" to 56"',
    pressure: 'Class 150 to 4500 LBS',
    ends: 'Flanged RF/RTJ, Butt Weld',
    description: 'Trunnion-mounted & floating ball valves designed for zero-leakage isolation in high-pressure gas lines.',
    image: '/images/valve_ball.jpg',
  },
  {
    name: 'GATE VALVES',
    category: 'Cast',
    sizes: '2" to 56" (Cast) / 1/4" to 2" (Forged)',
    pressure: 'Class 150 to 4500 LBS',
    ends: 'Flanged, Socket Weld, Threaded',
    description: 'API 600 & API 602 wedge gate valves engineered for full bore flow and minimal pressure drop.',
    image: '/images/valve_gate.jpg',
  },
  {
    name: 'GLOBE VALVES',
    category: 'Cast',
    sizes: '2" to 36" (Cast) / 1/4" to 2" (Forged)',
    pressure: 'Class 150 to 4500 LBS',
    ends: 'Flanged RF/RTJ, Butt Weld',
    description: 'API 623 & BS 1873 throttling globe valves built for precise pressure regulation and high-duty cycles.',
    image: '/images/valve_globe.jpg',
  },
  {
    name: 'CHECK VALVES',
    category: 'Cast',
    sizes: '2" to 56" (API 594 Swing/Dual Plate)',
    pressure: 'Class 150 to 2500 LBS',
    ends: 'Wafer, Lug, Flanged',
    description: 'Non-slam piston, swing, and dual-plate wafer check valves preventing backflow surge.',
    image: '/images/industrial_valves.jpg',
  },
  {
    name: 'BUTTERFLY VALVES',
    category: 'Cast',
    sizes: '2" to 72"',
    pressure: 'Class 150 to 900 LBS',
    ends: 'Triple Offset, Wafer, Lug, Flanged',
    description: 'API 609 metal-seated triple offset butterfly valves built for severe fire-safe utility & hydrocarbon lines.',
    image: '/images/valve_butterfly.jpg',
  },
  {
    name: 'PLUG VALVES',
    category: 'Specialty',
    sizes: '1" to 36"',
    pressure: 'Class 150 to 2500 LBS',
    ends: 'Flanged, RF, RTJ',
    description: 'API 599 lubricated and non-lubricated sleeve plug valves for slurries, crude oil, and corrosive chemicals.',
    image: '/images/pipes_fittings.jpg',
  },
  {
    name: 'CHOKE VALVES',
    category: 'Specialty',
    sizes: '2-1/16" to 7-1/16"',
    pressure: 'API 2000 to 15,000 PSI',
    ends: 'API 6A Flanged',
    description: 'Severe service production chokes designed to control wellhead pressure and flow erosion.',
    image: '/images/rotating_equipment.jpg',
  },
  {
    name: 'EMERGENCY SHUTDOWN (ESD) VALVES',
    category: 'Specialty',
    sizes: '2" to 48"',
    pressure: 'Class 150 to 2500 LBS',
    ends: 'Flanged, Butt Weld',
    description: 'Fast-acting pneumatic/hydraulic ESD valve assemblies SIL-3 certified for emergency isolation.',
    image: '/images/valve_ball.jpg',
  },
  {
    name: 'CONTROL VALVES',
    category: 'Specialty',
    sizes: '1/2" to 24"',
    pressure: 'Class 150 to 2500 LBS',
    ends: 'Flanged, Socket Weld',
    description: 'Modulating globe & cage-guided control valves equipped with smart digital positioners.',
    image: '/images/valve_globe.jpg',
  },
  {
    name: 'ACTUATED VALVES',
    category: 'Specialty',
    sizes: '1/2" to 56"',
    pressure: 'Up to Class 2500 LBS',
    ends: 'Pneumatic / Electric / Electro-Hydraulic',
    description: 'Fully automated valve packages integrated with Rotork, AUMA, or pneumatic quarter-turn actuators.',
    image: '/images/valve_butterfly.jpg',
  },
  {
    name: 'FILTERS & STRAINERS',
    category: 'Cast',
    sizes: '1/4" to 72" (Y, Tee, Temporary, Basket)',
    pressure: 'Class 150 to 2500 LBS',
    ends: 'Threaded, Socket Weld, Flanged',
    description: 'Pipeline strainers for solid particle removal protecting downstream pumps and meters.',
    image: '/images/pipes_fittings.jpg',
  },
];

interface ValvesSectionProps {
  onOpenQuote: () => void;
}

export const ValvesSection: React.FC<ValvesSectionProps> = ({ onOpenQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Cast' | 'Forged' | 'Specialty'>('All');
  const [showAllValves, setShowAllValves] = useState(false);

  const filteredValves = VALVE_TYPES.filter(
    (v) => selectedCategory === 'All' || v.category === selectedCategory
  );

  const displayedValves = showAllValves ? filteredValves : filteredValves.slice(0, 6);

  return (
    <section id="valves" className="relative py-24 md:py-32 bg-[#0A0A0A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Editorial Section Headline */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F01B25]/10 border border-[#F01B25]/30 text-[#F01B25] font-mono-tech text-xs uppercase font-bold">
            <Activity className="w-3.5 h-3.5" />
            03 / CRITICAL FLOW CONTROL ENGINE
          </div>

          <h2 className="text-4xl sm:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.95]">
            VALVES ENGINEERED FOR <br />
            <span className="text-[#F01B25]">CRITICAL FLOW CONTROL.</span>
          </h2>

          <p className="text-base text-zinc-300 font-outfit font-light max-w-2xl leading-relaxed">
            Tech Ener-G stocks and supplies over 20,000 valve assemblies engineered under stringent API, ASME, and British Standards for extreme temperature and high-pressure energy infrastructures.
          </p>
        </div>

        {/* Technical Specification Summary Cards (Cast vs Forged vs Strainers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-xl bg-[#050505] border border-white/10 space-y-4 hover:border-[#F01B25]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tech text-[#F01B25] font-bold">01 / HEAVY CAST VALVES</span>
              <span className="text-[10px] font-mono-tech text-zinc-500">2" TO 56"</span>
            </div>
            <h3 className="text-xl font-grotesk font-bold text-white uppercase">CAST STEEL VALVES</h3>
            <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
              API 600 / API 6D Gate, Globe & Check valves constructed from Carbon Steel (WCB/LCC), Alloy & Duplex Stainless.
            </p>
            <div className="text-[11px] font-mono-tech text-zinc-300 border-t border-white/10 pt-3">
              Pressures: Class 150 LBS to 4500 LBS
            </div>
          </div>

          <div className="p-7 rounded-xl bg-[#050505] border border-white/10 space-y-4 hover:border-[#F01B25]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tech text-[#F01B25] font-bold">02 / FORGED STEEL VALVES</span>
              <span className="text-[10px] font-mono-tech text-zinc-500">1/4" TO 2"</span>
            </div>
            <h3 className="text-xl font-grotesk font-bold text-white uppercase">FORGED VALVES</h3>
            <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
              API 602 compact forged steel gate, globe, and check valves designed for high-pressure instrument lines.
            </p>
            <div className="text-[11px] font-mono-tech text-zinc-300 border-t border-white/10 pt-3">
              Ends: Threaded NPT, Socket Weld B16.11
            </div>
          </div>

          <div className="p-7 rounded-xl bg-[#050505] border border-white/10 space-y-4 hover:border-[#F01B25]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tech text-[#F01B25] font-bold">03 / FILTERS & STRAINERS</span>
              <span className="text-[10px] font-mono-tech text-zinc-500">1/4" TO 72"</span>
            </div>
            <h3 className="text-xl font-grotesk font-bold text-white uppercase">PIPELINE STRAINERS</h3>
            <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
              Y-Type, Tee-Type, Conical, and Basket strainers configured for refinery and power station particulate removal.
            </p>
            <div className="text-[11px] font-mono-tech text-zinc-300 border-t border-white/10 pt-3">
              Pressures: Class 150 LBS to 2500 LBS
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="text-xs font-mono-tech text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#F01B25]" /> Filter Category:
          </div>

          <div className="flex flex-wrap gap-2">
            {(['All', 'Cast', 'Forged', 'Specialty'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md font-mono-tech text-xs uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#F01B25] text-white font-bold shadow-md shadow-[#F01B25]/30'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat === 'All' ? 'All Valve Types' : `${cat} Series`}
              </button>
            ))}
          </div>
        </div>

        {/* Valves Matrix */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedValves.map((valve, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-[#050505]/90 border border-white/10 hover:border-[#F01B25]/60 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl overflow-hidden"
              >
                {/* Top Valve Image Preview */}
                {valve.image && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-white/10 group-hover:border-[#F01B25]/40 transition-colors shadow-md">
                    <img
                      src={valve.image}
                      alt={valve.name}
                      className="w-full h-full object-cover object-center transform-gpu group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-mono-tech font-bold text-white bg-black/75 border border-white/20 px-2.5 py-1 rounded backdrop-blur-md uppercase">
                        {valve.category} VALVE
                      </span>
                      <span className="text-[10px] font-mono-tech text-zinc-300 bg-black/60 border border-white/15 px-2 py-0.5 rounded backdrop-blur-md">
                        API / ASME
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-xl font-grotesk font-extrabold text-white uppercase group-hover:text-[#F01B25] transition-colors leading-tight">
                    {valve.name}
                  </h4>

                  <p className="text-xs font-outfit text-zinc-400 leading-relaxed font-light">
                    {valve.description}
                  </p>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4 text-[11px] font-mono-tech text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Size Range:</span>
                    <span className="font-semibold text-white">{valve.sizes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Pressure Rating:</span>
                    <span className="font-semibold text-white">{valve.pressure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">End Connections:</span>
                    <span className="font-semibold text-zinc-300 truncate max-w-[160px]">{valve.ends}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SHOW ALL VALVES > Toggle Button */}
          {filteredValves.length > 6 && (
            <button
              onClick={() => setShowAllValves(!showAllValves)}
              className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>{showAllValves ? 'SHOW BRIEF VIEW' : `SHOW ALL VALVES (${filteredValves.length} TYPES)`}</span>
              <ArrowRight className={`w-4 h-4 text-[#F01B25] transition-transform duration-300 ${showAllValves ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
            </button>
          )}
        </div>

        {/* Bottom Valve Procurement CTA */}
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-zinc-950 via-[#111111] to-zinc-950 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-grotesk font-bold text-white uppercase">
              Need Valve Specifications or Material Test Reports (MTR)?
            </h3>
            <p className="text-sm font-outfit text-zinc-400">
              Our engineering team provides EN-ISO 10204 3.1 certification and mill test reports for all valve shipments.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="shrink-0 px-8 py-4 rounded-md bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 shadow-xl shadow-[#F01B25]/20 flex items-center gap-2"
          >
            Request Valve Catalog & Pricing
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
