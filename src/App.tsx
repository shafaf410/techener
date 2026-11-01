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
  const [aboutInitialTab, setAboutInitialTab] = useState<AboutTabType>('hero');
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

  // Parse path and legacy hash into clean state
  const parseCurrentLocation = (): { page: PageType; division: DivisionItem | null; tab: AboutTabType } => {
    let path = window.location.pathname.toLowerCase();

    // If accessed with legacy hash e.g. /#about or /#divisions, seamlessly convert to real path
    if (window.location.hash) {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (hash === 'about' || hash === 'who-we-are' || hash === 'vision' || hash === 'what-we-do') {
        path = '/about';
      } else if (hash === 'divisions') {
        path = '/divisions';
      } else if (hash === 'industries') {
        path = '/industries';
      } else if (hash === 'contact') {
        path = '/contact';
      } else if (hash.startsWith('division-')) {
        const divId = hash.replace('division-', '');
        path = `/division/${divId}`;
      } else if (hash === 'home') {
        path = '/';
      }
      // Clean URL completely to remove the hash
      window.history.replaceState(null, '', path);
    }

    // Strip trailing slashes
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    if (path === '/about' || path.startsWith('/about/')) {
      const sub = path.split('/')[2];
      let tab: AboutTabType = 'hero';
      if (sub === 'who-we-are') tab = 'who-we-are';
      else if (sub === 'vision') tab = 'vision';
      else if (sub === 'what-we-do') tab = 'what-we-do';
      return { page: 'about', division: null, tab };
    }

    if (path === '/divisions') {
      return { page: 'divisions', division: null, tab: 'hero' };
    }

    if (path === '/industries') {
      return { page: 'industries', division: null, tab: 'hero' };
    }

    if (path === '/contact') {
      return { page: 'contact', division: null, tab: 'hero' };
    }

    if (path.startsWith('/division/')) {
      const divId = path.replace('/division/', '');
      const found = DIVISIONS_DATA.find(
        (d) => d.id.toLowerCase() === divId || d.id.toLowerCase().includes(divId)
      );
      if (found) {
        return { page: 'division-detail', division: found, tab: 'hero' };
      }
      return { page: 'divisions', division: null, tab: 'hero' };
    }

    return { page: 'home', division: null, tab: 'hero' };
  };

  // Sync state with HTML5 History (back/forward button, legacy hash cleanup, and initial load)
  useEffect(() => {
    const applyLocation = () => {
      const { page, division, tab } = parseCurrentLocation();
      setCurrentPage(page);
      setSelectedDivision(division);
      setAboutInitialTab(tab);
    };

    applyLocation();

    window.addEventListener('popstate', applyLocation);
    window.addEventListener('hashchange', applyLocation);
    return () => {
      window.removeEventListener('popstate', applyLocation);
      window.removeEventListener('hashchange', applyLocation);
    };
  }, []);

  // Whenever page changes, scroll instantly to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const aboutScrollContainer = document.getElementById('about-scroll-container');
    if (aboutScrollContainer) {
      aboutScrollContainer.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [currentPage]);

  // Clean HTML5 History pushState navigation (strictly clean URLs, no hashes)
  const navigateTo = (path: string, page: PageType, division?: DivisionItem | null, tab?: AboutTabType) => {
    if (window.location.pathname !== path || window.location.hash) {
      window.history.pushState(null, '', path);
    }
    setCurrentPage(page);
    if (division !== undefined) setSelectedDivision(division);
    if (tab !== undefined) setAboutInitialTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const aboutScrollContainer = document.getElementById('about-scroll-container');
    if (aboutScrollContainer) {
      aboutScrollContainer.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  };

  const handleBackToHome = () => {
    navigateTo('/', 'home', null);
  };

  const handleOpenAbout = (tab: AboutTabType = 'hero') => {
    navigateTo('/about', 'about', null, tab);
  };

  const handleOpenDivisions = () => {
    navigateTo('/divisions', 'divisions', null);
  };

  const handleOpenIndustries = () => {
    navigateTo('/industries', 'industries', null);
  };

  const handleOpenContact = () => {
    navigateTo('/contact', 'contact', null);
  };

  const handleSelectDivision = (division: DivisionItem) => {
    navigateTo(`/division/${division.id}`, 'division-detail', division);
  };

  const handleSelectDivisionById = (divisionId: string) => {
    const found = DIVISIONS_DATA.find((d) => d.id === divisionId);
    if (found) {
      handleSelectDivision(found);
    } else {
      handleOpenDivisions();
    }
  };

  const handleOpenQuote = (productTitle?: string) => {
    setSelectedProductTitle(productTitle);
    setQuoteModalOpen(true);
  };

  return (
    <div className="bg-[#050505] text-[#F4F4F4] min-h-screen font-outfit selection:bg-[#F01B25] selection:text-white">
      {/* Global Floating Navigation Bar */}
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

      {/* 1. SEPARATE PAGE: HOME (/) */}
      {currentPage === 'home' && (
        <main className="w-full">
          <HeroSequence
            onOpenQuote={() => handleOpenQuote()}
            onOpenAbout={() => handleOpenAbout('hero')}
            onOpenIndustries={handleOpenIndustries}
          />
          <HighlightsSection />
          <GlobalBrandsSection />
          <FooterSection
            onGoHome={handleBackToHome}
            onOpenQuote={() => handleOpenQuote()}
            onOpenContact={handleOpenContact}
            onOpenAbout={() => handleOpenAbout('hero')}
            onOpenDivisions={handleOpenDivisions}
            onSelectDivision={handleSelectDivisionById}
          />
        </main>
      )}

      {/* 2. SEPARATE PAGE: ABOUT US (/about) */}
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

      {/* 3. SEPARATE PAGE: DIVISIONS (/divisions) */}
      {currentPage === 'divisions' && (
        <DivisionsModal
          isOpen={true}
          onClose={handleBackToHome}
          onSelectDivision={handleSelectDivision}
        />
      )}

      {/* 4. SEPARATE PAGE: INDUSTRIES (/industries) */}
      {currentPage === 'industries' && (
        <IndustriesModal
          isOpen={true}
          onClose={handleBackToHome}
          onOpenQuote={(title) => handleOpenQuote(title)}
        />
      )}

      {/* 5. SEPARATE PAGE: CONTACT (/contact) */}
      {currentPage === 'contact' && (
        <ContactPageModal
          isOpen={true}
          onClose={handleBackToHome}
        />
      )}

      {/* 6. SEPARATE PAGE: DIVISION DETAIL (/division/:id) */}
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
