// Realistic mock deals matching EarnKaro's actual partner ecosystem

export type Deal = {
  id: string;
  brand: string;
  brandLogo: string;  // emoji placeholder; we'll style as colored badge
  title: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  profitPct: number;
  profitFlat?: number;
  postedMinutesAgo: number;
  saturationCount: number;  // how many EK creators have shared in last hour
  conversionRate?: number;  // for "this converts X% of clicks"
  image: string;           // gradient placeholder color
  isFlash?: boolean;
  isNew?: boolean;
  // Storefront extras, used by /anjali public page and Anjali screens.
  couponCode?: string;
  affiliateUrl?: string;
  // Some "deals" are not retail SKUs. They're financial signups (cards, funds, fintech).
  // For these, salePrice is the user-facing reward (e.g., joining bonus) and
  // profitFlat is the commission to the creator per approved/converted lead.
  payoutType?: 'sale' | 'lead' | 'signup';
  ctaLabel?: string;  // e.g. "Apply now", "Open account", "Invest"
};

export const allDeals: Deal[] = [
  // Household: Ramesh's primary category
  {
    id: 'd1',
    brand: 'Flipkart',
    brandLogo: 'F',
    title: 'Prestige Pressure Cooker 5L',
    category: 'Household',
    originalPrice: 2499,
    salePrice: 999,
    profitPct: 8.5,
    profitFlat: 85,
    postedMinutesAgo: 12,
    saturationCount: 3,
    conversionRate: 6.2,
    image: 'from-orange-200 to-orange-400',
    isNew: true,
  },
  {
    id: 'd2',
    brand: 'Amazon',
    brandLogo: 'a',
    title: 'Milton Thermosteel Flask 1L',
    category: 'Household',
    originalPrice: 1199,
    salePrice: 449,
    profitPct: 10.2,
    profitFlat: 46,
    postedMinutesAgo: 34,
    saturationCount: 18,
    conversionRate: 8.1,
    image: 'from-blue-200 to-blue-400',
  },
  {
    id: 'd3',
    brand: 'Flipkart',
    brandLogo: 'F',
    title: 'Pigeon Non-Stick Cookware Set',
    category: 'Household',
    originalPrice: 3999,
    salePrice: 1499,
    profitPct: 9.0,
    profitFlat: 135,
    postedMinutesAgo: 8,
    saturationCount: 1,
    conversionRate: 5.4,
    image: 'from-red-200 to-red-400',
    isNew: true,
  },

  // Fashion: Anjali's territory but Ramesh deprioritizes
  {
    id: 'd4',
    brand: 'Myntra',
    brandLogo: 'M',
    title: 'Anouk Floral Kurti Set',
    category: 'Fashion',
    originalPrice: 1999,
    salePrice: 706,
    profitPct: 10.0,
    profitFlat: 71,
    postedMinutesAgo: 45,
    saturationCount: 42,
    conversionRate: 3.2,
    image: 'from-pink-200 to-pink-400',
  },
  {
    id: 'd5',
    brand: 'AJIO',
    brandLogo: 'A',
    title: 'Roadster Casual T-Shirt',
    category: 'Fashion',
    originalPrice: 999,
    salePrice: 399,
    profitPct: 12.5,
    profitFlat: 50,
    postedMinutesAgo: 120,
    saturationCount: 67,
    conversionRate: 2.8,
    image: 'from-purple-200 to-purple-400',
  },

  // Beauty
  {
    id: 'd6',
    brand: 'Nykaa',
    brandLogo: 'N',
    title: 'Lakme Face Wash Combo',
    category: 'Beauty',
    originalPrice: 599,
    salePrice: 299,
    profitPct: 18.0,
    profitFlat: 54,
    postedMinutesAgo: 22,
    saturationCount: 9,
    conversionRate: 7.4,
    image: 'from-rose-200 to-rose-400',
  },

  // Electronics
  {
    id: 'd7',
    brand: 'Flipkart',
    brandLogo: 'F',
    title: 'boAt Airdopes 141 Bluetooth Earbuds',
    category: 'Electronics',
    originalPrice: 2999,
    salePrice: 1099,
    profitPct: 5.5,
    profitFlat: 60,
    postedMinutesAgo: 5,
    saturationCount: 0,
    conversionRate: 4.1,
    image: 'from-gray-200 to-gray-400',
    isFlash: true,
    isNew: true,
  },

  // Personal Care: Monika's easy starter deals
  {
    id: 'd8',
    brand: 'Amazon',
    brandLogo: 'a',
    title: 'Mamaearth Hair Oil 250ml',
    category: 'Personal Care',
    originalPrice: 499,
    salePrice: 249,
    profitPct: 15.0,
    profitFlat: 37,
    postedMinutesAgo: 60,
    saturationCount: 24,
    conversionRate: 11.2,  // high conversion, good starter deal
    image: 'from-green-200 to-green-400',
  },
  {
    id: 'd9',
    brand: 'Nykaa',
    brandLogo: 'N',
    title: 'Wow Skin Science Vitamin C Face Wash',
    category: 'Personal Care',
    originalPrice: 399,
    salePrice: 199,
    profitPct: 20.0,
    profitFlat: 40,
    postedMinutesAgo: 90,
    saturationCount: 31,
    conversionRate: 13.5,
    image: 'from-yellow-200 to-yellow-400',
  },
  {
    id: 'd10',
    brand: 'Flipkart',
    brandLogo: 'F',
    title: 'Colgate Total Toothpaste Combo',
    category: 'Personal Care',
    originalPrice: 299,
    salePrice: 149,
    profitPct: 14.0,
    profitFlat: 21,
    postedMinutesAgo: 180,
    saturationCount: 12,
    conversionRate: 14.8,  // very high conversion, perfect for beginner
    image: 'from-teal-200 to-teal-400',
  },

  // Credit Cards: Anjali's territory. Commission is flat per approved card.
  {
    id: 'a1',
    brand: 'SBI Card',
    brandLogo: 'S',
    title: 'SBI SimplyCLICK Credit Card · ₹500 Amazon voucher on first spend',
    category: 'Credit Cards',
    originalPrice: 0,
    salePrice: 0,                  // joining fee waived
    profitPct: 0,
    profitFlat: 420,               // ₹420 per approved card (the Day-14 SBI Reel deal)
    postedMinutesAgo: 90,
    saturationCount: 6,
    conversionRate: 5.8,           // Reel CTR is high in finance niche
    image: 'from-indigo-200 to-indigo-500',
    isNew: true,
    couponCode: 'ANJALI500',
    affiliateUrl: 'https://sbicard.com/apply?ref=anjali',
    payoutType: 'lead',
    ctaLabel: 'Apply now',
  },
  {
    id: 'a2',
    brand: 'Axis Bank',
    brandLogo: 'X',
    title: 'Axis ACE Credit Card · 5% cashback on Google Pay bills',
    category: 'Credit Cards',
    originalPrice: 0,
    salePrice: 0,
    profitPct: 0,
    profitFlat: 380,
    postedMinutesAgo: 240,
    saturationCount: 9,
    conversionRate: 4.6,
    image: 'from-rose-200 to-rose-500',
    couponCode: 'ANJALI-ACE',
    affiliateUrl: 'https://axisbank.com/ace?ref=anjali',
    payoutType: 'lead',
    ctaLabel: 'Apply now',
  },
  {
    id: 'a3',
    brand: 'HDFC Bank',
    brandLogo: 'H',
    title: 'HDFC Millennia · 5% cashback on Swiggy, Zomato, Amazon',
    category: 'Credit Cards',
    originalPrice: 0,
    salePrice: 0,
    profitPct: 0,
    profitFlat: 450,
    postedMinutesAgo: 18,
    saturationCount: 2,
    conversionRate: 6.1,
    image: 'from-blue-200 to-blue-500',
    isNew: true,
    couponCode: 'ANJALI-HDFC',
    affiliateUrl: 'https://hdfcbank.com/millennia?ref=anjali',
    payoutType: 'lead',
    ctaLabel: 'Apply now',
  },

  // Investing: mutual fund signups
  {
    id: 'a4',
    brand: 'Groww',
    brandLogo: 'G',
    title: 'Groww · Start a ₹500/mo SIP, get ₹100 in your wallet',
    category: 'Investing',
    originalPrice: 0,
    salePrice: 100,
    profitPct: 0,
    profitFlat: 180,
    postedMinutesAgo: 55,
    saturationCount: 14,
    conversionRate: 9.4,
    image: 'from-emerald-200 to-emerald-500',
    couponCode: 'ANJALI100',
    affiliateUrl: 'https://groww.in/refer?code=anjali',
    payoutType: 'signup',
    ctaLabel: 'Open account',
  },
  {
    id: 'a5',
    brand: 'Zerodha',
    brandLogo: 'Z',
    title: 'Zerodha · Open free demat, 0 brokerage on equity delivery',
    category: 'Investing',
    originalPrice: 200,
    salePrice: 0,
    profitPct: 0,
    profitFlat: 220,
    postedMinutesAgo: 320,
    saturationCount: 22,
    conversionRate: 7.2,
    image: 'from-sky-200 to-sky-500',
    couponCode: 'ANJALI-Z',
    affiliateUrl: 'https://zerodha.com/open-account?ref=anjali',
    payoutType: 'signup',
    ctaLabel: 'Open demat',
  },

  // Fintech / UPI
  {
    id: 'a6',
    brand: 'Cred',
    brandLogo: 'C',
    title: 'Cred · Pay your credit card bill, earn 500 Cred coins',
    category: 'Fintech',
    originalPrice: 0,
    salePrice: 500,
    profitPct: 0,
    profitFlat: 60,
    postedMinutesAgo: 10,
    saturationCount: 1,
    conversionRate: 12.8,
    image: 'from-violet-200 to-violet-500',
    isNew: true,
    couponCode: 'ANJALICRED',
    affiliateUrl: 'https://cred.club/refer?ref=anjali',
    payoutType: 'signup',
    ctaLabel: 'Get the app',
  },
  {
    id: 'a7',
    brand: 'Slice',
    brandLogo: 'S',
    title: 'Slice UPI · Pay & split, ₹250 cashback on first ₹500 spend',
    category: 'Fintech',
    originalPrice: 0,
    salePrice: 250,
    profitPct: 0,
    profitFlat: 90,
    postedMinutesAgo: 200,
    saturationCount: 8,
    conversionRate: 10.1,
    image: 'from-fuchsia-200 to-fuchsia-500',
    couponCode: 'ANJALI-SLICE',
    affiliateUrl: 'https://sliceit.com/refer?ref=anjali',
    payoutType: 'signup',
    ctaLabel: 'Get the app',
  },
  {
    id: 'a8',
    brand: 'Paytm',
    brandLogo: 'P',
    title: 'Paytm Postpaid · Spend now, pay next month, 0% interest',
    category: 'Fintech',
    originalPrice: 0,
    salePrice: 0,
    profitPct: 0,
    profitFlat: 75,
    postedMinutesAgo: 420,
    saturationCount: 33,
    conversionRate: 4.4,
    image: 'from-cyan-200 to-cyan-500',
    couponCode: 'ANJALI-PTM',
    affiliateUrl: 'https://paytm.com/postpaid?ref=anjali',
    payoutType: 'signup',
    ctaLabel: 'Activate',
  },
];

// Curated subsets for each persona's experience
export const rameshFeed = (): Deal[] => {
  // Operator feed: ranked by composite score (commission × freshness × inverse saturation)
  // Household pinned first, then high-commission elsewhere. Finance stays out of Ramesh's view.
  const retail = allDeals.filter((d) => !isFinanceCategory(d.category));
  const household = retail.filter((d) => d.category === 'Household')
    .sort((a, b) => {
      const scoreA = a.profitPct * (1 / Math.max(a.saturationCount, 1)) * (1 / Math.max(a.postedMinutesAgo, 1));
      const scoreB = b.profitPct * (1 / Math.max(b.saturationCount, 1)) * (1 / Math.max(b.postedMinutesAgo, 1));
      return scoreB - scoreA;
    });
  const others = retail.filter((d) => d.category !== 'Household' && d.profitPct >= 10)
    .sort((a, b) => b.profitPct - a.profitPct);
  return [...household, ...others];
};

export const monikaStarterDeals = (): Deal[] => {
  // 5 hand-picked easy starters: high conversion rate, broadly relatable, low price.
  // Finance signups are excluded: too high-stakes for someone on day 6.
  return allDeals
    .filter((d) => !isFinanceCategory(d.category))
    .filter((d) => (d.conversionRate ?? 0) >= 7 && d.salePrice <= 500)
    .sort((a, b) => (b.conversionRate ?? 0) - (a.conversionRate ?? 0))
    .slice(0, 5);
};

// Anjali's finance-niche feed: only categories she has authority in.
export const anjaliFeed = (): Deal[] => {
  return allDeals
    .filter((d) => isFinanceCategory(d.category))
    .sort((a, b) => {
      // Settled-niche ranking: commission × conversion (audience trusts her, so commission matters).
      const scoreA = (a.profitFlat ?? 0) * (a.conversionRate ?? 1);
      const scoreB = (b.profitFlat ?? 0) * (b.conversionRate ?? 1);
      return scoreB - scoreA;
    });
};

function isFinanceCategory(cat: string): boolean {
  return cat === 'Credit Cards' || cat === 'Investing' || cat === 'Fintech';
}
