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
          className="fixed inset-0 z-[120] w-full h-full bg-[#050505] text-white overflow-y-auto font-outfit"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen relative flex flex-col justify-between py-8 px-6 md:px-12 max-w-7xl mx-auto"
          >
            {/* Header with Back / Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-xl">
                  <img src="/logo.png" alt="Tech Ener-G Logo" className="h-8 w-auto object-contain filter brightness-110" />
                </div>
                <div>
                  <span className="font-grotesk font-bold text-lg text-white uppercase tracking-tight block">
                    TECH ENER-G
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#F01B25] uppercase tracking-widest block">
                    // CONTACT & INQUIRY CENTER
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-3 rounded-full bg-white/10 hover:bg-[#F01B25] text-white transition-all duration-300 group flex items-center gap-2"
                aria-label="Close Contact Page"
              >
                <span className="text-xs font-mono-tech hidden sm:inline-block px-1">CLOSE</span>
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Reach & HQ Info */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F01B25]/10 border border-[#F01B25]/30 text-[#F01B25] font-mono-tech text-xs uppercase font-bold">
                    GET IN TOUCH
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-none">
                    LET'S CONNECT & ENGINEER <span className="text-[#F01B25]">SOLUTIONS.</span>
                  </h1>
                  <p className="text-sm font-outfit text-zinc-300 leading-relaxed font-light">
                    Have an inquiry regarding our 5 core industrial divisions, technical specifications, MTR reports, or custom valve & equipment procurement? Contact our engineering sales team directly.
                  </p>
                </div>

                {/* Direct Action Cards */}
                <div className="space-y-4 pt-2">
                  {/* WhatsApp Direct */}
                  <a
                    href="https://wa.me/971568939519"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-white/5 hover:bg-[#F01B25]/10 border border-white/10 hover:border-[#F01B25]/40 transition-all duration-300 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-xl bg-[#F01B25]/20 text-[#F01B25] group-hover:bg-[#F01B25] group-hover:text-white transition-colors duration-300">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">Instant WhatsApp Sales</div>
                        <div className="text-base font-grotesk font-bold text-white group-hover:text-[#F01B25] transition-colors">+971 56 893 9519</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
                  </a>

                  {/* Direct Phone Call */}
                  <a
                    href="tel:+971568939519"
                    className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-xl bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                        <PhoneCall className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">Direct Telephone Line</div>
                        <div className="text-base font-grotesk font-bold text-white">+971 56 893 9519</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
                  </a>

                  {/* Email Support */}
                  <a
                    href="mailto:sales@techener-g.com"
                    className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-xl bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">Official Email Inquiries</div>
                        <div className="text-base font-grotesk font-bold text-white">sales@techener-g.com</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
                  </a>
                </div>

                {/* HQ Address Box */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#F01B25] font-bold uppercase">
                    <MapPin className="w-4 h-4" /> Global Headquarters & Trade License
                  </div>
                  <div className="text-sm font-outfit text-zinc-200 leading-relaxed font-light">
                    <strong className="text-white font-medium">Tech Ener-G Trading FZE</strong><br />
                    Executive Office-B1-410 (F), Tower B1<br />
                    Ajman Free Zone, Ajman, United Arab Emirates
                  </div>
                </div>
              </div>

              {/* Right Column: Contact & Inquiry Form */}
              <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-xl">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center space-y-6 flex flex-col items-center justify-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#F01B25]/20 text-[#F01B25] border border-[#F01B25]/40 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-grotesk font-bold text-white uppercase tracking-tight">
                      INQUIRY RECEIVED
                    </h3>
                    <p className="text-sm text-zinc-300 font-outfit max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Tech Ener-G. Our engineering sales division will review your requirements and respond within 2-4 business hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h2 className="text-xl font-grotesk font-bold text-white uppercase tracking-wider">
                        Send An Inquiry
                      </h2>
                      <span className="text-xs font-mono-tech text-zinc-400">
                        * All fields required
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-mono-tech text-zinc-300 uppercase tracking-wider block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Alexander Vance"
                          className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 font-outfit text-sm focus:outline-none focus:border-[#F01B25] transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono-tech text-zinc-300 uppercase tracking-wider block">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. alexander@company.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 font-outfit text-sm focus:outline-none focus:border-[#F01B25] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-mono-tech text-zinc-300 uppercase tracking-wider block">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +971 50 123 4567"
                          className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 font-outfit text-sm focus:outline-none focus:border-[#F01B25] transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono-tech text-zinc-300 uppercase tracking-wider block">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. ADNOC / General Electric"
                          className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 font-outfit text-sm focus:outline-none focus:border-[#F01B25] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono-tech text-zinc-300 uppercase tracking-wider block">
                        Division of Interest *
                      </label>
                      <select
                        value={formData.division}
                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white font-outfit text-sm focus:outline-none focus:border-[#F01B25] transition-colors"
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
                      <label className="text-xs font-mono-tech text-zinc-300 uppercase tracking-wider block">
                        Project Message / Specifications *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your equipment sizes, pressure ratings, materials, or delivery timelines..."
                        className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 font-outfit text-sm focus:outline-none focus:border-[#F01B25] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-xl shadow-[#F01B25]/20 flex items-center justify-center gap-2.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT INQUIRY</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Footer Notice */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-zinc-400">
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
