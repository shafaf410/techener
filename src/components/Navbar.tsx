import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown, ChevronRight, PhoneCall, Mail, Home, Layers, Factory, Info, Award, Compass, Users } from 'lucide-react';
import { DivisionItem } from './DivisionModal';
import { DIVISIONS_DATA } from './DivisionsSection';
import { AboutTabType } from './AboutPageOverlay';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenAbout: (tab?: AboutTabType) => void;
  onOpenDivisions: () => void;
  onOpenIndustries: () => void;
  onOpenContact: () => void;
  onSelectDivision?: (division: DivisionItem) => void;
}

interface DropdownCategory {
  id: string;
  name: string;
  divisionId?: string;
  subItems: string[];
}

const ABOUT_DROPDOWN_DATA: { name: string; tab: AboutTabType; description: string }[] = [
  { name: 'Who We Are', tab: 'who-we-are', description: 'Company profile, 200+ team trust & global presence' },
  { name: 'Vision, Mission & Values', tab: 'vision', description: 'Our guiding principles & 6 core values' },
  { name: 'What We Do', tab: 'what-we-do', description: 'Engineering services & global supply chain' },
  { name: 'Organizations & Certifications', tab: 'certifications', description: 'Autel, Redfluid & ISO 9001 certifications' },
];

const DIVISIONS_DROPDOWN_DATA: DropdownCategory[] = [
  {
    id: 'mechanical-division',
    name: 'Mechanical Division',
    divisionId: 'mechanical-division',
    subItems: [
      'Pumps, Compressors & Heat Exchangers',
      'Gearboxes, Couplings & Bearings',
      'Pipes, Flanges & Fittings',
      'Industrial Valves & Accessories',
      'Sour Gas & Oilfield Equipment',
    ],
  },
  {
    id: 'instrumentation-fluid-solutions',
    name: 'Instrumentation & Fluid Solutions',
    divisionId: 'instrumentation-fluid-solutions',
    subItems: [
      'Instrumentation Valves & Tubing',
      'High Pressure Equipment & Fittings',
      'Manifolds & Calibration Equipment',
      'Temperature & Pressure Sensors',
      'Flow Meters & Gas Detectors',
    ],
  },
  {
    id: 'flow-control-division',
    name: 'Flow Control Division',
    divisionId: 'flow-control-division',
    subItems: [
      'Pipeline Isolation Valves',
      'Control & Relief Valves (PRV/SRV)',
      'Actuators & Positioners',
      'Regulators & Dampers',
      'Strainers & Filtration Units',
    ],
  },
  {
    id: 'electrical-instrumentation-division',
    name: 'Electrical & Instrumentation Division',
    divisionId: 'electrical-instrumentation-division',
    subItems: [
      'Motors, Generators & Transformers',
      'Flame & Gas Detectors for Turbines',
      'Vibration Transducers & Sensors',
      'PLCs & Compressor Control Systems',
      'Ex-d Explosion Proof Enclosures',
    ],
  },
  {
    id: 'filtration-division',
    name: 'Filtration Division',
    divisionId: 'filtration-division',
    subItems: [
      'Hydraulic & Lube Oil Filters',
      'Air Intake & HEPA Filtration',
      'Water & Cartridge Membrane Filters',
      'Fuel Water Separators',
      'Industrial Dust Collectors',
    ],
  },
];

const INDUSTRIES_DROPDOWN_DATA: DropdownCategory[] = [
  {
    id: 'oil-gas',
    name: 'Oil & Gas Sector',
    subItems: [
      'Upstream Rigs & Offshore Supply',
      'Midstream Pipelines & Storage',
      'Downstream Refining Facilities',
      'API 6A / 6D Heavy Pressure Valves',
    ],
  },
  {
    id: 'power-generation',
    name: 'Power Generation',
    subItems: [
      'Thermal & Utility Stations',
      'Steam Globe & Turbine Valves (BS 1873)',
      'Synthetic Turbine Oil Lubricants',
      'Industrial UPS & Battery Architecture',
    ],
  },
  {
    id: 'construction',
    name: 'Civil & Construction',
    subItems: [
      'Structural Steel Framing',
      'Hydraulic Tensioning Tools',
      'Fastener & Fixing Systems',
      'EN Certified PPE Safety Equipment',
    ],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Process',
    subItems: [
      'API 610 Heavy Process Pumps',
      'Hydraulic Cylinders & Manifolds',
      'Actuated Control Valves',
      'Workshop Lubrication Systems',
    ],
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuote,
  onOpenAbout,
  onOpenDivisions,
  onOpenIndustries,
  onOpenContact,
  onSelectDivision,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown hover state management
  const [openDropdown, setOpenDropdown] = useState<'about' | 'divisions' | 'industries' | null>(null);
  const [activeDivSub, setActiveDivSub] = useState<DropdownCategory>(DIVISIONS_DROPDOWN_DATA[0]);
  const [activeIndSub, setActiveIndSub] = useState<DropdownCategory>(INDUSTRIES_DROPDOWN_DATA[0]);

  // Mobile accordion states
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileDivisionsOpen, setMobileDivisionsOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: 'about' | 'divisions' | 'industries') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = (tab?: AboutTabType) => {
    setOpenDropdown(null);
    onOpenAbout(tab);
  };

  const handleDivisionClick = (divId?: string) => {
    setOpenDropdown(null);
    if (divId && onSelectDivision) {
      const found = DIVISIONS_DATA.find((d) => d.id === divId);
      if (found) {
        onSelectDivision(found);
        return;
      }
    }
    onOpenDivisions();
  };

  const handleIndustryClick = () => {
    setOpenDropdown(null);
    onOpenIndustries();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 py-2 sm:py-2.5 shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-[#050505]/90 to-transparent py-3 sm:py-4'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-3 sm:px-5 md:px-6 flex items-center justify-between">
          {/* Logo Badge */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="flex items-center gap-3 group transition-all duration-150 transform -ml-1 sm:-ml-3"
          >
            <div className="relative overflow-hidden px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md shadow-sm group-hover:scale-105 transition-all duration-300 border border-white/20">
              <img
                src="/logo.png"
                alt="Tech Ener-G Logo"
                className="h-6 sm:h-7 w-auto object-contain brightness-125"
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 relative">
            {/* HOME */}
            <button
              onClick={scrollToTop}
              className="text-xs font-mono-tech font-bold tracking-wider text-zinc-200 hover:text-[#F01B25] transition-colors relative py-2 group focus:outline-none cursor-pointer"
            >
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F01B25] transition-all duration-300 group-hover:w-full" />
            </button>

            {/* ABOUT WITH DROPDOWN MENU */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleAboutClick('who-we-are')}
                className={`text-xs font-mono-tech font-bold tracking-wider flex items-center gap-1.5 py-2 transition-colors relative group focus:outline-none cursor-pointer ${
                  openDropdown === 'about' ? 'text-[#F01B25]' : 'text-zinc-200 hover:text-[#F01B25]'
                }`}
              >
                <span>ABOUT US</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'about' ? 'rotate-180 text-[#F01B25]' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F01B25] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* ABOUT DROPDOWN CARD */}
              {openDropdown === 'about' && (
                <div className="absolute top-full left-0 pt-2 z-50 w-72 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="rounded-2xl bg-white border border-zinc-200/90 shadow-2xl p-2.5 space-y-1 text-zinc-800">
                    <div className="px-3 py-1.5 text-[10px] font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase border-b border-zinc-100 flex items-center justify-between">
                      <span>ABOUT TECH ENER-G</span>
                      <Info className="w-3.5 h-3.5 text-[#F01B25]" />
                    </div>

                    {ABOUT_DROPDOWN_DATA.map((item) => (
                      <div
                        key={item.tab}
                        onClick={() => handleAboutClick(item.tab)}
                        className="group/item px-3.5 py-2.5 rounded-xl cursor-pointer hover:bg-[#F01B25]/10 transition-all duration-200 space-y-0.5"
                      >
                        <div className="text-xs font-grotesk font-extrabold uppercase text-zinc-900 group-hover/item:text-[#F01B25] flex items-center justify-between">
                          <span>{item.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover/item:text-[#F01B25] group-hover/item:translate-x-0.5 transition-all" />
                        </div>
                        <p className="text-[10px] font-outfit text-zinc-500 group-hover/item:text-zinc-700 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* DIVISIONS WITH MULTI-LEVEL DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('divisions')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleDivisionClick()}
                className={`text-xs font-mono-tech font-bold tracking-wider flex items-center gap-1.5 py-2 transition-colors relative group focus:outline-none cursor-pointer ${
                  openDropdown === 'divisions' ? 'text-[#F01B25]' : 'text-zinc-200 hover:text-[#F01B25]'
                }`}
              >
                <span>DIVISIONS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'divisions' ? 'rotate-180 text-[#F01B25]' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F01B25] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Multi-Level Flyout Dropdown Menu */}
              {openDropdown === 'divisions' && (
                <div className="absolute top-full left-0 pt-2 z-50 flex animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* First Level Dropdown (Divisions List) */}
                  <div className="w-72 rounded-2xl bg-white border border-zinc-200/90 shadow-2xl p-2.5 space-y-1 text-zinc-800">
                    <div className="px-3 py-1.5 text-[10px] font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase border-b border-zinc-100 flex items-center justify-between">
                      <span>CORE DIVISIONS (5)</span>
                      <Layers className="w-3 h-3 text-[#F01B25]" />
                    </div>

                    {DIVISIONS_DROPDOWN_DATA.map((cat) => (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setActiveDivSub(cat)}
                        onClick={() => handleDivisionClick(cat.divisionId)}
                        className={`group/item px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between text-xs font-grotesk font-bold uppercase ${
                          activeDivSub.id === cat.id
                            ? 'bg-[#F01B25]/10 text-[#F01B25]'
                            : 'hover:bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 shrink-0 ${activeDivSub.id === cat.id ? 'text-[#F01B25] translate-x-0.5' : 'text-zinc-400 group-hover/item:text-zinc-700'}`} />
                      </div>
                    ))}

                    <button
                      onClick={() => handleDivisionClick()}
                      className="w-full mt-2 pt-2 pb-1.5 px-3 rounded-xl bg-zinc-900 text-white hover:bg-[#F01B25] text-[11px] font-mono-tech font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow cursor-pointer"
                    >
                      <span>View All 5 Divisions</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Second Level Sub-items Flyout Panel (Right Side) */}
                  <div className="w-80 ml-2 rounded-2xl bg-white border border-zinc-200/90 shadow-2xl p-4 space-y-3 animate-in fade-in slide-in-from-left-2 duration-200">
                    <div className="space-y-1 border-b border-zinc-100 pb-2.5">
                      <div className="text-[10px] font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                        SUB-DIVISIONS & SCOPE:
                      </div>
                      <div className="text-sm font-grotesk font-extrabold text-zinc-900 uppercase">
                        {activeDivSub.name}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {activeDivSub.subItems.map((sub, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleDivisionClick(activeDivSub.divisionId)}
                          className="group/sub flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 cursor-pointer transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25] group-hover/sub:scale-125 transition-transform" />
                          <span className="text-xs font-outfit font-medium text-zinc-700 group-hover/sub:text-[#F01B25] transition-colors leading-snug">
                            {sub}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleDivisionClick(activeDivSub.divisionId)}
                      className="w-full pt-2 flex items-center justify-between text-[11px] font-mono-tech font-bold text-[#F01B25] uppercase tracking-wider hover:underline border-t border-zinc-100 cursor-pointer"
                    >
                      <span>EXPLORE FULL SPECIFICATIONS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* INDUSTRIES WITH MULTI-LEVEL DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('industries')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={handleIndustryClick}
                className={`text-xs font-mono-tech font-bold tracking-wider flex items-center gap-1.5 py-2 transition-colors relative group focus:outline-none cursor-pointer ${
                  openDropdown === 'industries' ? 'text-[#F01B25]' : 'text-zinc-200 hover:text-[#F01B25]'
                }`}
              >
                <span>INDUSTRIES</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'industries' ? 'rotate-180 text-[#F01B25]' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F01B25] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Multi-Level Flyout Dropdown Menu */}
              {openDropdown === 'industries' && (
                <div className="absolute top-full left-0 pt-2 z-50 flex animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* First Level Dropdown (Industries List) */}
                  <div className="w-72 rounded-2xl bg-white border border-zinc-200/90 shadow-2xl p-2.5 space-y-1 text-zinc-800">
                    <div className="px-3 py-1.5 text-[10px] font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase border-b border-zinc-100 flex items-center justify-between">
                      <span>SECTORS WE CATER TO (4)</span>
                      <Factory className="w-3 h-3 text-[#F01B25]" />
                    </div>

                    {INDUSTRIES_DROPDOWN_DATA.map((cat) => (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setActiveIndSub(cat)}
                        onClick={handleIndustryClick}
                        className={`group/item px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between text-xs font-grotesk font-bold uppercase ${
                          activeIndSub.id === cat.id
                            ? 'bg-[#F01B25]/10 text-[#F01B25]'
                            : 'hover:bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 shrink-0 ${activeIndSub.id === cat.id ? 'text-[#F01B25] translate-x-0.5' : 'text-zinc-400 group-hover/item:text-zinc-700'}`} />
                      </div>
                    ))}

                    <button
                      onClick={handleIndustryClick}
                      className="w-full mt-2 pt-2 pb-1.5 px-3 rounded-xl bg-zinc-900 text-white hover:bg-[#F01B25] text-[11px] font-mono-tech font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow cursor-pointer"
                    >
                      <span>Explore All Industries</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Second Level Sub-items Flyout Panel (Right Side) */}
                  <div className="w-80 ml-2 rounded-2xl bg-white border border-zinc-200/90 shadow-2xl p-4 space-y-3 animate-in fade-in slide-in-from-left-2 duration-200">
                    <div className="space-y-1 border-b border-zinc-100 pb-2.5">
                      <div className="text-[10px] font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                        SUB-SECTORS & COMPONENTS:
                      </div>
                      <div className="text-sm font-grotesk font-extrabold text-zinc-900 uppercase">
                        {activeIndSub.name}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {activeIndSub.subItems.map((sub, idx) => (
                        <div
                          key={idx}
                          onClick={handleIndustryClick}
                          className="group/sub flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 cursor-pointer transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F01B25] group-hover/sub:scale-125 transition-transform" />
                          <span className="text-xs font-outfit font-medium text-zinc-700 group-hover/sub:text-[#F01B25] transition-colors leading-snug">
                            {sub}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleIndustryClick}
                      className="w-full pt-2 flex items-center justify-between text-[11px] font-mono-tech font-bold text-[#F01B25] uppercase tracking-wider hover:underline border-t border-zinc-100 cursor-pointer"
                    >
                      <span>VIEW INDUSTRY OVERLAY</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* QUALITY */}
            <a
              href="#quality"
              className="text-xs font-mono-tech font-bold tracking-wider text-zinc-200 hover:text-[#F01B25] transition-colors relative py-2 group"
            >
              QUALITY
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F01B25] transition-all duration-300 group-hover:w-full" />
            </a>

            {/* CONTACT */}
            <button
              onClick={onOpenContact}
              className="text-xs font-mono-tech font-bold tracking-wider text-zinc-200 hover:text-[#F01B25] transition-colors relative py-2 group focus:outline-none cursor-pointer"
            >
              CONTACT
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F01B25] transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="relative group overflow-hidden rounded-md bg-[#F01B25] px-4 py-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-zinc-900 hover:text-white shadow-md shadow-[#F01B25]/20 active:scale-95 cursor-pointer"
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
            className="lg:hidden p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 hover:text-[#F01B25] transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Floating Home / Back To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 p-3.5 rounded-full bg-[#0A0A0A]/90 border border-white/20 text-white hover:text-[#F01B25] hover:border-[#F01B25] shadow-2xl backdrop-blur-md transition-all duration-300 flex items-center justify-center group red-glow cursor-pointer ${
          isScrolled ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        title="Return to Home / Hero"
        aria-label="Return to Home"
      >
        <Home className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      </button>

      {/* Mobile Drawer with Accordion Tree */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 lg:hidden overflow-y-auto ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        style={{ paddingTop: '90px' }}
      >
        <div className="space-y-6">
          <div className="text-[11px] font-mono-tech tracking-widest text-[#F01B25] uppercase">
            // Navigation Menu
          </div>
          <div className="flex flex-col space-y-4">
            {/* HOME */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToTop();
              }}
              className="text-2xl font-grotesk font-bold tracking-tight text-white hover:text-[#F01B25] transition-colors flex items-center justify-between border-b border-white/5 pb-3 text-left w-full cursor-pointer"
            >
              <span>HOME</span>
              <ArrowUpRight className="w-5 h-5 text-zinc-600" />
            </button>

            {/* ABOUT ACCORDION */}
            <div className="border-b border-white/5 pb-3">
              <button
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="text-2xl font-grotesk font-bold tracking-tight text-white hover:text-[#F01B25] transition-colors flex items-center justify-between text-left w-full cursor-pointer"
              >
                <span>ABOUT US</span>
                <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${mobileAboutOpen ? 'rotate-180 text-[#F01B25]' : ''}`} />
              </button>

              {mobileAboutOpen && (
                <div className="mt-3 pl-4 space-y-3 border-l-2 border-[#F01B25]/40 animate-in fade-in duration-200">
                  {ABOUT_DROPDOWN_DATA.map((item) => (
                    <button
                      key={item.tab}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleAboutClick(item.tab);
                      }}
                      className="text-sm font-grotesk font-bold text-white hover:text-[#F01B25] flex items-center gap-2 w-full text-left cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#F01B25]" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DIVISIONS ACCORDION */}
            <div className="border-b border-white/5 pb-3">
              <button
                onClick={() => setMobileDivisionsOpen(!mobileDivisionsOpen)}
                className="text-2xl font-grotesk font-bold tracking-tight text-white hover:text-[#F01B25] transition-colors flex items-center justify-between text-left w-full cursor-pointer"
              >
                <span>DIVISIONS</span>
                <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${mobileDivisionsOpen ? 'rotate-180 text-[#F01B25]' : ''}`} />
              </button>

              {mobileDivisionsOpen && (
                <div className="mt-3 pl-4 space-y-3 border-l-2 border-[#F01B25]/40 animate-in fade-in duration-200">
                  {DIVISIONS_DROPDOWN_DATA.map((cat) => (
                    <div key={cat.id} className="space-y-1.5">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleDivisionClick(cat.divisionId);
                        }}
                        className="text-sm font-grotesk font-bold text-white hover:text-[#F01B25] flex items-center gap-2 cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-[#F01B25]" />
                        <span>{cat.name}</span>
                      </button>
                      <div className="pl-5 space-y-1">
                        {cat.subItems.slice(0, 3).map((sub, i) => (
                          <div key={i} className="text-xs font-outfit text-zinc-400 truncate">
                            • {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* INDUSTRIES ACCORDION */}
            <div className="border-b border-white/5 pb-3">
              <button
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                className="text-2xl font-grotesk font-bold tracking-tight text-white hover:text-[#F01B25] transition-colors flex items-center justify-between text-left w-full cursor-pointer"
              >
                <span>INDUSTRIES</span>
                <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${mobileIndustriesOpen ? 'rotate-180 text-[#F01B25]' : ''}`} />
              </button>

              {mobileIndustriesOpen && (
                <div className="mt-3 pl-4 space-y-3 border-l-2 border-[#F01B25]/40 animate-in fade-in duration-200">
                  {INDUSTRIES_DROPDOWN_DATA.map((cat) => (
                    <div key={cat.id} className="space-y-1.5">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleIndustryClick();
                        }}
                        className="text-sm font-grotesk font-bold text-white hover:text-[#F01B25] flex items-center gap-2 cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-[#F01B25]" />
                        <span>{cat.name}</span>
                      </button>
                      <div className="pl-5 space-y-1">
                        {cat.subItems.slice(0, 3).map((sub, i) => (
                          <div key={i} className="text-xs font-outfit text-zinc-400 truncate">
                            • {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* QUALITY */}
            <a
              href="#quality"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-grotesk font-bold tracking-tight text-white hover:text-[#F01B25] transition-colors flex items-center justify-between border-b border-white/5 pb-3"
            >
              <span>QUALITY</span>
              <ArrowUpRight className="w-5 h-5 text-zinc-600" />
            </a>

            {/* CONTACT */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-2xl font-grotesk font-bold tracking-tight text-white hover:text-[#F01B25] transition-colors flex items-center justify-between border-b border-white/5 pb-3 text-left w-full cursor-pointer"
            >
              <span>CONTACT</span>
              <ArrowUpRight className="w-5 h-5 text-zinc-600" />
            </button>
          </div>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-6 mt-6">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="w-full py-4 rounded-md bg-[#F01B25] text-white font-mono-tech font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#F01B25]/30 cursor-pointer"
          >
            Request A Quote
            <ArrowUpRight className="w-4 h-4" />
          </button>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono-tech text-zinc-400">
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
