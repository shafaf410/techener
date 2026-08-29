import React from 'react';
import { Mail, PhoneCall, MapPin, ArrowUpRight, MessageSquare, ShieldCheck, Globe } from 'lucide-react';
import { StaggeredText } from './StaggeredText';

interface ContactSectionProps {
  onOpenQuote: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenQuote }) => {
  return (
    <footer id="contact" className="relative bg-[#050505] text-white border-t border-white/10 pt-20 pb-10 overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F01B25]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
        {/* Massive Editorial Final Call to Action */}
        <div className="space-y-6 max-w-5xl border-b border-white/10 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F01B25]/10 border border-[#F01B25]/30 text-[#F01B25] font-mono-tech text-xs uppercase font-bold">
            08 / INITIATE ENGAGEMENT
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-[0.95]">
            <StaggeredText text="ENGINEER WHAT'S NEXT." staggerDelay={0.08} />
          </h2>

          <p className="text-base text-zinc-300 max-w-2xl font-outfit font-light leading-relaxed">
            Partner with Tech Ener-G Trading FZE. Discover how our commitment to technical excellence and global manufacturer bridges can optimize your energy and industrial supply chain.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenQuote}
              className="px-8 py-3.5 rounded-lg bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 red-glow shadow-xl shadow-[#F01B25]/30 flex items-center gap-2.5"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/971568939519"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/15 text-white font-mono-tech text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#F01B25]" />
              <span>Direct WhatsApp Sales</span>
            </a>
          </div>
        </div>

        {/* Multi-Column Architectural Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/10 pb-16">
          {/* Column 1: Company Profile & HQ Address */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-white shadow-md">
                <img src="/logo.png" alt="Tech Ener-G Logo" className="h-7 w-auto object-contain" />
              </div>
              <span className="font-grotesk font-bold text-lg text-white uppercase tracking-tight">
                TECH ENER-G
              </span>
            </div>

            <p className="text-xs font-outfit text-zinc-400 leading-relaxed font-light">
              Bridging premier global valve & equipment manufacturers with energy, utility, and heavy process operators across MENA and worldwide.
            </p>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <div className="text-[11px] font-mono-tech text-[#F01B25] font-bold uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> GLOBAL HEADQUARTERS
              </div>
              <p className="text-xs font-outfit text-zinc-300 leading-relaxed">
                Tech Ener-G Trading FZE<br />
                Executive Office-B1-410 (F), Tower B1<br />
                Ajman Free Zone, Ajman, United Arab Emirates
              </p>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech text-zinc-400">
              <li>
                <a href="#" className="hover:text-[#F01B25] transition-colors flex items-center gap-1">
                  // HOME
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#F01B25] transition-colors flex items-center gap-1">
                  // ABOUT US
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#F01B25] transition-colors flex items-center gap-1">
                  // PRODUCTS
                </a>
              </li>
              <li>
                <a href="#valves" className="hover:text-[#F01B25] transition-colors flex items-center gap-1">
                  // VALVES MATRIX
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-[#F01B25] transition-colors flex items-center gap-1">
                  // SECTORS
                </a>
              </li>
              <li>
                <a href="#quality" className="hover:text-[#F01B25] transition-colors flex items-center gap-1">
                  // QUALITY INDEX
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Product Catalog */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
              PRODUCT SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-xs font-outfit text-zinc-400">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Pipes, Fittings & Flanges
                </a>
              </li>
              <li>
                <a href="#valves" className="hover:text-white transition-colors">
                  API 600 / 6D Cast Steel Valves
                </a>
              </li>
              <li>
                <a href="#valves" className="hover:text-white transition-colors">
                  API 602 Forged Valves
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Industrial Synthetic Lubricants
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Power Generation Boiler Tubing
                </a>
              </li>
              <li>
                <a href="#valves" className="hover:text-white transition-colors">
                  Pipeline Filters & Strainers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Inquiries & Helpline */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
              COMMERCIAL INQUIRIES
            </h4>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono-tech text-zinc-500 uppercase">Sales & Pricing Email:</div>
                <a
                  href="mailto:sales@techener-g.com"
                  className="text-sm font-mono-tech font-bold text-white hover:text-[#F01B25] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#F01B25]" /> sales@techener-g.com
                </a>
              </div>

              <div>
                <div className="text-[10px] font-mono-tech text-zinc-500 uppercase">24/7 Technical Hotline:</div>
                <a
                  href="tel:+971568939519"
                  className="text-sm font-mono-tech font-bold text-white hover:text-[#F01B25] transition-colors flex items-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#F01B25]" /> +971 56 893 9519
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/971568939519"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded bg-white/5 hover:bg-[#F01B25] text-zinc-300 hover:text-white border border-white/10 font-mono-tech text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between group"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F01B25] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-zinc-500 pt-2">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} TECH ENER-G TRADING FZE. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SUPPLY</a>
            <a href="#quality" className="hover:text-white transition-colors">EN-ISO 10204 3.1</a>
            <span className="text-[#F01B25]">// API 6D CERTIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
