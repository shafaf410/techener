import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSequenceProps {
  onOpenQuote: () => void;
  onOpenAbout: () => void;
  onOpenIndustries?: () => void;
}

export const HeroSequence: React.FC<HeroSequenceProps> = ({ onOpenQuote, onOpenAbout, onOpenIndustries }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const teaserBannerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for pinned video transformation and scroll transition
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

      // 2. Video subtle zoom & dark blurred overlay (0 -> 0.7)
      tl.to(
        videoWrapperRef.current,
        {
          scale: 1.05,
          ease: 'power1.out',
          duration: 0.7,
        },
        0
      );

      tl.fromTo(
        darkOverlayRef.current,
        {
          opacity: 0,
          backdropFilter: 'blur(0px)',
          webkitBackdropFilter: 'blur(0px)',
        },
        {
          opacity: 1,
          backdropFilter: 'blur(14px)',
          webkitBackdropFilter: 'blur(14px)',
          ease: 'power1.out',
          duration: 0.7,
        },
        0
      );

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
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-[#050505]">
      {/* FIXED PINNED VIDEO LAYER */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 transform-gpu transition-opacity"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/video01.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* OVERLAY EMERGES ONLY ON SCROLL INTO SECTION 02 */}
      <div
        ref={darkOverlayRef}
        className="absolute inset-0 z-10 bg-white pointer-events-none opacity-0"
      />

      {/* HERO SECTION CONTENT */}
      <div
        className="relative z-20 w-full h-screen max-w-[1400px] mx-auto px-3 sm:px-5 md:px-6 flex flex-col justify-end pb-10 sm:pb-14 md:pb-16 pointer-events-auto"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Headline & CTA Boxes Under Text */}
          <div className="max-w-3xl space-y-5">
            {/* Hero Logo — Crisp brand colors on dark video */}
            <div
              ref={heroLogoRef}
              className="inline-block w-fit origin-top-left -ml-0.5 sm:-ml-1"
            >
              <img
                src="/logo-white.png"
                alt="Tech Ener-G Logo"
                className="h-7 sm:h-9 md:h-10 lg:h-12 w-auto object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]"
              />
            </div>

            {/* Fading Hero Text Content */}
            <div ref={heroTextRef} className="space-y-5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-grotesk font-extrabold text-white tracking-tight uppercase leading-[0.95] drop-shadow-2xl">
                ACCELERATING GROWTH, <br />
                <span className="text-[#F01B25]">TOGETHER.</span>
              </h1>

              {/* CTA Boxes Directly Under Text */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenIndustries}
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-md bg-[#F01B25] text-white font-mono-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black red-glow shadow-lg shadow-[#F01B25]/30 cursor-pointer"
                >
                  <span>Explore Solutions</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
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
