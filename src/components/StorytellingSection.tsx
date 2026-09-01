import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ShieldCheck, Globe2, Cpu, Wrench, CheckCircle2, Factory, Flame, Building2, Zap, Sliders, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StorytellingSectionProps {
  onOpenQuote: (productTitle?: string) => void;
}

interface ChapterData {
  id: string;
  number: string;
  tag: string;
  headline: string[];
  subtext: string;
}

const CHAPTERS: ChapterData[] = [
  {
    id: 'about',
    number: '01',
    tag: '01 / ABOUT TECH ENER-G',
    headline: ['BRIDGING THE GAP', 'BETWEEN USERS &', 'MANUFACTURERS'],
    subtext: 'Established in 2021 in the UAE, Tech Ener-G Trading FZE operates as a single-source industrial supply partner. We link regional end-users directly with international OEM manufacturers across Power, Oil & Gas, and Heavy Industry.',
  },
  {
    id: 'industries',
    number: '02',
    tag: '02 / TARGET SECTORS',
    headline: ['POWERING', 'CRITICAL', 'INDUSTRIES.'],
    subtext: 'Delivering specialized, API and ISO certified equipment across high-stakes energy infrastructure and industrial manufacturing plants globally.',
  },
  {
    id: 'solutions',
    number: '03',
    tag: '03 / PRODUCT SCOPE',
    headline: ['ENGINEERED', 'FOR INDUSTRY.'],
    subtext: 'Comprehensive 5-division portfolio spanning rotating machinery, fluid control, precision instrumentation, heavy hardware, and electrical infrastructure.',
  },
  {
    id: 'valves',
    number: '04',
    tag: '04 / FLOW ISOLATION',
    headline: ['PRECISION', 'FLOW CONTROL.'],
    subtext: 'Full-spectrum pipeline valve engineering certified for extreme pressure, high-temperature steam, cryogenic fluids, and sour gas applications.',
  },
  {
    id: 'global',
    number: '05',
    tag: '05 / GLOBAL SOURCING',
    headline: ['YOUR GLOBAL', 'BUYING PARTNER.'],
    subtext: 'Strategic procurement hub in Hamriyah Free Zone, Sharjah, UAE — operating under ISO 9001, 14001, and 45001 quality management standards with 100+ vetted OEM partners.',
  },
];

const INDUSTRIES_LIST = [
  { name: 'POWER GENERATION', desc: 'Turbines, steam valves, boilers, generators & high-voltage substation components', icon: Zap },
  { name: 'OIL & GAS', desc: 'Upstream drilling, API 6D pipeline valves, refineries & offshore production platforms', icon: Flame },
  { name: 'CONSTRUCTION', desc: 'Heavy structural steel, high-tensile fasteners, hydraulic tooling & site safety gear', icon: Building2 },
  { name: 'MANUFACTURING', desc: 'Process automation, fluid control manifolds, precision sensors & industrial hydraulics', icon: Factory },
];

const SOLUTIONS_DIVISIONS = [
  { code: 'DIV 01', title: 'MECHANICAL & ROTATING EQUIPMENT', items: 'Pumps, Compressors, Gearboxes, Heat Exchangers, Flanges & Pipes' },
  { code: 'DIV 02', title: 'INSTRUMENTATION & FLUID SOLUTIONS', items: 'Flowmeters, Transmitters, Manifolds, Gas Detectors & Calibration Units' },
  { code: 'DIV 03', title: 'FLOW CONTROL & PIPELINE VALVES', items: 'Pipeline Valves, PRV / SRV Relief Valves, Positioners & Actuators' },
  { code: 'DIV 04', title: 'ELECTRICAL & POWER DISTRIBUTION', items: 'Switchgear, Cables, Transformers, Explosion-proof Lighting & Panels' },
  { code: 'DIV 05', title: 'HARDWARE, FASTENERS & GASKETS', items: 'Stud Bolts, High-tensile Nuts, Spiral Wound Gaskets & Heavy Hardware' },
];

const VALVES_LIST = [
  { name: 'BALL', type: 'Floating & Trunnion Mounted' },
  { name: 'GATE', type: 'Wedge & Conduit Gate' },
  { name: 'GLOBE', type: 'Throttling & Shut-off' },
  { name: 'CHECK', type: 'Swing, Dual Plate & Piston' },
  { name: 'BUTTERFLY', type: 'Triple Offset & High Performance' },
  { name: 'PLUG', type: 'Sleeved & Lubricated' },
  { name: 'CONTROL', type: 'Pneumatic & Electric Actuated' },
  { name: 'ACTUATED', type: 'Hydraulic & Motor Driven' },
];

const GLOBAL_PILLARS = [
  { title: 'HAMRIYAH FREE ZONE HQ', desc: 'Sharjah, UAE procurement hub ensuring expedited customs clearance & direct international dispatch.' },
  { title: '100+ APPROVED OEMS', desc: 'Direct factory access to leading manufacturers across USA, Europe, Japan, and South Korea.' },
  { title: 'ISO TRIPLE CERTIFIED', desc: 'Fully compliant with ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 quality standards.' },
  { title: '20,000+ CATALOG ITEMS', desc: 'Complete MRO and capital equipment sourcing with guaranteed material traceability.' },
];

export const StorytellingSection: React.FC<StorytellingSectionProps> = ({ onOpenQuote }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // GSAP ScrollTrigger Pinned Timeline
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const totalSteps = CHAPTERS.length;

      // Master ScrollTrigger for step progression
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalSteps * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const currentProgress = self.progress;
          setProgress(currentProgress);
          // Calculate step index (0 to 4)
          const stepIndex = Math.min(
            totalSteps - 1,
            Math.floor(currentProgress * totalSteps)
          );
          setActiveStep(stepIndex);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToStep = (index: number) => {
    if (!sectionRef.current) return;
    const totalSteps = CHAPTERS.length;
    const scrollPosition = sectionRef.current.offsetTop + (sectionRef.current.offsetHeight / totalSteps) * index;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="storytelling"
      className="relative w-full bg-[#050505] text-[#F4F4F4] overflow-hidden select-none border-t border-white/10"
    >
      {/* Background Industrial Ambient Mesh & Subtle Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#F01B25]/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-red-950/20 blur-[180px]" />
        
        {/* Subtle Architectural Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Sticky Fullscreen Story Viewport (100vh / 100svh) */}
      <div className="relative z-10 w-full h-screen min-h-[650px] max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between py-8 md:py-12">
        
        {/* Top Bar: Section Tag & Minimal Progress Indicator */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          {/* Eyebrow Chapter Tag */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F01B25] animate-ping" />
            <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
              {CHAPTERS[activeStep].tag}
            </span>
          </div>

          {/* Minimal 01/05 Progress Bar Indicator */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-mono-tech text-xs font-bold text-white tracking-widest">
              <span className="text-[#F01B25]">0{activeStep + 1}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">0{CHAPTERS.length}</span>
            </div>

            {/* Thin Progress Track */}
            <div className="w-24 sm:w-36 h-[2px] bg-white/15 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#F01B25] transition-all duration-300 ease-out"
                style={{ width: `${Math.max(5, ((activeStep + 1) / CHAPTERS.length) * 100)}%` }}
              />
            </div>

            {/* Chapter Step Indicators for Direct Interaction */}
            <div className="hidden sm:flex items-center gap-2 ml-2">
              {CHAPTERS.map((chap, idx) => (
                <button
                  key={chap.id}
                  onClick={() => scrollToStep(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                    activeStep === idx
                      ? 'bg-[#F01B25] scale-125 shadow-[0_0_10px_#F01B25]'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to story chapter ${chap.number}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center Main Story Area: 2-Column Asymmetrical Editorial Layout */}
        <div className="my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Staggered Word Headline & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Monumental Editorial Headline with Word Staggering */}
            <div className="space-y-1">
              {CHAPTERS[activeStep].headline.map((line, lineIdx) => {
                const words = line.split(' ');
                return (
                  <div key={`line-${activeStep}-${lineIdx}`} className="overflow-hidden py-0.5">
                    <div className="flex flex-wrap gap-x-3.5 items-center">
                      {words.map((word, wordIdx) => (
                        <span
                          key={`word-${activeStep}-${lineIdx}-${wordIdx}`}
                          className={`inline-block font-grotesk font-extrabold uppercase tracking-tight leading-[0.92] text-[clamp(2.2rem,5vw,4.5rem)] drop-shadow-2xl transition-all duration-500 transform ${
                            word.includes('MANUFACTURERS') ||
                            word.includes('INDUSTRIES.') ||
                            word.includes('INDUSTRY.') ||
                            word.includes('CONTROL.') ||
                            word.includes('PARTNER.')
                              ? 'text-[#F01B25]'
                              : 'text-white'
                          }`}
                          style={{
                            animation: `staggerUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${wordIdx * 0.07}s both`,
                          }}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtext Narrative */}
            <p className="text-base sm:text-lg font-outfit text-zinc-300 leading-relaxed font-light max-w-xl border-l-2 border-[#F01B25]/60 pl-4 py-1">
              {CHAPTERS[activeStep].subtext}
            </p>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-[#F01B25] hover:bg-white hover:text-black text-white font-mono-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 red-glow shadow-lg"
              >
                <span>REQUEST INDUSTRIAL QUOTE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Content Reveal Per Chapter */}
          <div className="lg:col-span-6 min-h-[320px] flex flex-col justify-center">
            
            {/* 01: ABOUT CONTENT */}
            {activeStep === 0 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-4">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <ShieldCheck className="w-5 h-5 text-[#F01B25]" />
                    <span className="font-grotesk font-bold text-sm text-white uppercase tracking-wider">
                      TRUSTED INDUSTRIAL PROCUREMENT
                    </span>
                  </div>
                  <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                    Tech Ener-G Trading FZE streamlines heavy industrial equipment sourcing with full engineering compliance, material certification, and logistics support.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <div className="text-2xl font-grotesk font-extrabold text-white">20,000+</div>
                    <div className="text-xs font-mono-tech text-zinc-400">Available Products</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <div className="text-2xl font-grotesk font-extrabold text-[#F01B25]">100%</div>
                    <div className="text-xs font-mono-tech text-zinc-400">OEM Traceability</div>
                  </div>
                </div>
              </div>
            )}

            {/* 02: INDUSTRIES CONTENT */}
            {activeStep === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                {INDUSTRIES_LIST.map((ind, i) => {
                  const Icon = ind.icon;
                  return (
                    <div
                      key={ind.name}
                      className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#F01B25]/40 backdrop-blur-md transition-all duration-300 space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono-tech text-zinc-500 font-bold">0{i + 1}</span>
                        <Icon className="w-5 h-5 text-[#F01B25] group-hover:scale-110 transition-transform" />
                      </div>
                      <h4 className="font-grotesk font-bold text-sm text-white uppercase tracking-tight">
                        {ind.name}
                      </h4>
                      <p className="text-xs font-outfit text-zinc-400 leading-snug font-light">
                        {ind.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 03: SOLUTIONS CONTENT */}
            {activeStep === 2 && (
              <div className="space-y-3 animate-fadeIn">
                {SOLUTIONS_DIVISIONS.map((div) => (
                  <div
                    key={div.code}
                    className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#F01B25]/40 backdrop-blur-md transition-all duration-300 flex items-start gap-4 group"
                  >
                    <span className="text-xs font-mono-tech font-bold text-[#F01B25] px-2 py-1 rounded bg-black/60 border border-white/10 shrink-0">
                      {div.code}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-grotesk font-bold text-xs text-white uppercase tracking-wider group-hover:text-[#F01B25] transition-colors">
                        {div.title}
                      </h4>
                      <p className="text-[11px] font-outfit text-zinc-400 font-light">
                        {div.items}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 04: VALVES CONTENT */}
            {activeStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {VALVES_LIST.map((valve) => (
                    <div
                      key={valve.name}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#F01B25]/50 text-center transition-all duration-300 group"
                    >
                      <div className="font-grotesk font-extrabold text-sm text-white uppercase group-hover:text-[#F01B25] transition-colors">
                        {valve.name}
                      </div>
                      <div className="text-[10px] font-mono-tech text-zinc-500 mt-1 uppercase">VALVE</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono-tech text-zinc-300">
                  <span className="text-[#F01B25] font-bold">CERTIFICATIONS:</span>
                  <span>API 6D | API 600 | ISO 15848 | NACE MR0175</span>
                </div>
              </div>
            )}

            {/* 05: GLOBAL SOURCING CONTENT */}
            {activeStep === 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                {GLOBAL_PILLARS.map((pillar, idx) => (
                  <div
                    key={pillar.title}
                    className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F01B25]" />
                      <h4 className="font-grotesk font-bold text-xs text-white uppercase tracking-wider">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs font-outfit text-zinc-400 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Interactive Chapter Tabs */}
        <div className="border-t border-white/10 pt-4 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 sm:gap-6">
            {CHAPTERS.map((chap, idx) => (
              <button
                key={chap.id}
                onClick={() => scrollToStep(idx)}
                className={`text-xs font-mono-tech font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all duration-300 whitespace-nowrap focus:outline-none ${
                  activeStep === idx
                    ? 'bg-[#F01B25] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {chap.number}. {chap.id}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono-tech text-zinc-500 uppercase tracking-widest shrink-0">
            <span>SCROLL STORY</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#F01B25] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Keyframe Styles for Word Stagger Reveal */}
      <style>{`
        @keyframes staggerUp {
          from {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
