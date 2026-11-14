import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, Wrench, FileText, MessageSquare, Download, Layers } from 'lucide-react';
import { MechanicalProduct } from '../../data/mechanicalDivisionData';

interface ProductDetailModalProps {
  product: MechanicalProduct | null;
  onClose: () => void;
  onOpenQuote: (productTitle?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenQuote,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const categoryName = product.category === 'pumps' ? 'Pumps' : product.category === 'compressors' ? 'Compressors' : 'Heat Exchangers';
  const whatsappUrl = `https://wa.me/971502737026?text=${encodeURIComponent(`Hello Tech Ener-G team, I would like to inquire about specifications and quotation for: ${product.title} (${categoryName} Division).`)}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-xl flex justify-center items-center p-3 sm:p-6 md:p-10 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0A0A0A] text-white border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 space-y-10 custom-scrollbar selection:bg-[#F01B25] selection:text-white"
        >
          {/* Top Navigation Strip */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 gap-4">
            <button
              onClick={onClose}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-[#F01B25] border border-white/10 hover:border-[#F01B25] text-xs font-mono-tech font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to {categoryName}</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono-tech text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
                MECHANICAL DIVISION // {categoryName.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F01B25]/20 border border-[#F01B25]/40 text-[#F01B25] text-[10px] font-mono-tech font-bold uppercase tracking-wider">
                CERTIFIED SPECIFICATION
              </span>
            </div>
          </div>

          {/* Main 2-Column Hero: Product Image & Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: High-Impact Visual Container */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-white/20 group shadow-2xl flex items-center justify-center p-8">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain transform-gpu group-hover:scale-108 transition-transform duration-700 ease-out drop-shadow-xl"
                />

                {/* Floating Technical Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/90 border border-white/20 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse" />
                  <span className="text-[10px] font-mono-tech text-white font-bold tracking-wider uppercase">
                    {product.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono-tech text-zinc-900 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-zinc-200 shadow-md">
                  <span className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F01B25]" /> API / ASME Compliant
                  </span>
                  <span className="font-semibold text-zinc-600">100% MTR Traceable</span>
                </div>
              </div>

              {/* Quality & Assurance Note */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#F01B25] flex-shrink-0 mt-0.5" />
                <p className="text-xs font-outfit text-zinc-300 leading-relaxed font-light">
                  Supplied with EN-ISO 10204 3.1 Material Test Reports, hydrostatic verification, and third-party Lloyd's / DNV inspection dossiers upon request.
                </p>
              </div>
            </div>

            {/* Right: Technical Information & Description */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F01B25]" />
                  <span>INDUSTRIAL EQUIPMENT PROFILE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-grotesk font-extrabold uppercase tracking-tight text-white leading-[0.98]">
                  {product.title}
                </h2>
                <div className="inline-block px-3 py-1 rounded bg-white/10 text-zinc-300 text-xs font-mono-tech font-bold uppercase tracking-wider">
                  {product.tag}
                </div>
              </div>

              <p className="text-sm sm:text-base font-outfit text-zinc-300 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenQuote(`${product.title} (${categoryName})`)}
                  className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-[#F01B25] hover:bg-white text-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#F01B25]/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Quotation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#F01B25]" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>

          {/* Technical Specifications Section */}
          <div className="space-y-6 border-t border-white/10 pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Wrench className="w-5 h-5 text-[#F01B25]" />
                <h3 className="text-lg sm:text-xl font-grotesk font-extrabold uppercase tracking-tight text-white">
                  ENGINEERING SPECIFICATIONS & OPERATIONAL PARAMETERS
                </h3>
              </div>
              <span className="text-xs font-mono-tech text-zinc-500 uppercase">
                {Object.keys(product.specs).length} KEY METRICS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(product.specs).map(([label, value], idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-zinc-950/80 border border-white/10 hover:border-[#F01B25]/50 transition-colors space-y-1.5"
                >
                  <div className="text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider font-semibold">
                    {label}
                  </div>
                  <div className="text-sm sm:text-base font-grotesk font-extrabold text-white tracking-wide">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Footer Action */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <button
              onClick={onClose}
              className="text-xs font-mono-tech text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO {categoryName.toUpperCase()} CATALOG</span>
            </button>

            <button
              onClick={() => onOpenQuote(`${product.title} (${categoryName})`)}
              className="text-xs font-mono-tech text-[#F01B25] hover:text-white font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>NEED CUSTOM SIZING? INQUIRE NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

