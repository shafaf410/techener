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
  const orbGlowRef = useRef<HTMLDivElement>(null);
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

      // 2. Timeline for rolling text states and dynamic background color-shifting animation
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

      // --- TRANSITION 1: Item 01 -> Item 02 (Color shifts into rich dark crimson glow) ---
      tl.to(
        item0Ref.current,
        {
          yPercent: -100,
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
          pinnedRef.current,
          {
            backgroundColor: '#1c0508',
            ease: 'sine.inOut',
            duration: 0.45,
          },
          0.3
        )
        .to(
          orbGlowRef.current,
          {
            scale: 1.6,
            opacity: 0.35,
            backgroundColor: '#F01B25',
            ease: 'sine.inOut',
            duration: 0.45,
          },
          0.3
        );

      // --- TRANSITION 2: Item 02 -> Item 03 (Color shifts back seamlessly to original dark palette) ---
      tl.to(
        item1Ref.current,
        {
          yPercent: -100,
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
          pinnedRef.current,
          {
            backgroundColor: '#050505',
            ease: 'sine.inOut',
            duration: 0.45,
          },
          0.75
        )
        .to(
          orbGlowRef.current,
          {
            scale: 1.0,
            opacity: 0.15,
            backgroundColor: '#F01B25',
            ease: 'sine.inOut',
            duration: 0.45,
          },
          0.75
        );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative w-full h-[300vh] bg-[#050505] text-white">
      {/* Viewport Pinned Full-Bleed Section Frame with Dynamic Color Transition */}
      <div
        ref={pinnedRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-between py-12 md:py-16 px-6 md:px-12 overflow-hidden bg-[#050505] transition-colors duration-500"
      >
        {/* Dynamic Color-Shifting Ambient Glow Orb */}
        <div
          ref={orbGlowRef}
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#F01B25]/15 rounded-full blur-[150px] pointer-events-none transition-all duration-700"
        />
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
          {/* LEFT COLUMN: STANDALONE LOGO */}
          <div className="lg:col-span-5 flex items-center justify-start">
            <div ref={logoWrapperRef} className="relative group">
              <img
                src="/logo.png"
                alt="Tech Ener-G Logo"
                className="h-14 sm:h-18 md:h-22 lg:h-28 w-auto object-contain filter brightness-110 drop-shadow-[0_12px_30px_rgba(240,27,37,0.25)]"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLL-DRIVEN ROLLING TYPOGRAPHY */}
          <div className="lg:col-span-7 relative h-64 sm:h-72 md:h-80 flex items-center justify-end overflow-hidden lg:pl-16">
            {/* ITEM 01 */}
            <div
              ref={item0Ref}
              className="absolute inset-0 flex flex-col justify-center items-start lg:items-end lg:text-right space-y-4"
            >
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest">
                01 / 03
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.98]">
                ESTABLISHED <br />
                <span className="text-[#F01B25]">IN 2021</span>
              </h2>
              <p className="text-xs sm:text-sm font-mono-tech text-zinc-400 max-w-md pt-1">
                {HIGHLIGHTS_DATA[0].subtext}
              </p>
            </div>

            {/* ITEM 02 */}
            <div
              ref={item1Ref}
              className="absolute inset-0 flex flex-col justify-center items-start lg:items-end lg:text-right space-y-4"
            >
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest">
                02 / 03
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.98]">
                ISO 9001 <br />
                <span className="text-[#F01B25]">CERTIFIED</span>
              </h2>
              <p className="text-xs sm:text-sm font-mono-tech text-zinc-400 max-w-md pt-1">
                {HIGHLIGHTS_DATA[1].subtext}
              </p>
            </div>

            {/* ITEM 03 */}
            <div
              ref={item2Ref}
              className="absolute inset-0 flex flex-col justify-center items-start lg:items-end lg:text-right space-y-4"
            >
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest">
                03 / 03
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.98]">
                DUBAI • AJMAN <br />
                <span className="text-[#F01B25]">• INDIA</span>
              </h2>
              <p className="text-xs sm:text-sm font-mono-tech text-zinc-400 max-w-md pt-1">
                {HIGHLIGHTS_DATA[2].subtext}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION FOOTER */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20">
          <div className="flex items-center gap-2 text-[10px] font-mono-tech text-zinc-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25]" />
            <span>EXCELLENCE IN INDUSTRIAL SUPPLY</span>
          </div>

          <span className="text-[10px] font-mono-tech text-zinc-500 uppercase tracking-widest">
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>
    </div>
  );
};
