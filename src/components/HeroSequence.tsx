import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Info } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSequenceProps {
  onOpenQuote: () => void;
  onOpenAbout: () => void;
}

export const HeroSequence: React.FC<HeroSequenceProps> = ({ onOpenQuote, onOpenAbout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const headlineWordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for 2-3 scroll tick pinned text reveal sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Target all word elements in headline
      const words = headlineWordsRef.current?.querySelectorAll('.hero-word');

      if (words && words.length > 0) {
        // 1. Scrub word-by-word reveal: from dimmed/blurred into 100% crystal-clear pure white
        tl.fromTo(
          words,
          {
            opacity: 0.15,
            y: 35,
            filter: 'blur(12px)',
            color: '#71717a',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            color: '#ffffff',
            stagger: 0.12,
            ease: 'power3.out',
            duration: 0.65,
          },
          0
        );
      }

      // 2. Video subtle zoom while pinned
      tl.to(
        videoWrapperRef.current,
        {
          scale: 1.05,
          opacity: 0.7,
          ease: 'none',
          duration: 1,
        },
        0
      );

      // 3. Towards the end of the 2-3 scrolls, fade content gently to transition to next section
      tl.to(
        heroContentRef.current,
        {
          opacity: 0,
          y: -50,
          ease: 'power2.in',
          duration: 0.35,
        },
        0.8
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headlineWordsLine1 = ['CUT', 'COST,'];
  const headlineWordsLine2 = ['NOT', 'THE', 'QUALITY.'];

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050505]">
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
          className="w-full h-full object-cover object-center opacity-65"
        >
          <source src="/video01.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Subtle Dark Vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 pointer-events-none" />
      </div>

      {/* HERO SECTION CONTENT */}
      <div
        ref={heroContentRef}
        className="relative z-20 w-full h-screen max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-10 sm:pb-14 md:pb-16 pointer-events-auto"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Headline & CTA Boxes Under Text */}
          <div className="max-w-3xl space-y-6">
            {/* Translucent Dark Glass Logo Container */}
            <div className="inline-flex items-center px-6 py-3.5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl w-fit transition-all duration-300 hover:border-[#F01B25]/50 hover:bg-black/70">
              <img
                src="/logo.png"
                alt="Tech Ener-G Logo"
                className="h-14 sm:h-18 md:h-22 lg:h-26 w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] filter brightness-110"
              />
            </div>

            {/* Pinned Scrub-Animated Headline in Pure White */}
            <div ref={headlineWordsRef} className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-grotesk font-extrabold text-white tracking-tight uppercase leading-[0.95] drop-shadow-2xl flex flex-wrap gap-x-4 sm:gap-x-6">
                {headlineWordsLine1.map((word, idx) => (
                  <span key={idx} className="hero-word inline-block">
                    {word}
                  </span>
                ))}
              </h1>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-grotesk font-extrabold text-white tracking-tight uppercase leading-[0.95] drop-shadow-2xl flex flex-wrap gap-x-4 sm:gap-x-6">
                {headlineWordsLine2.map((word, idx) => (
                  <span key={idx} className="hero-word inline-block">
                    {word}
                  </span>
                ))}
              </h1>
            </div>

            {/* CTA Buttons Directly Under Text */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#industries"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-md bg-[#F01B25] text-white font-mono-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black red-glow shadow-lg shadow-[#F01B25]/30"
              >
                <span>Explore Solutions</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <button
                onClick={onOpenAbout}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300"
              >
                <Info className="w-4 h-4 text-[#F01B25]" />
                <span>About Us</span>
              </button>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-black/60 hover:bg-black/80 border border-white/15 text-zinc-300 hover:text-white font-mono-tech font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300"
              >
                Request Quote
              </button>
            </div>
          </div>

          {/* Scroll Indicator on Bottom Right */}
          <a
            href="#industries"
            className="flex items-center gap-3 text-zinc-300 hover:text-white font-mono-tech text-[11px] tracking-widest uppercase animate-bounce shrink-0 lg:mb-2 transition-colors"
          >
            <span>SCROLL TO REVEAL</span>
            <ArrowDown className="w-4 h-4 text-[#F01B25]" />
          </a>
        </div>
      </div>
    </div>
  );
};
