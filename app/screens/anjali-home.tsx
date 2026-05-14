'use client';

import { useState } from 'react';
import { personas } from '@/lib/personas';
import {
  latestReel,
  storefrontThisWeek,
  topProductsThisWeek,
  searchMisses,
  autoFeatureDecisions,
} from '@/lib/anjali';
import TopBar from '@/components/TopBar';
import {
  PlayCircle,
  MessageCircle,
  ShoppingBag,
  TrendingUp,
  Search,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Check,
  Undo2,
} from 'lucide-react';

export default function AnjaliHome() {
  const persona = personas.anjali;
  const [tab, setTab] = useState<'overview' | 'auto'>('overview');

  return (
    <div className="bg-slate-50 min-h-screen">
      <TopBar variant="brand" walletBalance={persona.walletBalance} />

      {/* Greeting */}
      <div className="bg-white px-4 pt-4 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Hi Anjali</div>
            <div className="text-xl font-bold text-slate-900 mt-0.5 leading-tight">
              Your storefront is doing the work.
            </div>
          </div>
          <a
            href="/anjali"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-[#1AB266] flex items-center gap-1"
          >
            View public page
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Tab strip */}
      <div className="bg-white px-4 border-b border-slate-200 flex gap-4">
        <TabButton active={tab === 'overview'} onClick={() => setTab('overview')}>
          Performance
        </TabButton>
        <TabButton active={tab === 'auto'} onClick={() => setTab('auto')}>
          What the system did
          <span className="ml-1.5 bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            {autoFeatureDecisions.filter((d) => d.state === 'live').length}
          </span>
        </TabButton>
      </div>

      {tab === 'overview' ? <OverviewTab /> : <AutoTab />}
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="p-4 space-y-4">
      <ReelPerformanceCard />
      <StorefrontWeekCard />
      <TopProductsCard />
      <SearchMissesCard />
    </div>
  );
}

function AutoTab() {
  return (
    <div className="p-4 space-y-3">
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-[11px] text-amber-900 leading-relaxed">
          <span className="font-bold">Your storefront re-ranks itself daily.</span>{' '}
          Every decision is editable. Reverting one teaches the system your taste.
        </div>
      </div>

      {autoFeatureDecisions.map((d) => (
        <AutoDecisionCard key={d.id} decision={d} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Reel performance: the Day-14 Anjali demo, front and center.

function ReelPerformanceCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-4 h-4 text-rose-500" fill="currentColor" />
          <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
            Latest Reel
          </div>
        </div>
        <div className="text-[10px] text-slate-500">
          {latestReel.postedHoursAgo}h ago
        </div>
      </div>

      <div className="flex gap-3 p-4">
        <div
          className={`w-20 h-28 rounded-xl bg-gradient-to-br ${latestReel.thumbnail} flex-shrink-0 relative flex items-center justify-center`}
        >
          <PlayCircle className="w-8 h-8 text-white/90" fill="white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-slate-900 leading-snug">
            {latestReel.caption}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Promotes <span className="font-semibold text-slate-700">SBI SimplyCLICK</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <Stat tiny label="Views" value={fmtK(latestReel.views)} />
            <Stat tiny label="Likes" value={fmtK(latestReel.likes)} />
            <Stat tiny label="Comments" value={String(latestReel.comments)} />
          </div>
        </div>
      </div>

      {/* The funnel: this is the part that justifies the persona */}
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border-t border-indigo-100 px-4 py-3">
        <div className="flex items-center gap-1.5 mb-2.5">
          <MessageCircle className="w-3.5 h-3.5 text-indigo-700" />
          <span className="text-[11px] uppercase tracking-wide text-indigo-800 font-bold">
            Auto-DM funnel
          </span>
          <span className="ml-auto text-[10px] text-indigo-700 font-medium">
            trigger {latestReel.dmTrigger}
          </span>
        </div>
        <FunnelRow
          label="Commented with trigger"
          value={latestReel.dmsSent}
          tone="muted"
        />
        <FunnelRow
          label="Tapped your storefront link"
          value={latestReel.storefrontClicks}
          tone="muted"
          dropFromPrev={latestReel.dmsSent}
        />
        <FunnelRow
          label="Confirmed purchases"
          value={latestReel.confirmedPurchases}
          tone="highlight"
          dropFromPrev={latestReel.storefrontClicks}
        />
        <div className="mt-3 pt-3 border-t border-indigo-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-indigo-700">Pending earnings from this Reel</div>
            <div className="text-base font-bold text-indigo-950">
              ₹{latestReel.pendingEarnings.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="text-right text-[10px] text-indigo-700 leading-tight max-w-[40%]">
            Confirms ~14 days after each card is approved by SBI.
          </div>
        </div>
      </div>
    </div>
  );
}

function FunnelRow({
  label,
  value,
  tone,
  dropFromPrev,
}: {
  label: string;
  value: number;
  tone: 'muted' | 'highlight';
  dropFromPrev?: number;
}) {
  const dropPct =
    dropFromPrev && dropFromPrev > 0
      ? Math.round(((dropFromPrev - value) / dropFromPrev) * 100)
      : undefined;
  return (
    <div className="flex items-center justify-between py-1">
      <div className="text-[11px] text-indigo-900">{label}</div>
      <div className="flex items-center gap-2">
        {dropPct !== undefined && (
          <span className="text-[9px] text-indigo-500">−{dropPct}%</span>
        )}
        <span
          className={`text-sm font-bold ${
            tone === 'highlight' ? 'text-emerald-700' : 'text-indigo-950'
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Storefront-attributed GMV this week.

function StorefrontWeekCard() {
  const s = storefrontThisWeek;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-[#1AB266]" />
          <span className="text-[11px] uppercase tracking-wide text-slate-500 font-bold">
            Storefront this week
          </span>
        </div>
        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
          <TrendingUp className="w-2.5 h-2.5" />
          +{s.weekOverWeekPct}% WoW
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">
          ₹{s.gmv.toLocaleString('en-IN')}
        </span>
        <span className="text-[11px] text-slate-500">GMV attributed to /anjali</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <Stat label="Pending" value={`₹${s.pendingEarnings.toLocaleString('en-IN')}`} />
        <Stat label="Confirmed" value={`₹${s.confirmedEarnings.toLocaleString('en-IN')}`} />
        <Stat label="Visitors" value={fmtK(s.uniqueVisitors)} />
        <Stat
          label="Click → buy"
          value={`${s.conversionRatePct}%`}
          hint={`${s.conversions} of ${s.clicks}`}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Top-converting products.

function TopProductsCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-slate-700" />
          <span className="text-[11px] uppercase tracking-wide text-slate-500 font-bold">
            Top converting · 7 days
          </span>
        </div>
        <button className="text-[11px] text-[#1AB266] font-semibold flex items-center gap-0.5">
          See all <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {topProductsThisWeek.map((p, i) => (
          <div key={p.deal.id} className="px-4 py-3 flex items-center gap-3">
            <div className="text-[11px] font-bold text-slate-400 w-4 tabular-nums">
              {i + 1}
            </div>
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.deal.image} flex-shrink-0`}
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-900 truncate">
                {p.deal.brand} · {p.deal.title.split('·')[0].trim()}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {p.clicks} clicks · {p.conversions} bought · {p.conversionRatePct}%
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xs font-bold text-slate-900">
                ₹{p.earnings.toLocaleString('en-IN')}
              </div>
              <div className="text-[9px] text-slate-400 uppercase tracking-wide">
                {p.deal.payoutType === 'lead' ? 'pending' : 'earned'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Searches that returned nothing: Anjali's storefront gap signal.

function SearchMissesCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
        <Search className="w-4 h-4 text-amber-600" />
        <span className="text-[11px] uppercase tracking-wide text-slate-500 font-bold">
          Your audience searched · you don&apos;t stock it
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {searchMisses.map((m) => (
          <div key={m.query} className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-semibold text-slate-900 truncate">
                  &ldquo;{m.query}&rdquo;
                </span>
                {m.trend === 'spike' && (
                  <span className="text-[9px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold">
                    SPIKE
                  </span>
                )}
                {m.trend === 'rising' && (
                  <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">
                    RISING
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 flex-shrink-0">
                {m.searchesThisWeek} this week
              </div>
            </div>
            {m.suggestion && (
              <div className="mt-1.5 text-[11px] text-slate-600 leading-relaxed flex items-start gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{m.suggestion}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Auto-feature decisions card.

function AutoDecisionCard({
  decision,
}: {
  decision: (typeof autoFeatureDecisions)[number];
}) {
  const actionLabels: Record<typeof decision.action, { text: string; tone: string }> = {
    'promoted-to-featured': {
      text: 'Promoted to Featured',
      tone: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    'demoted-from-featured': {
      text: 'Removed from Featured',
      tone: 'bg-rose-50 text-rose-800 border-rose-200',
    },
    'pinned-to-top': {
      text: 'Pinned to Top',
      tone: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
  };
  const label = actionLabels[decision.action];

  return (
    <div
      className={`bg-white border border-slate-200 rounded-2xl p-4 ${
        decision.state === 'reverted-by-anjali' ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={`text-[10px] font-bold border px-2 py-0.5 rounded uppercase tracking-wide ${label.tone}`}
        >
          {label.text}
        </span>
        <span className="text-[10px] text-slate-500">{decision.decidedHoursAgo}h ago</span>
      </div>
      <div className="text-sm font-semibold text-slate-900">{decision.reason}</div>
      <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
        Signal: {decision.signal}
      </div>

      {decision.state === 'live' ? (
        <div className="mt-3 flex items-center gap-2">
          <button className="flex-1 bg-slate-900 text-white text-[11px] font-semibold py-2 rounded-md flex items-center justify-center gap-1.5">
            <Check className="w-3 h-3" />
            Keep
          </button>
          <button className="flex-1 bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold py-2 rounded-md flex items-center justify-center gap-1.5">
            <Undo2 className="w-3 h-3" />
            Revert
          </button>
        </div>
      ) : (
        <div className="mt-3 text-[10px] text-slate-500 italic flex items-center gap-1">
          <Undo2 className="w-3 h-3" />
          You reverted this. The system learned.
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Small UI atoms.

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative py-3 text-[12px] font-semibold flex items-center ${
        active ? 'text-slate-900' : 'text-slate-500'
      }`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-t" />
      )}
    </button>
  );
}

function Stat({
  label,
  value,
  hint,
  tiny,
}: {
  label: string;
  value: string;
  hint?: string;
  tiny?: boolean;
}) {
  return (
    <div className={tiny ? '' : 'bg-slate-50 rounded-lg p-2.5'}>
      <div
        className={`uppercase tracking-wide text-slate-500 font-semibold ${
          tiny ? 'text-[9px]' : 'text-[10px]'
        }`}
      >
        {label}
      </div>
      <div
        className={`font-bold text-slate-900 ${tiny ? 'text-sm mt-0.5' : 'text-base mt-1'}`}
      >
        {value}
      </div>
      {hint && <div className="text-[10px] text-slate-500 mt-0.5">{hint}</div>}
    </div>
  );
}

function fmtK(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
  return String(n);
}
