'use client';

import { useState } from 'react';
import { monikaStarterDeals } from '@/lib/deals';
import TopBar from '@/components/TopBar';
import { MessageCircle, Check, Edit3, Sparkles } from 'lucide-react';

type Tone = 'friend' | 'family' | 'recommendation';

export default function MonikaShare() {
  const deal = monikaStarterDeals()[0]; // Mamaearth hair oil — high conversion
  const [tone, setTone] = useState<Tone>('friend');
  const [stage, setStage] = useState<'compose' | 'sent'>('compose');

  const messages: Record<Tone, string> = {
    friend:
      'Hey! Saw this Mamaearth hair oil on a deal — was thinking of getting it for myself. Sharing in case you want it too. Half price right now 🙂',
    family:
      'Beta, Mamaearth oil is half off this week. Order karwa do agar chahiye — bahut cheap mil raha hai.',
    recommendation:
      "I've been using Mamaearth oil for a few months now — works really well for me. It's at half price right now if anyone wants to try.",
  };

  if (stage === 'sent') {
    return (
      <div className="bg-slate-50 min-h-screen">
        <TopBar variant="page" title="Shared!" />
        <div className="p-6 pt-12 text-center">
          <div className="w-20 h-20 bg-[#1AB266] rounded-full mx-auto flex items-center justify-center mb-4">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Shared on WhatsApp</h2>
          <p className="text-sm text-slate-600 mt-1">
            Your message went to 3 contacts
          </p>

          {/* Confidence + progress reinforcement */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mt-6 text-left">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-emerald-900">
                  You&apos;re on day 6 of your journey.
                </div>
                <div className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Most first orders happen between day 8 and day 14. Hang tight
                  — we&apos;ll notify you the moment someone buys.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 mt-4 text-left border border-slate-200">
            <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-3">
              What happens next
            </div>
            <div className="space-y-2.5">
              <Step number={1} label="They tap your link" status="waiting" />
              <Step number={2} label="They buy on Amazon" status="waiting" />
              <Step number={3} label="₹37 lands in your pending wallet" status="waiting" />
              <Step number={4} label="Confirms after the 14-day return window" status="waiting" />
            </div>
          </div>

          <button
            onClick={() => setStage('compose')}
            className="mt-6 text-[#1AB266] text-sm font-semibold"
          >
            Share another deal →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <TopBar variant="page" title="Share with friends" />

      {/* Deal preview */}
      <div className="bg-white px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div
            className={`w-14 h-14 rounded-lg bg-gradient-to-br ${deal.image} flex-shrink-0`}
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">
              {deal.title}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              ₹{deal.salePrice} on {deal.brand} · You earn ₹{deal.profitFlat}/sale
            </div>
          </div>
        </div>
      </div>

      {/* Tone selector — the personalization choice */}
      <div className="px-4 pt-4">
        <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
          How should this sound?
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ToneButton
            active={tone === 'friend'}
            onClick={() => setTone('friend')}
            emoji="👯"
            label="Friendly"
          />
          <ToneButton
            active={tone === 'family'}
            onClick={() => setTone('family')}
            emoji="🏡"
            label="Family"
          />
          <ToneButton
            active={tone === 'recommendation'}
            onClick={() => setTone('recommendation')}
            emoji="⭐"
            label="Recommend"
          />
        </div>
      </div>

      {/* Message preview — looks like an actual WhatsApp bubble */}
      <div className="px-4 mt-4">
        <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
          Message preview
        </div>
        <div className="bg-[#E8F8E8] rounded-2xl rounded-bl-sm p-3 border border-emerald-100 relative">
          <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
            {messages[tone]}
          </div>
          <div className="text-xs text-blue-600 mt-2 underline">
            https://ektrack.in/{deal.id}m
          </div>
          <div className="text-[10px] text-slate-400 mt-2 text-right">
            11:05 PM ✓✓
          </div>
        </div>

        <button className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
          <Edit3 className="w-3 h-3" />
          Edit the message in your own words
        </button>
      </div>

      {/* Authenticity note */}
      <div className="px-4 mt-3">
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] text-amber-900 leading-relaxed">
            <span className="font-semibold">Sounds like you, not an ad.</span>{' '}
            People buy more when the recommendation feels real — that&apos;s why
            this isn&apos;t &quot;OMG amazing deal!&quot;
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="sticky bottom-16 bg-white border-t border-slate-200 px-4 py-3 mt-6">
        <button
          onClick={() => setStage('sent')}
          className="w-full bg-[#1AB266] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Send on WhatsApp
        </button>
        <div className="text-[10px] text-slate-500 text-center mt-2">
          Opens WhatsApp · pick contacts or groups
        </div>
      </div>
    </div>
  );
}

function ToneButton({
  active,
  onClick,
  emoji,
  label,
}: {
  active: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-2.5 px-2 rounded-xl border-2 flex flex-col items-center gap-0.5 transition-all ${
        active
          ? 'border-[#1AB266] bg-emerald-50'
          : 'border-slate-200 bg-white'
      }`}
    >
      <span className="text-lg">{emoji}</span>
      <span
        className={`text-[10px] font-semibold ${
          active ? 'text-emerald-900' : 'text-slate-700'
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function Step({
  number,
  label,
  status,
}: {
  number: number;
  label: string;
  status: 'done' | 'current' | 'waiting';
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
          status === 'done'
            ? 'bg-emerald-500 text-white'
            : status === 'current'
            ? 'bg-amber-500 text-white animate-pulse'
            : 'bg-slate-200 text-slate-500'
        }`}
      >
        {status === 'done' ? '✓' : number}
      </div>
      <span className="text-xs text-slate-700">{label}</span>
    </div>
  );
}
