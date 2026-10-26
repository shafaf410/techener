import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe2 } from 'lucide-react';
import { AboutConfig } from '../../types/about';
import { ScrollDrivenEditorialText } from './ScrollDrivenEditorialText';

interface AboutIntroSectionProps {
  config: AboutConfig;
}

// Subtle Count-Up Component for Statistics
const AnimatedNumber: React.FC<{ value: number; duration?: number }> = ({ value, duration = 1.6 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easedProgress);

      setDisplayValue(current);

      if (frame >= totalFrames) {
        clearInterval(counter);
        setDisplayValue(end);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
};

export const AboutIntroSection: React.FC<AboutIntroSectionProps> = ({ config }) => {
  const { intro } = config;

  return (
    <section id="about-intro-section" className="w-full bg-white text-zinc-900 py-20 sm:py-28 px-6 md:px-12 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* SIGNATURE SCROLL-DRIVEN REVEALING EDITORIAL STATEMENT matching reference image */}
        <div className="space-y-10 pt-4">
          {/* The ScrollDrivenEditorialText on pure white background */}
          <ScrollDrivenEditorialText />

          {/* Supporting paragraph and map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-zinc-200 items-center">
            <p className="lg:col-span-7 text-base font-outfit text-zinc-600 leading-relaxed font-normal">
              {intro.secondaryText}
            </p>

            {/* World Sourcing Map visual preview */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-sm">
              <img
                src="/images/red_white_world_map.jpg"
                alt="Global Sourcing Network"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-zinc-50 flex items-center justify-between text-[11px] font-mono-tech text-zinc-600 border-t border-zinc-200">
                <span className="flex items-center gap-1.5 text-zinc-900 font-semibold">
                  <Globe2 className="w-3.5 h-3.5 text-[#F01B25]" /> UAE Logistics Hub
                </span>
                <span className="text-[#F01B25] font-bold">18+ OEM Networks</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Animated Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 pt-10 border-t border-zinc-200">
          {intro.stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-1.5"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-grotesk font-extrabold text-zinc-950 flex items-baseline tracking-tight">
                {stat.prefix && <span className="text-2xl text-zinc-500 mr-1">{stat.prefix}</span>}
                <AnimatedNumber value={stat.value} />
                {stat.suffix && <span className="text-[#F01B25] text-3xl sm:text-4xl ml-0.5">{stat.suffix}</span>}
              </div>
              <div className="text-xs font-mono-tech font-bold uppercase tracking-wider text-zinc-800">
                {stat.label}
              </div>
              {stat.sublabel && (
                <div className="text-[11px] font-outfit text-zinc-500 leading-tight">
                  {stat.sublabel}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
