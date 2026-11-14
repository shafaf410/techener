export interface MechanicalProduct {
  id: string;
  category: 'pumps' | 'compressors' | 'heat-exchangers';
  title: string;
  tag: string;
  image: string;
  description: string;
  specs: Record<string, string>;
}

export interface MechanicalCategory {
  id: 'pumps' | 'compressors' | 'heat-exchangers';
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tagline: string;
  stats: { label: string; value: string }[];
  products: MechanicalProduct[];
}

export const MECHANICAL_PRODUCTS: MechanicalProduct[] = [
  {
    "category": "pumps",
    "id": "vane-pumps",
    "title": "Vane Pumps",
    "file": "image1.png",
    "ext": "png",
    "tag": "Positive Displacement",
    "description": "High-efficiency positive displacement rotary vane pumps designed for low-to-medium viscosity fluids, clean fuels, solvents, and petrochemical transfer applications.",
    "specs": {
      "Operating Principle": "Sliding Vane Rotary Displacement",
      "Max Flow Rate": "Up to 2,200 LPM (580 GPM)",
      "Max Differential Pressure": "Up to 14 bar (200 PSI)",
      "Operating Temperature": "-32°C to +150°C",
      "Viscosity Range": "0.2 to 20,000 cSt",
      "Compliance Standards": "API 676, ATEX Zone 1/2"
    },
    "image": "/images/mechanical/vane-pumps.png"
  },
  {
    "category": "pumps",
    "id": "centrifugal-pumps",
    "title": "Centrifugal Pumps",
    "file": "image2.webp",
    "ext": "webp",
    "tag": "Continuous Flow",
    "description": "Heavy-duty single and multistage centrifugal pumps engineered to API 610 standards for high-volume hydrocarbon processing, refining, and industrial water circulation.",
    "specs": {
      "Configuration": "End Suction / Overhung / Between Bearings",
      "Flow Capacity": "Up to 12,000 m³/hr",
      "Total Dynamic Head": "Up to 450 m",
      "Design Pressure": "ANSI Class 150 - 900",
      "Impeller Types": "Enclosed, Semi-Open, Vortex",
      "Compliance Standards": "API 610 (OH2/BB2/BB3), ISO 5199"
    },
    "image": "/images/mechanical/centrifugal-pumps.webp"
  },
  {
    "category": "pumps",
    "id": "turbine-pumps",
    "title": "Turbine Pumps",
    "file": "image3.jpg",
    "ext": "jpg",
    "tag": "High Head Kinetic",
    "description": "Regenerative and vertical turbine pumps delivering exceptionally high discharge heads at low-to-medium flow rates for boiler feed, cooling towers, and deep sump extraction.",
    "specs": {
      "Type": "Vertical Turbine / Regenerative Turbine",
      "Discharge Head": "Up to 600 m",
      "Flow Rate": "Up to 4,500 m³/hr",
      "Setting Depth": "Up to 100 m submersion length",
      "Materials": "Cast Iron, Bronze, 316SS, Duplex Stainless",
      "Compliance Standards": "API 610 (VS1 / VS4), NFPA 20"
    },
    "image": "/images/mechanical/turbine-pumps.jpg"
  },
  {
    "category": "pumps",
    "id": "ac-dc-pumps",
    "title": "AC/DC Pumps",
    "file": "image4.jpeg",
    "ext": "jpg",
    "tag": "Mobile & Remote Duty",
    "description": "Compact, battery-compatible DC and single/three-phase AC fuel and fluid transfer pump units designed for mobile service trucks, remote wellheads, and emergency utility transfer.",
    "specs": {
      "Power Supply": "12V DC, 24V DC, 115V AC, 230/400V AC",
      "Flow Rates": "35 LPM to 120 LPM",
      "Duty Cycle": "Continuous / 30-min intermittent rated",
      "Inlet / Outlet": "1\" to 1.5\" NPT / BSPP",
      "Ingress Protection": "IP55 / IP67 Weatherproof",
      "Certifications": "UL, ATEX, IECEx Explosion Proof"
    },
    "image": "/images/mechanical/ac-dc-pumps.jpg"
  },
  {
    "category": "pumps",
    "id": "chemical-transfer-pumps",
    "title": "Chemical Transfer Pumps",
    "file": "image5.jpg",
    "ext": "jpg",
    "tag": "Corrosive & Aggressive Media",
    "description": "Sealless magnetic drive and non-metallic lined pumps engineered to guarantee 100% leak-free containment when handling hazardous acids, alkalis, and reactive process chemicals.",
    "specs": {
      "Drive Mechanism": "Magnetic Drive (Sealless) / Mechanical Seal",
      "Wetted Materials": "PVDF, ETFE, PFA lined, Hastelloy-C",
      "Design Temperature": "-40°C to +180°C",
      "Max Specific Gravity": "Up to 2.1 SG",
      "Flow Capacity": "Up to 350 m³/hr",
      "Compliance Standards": "ISO 2858, ASME B73.3"
    },
    "image": "/images/mechanical/chemical-transfer-pumps.jpg"
  },
  {
    "category": "pumps",
    "id": "gear-pumps",
    "title": "Gear Pumps",
    "file": "image6.png",
    "ext": "png",
    "tag": "High Viscosity Metering",
    "description": "Precision external and internal gear pumps engineered for metering, dosing, and transferring high-viscosity viscous media such as lube oils, polymers, bitumen, and resins.",
    "specs": {
      "Gear Geometry": "External Spur / Helical / Internal Crescent",
      "Max Viscosity": "Up to 1,000,000 cSt",
      "Discharge Pressure": "Up to 35 bar (500 PSI)",
      "Flow Range": "0.5 to 600 LPM",
      "Heating Options": "Integral steam / thermal fluid jackets",
      "Compliance Standards": "API 676, ISO 9001"
    },
    "image": "/images/mechanical/gear-pumps.png"
  },
  {
    "category": "pumps",
    "id": "dosing-pumps",
    "title": "Dosing Pumps",
    "file": "image7.webp",
    "ext": "webp",
    "tag": "Precision Chemical Injection",
    "description": "Micro-metering diaphragm and plunger dosing pumps providing ultra-accurate stoichiometric chemical injection for water treatment, corrosion inhibition, and refinery catalysis.",
    "specs": {
      "Dosing Accuracy": "± 1% steady state accuracy",
      "Flow Rate Range": "0.1 LPM to 3,500 LPH per head",
      "Max Injection Pressure": "Up to 500 bar (7,250 PSI)",
      "Control Options": "4-20mA, Modbus, Stroke Length Actuator",
      "Liquid End Material": "SS316L, Hastelloy, Titanium, PTFE",
      "Compliance Standards": "API 675 Metering Standard"
    },
    "image": "/images/mechanical/dosing-pumps.webp"
  },
  {
    "category": "pumps",
    "id": "screw-pumps",
    "title": "Screw Pumps",
    "file": "image8.jpg",
    "ext": "jpg",
    "tag": "Low Shear Multiphase",
    "description": "Twin-screw and three-screw self-priming positive displacement pumps engineered for pulsation-free, low-shear pumping of crude oils, bunker fuels, and multiphase mixtures.",
    "specs": {
      "Screw Configuration": "2-Screw (External Bearing) / 3-Screw",
      "Delivery Pressure": "Up to 100 bar (1,450 PSI)",
      "Flow Rate": "Up to 2,500 m³/hr",
      "Multiphase Gas Volume": "Handles GVF up to 95%",
      "Casing Liners": "Hardened alloys, ceramic coatings",
      "Compliance Standards": "API 676"
    },
    "image": "/images/mechanical/screw-pumps.jpg"
  },
  {
    "category": "pumps",
    "id": "hydraulic-pumps",
    "title": "Hydraulic Pumps",
    "file": "image9.bin",
    "ext": "webp",
    "tag": "High Pressure Power",
    "description": "Variable displacement axial piston and robust gear hydraulic pumps engineered for heavy machinery fluid power circuits, offshore cranes, and industrial press systems.",
    "specs": {
      "Displacement Type": "Variable Swashplate Axial Piston / Fixed Gear",
      "Operating Pressure": "Nominal 350 bar / Peak 420 bar (6,000 PSI)",
      "Speed Range": "500 to 3,600 RPM",
      "Displacement Volume": "18 cc to 500 cc/rev",
      "Control Modes": "Load Sensing, Pressure Cut-off, Power Control",
      "Fluid Compatibility": "Mineral oil, synthetic esters, water-glycol"
    },
    "image": "/images/mechanical/hydraulic-pumps.webp"
  },
  {
    "category": "pumps",
    "id": "submersible-pumps",
    "title": "Submersible Pumps",
    "file": "image10.jpg",
    "ext": "jpg",
    "tag": "Subsea & Deep Well",
    "description": "Heavy cast industrial submersible slurry and drainage pumps engineered to operate continuously submerged in deep sumps, municipal dewatering, and harsh sludge lagoons.",
    "specs": {
      "Impeller Type": "Non-Clog Vortex / Cutter / High Chrome Slurry",
      "Max Solids Passage": "Up to 100 mm spherical solids",
      "Submergence Depth": "Up to 30 m continuous",
      "Motor Rating": "1.5 kW to 150 kW (Class H Insulation)",
      "Cable Protection": "Triple seal moisture barrier & thermal sensors",
      "Compliance Standards": "IEC / ATEX Submersible Approved"
    },
    "image": "/images/mechanical/submersible-pumps.jpg"
  },
  {
    "category": "compressors",
    "id": "piston-compressor",
    "title": "Piston Compressor",
    "file": "image11.jpg",
    "ext": "jpg",
    "tag": "Reciprocating High Pressure",
    "description": "Single and multi-stage heavy-duty reciprocating piston compressors built for high-ratio compression of air, nitrogen, methane, and hydrogen in severe utility duty.",
    "specs": {
      "Compression Stages": "1, 2, 3 and 4 Stage configurations",
      "Discharge Pressure": "7 bar to 350 bar (5,000 PSI)",
      "Capacity Range": "10 to 1,500 Nm³/hr",
      "Cylinder Lubrication": "Lubricated or 100% Non-Lubricated (Dry)",
      "Drive Arrangement": "V-Belt / Direct Coupled Electric or Diesel",
      "Compliance Standards": "API 618 / ISO 13631"
    },
    "image": "/images/mechanical/piston-compressor.jpg"
  },
  {
    "category": "compressors",
    "id": "screw-air-compressor",
    "title": "Screw Air Compressor",
    "file": "image12.png",
    "ext": "png",
    "tag": "Continuous Industrial Air",
    "description": "Oil-injected rotary screw air compressor packages featuring precision-profile rotor elements, integrated air treatment, and variable speed drive (VSD) smart control.",
    "specs": {
      "Rotor Profile": "Asymmetric 5/6 Male/Female Lobe Design",
      "Power Range": "7.5 kW to 355 kW (10 HP to 480 HP)",
      "Operating Pressure": "7.5 bar, 8.5 bar, 10 bar, 13 bar",
      "Air Delivery (FAD)": "1.2 m³/min to 62 m³/min",
      "Cooling Method": "Air-Cooled / Water-Cooled Package",
      "Control System": "PLC touchscreen with remote IoT telemetry"
    },
    "image": "/images/mechanical/screw-air-compressor.png"
  },
  {
    "category": "compressors",
    "id": "centrifugal-compressor",
    "title": "Centrifugal Compressor",
    "file": "image13.png",
    "ext": "png",
    "tag": "Large Volume Dynamic",
    "description": "Multi-stage integrally geared and horizontally split centrifugal compressors delivering massive continuous volume for air separation, petrochem cracking, and natural gas pipelines.",
    "specs": {
      "Stage Design": "Integrally Geared Multi-Pinion / In-Line",
      "Flow Rate": "3,000 to 300,000 m³/hr",
      "Pressure Ratios": "Up to 100 bar discharge",
      "Impeller Material": "Forged Titanium / 17-4PH Stainless Steel",
      "Shaft Seals": "Dry Gas Mechanical Seals with nitrogen barrier",
      "Compliance Standards": "API 617, API 614 Lube Oil System"
    },
    "image": "/images/mechanical/centrifugal-compressor.png"
  },
  {
    "category": "compressors",
    "id": "diesel-portable-compressor",
    "title": "Diesel Portable Compressor",
    "file": "image14.webp",
    "ext": "webp",
    "tag": "Rugged Site Operations",
    "description": "Towable heavy-chassis diesel-driven rotary screw air compressors engineered for sandblasting, pipeline pressure testing, drilling rigs, and remote construction sites.",
    "specs": {
      "Engine Provider": "Cummins / Caterpillar / Perkins Tier 3 / Tier 4",
      "Working Pressure": "7 bar to 25 bar (100 to 365 PSI)",
      "Air Flow": "175 CFM to 1,600 CFM (5 to 45 m³/min)",
      "Ambient Capability": "Engineered for up to +55°C desert conditions",
      "Chassis": "Dual-Axle Heavy Towing with overrun brakes",
      "Canopy": "Sound-attenuated weatherproof galvanized steel"
    },
    "image": "/images/mechanical/diesel-portable-compressor.webp"
  },
  {
    "category": "compressors",
    "id": "booster-compressor",
    "title": "Booster Compressor",
    "file": "image15.jpeg",
    "ext": "jpg",
    "tag": "Gas & Air Amplification",
    "description": "High-pressure booster units that elevate standard plant compressed air or bottled nitrogen up to ultra-high pressures for PET bottle blowing, leak testing, and laser cutting.",
    "specs": {
      "Inlet Pressure": "3 bar to 10 bar plant air",
      "Discharge Pressure": "Up to 40 bar / 300 bar",
      "Gas Types": "Air, Nitrogen, Argon, Helium",
      "Cooling Stages": "Inter-stage and after-stage air heat exchangers",
      "Piston Rings": "Filled PTFE high-pressure rings",
      "Safety Features": "Burst disk, electronic high-pressure relief"
    },
    "image": "/images/mechanical/booster-compressor.jpg"
  },
  {
    "category": "compressors",
    "id": "oil-free-screw-compressor",
    "title": "Oil-Free Screw Compressor",
    "file": "image16.png",
    "ext": "png",
    "tag": "Class Zero Clean Air",
    "description": "Two-stage dry screw compressors with food-grade rotor coatings guaranteeing 100% oil-free Class Zero air for pharmaceuticals, food processing, and microelectronics.",
    "specs": {
      "Air Quality": "ISO 8573-1 Class 0 (100% Oil Free)",
      "Power Rating": "37 kW to 315 kW",
      "Rotor Coating": "UltraCoat thermal bonded Teflon coating",
      "Gearbox Sealing": "Labyrinth seals with atmospheric bleed",
      "Noise Level": "Under 72 dB(A) acoustic enclosure",
      "Standards Compliance": "ISO 8573-1 Class 0, CE, ASME"
    },
    "image": "/images/mechanical/oil-free-screw-compressor.png"
  },
  {
    "category": "compressors",
    "id": "blowers",
    "title": "Blowers",
    "file": "image17.png",
    "ext": "png",
    "tag": "High Flow Low Pressure",
    "description": "Tri-lobe positive displacement roots blowers and high-speed turbo blowers engineered for aeration basins, pneumatic powder conveying, and furnace blast air.",
    "specs": {
      "Operating Principle": "Tri-Lobe Roots / Direct-Drive High Speed Turbo",
      "Pressure Range": "0.3 bar to 1.0 bar (4.5 to 14.5 PSI)",
      "Air Flow Capacity": "100 m³/hr to 25,000 m³/hr",
      "Bearings": "Air Foil magnetic bearings (Turbo) / Spherical roller",
      "Pulsation Dampening": "Integral reactive silencers",
      "Energy Efficiency": "Up to 35% energy savings over traditional roots"
    },
    "image": "/images/mechanical/blowers.png"
  },
  {
    "category": "compressors",
    "id": "fans",
    "title": "Industrial Fans",
    "file": "image18.jpg",
    "ext": "jpg",
    "tag": "Process Ventilation",
    "description": "Heavy centrifugal and axial flow process fans built to handle high-temperature corrosive gases, dust-laden exhausts, and large-scale industrial ventilation.",
    "specs": {
      "Fan Types": "Centrifugal (Backward Curved, Radial Tip) / Vane Axial",
      "Impeller Diameter": "Up to 3,500 mm",
      "Process Gas Temp": "Up to +650°C continuous",
      "Static Pressure": "Up to 25,000 Pa",
      "Housing Construction": "Heavy welded carbon steel, Corten, Inconel",
      "Balancing Grade": "ISO 1940 Grade G2.5 precision balanced"
    },
    "image": "/images/mechanical/fans.jpg"
  },
  {
    "category": "heat-exchangers",
    "id": "shell-tube-type",
    "title": "Shell & Tube Heat Exchanger",
    "file": "image19.webp",
    "ext": "webp",
    "tag": "High Pressure Thermal Transfer",
    "description": "Custom engineered TEMA class shell and tube heat exchangers built for severe refining processes, high-pressure gas cooling, and extreme temperature thermal recovery.",
    "specs": {
      "TEMA Configuration": "AES, BEM, BEU, CFU, AKT, NEN classes",
      "Shell Diameter": "Up to 2,500 mm",
      "Design Pressure": "Full vacuum up to 300 bar (4,350 PSI)",
      "Design Temperature": "-196°C (cryogenic) to +650°C",
      "Tube Materials": "Titanium, Super Duplex, Copper-Nickel, Incoloy",
      "Compliance Standards": "ASME Sec VIII Div 1 & 2, TEMA R/C/B, API 660"
    },
    "image": "/images/mechanical/shell-tube-type.webp"
  },
  {
    "category": "heat-exchangers",
    "id": "spiral-plate-type",
    "title": "Spiral Plate Heat Exchanger",
    "file": "image20.jpeg",
    "ext": "jpg",
    "tag": "Sludge & Heavy Fouling",
    "description": "Circular single-channel spiral heat exchangers designed with self-cleaning flow paths that handle high-fouling slurries, wastewater sludge, and viscous condensates without clogging.",
    "specs": {
      "Flow Channel": "Single Curved Concentric Rectangular Channel",
      "Heat Transfer Surface": "Up to 450 m² in single unit",
      "Design Pressure": "Full vacuum to 30 bar",
      "Design Temperature": "-50°C to +400°C",
      "Self-Cleaning Effect": "High shear turbulence scrubs deposits away",
      "Compliance Standards": "ASME VIII, EN 13445"
    },
    "image": "/images/mechanical/spiral-plate-type.jpg"
  },
  {
    "category": "heat-exchangers",
    "id": "plate-type",
    "title": "Plate Heat Exchanger",
    "file": "image21.jpg",
    "ext": "jpg",
    "tag": "Ultra-Compact Modular",
    "description": "Gasketed and semi-welded plate and frame heat exchangers providing maximum thermal efficiency, low approach temperatures, and compact footprint for HVAC and chemical cooling.",
    "specs": {
      "Plate Types": "Corrugated Herringbone Pattern Plates",
      "Plate Thickness": "0.4 mm to 0.8 mm for fast heat transfer",
      "Gasket Materials": "NBR, EPDM, FKM (Viton), PTFE encapsulated",
      "Connection Sizes": "DN25 (1\") to DN500 (20\")",
      "Design Pressure": "Up to 25 bar (360 PSI)",
      "Compliance Standards": "ASME Sec VIII, AHRI Certified, PED 2014/68/EU"
    },
    "image": "/images/mechanical/plate-type.jpg"
  },
  {
    "category": "heat-exchangers",
    "id": "air-cooled-type",
    "title": "Air Cooled Heat Exchanger",
    "file": "image22.jpg",
    "ext": "jpg",
    "tag": "Fin-Fan Ambient Cooling",
    "description": "Forced and induced draft fin-fan air-cooled heat exchangers (ACHE) engineered for water-scarce desert environments, condensing turbine exhaust, and gas dehydration cooling.",
    "specs": {
      "Draft Configuration": "Forced Draft / Induced Draft with auto-variable pitch fans",
      "Fin Tube Types": "Extruded, Embedded (G-Fin), L-Foot, Welded Low-Fin",
      "Tube Bundle Length": "Up to 14 meters",
      "Design Pressure": "Up to 350 bar (5,000 PSI)",
      "Header Box Types": "Plug Type, Cover Plate Type, Pipe Header",
      "Compliance Standards": "API 661 (ISO 13706), ASME VIII Div 1"
    },
    "image": "/images/mechanical/air-cooled-type.jpg"
  }
];

export const MECHANICAL_CATEGORIES: MechanicalCategory[] = [
  {
    id: 'pumps',
    number: '01',
    title: 'Pumps',
    subtitle: 'Industrial Pumping Solutions',
    tagline: 'High-Integrity Fluid Handling & Rotary Displacement Systems',
    description: 'Precision engineered pumps compliant with API 610, API 676, and ISO standards, ensuring reliable transfer of hydrocarbons, corrosive chemicals, and high-viscosity slurries.',
    image: '/images/mechanical/centrifugal-pumps.webp',
    stats: [
      { label: 'Flow Capacity', value: '12,000 m³/h' },
      { label: 'Standards', value: 'API 610 / 676' },
      { label: 'Configurations', value: '10 Sub-Types' }
    ],
    products: MECHANICAL_PRODUCTS.filter(p => p.category === 'pumps')
  },
  {
    id: 'compressors',
    number: '02',
    title: 'Compressors',
    subtitle: 'Gas & Air Compression Packages',
    tagline: 'Heavy Industrial Compression From Utility Air to High-Pressure Gas',
    description: 'Engineered compression systems including oil-free screw, reciprocating piston, dynamic centrifugal, and rugged portable diesel units designed for non-stop industrial duty.',
    image: '/images/mechanical/centrifugal-compressor.png',
    stats: [
      { label: 'Pressure Range', value: 'Up to 350 bar' },
      { label: 'Standards', value: 'API 617 / 618' },
      { label: 'Configurations', value: '8 Sub-Types' }
    ],
    products: MECHANICAL_PRODUCTS.filter(p => p.category === 'compressors')
  },
  {
    id: 'heat-exchangers',
    number: '03',
    title: 'Heat Exchangers',
    subtitle: 'Process Thermal Systems',
    tagline: 'Advanced Thermal Transfer & Heat Recovery Equipment',
    description: 'TEMA and API 660 compliant shell & tube, compact plate, anti-fouling spiral, and ambient fin-fan air-cooled heat exchangers maximizing thermal efficiency.',
    image: '/images/mechanical/shell-tube-type.webp',
    stats: [
      { label: 'Design Pressure', value: 'Up to 300 bar' },
      { label: 'Standards', value: 'ASME / TEMA / API 660' },
      { label: 'Configurations', value: '4 Sub-Types' }
    ],
    products: MECHANICAL_PRODUCTS.filter(p => p.category === 'heat-exchangers')
  }
];
