'use client';

import { monikaStarterDeals } from '@/lib/deals';
import { personas } from '@/lib/personas';
import DealCard from '@/components/DealCard';
import TopBar from '@/components/TopBar';
import { Check, Sparkles, ChevronRight } from 'lucide-react';

export default function MonikaHome() {
  const persona = personas.monika;
  const deals = monikaStarterDeals();

  const milestones = [
    { label: 'First share', done: true },
    { label: 'First click', done: true },
    { label: 'First purchase', done: false, current: true },
    { label: 'First payout', done: false },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <TopBar variant="brand" walletBalance={persona.walletBalance} />

      {/* Personal greeting */}
      <div className="bg-white px-4 pt-4 pb-3">
        <div className="text-sm text-slate-500">Hi Monika 👋</div>
        <div className="text-xl font-bold text-slate-900 mt-1 leading-tight">
          You&apos;re 2 days away from your first earnings.
        </div>
      </div>

      {/* Progress strip */}
      <div className="bg-white px-4 pb-4 border-b border-slate-100">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] uppercase tracking-wide text-emerald-800 font-bold">
              Your earning journey
            </div>
            <div className="text-[10px] text-emerald-700 font-medium">
              Day 6 of 14
            </div>
          </div>

          <div className="flex items-center justify-between relative">
            <div className="absolute top-3 left-3 right-3 h-0.5 bg-slate-200" />
            <div
              className="absolute top-3 left-3 h-0.5 bg-emerald-500"
              style={{ width: 'calc(50% - 12px)' }}
            />

            {milestones.map((m, i) => (
              <div
                key={i}
                className="relative z-10 flex flex-col items-center"
                style={{ flex: i === 0 || i === milestones.length - 1 ? '0 0 auto' : '1' }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    m.done
                      ? 'bg-emerald-500 border-emerald-500'
                      : m.current
                      ? 'bg-white border-emerald-500 ring-4 ring-emerald-100'
                      : 'bg-white border-slate-300'
                  }`}
                >
                  {m.done && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  {m.current && (
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  )}
                </div>
                <span
                  className={`text-[9px] font-semibold mt-1.5 text-center leading-tight ${
                    m.done || m.current ? 'text-slate-900' : 'text-slate-400'
                  }`}
                  style={{ maxWidth: '60px' }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-white/80 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-600">
                  Pending in your wallet
                </div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  ₹{persona.walletBalance}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-600">
                  Confirms by
                </div>
                <div className="text-xs font-semibold text-slate-900 mt-0.5">
                  May 23, 2026
                </div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-relaxed">
              💡 Your sister&apos;s Nykaa purchase is in the 14-day return window.
              Once it passes, your ₹30 unlocks automatically.
            </div>
          </div>
        </div>
      </div>

      {/* Start with these */}
      <div className="px-4 pt-5 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-base font-bold text-slate-900">
                Start with these
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Friends and family actually buy these
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3 pb-5">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} variant="simple" />
        ))}
      </div>

      {/* Explainer cards */}
      <div className="px-4 pb-6">
        <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-3">
          Earn confidently
        </div>
        <div className="space-y-2">
          <ExplainerCard
            emoji="💰"
            title="How payouts work"
            sub="Money lands in your bank 14 to 21 days after a sale"
          />
          <ExplainerCard
            emoji="🤔"
            title="Why some clicks don't convert"
            sub="It's not you. Here's what affects whether a click becomes a sale."
          />
          <ExplainerCard
            emoji="💬"
            title="Sharing without feeling salesy"
            sub="3 ways to recommend deals to friends that feel natural"
          />
        </div>
      </div>
    </div>
  );
}

function ExplainerCard({
  emoji,
  title,
  sub,
}: {
  emoji: string;
  title: string;
  sub: string;
}) {
  return (
    <button className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 text-left hover:border-slate-300 transition-colors">
      <div className="text-2xl flex-shrink-0">{emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
          {sub}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
    </button>
  );
}
