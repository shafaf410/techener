import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS_DATA = [
  {
    number: '01',
    lines: ['ESTABLISHED', 'IN 2021'],
    subtext: 'Tech Ener-G was established in 2021 as a global procurement and engineering solutions partner.',
  },
  {
    number: '02',
    lines: ['ISO 9001', 'CERTIFIED'],
    subtext: 'A quality-focused company operating with ISO 9001 quality management certification.',
  },
  {
    number: '03',
    lines: ['DUBAI', 'AJMAN', 'INDIA'],
    subtext: 'Operations and strategic presence across Dubai, Ajman, and India.',
  },
];

export const HighlightsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const contentItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      if (!containerRef.current || !viewportRef.current) return;

      // 1. Entrance animation for the LEFT logo as section comes into view
      if (logoWrapperRef.current) {
        gsap.fromTo(
          logoWrapperRef.current,
          {
            x: -80,
            opacity: 0,
            scale: 0.9,
            filter: 'blur(8px)',
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            ease: 'power3.out',
            duration: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Master pinned timeline for vertical rolling text transitions
      const items = contentItemsRef.current.filter(Boolean) as HTMLDivElement[];
      if (items.length < 3) return;

      // Set initial positions for right-side items
      // Item 0 starts visible; Items 1 and 2 start below (y: 120%, opacity: 0)
      gsap.set(items[0], { yPercent: 0, opacity: 1, filter: 'blur(0px)' });
      gsap.set(items[1], { yPercent: 120, opacity: 0, filter: 'blur(8px)' });
      gsap.set(items[2], { yPercent: 120, opacity: 0, filter: 'blur(8px)' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            // Update active number indicator
            if (activeStepRef.current) {
              const progress = self.progress;
              if (progress < 0.45) {
                activeStepRef.current.innerText = '01';
              } else if (progress < 0.8) {
                activeStepRef.current.innerText = '02';
              } else {
                activeStepRef.current.innerText = '03';
              }
            }
          },
        },
      });

      // --- PHASE 1: Transition from Item 01 to Item 02 ---
      tl.to(
        items[0],
        {
          yPercent: -120,
          opacity: 0,
          filter: 'blur(8px)',
          ease: 'power2.inOut',
          duration: 1,
        },
        0.5
      );

      tl.to(
        items[1],
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.inOut',
          duration: 1,
        },
        0.5
      );

      // --- PHASE 2: Transition from Item 02 to Item 03 ---
      tl.to(
        items[1],
        {
          yPercent: -120,
          opacity: 0,
          filter: 'blur(8px)',
          ease: 'power2.inOut',
          duration: 1,
        },
        1.8
      );

      tl.to(
        items[2],
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.inOut',
          duration: 1,
        },
        1.8
      );

      // Progress bar fill animation from left (0% to 100%)
      if (progressBarRef.current) {
        tl.to(
          progressBarRef.current,
          {
            scaleX: 1,
            ease: 'none',
            duration: 2.8,
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="highlights"
      className="relative w-full bg-[#050505] text-[#F4F4F4] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#F01B25]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#8B0010]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* STICKY VISUAL VIEWPORT */}
      <div
        ref={viewportRef}
        className="w-full h-screen h-[100svh] max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-14 flex flex-col justify-between relative z-10"
      >
        {/* TOP EYEBROW HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#F01B25] rounded-full animate-pulse" />
            <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
              TECH ENER-G AT A GLANCE
            </span>
          </div>
          <span className="text-xs font-mono-tech text-zinc-400 uppercase tracking-widest hidden sm:inline">
            COMPANY HIGHLIGHTS
          </span>
        </div>

        {/* MAIN 2-COLUMN GRID (CENTERED) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center my-auto py-6">
          {/* LEFT COLUMN — ANIMATED LOGO CARD */}
          <div className="lg:col-span-5 flex justify-start">
            <div
              ref={logoWrapperRef}
              className="relative group p-6 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden transition-all duration-500 hover:border-[#F01B25]/40 w-full max-w-md"
            >
              {/* Subtle Red Accent Glow Border Effect */}
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#F01B25]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#F01B25]/25 transition-colors duration-500" />
              <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F01B25]/40 to-transparent" />

              {/* Official Tech Ener-G Logo */}
              <div className="py-4 flex items-center justify-center lg:justify-start">
                <img
                  src="/logo.png"
                  alt="Tech Ener-G Logo"
                  className="w-full max-w-[260px] sm:max-w-[320px] h-auto object-contain filter brightness-125 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
                />
              </div>

              {/* Micro Technical Sub-label */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono-tech text-[11px] text-zinc-400">
                <span className="tracking-widest uppercase text-zinc-300">GLOBAL BUYING PARTNER</span>
                <span className="text-[#F01B25] font-bold tracking-wider">EST. 2021</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — VERTICAL ROLLING SCROLLING CONTENT */}
          <div className="lg:col-span-7 relative h-[280px] sm:h-[340px] md:h-[380px] overflow-hidden flex items-center">
            {HIGHLIGHTS_DATA.map((item, index) => (
              <div
                key={item.number}
                ref={(el) => (contentRefs.current[index] = el)}
                className="absolute inset-x-0 flex flex-col justify-center transform-gpu"
              >
                {/* Number Indicator */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-[2px] bg-[#F01B25] inline-block" />
                  <span className="text-sm sm:text-base font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    {item.number}
                  </span>
                </div>

                {/* Main Rolling Headline */}
                <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-grotesk font-extrabold text-white tracking-tight leading-[0.92] uppercase drop-shadow-2xl">
                  {item.lines.map((line, lIdx) => (
                    <span key={lIdx} className="block">
                      {line}
                    </span>
                  ))}
                </h3>

                {/* Supporting Text */}
                <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-outfit text-zinc-300 max-w-xl font-light leading-relaxed">
                  {item.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM PROGRESS INDICATOR */}
        <div className="flex items-center justify-between border-t border-white/10 pt-5 font-mono-tech text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span ref={activeStepRef} className="text-[#F01B25] font-bold text-sm">
              01
            </span>
            <span className="text-zinc-500">/ 03</span>
          </div>

          {/* Progress Bar Line */}
          <div className="w-40 sm:w-64 md:w-80 h-[2px] bg-white/10 relative rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="w-full h-full bg-[#F01B25] origin-left transform scale-x-0 transition-transform duration-75"
            />
          </div>

          <div className="text-xs tracking-widest text-zinc-400 uppercase hidden sm:block">
            01 ——— 03
          </div>
        </div>
      </div>
    </section>
  );
};
