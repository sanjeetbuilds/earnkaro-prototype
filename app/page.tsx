'use client';

import { useState } from 'react';
import { personas } from '@/lib/personas';
import PhoneFrame from '@/components/PhoneFrame';
import RameshHome from '@/app/screens/ramesh-home';
import MonikaHome from '@/app/screens/monika-home';
import RameshDiscovery from '@/app/screens/ramesh-discovery';
import MonikaDiscovery from '@/app/screens/monika-discovery';
import RameshShare from '@/app/screens/ramesh-share';
import MonikaShare from '@/app/screens/monika-share';
import BottomNav from '@/components/BottomNav';

type Persona = 'ramesh' | 'monika' | null;
type Tab = 'home' | 'discovery' | 'share' | 'reports' | 'profile';

export default function Page() {
  const [persona, setPersona] = useState<Persona>(null);
  const [tab, setTab] = useState<Tab>('home');

  // Landing — persona selector
  if (!persona) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl text-center mb-12">
          <div className="inline-block mb-4 px-3 py-1 bg-slate-900 text-white text-xs font-medium rounded-full">
            EarnKaro — Product Assignment Prototype
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Same app. Two creators. Two completely different experiences.
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            EarnKaro serves 3M+ creators with one undifferentiated experience.
            This prototype demonstrates what a behaviorally-segmented product looks like —
            same surfaces (home, discovery, sharing), fundamentally different experiences,
            driven by a continuous behavioral classifier.
          </p>
          <p className="text-slate-500 text-sm mt-3 italic">
            Tap a persona to enter their app.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Ramesh card */}
          <button
            onClick={() => {
              setPersona('ramesh');
              setTab('home');
            }}
            className="group bg-white border-2 border-slate-200 hover:border-[#1AB266] rounded-2xl p-6 text-left transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-[#1AB266] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                R
              </div>
              <div>
                <div className="font-bold text-slate-900">Ramesh K.</div>
                <div className="text-xs text-slate-500">
                  Performance Distributor
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {personas.ramesh.oneLiner}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase text-slate-400 tracking-wide font-medium">
                  Audience
                </div>
                <div className="text-xs text-slate-700 font-medium">
                  {personas.ramesh.audienceType}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase text-slate-400 tracking-wide font-medium">
                  Wallet
                </div>
                <div className="text-sm text-slate-900 font-bold">
                  ₹{personas.ramesh.walletBalance.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-[#1AB266] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              View as Ramesh →
            </div>
          </button>

          {/* Monika card */}
          <button
            onClick={() => {
              setPersona('monika');
              setTab('home');
            }}
            className="group bg-white border-2 border-slate-200 hover:border-[#1AB266] rounded-2xl p-6 text-left transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                M
              </div>
              <div>
                <div className="font-bold text-slate-900">Monika S.</div>
                <div className="text-xs text-slate-500">Emerging Earner</div>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {personas.monika.oneLiner}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase text-slate-400 tracking-wide font-medium">
                  Audience
                </div>
                <div className="text-xs text-slate-700 font-medium">
                  {personas.monika.audienceType}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase text-slate-400 tracking-wide font-medium">
                  Wallet
                </div>
                <div className="text-sm text-slate-900 font-bold">
                  ₹{personas.monika.walletBalance}{' '}
                  <span className="text-[10px] text-amber-600 font-medium">
                    pending
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-[#1AB266] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              View as Monika →
            </div>
          </button>
        </div>

        {/* About panel */}
        <div className="mt-16 max-w-4xl w-full">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-wide text-slate-500 font-bold mb-4">
              About this prototype
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm font-bold text-slate-900 mb-2">
                  The architectural principle
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Segment is a <span className="font-semibold">state</span>,
                  not an identity. The system continuously classifies users
                  from behavior. A user who shifts from posting frequency 1×/week
                  to 30×/day transitions to a different experience — without
                  ever declaring &quot;I&apos;m a distributor now.&quot;
                </p>
              </div>

              <div>
                <div className="text-sm font-bold text-slate-900 mb-2">
                  Why these two segments
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Performance Distributor + Emerging Earner = the most dramatic
                  contrast. Same surfaces (home, discovery, sharing). One is
                  optimized for speed-to-share and commission. The other for
                  confidence and first-payout. Content Commerce Creators are
                  addressed in Q2 of the assignment.
                </p>
              </div>

              <div>
                <div className="text-sm font-bold text-slate-900 mb-2">
                  What&apos;s mocked vs. real
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All data is hand-crafted to demonstrate realistic behavior
                  (commission %, saturation, conversion). No backend. The point
                  is the personalization architecture — the surfaces, the signals,
                  the segment-aware defaults. The data model behind this is in
                  the written submission.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="text-[11px] uppercase tracking-wide text-slate-500 font-bold mb-3">
                The three segments
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-xs">
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                  <div className="font-bold text-emerald-900">
                    Performance Distributors
                  </div>
                  <div className="text-emerald-800 mt-1 leading-relaxed">
                    Operate distribution as a business. Telegram/WhatsApp groups
                    of 5K-50K. 8-15 sessions/day. ~60-80% of platform GMV.
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-2">
                    Prototyped ✓
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-100 rounded-lg p-3">
                  <div className="font-bold text-rose-900">Emerging Earners</div>
                  <div className="text-rose-800 mt-1 leading-relaxed">
                    First-time affiliate sharers. Personal WhatsApp networks of
                    50-500. Driven by independence + validation. Largest
                    acquisition funnel.
                  </div>
                  <div className="text-[10px] text-rose-700 font-semibold mt-2">
                    Prototyped ✓
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="font-bold text-slate-900">
                    Content Commerce Creators
                  </div>
                  <div className="text-slate-700 mt-1 leading-relaxed">
                    Instagram-first personal brands. Audience trust is the moat.
                    Multi-home across affiliate networks. Highest GMV per click.
                  </div>
                  <div className="text-[10px] text-slate-600 font-semibold mt-2">
                    Addressed in Q2 →
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400 mt-6">
            Built with Next.js + Tailwind · Mock data only · No backend ·
            All design tokens match the actual EarnKaro app
          </div>
        </div>
      </div>
    );
  }

  // In-app shell
  const screens = {
    ramesh: {
      home: <RameshHome />,
      discovery: <RameshDiscovery />,
      share: <RameshShare />,
      reports: <ComingSoon label="Reports — out of scope for this prototype" />,
      profile: <ComingSoon label="Profile — out of scope for this prototype" />,
    },
    monika: {
      home: <MonikaHome />,
      discovery: <MonikaDiscovery />,
      share: <MonikaShare />,
      reports: <ComingSoon label="Reports — out of scope for this prototype" />,
      profile: <ComingSoon label="Profile — out of scope for this prototype" />,
    },
  };

  return (
    <div>
      <PhoneFrame
        personaLabel={`${personas[persona].name} · ${personas[persona].segment}`}
        onSwitchPersona={() => setPersona(persona === 'ramesh' ? 'monika' : 'ramesh')}
      >
        <div className="flex flex-col h-full relative">
          <div className="flex-1 overflow-y-auto pb-20">
            {screens[persona][tab]}
          </div>
          <BottomNav active={tab} onChange={setTab} />
        </div>
      </PhoneFrame>

      {/* Back to selector */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => setPersona(null)}
          className="bg-white border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm flex items-center gap-2"
        >
          ← Back to overview
        </button>
      </div>
    </div>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="p-8 text-center text-slate-400 text-sm">
      <div className="mt-32">{label}</div>
      <div className="text-xs mt-2">
        The assignment scope is home, discovery, and sharing.
      </div>
    </div>
  );
}
