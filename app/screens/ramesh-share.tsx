'use client';

import { useState } from 'react';
import { rameshFeed } from '@/lib/deals';
import TopBar from '@/components/TopBar';
import { Check, MessageCircle, Image as ImageIcon, Edit3, Eye, Lock } from 'lucide-react';

export default function RameshShare() {
  const deals = rameshFeed().slice(0, 6);
  const [selected, setSelected] = useState<Set<string>>(
    new Set([deals[0].id, deals[1].id, deals[2].id])
  );
  const [stage, setStage] = useState<'select' | 'preview' | 'posted'>(
    'select'
  );
  const [channel, setChannel] = useState<'telegram' | 'whatsapp' | 'all'>('telegram');

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const selectedDeals = deals.filter((d) => selected.has(d.id));

  const channels = {
    telegram: { name: 'Household Deals Hub', meta: 'Telegram · 28,043 members', emoji: '📢' },
    whatsapp: { name: 'Daily Deals Broadcast', meta: 'WhatsApp · 4,200 contacts', emoji: '💬' },
    all: { name: 'All channels', meta: 'Telegram + WhatsApp · 32K reach', emoji: '🚀' },
  };

  if (stage === 'posted') {
    return (
      <div className="bg-slate-50 min-h-screen">
        <TopBar variant="page" title="Posted" />
        <div className="p-6 pt-12 text-center">
          <div className="w-20 h-20 bg-[#1AB266] rounded-full mx-auto flex items-center justify-center mb-4">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {selectedDeals.length} deals posted
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Posted to {channels[channel].name}
          </p>

          <div className="bg-white rounded-2xl p-4 mt-6 text-left border border-slate-200">
            <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-3">
              Live tracking
            </div>
            <div className="space-y-2.5 text-xs">
              <Row label="Reach" value={channels[channel].meta.split(' · ')[1]} />
              <Row label="First click" value="in 24 seconds" highlight />
              <Row label="Clicks so far" value="142" highlight />
              <Row label="Saturation across batch" value="6 avg (low)" />
              <Row label="Est. profit pending" value="₹780 to ₹1,420" highlight />
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
      <div className="bg-slate-50 min-h-screen">
        <TopBar variant="page" title="Preview before posting" onBack={() => setStage('select')} />

        {/* Operator note */}
        <div className="bg-amber-50 border-b border-amber-100 px-4 py-2.5 flex items-start gap-2">
          <Lock className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] text-amber-900 leading-relaxed">
            <span className="font-bold">Your commission is hidden from the audience.</span>{' '}
            They&apos;ll only see the discount, urgency, and link.
          </div>
        </div>

        <div className="p-4">
          <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-3">
            How your {selectedDeals.length} posts will appear
          </div>

          <div className="space-y-3">
            {selectedDeals.map((deal) => {
              const discountPct = Math.round(
                ((deal.originalPrice - deal.salePrice) / deal.originalPrice) * 100
              );
              return (
                <div key={deal.id}>
                  {/* Operator-only info strip — clearly marked */}
                  <div className="bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-400 uppercase tracking-wide font-semibold">Only you see this:</span>
                    </div>
                    <div className="flex items-center gap-2.5 font-bold">
                      <span className="text-[#1AB266]">{deal.profitPct}% commission</span>
                      <span className="text-slate-400">·</span>
                      <span>₹{deal.profitFlat}/sale</span>
                    </div>
                  </div>

                  {/* Audience-facing post */}
                  <div className="bg-white rounded-b-lg overflow-hidden border border-slate-200 border-t-0">
                    <div
                      className={`h-36 bg-gradient-to-br ${deal.image} relative flex items-center justify-center`}
                    >
                      <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-md px-2 py-1 text-[10px] font-bold text-slate-900">
                        {deal.brand}
                      </div>
                      {/* THIS is what the audience sees — discount, not commission */}
                      <div className="absolute top-2 right-2 bg-rose-500 text-white rounded-md px-2.5 py-1 text-xs font-extrabold">
                        {discountPct}% OFF
                      </div>
                      {deal.postedMinutesAgo < 30 && (
                        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white rounded-md px-2 py-1 text-[10px] font-bold">
                          🔥 Just dropped
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-bold text-slate-900">
                        🛒 {deal.title}
                      </div>
                      <div className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        <span className="line-through text-slate-400">
                          ₹{deal.originalPrice}
                        </span>{' '}
                        <span className="font-extrabold text-slate-900">
                          ₹{deal.salePrice}
                        </span>{' '}
                        <span className="text-rose-600 font-bold">
                          (save ₹{deal.originalPrice - deal.salePrice})
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">on {deal.brand}</div>
                      <div className="text-xs text-blue-600 mt-2 font-medium underline">
                        https://ektrack.in/r{deal.id}
                      </div>
                      <button className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                        <Edit3 className="w-3 h-3" />
                        Edit this post
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setStage('posted')}
            className="w-full mt-5 bg-[#1AB266] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Post all {selectedDeals.length} to {channels[channel].name}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <TopBar variant="page" title="Bulk share" />

      {/* Channel picker */}
      <div className="bg-white px-4 py-3 border-b border-slate-100">
        <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
          Post to
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(['telegram', 'whatsapp', 'all'] as const).map((ch) => (
            <button
              key={ch}
              onClick={() => setChannel(ch)}
              className={`py-2 px-1 rounded-lg border-2 text-left ${
                channel === ch
                  ? 'border-[#1AB266] bg-emerald-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="text-base">{channels[ch].emoji}</div>
              <div className={`text-[10px] font-bold mt-0.5 ${channel === ch ? 'text-emerald-900' : 'text-slate-900'}`}>
                {ch === 'all' ? 'All channels' : ch === 'telegram' ? 'Telegram' : 'WhatsApp'}
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5 leading-tight">
                {channels[ch].meta.split(' · ')[1]}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Select deals to post
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Audience sees discount and urgency. Your commission stays private.
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-700">
            {selected.size} selected
          </div>
        </div>
      </div>

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

      <div className="sticky bottom-16 bg-white border-t border-slate-200 px-4 py-3">
        <button
          onClick={() => selected.size > 0 && setStage('preview')}
          disabled={selected.size === 0}
          className="w-full bg-[#1AB266] disabled:bg-slate-300 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <ImageIcon className="w-4 h-4" />
          Preview {selected.size} posts
        </button>
        <div className="text-[10px] text-slate-500 text-center mt-2">
          Audience-ready format. Editable before posting.
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
