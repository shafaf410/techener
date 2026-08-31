import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, PhoneCall, Mail, Home } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenAbout, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'HOME', href: '#', isAction: false },
    { name: 'ABOUT', href: '#', isAction: true, action: onOpenAbout },
    { name: 'DIVISIONS', href: '#divisions', isAction: false },
    { name: 'INDUSTRIES', href: '#industries', isAction: false },
    { name: 'QUALITY', href: '#quality', isAction: false },
    { name: 'CONTACT', href: '#', isAction: true, action: onOpenContact },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#050505]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Badge (Hidden on Hero, Appears with transition on 2nd page) */}
          <a
            href="#"
            onClick={(e) => scrollToSection(e, '#')}
            className={`flex items-center gap-3 group transition-all duration-100 transform ${
              isScrolled
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'opacity-0 -translate-y-4 scale-90 pointer-events-none'
            }`}
          >
            <div className="relative overflow-hidden px-3.5 py-1.5 rounded-lg bg-white shadow-xl group-hover:scale-105 transition-all duration-300 border border-white/20">
              <img
                src="/logo.png"
                alt="Tech Ener-G Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isAction ? (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="text-xs font-mono-tech font-medium tracking-wider text-zinc-300 hover:text-[#F01B25] transition-colors relative py-1 group focus:outline-none"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F01B25] transition-all duration-300 group-hover:w-full" />
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-xs font-mono-tech font-medium tracking-wider text-zinc-300 hover:text-[#F01B25] transition-colors relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F01B25] transition-all duration-300 group-hover:w-full" />
                </a>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="relative group overflow-hidden rounded-md bg-[#F01B25] px-5 py-2.5 text-xs font-mono-tech font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-black shadow-lg shadow-[#F01B25]/20 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Request A Quote
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-zinc-900/80 border border-white/10 text-white hover:text-[#F01B25] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Floating Home / Back To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 p-3.5 rounded-full bg-[#0A0A0A]/90 border border-white/20 text-white hover:text-[#F01B25] hover:border-[#F01B25] shadow-2xl backdrop-blur-md transition-all duration-300 flex items-center justify-center group red-glow ${
          isScrolled ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        title="Return to Home / Hero"
        aria-label="Return to Home"
      >
        <Home className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      </button>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between p-8 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        style={{ paddingTop: '100px' }}
      >
        <div className="space-y-6">
          <div className="text-[11px] font-mono-tech tracking-widest text-[#F01B25] uppercase">
            // Navigation Menu
          </div>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, idx) => (
              link.isAction ? (
                <button
                  key={link.name}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.action) link.action();
                  }}
                  className="text-3xl font-grotesk font-bold tracking-tight text-white hover:text-[#F01B25] transition-colors flex items-center justify-between border-b border-white/5 pb-3 text-left w-full"
                >
                  <span>
                    <span className="text-sm font-mono-tech text-zinc-600 mr-4">0{idx}</span>
                    {link.name}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-600" />
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(e, link.href);
                  }}
                  className="text-3xl font-grotesk font-bold tracking-tight text-white hover:text-[#F01B25] transition-colors flex items-center justify-between border-b border-white/5 pb-3"
                >
                  <span>
                    <span className="text-sm font-mono-tech text-zinc-600 mr-4">0{idx}</span>
                    {link.name}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-600" />
                </a>
              )
            ))}
          </div>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-6">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="w-full py-4 rounded-md bg-[#F01B25] text-white font-mono-tech font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#F01B25]/30"
          >
            Request A Quote
            <ArrowUpRight className="w-4 h-4" />
          </button>
          
          <div className="flex items-center justify-between text-xs font-mono-tech text-zinc-400">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#ED1C24]" /> +971 56 893 9519
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#ED1C24]" /> sales@techener-g.com
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
