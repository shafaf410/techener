import React, { useEffect, useState, useRef } from 'react';
import {
  ArrowUpRight,
  ShieldCheck,
  Globe2,
  Cpu,
  Wrench,
  Target,
  Compass,
  Award,
  CheckCircle2,
  Users,
  HeartHandshake,
  Eye,
  Shield,
  ArrowLeft,
  Layers,
  ChevronRight,
  Sparkles,
  Briefcase,
  Check,
  Building2,
  ArrowDown,
  Factory,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

export type AboutTabType =
  | 'hero'
  | 'who-we-are'
  | 'leadership'
  | 'vision'
  | 'what-we-do'
  | 'certifications'
  | 'brands'
  | 'clients'
  | 'cta';

interface AboutPageOverlayProps {
  isOpen: boolean;
  initialTab?: AboutTabType;
  onClose: () => void;
  onOpenQuote: () => void;
  onOpenDivisions?: () => void;
  onOpenIndustries?: () => void;
  onOpenContact?: () => void;
}

// -------------------------------------------------------------
// TEXT TRANSITION HELPERS
// -------------------------------------------------------------

// 1. Staggered Word Roll / Masked Headline Transition
interface StaggerWordsProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
  delay?: number;
}

const MaskedHeadline: React.FC<StaggerWordsProps> = ({
  text,
  className = '',
  highlightWords = [],
  highlightColor = 'text-[#D92735]',
  delay = 0,
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const words = text.split(' ');

  return (
    <h2
      ref={ref}
      className={`flex flex-wrap items-baseline gap-x-[0.26em] gap-y-1 ${className}`}
    >
      {words.map((word, i) => {
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === word.toLowerCase().replace(/[^a-z0-9]/g, '')
        );

        return (
          <span key={i} className="inline-block overflow-hidden py-1">
            <motion.span
              initial={{ y: '115%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * 0.045,
              }}
              className={`inline-block will-change-transform ${
                isHighlight ? highlightColor : ''
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </h2>
  );
};

// 2. Scroll-driven Word Color Reveal (Soft Slate to Deep Navy / Red)
interface ScrollWordRevealProps {
  text: string;
  highlightWords?: string[];
  className?: string;
}

const ScrollWordReveal: React.FC<ScrollWordRevealProps> = ({
  text,
  highlightWords = ['power', 'progress', 'engineered', 'excellence', 'trusted'],
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          const start = windowHeight * 0.88;
          const end = windowHeight * 0.2;
          const current = start - rect.top;
          const totalDistance = start - end;
          const raw = current / totalDistance;
          setProgress(Math.max(0, Math.min(1, raw)));
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    // Listen on window and any scroll parent
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    let parent = containerRef.current?.parentElement;
    const containers: HTMLElement[] = [];
    while (parent) {
      const overflowY = window.getComputedStyle(parent).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        parent.addEventListener('scroll', handleScroll, { passive: true });
        containers.push(parent);
      }
      parent = parent.parentElement;
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      containers.forEach((c) => c.removeEventListener('scroll', handleScroll));
    };
  }, []);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className}>
      <p className="flex flex-wrap items-baseline gap-x-[0.28em] gap-y-1.5 leading-relaxed">
        {words.map((word, i) => {
          const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
          const isHighlight = highlightWords.includes(clean);

          const total = words.length;
          const wordStart = (i / total) * 0.75;
          const wordDuration = 0.25;
          const wordProgress = Math.max(0, Math.min(1, (progress - wordStart) / wordDuration));

          const startR = 185, startG = 192, startB = 202; // Muted slate silver
          const endR = isHighlight ? 217 : 16;           // #D92735 or #101C2C
          const endG = isHighlight ? 39 : 28;
          const endB = isHighlight ? 53 : 44;

          const r = Math.round(startR + (endR - startR) * wordProgress);
          const g = Math.round(startG + (endG - startG) * wordProgress);
          const b = Math.round(startB + (endB - startB) * wordProgress);
          const opacity = 0.45 + wordProgress * 0.55;

          return (
            <span
              key={i}
              style={{
                color: `rgb(${r}, ${g}, ${b})`,
                opacity,
                transition: 'color 0.22s ease-out, opacity 0.22s ease-out',
              }}
              className={`inline-block ${isHighlight ? 'font-bold' : 'font-medium'}`}
            >
              {word}
            </span>
          );
        })}
      </p>
    </div>
  );
};

// -------------------------------------------------------------
// DATA DEFINITIONS
// -------------------------------------------------------------

interface EngineeringService {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
}

const ENGINEERING_SERVICES: EngineeringService[] = [
  {
    number: '01',
    title: 'ENGINEERING SERVICES',
    subtitle: 'Consulting & Custom Sizing',
    description:
      'Tailored technical engineering consulting, component sizing, and customized system design engineered to withstand severe industrial operating conditions.',
    image: '/images/industrial_valves.jpg',
    tag: 'Technical Consulting',
  },
  {
    number: '02',
    title: 'PERIODIC MAINTENANCE SERVICES',
    subtitle: 'Inspection & Preventive Overhaul',
    description:
      'Scheduled plant inspections, valve recalibration, and preventive overhaul support that drastically reduce unpredicted downtime in critical energy utilities.',
    image: '/images/rotating_equipment.jpg',
    tag: 'Plant Integrity',
  },
  {
    number: '03',
    title: 'EQUIPMENT PERFORMANCE ANALYSIS',
    subtitle: 'Diagnostic Testing & Flow Analytics',
    description:
      'Advanced diagnostic evaluations to maximize operational uptime, optimize throughput efficiency, and extend the lifecycle of rotating and fluid assets.',
    image: '/images/pipes_fittings.jpg',
    tag: 'Diagnostics',
  },
  {
    number: '04',
    title: 'INSTALLATION & COMMISSIONING ASSISTANCE',
    subtitle: 'On-Site Field Verification',
    description:
      'Certified engineering technicians deployed directly on-site for seamless equipment startup, verification testing, and documented system handover.',
    image: '/images/industry_power_gen.jpg',
    tag: 'Field Operations',
  },
  {
    number: '05',
    title: 'PILOT PRODUCT DEVELOPMENT THROUGH REVERSE ENGINEERING',
    subtitle: 'Rapid Prototyping & Legacy Spares',
    description:
      'Precision component re-engineering, rapid metallurgy prototyping, and custom fabrication tailored specifically to obsolete, hard-to-source, or legacy machinery.',
    image: '/images/industrial_lubrication.jpg',
    tag: 'R&D / Prototyping',
  },
  {
    number: '06',
    title: 'GLOBAL SOURCING & SUPPLY CHAIN',
    subtitle: 'End-to-End Procurement Network',
    description:
      'Leveraging a robust global sourcing network and deep technical knowledge, TET delivers end-to-end supply chain solutions — from strategic procurement to on-time site delivery.',
    image: '/images/global_sourcing_map.jpg',
    tag: 'Supply Chain',
  },
];

interface MetricItem {
  value: string;
  title: string;
  description: string;
}

const COMPANY_METRICS: MetricItem[] = [
  {
    value: '200+',
    title: 'Professionals',
    description: 'Placing their trust in TET engineering and supply chain solutions.',
  },
  {
    value: 'UAE & Global',
    title: 'Network Reach',
    description: 'Serving the UAE, MENA region, Africa, Asia, and European industrial sectors.',
  },
  {
    value: '5',
    title: 'Core Divisions',
    description: 'Mechanical, Instrumentation, Flow Control, Electrical, and Filtration.',
  },
];

const CORE_VALUES = [
  {
    number: '01',
    title: 'Quality First',
    quote: '“Quality is the best business plan.”',
    description: 'Every product and service is held to a consistent standard of excellence.',
    icon: Shield,
  },
  {
    number: '02',
    title: 'Responsiveness & Technical Excellence',
    quote: 'Speed paired with rigorous engineering.',
    description: 'Building trust through fast, technically sound support across the MENA region and beyond.',
    icon: Wrench,
  },
  {
    number: '03',
    title: 'Trust & Transparency',
    quote: 'Honest communication at every stage.',
    description: 'Relationships with clients and manufacturing partners built on honesty and consistency.',
    icon: HeartHandshake,
  },
  {
    number: '04',
    title: 'Reliability & Long-Term Partnership',
    quote: 'Built for operational longevity.',
    description: 'A focus on sustainable, long-term collaboration rather than one-off transactions.',
    icon: Globe2,
  },
  {
    number: '05',
    title: 'Customer Commitment',
    quote: 'Dedicated to your ongoing success.',
    description: 'Dedication to reliable delivery and ongoing client success across all operations.',
    icon: Target,
  },
  {
    number: '06',
    title: 'Brand-Agnostic Integrity',
    quote: 'Objective technical recommendations.',
    description: 'Representing multiple global manufacturers while always prioritizing what best serves the customer.',
    icon: CheckCircle2,
  },
];

// 05 / BRANDS PORTFOLIO DATA (Ready for auto-sliding and user-provided logos)
const BRANDS_PORTFOLIO = [
  { name: 'AUTEL', type: 'Industrial Filtration & Valves', logo: '/images/AUTEL-LOGO-3-e1679735541237-600x168.png.webp' },
  { name: 'REDFLUID', type: 'High-Pressure Valves & Manifolds', logo: '/comp1.png' },
  { name: 'BONNEY FORGE', type: 'Forged Steel Valves & Fittings' },
  { name: 'VALVITALIA-VITAS', type: 'Pipeline & Severe Service Valves' },
  { name: 'DOUGLAS CHERO', type: 'High-Pressure Forged Valves' },
  { name: 'OMB VALVES', type: 'Oil & Gas Forged Valves' },
  { name: 'DIKKAN', type: 'Marine & Industrial Valves' },
  { name: 'FBV VALVES', type: 'Pipeline Ball & Gate Valves' },
  { name: 'OLIVER VALVES', type: 'Instrumentation & Needle Valves' },
  { name: 'GWC ITALIA', type: 'Trunnion Ball Valves' },
  { name: 'NOVEL VALVES', type: 'Industrial Valves & Actuators' },
  { name: 'FUSION FLOW CONTROL', type: 'Flow & Isolation Solutions' },
];

// 06 / OUR VALUABLE CLIENTS DATA (Ready for auto-sliding and user-provided logos)
const VALUABLE_CLIENTS = [
  { name: 'ADNOC', sector: 'Oil & Gas Major' },
  { name: 'SAUDI ARAMCO', sector: 'Energy & Petrochemicals' },
  { name: 'DEWA', sector: 'Electricity & Water Authority' },
  { name: 'PETROFAC', sector: 'EPC Industrial Infrastructure' },
  { name: 'LAMPRELL', sector: 'Offshore & Marine Engineering' },
  { name: 'MCDERMOTT', sector: 'Subsea & Energy EPC' },
  { name: 'ENOC', sector: 'National Oil & Refining' },
  { name: 'EGA', sector: 'Emirates Global Aluminium' },
  { name: 'PDO', sector: 'Petroleum Development Oman' },
  { name: 'KOC', sector: 'Kuwait Oil Company' },
  { name: 'QATARGAS', sector: 'LNG & Gas Processing' },
];

export const AboutPageOverlay: React.FC<AboutPageOverlayProps> = ({
  isOpen,
  initialTab = 'who-we-are',
  onClose,
  onOpenQuote,
  onOpenDivisions,
  onOpenIndustries,
  onOpenContact,
}) => {
  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Browser back button support
  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ modal: 'about' }, '', '#about');

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (window.location.hash === '#about') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
  }, [isOpen, onClose]);

  // Jump to specific section on open if specified
  useEffect(() => {
    if (isOpen && initialTab) {
      const sectionEl = document.getElementById(`about-${initialTab}`);
      if (sectionEl) {
        setTimeout(() => {
          sectionEl.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [isOpen, initialTab]);

  const handleReturnHome = () => {
    if (window.location.hash === '#about') {
      window.history.back();
    } else {
      onClose();
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          id="about-scroll-container"
          ref={containerRef}
          className="fixed inset-0 z-[100] bg-white text-[#171B20] h-full w-full overflow-y-auto overscroll-contain selection:bg-[#D92735] selection:text-white pt-24 sm:pt-28"
        >
          <main className="w-full">
            {/* ========================================================= */}
            {/* SECTION 01 — CORPORATE HERO */}
            {/* ========================================================= */}
            <section
              id="about-hero"
              className="relative w-full bg-white border-b border-[#F2F4F6] overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-6 lg:px-12"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  {/* Left Column: Headline and Editorial Label */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Introductory Label & Thin Accent Line */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex items-center gap-3"
                    >
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: 32 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="h-[2px] bg-[#D92735] inline-block"
                      />
                      <span className="text-xs font-mono-tech font-bold text-[#D92735] tracking-widest uppercase">
                        CORPORATE OVERVIEW & PROFILE
                      </span>
                    </motion.div>

                    {/* Main Headline line-by-line masked reveal with letter transitions */}
                    <div className="space-y-1">
                      <MaskedHeadline
                        text="ACCELERATING GROWTH, TOGETHER."
                        highlightWords={['TOGETHER.']}
                        highlightColor="text-[#D92735]"
                        delay={0.1}
                        className="text-4xl sm:text-6xl xl:text-7xl font-grotesk font-extrabold uppercase tracking-tight text-[#101C2C] leading-[0.95]"
                      />
                    </div>

                    {/* Supporting Line with Staggered Word Reveal */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-lg sm:text-xl font-outfit text-[#657180] font-normal leading-relaxed max-w-xl"
                    >
                      Engineering expertise. Global sourcing. Reliable industrial solutions.
                    </motion.p>

                    {/* Minimal Scroll Indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                      className="pt-6 flex items-center gap-3 text-xs font-mono-tech uppercase tracking-wider text-[#657180]"
                    >
                      <span className="w-6 h-[1px] bg-zinc-300" />
                      <span>Scroll to explore company overview</span>
                      <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#D92735]" />
                    </motion.div>
                  </div>

                  {/* Right Column: Industrial Technical Visual */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-5 relative"
                  >
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-lg overflow-hidden border border-[#F2F4F6] shadow-xl bg-zinc-900 group">
                      <img
                        src="/images/about/samana_office.jpg"
                        alt="Tech Ener-G Headquarters - Samana Ivy Gardens"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101C2C]/75 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <div className="text-[11px] font-mono-tech uppercase tracking-wider">
                          DUBAI • UAE HEADQUARTERS
                        </div>
                        <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#D92735] uppercase font-bold">
                          SAMANA IVY GARDENS
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 02 — WHO WE ARE */}
            {/* ========================================================= */}
            <section
              id="about-who-we-are"
              className="w-full bg-[#F2F4F6] py-20 sm:py-28 px-6 lg:px-12 border-b border-zinc-200"
            >
              <div className="max-w-7xl mx-auto space-y-16">
                {/* Two-Column Editorial Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  {/* Left Column: Identifier & Masked Headline */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="h-[2px] w-6 bg-[#D92735]" />
                      <span className="text-xs font-mono-tech font-bold text-[#D92735] tracking-widest uppercase">
                        01 / WHO WE ARE
                      </span>
                    </div>

                    <MaskedHeadline
                      text="TRUSTED PARTNER IN GLOBAL INDUSTRIAL SUPPLY CHAIN SOLUTIONS."
                      highlightWords={['INDUSTRIAL', 'SUPPLY', 'CHAIN', 'SOLUTIONS.']}
                      highlightColor="text-[#D92735]"
                      className="text-3xl sm:text-5xl font-grotesk font-extrabold text-[#101C2C] uppercase tracking-tight leading-[0.98]"
                    />
                  </div>

                  {/* Right Column: Company Description with Scroll-Driven Word Transition */}
                  <div className="lg:col-span-7 space-y-6 text-[#171B20] font-outfit text-base sm:text-lg leading-relaxed">
                    {/* Primary Highlight Statement with Interactive Word Transition */}
                    <div className="border-l-2 border-[#D92735] pl-5 bg-white/60 p-5 rounded-r-lg">
                      <ScrollWordReveal
                        text="Established in 2021, Tech Ener-G is a UAE-based industrial supply and engineering solutions company headquartered in the UAE. In a short time, TET has positioned itself as a trusted partner in global industrial supply chain solutions, serving clients across Power Generation, Oil & Gas, Construction, Infrastructure, and Manufacturing sectors."
                        highlightWords={['techenerg', 'trusted', 'partner', 'global', 'engineering', 'solutions']}
                        className="text-base sm:text-lg"
                      />
                    </div>

                    <p className="text-[#657180] pl-5">
                      Tech Ener-G acts as a unique bridge between end users and leading global manufacturers, combining deep technical expertise with advanced technologies to meet evolving industrial demands. Rather than acting purely as a product supplier, TET positions itself as a <strong className="text-[#101C2C] font-semibold">value-driven engineering partner</strong>, supported by a highly qualified team of engineers and industry professionals, with <strong className="text-[#101C2C] font-semibold">more than 200+ people</strong> placing their trust in the organization.
                    </p>

                    <p className="text-[#657180] pl-5">
                      The company operates across specialized divisions — <strong className="text-[#101C2C] font-semibold">Mechanical, Instrumentation & Fluid Solutions, Flow Control, Electrical & Instrumentation, and Filtration</strong> — enabling it to serve a wide range of technical and operational requirements under one roof. Partnerships with major OEMs help maintain product proficiency and ongoing technical support.
                    </p>
                  </div>
                </div>

                {/* Below Description: 3 Distinct Metric Blocks */}
                <div className="pt-8 border-t border-zinc-300/80">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {COMPANY_METRICS.map((metric, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="relative overflow-hidden p-8 rounded-lg bg-white border border-zinc-200 shadow-sm transition-all duration-300 hover:border-[#D92735] hover:shadow-xl hover:shadow-[#D92735]/10 group/metric cursor-pointer"
                      >
                        {/* Red faded gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D92735]/15 via-[#D92735]/5 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Soft ambient corner glow on hover */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D92735]/20 rounded-full blur-2xl opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10 space-y-3">
                          <div className="text-3xl sm:text-4xl font-grotesk font-extrabold text-[#101C2C] group-hover/metric:text-[#D92735] transition-colors duration-300 tracking-tight">
                            {metric.value}
                          </div>
                          <h4 className="text-lg font-grotesk font-extrabold uppercase text-[#101C2C] tracking-tight">
                            {metric.title}
                          </h4>
                          <p className="text-xs sm:text-sm font-outfit text-[#657180] leading-relaxed">
                            {metric.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 03 — VISION, MISSION & VALUES */}
            {/* ========================================================= */}
            <section
              id="about-vision"
              className="w-full bg-[#F2F4F6] py-20 sm:py-28 px-6 lg:px-12 border-b border-zinc-200"
            >
              <div className="max-w-7xl mx-auto space-y-16">
                {/* Section Header */}
                <div className="space-y-3 max-w-4xl">
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-6 bg-[#D92735]" />
                    <span className="text-xs font-mono-tech font-bold text-[#D92735] tracking-widest uppercase">
                      02 / VISION, MISSION & VALUES
                    </span>
                  </div>

                  <MaskedHeadline
                    text="OUR GUIDING PRINCIPLES & CORE VALUES."
                    highlightWords={['CORE', 'VALUES.']}
                    highlightColor="text-[#D92735]"
                    className="text-3xl sm:text-5xl font-grotesk font-extrabold text-[#101C2C] uppercase tracking-tight leading-[0.98]"
                  />
                </div>

                {/* Two Prominent Vision and Mission Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Vision Panel */}
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-8 sm:p-10 rounded-lg bg-white border border-zinc-200 shadow-sm space-y-4 hover:border-[#D92735] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-md bg-[#101C2C] text-white">
                        <Eye className="w-6 h-6 text-[#D92735]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono-tech text-[#657180] uppercase tracking-widest block font-bold">
                          FORWARD DIRECTIVE
                        </span>
                        <h3 className="text-2xl font-grotesk font-extrabold uppercase tracking-tight text-[#101C2C]">
                          OUR VISION
                        </h3>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg font-outfit text-[#171B20] leading-relaxed font-normal pt-2">
                      Tech Ener-G aims to deliver consistent, high-quality products and services that establish the company as a market leader in global industrial sourcing.
                    </p>
                  </motion.div>

                  {/* Mission Panel */}
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-8 sm:p-10 rounded-lg bg-white border border-zinc-200 shadow-sm space-y-4 hover:border-[#D92735] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-md bg-[#101C2C] text-white">
                        <Compass className="w-6 h-6 text-[#D92735]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono-tech text-[#657180] uppercase tracking-widest block font-bold">
                          STRATEGIC PURPOSE
                        </span>
                        <h3 className="text-2xl font-grotesk font-extrabold uppercase tracking-tight text-[#101C2C]">
                          OUR MISSION
                        </h3>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg font-outfit text-[#171B20] leading-relaxed font-normal pt-2">
                      Our journey is directed toward satisfying customers' requirements by serving as a unique bridge between them and leading global manufacturers — offering brand-agnostic, high-quality solutions always centered on the customer's best interest.
                    </p>
                  </motion.div>
                </div>

                {/* Ultra-Minimal Bullet Points List */}
                <div className="space-y-6 pt-6 border-t border-zinc-200">
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-6 bg-[#D92735]" />
                    <h3 className="text-xs font-mono-tech font-bold text-[#D92735] uppercase tracking-widest">
                      OUR VALUES
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                    {CORE_VALUES.map((val) => (
                      <div
                        key={val.number}
                        className="flex items-start gap-3 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#D92735] mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
                        <div className="text-sm font-outfit text-[#657180] leading-relaxed">
                          <strong className="font-grotesk font-extrabold uppercase text-[#101C2C] group-hover:text-[#D92735] transition-colors tracking-tight mr-1.5 block sm:inline">
                            {val.number}. {val.title}:
                          </strong>
                          <span>{val.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 04 — WHAT WE DO (Interactive Technical Catalogue) */}
            {/* ========================================================= */}
            <section
              id="about-what-we-do"
              className="w-full bg-white py-20 sm:py-28 px-6 lg:px-12 border-b border-[#F2F4F6]"
            >
              <div className="max-w-7xl mx-auto space-y-16">
                {/* Section Header */}
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-6 bg-[#D92735]" />
                    <span className="text-xs font-mono-tech font-bold text-[#D92735] tracking-widest uppercase">
                      03 / WHAT WE DO
                    </span>
                  </div>

                  <MaskedHeadline
                    text="VALUE-ADDED ENGINEERING & TECHNICAL SERVICES."
                    highlightWords={['TECHNICAL', 'SERVICES.']}
                    highlightColor="text-[#D92735]"
                    className="text-3xl sm:text-5xl font-grotesk font-extrabold text-[#101C2C] uppercase tracking-tight leading-[0.98]"
                  />

                  <p className="text-base sm:text-lg font-outfit text-[#657180] leading-relaxed max-w-3xl">
                    Tech Ener-G goes beyond conventional product supply, offering value-added engineering and technical services that help clients optimize performance, efficiency, and lifecycle value across their operations.
                  </p>
                </div>

                {/* Interactive Technical Directory + Sticky Image Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Numbered Service Directory */}
                  <div className="lg:col-span-7 space-y-3">
                    {ENGINEERING_SERVICES.map((service, index) => {
                      const isActive = activeServiceIdx === index;
                      return (
                        <div
                          key={service.number}
                          onClick={() => setActiveServiceIdx(index)}
                          onMouseEnter={() => setActiveServiceIdx(index)}
                          tabIndex={0}
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setActiveServiceIdx(index);
                            }
                          }}
                          className={`w-full text-left p-6 sm:p-7 rounded-lg border transition-all duration-300 cursor-pointer ${
                            isActive
                              ? 'bg-[#101C2C] text-white border-[#101C2C] shadow-lg translate-x-1'
                              : 'bg-white text-[#171B20] border-zinc-200 hover:border-zinc-400 hover:bg-[#F2F4F6]/50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <span
                                  className={`text-xs font-mono-tech font-bold ${
                                    isActive ? 'text-[#D92735]' : 'text-[#657180]'
                                  }`}
                                >
                                  SERVICE {service.number}
                                </span>
                                <span
                                  className={`text-[10px] font-mono-tech px-2 py-0.5 rounded ${
                                    isActive
                                      ? 'bg-white/10 text-zinc-300'
                                      : 'bg-zinc-100 text-zinc-600'
                                  }`}
                                >
                                  {service.tag}
                                </span>
                              </div>
                              <h4
                                className={`text-lg sm:text-xl font-grotesk font-extrabold uppercase tracking-tight ${
                                  isActive ? 'text-white' : 'text-[#101C2C]'
                                }`}
                              >
                                {service.title}
                              </h4>
                              <p
                                className={`text-xs sm:text-sm font-outfit leading-relaxed max-w-xl ${
                                  isActive ? 'text-zinc-300' : 'text-[#657180]'
                                }`}
                              >
                                {service.description}
                              </p>
                            </div>

                            <ArrowUpRight
                              className={`w-5 h-5 flex-shrink-0 transition-transform ${
                                isActive
                                  ? 'text-[#D92735] translate-x-1 -translate-y-1'
                                  : 'text-zinc-400'
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Sticky Industrial Image Panel on Desktop */}
                  <div className="lg:col-span-5 lg:sticky lg:top-28">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-zinc-200 shadow-xl bg-zinc-950">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeServiceIdx}
                          src={ENGINEERING_SERVICES[activeServiceIdx].image}
                          alt={ENGINEERING_SERVICES[activeServiceIdx].title}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101C2C] via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                        <span className="text-[11px] font-mono-tech text-[#D92735] font-bold uppercase tracking-wider">
                          ACTIVE SERVICE 0{activeServiceIdx + 1}
                        </span>
                        <div className="text-sm font-grotesk font-extrabold uppercase">
                          {ENGINEERING_SERVICES[activeServiceIdx].subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 05 — ORGANIZATIONS & CERTIFICATIONS */}
            {/* ========================================================= */}
            <section
              id="about-certifications"
              className="w-full bg-[#F2F4F6] py-20 sm:py-28 px-6 lg:px-12 border-b border-zinc-200"
            >
              <div className="max-w-7xl mx-auto space-y-16">
                {/* Section Header */}
                <div className="space-y-3 max-w-4xl">
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-6 bg-[#D92735]" />
                    <span className="text-xs font-mono-tech font-bold text-[#D92735] tracking-widest uppercase">
                      04 / ORGANIZATIONS & CERTIFICATIONS
                    </span>
                  </div>

                  <MaskedHeadline
                    text="OFFICIAL AUTHORISATIONS & ISO QUALITY CERTIFICATIONS."
                    highlightWords={['ISO', 'QUALITY', 'CERTIFICATIONS.']}
                    highlightColor="text-[#D92735]"
                    className="text-3xl sm:text-5xl font-grotesk font-extrabold text-[#101C2C] uppercase tracking-tight leading-[0.98]"
                  />
                </div>

                {/* 3-Card Credentials Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* CARD 01 — AUTEL AUTHORISATION */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-8 rounded-lg bg-white border border-zinc-200 space-y-6 shadow-sm flex flex-col justify-between hover:border-[#D92735] hover:shadow-md transition-all"
                  >
                    <div className="space-y-4">
                      {/* Preserving original image proportions */}
                      <div className="h-20 flex items-center justify-start border-b border-zinc-100 pb-3">
                        <img
                          src="/images/AUTEL-LOGO-3-e1679735541237-600x168.png.webp"
                          alt="Autel Official Authorisation Logo"
                          className="h-10 max-w-full object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-grotesk font-extrabold text-[#101C2C] uppercase">
                          Autel Authorisation
                        </h4>
                        <div className="text-xs font-mono-tech text-[#D92735] font-bold tracking-wider">
                          OFFICIAL DISTRIBUTOR & PARTNER
                        </div>
                      </div>
                      <p className="text-sm font-outfit text-[#657180] leading-relaxed">
                        Authorized sales, technical support, and component distribution for Autel industrial filtration and valve systems.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono-tech text-emerald-700 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Verified Distribution Partner
                      </span>
                    </div>
                  </motion.div>

                  {/* CARD 02 — REDFLUID AUTHORISATION */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-8 rounded-lg bg-white border border-zinc-200 space-y-6 shadow-sm flex flex-col justify-between hover:border-[#D92735] hover:shadow-md transition-all"
                  >
                    <div className="space-y-4">
                      <div className="h-20 flex items-center justify-start border-b border-zinc-100 pb-3">
                        <img
                          src="/comp1.png"
                          alt="Redfluid Official Logo"
                          className="h-12 max-w-full object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-grotesk font-extrabold text-[#101C2C] uppercase">
                          Redfluid Authorisation
                        </h4>
                        <div className="text-xs font-mono-tech text-[#D92735] font-bold tracking-wider">
                          AUTHORIZED HIGH-PRESSURE VALVES
                        </div>
                      </div>
                      <p className="text-sm font-outfit text-[#657180] leading-relaxed">
                        Authorized regional supplier for Redfluid needle valves, manifold valves, and high-pressure fluid control systems.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono-tech text-emerald-700 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Authorized High-Pressure Valves
                      </span>
                    </div>
                  </motion.div>

                  {/* CARD 03 — ISO 9001:2015 */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-8 rounded-lg bg-white border border-zinc-200 space-y-6 shadow-sm flex flex-col justify-between hover:border-[#D92735] hover:shadow-md transition-all"
                  >
                    <div className="space-y-4">
                      <div className="h-16 flex items-center justify-start border-b border-zinc-100 pb-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-100 border border-zinc-300">
                          <Award className="w-5 h-5 text-[#D92735]" />
                          <span className="font-mono-tech font-bold text-xs text-[#101C2C]">
                            ISO 9001:2015
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-grotesk font-extrabold text-[#101C2C] uppercase">
                          ISO 9001:2015
                        </h4>
                        <div className="text-xs font-mono-tech text-[#D92735] font-bold tracking-wider">
                          QUALITY MANAGEMENT SYSTEM
                        </div>
                      </div>
                      <p className="text-sm font-outfit text-[#657180] leading-relaxed">
                        Certified Quality Management System compliance for industrial equipment procurement, engineering services, and supply chain.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono-tech text-emerald-700 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Audited QMS Compliance
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Supporting Statement */}
                <div className="p-4 rounded-md bg-white border border-zinc-200 flex items-center justify-center gap-2 text-xs font-mono-tech text-[#101C2C]">
                  <ShieldCheck className="w-4 h-4 text-[#D92735]" />
                  <span className="font-bold">
                    Tech Ener-G Trading FZE • ISO 9001:2015 Certified Organization
                  </span>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 05 — BRANDS PORTFOLIO (Auto-sliding logos) */}
            {/* ========================================================= */}
            <section
              id="about-brands"
              className="w-full bg-white py-16 sm:py-24 px-6 lg:px-12 border-b border-zinc-200 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="h-[2px] w-6 bg-[#D92735]" />
                      <span className="text-xs font-mono-tech font-bold text-[#D92735] tracking-widest uppercase">
                        05 / BRANDS PORTFOLIO
                      </span>
                    </div>
                    <MaskedHeadline
                      text="GLOBAL BRANDS & OEM PARTNERS."
                      highlightWords={['GLOBAL', 'BRANDS']}
                      highlightColor="text-[#D92735]"
                      className="text-3xl sm:text-4xl font-grotesk font-extrabold text-[#101C2C] uppercase tracking-tight"
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-outfit text-[#657180] max-w-md leading-relaxed">
                    Representing premier international industrial manufacturing partners and technology leaders across flow control, mechanical equipment, and instrumentation.
                  </p>
                </div>

                {/* Auto Sliding Logos Ticker (Left to Right) */}
                <div className="relative w-full overflow-hidden py-4 -mx-6 px-6 lg:-mx-12 lg:px-12">
                  {/* Edge fades */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                  <div className="animate-marquee-infinite flex gap-6 items-center">
                    {[...BRANDS_PORTFOLIO, ...BRANDS_PORTFOLIO].map((brand, idx) => (
                      <div
                        key={idx}
                        className="flex-shrink-0 w-64 h-24 rounded-lg bg-[#F2F4F6]/80 border border-zinc-200/90 hover:border-[#D92735] hover:bg-white p-4 flex flex-col justify-center items-center text-center transition-all duration-300 shadow-sm group cursor-pointer"
                      >
                        {brand.logo ? (
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="max-h-10 max-w-[180px] object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="space-y-1">
                            <span className="text-sm font-grotesk font-extrabold text-[#101C2C] group-hover:text-[#D92735] transition-colors tracking-wider uppercase block">
                              {brand.name}
                            </span>
                            <span className="text-[10px] font-mono-tech text-[#657180] uppercase tracking-tight line-clamp-1 block">
                              {brand.type}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 06 — OUR VALUABLE CLIENTS (Auto-sliding logos) */}
            {/* ========================================================= */}
            <section
              id="about-clients"
              className="w-full bg-[#F2F4F6] py-16 sm:py-24 px-6 lg:px-12 border-b border-zinc-200 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="h-[2px] w-6 bg-[#D92735]" />
                      <span className="text-xs font-mono-tech font-bold text-[#D92735] tracking-widest uppercase">
                        06 / OUR VALUABLE CLIENTS
                      </span>
                    </div>
                    <MaskedHeadline
                      text="TRUSTED BY INDUSTRIAL LEADERS."
                      highlightWords={['INDUSTRIAL', 'LEADERS.']}
                      highlightColor="text-[#D92735]"
                      className="text-3xl sm:text-4xl font-grotesk font-extrabold text-[#101C2C] uppercase tracking-tight"
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-outfit text-[#657180] max-w-md leading-relaxed">
                    Supplying mission-critical equipment and engineering services to prestigious operators, EPC contractors, and state utility providers across the region.
                  </p>
                </div>

                {/* Auto Sliding Logos Ticker (Right to Left Reverse) */}
                <div className="relative w-full overflow-hidden py-4 -mx-6 px-6 lg:-mx-12 lg:px-12">
                  {/* Edge fades */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#F2F4F6] to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#F2F4F6] to-transparent z-10 pointer-events-none" />

                  <div className="animate-marquee-reverse flex gap-6 items-center">
                    {[...VALUABLE_CLIENTS, ...VALUABLE_CLIENTS].map((client, idx) => (
                      <div
                        key={idx}
                        className="flex-shrink-0 w-64 h-24 rounded-lg bg-white border border-zinc-200 hover:border-[#D92735] p-4 flex flex-col justify-center items-center text-center transition-all duration-300 shadow-sm group cursor-pointer"
                      >
                        <div className="space-y-1">
                          <span className="text-base font-grotesk font-extrabold text-[#101C2C] group-hover:text-[#D92735] transition-colors tracking-wide uppercase block">
                            {client.name}
                          </span>
                          <span className="text-[10px] font-mono-tech text-[#657180] uppercase tracking-wider block">
                            {client.sector}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 06 — CLOSING CTA (Deep Navy Visual Moment) */}
            {/* ========================================================= */}
            <section
              id="about-cta"
              className="w-full bg-[#101C2C] text-white py-24 sm:py-32 px-6 lg:px-12 relative overflow-hidden"
            >
              {/* Subtle background industrial grid pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

              <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Left Column: Headline & Supporting Copy */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="h-[2px] w-8 bg-[#D92735]" />
                      <span className="text-xs font-mono-tech font-bold text-[#D92735] tracking-widest uppercase">
                        CONNECT WITH US
                      </span>
                    </div>

                    <MaskedHeadline
                      text="BUILT ON TRUST. DRIVEN BY ENGINEERING."
                      highlightWords={['DRIVEN', 'BY', 'ENGINEERING.']}
                      highlightColor="text-[#D92735]"
                      className="text-4xl sm:text-6xl lg:text-7xl font-grotesk font-extrabold uppercase tracking-tight text-white leading-[0.95]"
                    />

                    <p className="text-base sm:text-xl font-outfit text-zinc-300 font-normal leading-relaxed max-w-2xl">
                      Looking for a dependable industrial supply and engineering partner? Connect with Tech Ener-G to discuss your technical requirements and sourcing needs.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      {/* Primary CTA */}
                      <button
                        onClick={() => {
                          onClose();
                          onOpenQuote();
                        }}
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-sm bg-[#D92735] text-white font-mono-tech font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-[#101C2C] transition-all duration-300 shadow-xl cursor-pointer"
                      >
                        <span>REQUEST QUOTATION</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </button>

                      {/* Secondary CTA */}
                      <button
                        onClick={handleReturnHome}
                        className="inline-flex items-center gap-2 px-7 py-4 rounded-sm border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-mono-tech font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4 text-[#D92735]" />
                        <span>RETURN TO HOME</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Refined Technical Graphic */}
                  <div className="lg:col-span-4 hidden lg:block">
                    <div className="p-8 rounded-lg bg-white/5 border border-white/10 space-y-4">
                      <div className="text-xs font-mono-tech text-[#D92735] font-bold uppercase tracking-wider">
                        CORPORATE HEADQUARTERS
                      </div>
                      <div className="font-grotesk font-extrabold text-xl text-white">
                        Tech Ener-G Trading FZE
                      </div>
                      <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
                        Serving Power Generation, Oil & Gas, Construction, and Infrastructure across UAE, GCC, and International markets.
                      </p>
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-zinc-400">
                        <span>ISO 9001:2015</span>
                        <span className="text-emerald-400">CERTIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
