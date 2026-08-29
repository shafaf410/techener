import React from 'react';
import { Truck, ShieldCheck, Clock, Network, Award, ArrowUpRight } from 'lucide-react';
import { SpeedingText } from './SpeedingText';
import { CountUpNumber } from './CountUpNumber';

interface WhyUsSectionProps {
  onOpenQuote: () => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative py-24 md:py-32 bg-[#0A0A0A] border-t border-white/10 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg-overlay opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-20">
        {/* Large Hero Metric Banner */}
        <div className="p-8 md:p-16 rounded-3xl bg-gradient-to-br from-[#050505] via-[#111111] to-[#050505] border border-white/15 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#F01B25]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Massive Numerical Display with CountUpNumber */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase block">
                05 / INVENTORY CAPABILITY
              </span>

              <div className="py-2">
                <CountUpNumber
                  end={20000}
                  suffix="+"
                  duration={2.5}
                  className="font-grotesk font-black text-6xl sm:text-8xl lg:text-9xl text-white tracking-tighter leading-none"
                />
              </div>

              <div className="overflow-hidden py-1">
                <SpeedingText speed={1.2} direction="left">
                  <div className="text-2xl sm:text-4xl font-grotesk font-extrabold text-zinc-300 uppercase tracking-tight">
                    PIECES READY TO MOVE.
                  </div>
                </SpeedingText>
              </div>
            </div>

            {/* Explanatory Editorial Text */}
            <div className="lg:col-span-6 space-y-6 text-zinc-300 font-outfit text-base leading-relaxed border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
              <p className="text-lg font-light text-white">
                Tech Ener-G operates an agile, continuous supply chain designed to drastically shorten lead times for critical industrial turnarounds.
              </p>
              <p>
                From off-the-shelf valves to high-spec exotic piping fittings, our Ajman hub and international partner networks dispatch order inventory with guaranteed speed and comprehensive compliance documentation.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenQuote}
                  className="px-7 py-3.5 rounded-md bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-xl shadow-[#F01B25]/20 flex items-center gap-2"
                >
                  Verify Inventory & Quote
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="p-6 rounded-xl bg-[#050505] border border-white/10 space-y-4 hover:border-[#F01B25]/50 transition-colors">
            <Truck className="w-7 h-7 text-[#F01B25]" />
            <h4 className="text-lg font-grotesk font-bold text-white uppercase">FAST DELIVERY</h4>
            <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
              Efficient supply chain with guaranteed daily deliveries for urgent turnaround needs.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#050505] border border-white/10 space-y-4 hover:border-[#F01B25]/50 transition-colors">
            <Network className="w-7 h-7 text-[#F01B25]" />
            <h4 className="text-lg font-grotesk font-bold text-white uppercase">STRONG SUPPLY CHAIN</h4>
            <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
              Direct manufacturer bridge reducing intermediary markups and delivery bottlenecks.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#050505] border border-white/10 space-y-4 hover:border-[#F01B25]/50 transition-colors">
            <ShieldCheck className="w-7 h-7 text-[#F01B25]" />
            <h4 className="text-lg font-grotesk font-bold text-white uppercase">GUARANTEED QUALITY</h4>
            <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
              Full traceability under EN-ISO 10204 3.1 and API/ASME standards.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#050505] border border-white/10 space-y-4 hover:border-[#F01B25]/50 transition-colors">
            <Award className="w-7 h-7 text-[#F01B25]" />
            <h4 className="text-lg font-grotesk font-bold text-white uppercase">TRUSTED BRANDS</h4>
            <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
              Authorized stockist of Bonney Forge, Valvitalia, OMB, Dikkan, GWC Italia, Oliver.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#050505] border border-white/10 space-y-4 hover:border-[#F01B25]/50 transition-colors">
            <Clock className="w-7 h-7 text-[#F01B25]" />
            <h4 className="text-lg font-grotesk font-bold text-white uppercase">24/7 TECHNICAL SERVICE</h4>
            <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
              Engineered guidance and emergency assistance available round the clock.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
