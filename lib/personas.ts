export type Persona = {
  id: 'ramesh' | 'monika';
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

export const personas: Record<'ramesh' | 'monika', Persona> = {
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
};
