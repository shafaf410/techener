import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { AboutConfig } from '../../types/about';
import { TileReveal } from '../ui/tile-reveal';

interface AboutCertificationsSectionProps {
  config?: AboutConfig;
  onOpenQuote?: () => void;
}

export const AboutCertificationsSection: React.FC<AboutCertificationsSectionProps> = ({
  onOpenQuote,
}) => {
  // 12 curated industrial images from the project
  const industrialTiles: string[] = [
    '/images/industrial_valves.jpg',
    '/images/pipes_fittings.jpg',
    '/images/industry_oil_gas.jpg',
    '/images/rotating_equipment.jpg',
    '/images/industry_power_gen.jpg',
    '/images/valve_ball.jpg',
    '/images/industry_manufacturing.jpg',
    '/images/valve_butterfly.jpg',
    '/images/valve_gate.jpg',
    '/images/industrial_lubrication.jpg',
    '/images/valve_globe.jpg',
    '/images/industry_construction.jpg',
  ];

  return (
    <section id="certifications-section" className="relative w-full bg-[#050505] text-white">
      <TileReveal
        images={industrialTiles}
        columns={3}
        gap={24}
        gridWidth={880}
        tileAspect={1.15}
        tileRadius={16}
        direction="alternate"
        stagger={0.06}
        overlap={0.6}
        zoom={2.1}
        spread={0.42}
        scrollLength={2.8}
        scrub={0.08}
        contentGap={32}
        backgroundColor="#050505"
        headline={
          <div className="flex flex-col items-center text-center px-4 max-w-5xl mx-auto select-none">
            {/* Pill Header */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(240,27,37,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.24em] text-white/90 uppercase font-semibold">
                Certified to Global Standards
              </span>
            </div>

            {/* Monumental Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white font-space leading-[0.98] drop-shadow-xl">
              GLOBAL QUALITY.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F01B25] via-red-500 to-white">
                ZERO COMPROMISE.
              </span>
            </h2>
          </div>
        }
      >
        <div className="max-w-4xl mx-auto px-4 text-center select-none">
          {/* Subtitle statement */}
          <p className="text-xs sm:text-sm md:text-base text-neutral-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Every valve, actuator, and high-pressure fitting distributed by Tech Ener-G Trading FZE is vetted to stringent international manufacturing standards with complete material test reports (MTR).
          </p>

          {/* 4 Credentials Badges (Adapted from previous cards) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8">
            {/* ISO 9001:2015 */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-left transition-all duration-300 hover:border-[#F01B25] hover:bg-white/[0.06] group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#F01B25] font-bold">ISO 9001:2015</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-white uppercase font-space tracking-tight">Quality Hub</div>
              <div className="text-[10px] text-neutral-400 font-mono mt-1">Bureau Veritas / IAF</div>
            </div>

            {/* API SPEC 6D */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-left transition-all duration-300 hover:border-[#0A84FF] hover:bg-white/[0.06] group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#0A84FF] font-bold">API SPEC 6D</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-white uppercase font-space tracking-tight">Pipeline Valves</div>
              <div className="text-[10px] text-neutral-400 font-mono mt-1">Severe-Service Spec</div>
            </div>

            {/* AUTEL */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-left transition-all duration-300 hover:border-emerald-500 hover:bg-white/[0.06] group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold">AUTEL ITALY</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-white uppercase font-space tracking-tight">Official Partner</div>
              <div className="text-[10px] text-neutral-400 font-mono mt-1">Industrial Filtration</div>
            </div>

            {/* REDFLUID */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-left transition-all duration-300 hover:border-amber-500 hover:bg-white/[0.06] group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-amber-400 font-bold">REDFLUID SPAIN</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-white uppercase font-space tracking-tight">High Pressure</div>
              <div className="text-[10px] text-neutral-400 font-mono mt-1">Needle & Manifold</div>
            </div>
          </div>

          {/* Action button */}
          {onOpenQuote && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F01B25] hover:bg-[#d0151f] text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_25px_rgba(240,27,37,0.35)] cursor-pointer"
              >
                <span>Request Specification Sheet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </TileReveal>
    </section>
  );
};

export default AboutCertificationsSection;
