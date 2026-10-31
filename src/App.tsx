import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSequence } from './components/HeroSequence';
import { DIVISIONS_DATA } from './components/DivisionsSection';
import { DivisionDetailPage } from './components/DivisionDetailPage';
import { DivisionItem } from './components/DivisionModal';
import { DivisionsModal } from './components/DivisionsModal';
import { IndustriesModal } from './components/IndustriesModal';
import { HighlightsSection } from './components/HighlightsSection';
import { GlobalBrandsSection } from './components/GlobalBrandsSection';
import { FooterSection } from './components/FooterSection';
import { ContactPageModal } from './components/ContactPageModal';
import { QuoteModal } from './components/QuoteModal';
import { AboutPageOverlay, AboutTabType } from './components/AboutPageOverlay';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [aboutInitialTab, setAboutInitialTab] = useState<AboutTabType>('who-we-are');
  const [divisionsModalOpen, setDivisionsModalOpen] = useState(false);
  const [industriesModalOpen, setIndustriesModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<DivisionItem | null>(null);
  const [selectedProductTitle, setSelectedProductTitle] = useState<string | undefined>();

  const lenisRef = useRef<Lenis | null>(null);

  const handleOpenAbout = (tab: AboutTabType = 'who-we-are') => {
    setSelectedDivision(null);
    setDivisionsModalOpen(false);
    setIndustriesModalOpen(false);
    setContactModalOpen(false);
    setAboutInitialTab(tab);
    setAboutModalOpen(true);
    if (tab === 'who-we-are' || tab === 'hero') {
      const scrollContainer = document.getElementById('about-scroll-container');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setTimeout(() => {
        const targetEl = document.getElementById(`about-${tab}`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleOpenDivisions = () => {
    setSelectedDivision(null);
    setAboutModalOpen(false);
    setIndustriesModalOpen(false);
    setContactModalOpen(false);
    setDivisionsModalOpen(true);
  };

  const handleOpenIndustries = () => {
    setSelectedDivision(null);
    setAboutModalOpen(false);
    setDivisionsModalOpen(false);
    setContactModalOpen(false);
    setIndustriesModalOpen(true);
  };

  const handleOpenContact = () => {
    setSelectedDivision(null);
    setAboutModalOpen(false);
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
    aboutModalOpen ||
    divisionsModalOpen ||
    industriesModalOpen ||
    contactModalOpen ||
    Boolean(selectedDivision);

  const isSubPageOpen = Boolean(
    aboutModalOpen ||
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
    setAboutModalOpen(false);
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
    setAboutModalOpen(false);
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
        onOpenAbout={(tab) => handleOpenAbout(tab)}
        onOpenDivisions={handleOpenDivisions}
        onOpenIndustries={handleOpenIndustries}
        onOpenContact={handleOpenContact}
        onSelectDivision={handleSelectDivision}
        isSubPageOpen={isSubPageOpen}
      />

      {/* Signature Hero Video Viewport */}
      <HeroSequence
        onOpenQuote={() => handleOpenQuote()}
        onOpenAbout={() => handleOpenAbout('who-we-are')}
        onOpenIndustries={() => setIndustriesModalOpen(true)}
      />

      {/* Cinematic Tech Ener-G in Numbers Highlights Section */}
      <HighlightsSection />

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

      {/* About Tech Ener-G Full-Screen Page Overlay (Contains all About innovations & Tile Reveal) */}
      <AboutPageOverlay
        isOpen={aboutModalOpen}
        initialTab={aboutInitialTab}
        onClose={() => setAboutModalOpen(false)}
        onOpenQuote={() => handleOpenQuote()}
        onOpenDivisions={() => setDivisionsModalOpen(true)}
        onOpenIndustries={() => setIndustriesModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
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
