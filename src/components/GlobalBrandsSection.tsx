import React, { useState } from 'react';
import { Globe, MapPin, Building2, CheckCircle2 } from 'lucide-react';

const AUTHORIZED_BRANDS = [
  { name: 'BONNEY FORGE', origin: 'USA / International', spec: 'Forged Steel Valves & Fittings' },
  { name: 'VALVITALIA-VITAS', origin: 'Italy', spec: 'Severe Service & Pipeline Valves' },
  { name: 'DOUGLAS CHERO', origin: 'Italy', spec: 'High-Pressure Forged Valves' },
  { name: 'OMB', origin: 'Italy', spec: 'Oil & Gas Forged Steel Valves' },
  { name: 'DIKKAN', origin: 'Turkey', spec: 'Industrial & Marine Valves' },
  { name: '3DV', origin: 'International', spec: 'Specialty Industrial Valves' },
  { name: 'FBV', origin: 'International', spec: 'Ball, Gate & Globe Valves' },
  { name: 'FUSION', origin: 'International', spec: 'Flow Control & Valve Systems' },
  { name: 'OLIVER', origin: 'UK', spec: 'Instrumentation Needle & Manifold Valves' },
  { name: 'NOVEL', origin: 'International', spec: 'Industrial Valves & Actuators' },
  { name: 'GWC ITALIA', origin: 'Italy', spec: 'Pipeline & Trunnion Ball Valves' },
];

const REGIONAL_MARKETS = [
  { region: 'MIDDLE EAST & UAE', status: 'Core Logistics Hub & Head Office' },
  { region: 'MENA REGION', status: 'Active Energy Client Network' },
  { region: 'AFRICA', status: 'Mining & Power Sourcing Contracts' },
  { region: 'ASIA', status: 'Manufacturing & Industrial Supply' },
  { region: 'EUROPE', status: 'OEM Manufacturer Alliances' },
  { region: 'CIS REGION', status: 'Pipeline & Gas Infrastructure' },
];

export const GlobalBrandsSection: React.FC = () => {
  const [showAllBrands, setShowAllBrands] = useState(false);

  const displayedBrands = showAllBrands ? AUTHORIZED_BRANDS : AUTHORIZED_BRANDS.slice(0, 6);

  return (
    <section className="relative py-24 md:py-32 bg-[#0A0A0A] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
              07 / GLOBAL BUYING NETWORK & AUTHORIZED BRANDS
            </span>
            <h2 className="text-4xl sm:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight">
              YOUR GLOBAL <br />
              <span className="text-zinc-500">BUYING PARTNER.</span>
            </h2>
          </div>

          <p className="text-sm font-outfit text-zinc-400 max-w-md leading-relaxed">
            Tech Ener-G acts as a direct strategic bridge connecting world-renowned valve and equipment OEMs with industrial operators across MENA, Africa, Asia, Europe, and CIS regions.
          </p>
        </div>

        {/* Global Geographic Sourcing Network Display */}
        <div className="p-8 md:p-12 rounded-2xl bg-[#050505] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono-tech text-white">
              <Globe className="w-4 h-4 text-[#F01B25]" /> GLOBAL LOGISTICS FOOTPRINT
            </div>

            <h3 className="text-3xl font-grotesk font-bold text-white uppercase leading-tight">
              CROSS-BORDER INDUSTRIAL PROCUREMENT.
            </h3>

            <p className="text-sm font-outfit text-zinc-300 leading-relaxed">
              Our journey is focused on satisfying client technical requirements through an uncompromised bridge with premier global manufacturers built on trust and consistency.
            </p>
          </div>

          {/* Interactive Graphic Map Display */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-xl overflow-hidden border border-white/15 shadow-2xl group red-border-glow">
              <img
                src="/images/global_sourcing_map.jpg"
                alt="Global Sourcing Network Map"
                className="w-full h-full object-cover object-center transform-gpu group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Floating Map Legend Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 border border-white/20 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse" />
                  <span className="text-[10px] font-mono-tech text-white font-bold uppercase">
                    LOGISTICS HUBS: UAE | MENA | ASIA | EUROPE | AFRICA | CIS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Esteemed Brands Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono-tech font-bold text-zinc-400 uppercase tracking-widest">
              ESTEEMED BRANDS STOCKIST & DISTRIBUTOR
            </span>
            <span className="text-xs font-mono-tech text-[#F01B25]">100% GENUINE OEM COMPONENTS</span>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedBrands.map((brand, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-xl bg-[#050505] border border-white/10 hover:border-[#F01B25]/60 transition-all duration-300 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono-tech text-zinc-500 uppercase">{brand.origin}</div>
                    <h4 className="text-lg font-grotesk font-black text-zinc-400 group-hover:text-white transition-colors uppercase">
                      {brand.name}
                    </h4>
                  </div>
                  <div className="text-xs font-outfit text-zinc-500 group-hover:text-zinc-300 transition-colors border-t border-white/5 pt-2">
                    {brand.spec}
                  </div>
                </div>
              ))}
            </div>

            {/* SHOW ALL BRANDS > Toggle Button */}
            <button
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>{showAllBrands ? 'SHOW BRIEF VIEW' : `SHOW ALL BRANDS (${AUTHORIZED_BRANDS.length} OEMS)`}</span>
              <Building2 className="w-4 h-4 text-[#F01B25]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
