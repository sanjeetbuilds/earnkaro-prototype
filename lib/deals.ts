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
};

export const allDeals: Deal[] = [
  // Household — Ramesh's primary category
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

  // Fashion — Anjali's territory but Ramesh deprioritizes
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

  // Personal Care — Monika's easy starter deals
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
    conversionRate: 11.2,  // high — good starter deal
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
    conversionRate: 14.8,  // very high conversion — perfect for beginner
    image: 'from-teal-200 to-teal-400',
  },
];

// Curated subsets for each persona's experience
export const rameshFeed = (): Deal[] => {
  // Operator feed: ranked by composite score (commission × freshness × inverse saturation)
  // Household pinned first, then high-commission elsewhere
  const household = allDeals.filter(d => d.category === 'Household')
    .sort((a, b) => {
      const scoreA = a.profitPct * (1 / Math.max(a.saturationCount, 1)) * (1 / Math.max(a.postedMinutesAgo, 1));
      const scoreB = b.profitPct * (1 / Math.max(b.saturationCount, 1)) * (1 / Math.max(b.postedMinutesAgo, 1));
      return scoreB - scoreA;
    });
  const others = allDeals.filter(d => d.category !== 'Household' && d.profitPct >= 10)
    .sort((a, b) => b.profitPct - a.profitPct);
  return [...household, ...others];
};

export const monikaStarterDeals = (): Deal[] => {
  // 5 hand-picked easy starters: high conversion rate, broadly relatable, low price
  return allDeals
    .filter(d => (d.conversionRate ?? 0) >= 7 && d.salePrice <= 500)
    .sort((a, b) => (b.conversionRate ?? 0) - (a.conversionRate ?? 0))
    .slice(0, 5);
};
