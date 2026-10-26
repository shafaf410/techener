import React from 'react';
import { ArrowUpRight, ArrowLeft, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { AboutConfig } from '../../types/about';

interface AboutFooterSectionProps {
  config: AboutConfig;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const AboutFooterSection: React.FC<AboutFooterSectionProps> = ({
  config,
  onClose,
  onOpenQuote,
}) => {
  const { brand, footer } = config;

  return (
    <footer className="w-full bg-white text-zinc-900 border-t border-zinc-200 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top CTA Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-200 pb-10">
          <div className="space-y-2">
            <h4 className="text-2xl sm:text-3xl font-grotesk font-extrabold uppercase tracking-tight text-zinc-950">
              Ready to engineer your next solution?
            </h4>
            <p className="text-sm font-outfit text-zinc-600 max-w-xl">
              Connect with our technical engineering specialists for tailored procurement, valve automation, and supply chain assistance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Main Site</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="px-6 py-3 rounded-full bg-[#F01B25] hover:bg-zinc-950 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#F01B25]/25 cursor-pointer"
            >
              <span>Request RFQ Quotation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Corporate Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs font-outfit text-zinc-600">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={brand.logoUrl} alt={brand.name} className="h-7 w-auto object-contain" />
              <div className="font-grotesk font-extrabold text-base tracking-tight text-zinc-950 uppercase">
                {brand.name}
              </div>
            </div>
            <p className="text-zinc-500 leading-relaxed font-normal">
              {brand.tagline}
            </p>
            <div className="flex items-center gap-2 text-emerald-600 font-mono-tech font-bold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>{footer.isoText}</span>
            </div>
          </div>

          {/* Col 2: Headquarters */}
          <div className="space-y-3">
            <div className="font-grotesk font-extrabold text-sm uppercase tracking-wider text-zinc-950">
              Headquarters
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#F01B25] flex-shrink-0 mt-0.5" />
              <span>{footer.headquarters}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#F01B25] flex-shrink-0" />
              <span>{footer.contactEmail}</span>
            </div>
          </div>

          {/* Col 3: Regional Presence */}
          <div className="space-y-3">
            <div className="font-grotesk font-extrabold text-sm uppercase tracking-wider text-zinc-950">
              Regional Operations
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-tech">
              {footer.regionalPresence.map((country, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-zinc-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25]" />
                  <span>{country}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Sourcing Focus */}
          <div className="space-y-3">
            <div className="font-grotesk font-extrabold text-sm uppercase tracking-wider text-zinc-950">
              Specialized Divisions
            </div>
            <ul className="space-y-1.5 text-zinc-600 text-xs">
              <li>• Flow Control & Industrial Valves</li>
              <li>• Piping, Tubing & Forged Fittings</li>
              <li>• Instrumentation & Fluid Automation</li>
              <li>• Industrial Filtration Systems</li>
              <li>• Reverse Engineering & Prototyping</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-tech text-zinc-500">
          <div>{footer.copyrightText}</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-zinc-900 cursor-pointer">Quality Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-900 cursor-pointer">ISO Compliance</span>
            <span>•</span>
            <span className="hover:text-zinc-900 cursor-pointer">OEM Distributorships</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
