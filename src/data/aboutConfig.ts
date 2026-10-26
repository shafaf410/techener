import { AboutConfig } from '../types/about';

export const defaultAboutConfig: AboutConfig = {
  brand: {
    name: 'Tech Ener-G',
    subname: 'Trading FZE',
    tagline: 'Global Industrial & Engineering Supply Chain Solutions',
    logoUrl: '/logo.png',
    primaryColor: '#F01B25',
    accentColor: '#111111',
    location: 'United Arab Emirates',
    establishedYear: '2021',
  },
  hero: {
    eyebrow: 'WHO WE ARE',
    titleLine1: 'BUILT ON TRUST.',
    titleLine2: 'DRIVEN BY EXCELLENCE.',
    description:
      'With an experience of more than two decades, we deliver engineered products, systems and services that power progress across the industries that build our world.',
    backgroundImage: '/images/about/hero_bg.jpg',
    ctaQuoteText: 'REQUEST QUOTE',
    ctaScrollText: 'EXPLORE OUR STORY',
  },
  intro: {
    eyebrow: 'WHO WE ARE',
    statementStart: 'We deliver engineered products, systems and services that',
    statementHighlight: 'power progress',
    statementEnd: 'across the industries that build our world.',
    secondaryText:
      'Established in 2021, Tech Ener-G is a UAE-based industrial supply and engineering solutions provider. TET acts as a unique bridge between end users and leading global manufacturers, combining deep technical expertise with advanced technologies to meet evolving industrial demands across the Power Generation, Oil & Gas, Construction, and Infrastructure sectors.',
    stats: [
      {
        id: 'stat-exp',
        value: 50,
        suffix: '+',
        label: 'YEARS COMBINED EXP.',
        sublabel: 'Decades of seasoned engineering leadership',
      },
      {
        id: 'stat-est',
        value: 2001,
        prefix: '',
        label: 'HERITAGE ROOTS',
        sublabel: 'Incorporated as Tech Ener-G FZE in UAE',
      },
      {
        id: 'stat-clients',
        value: 350,
        suffix: '+',
        label: 'CLIENTS SERVED',
        sublabel: 'Across UAE, GCC, MENA, and international markets',
      },
      {
        id: 'stat-divisions',
        value: 6,
        label: 'SPECIALIZED DIVISIONS',
        sublabel: 'Mechanical, Flow Control, Valves, Filtration, E&I',
      },
      {
        id: 'stat-brands',
        value: 18,
        suffix: '+',
        label: 'GLOBAL OEM BRANDS',
        sublabel: 'Autel, Redfluid, and top-tier industrial partners',
      },
    ],
  },
  whyUs: {
    eyebrow: 'WHY US',
    title: 'YOUR PREFERRED PARTNER FOR ENGINEERING SOLUTIONS.',
    points: [
      {
        id: 'why-1',
        number: '01',
        title: 'Mission-Critical Reliability & Speed',
        description:
          'Proven track record delivering mission-critical supplies on-schedule, minimizing downtime in demanding offshore, energy, and utility installations.',
      },
      {
        id: 'why-2',
        number: '02',
        title: 'Comprehensive Multi-Division Sourcing',
        description:
          'Single-point procurement spanning industrial valves, high-pressure piping, instrumentation fittings, filtration, and reverse-engineered replacement components.',
      },
      {
        id: 'why-3',
        number: '03',
        title: 'Brand-Agnostic Integrity & QA Compliance',
        description:
          'Representing multiple global OEMs with certified ISO 9001 compliance, mill test certificates (MTC 3.1/3.2), and objective technical recommendation centered on your best interest.',
      },
    ],
  },
  coreValues: {
    eyebrow: 'CORE VALUES',
    title: 'PEOPLE, PROCESS, PERFORMANCE',
    subtitle:
      'At the core of our operations is an uncompromising commitment to engineering precision, global compliance, and client trust.',
    values: [
      {
        id: 'val-customer',
        title: 'CUSTOMER FOCUS',
        description:
          'Delivering tailored solutions with relentless dedication, rapid response cycles, and technical support across MENA and beyond.',
        iconName: 'focus',
      },
      {
        id: 'val-quality',
        title: 'QUALITY FIRST',
        description:
          '“Quality is the best business plan.” Every component undergoes strict QA/QC verification and certified OEM compliance standards.',
        iconName: 'quality',
      },
      {
        id: 'val-innovation',
        title: 'INNOVATION',
        description:
          'Pioneering modern supply chain analytics, custom reverse engineering, and lifecycle performance diagnostics for plant assets.',
        iconName: 'innovation',
      },
      {
        id: 'val-integrity',
        title: 'INTEGRITY',
        description:
          'Transparent, brand-agnostic partnerships built on honest pricing, certified origin provenance, and lasting reliability.',
        iconName: 'integrity',
      },
    ],
  },
  leadership: {
    eyebrow: 'LEADERSHIP',
    title: 'OUR LEADERSHIP',
    subtitle:
      'Guiding our growth with decades of global industrial experience and engineering mastery.',
    members: [
      {
        id: 'leader-1',
        name: 'ADEL SALEM',
        role: 'CHAIRMAN & FOUNDER',
        division: 'Board of Directors',
        image: '/images/about/leader_1.jpg',
        bio: 'Strategic visionary with over 30 years overseeing massive energy infrastructure and industrial supply networks across the Middle East.',
      },
      {
        id: 'leader-2',
        name: 'SAMPLE NAME',
        role: 'MANAGING DIRECTOR',
        division: 'Executive Management',
        image: '/images/about/leader_2.jpg',
        bio: 'Drives international growth, strategic OEM alliances, and client-centric engineering solutions throughout the MENA territory.',
      },
      {
        id: 'leader-3',
        name: 'KHALED HUSSEIN',
        role: 'VP, TECHNICAL SERVICES',
        division: 'Engineering & QA/QC',
        image: '/images/about/leader_3.jpg',
        bio: 'Senior mechanical engineer directing fluid dynamics, valve automation, reverse engineering, and on-site commissioning services.',
      },
      {
        id: 'leader-4',
        name: 'RAJESH SHARMA',
        role: 'DIRECTOR, GLOBAL SOURCING',
        division: 'Supply Chain & Flow Control',
        image: '/images/about/leader_4.jpg',
        bio: 'Logistics and procurement specialist managing global tier-1 supply relationships across Europe, North America, and Asia-Pacific.',
      },
    ],
    people: {
      eyebrow: 'OUR PEOPLE',
      title: 'OUR PEOPLE',
      description:
        'From certified mechanical engineers and metallurgy specialists to logistics masters, our 200+ team members are the backbone of our execution excellence.',
      departments: [
        'MECHANICAL ENGINEERING',
        'GLOBAL PROCUREMENT',
        'WAREHOUSING & LOGISTICS',
        'QA/QC & INSPECTION',
        'VALVE AUTOMATION',
        'FIELD COMMISSIONING',
      ],
    },
  },
  certifications: {
    eyebrow: 'QUALITY & ACCREDITATIONS',
    title: 'TRUSTED EVERY DAY',
    subtitle:
      'Holding internationally recognized accreditations, manufacturer authorizations, and ISO certifications for total operational confidence.',
    items: [
      {
        id: 'cert-api',
        code: 'API SPEC',
        name: 'American Petroleum Institute',
        authority: 'API Spec Q1 & 6D Certified',
        description: 'Certified pipeline valves, pressure boundary integrity, and severe-service manufacturing standards.',
        badgeType: 'api',
        verified: true,
      },
      {
        id: 'cert-iso9001',
        code: 'ISO 9001:2015',
        name: 'Quality Management System',
        authority: 'Bureau Veritas / TUV',
        description: 'End-to-end quality assurance for procurement, testing, stocking, and supply of engineering products.',
        badgeType: 'iso9001',
        verified: true,
      },
      {
        id: 'cert-iso14001',
        code: 'ISO 14001:2015',
        name: 'Environmental Management',
        authority: 'Accredited Registrar',
        description: 'Sustainable supply chain operations, environmental compliance, and waste reduction protocols.',
        badgeType: 'iso14001',
        verified: true,
      },
      {
        id: 'cert-iso45001',
        code: 'ISO 45001:2018',
        name: 'Occupational Health & Safety',
        authority: 'Certified Safety Standard',
        description: 'Zero-harm safety management across warehousing, on-site testing, and logistics operations.',
        badgeType: 'iso45001',
        verified: true,
      },
      {
        id: 'cert-ce',
        code: 'CE / PED',
        name: 'Pressure Equipment Directive',
        authority: 'Directive 2014/68/EU',
        description: 'Compliant pressurized equipment and fluid handling systems certified for European and international projects.',
        badgeType: 'ce',
        verified: true,
      },
      {
        id: 'cert-oem',
        code: 'OEM PARTNER',
        name: 'Autel & Redfluid Official',
        authority: 'Authorised Regional Partner',
        description: 'Direct manufacturer authorization for high-pressure valves, filtration systems, and genuine spare parts.',
        badgeType: 'oem',
        verified: true,
      },
    ],
    cardDeckTitle: 'VERIFIED CERTIFICATION DECK',
    cardDeckSubtitle: 'Click or hover to inspect certified quality credentials and manufacturer authorisations',
  },
  timeline: {
    eyebrow: 'OUR JOURNEY',
    title: 'SEE HOW WE GOT HERE',
    subtitle:
      'A trajectory defined by technical resilience, strategic partnerships, and continuous regional expansion.',
    milestones: [
      {
        year: '1973',
        title: 'Foundational Heritage',
        summary:
          'Origins in heavy industrial supply and regional industrial engineering trading across the Middle East.',
        highlight: 'Legacy roots in high-spec piping and flow management.',
      },
      {
        year: '2001',
        title: 'Regional Procurement Hub',
        summary:
          'Expanded supply operations and warehousing footprint to serve cross-border Gulf utility and energy operators.',
        highlight: 'Over 100+ industrial supply agreements executed.',
      },
      {
        year: '2021',
        title: 'Tech Ener-G Incorporation',
        summary:
          'Established in UAE as Tech Ener-G Trading FZE, unifying engineering services with high-tech supply chain distribution.',
        highlight: 'Launched dedicated specialized technical divisions.',
      },
      {
        year: '2022',
        title: 'Flow Control & Valve Division',
        summary:
          'Scale-up of specialized valve automation, instrumentation manifolds, and severe-service fluid handling lines.',
        highlight: 'Broadened stock holding in UAE logistics center.',
      },
      {
        year: '2023',
        title: 'Autel & Redfluid Partnerships',
        summary:
          'Secured official regional distribution and technical support agreements with leading European OEMs Autel and Redfluid.',
        highlight: 'Direct factory-backed warranty and calibration support.',
      },
      {
        year: '2024',
        title: 'ISO 9001:2015 Accreditation',
        summary:
          'Attained full ISO Quality Management certification and completed major reverse engineering pilot projects for energy plants.',
        highlight: 'Over 350+ clients served across MENA, Europe, and Asia.',
      },
      {
        year: 'TODAY',
        title: 'The Trusted Engineering Bridge',
        summary:
          'Operating as the premier value-driven partner connecting end users with world-class manufacturers for sustainable industrial progress.',
        highlight: 'Continuous 24/7 technical and procurement delivery.',
      },
    ],
  },
  footer: {
    contactEmail: 'sales@techener.com',
    contactPhone: '+971 4 000 0000',
    headquarters: 'Tech Ener-G Trading FZE, United Arab Emirates',
    regionalPresence: ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain'],
    isoText: 'ISO 9001:2015 Certified Organization • API & CE Compliant',
    copyrightText: '© Tech Ener-G Trading FZE. All rights reserved.',
  },
};
