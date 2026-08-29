import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSequence } from './components/HeroSequence';
import { ProductsSection } from './components/ProductsSection';
import { ValvesSection } from './components/ValvesSection';
import { IndustriesSection } from './components/IndustriesSection';
import { WhyUsSection } from './components/WhyUsSection';
import { QualitySection } from './components/QualitySection';
import { GlobalBrandsSection } from './components/GlobalBrandsSection';
import { ContactSection } from './components/ContactSection';
import { QuoteModal } from './components/QuoteModal';
import { AboutModal } from './components/AboutModal';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [selectedProductTitle, setSelectedProductTitle] = useState<string | undefined>();

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenQuote = (productTitle?: string) => {
    setSelectedProductTitle(productTitle);
    setQuoteModalOpen(true);
  };

  return (
    <div className="bg-[#050505] text-[#F4F4F4] min-h-screen font-outfit selection:bg-[#F01B25] selection:text-white">
      {/* Luxury Interactive Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenAbout={() => setAboutModalOpen(true)}
      />

      {/* Signature Hero Video Viewport */}
      <HeroSequence
        onOpenQuote={() => handleOpenQuote()}
        onOpenAbout={() => setAboutModalOpen(true)}
      />

      {/* Industries Chapters (Sectors We Cater To) */}
      <IndustriesSection onOpenQuote={() => handleOpenQuote()} />

      {/* 12 Product Categories Section (Catalogue) */}
      <ProductsSection
        onSelectProduct={(product) => handleOpenQuote(product.title)}
      />

      {/* Valve Categories Deep Dive */}
      <ValvesSection onOpenQuote={() => handleOpenQuote('Industrial Valves')} />

      {/* Numerical Why Choose Us Showcase */}
      <WhyUsSection onOpenQuote={() => handleOpenQuote()} />

      {/* Quality Standards & Technical Certifications Index */}
      <QualitySection />

      {/* Global Sourcing & Authorized Brands */}
      <GlobalBrandsSection />

      {/* Editorial Contact Footer & CTAs */}
      <ContactSection onOpenQuote={() => handleOpenQuote()} />

      {/* About Tech Ener-G Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* RFQ Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProductTitle={selectedProductTitle}
      />
    </div>
  );
}
