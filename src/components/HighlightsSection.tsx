import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HighlightItem {
  id: string;
  number: string;
  line1: string;
  line2: string;
}

const HIGHLIGHTS_DATA: HighlightItem[] = [
  {
    id: '01',
    number: '01 / 05',
    line1: 'ESTABLISHED',
    line2: 'IN 2021',
  },
  {
    id: '02',
    number: '02 / 05',
    line1: '25+ YEARS INDUSTRY',
    line2: 'EXPERIENCE',
  },
  {
    id: '03',
    number: '03 / 05',
    line1: '100+ HAPPY',
    line2: 'CLIENTS',
  },
  {
    id: '04',
    number: '04 / 05',
    line1: 'ISO 9001',
    line2: 'CERTIFIED',
  },
  {
    id: '05',
    number: '05 / 05',
    line1: 'LOCATED IN',
    line2: 'UAE & INDIA',
  },
];

export const HighlightsSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const item0Ref = useRef<HTMLDivElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const item3Ref = useRef<HTMLDivElement>(null);
  const item4Ref = useRef<HTMLDivElement>(null);

  const itemRefs = [item0Ref, item1Ref, item2Ref, item3Ref, item4Ref];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Sleek entrance animation for logo
      gsap.fromTo(
        logoWrapperRef.current,
        {
          x: -60,
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
          end: '+=300%',
          scrub: 0.8,
          pin: pinnedRef.current,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // Initially: Item 0 is active (in place). Items 1-4 are below.
      gsap.set(item0Ref.current, { yPercent: 0, opacity: 1 });
      gsap.set([item1Ref.current, item2Ref.current, item3Ref.current, item4Ref.current], { yPercent: 100, opacity: 0 });

      // --- TRANSITION 1: Item 01 -> Item 02 ---
      tl.to(item0Ref.current, { yPercent: -100, opacity: 0, ease: 'power2.inOut', duration: 0.18 }, 0.18)
        .to(item1Ref.current, { yPercent: 0, opacity: 1, ease: 'power2.inOut', duration: 0.18 }, 0.18);

      // --- TRANSITION 2: Item 02 -> Item 03 ---
      tl.to(item1Ref.current, { yPercent: -100, opacity: 0, ease: 'power2.inOut', duration: 0.18 }, 0.38)
        .to(item2Ref.current, { yPercent: 0, opacity: 1, ease: 'power2.inOut', duration: 0.18 }, 0.38);

      // --- TRANSITION 3: Item 03 -> Item 04 ---
      tl.to(item2Ref.current, { yPercent: -100, opacity: 0, ease: 'power2.inOut', duration: 0.18 }, 0.58)
        .to(item3Ref.current, { yPercent: 0, opacity: 1, ease: 'power2.inOut', duration: 0.18 }, 0.58);

      // --- TRANSITION 4: Item 04 -> Item 05 ---
      tl.to(item3Ref.current, { yPercent: -100, opacity: 0, ease: 'power2.inOut', duration: 0.18 }, 0.78)
        .to(item4Ref.current, { yPercent: 0, opacity: 1, ease: 'power2.inOut', duration: 0.18 }, 0.78);
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative w-full h-[400vh] bg-[#050505] text-white">
      {/* Viewport Pinned Full-Bleed Section Frame */}
      <div
        ref={pinnedRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-between py-12 md:py-16 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-[#050505] via-[#0e070a] to-[#050505] animate-mesh-bg"
      >
        {/* Background Video Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40 filter brightness-95 contrast-105"
          >
            <source src="/video02.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-[#050505]/65 to-[#050505]/90" />
        </div>

        {/* Subtle Ambient Red Glow Orbs */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#F01B25]/15 rounded-full blur-[150px] pointer-events-none animate-orb-1" />
        <div className="absolute inset-0 grid-bg-overlay opacity-20 pointer-events-none" />

        {/* SECTION EYEBROW HEADER */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse" />
            <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
              TECH ENER-G AT A GLANCE
            </span>
          </div>
          <span className="text-xs font-mono-tech text-zinc-500 uppercase tracking-widest hidden sm:inline">
            KEY PERFORMANCE HIGHLIGHTS
          </span>
        </div>

        {/* MAIN FULL SECTION TWO-COLUMN CANVAS */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center my-auto z-20">
          {/* LEFT COLUMN: STANDALONE LOGO & AT A GLANCE */}
          <div className="lg:col-span-5 flex items-center justify-start">
            <div ref={logoWrapperRef} className="relative group space-y-3">
              <img
                src="/logo.png"
                alt="Tech Ener-G Logo"
                className="h-14 sm:h-18 md:h-22 lg:h-28 w-auto object-contain filter brightness-110 drop-shadow-[0_12px_30px_rgba(240,27,37,0.25)]"
              />
              <div className="text-xs sm:text-sm font-mono-tech italic font-semibold text-[#F01B25] tracking-widest uppercase flex items-center gap-2 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25] animate-pulse shrink-0" />
                <span>AT A GLANCE</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLL-DRIVEN ROLLING TYPOGRAPHY */}
          <div className="lg:col-span-7 relative h-64 sm:h-72 md:h-80 flex items-center justify-end overflow-hidden lg:pl-16">
            {HIGHLIGHTS_DATA.map((item, index) => (
              <div
                key={item.id}
                ref={itemRefs[index]}
                className="absolute inset-0 flex flex-col justify-center items-start lg:items-end lg:text-right space-y-4"
              >
                <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest">
                  {item.number}
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.98]">
                  {item.line1} <br />
                  <span className="text-[#F01B25]">{item.line2}</span>
                </h2>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION FOOTER WITH PEEKING NEXT SECTION TEASER */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 z-20 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-[11px] font-mono-tech text-zinc-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-ping" />
            <span className="text-[#F01B25] font-bold">UP NEXT:</span>
            <span>02 / WHY CHOOSE TECH ENER-G</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono-tech text-zinc-300 uppercase tracking-widest px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span>SCROLL TO DISCOVER</span>
            <span className="text-[#F01B25] animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
