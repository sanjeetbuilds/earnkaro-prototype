'use client';

import { useState } from 'react';
import { anjaliFeed } from '@/lib/deals';
import TopBar from '@/components/TopBar';
import {
  Play,
  PlayCircle,
  Image as ImageIcon,
  MessageCircle,
  Check,
  Copy,
  Wand2,
} from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
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

type Format = 'reel' | 'story' | 'dm';

export default function AnjaliShare() {
  const deal = anjaliFeed()[0]; // SBI SimplyCLICK by default
  const [format, setFormat] = useState<Format>('reel');
  const [stage, setStage] = useState<'compose' | 'scheduled'>('compose');

  if (stage === 'scheduled') {
    return (
      <div className="bg-slate-50 min-h-screen">
        <TopBar variant="page" title="Scheduled" />
        <div className="p-6 pt-12 text-center">
          <div className="w-20 h-20 bg-[#1AB266] rounded-full mx-auto flex items-center justify-center mb-4">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Auto-DM is armed
          </h2>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed max-w-xs mx-auto">
            When you post this Reel, anyone who comments &ldquo;CARD&rdquo; will get the
            SBI link in their DM automatically.
          </p>

          <div className="bg-white rounded-2xl p-4 mt-6 text-left border border-slate-200">
            <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-3">
              What happens after you post
            </div>
            <div className="space-y-2.5 text-xs">
              <Row label="Reel goes live on" value="@anjali.finance" />
              <Row label="Trigger" value={`Comment "CARD"`} />
              <Row label="DM template" value="Hi 👋 here's the SBI card I use..." />
              <Row label="Tracked via" value="anjali.in/sbi" highlight />
              <Row label="Est. commission" value={`₹${deal.profitFlat}/approved card`} highlight />
            </div>
          </div>

          <button
            onClick={() => setStage('compose')}
            className="mt-6 text-[#1AB266] text-sm font-semibold"
          >
            Set up another →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <TopBar variant="page" title="Promote partner" />

      {/* Deal at top */}
      <div className="bg-white px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${deal.image} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">
              {deal.title.split('·')[0].trim()}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {deal.brand} · ₹{deal.profitFlat}/approved · coupon{' '}
              <span className="font-mono font-bold text-slate-700">
                {deal.couponCode}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Format picker: influencer-native */}
      <div className="px-4 pt-4">
        <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
          Format
        </div>
        <div className="grid grid-cols-3 gap-2">
          <FormatButton
            active={format === 'reel'}
            onClick={() => setFormat('reel')}
            icon={<PlayCircle className="w-5 h-5" />}
            label="Reel"
            sub="Auto-DM enabled"
          />
          <FormatButton
            active={format === 'story'}
            onClick={() => setFormat('story')}
            icon={<ImageIcon className="w-5 h-5" />}
            label="Story"
            sub="Sticker link"
          />
          <FormatButton
            active={format === 'dm'}
            onClick={() => setFormat('dm')}
            icon={<MessageCircle className="w-5 h-5" />}
            label="Broadcast DM"
            sub="Close friends"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="px-4 mt-4">
        <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
          Preview · Instagram
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          {/* Mock IG post header */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-rose-500 flex items-center justify-center text-white text-[10px] font-bold">
              A
            </div>
            <div className="text-xs font-semibold text-slate-900">anjali.finance</div>
            <InstagramIcon className="w-3.5 h-3.5 text-slate-400 ml-auto" />
          </div>

          {format === 'reel' && (
            <div className="aspect-[9/14] bg-gradient-to-br from-indigo-300 via-violet-300 to-blue-400 relative overflow-hidden">
              {/* Auto-DM chip (moved to top-left so the duration chip can sit top-right) */}
              <div className="absolute top-3 left-3 bg-white/90 text-slate-900 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
                <Wand2 className="w-2.5 h-2.5" />
                Auto-DM ready
              </div>

              {/* Duration chip */}
              <div className="absolute top-3 right-3 bg-black/70 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full z-10 tabular-nums">
                0:47
              </div>

              {/* Centered play affordance */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Play
                  className="w-12 h-12 text-white/50"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </div>

              {/* Bottom caption underlay — transparent → 30% black gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent px-4 pt-14 pb-4 text-white">
                <div className="text-sm font-bold leading-snug drop-shadow-sm">
                  The credit card I actually use for online shopping (full breakdown).
                </div>
                <div className="mt-2 inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-bold">
                  Comment &quot;CARD&quot; for the link
                </div>
              </div>
            </div>
          )}

          {format === 'story' && (
            <div className="aspect-[9/14] bg-gradient-to-br from-rose-200 via-amber-200 to-orange-300 relative flex flex-col items-center justify-center p-4 text-center">
              <div className="text-slate-900 text-base font-bold leading-tight">
                The card 90% of finance creators recommend
              </div>
              <div className="mt-3 bg-white shadow-md rounded-lg px-3 py-2 text-[11px] font-bold text-slate-900 inline-flex items-center gap-2">
                Tap sticker → SBI SimplyCLICK
              </div>
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded-full">
                anjali.in/sbi
              </div>
            </div>
          )}

          {format === 'dm' && (
            <div className="p-3 bg-slate-50">
              <div className="bg-[#E8F8E8] rounded-2xl rounded-bl-sm p-3 border border-emerald-100 max-w-[85%]">
                <div className="text-[11px] text-slate-800 leading-relaxed">
                  Hey 👋 dropping the HDFC Millennia card I keep mentioning.
                  5% cashback on Swiggy, Zomato, Amazon. ₹450 cashback on first
                  spend. Quick apply ↓
                </div>
                <div className="text-[10px] text-blue-600 mt-2 underline">
                  anjali.in/hdfc
                </div>
              </div>
              <div className="text-[9px] text-slate-400 mt-1 ml-1">
                Broadcast to 412 close-friends list
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tracking link card */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
              Your tracked link
            </div>
            <div className="text-xs text-blue-700 mt-0.5 underline truncate">
              anjali.in/hdfc
            </div>
          </div>
          <button className="flex items-center gap-1 bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1.5 rounded-md">
            <Copy className="w-3 h-3" />
            Copy
          </button>
        </div>
        <div className="text-[10px] text-slate-500 mt-2 leading-relaxed">
          Coupon{' '}
          <span className="font-mono font-bold text-slate-700">{deal.couponCode}</span>{' '}
          is pre-attached. Audience sees the discount; your commission stays private.
        </div>
      </div>

      <div className="sticky bottom-16 bg-white border-t border-slate-200 px-4 py-3 mt-6">
        <button
          onClick={() => setStage('scheduled')}
          className="w-full bg-[#1AB266] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          {format === 'reel'
            ? 'Arm Auto-DM & open Instagram'
            : format === 'story'
            ? 'Open Story composer'
            : 'Send broadcast'}
        </button>
        <div className="text-[10px] text-slate-500 text-center mt-2">
          We open Instagram with the asset pre-filled. You post when ready.
        </div>
      </div>
    </div>
  );
}

function FormatButton({
  active,
  onClick,
  icon,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-2 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
        active ? 'border-[#1AB266] bg-emerald-50' : 'border-slate-200 bg-white'
      }`}
    >
      <span className={active ? 'text-emerald-700' : 'text-slate-500'}>{icon}</span>
      <span
        className={`text-[11px] font-bold ${
          active ? 'text-emerald-900' : 'text-slate-900'
        }`}
      >
        {label}
      </span>
      <span className="text-[9px] text-slate-500">{sub}</span>
    </button>
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
    <div className="flex items-start justify-between gap-3">
      <span className="text-slate-500">{label}</span>
      <span
        className={`text-right ${
          highlight ? 'font-bold text-slate-900' : 'text-slate-700'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
