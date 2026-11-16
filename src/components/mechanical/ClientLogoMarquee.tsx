import React from 'react';
import { CLIENT_LOGOS } from '../../data/clientLogosData';

export const ClientLogoMarquee: React.FC = () => {
  // Split logos into two rows for dual gliding marquee
  const row1 = CLIENT_LOGOS.slice(0, 10);
  const row2 = CLIENT_LOGOS.slice(10);

  return (
    <section className="space-y-8 border-t border-b border-zinc-200/90 py-12 bg-white">
      {/* Section Header matching mockup */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
            <span className="font-black">—</span>
            <span>OUR PARTNERSHIPS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-grotesk font-black uppercase tracking-tight text-zinc-950">
            TRUSTED BY INDUSTRY LEADERS
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-outfit text-zinc-500 max-w-md font-normal leading-relaxed">
          A global network of trusted industrial partnerships and client relationships across GCC, MENA, and international energy markets.
        </p>
      </div>

      {/* Marquee Row 1: Gliding Left */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
        <div className="flex items-center gap-6 sm:gap-8 w-max animate-marquee-infinite py-3">
          {[...row1, ...row1, ...row1].map((logo, idx) => (
            <div
              key={`${logo.id}-r1-${idx}`}
              className="group relative flex items-center justify-center h-24 sm:h-28 min-w-[210px] sm:min-w-[250px] px-6 sm:px-8 py-3 rounded-2xl bg-white border border-zinc-200/90 shadow-sm hover:border-[#F01B25] hover:shadow-xl hover:shadow-[#F01B25]/10 hover:-translate-y-1 transition-all duration-300"
              title={logo.name}
            >
              <img
                src={logo.src || (logo as any).logo}
                alt={logo.name}
                loading="lazy"
                className="max-h-16 sm:max-h-18 max-w-[170px] sm:max-w-[200px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2: Gliding Right */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
        <div className="flex items-center gap-6 sm:gap-8 w-max animate-marquee-reverse py-3">
          {[...row2, ...row2, ...row2].map((logo, idx) => (
            <div
              key={`${logo.id}-r2-${idx}`}
              className="group relative flex items-center justify-center h-24 sm:h-28 min-w-[210px] sm:min-w-[250px] px-6 sm:px-8 py-3 rounded-2xl bg-white border border-zinc-200/90 shadow-sm hover:border-[#F01B25] hover:shadow-xl hover:shadow-[#F01B25]/10 hover:-translate-y-1 transition-all duration-300"
              title={logo.name}
            >
              <img
                src={logo.src || (logo as any).logo}
                alt={logo.name}
                loading="lazy"
                className="max-h-16 sm:max-h-18 max-w-[170px] sm:max-w-[200px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
