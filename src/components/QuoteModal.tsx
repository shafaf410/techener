import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductTitle?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, initialProductTitle }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Oil & Gas',
    productCategory: initialProductTitle || 'Industrial Valves',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl p-8 rounded-2xl bg-[#0A0A0A] border border-white/15 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F01B25]/10 border border-[#F01B25] text-[#F01B25] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-grotesk font-extrabold text-white uppercase">
              QUOTE REQUEST SUBMITTED
            </h3>
            <p className="text-sm font-outfit text-zinc-300 max-w-md mx-auto leading-relaxed">
              Thank you. A Tech Ener-G technical sales engineer will review your specifications and contact you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="text-xs font-mono-tech text-[#F01B25] font-bold uppercase">
                // OFFICIAL RFQ PORTAL
              </div>
              <h3 className="text-2xl font-grotesk font-extrabold text-white uppercase">
                REQUEST AN INDUSTRIAL QUOTE
              </h3>
              <p className="text-xs font-outfit text-zinc-400">
                Provide your project specifications or required valve / piping bill of materials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-outfit text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono-tech uppercase">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Alexander Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F01B25]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono-tech uppercase">Company Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Gulf Energy Petroleum"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F01B25]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono-tech uppercase">Business Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="sales@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F01B25]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono-tech uppercase">Phone / WhatsApp *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+971 50 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F01B25]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono-tech uppercase">Industry Sector</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#F01B25]"
                  >
                    <option value="Oil & Gas">Oil & Gas (Upstream / Midstream)</option>
                    <option value="Power Generation">Power Generation & Utilities</option>
                    <option value="Construction">Civil Infrastructure & Construction</option>
                    <option value="Manufacturing">Heavy Manufacturing</option>
                    <option value="Other">Other Industrial Sector</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono-tech uppercase">Product Category</label>
                  <input
                    type="text"
                    value={formData.productCategory}
                    onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-[#F01B25]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-mono-tech uppercase">Specifications / RFQ Details</label>
                <textarea
                  rows={3}
                  placeholder="Specify sizes, pressure ratings, materials, standards (e.g. API 6D, ASME B16.34) or quantities..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F01B25]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-xl shadow-[#F01B25]/30 flex items-center justify-center gap-2"
              >
                Submit RFQ to Tech Ener-G
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
