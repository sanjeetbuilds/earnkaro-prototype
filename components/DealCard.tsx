'use client';

import { Deal } from '@/lib/deals';
import { Copy, Share2, Users, Clock } from 'lucide-react';

type Variant = 'operator' | 'simple' | 'standard';

type Props = {
  deal: Deal;
  variant: Variant;
  onShare?: () => void;
  onCopy?: () => void;
};

const brandColors: Record<string, string> = {
  Flipkart: 'bg-blue-100 text-blue-700',
  Amazon: 'bg-orange-100 text-orange-700',
  Myntra: 'bg-pink-100 text-pink-700',
  AJIO: 'bg-slate-100 text-slate-700',
  Nykaa: 'bg-rose-100 text-rose-700',
};

export default function DealCard({ deal, variant, onShare, onCopy }: Props) {
  // OPERATOR variant — for Ramesh
  // Shows commission %, saturation, freshness inline. Compact.
  if (variant === 'operator') {
    const isFresh = deal.postedMinutesAgo < 30;

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex gap-3 hover:border-slate-300 transition-colors">
        {/* Image */}
        <div
          className={`w-20 h-20 rounded-lg bg-gradient-to-br ${deal.image} flex-shrink-0 flex items-center justify-center`}
        >
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded ${brandColors[deal.brand]}`}
          >
            {deal.brand}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 flex-1">
              {deal.title}
            </h3>
            <div className="bg-[#1AB266] text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
              {deal.profitPct}%
            </div>
          </div>

          <div className="text-xs text-slate-500 mt-1 flex items-center gap-3 flex-wrap">
            <span>₹{deal.salePrice}</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#1AB266] font-medium">
              ₹{deal.profitFlat}/sale
            </span>
          </div>

          {/* Operator signals — REWRITTEN with interpretive labels */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-semibold flex items-center gap-1 ${
                isFresh
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-slate-50 text-slate-500'
              }`}
            >
              {isFresh ? '🔥' : <Clock className="w-2.5 h-2.5" />}
              {isFresh
                ? `Just dropped · ${deal.postedMinutesAgo}m`
                : deal.postedMinutesAgo < 60
                ? `${deal.postedMinutesAgo}m ago`
                : `${Math.floor(deal.postedMinutesAgo / 60)}h ago`}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-semibold flex items-center gap-1 ${
                deal.saturationCount <= 5
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : deal.saturationCount <= 20
                  ? 'bg-slate-50 text-slate-600'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              <Users className="w-2.5 h-2.5" />
              {deal.saturationCount <= 5
                ? `Be first · ${deal.saturationCount} shared`
                : deal.saturationCount <= 20
                ? `${deal.saturationCount} shared`
                : `Saturated · ${deal.saturationCount} shared`}
            </span>
          </div>

          {/* Channel-aware share — defaults to user's primary, but flexible */}
          <button
            onClick={onShare}
            className="w-full mt-2 bg-slate-900 text-white text-xs font-semibold py-1.5 rounded-md flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-3 h-3" />
            Generate & share
            <span className="text-[10px] text-slate-400 font-normal">
              → Telegram
            </span>
          </button>
        </div>
      </div>
    );
  }

  // SIMPLE variant — for Monika
  // Big visuals, friendly framing, conversion confidence signal, no overwhelm
  if (variant === 'simple') {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {/* Big image */}
        <div
          className={`h-32 bg-gradient-to-br ${deal.image} relative flex items-center justify-center`}
        >
          <span
            className={`text-sm font-bold px-3 py-1 rounded-md ${brandColors[deal.brand]}`}
          >
            {deal.brand}
          </span>
          {(deal.conversionRate ?? 0) >= 10 ? (
            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full">
              ✨ Easy sell
            </div>
          ) : (deal.conversionRate ?? 0) >= 7 ? (
            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full">
              👍 Good pick
            </div>
          ) : null}
        </div>

        {/* Body */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">
            {deal.title}
          </h3>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold text-slate-900">
              ₹{deal.salePrice}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{deal.originalPrice}
            </span>
          </div>

          {/* Confidence signal — the key motivational element */}
          <div className="mt-2 bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-2">
            <div className="text-[11px] text-emerald-800 font-medium">
              You earn <span className="font-bold">₹{deal.profitFlat}</span> on every sale
            </div>
            {deal.conversionRate && (
              <div className="text-[10px] text-emerald-700 mt-0.5">
                {deal.conversionRate}% of clicks usually buy this
              </div>
            )}
          </div>

          {/* One primary action — no overwhelm */}
          <button
            onClick={onShare}
            className="w-full mt-3 bg-[#1AB266] text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share with friends
          </button>
        </div>
      </div>
    );
  }

  // STANDARD — fallback (current EarnKaro style)
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className={`h-28 bg-gradient-to-br ${deal.image}`} />
      <div className="p-3">
        <h3 className="text-sm font-semibold">{deal.title}</h3>
        <div className="text-xs text-slate-500 mt-1">
          ₹{deal.salePrice} · {deal.profitPct}% profit
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={onCopy}
            className="flex-1 border border-[#1AB266] text-[#1AB266] text-xs font-semibold py-1.5 rounded-md flex items-center justify-center gap-1"
          >
            <Copy className="w-3 h-3" />
            Copy
          </button>
          <button
            onClick={onShare}
            className="flex-1 bg-[#1AB266] text-white text-xs font-semibold py-1.5 rounded-md flex items-center justify-center gap-1"
          >
            <Share2 className="w-3 h-3" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
