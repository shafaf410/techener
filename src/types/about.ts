export interface StatisticItem {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
}

export interface WhyUsPoint {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface CoreValueItem {
  id: string;
  title: string;
  description: string;
  iconName: 'focus' | 'quality' | 'innovation' | 'integrity';
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  division?: string;
  image: string;
  bio?: string;
}

export interface CertificationItem {
  id: string;
  code: string;
  name: string;
  authority: string;
  description: string;
  badgeType: 'api' | 'iso9001' | 'iso14001' | 'iso45001' | 'ce' | 'oem';
  verified: boolean;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  summary: string;
  highlight?: string;
}

export interface AboutConfig {
  brand: {
    name: string;
    subname: string;
    tagline: string;
    logoUrl: string;
    primaryColor: string;
    accentColor: string;
    location: string;
    establishedYear: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    backgroundImage: string;
    ctaQuoteText: string;
    ctaScrollText: string;
  };
  intro: {
    eyebrow: string;
    statementStart: string;
    statementHighlight: string;
    statementEnd: string;
    secondaryText: string;
    stats: StatisticItem[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    points: WhyUsPoint[];
  };
  coreValues: {
    eyebrow: string;
    title: string;
    subtitle: string;
    values: CoreValueItem[];
  };
  leadership: {
    eyebrow: string;
    title: string;
    subtitle: string;
    members: LeadershipMember[];
    people: {
      eyebrow: string;
      title: string;
      description: string;
      departments: string[];
    };
  };
  certifications: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: CertificationItem[];
    cardDeckTitle: string;
    cardDeckSubtitle: string;
  };
  timeline: {
    eyebrow: string;
    title: string;
    subtitle: string;
    milestones: TimelineMilestone[];
  };
  footer: {
    contactEmail: string;
    contactPhone: string;
    headquarters: string;
    regionalPresence: string[];
    isoText: string;
    copyrightText: string;
  };
}
