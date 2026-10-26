import React, { useEffect, useRef, useState } from 'react';

interface ScrollDrivenEditorialTextProps {
  className?: string;
}

export const ScrollDrivenEditorialText: React.FC<ScrollDrivenEditorialTextProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // The exact sentence matching user reference
  const text =
    'We deliver engineered products, systems and services that power progress across the industries that build our world.';

  const words = text.split(' ');

  // Listen to both window and the scroll container
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;

          // Slower, extended scroll range:
          // Starts when container top enters 90% of screen height
          // Progresses gently and finishes when container top reaches 10% of screen height
          const start = windowHeight * 0.90;
          const end = windowHeight * 0.05;

          const current = start - rect.top;
          const totalDistance = start - end;
          const rawProgress = current / totalDistance;

          // Clamped progress between 0 and 1
          const clampedProgress = Math.max(0, Math.min(1, rawProgress));
          setScrollProgress(clampedProgress);

          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    // Listen to window
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Also listen to parent scrollable containers
    let parent = containerRef.current?.parentElement;
    const scrollContainers: HTMLElement[] = [];

    while (parent) {
      const overflowY = window.getComputedStyle(parent).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        parent.addEventListener('scroll', handleScroll, { passive: true });
        scrollContainers.push(parent);
      }
      parent = parent.parentElement;
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      scrollContainers.forEach((c) => c.removeEventListener('scroll', handleScroll));
    };
  }, []);

  return (
    <div ref={containerRef} className={`space-y-6 max-w-5xl py-4 ${className}`}>
      {/* Eyebrow matching reference screenshot: — WHAT DRIVES US */}
      <div className="flex items-center gap-3">
        <span className="h-[2px] w-7 bg-[#F01B25]" />
        <span className="text-xs sm:text-sm font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
          WHAT DRIVES US
        </span>
      </div>

      {/* Massive Editorial Headline with Slower, Continuous Word-by-Word Scroll Reveal */}
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-grotesk font-extrabold tracking-tight leading-[1.12] flex flex-wrap gap-x-[0.25em] gap-y-2 select-none">
        {words.map((word, idx) => {
          const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
          const isHighlight = cleanWord === 'power' || cleanWord === 'progress';

          // Staggered pacing: spreads word reveals evenly across the extended scroll distance
          // Each word has an individual threshold and a wider transition curve for gentle pacing
          const total = words.length;
          const wordStart = (idx / total) * 0.75;
          const wordDuration = 0.25; // Slower transition duration per word

          const rawWordProgress = (scrollProgress - wordStart) / wordDuration;
          const wordProgress = Math.max(0, Math.min(1, rawWordProgress));

          // Continuous RGB color interpolation for buttery-smooth visual transition:
          // Unrevealed state: Soft Silver rgb(215, 218, 224)
          // Target Normal: Deep Black rgb(9, 9, 11)
          // Target Highlight (power, progress): Vibrant Red rgb(240, 27, 37)
          const startR = 215, startG = 218, startB = 224;
          const endR = isHighlight ? 240 : 9;
          const endG = isHighlight ? 27 : 9;
          const endB = isHighlight ? 37 : 11;

          const r = Math.round(startR + (endR - startR) * wordProgress);
          const g = Math.round(startG + (endG - startG) * wordProgress);
          const b = Math.round(startB + (endB - startB) * wordProgress);

          const color = `rgb(${r}, ${g}, ${b})`;
          const opacity = 0.4 + wordProgress * 0.6;

          return (
            <span
              key={`${word}-${idx}`}
              style={{
                color,
                opacity,
                transition: 'color 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.3s ease-out',
                textShadow: isHighlight && wordProgress > 0.4 ? '0 0 25px rgba(240, 27, 37, 0.35)' : 'none',
              }}
              className={`inline-block transform-gpu will-change-transform ${
                isHighlight ? 'font-black relative' : 'font-extrabold'
              }`}
            >
              {word}
            </span>
          );
        })}
      </h2>
    </div>
  );
};
