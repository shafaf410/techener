import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, PhoneCall, MapPin, Send, MessageSquare, CheckCircle2, ShieldCheck, Globe, Building2, ChevronRight } from 'lucide-react';

interface ContactPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDivision?: string;
}

export const ContactPageModal: React.FC<ContactPageModalProps> = ({
  isOpen,
  onClose,
  defaultDivision = 'Mechanical Division',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    division: defaultDivision,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100] w-full h-full bg-white text-zinc-900 overflow-y-auto font-outfit selection:bg-[#F01B25] selection:text-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen relative flex flex-col justify-between pt-28 sm:pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse" />
                <span className="font-mono-tech text-xs text-[#F01B25] uppercase tracking-widest block font-bold">
                  // CONTACT & INQUIRY CENTER
                </span>
              </div>

              <button
                onClick={onClose}
                className="px-3.5 py-1 rounded-full bg-zinc-100 hover:bg-[#F01B25] text-zinc-700 hover:text-white border border-zinc-200 transition-all text-xs font-mono-tech uppercase font-bold flex items-center gap-1.5 cursor-pointer"
                aria-label="Close Contact Page"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Reach & HQ Info */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F01B25]/10 border border-[#F01B25]/20 text-[#F01B25] font-mono-tech text-xs uppercase font-bold">
                    GET IN TOUCH
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-grotesk font-extrabold text-zinc-950 uppercase tracking-tight leading-none">
                    LET'S CONNECT & ENGINEER <span className="text-[#F01B25]">SOLUTIONS.</span>
                  </h1>
                  <p className="text-sm font-outfit text-zinc-600 leading-relaxed font-normal">
                    Have an inquiry regarding our 5 core industrial divisions, technical specifications, MTR reports, or custom valve & equipment procurement? Contact our engineering sales team directly.
                  </p>
                </div>

                {/* Direct Action Cards */}
                <div className="space-y-4 pt-2">
                  {/* WhatsApp Direct */}
                  <a
                    href="https://wa.me/971502737026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-[#25D366]/60 transition-all duration-300 flex items-center justify-between group shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-xl bg-[#25D366]/15 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.83.493 3.555 1.353 5.048L2 22l5.056-1.325a9.98 9.98 0 004.975 1.356c5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2zm0 18.281a8.23 8.23 0 01-4.204-1.15l-.302-.18-3.125.82.834-3.045-.197-.314A8.204 8.204 0 013.78 12.03c0-4.55 3.7-8.25 8.25-8.25s8.25 3.7 8.25 8.25-3.7 8.251-8.25 8.251zm4.52-6.183c-.247-.124-1.464-.723-1.691-.806-.228-.082-.394-.124-.56.124-.165.248-.642.806-.787.971-.144.165-.289.186-.537.062-.248-.124-1.047-.386-1.995-1.231-.738-.658-1.237-1.472-1.381-1.72-.145-.248-.016-.381.108-.504.112-.11.248-.289.372-.434.124-.145.165-.248.248-.413.082-.165.041-.31-.021-.434-.062-.124-.56-1.35-.766-1.849-.202-.486-.407-.42-.56-.428-.144-.008-.31-.01-.475-.01-.166 0-.435.062-.663.31-.227.248-.868.848-.868 2.068s.889 2.399 1.013 2.564c.124.165 1.75 2.672 4.24 3.746.592.256 1.054.409 1.415.524.595.19 1.137.163 1.565.099.477-.072 1.464-.599 1.67-1.178.207-.579.207-1.074.145-1.178-.062-.104-.228-.166-.475-.29z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider">Direct / WhatsApp</div>
                        <div className="text-base font-grotesk font-bold text-zinc-950 group-hover:text-[#25D366] transition-colors">+971 50 273 7026</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-[#25D366] transition-transform group-hover:translate-x-1" />
                  </a>

                  {/* Direct Phone Call (Landline) */}
                  <a
                    href="tel:+97143238773"
                    className="p-5 rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-[#F01B25]/40 transition-all duration-300 flex items-center justify-between group shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-xl bg-zinc-200 text-zinc-800 group-hover:bg-[#F01B25] group-hover:text-white transition-colors duration-300">
                        <PhoneCall className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider">Our Landline</div>
                        <div className="text-base font-grotesk font-bold text-zinc-950 group-hover:text-[#F01B25] transition-colors">+971 4 323 8773</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-[#F01B25] transition-transform group-hover:translate-x-1" />
                  </a>

                  {/* Email Support */}
                  <a
                    href="mailto:sales.support@techener-g.com"
                    className="p-5 rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-[#F01B25]/40 transition-all duration-300 flex items-center justify-between group shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-xl bg-zinc-200 text-zinc-800 group-hover:bg-[#F01B25] group-hover:text-white transition-colors duration-300">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider">Official Email Inquiries</div>
                        <div className="text-base font-grotesk font-bold text-zinc-950 group-hover:text-[#F01B25] transition-colors">sales.support@techener-g.com</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-[#F01B25] transition-transform group-hover:translate-x-1" />
                  </a>
                </div>

                {/* HQ Address Box */}
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#F01B25] font-bold uppercase">
                    <MapPin className="w-4 h-4" /> Global Headquarters & Trade License
                  </div>
                  <div className="text-sm font-outfit text-zinc-700 leading-relaxed font-normal">
                    <strong className="text-zinc-950 font-semibold">Tech Ener-G Trading FZE</strong><br />
                    Executive Office-B1-410 (F), Tower B1<br />
                    Ajman Free Zone, Ajman, United Arab Emirates
                  </div>
                </div>
              </div>

              {/* Right Column: Contact & Inquiry Form */}
              <div className="lg:col-span-7 bg-zinc-50/80 border border-zinc-200 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-lg backdrop-blur-xl">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center space-y-6 flex flex-col items-center justify-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#F01B25]/10 text-[#F01B25] border border-[#F01B25]/30 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-grotesk font-bold text-zinc-950 uppercase tracking-tight">
                      INQUIRY RECEIVED
                    </h3>
                    <p className="text-sm text-zinc-600 font-outfit max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Tech Ener-G. Our engineering sales division will review your requirements and respond within 2-4 business hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                      <h2 className="text-xl font-grotesk font-bold text-zinc-950 uppercase tracking-wider">
                        Send An Inquiry
                      </h2>
                      <span className="text-xs font-mono-tech text-zinc-500">
                        * All fields required
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-mono-tech text-zinc-700 uppercase tracking-wider block font-semibold">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Alexander Vance"
                          className="w-full px-4 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 font-outfit text-sm focus:outline-none focus:border-[#F01B25] focus:ring-1 focus:ring-[#F01B25] transition-colors shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono-tech text-zinc-700 uppercase tracking-wider block font-semibold">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. alexander@company.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 font-outfit text-sm focus:outline-none focus:border-[#F01B25] focus:ring-1 focus:ring-[#F01B25] transition-colors shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-mono-tech text-zinc-700 uppercase tracking-wider block font-semibold">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +971 50 123 4567"
                          className="w-full px-4 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 font-outfit text-sm focus:outline-none focus:border-[#F01B25] focus:ring-1 focus:ring-[#F01B25] transition-colors shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono-tech text-zinc-700 uppercase tracking-wider block font-semibold">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. ADNOC / General Electric"
                          className="w-full px-4 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 font-outfit text-sm focus:outline-none focus:border-[#F01B25] focus:ring-1 focus:ring-[#F01B25] transition-colors shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono-tech text-zinc-700 uppercase tracking-wider block font-semibold">
                        Division of Interest *
                      </label>
                      <select
                        value={formData.division}
                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 font-outfit text-sm focus:outline-none focus:border-[#F01B25] focus:ring-1 focus:ring-[#F01B25] transition-colors shadow-sm"
                      >
                        <option value="Mechanical Division">1. Mechanical Division (Pumps, Compressors, Pipes, Flanges, Fittings, Heavy Valves)</option>
                        <option value="Instrumentation & Fluid Solutions">2. Instrumentation & Fluid Solutions (Valves, Tubing, Manifolds, Transmitters)</option>
                        <option value="Flow Control Division">3. Flow Control Division (Solenoid, Regulators, Positioners, Control Valves)</option>
                        <option value="Electrical & Instrumentation Division">4. Electrical & Instrumentation Division (Panels, Transmitters, Calibration)</option>
                        <option value="Filtration Division">5. Filtration Division (Strainers, Gas Scrubbers, Coalescers, Cartridges)</option>
                        <option value="General Inquiry">General Procurement Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono-tech text-zinc-700 uppercase tracking-wider block font-semibold">
                        Project Message / Specifications *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your equipment sizes, pressure ratings, materials, or delivery timelines..."
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 font-outfit text-sm focus:outline-none focus:border-[#F01B25] focus:ring-1 focus:ring-[#F01B25] transition-colors resize-none shadow-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#F01B25] hover:bg-zinc-950 font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-xl shadow-[#F01B25]/20 flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT INQUIRY</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Footer Notice */}
            <div className="border-t border-zinc-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-zinc-500">
              <div>© 2026 Tech Ener-G Trading FZE. All rights reserved.</div>
              <div className="flex items-center gap-6">
                <span>ISO 9001:2015 CERTIFIED</span>
                <span>API 600 / 6D COMPLIANT</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
