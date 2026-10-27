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
      {/* Cinematic Transition Bridge from Light Leadership Section into Dark Stage */}
      <div className="relative w-full overflow-hidden pointer-events-none z-20">
        {/* Soft atmospheric gradient blend from white to deep obsidian */}
        <div className="h-24 sm:h-32 md:h-40 w-full bg-gradient-to-b from-white via-zinc-950/80 to-[#050505]" />

        {/* Luminous Red Horizon Line & Ambient Flare */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
          <div className="w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-[#F01B25] to-transparent opacity-90 shadow-[0_0_20px_#F01B25]" />
          <div className="absolute w-80 sm:w-96 h-12 bg-[#F01B25]/25 blur-2xl rounded-full" />
        </div>
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
