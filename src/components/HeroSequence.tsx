import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StaggeredText } from './StaggeredText';
import { ArrowDown, ArrowUpRight, ShieldCheck, Globe2, Cpu, Wrench } from 'lucide-react';

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for pinned video transformation and scroll transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 1],
            duration: { min: 0.25, max: 0.45 },
            delay: 0.02,
            ease: 'power1.inOut',
          },
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // 1a. Hero text slides UP & fades away (0 -> 0.5)
      tl.to(
        heroTextRef.current,
        {
          opacity: 0,
          y: -50,
          ease: 'power2.out',
          duration: 0.5,
        },
        0
      );

      // 1b. Hero logo slides up & fades
      if (heroLogoRef.current) {
        tl.to(
          heroLogoRef.current,
          {
            opacity: 0,
            scale: 0.9,
            y: -20,
            ease: 'power2.in',
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
          scale: 1.06,
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

      // 3. About Section emerges cleanly on scroll (0.15 -> 0.75)
      tl.fromTo(
        aboutSectionRef.current,
        {
          autoAlpha: 0,
          y: 40,
        },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power1.out',
          duration: 0.6,
        },
        0.15
      );

      // 4. Teaser Banner fades in on Section 02 (0.35 -> 0.85)
      if (teaserBannerRef.current) {
        tl.fromTo(
          teaserBannerRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.5,
          },
          0.35
        );
      }

      // 5. Letter-by-letter Optical Focus Pull as section emerges (0.25 -> 0.9)
      const chars = aboutSectionRef.current?.querySelectorAll('.stagger-char');
      if (chars && chars.length > 0) {
        tl.fromTo(
          chars,
          {
            opacity: 0,
            y: 30,
            scale: 1.15,
            filter: 'blur(12px)',
            transformOrigin: '50% 100%',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            stagger: 0.015,
            ease: 'power2.out',
            duration: 0.65,
          },
          0.25
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
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/75 via-black/60 to-black/85 pointer-events-none opacity-0"
      />

      {/* HERO SECTION CONTENT */}
      <div
        className="relative z-20 w-full h-screen max-w-[1400px] mx-auto px-3 sm:px-5 md:px-6 flex flex-col justify-end pb-10 sm:pb-14 md:pb-16 pointer-events-auto"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Headline & CTA Boxes Under Text */}
          <div className="max-w-3xl space-y-5">
            {/* Hero Logo — Moved further left */}
            <div
              ref={heroLogoRef}
              className="inline-block w-fit origin-top-left -ml-3 sm:-ml-5 md:-ml-8 lg:-ml-10"
            >
              <img
                src="/logo.png"
                alt="Tech Ener-G Logo"
                className="h-28 sm:h-36 md:h-44 lg:h-52 w-auto object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)] filter brightness-125"
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

          {/* Scroll Indicator on Bottom Right */}
          <div className="flex items-center gap-3 text-zinc-300 font-mono-tech text-[11px] tracking-widest uppercase animate-bounce shrink-0 lg:mb-2">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-4 h-4 text-[#F01B25]" />
          </div>
        </div>
      </div>

      {/* SECTION 02: ABOUT TECH ENER-G (Un-boxed Monumental Editorial Layout) */}
      <div
        ref={aboutSectionRef}
        id="about"
        className="absolute inset-0 z-30 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-auto"
      >
        <div className="space-y-10 max-w-6xl">
          {/* Eyebrow Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#F01B25] rounded-full animate-pulse" />
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                01 / ABOUT TECH ENER-G
              </span>
            </div>
            <span className="text-xs font-mono-tech text-zinc-400">ESTABLISHED 2021 | UAE & GLOBAL</span>
          </div>

          {/* Monumental Headline: CUT COST, NOT THE QUALITY */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-grotesk font-extrabold tracking-tight leading-[0.92] flex flex-wrap gap-x-4 sm:gap-x-7 drop-shadow-2xl">
              {/* CUT */}
              <span className="inline-flex overflow-hidden py-1">
                {'CUT'.split('').map((char, i) => (
                  <span key={`cut-${i}`} className="stagger-char inline-block text-white transform-gpu">
                    {char}
                  </span>
                ))}
              </span>

              {/* COST, */}
              <span className="inline-flex overflow-hidden py-1">
                {'COST,'.split('').map((char, i) => (
                  <span key={`cost-${i}`} className="stagger-char inline-block text-white transform-gpu">
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

            <div className="pt-4 max-w-3xl">
              <div className="space-y-3 border-l-2 border-[#F01B25] pl-6">
                <p className="text-base sm:text-lg font-outfit text-zinc-200 leading-relaxed font-light">
                  Established in 2021, <strong className="text-white font-semibold">Tech Ener-G Trading FZE (TET)</strong> has emerged as a premier supplier serving Power Generation, Oil & Gas, and major industrial sectors across the UAE, MENA region, Africa, Asia, and Europe.
                </p>
              </div>
            </div>
          </div>

          {/* Floating Glass Metric Pills */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3 backdrop-blur-md hover:border-[#F01B25]/50 transition-colors">
              <ShieldCheck className="w-5 h-5 text-[#F01B25] shrink-0" />
              <div>
                <div className="text-sm font-grotesk font-bold text-white uppercase">20,000+</div>
                <div className="text-[10px] font-outfit text-zinc-400">Items Available</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3 backdrop-blur-md hover:border-[#F01B25]/50 transition-colors">
              <Globe2 className="w-5 h-5 text-[#F01B25] shrink-0" />
              <div>
                <div className="text-sm font-grotesk font-bold text-white uppercase">MENA & Global</div>
                <div className="text-[10px] font-outfit text-zinc-400">Supply Network</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3 backdrop-blur-md hover:border-[#F01B25]/50 transition-colors">
              <Cpu className="w-5 h-5 text-[#F01B25] shrink-0" />
              <div>
                <div className="text-sm font-grotesk font-bold text-white uppercase">Engineered</div>
                <div className="text-[10px] font-outfit text-zinc-400">Flow Control</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Glass Next Section Teaser Banner at Bottom of Section 02 */}
      <div ref={teaserBannerRef} className="absolute bottom-5 left-6 right-6 max-w-7xl mx-auto z-40 pointer-events-none opacity-0">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 rounded-xl bg-black/80 border border-white/15 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2.5 text-xs font-mono-tech uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-ping shrink-0" />
            <span className="text-[#F01B25] font-bold">UP NEXT:</span>
            <span className="text-zinc-200 font-medium">02 / TECH ENER-G AT A GLANCE</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-300 uppercase tracking-widest animate-bounce shrink-0">
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-4 h-4 text-[#F01B25]" />
          </div>
        </div>
      </div>
    </div>
  );
};
