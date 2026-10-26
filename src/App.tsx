import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { DIVISIONS_DATA } from './components/DivisionsSection';
import { DivisionDetailPage } from './components/DivisionDetailPage';
import { DivisionItem } from './components/DivisionModal';
import { DivisionsModal } from './components/DivisionsModal';
import { IndustriesModal } from './components/IndustriesModal';
import { ContactPageModal } from './components/ContactPageModal';
import { QuoteModal } from './components/QuoteModal';

// Master Reusable About & Brand Components
import { defaultAboutConfig } from './data/aboutConfig';
import { AboutHeroSection } from './components/about/AboutHeroSection';
import { AboutIntroSection } from './components/about/AboutIntroSection';
import { AboutLeadershipSection } from './components/about/AboutLeadershipSection';
import { AboutCertificationsSection } from './components/about/AboutCertificationsSection';
import { AboutFooterSection } from './components/about/AboutFooterSection';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [divisionsModalOpen, setDivisionsModalOpen] = useState(false);
  const [industriesModalOpen, setIndustriesModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<DivisionItem | null>(null);
  const [selectedProductTitle, setSelectedProductTitle] = useState<string | undefined>();

  const lenisRef = useRef<Lenis | null>(null);

  const scrollToAbout = () => {
    const el = document.getElementById('about-intro-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDivisions = () => {
    setSelectedDivision(null);
    setIndustriesModalOpen(false);
    setContactModalOpen(false);
    setDivisionsModalOpen(true);
  };

  const handleOpenIndustries = () => {
    setSelectedDivision(null);
    setDivisionsModalOpen(false);
    setContactModalOpen(false);
    setIndustriesModalOpen(true);
  };

  const handleOpenContact = () => {
    setSelectedDivision(null);
    setDivisionsModalOpen(false);
    setIndustriesModalOpen(false);
    setContactModalOpen(true);
  };

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

  const isAnyModalOpen =
    quoteModalOpen ||
    divisionsModalOpen ||
    industriesModalOpen ||
    contactModalOpen ||
    Boolean(selectedDivision);

  const isSubPageOpen = Boolean(
    divisionsModalOpen ||
    industriesModalOpen ||
    contactModalOpen ||
    selectedDivision
  );

  useEffect(() => {
    if (lenisRef.current) {
      if (isAnyModalOpen) {
        lenisRef.current.stop();
        document.body.style.overflow = 'hidden';
      } else {
        lenisRef.current.start();
        document.body.style.overflow = '';
      }
    }
  }, [isAnyModalOpen]);

  const handleOpenQuote = (productTitle?: string) => {
    setSelectedProductTitle(productTitle);
    setQuoteModalOpen(true);
  };

  const handleSelectDivision = (division: DivisionItem) => {
    setDivisionsModalOpen(false);
    setIndustriesModalOpen(false);
    setContactModalOpen(false);
    setSelectedDivision(division);
  };

  const handleSelectDivisionById = (divisionId: string) => {
    const found = DIVISIONS_DATA.find((d) => d.id === divisionId);
    if (found) {
      handleSelectDivision(found);
    }
  };

  const handleBackToHome = () => {
    setSelectedDivision(null);
    setDivisionsModalOpen(false);
    setIndustriesModalOpen(false);
    setContactModalOpen(false);
    setQuoteModalOpen(false);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: false });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] text-[#F4F4F4] min-h-screen font-outfit selection:bg-[#F01B25] selection:text-white">
      {/* Navigation */}
      <Navbar
        onGoHome={handleBackToHome}
        onOpenQuote={() => handleOpenQuote()}
        onOpenAbout={scrollToAbout}
        onOpenDivisions={handleOpenDivisions}
        onOpenIndustries={handleOpenIndustries}
        onOpenContact={handleOpenContact}
        onSelectDivision={handleSelectDivision}
        isSubPageOpen={isSubPageOpen}
      />

      {/* Main Premium Website Experience */}
      <main className="w-full">
        {/* 1. Full-Screen Hero: BUILT ON TRUST. DRIVEN BY EXCELLENCE. */}
        <div id="hero">
          <AboutHeroSection
            config={defaultAboutConfig}
            onClose={handleBackToHome}
            onOpenQuote={() => handleOpenQuote()}
            onScrollToExplore={scrollToAbout}
          />
        </div>

        {/* 2. LOCATED IN UAE & INDIA + WHAT DRIVES US Text Reveal + Map + Stats */}
        <AboutIntroSection config={defaultAboutConfig} />

        {/* 3. Leadership & Our People */}
        <AboutLeadershipSection config={defaultAboutConfig} />

        {/* 4. Tile Reveal: Image tiles that fly in on scroll to reveal a headline */}
        <AboutCertificationsSection
          config={defaultAboutConfig}
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* 5. Editorial Corporate Footer */}
        <AboutFooterSection
          config={defaultAboutConfig}
          onClose={handleBackToHome}
          onOpenQuote={() => handleOpenQuote()}
        />
      </main>

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

      {/* Dedicated Contact Page Modal Overlay */}
      <ContactPageModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Dedicated Divisions Modal Overlay */}
      <DivisionsModal
        isOpen={divisionsModalOpen}
        onClose={() => setDivisionsModalOpen(false)}
        onSelectDivision={handleSelectDivision}
      />

      {/* Dedicated Industries Modal Overlay */}
      <IndustriesModal
        isOpen={industriesModalOpen}
        onClose={() => setIndustriesModalOpen(false)}
        onOpenQuote={(title) => handleOpenQuote(title)}
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
