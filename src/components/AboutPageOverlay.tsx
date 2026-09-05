import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, ShieldCheck, Globe2, Cpu, Wrench, Target, Compass, Award, CheckCircle2, Users, HeartHandshake, Eye, Shield, ArrowLeft, Layers, Factory } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export type AboutTabType = 'who-we-are' | 'vision' | 'what-we-do' | 'certifications';

interface AboutPageOverlayProps {
  isOpen: boolean;
  initialTab?: AboutTabType;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const AboutPageOverlay: React.FC<AboutPageOverlayProps> = ({
  isOpen,
  initialTab = 'who-we-are',
  onClose,
  onOpenQuote,
}) => {
  const [activeTab, setActiveTab] = useState<AboutTabType>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className="fixed inset-0 z-[100] bg-[#050505] text-white h-full w-full overflow-y-auto overscroll-contain selection:bg-[#F01B25] selection:text-white flex flex-col justify-between"
        >
          {/* Top Full-Page Architectural Header */}
          <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-2xl border-b border-white/10 py-4 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Back / Brand */}
              <button
                onClick={onClose}
                className="group flex items-center gap-3 text-xs font-mono-tech font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#F01B25] transition-colors">
                  <ArrowLeft className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded-md bg-white shadow-md border border-white/20">
                    <img src="/logo.png" alt="Tech Ener-G Logo" className="h-5 w-auto object-contain" />
                  </div>
                  <span className="hidden sm:inline font-grotesk font-extrabold text-sm uppercase tracking-wider text-white">
                    ABOUT TECH ENER-G TRADING FZE
                  </span>
                </div>
              </button>

              {/* Action & Close */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    onClose();
                    onOpenQuote();
                  }}
                  className="hidden sm:inline-flex px-5 py-2.5 rounded-lg bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 items-center gap-2 shadow-lg shadow-[#F01B25]/25"
                >
                  <span>Request Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#F01B25] text-xs font-mono-tech font-bold text-white transition-colors cursor-pointer"
                  aria-label="Close page"
                >
                  <span>CLOSE PAGE</span>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Main Full-Width Content Viewport */}
          <main className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 space-y-12 flex-1">
            {/* Page Header Title */}
            <div className="space-y-4 border-b border-white/15 pb-8">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F01B25] animate-pulse" />
                <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                  CORPORATE OVERVIEW & PROFILE
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.95]">
                ACCELERATING GROWTH, <br />
                <span className="text-[#F01B25]">TOGETHER.</span>
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-6">
              {[
                { id: 'who-we-are', label: 'Who We Are' },
                { id: 'vision', label: 'Vision, Mission & Values' },
                { id: 'what-we-do', label: 'What We Do' },
                { id: 'certifications', label: 'Organizations & Certifications' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AboutTabType)}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#F01B25] text-white shadow-xl shadow-[#F01B25]/30 scale-105'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SECTION 1: WHO WE ARE */}
            {activeTab === 'who-we-are' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                <div className="space-y-4 max-w-4xl">
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    01 / WHO WE ARE
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-grotesk font-extrabold text-white uppercase tracking-tight">
                    TRUSTED PARTNER IN GLOBAL <br />
                    <span className="text-[#F01B25]">INDUSTRIAL SUPPLY CHAIN SOLUTIONS.</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-6 text-zinc-300 font-outfit text-base sm:text-lg leading-relaxed font-light">
                    <div className="p-8 rounded-3xl bg-[#0F0F0F] border border-white/15 space-y-6 shadow-2xl">
                      <p>
                        Established in 2021, <strong className="text-white font-semibold">Tech Ener-G</strong> is a UAE-based industrial supply and engineering solutions company headquartered in UAE. In a short time, TET has positioned itself as a trusted partner in global industrial supply chain solutions, serving clients across the <strong className="text-white font-semibold">Power Generation, Oil & Gas, Construction, Infrastructure, and Manufacturing</strong> sectors, both within the UAE and in international markets across the MENA region and beyond.
                      </p>
                      <p>
                        Tech Ener-G acts as a unique bridge between end users and leading global manufacturers, combining deep technical expertise with advanced technologies to meet evolving industrial demands. Rather than acting purely as a product supplier, TET positions itself as a <strong className="text-white font-semibold">value-driven engineering partner</strong>, supported by a highly qualified team of engineers and industry professionals with <strong className="text-white font-semibold">more than 200+ people</strong> placing their trust in the organization.
                      </p>
                      <p>
                        The company operates across specialized divisions — <strong className="text-white font-semibold">Mechanical, Instrumentation & Fluid Solutions, Flow Control, Electrical & Instrumentation, and Filtration</strong> — enabling it to serve a wide range of technical and operational requirements under one roof & with the required product proficiency as well partnerships are established with major OEM's to maintain and provide outstanding support continuously.
                      </p>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/15 space-y-3">
                      <Users className="w-6 h-6 text-[#F01B25]" />
                      <div className="text-2xl font-grotesk font-extrabold text-white">200+ Professionals</div>
                      <p className="text-xs font-outfit text-zinc-400">
                        Placing their trust in TET engineering and supply chain solutions.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/15 space-y-3">
                      <Globe2 className="w-6 h-6 text-[#F01B25]" />
                      <div className="text-2xl font-grotesk font-extrabold text-white">UAE & Global Network</div>
                      <p className="text-xs font-outfit text-zinc-400">
                        Serving UAE, MENA region, Africa, Asia, and European industrial sectors.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/15 space-y-3">
                      <ShieldCheck className="w-6 h-6 text-[#F01B25]" />
                      <div className="text-2xl font-grotesk font-extrabold text-white">5 Core Divisions</div>
                      <p className="text-xs font-outfit text-zinc-400">
                        Mechanical, Instrumentation, Flow Control, Electrical, and Filtration.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SECTION 2: VISION, MISSION & VALUES */}
            {activeTab === 'vision' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div className="space-y-3 max-w-4xl">
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    02 / VISION, MISSION & VALUES
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-grotesk font-extrabold text-white uppercase tracking-tight">
                    OUR GUIDING PRINCIPLES & <br />
                    <span className="text-[#F01B25]">CORE VALUES.</span>
                  </h2>
                </div>

                {/* Vision & Mission Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Our Vision */}
                  <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#121212] to-[#F01B25]/15 border border-white/15 space-y-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-[#F01B25] text-white">
                        <Eye className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-grotesk font-extrabold uppercase tracking-tight text-white">
                        OUR VISION
                      </h3>
                    </div>
                    <p className="text-base font-outfit text-zinc-200 leading-relaxed font-light">
                      Tech Ener-G aims to deliver consistent, high-quality products and services that establish the company as a market leader in global industrial sourcing.
                    </p>
                  </div>

                  {/* Our Mission */}
                  <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#121212] to-white/10 border border-white/15 space-y-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-white text-black">
                        <Compass className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-grotesk font-extrabold uppercase tracking-tight text-white">
                        OUR MISSION
                      </h3>
                    </div>
                    <p className="text-base font-outfit text-zinc-200 leading-relaxed font-light">
                      Our journey is directed toward satisfying customers' requirements by serving as a unique bridge between them and leading global manufacturers — offering brand-agnostic, high-quality solutions always centered on the customer's best interest.
                    </p>
                  </div>
                </div>

                {/* Our Values (6 Pillars) */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/15 pb-4">
                    <Award className="w-6 h-6 text-[#F01B25]" />
                    <h3 className="text-2xl font-grotesk font-extrabold text-white uppercase tracking-tight">
                      OUR VALUES
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Value 1 */}
                    <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/15 space-y-3 hover:border-[#F01B25]/60 transition-colors shadow-lg">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <Shield className="w-4 h-4" />
                        <span>Quality First</span>
                      </div>
                      <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                        <em className="text-white font-semibold">“Quality is the best business plan.”</em> Every product and service is held to a consistent standard of excellence.
                      </p>
                    </div>

                    {/* Value 2 */}
                    <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/15 space-y-3 hover:border-[#F01B25]/60 transition-colors shadow-lg">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <Wrench className="w-4 h-4" />
                        <span>Responsiveness & Technical Excellence</span>
                      </div>
                      <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                        Building trust through fast, technically sound support across the MENA region and beyond.
                      </p>
                    </div>

                    {/* Value 3 */}
                    <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/15 space-y-3 hover:border-[#F01B25]/60 transition-colors shadow-lg">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <HeartHandshake className="w-4 h-4" />
                        <span>Trust & Transparency</span>
                      </div>
                      <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                        Relationships with clients and manufacturing partners built on honesty and consistency.
                      </p>
                    </div>

                    {/* Value 4 */}
                    <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/15 space-y-3 hover:border-[#F01B25]/60 transition-colors shadow-lg">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <Globe2 className="w-4 h-4" />
                        <span>Reliability & Long-Term Partnership</span>
                      </div>
                      <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                        A focus on sustainable, long-term collaboration rather than one-off transactions.
                      </p>
                    </div>

                    {/* Value 5 */}
                    <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/15 space-y-3 hover:border-[#F01B25]/60 transition-colors shadow-lg">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <Target className="w-4 h-4" />
                        <span>Customer Commitment</span>
                      </div>
                      <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                        Dedication to reliable delivery and ongoing client success across all operations.
                      </p>
                    </div>

                    {/* Value 6 */}
                    <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/15 space-y-3 hover:border-[#F01B25]/60 transition-colors shadow-lg">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Brand-Agnostic Integrity</span>
                      </div>
                      <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                        Representing multiple global manufacturers while always prioritizing what best serves the customer.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SECTION 3: WHAT WE DO */}
            {activeTab === 'what-we-do' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div className="space-y-3 max-w-4xl">
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    03 / WHAT WE DO
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-grotesk font-extrabold text-white uppercase tracking-tight">
                    VALUE-ADDED ENGINEERING & <br />
                    <span className="text-[#F01B25]">TECHNICAL SERVICES.</span>
                  </h2>
                  <p className="text-base font-outfit text-zinc-300 leading-relaxed font-light">
                    Tech Ener-G goes beyond conventional product supply, offering value-added engineering and technical services that help clients optimize performance, efficiency, and lifecycle value across their operations.
                  </p>
                </div>

                {/* Core Services */}
                <div className="space-y-6">
                  <h3 className="text-xl font-grotesk font-extrabold text-white uppercase tracking-wider">
                    Core Services:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/15 space-y-3 hover:border-[#F01B25]/60 transition-colors shadow-lg">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25]">
                        <Wrench className="w-5 h-5" /> SERVICE 01
                      </div>
                      <h4 className="font-grotesk font-extrabold text-lg text-white uppercase">
                        Engineering Services
                      </h4>
                      <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
                        Tailored technical engineering consulting, component sizing, and customized system design.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/15 space-y-3 hover:border-[#F01B25]/60 transition-colors shadow-lg">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25]">
                        <Cpu className="w-5 h-5" /> SERVICE 02
                      </div>
                      <h4 className="font-grotesk font-extrabold text-lg text-white uppercase">
                        Periodic Maintenance Services
                      </h4>
                      <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
                        Scheduled plant inspections, valve recalibration, and preventive overhaul support.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/15 space-y-3 hover:border-[#F01B25]/60 transition-colors shadow-lg">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25]">
                        <Target className="w-5 h-5" /> SERVICE 03
                      </div>
                      <h4 className="font-grotesk font-extrabold text-lg text-white uppercase">
                        Equipment Performance Analysis
                      </h4>
                      <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
                        Advanced diagnostic evaluations to maximize operational uptime, efficiency, and asset lifecycle.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/15 space-y-3 hover:border-[#F01B25]/60 transition-colors shadow-lg">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25]">
                        <ShieldCheck className="w-5 h-5" /> SERVICE 04
                      </div>
                      <h4 className="font-grotesk font-extrabold text-lg text-white uppercase">
                        Installation & Commissioning Assistance
                      </h4>
                      <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
                        Certified engineering technicians on-site for seamless equipment startup and verification.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/15 space-y-3 hover:border-[#F01B25]/60 transition-colors shadow-lg md:col-span-2 lg:col-span-2">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25]">
                        <Layers className="w-5 h-5" /> SERVICE 05
                      </div>
                      <h4 className="font-grotesk font-extrabold text-lg text-white uppercase">
                        Pilot Product Development through Reverse Engineering
                      </h4>
                      <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
                        Precision component re-engineering, rapid prototyping, and custom component fabrication tailored to legacy machinery.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Global Sourcing & Supply Chain */}
                <div className="p-8 rounded-3xl bg-[#0E0E0E] border border-white/15 space-y-4 shadow-2xl">
                  <h4 className="text-lg font-mono-tech font-bold text-[#F01B25] uppercase tracking-wider flex items-center gap-2">
                    <Globe2 className="w-5 h-5" /> Global Sourcing & Supply Chain
                  </h4>
                  <p className="text-base font-outfit text-zinc-200 leading-relaxed font-light">
                    Leveraging a robust global sourcing network and deep technical knowledge, TET delivers end-to-end supply chain solutions — from strategic procurement and logistics coordination to on-time delivery — tailored to project-specific and operational demands with flexibility, reliability, and precision.
                  </p>
                </div>
              </motion.div>
            )}

            {/* SECTION 4: ORGANIZATIONS & CERTIFICATIONS */}
            {activeTab === 'certifications' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div className="space-y-3 max-w-4xl">
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    04 / ORGANIZATIONS & CERTIFICATIONS
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-grotesk font-extrabold text-white uppercase tracking-tight">
                    OFFICIAL AUTHORISATIONS & <br />
                    <span className="text-[#F01B25]">ISO QUALITY CERTIFICATIONS.</span>
                  </h2>
                </div>

                {/* Certificate Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Autel */}
                  <div className="p-8 rounded-3xl bg-[#0F0F0F] border border-white/15 space-y-6 shadow-2xl flex flex-col justify-between hover:border-[#F01B25]/60 transition-colors">
                    <div className="space-y-4">
                      <div className="h-14 w-full flex items-center justify-start">
                        <img
                          src="/images/AUTEL-LOGO-3-e1679735541237-600x168.png.webp"
                          alt="Autel Authorisation"
                          className="h-12 w-auto object-contain brightness-125"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-grotesk font-extrabold text-white uppercase">
                          Autel Authorisation
                        </h4>
                        <div className="text-xs font-mono-tech text-[#F01B25] font-semibold">
                          OFFICIAL DISTRIBUTOR & PARTNER
                        </div>
                      </div>
                      <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                        Authorized sales, technical support, and component distribution for Autel industrial filtration and valve systems.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-emerald-400 font-bold">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Verified Certificate
                      </span>
                    </div>
                  </div>

                  {/* Redfluid */}
                  <div className="p-8 rounded-3xl bg-[#0F0F0F] border border-white/15 space-y-6 shadow-2xl flex flex-col justify-between hover:border-[#F01B25]/60 transition-colors">
                    <div className="space-y-4">
                      <div className="h-14 w-full flex items-center justify-start">
                        <span className="font-grotesk font-extrabold text-3xl tracking-tighter text-red-600 uppercase">
                          REDFLUID
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-grotesk font-extrabold text-white uppercase">
                          Redfluid Authorisation
                        </h4>
                        <div className="text-xs font-mono-tech text-[#F01B25] font-semibold">
                          AUTHORIZED HIGH-PRESSURE VALVES
                        </div>
                      </div>
                      <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                        Authorized regional supplier for Redfluid needle valves, manifold valves, and high-pressure fluid control systems.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-emerald-400 font-bold">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Verified Certificate
                      </span>
                    </div>
                  </div>

                  {/* ISO 9001 */}
                  <div className="p-8 rounded-3xl bg-[#0F0F0F] border border-white/15 space-y-6 shadow-2xl flex flex-col justify-between hover:border-[#F01B25]/60 transition-colors">
                    <div className="space-y-4">
                      <div className="h-14 w-full flex items-center justify-start">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                          <Award className="w-6 h-6 text-[#F01B25]" />
                          <span className="font-mono-tech font-bold text-sm text-white">ISO 9001:2015</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-grotesk font-extrabold text-white uppercase">
                          ISO 9001 Certification
                        </h4>
                        <div className="text-xs font-mono-tech text-[#F01B25] font-semibold">
                          QUALITY MANAGEMENT SYSTEM
                        </div>
                      </div>
                      <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                        Certified Quality Management System compliance for industrial equipment procurement, engineering services, and supply chain.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-emerald-400 font-bold">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> ISO Certified Standard
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </main>

          {/* Full-Page Bottom Architectural Footer */}
          <footer className="w-full bg-[#0A0A0A] border-t border-white/10 py-6 px-6 md:px-12 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs font-mono-tech text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-[#F01B25]" />
                <span>Tech Ener-G Trading FZE • ISO 9001:2015 Certified Organization</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    onClose();
                    onOpenQuote();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#F01B25]/25 cursor-pointer"
                >
                  <span>Request Quotation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
