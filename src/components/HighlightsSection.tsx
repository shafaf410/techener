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
    subtext: 'Tech Ener-G was established in 2021.',
  },
  {
    id: '02',
    number: '02',
    line1: 'ISO 9001',
    line2: 'CERTIFIED',
    subtext: 'A quality-focused company operating with ISO 9001 certification.',
  },
  {
    id: '03',
    number: '03',
    line1: 'DUBAI • AJMAN',
    line2: '• INDIA',
    subtext: 'Operations / presence across Dubai, Ajman and India.',
  },
];

export const HighlightsSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const item0Ref = useRef<HTMLDivElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const activeNumRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation for the logo when section comes into view
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
          ease: 'power2.out',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top 80%',
            end: 'top 20%',
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
      gsap.set(item1Ref.current, { yPercent: 120, opacity: 0 });
      gsap.set(item2Ref.current, { yPercent: 120, opacity: 0 });
      gsap.set(progressLineRef.current, { width: '33.33%' });

      // --- TRANSITION 1: Item 01 -> Item 02 ---
      tl.to(
        item0Ref.current,
        {
          yPercent: -120,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.45,
        },
        0.3
      )
        .to(
          item1Ref.current,
          {
            yPercent: 0,
            opacity: 1,
            ease: 'power2.inOut',
            duration: 0.45,
          },
          0.3
        )
        .to(
          progressLineRef.current,
          {
            width: '66.66%',
            ease: 'power1.inOut',
            duration: 0.45,
          },
          0.3
        );

      // --- TRANSITION 2: Item 02 -> Item 03 ---
      tl.to(
        item1Ref.current,
        {
          yPercent: -120,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.45,
        },
        0.75
      )
        .to(
          item2Ref.current,
          {
            yPercent: 0,
            opacity: 1,
            ease: 'power2.inOut',
            duration: 0.45,
          },
          0.75
        )
        .to(
          progressLineRef.current,
          {
            width: '100%',
            ease: 'power1.inOut',
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
        className="w-full h-screen sticky top-0 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20 overflow-hidden bg-[#050505]"
      >
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#F01B25]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* TOP EYEBROW / HEADER BAR */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#F01B25] rounded-full animate-pulse" />
            <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
              TECH ENER-G AT A GLANCE
            </span>
          </div>
          <span className="text-xs font-mono-tech text-zinc-500 uppercase tracking-widest hidden sm:inline">
            KEY PERFORMANCE HIGHLIGHTS
          </span>
        </div>

        {/* MAIN TWO-COLUMN CONTENT AREA */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto z-20">
          {/* LEFT COLUMN: ANIMATED LOGO CARD (approx 40% width on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div
              ref={logoWrapperRef}
              className="relative p-6 sm:p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] group transition-all duration-500 hover:border-[#F01B25]/40"
            >
              {/* Subtle Red Accent Line */}
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F01B25]/60 to-transparent" />
              
              <img
                src="/logo.png"
                alt="Tech Ener-G Logo"
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain filter brightness-110 drop-shadow-[0_10px_30px_rgba(240,27,37,0.2)]"
              />

              <div className="mt-6 flex items-center gap-2 text-[11px] font-mono-tech text-zinc-400 tracking-wider uppercase border-t border-white/10 pt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25]" />
                <span>GLOBAL INDUSTRIAL PROCUREMENT PARTNER</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLL-DRIVEN ROLLING EDITORIAL TEXT (approx 60% width) */}
          <div className="lg:col-span-7 relative h-72 sm:h-80 md:h-96 flex items-center overflow-hidden">
            {/* ITEM 01 */}
            <div
              ref={item0Ref}
              className="absolute inset-0 flex flex-col justify-center space-y-3 sm:space-y-4"
            >
              <span className="text-xl sm:text-2xl font-mono-tech font-bold text-[#F01B25]">
                01
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.92] drop-shadow-2xl">
                ESTABLISHED <br />
                <span className="text-zinc-200">IN 2021</span>
              </h2>
              <p className="text-sm sm:text-base font-mono-tech text-zinc-400 max-w-md pt-2">
                Tech Ener-G was established in 2021.
              </p>
            </div>

            {/* ITEM 02 */}
            <div
              ref={item1Ref}
              className="absolute inset-0 flex flex-col justify-center space-y-3 sm:space-y-4"
            >
              <span className="text-xl sm:text-2xl font-mono-tech font-bold text-[#F01B25]">
                02
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.92] drop-shadow-2xl">
                ISO 9001 <br />
                <span className="text-zinc-200">CERTIFIED</span>
              </h2>
              <p className="text-sm sm:text-base font-mono-tech text-zinc-400 max-w-md pt-2">
                A quality-focused company operating with ISO 9001 certification.
              </p>
            </div>

            {/* ITEM 03 */}
            <div
              ref={item2Ref}
              className="absolute inset-0 flex flex-col justify-center space-y-3 sm:space-y-4"
            >
              <span className="text-xl sm:text-2xl font-mono-tech font-bold text-[#F01B25]">
                03
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.92] drop-shadow-2xl">
                DUBAI • AJMAN <br />
                <span className="text-zinc-200">• INDIA</span>
              </h2>
              <p className="text-sm sm:text-base font-mono-tech text-zinc-400 max-w-md pt-2">
                Operations / presence across Dubai, Ajman and India.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM PROGRESS INDICATOR BAR */}
        <div className="w-full flex items-center justify-between border-t border-white/10 pt-4 z-20">
          <div className="flex items-center gap-4 text-xs font-mono-tech text-zinc-400">
            <span className="text-[#F01B25] font-bold">01</span>
            <div className="w-32 sm:w-48 h-1 bg-white/15 rounded-full overflow-hidden">
              <div
                ref={progressLineRef}
                className="h-full bg-[#F01B25] rounded-full transition-all duration-75"
              />
            </div>
            <span>03</span>
          </div>

          <span className="text-[11px] font-mono-tech text-zinc-500 uppercase tracking-widest hidden sm:inline">
            SCROLL TO ADVANCE
          </span>
        </div>
      </div>
    </div>
  );
};
