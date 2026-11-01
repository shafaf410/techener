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
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export type PageType = 'home' | 'about' | 'divisions' | 'industries' | 'contact' | 'division-detail';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [aboutInitialTab, setAboutInitialTab] = useState<AboutTabType>('who-we-are');
  const [selectedDivision, setSelectedDivision] = useState<DivisionItem | null>(null);
  const [selectedProductTitle, setSelectedProductTitle] = useState<string | undefined>();

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
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

  // Sync with URL Hash for proper multi-page routing, browser back/forward, and direct URLs
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (!rawHash || rawHash === 'home') {
        setCurrentPage('home');
        setSelectedDivision(null);
      } else if (rawHash === 'about' || rawHash === 'who-we-are' || rawHash === 'vision' || rawHash === 'what-we-do') {
        setCurrentPage('about');
        setSelectedDivision(null);
        if (rawHash === 'vision') setAboutInitialTab('vision');
        else if (rawHash === 'what-we-do') setAboutInitialTab('what-we-do');
        else setAboutInitialTab('who-we-are');
      } else if (rawHash === 'divisions') {
        setCurrentPage('divisions');
        setSelectedDivision(null);
      } else if (rawHash === 'industries') {
        setCurrentPage('industries');
        setSelectedDivision(null);
      } else if (rawHash === 'contact') {
        setCurrentPage('contact');
        setSelectedDivision(null);
      } else if (rawHash.startsWith('division-')) {
        const divId = rawHash.replace('division-', '');
        const found = DIVISIONS_DATA.find((d) => d.id === divId || d.id.includes(divId));
        if (found) {
          setSelectedDivision(found);
          setCurrentPage('division-detail');
        } else {
          setCurrentPage('divisions');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // When changing pages, always smoothly scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [currentPage]);

  const navigateTo = (page: PageType, hashValue?: string) => {
    const targetHash = hashValue || page;
    if (window.location.hash !== `#${targetHash}`) {
      window.location.hash = targetHash;
    }
    setCurrentPage(page);
  };

  const handleOpenAbout = (tab: AboutTabType = 'who-we-are') => {
    setAboutInitialTab(tab);
    setSelectedDivision(null);
    navigateTo('about', tab === 'who-we-are' ? 'about' : tab);
  };

  const handleOpenDivisions = () => {
    setSelectedDivision(null);
    navigateTo('divisions');
  };

  const handleOpenIndustries = () => {
    setSelectedDivision(null);
    navigateTo('industries');
  };

  const handleOpenContact = () => {
    setSelectedDivision(null);
    navigateTo('contact');
  };

  const handleSelectDivision = (division: DivisionItem) => {
    setSelectedDivision(division);
    navigateTo('division-detail', `division-${division.id}`);
  };

  const handleSelectDivisionById = (divisionId: string) => {
    const found = DIVISIONS_DATA.find((d) => d.id === divisionId);
    if (found) {
      handleSelectDivision(found);
    } else {
      handleOpenDivisions();
    }
  };

  const handleBackToHome = () => {
    setSelectedDivision(null);
    navigateTo('home');
  };

  const handleOpenQuote = (productTitle?: string) => {
    setSelectedProductTitle(productTitle);
    setQuoteModalOpen(true);
  };

  return (
    <div className="bg-[#050505] text-[#F4F4F4] min-h-screen font-outfit selection:bg-[#F01B25] selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onGoHome={handleBackToHome}
        onOpenQuote={() => handleOpenQuote()}
        onOpenAbout={(tab) => handleOpenAbout(tab)}
        onOpenDivisions={handleOpenDivisions}
        onOpenIndustries={handleOpenIndustries}
        onOpenContact={handleOpenContact}
        onSelectDivision={handleSelectDivision}
        isSubPageOpen={currentPage !== 'home'}
      />

      {/* 1. SEPARATE PAGE: HOME */}
      {currentPage === 'home' && (
        <main className="w-full">
          <HeroSequence
            onOpenQuote={() => handleOpenQuote()}
            onOpenAbout={() => handleOpenAbout('who-we-are')}
            onOpenIndustries={handleOpenIndustries}
          />
          <HighlightsSection />
          <GlobalBrandsSection />
          <FooterSection
            onOpenQuote={() => handleOpenQuote()}
            onOpenContact={handleOpenContact}
            onOpenAbout={() => handleOpenAbout('who-we-are')}
            onSelectDivision={handleSelectDivisionById}
          />
        </main>
      )}

      {/* 2. SEPARATE PAGE: ABOUT US */}
      {currentPage === 'about' && (
        <AboutPageOverlay
          isOpen={true}
          initialTab={aboutInitialTab}
          onClose={handleBackToHome}
          onOpenQuote={() => handleOpenQuote()}
          onOpenDivisions={handleOpenDivisions}
          onOpenIndustries={handleOpenIndustries}
          onOpenContact={handleOpenContact}
        />
      )}

      {/* 3. SEPARATE PAGE: DIVISIONS */}
      {currentPage === 'divisions' && (
        <DivisionsModal
          isOpen={true}
          onClose={handleBackToHome}
          onSelectDivision={handleSelectDivision}
        />
      )}

      {/* 4. SEPARATE PAGE: INDUSTRIES */}
      {currentPage === 'industries' && (
        <IndustriesModal
          isOpen={true}
          onClose={handleBackToHome}
          onOpenQuote={(title) => handleOpenQuote(title)}
        />
      )}

      {/* 5. SEPARATE PAGE: CONTACT */}
      {currentPage === 'contact' && (
        <ContactPageModal
          isOpen={true}
          onClose={handleBackToHome}
        />
      )}

      {/* 6. SEPARATE PAGE: DIVISION DETAIL */}
      {currentPage === 'division-detail' && selectedDivision && (
        <DivisionDetailPage
          division={selectedDivision}
          onBack={handleOpenDivisions}
          onOpenQuote={(title) => handleOpenQuote(title)}
          onSelectOtherDivision={(otherDiv) => handleSelectDivision(otherDiv)}
          allDivisions={DIVISIONS_DATA}
        />
      )}

      {/* RFQ Quote Modal (Action Pop-up) */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProductTitle={selectedProductTitle}
      />

      {/* Floating Direct WhatsApp Connect Button */}
      <FloatingWhatsApp />
    </div>
  );
}
