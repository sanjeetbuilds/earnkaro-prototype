// Anjali-specific dashboard mock data.
// The Day-14 demo: SBI Credit Card Reel with 12K views, 287 DM-captured commenters,
// 7 confirmed purchases, ₹2,940 pending.

import { allDeals, Deal } from '@/lib/deals';

export type ReelMetrics = {
  id: string;
  postedHoursAgo: number;
  thumbnail: string;        // gradient
  caption: string;
  dealId: string;           // which Deal the Reel promotes
  views: number;
  likes: number;
  shares: number;
  comments: number;
  dmTrigger: string;        // the keyword that fires Auto DM
  dmsSent: number;          // commenters captured by Auto DM
  storefrontClicks: number;
  confirmedPurchases: number;
  pendingEarnings: number;
};

export const latestReel: ReelMetrics = {
  id: 'reel-sbi',
  postedHoursAgo: 38,
  thumbnail: 'from-indigo-300 via-violet-300 to-blue-400',
  caption: 'The SBI card I actually use for online shopping (full breakdown).',
  dealId: 'a1',
  views: 12000,
  likes: 1840,
  shares: 312,
  comments: 412,
  dmTrigger: '"CARD"',
  dmsSent: 287,
  storefrontClicks: 41,
  confirmedPurchases: 7,
  pendingEarnings: 2940,
};

// All the Reels Anjali has posted in the last 30 days. Drives the
// "Latest Gadget Drop"-style carousel on the public storefront.
export const recentReels: ReelMetrics[] = [
  latestReel,
  {
    id: 'reel-groww',
    postedHoursAgo: 96,
    thumbnail: 'from-emerald-300 via-teal-300 to-emerald-500',
    caption: 'Start a ₹500 SIP in 4 minutes and get ₹100 instantly.',
    dealId: 'a4',
    views: 18400,
    likes: 2210,
    shares: 488,
    comments: 528,
    dmTrigger: '"SIP"',
    dmsSent: 421,
    storefrontClicks: 312,
    confirmedPurchases: 22,
    pendingEarnings: 3960,
  },
  {
    id: 'reel-cred',
    postedHoursAgo: 168,
    thumbnail: 'from-violet-300 via-purple-300 to-fuchsia-400',
    caption: 'Why I pay every credit card bill on Cred (and you should too).',
    dealId: 'a6',
    views: 9800,
    likes: 1320,
    shares: 201,
    comments: 244,
    dmTrigger: '"CRED"',
    dmsSent: 188,
    storefrontClicks: 142,
    confirmedPurchases: 18,
    pendingEarnings: 1080,
  },
  {
    id: 'reel-hdfc',
    postedHoursAgo: 240,
    thumbnail: 'from-blue-300 via-sky-300 to-blue-500',
    caption: 'HDFC Millennia vs Axis ACE: which one wins for Swiggy?',
    dealId: 'a3',
    views: 14200,
    likes: 1620,
    shares: 290,
    comments: 318,
    dmTrigger: '"MILLENNIA"',
    dmsSent: 251,
    storefrontClicks: 178,
    confirmedPurchases: 5,
    pendingEarnings: 2250,
  },
];

// Storefront-attributed performance: what /anjali storefront produced this week.
export type StorefrontWeek = {
  gmv: number;
  pendingEarnings: number;
  confirmedEarnings: number;
  uniqueVisitors: number;
  clicks: number;
  conversions: number;
  conversionRatePct: number;
  weekOverWeekPct: number;  // +ve means up
};

export const storefrontThisWeek: StorefrontWeek = {
  gmv: 168400,           // GMV across linked partners
  pendingEarnings: 7430,
  confirmedEarnings: 4180,
  uniqueVisitors: 2840,
  clicks: 1106,
  conversions: 52,
  conversionRatePct: 4.7,
  weekOverWeekPct: 18,
};

// Top-converting products this week, shown in dashboard.
export type TopProduct = {
  deal: Deal;
  clicks: number;
  conversions: number;
  conversionRatePct: number;
  earnings: number;
};

export const topProductsThisWeek: TopProduct[] = [
  {
    deal: byId('a4'),
    clicks: 312,
    conversions: 22,
    conversionRatePct: 7.1,
    earnings: 3960,
  },
  {
    deal: byId('a1'),
    clicks: 196,
    conversions: 7,
    conversionRatePct: 3.6,
    earnings: 2940,
  },
  {
    deal: byId('a6'),
    clicks: 142,
    conversions: 18,
    conversionRatePct: 12.7,
    earnings: 1080,
  },
  {
    deal: byId('a3'),
    clicks: 178,
    conversions: 5,
    conversionRatePct: 2.8,
    earnings: 2250,
  },
];

// "Audience searched, but Anjali doesn't stock": gap signal.
// These are real-feeling personal-finance queries her followers type into the
// storefront search bar and get an empty state.
export type SearchMiss = {
  query: string;
  searchesThisWeek: number;
  trend: 'rising' | 'steady' | 'spike';
  suggestion?: string;  // suggested partner to add
};

export const searchMisses: SearchMiss[] = [
  {
    query: 'FD calculator',
    searchesThisWeek: 34,
    trend: 'rising',
    suggestion: 'Add Bajaj Finance FD partner (₹220/lead)',
  },
  {
    query: 'lounge access card',
    searchesThisWeek: 21,
    trend: 'spike',
    suggestion: 'Axis Magnus or HDFC Diners, both pay ₹600+/approved card',
  },
  {
    query: 'ELSS funds',
    searchesThisWeek: 18,
    trend: 'rising',
    suggestion: 'Tax-saver fund category, available via Groww partner',
  },
  {
    query: 'gold loan',
    searchesThisWeek: 12,
    trend: 'steady',
    suggestion: 'Muthoot Finance. Outside your niche, consider editorial review first',
  },
];

// System-made decisions: auto-promotion to featured row.
export type AutoFeatureDecision = {
  id: string;
  dealId: string;
  decidedHoursAgo: number;
  action: 'promoted-to-featured' | 'demoted-from-featured' | 'pinned-to-top';
  reason: string;
  signal: string;       // the quantitative basis
  state: 'live' | 'reverted-by-anjali';
};

export const autoFeatureDecisions: AutoFeatureDecision[] = [
  {
    id: 'af1',
    dealId: 'a6',
    decidedHoursAgo: 4,
    action: 'promoted-to-featured',
    reason: '12.7% click-to-purchase, 3.1× your storefront average',
    signal: '18 conversions / 142 clicks in last 168h',
    state: 'live',
  },
  {
    id: 'af2',
    dealId: 'a4',
    decidedHoursAgo: 22,
    action: 'pinned-to-top',
    reason: 'Reel still driving traffic 4 days after posting',
    signal: '312 clicks from /anjali storefront referrals this week',
    state: 'live',
  },
  {
    id: 'af3',
    dealId: 'a8',
    decidedHoursAgo: 36,
    action: 'demoted-from-featured',
    reason: 'Conversion fell to 4.4%, below your storefront baseline',
    signal: 'Was 9.1% three weeks ago, declined since coupon expired',
    state: 'live',
  },
  {
    id: 'af4',
    dealId: 'a5',
    decidedHoursAgo: 60,
    action: 'promoted-to-featured',
    reason: 'Audience finance-quiz answers leaned "long-term, low-effort"',
    signal: 'Matches Zerodha demat positioning',
    state: 'reverted-by-anjali',
  },
];

function byId(id: string): Deal {
  const found = allDeals.find((d) => d.id === id);
  if (!found) throw new Error(`Anjali mock data references unknown deal id: ${id}`);
  return found;
}
