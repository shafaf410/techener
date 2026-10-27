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
    <section id="certifications-section" className="relative w-full bg-[#050505] text-white">
      {/* Dynamic Curved Curtain that wipes over the previous page on scroll */}
      <div className="about-curve-curtain relative w-full -mt-16 sm:-mt-24 md:-mt-32 pointer-events-none overflow-hidden z-20">
        <svg
          viewBox="0 0 1440 160"
          className="w-full h-16 sm:h-24 md:h-32 fill-[#050505] drop-shadow-[0_-25px_35px_rgba(0,0,0,0.45)] block"
          preserveAspectRatio="none"
        >
          <path d="M 0,160 C 360,25 1080,25 1440,160 Z" />
        </svg>
      </div>

      {/* Ambient Red Glow Halo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#F01B25]/10 blur-[140px] rounded-full pointer-events-none z-0" />

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
        contentGap={28}
        backgroundColor="#050505"
        headline={
          <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto select-none">
            {/* Monumental Headline in Brand Space Grotesk */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-grotesk leading-[1.08] drop-shadow-xl">
              GLOBAL QUALITY.<br />
              <span className="text-[#F01B25] drop-shadow-[0_0_30px_rgba(240,27,37,0.4)]">
                ZERO COMPROMISE.
              </span>
            </h2>
          </div>
        }
      >
        {/* Sleek CTA Revealed Below Headline */}
        {onOpenQuote && (
          <div className="flex justify-center select-none pt-2">
            <button
              type="button"
              onClick={onOpenQuote}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F01B25] hover:bg-white text-white hover:text-black text-xs sm:text-sm font-mono-tech uppercase tracking-wider font-bold transition-all duration-300 shadow-[0_0_30px_rgba(240,27,37,0.35)] hover:shadow-white/20 cursor-pointer"
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
