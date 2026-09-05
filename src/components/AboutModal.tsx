import React, { useState } from 'react';
import { X, ArrowUpRight, ShieldCheck, Globe2, Cpu, Wrench, Target, Compass, Award, CheckCircle2, FileText, Layers, Factory, Users, HeartHandshake, Eye, Shield } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onOpenQuote }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vision' | 'services' | 'certificates'>('overview');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl rounded-3xl bg-[#0A0A0A] border border-white/15 p-5 sm:p-8 md:p-12 shadow-2xl space-y-8 max-h-[92vh] overflow-y-auto z-10 red-border-glow text-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#F01B25] transition-colors focus:outline-none z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Tag with Logo */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 rounded-md bg-white shadow-md border border-white/20">
                  <img src="/logo.png" alt="Tech Ener-G Logo" className="h-5 w-auto object-contain" />
                </div>
                <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                  ABOUT TECH ENER-G TRADING FZE
                </span>
              </div>
              <span className="text-xs font-mono-tech text-zinc-400">ESTABLISHED 2021 | UAE & GLOBAL</span>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
              {[
                { id: 'overview', label: '01 / Who Are We?' },
                { id: 'vision', label: '02 / Vision, Mission & Values' },
                { id: 'services', label: '03 / What We Do & Services' },
                { id: 'certificates', label: '04 / Partnerships & Certificates' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#F01B25] text-white shadow-lg shadow-[#F01B25]/30'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT 01: WHO ARE WE */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    WHO ARE WE?
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.95]">
                    TRUSTED PARTNER IN GLOBAL <br />
                    <span className="text-[#F01B25]">INDUSTRIAL SUPPLY CHAIN.</span>
                  </h2>
                </div>

                <div className="space-y-6 text-zinc-300 font-outfit text-sm sm:text-base leading-relaxed font-light">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
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

                {/* Glass Metric Pills */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#F01B25] shrink-0" />
                    <div>
                      <div className="text-sm font-grotesk font-bold text-white uppercase">200+</div>
                      <div className="text-[10px] font-outfit text-zinc-400">People Trusting TET</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3">
                    <Globe2 className="w-5 h-5 text-[#F01B25] shrink-0" />
                    <div>
                      <div className="text-sm font-grotesk font-bold text-white uppercase">UAE & Global</div>
                      <div className="text-[10px] font-outfit text-zinc-400">MENA Supply Network</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-[#F01B25] shrink-0" />
                    <div>
                      <div className="text-sm font-grotesk font-bold text-white uppercase">5 Divisions</div>
                      <div className="text-[10px] font-outfit text-zinc-400">Under One Roof</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#F01B25] shrink-0" />
                    <div>
                      <div className="text-sm font-grotesk font-bold text-white uppercase">OEM Partners</div>
                      <div className="text-[10px] font-outfit text-zinc-400">Continuous Support</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT 02: VISION, MISSION & VALUES */}
            {activeTab === 'vision' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Vision & Mission Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Our Vision */}
                  <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-[#F01B25]/10 border border-white/15 space-y-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#F01B25] text-white">
                        <Eye className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-grotesk font-extrabold uppercase tracking-tight text-white">
                        OUR VISION
                      </h3>
                    </div>
                    <p className="text-sm font-outfit text-zinc-200 leading-relaxed font-light">
                      Tech Ener-G aims to deliver consistent, high-quality products and services that establish the company as a market leader in global industrial sourcing.
                    </p>
                  </div>

                  {/* Our Mission */}
                  <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/15 space-y-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white text-black">
                        <Compass className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-grotesk font-extrabold uppercase tracking-tight text-white">
                        OUR MISSION
                      </h3>
                    </div>
                    <p className="text-sm font-outfit text-zinc-200 leading-relaxed font-light">
                      Our journey is directed toward satisfying customers' requirements by serving as a unique bridge between them and leading global manufacturers — offering brand-agnostic, high-quality solutions always centered on the customer's best interest.
                    </p>
                  </div>
                </div>

                {/* Our Values */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#F01B25]" />
                    <h3 className="text-xl font-grotesk font-extrabold text-white uppercase tracking-tight">
                      OUR VALUES
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Value 1 */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-[#F01B25]/50 transition-colors">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <Shield className="w-4 h-4" />
                        <span>Quality First</span>
                      </div>
                      <p className="text-xs font-outfit text-zinc-300 leading-relaxed font-light">
                        <em className="text-white font-semibold">“Quality is the best business plan.”</em> Every product and service is held to a consistent standard of excellence.
                      </p>
                    </div>

                    {/* Value 2 */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-[#F01B25]/50 transition-colors">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <Wrench className="w-4 h-4" />
                        <span>Responsiveness & Technical Excellence</span>
                      </div>
                      <p className="text-xs font-outfit text-zinc-300 leading-relaxed font-light">
                        Building trust through fast, technically sound support across the MENA region and beyond.
                      </p>
                    </div>

                    {/* Value 3 */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-[#F01B25]/50 transition-colors">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <HeartHandshake className="w-4 h-4" />
                        <span>Trust & Transparency</span>
                      </div>
                      <p className="text-xs font-outfit text-zinc-300 leading-relaxed font-light">
                        Relationships with clients and manufacturing partners built on honesty and consistency.
                      </p>
                    </div>

                    {/* Value 4 */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-[#F01B25]/50 transition-colors">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <Globe2 className="w-4 h-4" />
                        <span>Reliability & Long-Term Partnership</span>
                      </div>
                      <p className="text-xs font-outfit text-zinc-300 leading-relaxed font-light">
                        A focus on sustainable, long-term collaboration rather than one-off transactions.
                      </p>
                    </div>

                    {/* Value 5 */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-[#F01B25]/50 transition-colors">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <Target className="w-4 h-4" />
                        <span>Customer Commitment</span>
                      </div>
                      <p className="text-xs font-outfit text-zinc-300 leading-relaxed font-light">
                        Dedication to reliable delivery and ongoing client success across all critical operations.
                      </p>
                    </div>

                    {/* Value 6 */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-[#F01B25]/50 transition-colors">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25] uppercase">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Brand-Agnostic Integrity</span>
                      </div>
                      <p className="text-xs font-outfit text-zinc-300 leading-relaxed font-light">
                        Representing multiple global manufacturers while always prioritizing what best serves the customer.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT 03: WHAT WE DO & SERVICES */}
            {activeTab === 'services' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    WHAT WE DO?
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-grotesk font-extrabold text-white uppercase tracking-tight">
                    VALUE-ADDED ENGINEERING & <br />
                    <span className="text-[#F01B25]">TECHNICAL SERVICES.</span>
                  </h2>
                  <p className="text-sm font-outfit text-zinc-300 max-w-3xl leading-relaxed font-light">
                    Tech Ener-G goes beyond conventional product supply, offering value-added engineering and technical services that help clients optimize performance, efficiency, and lifecycle value across their operations.
                  </p>
                </div>

                {/* Core Services Grid */}
                <div className="space-y-4">
                  <h3 className="text-lg font-grotesk font-bold text-white uppercase tracking-wider">
                    Core Services:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-[#F01B25]/50 transition-colors">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25]">
                        <Wrench className="w-4 h-4" /> 01
                      </div>
                      <h4 className="font-grotesk font-extrabold text-base text-white uppercase">
                        Engineering Services
                      </h4>
                      <p className="text-xs font-outfit text-zinc-400">
                        Tailored technical engineering consulting & application design.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-[#F01B25]/50 transition-colors">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25]">
                        <Cpu className="w-4 h-4" /> 02
                      </div>
                      <h4 className="font-grotesk font-extrabold text-base text-white uppercase">
                        Periodic Maintenance Services
                      </h4>
                      <p className="text-xs font-outfit text-zinc-400">
                        Scheduled inspections, recalibration, and preventive overhaul support.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-[#F01B25]/50 transition-colors">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25]">
                        <Target className="w-4 h-4" /> 03
                      </div>
                      <h4 className="font-grotesk font-extrabold text-base text-white uppercase">
                        Equipment Performance Analysis
                      </h4>
                      <p className="text-xs font-outfit text-zinc-400">
                        Diagnostic evaluations to maximize plant operational lifecycle and efficiency.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-[#F01B25]/50 transition-colors">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25]">
                        <ShieldCheck className="w-4 h-4" /> 04
                      </div>
                      <h4 className="font-grotesk font-extrabold text-base text-white uppercase">
                        Installation & Commissioning Assistance
                      </h4>
                      <p className="text-xs font-outfit text-zinc-400">
                        On-site engineering technicians for seamless startup and testing.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-[#F01B25]/50 transition-colors md:col-span-2 lg:col-span-2">
                      <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#F01B25]">
                        <Layers className="w-4 h-4" /> 05
                      </div>
                      <h4 className="font-grotesk font-extrabold text-base text-white uppercase">
                        Pilot Product Development through Reverse Engineering
                      </h4>
                      <p className="text-xs font-outfit text-zinc-400">
                        Precision component re-engineering, prototyping, and customized fabrication solutions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Global Sourcing & Divisions Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                    <h4 className="text-sm font-mono-tech font-bold text-[#F01B25] uppercase tracking-wider flex items-center gap-2">
                      <Globe2 className="w-4 h-4" /> Global Sourcing & Supply Chain
                    </h4>
                    <p className="text-xs font-outfit text-zinc-300 leading-relaxed font-light">
                      Leveraging a robust global sourcing network and deep technical knowledge, TET delivers end-to-end supply chain solutions — from strategic procurement and logistics coordination to on-time delivery — tailored to project-specific and operational demands with flexibility, reliability, and precision.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                    <h4 className="text-sm font-mono-tech font-bold text-[#F01B25] uppercase tracking-wider flex items-center gap-2">
                      <Factory className="w-4 h-4" /> 5 Core Divisions & Industries
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech text-zinc-300">
                      <div>
                        <div className="font-bold text-white mb-1">Divisions:</div>
                        <ul className="space-y-1 text-[11px] text-zinc-400">
                          <li>• Mechanical</li>
                          <li>• Instrumentation</li>
                          <li>• Flow Control</li>
                          <li>• Electrical</li>
                          <li>• Filtration</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-bold text-white mb-1">Industries:</div>
                        <ul className="space-y-1 text-[11px] text-zinc-400">
                          <li>• Oil & Gas</li>
                          <li>• Power Generation</li>
                          <li>• Construction</li>
                          <li>• Manufacturing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT 04: PARTNERSHIPS & CERTIFICATES */}
            {activeTab === 'certificates' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    PARTNERSHIPS & CERTIFICATES
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-grotesk font-extrabold text-white uppercase tracking-tight">
                    OFFICIAL AUTHORISATIONS & <br />
                    <span className="text-[#F01B25]">ISO QUALITY CERTIFICATIONS.</span>
                  </h2>
                </div>

                {/* Certificate Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Autel Authorisation */}
                  <div className="p-6 rounded-2xl bg-[#121212] border border-white/15 space-y-4 shadow-xl flex flex-col justify-between hover:border-[#F01B25]/50 transition-colors">
                    <div className="space-y-3">
                      <div className="h-12 w-full flex items-center justify-start">
                        <img
                          src="/images/AUTEL-LOGO-3-e1679735541237-600x168.png.webp"
                          alt="Autel Authorisation"
                          className="h-10 w-auto object-contain brightness-125"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-grotesk font-extrabold text-white uppercase">
                          Autel Authorisation
                        </h4>
                        <div className="text-xs font-mono-tech text-[#F01B25] font-semibold">
                          OFFICIAL DISTRIBUTOR & PARTNER
                        </div>
                      </div>
                      <p className="text-xs font-outfit text-zinc-300 leading-relaxed font-light">
                        Authorized sales, technical support, and component distribution for Autel industrial filtration and valve systems.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-zinc-300">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> Verified Authorisation
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Redfluid Authorisation */}
                  <div className="p-6 rounded-2xl bg-[#121212] border border-white/15 space-y-4 shadow-xl flex flex-col justify-between hover:border-[#F01B25]/50 transition-colors">
                    <div className="space-y-3">
                      <div className="h-12 w-full flex items-center justify-start">
                        <span className="font-grotesk font-extrabold text-2xl tracking-tighter text-red-600 uppercase">
                          REDFLUID
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-grotesk font-extrabold text-white uppercase">
                          Redfluid Authorisation
                        </h4>
                        <div className="text-xs font-mono-tech text-[#F01B25] font-semibold">
                          AUTHORIZED HIGH-PRESSURE VALVES
                        </div>
                      </div>
                      <p className="text-xs font-outfit text-zinc-300 leading-relaxed font-light">
                        Authorized regional supplier for Redfluid needle valves, manifold valves, and high-pressure fluid control systems.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-zinc-300">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> Verified Authorisation
                      </span>
                    </div>
                  </div>

                  {/* Card 3: ISO 9001 Certificate */}
                  <div className="p-6 rounded-2xl bg-[#121212] border border-white/15 space-y-4 shadow-xl flex flex-col justify-between hover:border-[#F01B25]/50 transition-colors">
                    <div className="space-y-3">
                      <div className="h-12 w-full flex items-center justify-start">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20">
                          <Award className="w-5 h-5 text-[#F01B25]" />
                          <span className="font-mono-tech font-bold text-xs text-white">ISO 9001:2015</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-grotesk font-extrabold text-white uppercase">
                          ISO 9001 Certification
                        </h4>
                        <div className="text-xs font-mono-tech text-[#F01B25] font-semibold">
                          QUALITY MANAGEMENT SYSTEM
                        </div>
                      </div>
                      <p className="text-xs font-outfit text-zinc-300 leading-relaxed font-light">
                        Certified Quality Management System compliance for industrial equipment procurement, engineering services, and supply chain.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-zinc-300">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> ISO Certified Standard
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15">
              <div className="text-xs font-mono-tech text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F01B25]" />
                <span>Ready to initiate procurement or partner with Tech Ener-G?</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="px-7 py-3.5 rounded-xl bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 flex items-center gap-2 shadow-xl shadow-[#F01B25]/30 cursor-pointer"
              >
                <span>Request Quotation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
