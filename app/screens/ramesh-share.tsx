'use client';

import { useState } from 'react';
import { rameshFeed } from '@/lib/deals';
import TopBar from '@/components/TopBar';
import { Check, MessageCircle, Image as ImageIcon, Edit3 } from 'lucide-react';

export default function RameshShare() {
  const deals = rameshFeed().slice(0, 6);
  const [selected, setSelected] = useState<Set<string>>(
    new Set([deals[0].id, deals[1].id, deals[2].id])
  );
  const [stage, setStage] = useState<'select' | 'preview' | 'posted'>(
    'select'
  );

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const selectedDeals = deals.filter((d) => selected.has(d.id));

  if (stage === 'posted') {
    return (
      <div className="min-h-screen bg-slate-50">
        <TopBar variant="page" title="Posted to Telegram" />
        <div className="p-6 pt-12 text-center">
          <div className="w-20 h-20 bg-[#1AB266] rounded-full mx-auto flex items-center justify-center mb-4">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {selectedDeals.length} deals posted
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Posted to your channel · Household Deals Hub
          </p>

          <div className="bg-white rounded-2xl p-4 mt-6 text-left border border-slate-200">
            <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-3">
              Live tracking
            </div>
            <div className="space-y-2.5 text-xs">
              <Row label="Posted to" value="28,043 members" />
              <Row label="First click" value="in 24 seconds" highlight />
              <Row
                label="Clicks so far"
                value="142"
                highlight
              />
              <Row label="Avg. saturation across batch" value="6 (low)" />
              <Row
                label="Est. profit pending"
                value="₹780 – ₹1,420"
                highlight
              />
            </div>
          </div>

          <button
            onClick={() => {
              setStage('select');
              setSelected(new Set([deals[0].id, deals[1].id, deals[2].id]));
            }}
            className="mt-6 text-[#1AB266] text-sm font-semibold"
          >
            Post another batch →
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'preview') {
    return (
      <div className="min-h-screen bg-slate-50">
        <TopBar variant="page" title="Telegram preview" onBack={() => setStage('select')} />
        <div className="p-4">
          <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
            Will be posted as {selectedDeals.length} separate messages
          </div>

          {/* Telegram message previews */}
          <div className="space-y-3">
            {selectedDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200"
              >
                <div
                  className={`h-32 bg-gradient-to-br ${deal.image} relative flex items-center justify-center`}
                >
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-md px-2 py-1 text-[10px] font-bold text-slate-900">
                    {deal.brand}
                  </div>
                  <div className="absolute top-2 right-2 bg-[#1AB266] text-white rounded-md px-2 py-1 text-[10px] font-bold">
                    {deal.profitPct}% commission
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-sm font-bold text-slate-900">
                    🔥 {deal.title}
                  </div>
                  <div className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    <span className="line-through text-slate-400">
                      ₹{deal.originalPrice}
                    </span>{' '}
                    →{' '}
                    <span className="font-bold text-slate-900">
                      ₹{deal.salePrice}
                    </span>{' '}
                    on {deal.brand}
                  </div>
                  <div className="text-xs text-[#1AB266] mt-2 font-medium">
                    👉 https://ektrack.in/r{deal.id}
                  </div>
                  <button className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                    <Edit3 className="w-3 h-3" />
                    Edit caption
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStage('posted')}
            className="w-full mt-4 bg-[#1AB266] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Post all {selectedDeals.length} to Telegram
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar variant="page" title="Bulk share" />

      {/* Auto-detected channel */}
      <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            T
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-900">
              Household Deals Hub
            </div>
            <div className="text-[10px] text-slate-600">
              28,043 members · Telegram
            </div>
          </div>
        </div>
        <button className="text-[10px] text-emerald-700 font-semibold bg-white px-2 py-1 rounded-md border border-emerald-200">
          Change channel
        </button>
      </div>

      {/* Selection hint */}
      <div className="px-4 py-3 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Select deals to post
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Tap to select · auto-formatted for Telegram
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-700">
            {selected.size} selected
          </div>
        </div>
      </div>

      {/* Deals — compact rows */}
      <div className="bg-white">
        {deals.map((deal) => {
          const isSelected = selected.has(deal.id);
          return (
            <button
              key={deal.id}
              onClick={() => toggle(deal.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 border-b border-slate-100 text-left ${
                isSelected ? 'bg-emerald-50' : 'bg-white'
              }`}
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#1AB266] border-[#1AB266]'
                    : 'border-slate-300'
                }`}
              >
                {isSelected && (
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                )}
              </div>
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${deal.image} flex-shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-900 truncate">
                  {deal.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                  <span>{deal.brand}</span>
                  <span>·</span>
                  <span className="text-[#1AB266] font-semibold">
                    {deal.profitPct}%
                  </span>
                  <span>·</span>
                  <span>{deal.saturationCount} shared</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sticky action bar */}
      <div className="sticky bottom-16 bg-white border-t border-slate-200 px-4 py-3">
        <button
          onClick={() => selected.size > 0 && setStage('preview')}
          disabled={selected.size === 0}
          className="w-full bg-[#1AB266] disabled:bg-slate-300 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <ImageIcon className="w-4 h-4" />
          Preview {selected.size} Telegram posts
        </button>
        <div className="text-[10px] text-slate-500 text-center mt-2 italic">
          Auto-formatted with image, bold hook, price, link. Editable before posting.
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={highlight ? 'font-bold text-slate-900' : 'text-slate-700'}>
        {value}
      </span>
    </div>
  );
}
