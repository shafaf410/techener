import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSequence } from './components/HeroSequence';
import { DivisionsSection, DIVISIONS_DATA } from './components/DivisionsSection';
import { DivisionDetailPage } from './components/DivisionDetailPage';
import { DivisionItem } from './components/DivisionModal';
import { IndustriesSection } from './components/IndustriesSection';
import { WhyUsSection } from './components/WhyUsSection';
import { QualitySection } from './components/QualitySection';
import { GlobalBrandsSection } from './components/GlobalBrandsSection';
import { ContactSection } from './components/ContactSection';
import { QuoteModal } from './components/QuoteModal';
import { AboutModal } from './components/AboutModal';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'division'>('home');
  const [selectedDivision, setSelectedDivision] = useState<DivisionItem | null>(null);
  const [selectedProductTitle, setSelectedProductTitle] = useState<string | undefined>();

  const lenisRef = React.useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [selectedDivision]);

  const handleOpenQuote = (productTitle?: string) => {
    setSelectedProductTitle(productTitle);
    setQuoteModalOpen(true);
  };

  const handleSelectDivision = (division: DivisionItem) => {
    setSelectedDivision(division);
  };

  const handleBackToHome = () => {
    setSelectedDivision(null);
    setTimeout(() => {
      const el = document.getElementById('divisions');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <div className="bg-[#050505] text-[#F4F4F4] min-h-screen font-outfit selection:bg-[#F01B25] selection:text-white">
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

      {/* Tech Ener-G 5 Core Industrial Divisions */}
      <DivisionsSection
        onSelectDivision={handleSelectDivision}
      />

      {/* Numerical Why Choose Us Showcase */}
      <WhyUsSection onOpenQuote={() => handleOpenQuote()} />

      {/* Quality Standards & Technical Certifications Index */}
      <QualitySection />

      {/* Global Sourcing & Our Associates */}
      <GlobalBrandsSection />

      {/* Full-Screen Division Detail Page Overlay */}
      {selectedDivision && (
        <DivisionDetailPage
          division={selectedDivision}
          onBack={handleBackToHome}
          onOpenQuote={(title) => handleOpenQuote(title)}
          onSelectOtherDivision={(otherDiv) => setSelectedDivision(otherDiv)}
          allDivisions={DIVISIONS_DATA}
        />
      )}

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
