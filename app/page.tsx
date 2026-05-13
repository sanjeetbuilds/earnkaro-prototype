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
        <div className="max-w-2xl text-center mb-10">
          <div className="inline-block mb-5 px-3 py-1 bg-slate-900 text-white text-xs font-medium rounded-full">
            EarnKaro · Product Assignment
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">
            Same app, built two different ways.
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Pick a creator below to see how EarnKaro could feel if it knew who you were.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 w-full max-w-3xl">
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
              Runs a 28K-member household-deals Telegram group. Opens the app 12 times a day.
              His job: find high-commission deals before competitors do.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase text-slate-400 tracking-wide font-medium">
                  Audience
                </div>
                <div className="text-xs text-slate-700 font-medium">
                  Telegram · 28K members
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
              Homemaker, day 6 on the app. Shared a few deals to WhatsApp family.
              Wants spending money of her own. Wondering if this actually works.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase text-slate-400 tracking-wide font-medium">
                  Audience
                </div>
                <div className="text-xs text-slate-700 font-medium">
                  WhatsApp · friends &amp; family
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

        <div className="mt-10 text-center text-xs text-slate-400 max-w-md">
          Mock data. The architecture, reasoning, and metrics are in the written submission.
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
