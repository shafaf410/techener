import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StaggeredText } from './StaggeredText';
import { ArrowDown, ArrowUpRight, ShieldCheck, Globe2, Cpu, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSequenceProps {
  onOpenQuote: () => void;
  onOpenAbout: () => void;
}

export const HeroSequence: React.FC<HeroSequenceProps> = ({ onOpenQuote, onOpenAbout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for pinned video transformation and scroll transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Fade & slide hero text away
      tl.to(
        heroContentRef.current,
        {
          opacity: 0,
          y: -80,
          ease: 'power2.inOut',
          duration: 0.4,
        },
        0
      );

      // 2. Video subtle zoom + keep high visibility
      tl.to(
        videoWrapperRef.current,
        {
          scale: 1.06,
          opacity: 0.65,
          ease: 'none',
          duration: 1,
        },
        0
      );

      // 3. Dark overlay opacity stays subtle (0.25)
      tl.to(
        darkOverlayRef.current,
        {
          opacity: 0.25,
          ease: 'none',
          duration: 1,
        },
        0
      );

      // 4. About Section emerge from translucent video
      tl.fromTo(
        aboutSectionRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.5,
        },
        0.3
      );

      // 5. Word-by-word Staggered Text reveal perfectly synced to scroll scrub
      const words = aboutSectionRef.current?.querySelectorAll('.stagger-word');
      if (words && words.length > 0) {
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 35,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.08,
            ease: 'power3.out',
            duration: 0.6,
          },
          0.35
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
        className="absolute inset-0 z-10 bg-black/30 pointer-events-none opacity-0 transition-opacity duration-300"
      />

      {/* HERO SECTION CONTENT */}
      <div
        ref={heroContentRef}
        className="relative z-20 w-full h-screen max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-24 md:pb-32 pointer-events-auto"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Headline & CTA Boxes Under Text */}
          <div className="max-w-3xl space-y-6">
            {/* Prominent Large Hero Logo Icon without white background */}
            <div className="w-fit">
              <img
                src="/logo.png"
                alt="Tech Ener-G Logo"
                className="h-16 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:scale-105"
              />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-grotesk font-extrabold text-white tracking-tight uppercase leading-[0.95] drop-shadow-2xl">
              ACCELERATING YOUR <br />
              <span className="text-[#F01B25]">GROWTH TOGETHER.</span>
            </h1>

            {/* CTA Boxes Directly Under Text */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#industries"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-md bg-[#F01B25] text-white font-mono-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black red-glow shadow-lg shadow-[#F01B25]/30"
              >
                <span>Explore Solutions</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300"
              >
                Request Quote
              </button>
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
        className="absolute inset-0 z-30 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center opacity-0 pointer-events-auto"
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

          {/* Monumental Headline: BRIDGING THE GAP */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.92] flex flex-wrap drop-shadow-2xl">
              <StaggeredText text="BRIDGING THE GAP BETWEEN USERS & MANUFACTURERS" staggerDelay={0.05} />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3 border-l-2 border-[#F01B25] pl-6">
                <p className="text-base sm:text-lg font-outfit text-zinc-200 leading-relaxed font-light">
                  Established in 2021, <strong className="text-white font-semibold">Tech Ener-G Trading FZE (TET)</strong> has emerged as a premier supplier serving Power Generation, Oil & Gas, and major industrial sectors across the UAE, MENA region, Africa, Asia, and Europe.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-base sm:text-lg font-outfit text-zinc-300 leading-relaxed font-light">
                  Backed by a team of qualified engineers, we bridge global equipment manufacturers with regional end-users, providing technical expertise, trusted vendor sourcing, and end-to-end industrial supply chain efficiency.
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

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3 backdrop-blur-md hover:border-[#F01B25]/50 transition-colors">
              <Wrench className="w-5 h-5 text-[#F01B25] shrink-0" />
              <div>
                <div className="text-sm font-grotesk font-bold text-white uppercase">24/7 Service</div>
                <div className="text-[10px] font-outfit text-zinc-400">Technical Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
