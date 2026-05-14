'use client';

import { useState } from 'react';
import { anjaliFeed } from '@/lib/deals';
import TopBar from '@/components/TopBar';
import { Filter, ArrowUpDown, Plus, ShieldCheck } from 'lucide-react';

type Category = 'All' | 'Credit Cards' | 'Investing' | 'Fintech';

const brandColors: Record<string, string> = {
  'SBI Card': 'bg-indigo-100 text-indigo-700',
  'Axis Bank': 'bg-rose-100 text-rose-700',
  'HDFC Bank': 'bg-blue-100 text-blue-700',
  Groww: 'bg-emerald-100 text-emerald-700',
  Zerodha: 'bg-sky-100 text-sky-700',
  Cred: 'bg-violet-100 text-violet-700',
  Slice: 'bg-fuchsia-100 text-fuchsia-700',
  Paytm: 'bg-cyan-100 text-cyan-700',
};

export default function AnjaliDiscovery() {
  const [category, setCategory] = useState<Category>('All');
  const deals = anjaliFeed();
  const filtered = category === 'All' ? deals : deals.filter((d) => d.category === category);

  return (
    <div className="bg-slate-50 min-h-screen">
      <TopBar variant="page" title="Finance partners" />

      <div className="bg-white px-4 py-3 border-b border-slate-100">
        <div className="flex items-start gap-2 bg-indigo-50 border border-indigo-100 rounded-xl p-3">
          <ShieldCheck className="w-4 h-4 text-indigo-700 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-indigo-900">
              Pre-vetted for finance creators
            </div>
            <div className="text-[11px] text-indigo-800 mt-0.5 leading-relaxed">
              These are partners with payouts your audience expects (cards, demat,
              UPI rewards). Adding to your storefront takes one tap.
            </div>
          </div>
        </div>
      </div>

      {/* Sort + filter */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-[56px] z-10">
        <div className="flex items-center gap-2 mb-2">
          <button className="flex items-center gap-1.5 bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-lg">
            <ArrowUpDown className="w-3 h-3" />
            Best for your audience
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-xs font-medium px-3 py-2 rounded-lg text-slate-700">
            <Filter className="w-3 h-3" />
            Payout
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
          {(['All', 'Credit Cards', 'Investing', 'Fintech'] as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap ${
                category === c
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 text-[11px] text-slate-500">
        {filtered.length} partners · ranked by your conversion data
      </div>

      <div className="px-4 space-y-3 pb-6">
        {filtered.map((d) => (
          <div key={d.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="flex gap-3 p-3">
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${d.image} flex-shrink-0 flex items-center justify-center`}
              >
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    brandColors[d.brand] ?? 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {d.brand}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
                  {d.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {d.category} · {d.payoutType === 'lead'
                    ? `₹${d.profitFlat}/approved`
                    : d.payoutType === 'signup'
                    ? `₹${d.profitFlat}/signup`
                    : `${d.profitPct}% commission`}
                </div>
                {d.couponCode && (
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-700 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded">
                    {d.couponCode}
                  </div>
                )}
              </div>
            </div>
            <div className="border-t border-slate-100 px-3 py-2 flex items-center justify-between bg-slate-50">
              <div className="text-[11px] text-slate-600">
                <span className="font-bold text-emerald-700">
                  {d.conversionRate}%
                </span>{' '}
                of clicks convert in your niche
              </div>
              <button className="flex items-center gap-1 bg-[#1AB266] text-white text-[11px] font-bold px-3 py-1.5 rounded-md">
                <Plus className="w-3 h-3" strokeWidth={3} />
                Add to storefront
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
