'use client';

import { useState } from 'react';
import { allDeals } from '@/lib/deals';
import DealCard from '@/components/DealCard';
import TopBar from '@/components/TopBar';
import { Sparkles, HelpCircle } from 'lucide-react';

export default function MonikaDiscovery() {
  const [activeCategory, setActiveCategory] = useState<string>('Popular');

  // Simplified categories — broad, friendly
  const categories = ['Popular', 'Beauty', 'Personal Care', 'Household', 'Fashion'];

  const dealsForCategory =
    activeCategory === 'Popular'
      ? allDeals.filter((d) => (d.conversionRate ?? 0) >= 7).slice(0, 6)
      : allDeals.filter((d) => d.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      <TopBar variant="page" title="Browse deals" />

      {/* Friendly intro */}
      <div className="bg-white px-4 py-3 border-b border-slate-100">
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-amber-900">
              Tip for first-time sharers
            </div>
            <div className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
              Pick deals friends would actually buy. The ✨ badge means lots of people
              who click end up buying — easier earnings for you.
            </div>
          </div>
        </div>
      </div>

      {/* Category chips — soft, no overwhelming filters */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10">
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#1AB266] text-white border-[#1AB266]'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Result intro */}
      <div className="px-4 py-3">
        <h2 className="text-sm font-bold text-slate-900">
          {activeCategory === 'Popular'
            ? '✨ Most likely to convert'
            : `${activeCategory} deals`}
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {dealsForCategory.length} deals · curated for you
        </p>
      </div>

      {/* Deals — big visual cards */}
      <div className="px-4 space-y-3 pb-8">
        {dealsForCategory.map((deal) => (
          <DealCard key={deal.id} deal={deal} variant="simple" />
        ))}
      </div>

      {/* Help footer */}
      <div className="px-4 pb-6">
        <button className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 text-left">
          <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-xs font-semibold text-slate-900">
              Not sure which deals to pick?
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              We&apos;ll suggest 3 a day based on what works
            </div>
          </div>
          <span className="text-xs text-[#1AB266] font-semibold">Try →</span>
        </button>
      </div>
    </div>
  );
}
