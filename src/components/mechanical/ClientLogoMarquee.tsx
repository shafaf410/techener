import React, { useState } from 'react';
import { CLIENT_LOGOS, ClientLogo } from '../../data/clientLogosData';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface ClientLogoMarqueeProps {
  className?: string;
  logos?: ClientLogo[];
}

export const ClientLogoMarquee: React.FC<ClientLogoMarqueeProps> = ({
  className = '',
  logos = CLIENT_LOGOS,
}) => {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  // Split into 2 rows for opposite directional movement
  const row1 = logos.slice(0, Math.ceil(logos.length / 2));
  const row2 = logos.slice(Math.ceil(logos.length / 2));

  // Triplicate each row for seamless uninterrupted looping
  const loopRow1 = [...row1, ...row1, ...row1];
  const loopRow2 = [...row2, ...row2, ...row2];

  return (
    <section className={`relative w-full py-20 sm:py-28 bg-[#080808] text-white border-y border-white/10 overflow-hidden ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F01B25]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse shadow-[0_0_8px_#F01B25]" />
            <span className="text-[11px] font-mono-tech uppercase font-bold tracking-widest text-zinc-300">
              PROVEN TRACK RECORD // GLOBAL OPERATORS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-grotesk font-extrabold uppercase tracking-tight text-white leading-[0.98]">
            TRUSTED BY INDUSTRY LEADERS
          </h2>

          <p className="text-sm sm:text-base font-outfit text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            Building reliable industrial partnerships through trusted products, engineering expertise, and global supply chain solutions.
          </p>
        </div>

        {/* Dual Continuous Gliding Marquee Container */}
        <div className="relative w-full overflow-hidden select-none py-4 space-y-6">
          {/* Subtle Edge Fade Masks on Left & Right */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#080808] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#080808] to-transparent z-20 pointer-events-none" />

          {/* Row 1: Gliding Left */}
          <div className="animate-marquee-infinite flex items-center gap-6 sm:gap-8">
            {loopRow1.map((logo, idx) => (
              <div
                key={`r1-${logo.id}-${idx}`}
                onMouseEnter={() => setHoveredLogo(logo.id)}
                onMouseLeave={() => setHoveredLogo(null)}
                className="group relative flex-shrink-0 flex items-center justify-center px-6 py-4 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-[#F01B25]/60 hover:bg-zinc-900 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-[#F01B25]/10 min-w-[170px] sm:min-w-[200px] h-[80px] sm:h-[90px]"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-10 sm:max-h-12 w-auto max-w-[130px] sm:max-w-[150px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />

                {/* Hover Tooltip with Client Name */}
                <div className={`absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#F01B25] text-white text-[10px] font-mono-tech font-bold uppercase tracking-wider whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 z-30 ${
                  hoveredLogo === logo.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                }`}>
                  {logo.name}
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Gliding Right (Opposite Direction) */}
          <div className="animate-marquee-reverse flex items-center gap-6 sm:gap-8">
            {loopRow2.map((logo, idx) => (
              <div
                key={`r2-${logo.id}-${idx}`}
                onMouseEnter={() => setHoveredLogo(logo.id)}
                onMouseLeave={() => setHoveredLogo(null)}
                className="group relative flex-shrink-0 flex items-center justify-center px-6 py-4 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-[#F01B25]/60 hover:bg-zinc-900 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-[#F01B25]/10 min-w-[170px] sm:min-w-[200px] h-[80px] sm:h-[90px]"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-10 sm:max-h-12 w-auto max-w-[130px] sm:max-w-[150px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />

                {/* Hover Tooltip with Client Name */}
                <div className={`absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#F01B25] text-white text-[10px] font-mono-tech font-bold uppercase tracking-wider whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 z-30 ${
                  hoveredLogo === logo.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                }`}>
                  {logo.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credibility Footer Strip */}
        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F01B25]" />
            <span>APPROVED VENDOR ACROSS ENERGY, UTILITY & PROCESS NETWORKS</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-zinc-500">
            <span>• UAE & GCC Supply Chains</span>
            <span>• 100% Traceability & MTRs</span>
          </div>
        </div>
      </div>
    </section>
  );
};
