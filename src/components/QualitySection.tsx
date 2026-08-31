import React, { useState } from 'react';
import { Shield, FileCheck, Check, Search, CheckCircle } from 'lucide-react';
import { MosaicWaves } from './MosaicWaves';

interface Certification {
  code: string;
  category: 'API' | 'ASME' | 'BS' | 'ISO/PED';
  description: string;
}

const CERTIFICATIONS: Certification[] = [
  { code: 'ASME B16.34', category: 'ASME', description: 'Valves Flanged, Threaded, and Welding End pressure-temperature ratings.' },
  { code: 'API 6A', category: 'API', description: 'Specification for Wellhead and Tree Equipment.' },
  { code: 'API 6D', category: 'API', description: 'Specification for Pipeline and Piping Valves.' },
  { code: 'API 594', category: 'API', description: 'Check Valves: Wafer, Lug-Wafer and Double-Flanged Type.' },
  { code: 'API 599', category: 'API', description: 'Metal Plug Valves - Flanged, Threaded and Welding Ends.' },
  { code: 'API 600', category: 'API', description: 'Steel Gate Valves - Flanged and Butt-welding Ends, Bolted Bonnets.' },
  { code: 'API 602', category: 'API', description: 'Gate, Globe, and Check Valves for Sizes DN 100 (NPS 4) and Smaller.' },
  { code: 'API 606/608', category: 'API', description: 'Metal Ball Valves - Flanged, Threaded and Welding Ends.' },
  { code: 'API 607', category: 'API', description: 'Fire Test for Quarter-turn Valves and Valves Equipped with Nonmetallic Seats.' },
  { code: 'API 609', category: 'API', description: 'Butterfly Valves: Double-Flanged, Lug- and Wafer-Type.' },
  { code: 'API 622', category: 'API', description: 'Type Testing of Process Valve Packing for Fugitive Emissions.' },
  { code: 'API 623', category: 'API', description: 'Steel Globe Valves - Flanged and Butt-welding Ends, Bolted Bonnets.' },
  { code: 'API 624', category: 'API', description: 'Type Testing of Rising Stem Valves Equipped with Graphite Packing for Fugitive Emissions.' },
  { code: 'BS 1868', category: 'BS', description: 'Specification for Steel Check Valves (Flanged and Butt-welding Ends) for Petroleum Industries.' },
  { code: 'BS 1873', category: 'BS', description: 'Specification for Steel Globe and Globe Stop and Check Valves.' },
  { code: 'BS 5351', category: 'BS', description: 'Specification for Steel Ball Valves for the Petroleum, Petrochemical and Allied Industries.' },
  { code: 'BS 5352', category: 'BS', description: 'Specification for Steel Wedge Gate, Globe and Check Valves 50 mm and Smaller.' },
  { code: 'EN-ISO 10204 3.1', category: 'ISO/PED', description: 'Inspection Certificate 3.1 validating metallic material origin & independent testing.' },
  { code: 'PED DIRECTIVE (module H) 97/23/EC', category: 'ISO/PED', description: 'European Pressure Equipment Directive full quality assurance.' },
  { code: 'ISO 9001', category: 'ISO/PED', description: 'Quality Management Systems requirements certified.' },
  { code: 'TR CU EAC 010', category: 'ISO/PED', description: 'Eurasian Customs Union Safety of Machinery and Equipment.' },
  { code: 'TR CU EAC 032', category: 'ISO/PED', description: 'Eurasian Customs Union Safety of Pressure Equipment.' },
];

export const QualitySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'API' | 'ASME' | 'BS' | 'ISO/PED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCerts, setShowAllCerts] = useState(false);

  const filtered = CERTIFICATIONS.filter((c) => {
    const matchesCat = activeCategory === 'ALL' || c.category === activeCategory;
    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const displayedCerts = showAllCerts ? filtered : filtered.slice(0, 6);

  return (
    <section id="quality" className="relative py-24 md:py-32 border-t border-white/10 text-white overflow-hidden">
      {/* Mosaic Waves animated canvas background */}
      <MosaicWaves
        tileSize={44}
        speed={0.42}
        amplitude={0.8}
        waveFreqX={0.072}
        waveFreqY={0.056}
        colors={['#040404','#0b0203','#130406','#1d0707','#270909','#310b0b','#3b0d0d','#240606','#170404','#0c0202','#060101']}
      />
      <div className="absolute top-1/4 right-1/3 w-[24rem] h-[24rem] bg-[#F01B25]/7 rounded-full blur-[160px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
              06 / TECHNICAL STANDARDS & CERTIFICATION
            </span>
            <h2 className="text-4xl sm:text-6xl font-grotesk font-extrabold text-white uppercase tracking-tight">
              QUALITY <br />
              <span className="text-zinc-500">CONSTRUCTION INDEX.</span>
            </h2>
          </div>

          <p className="text-sm font-outfit text-zinc-400 max-w-md leading-relaxed">
            Every valve, fitting, and pipe supplied by Tech Ener-G undergoes rigorous testing and compliance verification under international quality codes.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0A0A0A] p-4 rounded-xl border border-white/10">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search standard e.g. API 6D..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black border border-white/10 rounded-lg text-xs font-mono-tech text-white placeholder-zinc-500 focus:outline-none focus:border-[#F01B25]"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end">
            {(['ALL', 'API', 'ASME', 'BS', 'ISO/PED'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md font-mono-tech text-xs uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#F01B25] text-white font-bold'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Standards Index Grid */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedCerts.map((cert, index) => (
              <div
                key={index}
                className="p-5 rounded-lg bg-[#0A0A0A] border border-white/10 hover:border-[#F01B25]/50 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-grotesk font-bold text-lg text-white group-hover:text-[#F01B25] transition-colors">
                    {cert.code}
                  </span>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                    {cert.category}
                  </span>
                </div>
                <p className="text-xs font-outfit text-zinc-400 leading-relaxed">
                  {cert.description}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[#F01B25] pt-2 border-t border-white/5">
                  <CheckCircle className="w-3 h-3" /> Fully Compliant & Verified
                </div>
              </div>
            ))}
          </div>

          {/* SHOW ALL STANDARDS > Toggle Button */}
          {filtered.length > 6 && (
            <button
              onClick={() => setShowAllCerts(!showAllCerts)}
              className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>{showAllCerts ? 'SHOW BRIEF VIEW' : `SHOW ALL STANDARDS (${filtered.length} CERTIFICATIONS)`}</span>
              <FileCheck className="w-4 h-4 text-[#F01B25]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
