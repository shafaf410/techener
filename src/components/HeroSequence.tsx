import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { RotatingGlobeCanvas } from './RotatingGlobeCanvas';

gsap.registerPlugin(ScrollTrigger);

interface HeroSequenceProps {
  onOpenQuote: () => void;
  onOpenAbout: () => void;
  onOpenIndustries?: () => void;
}

export const HeroSequence: React.FC<HeroSequenceProps> = ({ onOpenQuote, onOpenAbout, onOpenIndustries }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeWrapperRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for pinned scroll transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // 1a. Hero text slides UP & fades away (0 -> 0.4)
      tl.to(
        heroTextRef.current,
        {
          opacity: 0,
          y: -40,
          ease: 'power1.out',
          duration: 0.4,
        },
        0
      );

      // 1b. Hero logo slides up & fades
      if (heroLogoRef.current) {
        tl.to(
          heroLogoRef.current,
          {
            opacity: 0,
            scale: 0.95,
            y: -15,
            ease: 'power1.out',
            duration: 0.4,
            force3D: true,
          },
          0
        );
      }

      // 1c. 3D Rotating Globe gently scales and slides on scroll
      if (globeWrapperRef.current) {
        tl.to(
          globeWrapperRef.current,
          {
            opacity: 0,
            scale: 0.88,
            x: 60,
            ease: 'power1.out',
            duration: 0.45,
          },
          0
        );
      }

      // 2. Section 02 overlay transition (0 -> 0.7)
      if (darkOverlayRef.current) {
        tl.fromTo(
          darkOverlayRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            ease: 'power1.out',
            duration: 0.7,
          },
          0
        );
      }

      // 3. About Section emerges cleanly on scroll (0.2 -> 0.7)
      tl.fromTo(
        aboutSectionRef.current,
        {
          autoAlpha: 0,
          y: 30,
        },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power1.out',
          duration: 0.5,
        },
        0.2
      );

      // 4. Smooth Letter-by-letter reveal for title (0.25 -> 0.75)
      const chars = aboutSectionRef.current?.querySelectorAll('.stagger-char');
      if (chars && chars.length > 0) {
        tl.fromTo(
          chars,
          {
            opacity: 0,
            y: 20,
            scale: 1.05,
            filter: 'blur(8px)',
            transformOrigin: '50% 100%',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            stagger: 0.02,
            ease: 'power1.out',
            duration: 0.5,
          },
          0.25
        );
      }

      // 5. Reveal paragraph smoothly AFTER title is fully revealed (0.75 -> 1.0)
      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          {
            opacity: 0,
            y: 20,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'power1.out',
            duration: 0.25,
          },
          0.75
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#FAFAFC] text-zinc-900 select-none"
    >
      {/* Top-Left Ambient Fluid Chrome Wave Ribbon */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] pointer-events-none z-0 opacity-40 overflow-hidden">
        <svg
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="chromeFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#E2E8F0" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M-50 0 C140 160, 260 300, 200 480 C160 560, 70 600, -50 600 Z"
            fill="url(#chromeFlow)"
          />
        </svg>
      </div>

      {/* Bottom-Left Stylized Architectural Waves matching mockup */}
      <div className="absolute bottom-0 left-0 w-[260px] sm:w-[360px] md:w-[440px] pointer-events-none z-10 leading-none overflow-hidden">
        <svg
          viewBox="0 0 460 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-md"
        >
          <path
            d="M-20 200 C80 150, 180 145, 360 200 Z"
            fill="rgba(0,0,0,0.06)"
          />
          <path
            d="M-10 200 L-10 135 C70 128, 160 138, 300 200 Z"
            fill="#0E1726"
          />
          <path
            d="M-10 135 C80 115, 175 125, 330 200 L290 200 C155 138, 70 130, -10 143 Z"
            fill="#B91C1C"
          />
        </svg>
      </div>

      {/* 3D ROTATING GLOBE ON THE RIGHT SIDE (Continuous rotation + interactive drag) */}
      <div
        ref={globeWrapperRef}
        className="absolute -right-10 sm:-right-6 md:right-0 lg:right-6 xl:right-14 top-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] md:w-[580px] lg:w-[680px] xl:w-[760px] h-[340px] sm:h-[480px] md:h-[580px] lg:h-[680px] xl:h-[760px] pointer-events-auto z-[5] transform-gpu"
      >
        <RotatingGlobeCanvas />
      </div>

      {/* OVERLAY EMERGES ONLY ON SCROLL INTO SECTION 02 */}
      <div
        ref={darkOverlayRef}
        className="absolute inset-0 z-20 bg-white pointer-events-none opacity-0"
      />

      {/* HERO SECTION CONTENT */}
      <div
        className="relative z-30 w-full h-screen max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 flex flex-col justify-center pointer-events-auto"
      >
        <div className="max-w-2xl xl:max-w-3xl space-y-6 sm:space-y-7">
          {/* Hero Logo with Slogan matching mockup */}
          <div
            ref={heroLogoRef}
            className="inline-block w-fit origin-top-left -ml-0.5"
          >
            <img
              src="/logo.png"
              alt="Tech Ener-G Logo"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain drop-shadow-sm"
            />
          </div>

          {/* Fading Hero Text Content */}
          <div ref={heroTextRef} className="space-y-5">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] font-grotesk font-extrabold text-[#101C2C] tracking-tight uppercase leading-[0.93]">
              ACCELERATING <br />
              GROWTH, <br />
              <span className="text-[#B91C1C]">TOGETHER.</span>
            </h1>

            {/* Subtitle directly matching reference mockup */}
            <p className="text-base sm:text-lg md:text-xl font-outfit text-zinc-600 font-normal leading-relaxed">
              Smart Solutions. Global Reach. Lasting Partnerships.
            </p>

            {/* CTA Pill Buttons matching reference mockup */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onOpenIndustries}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#A31D24] hover:bg-[#881319] text-white font-mono-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#A31D24]/25 hover:scale-[1.02] cursor-pointer"
              >
                <span>EXPLORE SOLUTIONS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center px-8 py-3.5 rounded-2xl bg-white hover:bg-zinc-50 border border-zinc-700/70 text-zinc-900 font-mono-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] shadow-sm cursor-pointer"
              >
                REQUEST QUOTE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Center Scroll Down Indicator matching reference mockup */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-auto z-30">
        <span className="w-8 sm:w-14 h-[1px] bg-zinc-300" />
        <button
          onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll to Next Section"
          className="w-7 h-10 sm:w-8 sm:h-11 rounded-full border border-zinc-300 bg-white/90 hover:bg-white hover:border-zinc-600 shadow-sm flex items-center justify-center transition-all duration-300 group cursor-pointer"
        >
          <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900 group-hover:translate-y-0.5 transition-all" />
        </button>
        <span className="w-8 sm:w-14 h-[1px] bg-zinc-300" />
      </div>

      {/* SECTION 02: ABOUT TECH ENER-G (Full Page White Background Layout) */}
      <div
        ref={aboutSectionRef}
        id="about"
        className="absolute inset-0 z-30 w-full h-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col justify-center pointer-events-auto"
      >
        <div className="space-y-8 sm:space-y-10 max-w-6xl">
          {/* Monumental Headline: CUT COST, NOT THE QUALITY */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-grotesk font-extrabold tracking-tight leading-[0.92] flex flex-wrap gap-x-4 sm:gap-x-7">
              {/* CUT */}
              <span className="inline-flex overflow-hidden py-1">
                {'CUT'.split('').map((char, i) => (
                  <span key={`cut-${i}`} className="stagger-char inline-block text-zinc-950 transform-gpu">
                    {char}
                  </span>
                ))}
              </span>

              {/* COST, */}
              <span className="inline-flex overflow-hidden py-1">
                {'COST,'.split('').map((char, i) => (
                  <span key={`cost-${i}`} className="stagger-char inline-block text-zinc-950 transform-gpu">
                    {char}
                  </span>
                ))}
              </span>

              {/* NOT */}
              <span className="inline-flex overflow-hidden py-1">
                {'NOT'.split('').map((char, i) => (
                  <span key={`not-${i}`} className="stagger-char inline-block text-[#F01B25] transform-gpu">
                    {char}
                  </span>
                ))}
              </span>

              {/* THE */}
              <span className="inline-flex overflow-hidden py-1">
                {'THE'.split('').map((char, i) => (
                  <span key={`the-${i}`} className="stagger-char inline-block text-[#F01B25] transform-gpu">
                    {char}
                  </span>
                ))}
              </span>

              {/* QUALITY. */}
              <span className="inline-flex overflow-hidden py-1">
                {'QUALITY.'.split('').map((char, i) => (
                  <span key={`quality-${i}`} className="stagger-char inline-block text-[#F01B25] transform-gpu">
                    {char}
                  </span>
                ))}
              </span>
            </h2>

            <div ref={paragraphRef} className="opacity-0 pt-4 max-w-3xl">
              <div className="space-y-3 border-l-4 border-[#F01B25] pl-6">
                <p className="text-base sm:text-xl font-outfit text-zinc-700 leading-relaxed font-normal">
                  Established in 2021, <strong className="text-zinc-950 font-bold">Tech Ener-G Trading FZE (TET)</strong> has emerged as a premier supplier serving Power Generation, Oil & Gas, and major industrial sectors across the UAE, MENA region, Africa, Asia, and Europe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
