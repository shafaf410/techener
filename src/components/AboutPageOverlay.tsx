import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutConfig } from '../types/about';
import { defaultAboutConfig } from '../data/aboutConfig';
import { AboutHeroSection } from './about/AboutHeroSection';
import { AboutIntroSection } from './about/AboutIntroSection';
import { AboutLeadershipSection } from './about/AboutLeadershipSection';
import { AboutCertificationsSection } from './about/AboutCertificationsSection';
import { AboutFooterSection } from './about/AboutFooterSection';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type AboutTabType = 'who-we-are' | 'vision' | 'what-we-do' | 'certifications';

interface AboutPageOverlayProps {
  isOpen: boolean;
  initialTab?: AboutTabType;
  customConfig?: AboutConfig;
  onClose: () => void;
  onOpenQuote: () => void;
  onOpenDivisions?: () => void;
  onOpenIndustries?: () => void;
  onOpenContact?: () => void;
}

export const AboutPageOverlay: React.FC<AboutPageOverlayProps> = ({
  isOpen,
  initialTab = 'who-we-are',
  customConfig,
  onClose,
  onOpenQuote,
}) => {
  const config = customConfig || defaultAboutConfig;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Synchronize browser history for back button support
  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ modal: 'about' }, '', '#about');

    const handlePopState = () => {
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
      if (window.location.hash === '#about') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
  }, [isOpen, onClose]);

  // Setup GSAP ScrollTrigger context with proper cleanup
  useEffect(() => {
    if (!isOpen || !scrollContainerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle parallax on hero background if element exists
      gsap.to('.about-parallax-target', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about-hero-trigger',
          scroller: scrollContainerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Subtle pin or reveal effect for intro statement
      gsap.fromTo(
        '.about-reveal-line',
        { opacity: 0.3, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '#about-intro-section',
            scroller: scrollContainerRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );
    }, scrollContainerRef);

    // Refresh ScrollTrigger after render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert(); // Complete GSAP cleanup to prevent memory leaks or conflicts
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReturnHome = () => {
    if (window.location.hash === '#about') {
      window.history.back();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={scrollContainerRef}
          initial={{ opacity: 0, y: 35, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 35, scale: 0.99 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          id="about-scroll-container"
          className="fixed inset-0 z-[100] bg-[#050505] text-[#F4F4F4] h-full w-full overflow-y-auto overscroll-contain selection:bg-[#F01B25] selection:text-white block"
        >
          {/* Section 1: Full-Screen Bold Hero */}
          <div id="about-hero-trigger">
            <AboutHeroSection
              config={config}
              onClose={handleReturnHome}
              onOpenQuote={onOpenQuote}
              onScrollToExplore={() => scrollToSection('about-intro-section')}
            />
          </div>

          {/* Section 2: Company Introduction & Animated Numbers */}
          <AboutIntroSection config={config} />

          {/* Section 3: Leadership and Our People */}
          <AboutLeadershipSection config={config} />

          {/* Section 4: Tile Reveal Component */}
          <AboutCertificationsSection config={config} onOpenQuote={onOpenQuote} />

          {/* Section 5: Editorial Footer & Quick Action */}
          <AboutFooterSection
            config={config}
            onClose={handleReturnHome}
            onOpenQuote={onOpenQuote}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
