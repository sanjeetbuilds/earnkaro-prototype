'use client';

import { useState } from 'react';
import { allDeals } from '@/lib/deals';
import DealCard from '@/components/DealCard';
import TopBar from '@/components/TopBar';
import { Filter, ArrowUpDown, X } from 'lucide-react';

type SortBy = 'commission' | 'freshness' | 'saturation' | 'gmvPerClick';

export default function RameshDiscovery() {
  const [sortBy, setSortBy] = useState<SortBy>('commission');
  const [showSort, setShowSort] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'Min 8% commission',
  ]);

  const sorted = [...allDeals].sort((a, b) => {
    if (sortBy === 'commission') return b.profitPct - a.profitPct;
    if (sortBy === 'freshness') return a.postedMinutesAgo - b.postedMinutesAgo;
    if (sortBy === 'saturation') return a.saturationCount - b.saturationCount;
    if (sortBy === 'gmvPerClick')
      return (b.conversionRate ?? 0) - (a.conversionRate ?? 0);
    return 0;
  });

  const sortLabels: Record<SortBy, string> = {
    commission: 'Highest commission %',
    freshness: 'Newest first',
    saturation: 'Least saturated',
    gmvPerClick: 'Highest conversion',
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <TopBar variant="page" title="All Deals" />

      {/* Sort + filter bar — sharer-oriented, not shopper-oriented */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-1.5 bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-lg"
          >
            <ArrowUpDown className="w-3 h-3" />
            {sortLabels[sortBy]}
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-xs font-medium px-3 py-2 rounded-lg text-slate-700">
            <Filter className="w-3 h-3" />
            Filters
          </button>
        </div>

        {/* Active filters chips */}
        {activeFilters.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {activeFilters.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[11px] font-medium px-2 py-0.5 rounded-full border border-emerald-200"
              >
                {f}
                <button
                  onClick={() =>
                    setActiveFilters(activeFilters.filter((x) => x !== f))
                  }
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Sort sheet — the centerpiece of the personalization story */}
        {showSort && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl z-30 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
              Sort by · sharer view
            </div>
            <div className="space-y-1">
              {(
                Object.entries(sortLabels) as [SortBy, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSortBy(key);
                    setShowSort(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between ${
                    sortBy === key
                      ? 'bg-emerald-50 text-emerald-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {label}
                  {sortBy === key && <span className="text-emerald-600">✓</span>}
                </button>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 italic">
              Note: current app sorts by Popular / Discount / Price. Those are shopper signals.
              An operator needs commission, freshness, and saturation.
            </div>
          </div>
        )}
      </div>

      {/* Result count */}
      <div className="px-4 py-2 text-[11px] text-slate-500 bg-slate-50">
        {sorted.length} deals · ranked by {sortLabels[sortBy].toLowerCase()}
      </div>

      {/* Deals list */}
      <div className="p-3 space-y-2">
        {sorted.map((deal) => (
          <DealCard key={deal.id} deal={deal} variant="operator" />
        ))}
      </div>
    </div>
  );
}
