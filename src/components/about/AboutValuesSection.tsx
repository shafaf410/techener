import React from 'react';
import { motion } from 'framer-motion';
import { Target, ShieldCheck, Cpu, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { AboutConfig } from '../../types/about';

interface AboutValuesSectionProps {
  config: AboutConfig;
}

export const AboutValuesSection: React.FC<AboutValuesSectionProps> = ({ config }) => {
  const { coreValues } = config;

  const getIcon = (name: string) => {
    switch (name) {
      case 'focus':
        return <Target className="w-6 h-6 text-[#F01B25]" />;
      case 'quality':
        return <ShieldCheck className="w-6 h-6 text-[#F01B25]" />;
      case 'innovation':
        return <Cpu className="w-6 h-6 text-[#F01B25]" />;
      case 'integrity':
      default:
        return <HeartHandshake className="w-6 h-6 text-[#F01B25]" />;
    }
  };

  return (
    <div className="w-full">
      {/* CORE VALUES (Dark Section matching reference: "PEOPLE, PROCESS, PERFORMANCE") */}
      <section className="w-full bg-[#080808] text-white py-20 sm:py-28 px-6 md:px-12 border-b border-white/10 relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F01B25]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-14 relative z-10">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between border-b border-white/10 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#F01B25]" />
                <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                  {coreValues.eyebrow}
                </span>
              </div>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-grotesk font-extrabold uppercase tracking-tight text-white leading-[0.95]">
                PEOPLE, PROCESS, <br className="hidden sm:inline" />
                <span className="text-[#F01B25] drop-shadow-[0_0_30px_rgba(240,27,37,0.45)]">
                  PERFORMANCE
                </span>
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 text-zinc-400 font-outfit text-sm sm:text-base leading-relaxed lg:pl-10"
            >
              {coreValues.subtitle}
            </motion.div>
          </div>

          {/* 4 Clean Value Cards matching reference layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.values.map((val, idx) => (
              <motion.div
                key={val.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-7 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#F01B25]/80 hover:bg-[#141414] transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-default shadow-lg hover:shadow-[0_0_25px_rgba(240,27,37,0.15)]"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#F01B25]/10 group-hover:border-[#F01B25]/30 transition-all">
                    {getIcon(val.iconName)}
                  </div>
                  <h4 className="text-lg font-grotesk font-extrabold uppercase tracking-tight text-white group-hover:text-[#F01B25] transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-outfit text-zinc-400 leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono-tech text-zinc-500 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25]" />
                  <span>CORE PILLAR 0{idx + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
