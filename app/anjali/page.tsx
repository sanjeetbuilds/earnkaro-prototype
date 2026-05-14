'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Deal } from '@/lib/deals';
import { anjaliFeed } from '@/lib/deals';
import { recentReels } from '@/lib/anjali';
import {
  Search,
  PlayCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';

const brandColors: Record<string, string> = {
  'SBI Card': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Axis Bank': 'bg-rose-100 text-rose-800 border-rose-200',
  'HDFC Bank': 'bg-blue-100 text-blue-800 border-blue-200',
  Groww: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Zerodha: 'bg-sky-100 text-sky-800 border-sky-200',
  Cred: 'bg-violet-100 text-violet-800 border-violet-200',
  Slice: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
  Paytm: 'bg-cyan-100 text-cyan-800 border-cyan-200',
};

const categories = ['All', 'Credit Cards', 'Investing', 'Fintech'] as const;
type Category = (typeof categories)[number];

export default function AnjaliStorefront() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [selected, setSelected] = useState<Deal | null>(null);

  const allProducts = useMemo(() => anjaliFeed(), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allProducts.filter((d) => {
      if (category !== 'All' && d.category !== category) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.brand.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      );
    });
  }, [allProducts, query, category]);

  return (
    <div className="min-h-screen" style={{ background: '#FAF7EF' }}>
      {/* Hero */}
      <header className="relative">
        <div className="max-w-5xl mx-auto px-5 pt-10 pb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="font-serif text-base text-slate-900 tracking-tight">
              anjali<span className="text-amber-700">.</span>finance
            </div>
            <Link
              href="/"
              className="text-[11px] text-slate-500 hover:text-slate-900 underline decoration-dotted"
            >
              back to creator app
            </Link>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 text-[11px] font-semibold text-emerald-800 mb-4">
                <ShieldCheck className="w-3 h-3" />
                Pre-vetted picks · live coupons
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-slate-900 leading-[1.05] tracking-tight">
                Personal finance,
                <br />
                <span className="italic text-amber-800">simply explained.</span>
              </h1>
              <p className="text-slate-600 text-sm md:text-base mt-4 leading-relaxed max-w-md">
                I&apos;m Anjali. I break down credit cards, mutual funds and fintech apps
                for everyone who&apos;d rather not read a finance blog. Below: the apps
                and cards I actually use, with live coupons.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-5">
                <SocialPill icon={<InstagramIcon />} handle="@anjali.finance" sub="80K" />
                <SocialPill icon={<YoutubeIcon />} handle="Anjali Finance" sub="12K" />
                <SocialPill icon={<TwitterIcon />} handle="@anjali_rs" sub="6K" />
              </div>
            </div>

            <HeroIllustration />
          </div>
        </div>
      </header>

      {/* Search + category */}
      <section className="max-w-5xl mx-auto px-5 pb-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex items-center gap-2 shadow-sm">
          <Search className="w-4 h-4 text-slate-400 ml-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Anjali's recommendations…"
            className="flex-1 bg-transparent text-sm py-2.5 placeholder:text-slate-400 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto -mx-5 px-5 pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-colors ${
                category === c
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Latest drops carousel */}
      <section className="max-w-5xl mx-auto px-5 pt-6">
        <div className="flex items-end justify-between mb-3">
          <div>
            <h2 className="font-serif text-2xl text-slate-900">Latest finance drops</h2>
            <p className="text-[12px] text-slate-500 mt-0.5">
              My most recent Reels. Tap one for the deal it covers.
            </p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-2 snap-x">
          {recentReels.map((reel) => {
            const deal = allProducts.find((d) => d.id === reel.dealId);
            return (
              <button
                key={reel.id}
                onClick={() => deal && setSelected(deal)}
                className="flex-shrink-0 w-56 text-left snap-start"
              >
                <div
                  className={`aspect-[9/14] rounded-2xl bg-gradient-to-br ${reel.thumbnail} relative overflow-hidden shadow-sm`}
                >
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-900 flex items-center gap-1">
                    <PlayCircle className="w-3 h-3 text-rose-600" fill="currentColor" />
                    Reel · {fmtK(reel.views)} views
                  </div>
                  <div className="absolute inset-x-3 bottom-3 bg-black/35 backdrop-blur-sm rounded-xl p-2.5 text-white">
                    <div className="text-[11px] font-semibold leading-snug line-clamp-3">
                      {reel.caption}
                    </div>
                    {deal && (
                      <div className="mt-1.5 text-[10px] text-white/80 truncate">
                        Covers: {deal.brand}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Product grid */}
      <section className="max-w-5xl mx-auto px-5 pt-8 pb-16">
        <h2 className="font-serif text-2xl text-slate-900 mb-1">
          Cards, demats &amp; apps I actually use
        </h2>
        <p className="text-[12px] text-slate-500 mb-5">
          {filtered.length} {filtered.length === 1 ? 'pick' : 'picks'} · live coupons applied at checkout
        </p>

        {filtered.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
            <div className="text-sm font-semibold text-slate-900">
              No matches for &ldquo;{query}&rdquo;
            </div>
            <div className="text-[11px] text-slate-500 mt-1 leading-relaxed max-w-xs mx-auto">
              I haven&apos;t covered this yet. Anjali sees every empty search in her dashboard,
              so this one might become a Reel soon.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((d) => (
              <ProductCard key={d.id} deal={d} onOpen={() => setSelected(d)} />
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-slate-200/70 py-6 px-5">
        <div className="max-w-5xl mx-auto text-[10px] text-slate-500 leading-relaxed">
          Anjali earns a small commission on partners listed above, at no extra cost to you.
          Coupons are pre-attached to every link. Always read terms before applying for a credit
          product. Not investment advice.
        </div>
      </footer>

      {selected && <ProductModal deal={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Product card.

function ProductCard({ deal, onOpen }: { deal: Deal; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="text-left bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-slate-300 transition-all"
    >
      <div
        className={`aspect-[5/4] bg-gradient-to-br ${deal.image} relative flex items-end p-2.5`}
      >
        <span
          className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
            brandColors[deal.brand] ?? 'bg-white text-slate-800 border-slate-200'
          }`}
        >
          {deal.brand}
        </span>
        {deal.couponCode && (
          <span className="absolute top-2.5 right-2.5 bg-amber-300 text-amber-950 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
            {deal.couponCode}
          </span>
        )}
      </div>
      <div className="p-3">
        <div className="text-[13px] font-semibold text-slate-900 leading-snug line-clamp-2">
          {deal.title.split('·')[0].trim()}
        </div>
        <div className="text-[10px] text-slate-500 mt-1">{deal.category}</div>
        <div className="mt-2 flex items-center justify-between">
          {deal.payoutType === 'lead' ? (
            <span className="text-[11px] font-semibold text-emerald-700">
              Apply free
            </span>
          ) : deal.salePrice > 0 ? (
            <span className="text-[11px] font-semibold text-slate-900">
              ₹{deal.salePrice} reward
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-slate-900">Free signup</span>
          )}
          <span className="text-[10px] text-slate-400">View →</span>
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Product detail modal.

function ProductModal({ deal, onClose }: { deal: Deal; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyCoupon = () => {
    if (!deal.couponCode) return;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(deal.couponCode).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const liveLabel =
    deal.payoutType === 'lead'
      ? 'Joining fee'
      : deal.payoutType === 'signup'
      ? 'Signup reward'
      : 'Live price';

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero */}
        <div className={`relative h-44 bg-gradient-to-br ${deal.image} flex items-end p-4`}>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-slate-700" />
          </button>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
              brandColors[deal.brand] ?? 'bg-white text-slate-800 border-slate-200'
            }`}
          >
            {deal.brand}
          </span>
        </div>

        <div className="p-5">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
            {deal.category}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
            {deal.title}
          </h3>

          {/* Live price */}
          <div className="mt-4 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-baseline justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
                {liveLabel}
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">
                {deal.payoutType === 'lead' || deal.salePrice === 0 ? (
                  <>
                    ₹0{' '}
                    {deal.originalPrice > 0 && (
                      <span className="text-sm text-slate-400 line-through font-normal">
                        ₹{deal.originalPrice}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    ₹{deal.salePrice}{' '}
                    {deal.originalPrice > 0 && (
                      <span className="text-sm text-slate-400 line-through font-normal">
                        ₹{deal.originalPrice}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="text-right text-[10px] text-slate-500">
              Updated just now
            </div>
          </div>

          {/* Coupon */}
          {deal.couponCode && (
            <div className="mt-3 border-2 border-dashed border-amber-300 bg-amber-50 rounded-2xl p-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wide text-amber-700 font-bold">
                  Active coupon
                </div>
                <div className="font-mono text-base font-bold text-amber-950 mt-0.5 truncate">
                  {deal.couponCode}
                </div>
              </div>
              <button
                onClick={copyCoupon}
                className="flex-shrink-0 bg-amber-900 text-amber-50 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy code
                  </>
                )}
              </button>
            </div>
          )}

          {/* What Anjali says */}
          <div className="mt-4">
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-1.5">
              Why Anjali picked this
            </div>
            <p className="text-[13px] text-slate-700 leading-relaxed">
              {anjaliBlurb(deal)}
            </p>
          </div>

          {/* CTA */}
          <a
            href={deal.affiliateUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            {deal.ctaLabel ?? 'Buy now'}
            <ExternalLink className="w-4 h-4" />
          </a>
          <div className="text-[10px] text-slate-500 text-center mt-2 leading-relaxed">
            Opens partner site. Coupon applies automatically at checkout. Anjali earns a
            small commission, no extra cost to you.
          </div>
        </div>
      </div>
    </div>
  );
}

function anjaliBlurb(deal: Deal): string {
  const blurbs: Record<string, string> = {
    a1: 'I keep this in my wallet for online shopping. The ₹500 Amazon voucher offsets the joining fee on first spend, and the 10× rewards on online merchants are real.',
    a2: 'If most of your spend is on Google Pay bills (electricity, gas, broadband), this card pays back 5%. Don\'t bother if your bills are tiny: flat ₹250 cap per month.',
    a3: 'My pick for Swiggy/Zomato/Amazon households. The 5% cashback is real, and the joining offer covers most lifestyle reimbursements for the first year.',
    a4: 'Easiest way to start a SIP: Groww gives you ₹100 once your first SIP debits. I use this for my long-term equity allocation.',
    a5: 'My demat for delivery trades. ₹0 brokerage on equity delivery means you keep more of every long-term hold. The account opening is fully digital.',
    a6: 'I pay every credit card bill on Cred. Reminder, statement parsing, and the rewards round to actual things (Amazon vouchers, premium subscriptions).',
    a7: 'Slice is my secondary UPI for splitting tabs. The cashback on first ₹500 is a nice on-ramp. Not a credit card; treat it as a UPI app first.',
    a8: 'Useful for the no-interest postpaid window if you\'re disciplined. I use it to smooth large one-off bills, not for recurring spend.',
  };
  return blurbs[deal.id] ?? 'A partner I\'ve personally vetted.';
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero illustration: soft, hand-drawn-ish; not flashy.

function HeroIllustration() {
  return (
    <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto md:mx-0">
      {/* sun-like background circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-amber-100 to-orange-200" />
      {/* coin */}
      <div className="absolute top-6 left-6 w-14 h-14 rounded-full bg-amber-300 border-4 border-amber-400/60 shadow-md flex items-center justify-center font-serif text-2xl text-amber-900">
        ₹
      </div>
      {/* card */}
      <div className="absolute bottom-8 right-4 w-20 h-12 rounded-lg bg-indigo-500 shadow-lg rotate-[-8deg] p-1.5">
        <div className="w-5 h-3.5 bg-amber-300 rounded-sm" />
        <div className="mt-1 w-12 h-1 bg-white/40 rounded-full" />
        <div className="mt-0.5 w-8 h-1 bg-white/40 rounded-full" />
      </div>
      {/* chart squiggle */}
      <svg
        viewBox="0 0 100 60"
        className="absolute bottom-3 left-3 w-20 h-12 text-emerald-700/80"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 50 L20 35 L35 42 L55 18 L75 25 L98 6" />
        <circle cx="98" cy="6" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}

function SocialPill({
  icon,
  handle,
  sub,
}: {
  icon: React.ReactNode;
  handle: string;
  sub: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full pl-2 pr-3 py-1">
      <span className="text-slate-700">{icon}</span>
      <span className="text-[12px] font-semibold text-slate-900">{handle}</span>
      <span className="text-[10px] text-slate-500">{sub}</span>
    </div>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21l-6.49 7.41L22.5 22h-6.18l-4.83-6.32L5.95 22H3.18l6.94-7.93L1.5 2h6.33l4.38 5.79L18.244 2Zm-1.083 18.18h1.71L7.97 3.74H6.16l11 16.44Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.77 2 12 2 12s0 3.23.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.23 22 12 22 12s0-3.23-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

function fmtK(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
  return String(n);
}
