import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DivisionItem } from './DivisionModal';

export const DIVISIONS_DATA: DivisionItem[] = [
  {
    id: 'mechanical-division',
    number: '01',
    title: 'Mechanical Division',
    tagline: 'Heavy Industrial Machinery, Piping & Mechanical Components',
    description: 'Providing comprehensive mechanical equipment, rotating machinery, high-yield piping, fittings, valves, and specialized oilfield tools engineered for extreme industrial environments.',
    image: '/images/pipes_fittings.jpg',
    items: [
      'Pump, Compressor, Heat exchanger',
      'Gear boxes, coupling, bearing',
      'Pipes, flanges and fittings',
      'Industrial Valves',
      'Adapters & Accessories',
      'Sour Gas & Oil Field Equipments',
      'Industrials tools and equipments.'
    ]
  },
  {
    id: 'instrumentation-fluid-solutions',
    number: '02',
    title: 'Instrumentation & Fluid Solutions',
    tagline: 'Precision Measurement, Process Control & Sensing Equipment',
    description: 'High-precision fluid handling instrumentation, calibration tools, actuators, pressure/temperature/flow/level sensors, and dangerous gas detection systems.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    items: [
      'Instrumentation Valves & Equipment',
      'Impulse Lines & Tubing',
      'Low, Medium & High Pressure Equipment & Fittings',
      'Manifolds',
      'Calibration Equipment',
      'Air & Hydraulic Actuators',
      'Temperature Sensors',
      'Pressure Instruments - RTD & Thermocouples',
      'Flow Instruments - Electromagnetic flow meters, Ultrasonic clamp-on meters, Turbine flow meters, Coriolis mass flow meters',
      'Level Instruments - Radar level transmitters, Ultrasonic level sensors, Float switches',
      'Gas Detectors, Ventilation Sensors & Multi-gas Analyzers.'
    ]
  },
  {
    id: 'flow-control-division',
    number: '03',
    title: 'Flow Control Division',
    tagline: 'Pipeline Valves, Pressure Regulation & Actuation Architecture',
    description: 'Complete flow isolation and pressure regulation solutions including control valves, safety relief valves, positioners, dampers, and inline strainers for energy infrastructure.',
    image: '/images/industrial_valves.jpg',
    items: [
      'Pipeline valves',
      'Control valves',
      'Pressure Relief Valves (PRV) and Safety Relief Valves (SRV)',
      'Actuators & Positioners',
      'Flow Meters & Sensors',
      'Regulators & Dampers',
      'Strainers & Filters'
    ]
  },
  {
    id: 'electrical-instrumentation-division',
    number: '04',
    title: 'Electrical & Instrumentation Division',
    tagline: 'Motors, Control Systems, Flame Detection & Power Architecture',
    description: 'Industrial electric motors, transformers, turbomachinery controls, flame/gas sensors for gas turbines & boilers, PLCs, relays, and Ex-d explosion-proof enclosures.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    items: [
      'Motors, Generators, Transformers',
      'Flame Sensors and Gas detectors for Gas Turbines and other Fire Process Equipment like Boilers and Burners',
      'Vibration Transducers / Sensors',
      'Limit Switches & Feedback Sensors',
      'PLCs and Control System Equipments',
      'Turbo Machinery/Compressor Controls System',
      'Generator Control, protection/ Excitation System',
      'Flow sensors, Battery systems',
      'Relays, Ex-d enclosures, detectors'
    ]
  },
  {
    id: 'filtration-division',
    number: '05',
    title: 'Filtration Division',
    tagline: 'Hydraulic, Gas, Water & Process Separation Technologies',
    description: 'Advanced separation and filtration systems spanning hydraulic/lube oil filters, HEPA air intake filters, gas scrubbers, water cartridge/membrane filters, and industrial dust collectors.',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1000&q=80',
    items: [
      'Hydraulic & Lubrication Filtration - Hydraulic Oil Filters, Lube Oil Filters, Duplex Filters, Magnetic Filters',
      'Air & Gas Filtration - Air Intake Filters, HEPA & ULPA Filters, Activated Carbon Filters, Coalescing Filters Gas Scrubbers',
      'Water & Process Filtration - Sand Filters, Cartridge Filters, Bag Filters, Membrane Filters',
      'Fuel Filtration - Diesel Fuel Filters, Fuel Water Separators, Spin-On Filters',
      'Specialty Industrial Filtration - Dust Collectors, Cyclone Separators, Electrostatic Precipitators, Baghouse Filters, Inline Strainers'
    ]
  }
];

interface DivisionsSectionProps {
  onSelectDivision: (division: DivisionItem) => void;
}

export const DivisionsSection: React.FC<DivisionsSectionProps> = ({ onSelectDivision }) => {
  const [activeDivision, setActiveDivision] = useState<DivisionItem>(DIVISIONS_DATA[0]);

  return (
    <section id="divisions" className="relative py-20 lg:py-28 bg-gradient-to-b from-[#0c0507] via-[#1a080d] to-[#0a060d] animate-mesh-bg border-t border-white/10 flex flex-col justify-center min-h-screen text-white overflow-hidden">
      {/* Animated Color-Shifting Ambient Orbs */}
      <div className="absolute top-1/3 -right-36 w-[32rem] h-[32rem] bg-[#F01B25]/20 rounded-full blur-[160px] pointer-events-none animate-orb-2" />
      <div className="absolute bottom-1/3 -left-36 w-[32rem] h-[32rem] bg-[#7A000A]/25 rounded-full blur-[170px] pointer-events-none animate-orb-1" />
      <div className="absolute inset-0 grid-bg-overlay opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse" />
              03 / TECH ENER-G DIVISIONS
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight leading-none">
              OUR 5 CORE <br />
              <span className="text-zinc-500">INDUSTRIAL DIVISIONS.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-outfit text-zinc-400 max-w-md leading-relaxed">
            Tech Ener-G operates across 5 specialized divisions supplying certified equipment, precision instrumentation, flow control, electrical systems, and filtration technologies.
          </p>
        </div>

        {/* Interactive Divisions Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left List of 5 Divisions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {DIVISIONS_DATA.map((division) => (
                <div
                  key={division.id}
                  onMouseEnter={() => setActiveDivision(division)}
                  onClick={() => onSelectDivision(division)}
                  className={`group py-5 px-5 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    activeDivision.id === division.id
                      ? 'bg-white/5 border-l-4 border-l-[#F01B25] pl-6'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="font-mono-tech text-sm font-bold text-[#F01B25]">
                      {division.number}
                    </span>
                    <div>
                      <h3
                        className={`font-grotesk text-lg md:text-xl font-bold uppercase transition-all duration-300 ${
                          activeDivision.id === division.id
                            ? 'text-white translate-x-1'
                            : 'text-zinc-300 group-hover:text-white'
                        }`}
                      >
                        {division.title}
                      </h3>
                      <p className="text-xs font-outfit text-zinc-500 group-hover:text-zinc-400 transition-colors line-clamp-1 mt-0.5">
                        {division.items.length} Scope Categories • {division.items[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block text-[10px] font-mono-tech text-zinc-500 group-hover:text-[#F01B25] uppercase transition-colors">
                      VIEW DIVISION PAGE
                    </span>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        activeDivision.id === division.id
                          ? 'text-[#F01B25] opacity-100 translate-x-1 -translate-y-1'
                          : 'text-zinc-600 opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Live Image-Centric Division Preview Box */}
          <div className="lg:col-span-5">
            <div className="relative h-[480px] lg:h-[520px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl red-border-glow flex flex-col justify-between p-6 sm:p-8 group">
              {/* Animated Background Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeDivision.id}
                  src={activeDivision.image}
                  alt={activeDivision.title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover object-center transform-gpu transition-transform duration-700 group-hover:scale-105"
                />
              </AnimatePresence>

              {/* Gradient Vignette Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#F01B25] animate-pulse" />
                  <span className="text-[11px] font-mono-tech text-white font-bold tracking-wider uppercase">
                    DIVISION {activeDivision.number}
                  </span>
                </div>

                <span className="text-[10px] font-mono-tech bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-white uppercase font-semibold border border-white/15">
                  CLICK FOR FULL DETAILS
                </span>
              </div>

              {/* Floating Bottom Content Overlay */}
              <div className="relative z-10 space-y-4 pt-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                    TECH ENER-G DIVISION
                  </span>
                  <h3 className="text-2xl md:text-3xl font-grotesk font-extrabold text-white uppercase leading-tight drop-shadow-lg">
                    {activeDivision.title}
                  </h3>
                </div>

                <p className="text-xs font-outfit text-zinc-200 leading-relaxed font-light drop-shadow line-clamp-2">
                  {activeDivision.description}
                </p>

                {/* Scope Highlights Preview */}
                <div className="space-y-1.5 pt-3 border-t border-white/15">
                  <div className="text-[10px] font-mono-tech text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#F01B25]" /> Scope Highlights ({activeDivision.items.length} Total):
                  </div>
                  <ul className="grid grid-cols-1 gap-1">
                    {activeDivision.items.slice(0, 3).map((item, i) => (
                      <li key={i} className="text-xs font-outfit text-zinc-200 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F01B25] shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Open Division Page Button */}
                <button
                  onClick={() => onSelectDivision(activeDivision)}
                  className="w-full py-3.5 rounded-xl bg-[#F01B25] hover:bg-white hover:text-black font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#F01B25]/30 active:scale-95"
                >
                  Explore Division Page & Specifications
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
