import React from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section id="certifications-section" className="relative w-full bg-[#050505] text-white overflow-hidden">
      {/* Ambient Glassmorphic Stage Depth behind tiles and cards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-[#F01B25]/12 via-zinc-800/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      </div>

      <TileReveal
        images={industrialTiles}
        revealTextAtEnd={true}
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
        contentGap={24}
        backgroundColor="transparent"
        headline={
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 select-none">
            {/* Ultra-Premium Glassmorphism Card Container */}
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-zinc-950/70 backdrop-blur-2xl border border-white/[0.12] p-8 sm:p-12 md:p-14 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(240,27,37,0.14)] ring-1 ring-white/10 text-center">
              {/* Glass specular top edge highlight */}
              <div className="absolute top-0 inset-x-8 sm:inset-x-16 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

              {/* Internal ambient glass reflections */}
              <div className="absolute -top-24 -left-24 w-52 h-52 bg-[#F01B25]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

              {/* Glassmorphic Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md mb-6 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse shadow-[0_0_8px_#F01B25]" />
                <span className="text-[11px] font-mono-tech font-bold uppercase tracking-widest text-zinc-300">
                  Certified Industrial Infrastructure
                </span>
              </div>

              {/* Monumental Headline in Brand Space Grotesk */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white font-grotesk leading-[0.98] drop-shadow-2xl">
                GLOBAL QUALITY.<br />
                <span className="text-[#F01B25] drop-shadow-[0_0_40px_rgba(240,27,37,0.55)]">
                  ZERO COMPROMISE.
                </span>
              </h2>

              {/* Assurance Subtitle */}
              <p className="mt-5 text-sm sm:text-base text-zinc-300/90 font-outfit max-w-xl mx-auto leading-relaxed">
                Precision-engineered flow systems verified to exceed ASME, API, and ISO standards for world-scale energy projects.
              </p>
            </div>
          </div>
        }
      >
        {/* Sleek CTA Revealed at Final Phase */}
        {onOpenQuote && (
          <div className="flex justify-center select-none pt-2">
            <button
              type="button"
              onClick={onOpenQuote}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#F01B25] hover:bg-white text-white hover:text-black text-xs sm:text-sm font-mono-tech uppercase tracking-wider font-bold transition-all duration-300 shadow-[0_0_35px_rgba(240,27,37,0.45)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-pointer backdrop-blur-sm"
            >
              <span>Request Specification Sheet</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </TileReveal>
    </section>
  );
};

export default AboutCertificationsSection;
