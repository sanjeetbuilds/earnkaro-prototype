'use client';

import { useState } from 'react';
import { rameshFeed } from '@/lib/deals';
import { personas } from '@/lib/personas';
import DealCard from '@/components/DealCard';
import TopBar from '@/components/TopBar';
import { Pin, Zap, CheckSquare, Bell } from 'lucide-react';

export default function RameshHome() {
  const persona = personas.ramesh;
  const deals = rameshFeed();
  const [activeCategory, setActiveCategory] = useState<string>('Household');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const newDealsCount = deals.filter((d) => d.postedMinutesAgo < 30).length;
  const filtered = deals.filter((d) => d.category === activeCategory);

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  return (
    <div>
      <TopBar variant="brand" walletBalance={persona.walletBalance} />

      {/* "What's new" banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              {newDealsCount} new since you last opened
            </div>
            <div className="text-[11px] text-slate-600">
              3 in Household · barely shared yet
            </div>
          </div>
        </div>
        <button className="text-xs font-semibold text-amber-700 underline">
          View →
        </button>
      </div>

      {/* Pinned categories */}
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Pin className="w-3 h-3 text-slate-500" fill="currentColor" />
            <span className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
              Your pinned categories
            </span>
          </div>
          <button className="text-[11px] text-[#1AB266] font-medium">
            Edit
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
          {persona.pinnedCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                  {deals.filter((d) => d.category === cat).length}
                </span>
              )}
            </button>
          ))}
          <button className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border border-dashed border-slate-300 text-slate-500">
            + Pin more
          </button>
        </div>
      </div>

      {/* Sort/filter bar: REWRITTEN with user-friendly labels */}
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2">
        <button className="flex items-center gap-1 text-[11px] flex-shrink-0">
          <span className="text-slate-500">Sorted by</span>
          <span className="font-bold text-slate-900">Best for you ▾</span>
        </button>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button className="text-[11px] bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 font-semibold text-emerald-800 whitespace-nowrap flex items-center gap-1">
            💰 8%+ only
          </button>
          <button className="text-[11px] bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1 font-semibold text-amber-800 whitespace-nowrap flex items-center gap-1">
            🔥 Fresh
          </button>
        </div>
      </div>

      {/* Bulk select bar, sticky when items selected */}
      {selected.size > 0 && (
        <div className="sticky top-[60px] z-20 bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between shadow-lg">
          <div className="text-sm font-semibold flex items-center gap-2">
            <span>{selected.size} selected</span>
            <span className="text-[10px] text-slate-400 font-normal">
              · saves ~{selected.size * 4} taps
            </span>
          </div>
          <button className="bg-[#1AB266] text-white text-xs font-bold px-3 py-1.5 rounded-md">
            Share all {selected.size} →
          </button>
        </div>
      )}

      {/* Deal feed */}
      <div className="p-3 bg-slate-50 min-h-[400px]">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold text-slate-900">
            {activeCategory} · {filtered.length} deals
          </h2>
          <button
            onClick={() => setSelected(new Set())}
            className="text-[11px] text-slate-500 flex items-center gap-1"
          >
            <CheckSquare className="w-3 h-3" />
            Bulk select
          </button>
        </div>

        <div className="space-y-2">
          {filtered.map((deal) => (
            <div key={deal.id} className="relative">
              <button
                onClick={() => toggleSelect(deal.id)}
                className={`absolute top-3 left-3 z-10 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  selected.has(deal.id)
                    ? 'bg-[#1AB266] border-[#1AB266]'
                    : 'bg-white/80 border-slate-300'
                }`}
              >
                {selected.has(deal.id) && (
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <div className={selected.has(deal.id) ? 'ml-1' : ''}>
                <DealCard deal={deal} variant="operator" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending alerts CTA */}
      <div className="px-4 py-6 bg-white border-t border-slate-100">
        <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center gap-3">
          <Bell className="w-5 h-5 text-amber-400" />
          <div className="flex-1">
            <div className="text-sm font-semibold">
              Beat competitors to trending deals
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              Push alert the moment a 10%+ deal drops in your categories
            </div>
          </div>
          <button className="bg-[#1AB266] text-white text-xs font-bold px-3 py-1.5 rounded-md">
            Set up
          </button>
        </div>
      </div>
    </div>
  );
}
