export type PersonaId = 'ramesh' | 'monika' | 'anjali';

export type Persona = {
  id: PersonaId;
  name: string;
  avatar: string;
  role: string;
  oneLiner: string;
  walletBalance: number;
  walletStatus: 'pending' | 'confirmed' | 'paid';
  audienceType: string;
  pinnedCategories: string[];
  segment: string;
  segmentConfidence: number;  // 0-100
  daysActive: number;
};

export const personas: Record<PersonaId, Persona> = {
  ramesh: {
    id: 'ramesh',
    name: 'Ramesh K.',
    avatar: 'R',
    role: 'Household Deals Telegram Admin',
    oneLiner: 'Runs a 28K-member household-deals Telegram group from his lunch breaks and evenings.',
    walletBalance: 12480,
    walletStatus: 'confirmed',
    audienceType: 'Telegram group · 28,000 members',
    pinnedCategories: ['Household', 'Personal Care'],
    segment: 'Performance Distributor',
    segmentConfidence: 94,
    daysActive: 287,
  },
  monika: {
    id: 'monika',
    name: 'Monika S.',
    avatar: 'M',
    role: 'First-time affiliate sharer',
    oneLiner: 'Homemaker testing if affiliate earning is real. Shares to WhatsApp family and friends.',
    walletBalance: 30,
    walletStatus: 'pending',
    audienceType: 'WhatsApp · friends & family (~80 people)',
    pinnedCategories: [],
    segment: 'Emerging Earner',
    segmentConfidence: 81,
    daysActive: 6,
  },
  anjali: {
    id: 'anjali',
    name: 'Anjali R.',
    avatar: 'A',
    role: 'Personal Finance Creator',
    oneLiner: 'Explains credit cards, mutual funds and UPI offers to her 80K Instagram followers from Pune.',
    walletBalance: 2940,
    walletStatus: 'pending',
    audienceType: 'Instagram · 80,000 followers · Pune',
    pinnedCategories: ['Credit Cards', 'Investing', 'Fintech'],
    segment: 'Settled Niche Influencer',
    segmentConfidence: 91,
    daysActive: 142,
  },
};
