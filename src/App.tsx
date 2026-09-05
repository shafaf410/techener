import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSequence } from './components/HeroSequence';
import { DIVISIONS_DATA } from './components/DivisionsSection';
import { DivisionDetailPage } from './components/DivisionDetailPage';
import { DivisionItem } from './components/DivisionModal';
import { DivisionsModal } from './components/DivisionsModal';
import { IndustriesModal } from './components/IndustriesModal';
import { WhyUsSection } from './components/WhyUsSection';
import { QualitySection } from './components/QualitySection';
import { GlobalBrandsSection } from './components/GlobalBrandsSection';
import { FooterSection } from './components/FooterSection';
import { ContactPageModal } from './components/ContactPageModal';
import { QuoteModal } from './components/QuoteModal';
import { AboutPageOverlay, AboutTabType } from './components/AboutPageOverlay';

import { HighlightsSection } from './components/HighlightsSection';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [aboutInitialTab, setAboutInitialTab] = useState<AboutTabType>('who-we-are');
  const [divisionsModalOpen, setDivisionsModalOpen] = useState(false);
  const [industriesModalOpen, setIndustriesModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<DivisionItem | null>(null);
  const [selectedProductTitle, setSelectedProductTitle] = useState<string | undefined>();

  const lenisRef = React.useRef<Lenis | null>(null);

  const handleOpenAbout = (tab: AboutTabType = 'who-we-are') => {
    setAboutInitialTab(tab);
    setAboutModalOpen(true);
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

  useEffect(() => {
    // Smooth scroll control - Lenis
  }, []);

  const handleOpenQuote = (productTitle?: string) => {
    setSelectedProductTitle(productTitle);
    setQuoteModalOpen(true);
  };

  const handleSelectDivision = (division: DivisionItem) => {
    setSelectedDivision(division);
  };

  const handleSelectDivisionById = (divisionId: string) => {
    const found = DIVISIONS_DATA.find(d => d.id === divisionId);
    if (found) {
      setSelectedDivision(found);
    }
  };

  const handleBackToHome = () => {
    setSelectedDivision(null);
  };

  return (
    <div className="bg-[#050505] text-[#F4F4F4] min-h-screen font-outfit selection:bg-[#F01B25] selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenAbout={(tab) => handleOpenAbout(tab)}
        onOpenDivisions={() => setDivisionsModalOpen(true)}
        onOpenIndustries={() => setIndustriesModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
        onSelectDivision={handleSelectDivision}
      />

      {/* Signature Hero Video Viewport */}
      <HeroSequence
        onOpenQuote={() => handleOpenQuote()}
        onOpenAbout={() => handleOpenAbout('who-we-are')}
        onOpenIndustries={() => setIndustriesModalOpen(true)}
      />

      {/* Cinematic Tech Ener-G in Numbers Highlights Section */}
      <HighlightsSection />

      {/* Quality Standards & Technical Certifications Index */}
      <QualitySection />

      {/* Global Sourcing & Our Associates */}
      <GlobalBrandsSection />

      {/* Dedicated Architectural Footer Section */}
      <FooterSection
        onOpenQuote={() => handleOpenQuote()}
        onOpenContact={() => setContactModalOpen(true)}
        onOpenAbout={() => handleOpenAbout('who-we-are')}
        onSelectDivision={handleSelectDivisionById}
      />

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

      {/* About Tech Ener-G Full-Screen Page Overlay */}
      <AboutPageOverlay
        isOpen={aboutModalOpen}
        initialTab={aboutInitialTab}
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
