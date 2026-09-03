import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HighlightItem {
  id: string;
  number: string;
  line1: string;
  line2: string;
  subtext: string;
}

const HIGHLIGHTS_DATA: HighlightItem[] = [
  {
    id: '01',
    number: '01',
    line1: 'ESTABLISHED',
    line2: 'IN 2021',
    subtext: 'Tech Ener-G was established in 2021 as a global industrial partner.',
  },
  {
    id: '02',
    number: '02',
    line1: 'ISO 9001',
    line2: 'CERTIFIED',
    subtext: 'A quality-focused company operating under strict ISO 9001 standards.',
  },
  {
    id: '03',
    number: '03',
    line1: 'DUBAI • AJMAN',
    line2: '• INDIA',
    subtext: 'Strategic procurement presence across Dubai, Ajman, and India.',
  },
];

export const HighlightsSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const item0Ref = useRef<HTMLDivElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Sleek entrance animation for logo
      gsap.fromTo(
        logoWrapperRef.current,
        {
          x: -50,
          opacity: 0,
          scale: 0.95,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top 85%',
            end: 'top 25%',
            scrub: 0.5,
          },
        }
      );

      // 2. Timeline for rolling text states tied to pinned scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 0.8,
          pin: pinnedRef.current,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // Initially: Item 0 is active (in place). Item 1 & 2 are below.
      gsap.set(item0Ref.current, { yPercent: 0, opacity: 1 });
      gsap.set(item1Ref.current, { yPercent: 100, opacity: 0 });
      gsap.set(item2Ref.current, { yPercent: 100, opacity: 0 });

      // --- TRANSITION 1: Item 01 -> Item 02 ---
      tl.to(
        item0Ref.current,
        {
          yPercent: -100,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.45,
        },
        0.3
      ).to(
        item1Ref.current,
        {
          yPercent: 0,
          opacity: 1,
          ease: 'power2.inOut',
          duration: 0.45,
        },
        0.3
      );

      // --- TRANSITION 2: Item 02 -> Item 03 ---
      tl.to(
        item1Ref.current,
        {
          yPercent: -100,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.45,
        },
        0.75
      ).to(
        item2Ref.current,
        {
          yPercent: 0,
          opacity: 1,
          ease: 'power2.inOut',
          duration: 0.45,
        },
        0.75
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative w-full h-[300vh] bg-[#050505] text-white">
      {/* Viewport Pinned Frame */}
      <div
        ref={pinnedRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-24 overflow-hidden bg-[#050505] border-t border-white/10"
      >
        {/* Minimal Ambient Red Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#F01B25]/10 rounded-full blur-[130px] pointer-events-none" />

        {/* TOP MINIMAL BRAND LABEL */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse" />
            <span className="text-[11px] font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
              TECH ENER-G AT A GLANCE
            </span>
          </div>
          <span className="text-[11px] font-mono-tech text-zinc-500 uppercase tracking-widest hidden sm:inline">
            KEY HIGHLIGHTS
          </span>
        </div>

        {/* MAIN TWO-COLUMN CONTENT AREA (Content Shifted Right) */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center my-auto z-20">
          {/* LEFT COLUMN: CLEAN LOGO */}
          <div className="lg:col-span-4 flex items-center justify-start">
            <div ref={logoWrapperRef} className="relative group">
              <img
                src="/logo.png"
                alt="Tech Ener-G Logo"
                className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain filter brightness-110 drop-shadow-[0_10px_25px_rgba(240,27,37,0.2)]"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLL-DRIVEN ROLLING TYPOGRAPHY (MOVED TO THE RIGHT) */}
          <div className="lg:col-span-8 relative h-56 sm:h-64 md:h-72 flex items-center justify-end overflow-hidden lg:pl-16">
            {/* ITEM 01 */}
            <div
              ref={item0Ref}
              className="absolute inset-0 flex flex-col justify-center items-start lg:items-end lg:text-right space-y-3"
            >
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest">
                01 / 03
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[1.02]">
                ESTABLISHED <br />
                <span className="text-[#F01B25]">IN 2021</span>
              </h2>
              <p className="text-xs sm:text-sm font-mono-tech text-zinc-400 max-w-sm pt-1">
                {HIGHLIGHTS_DATA[0].subtext}
              </p>
            </div>

            {/* ITEM 02 */}
            <div
              ref={item1Ref}
              className="absolute inset-0 flex flex-col justify-center items-start lg:items-end lg:text-right space-y-3"
            >
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest">
                02 / 03
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[1.02]">
                ISO 9001 <br />
                <span className="text-[#F01B25]">CERTIFIED</span>
              </h2>
              <p className="text-xs sm:text-sm font-mono-tech text-zinc-400 max-w-sm pt-1">
                {HIGHLIGHTS_DATA[1].subtext}
              </p>
            </div>

            {/* ITEM 03 */}
            <div
              ref={item2Ref}
              className="absolute inset-0 flex flex-col justify-center items-start lg:items-end lg:text-right space-y-3"
            >
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest">
                03 / 03
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[1.02]">
                DUBAI • AJMAN <br />
                <span className="text-[#F01B25]">• INDIA</span>
              </h2>
              <p className="text-xs sm:text-sm font-mono-tech text-zinc-400 max-w-sm pt-1">
                {HIGHLIGHTS_DATA[2].subtext}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR (CLEAN RIGHT ALIGNED) */}
        <div className="w-full flex items-center justify-end border-t border-white/10 pt-4 z-20">
          <span className="text-[10px] font-mono-tech text-zinc-500 uppercase tracking-widest">
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>
    </div>
  );
};
