'use client';

import { useState } from 'react';
import { personas, PersonaId } from '@/lib/personas';
import PhoneFrame from '@/components/PhoneFrame';
import RameshHome from '@/app/screens/ramesh-home';
import MonikaHome from '@/app/screens/monika-home';
import AnjaliHome from '@/app/screens/anjali-home';
import RameshDiscovery from '@/app/screens/ramesh-discovery';
import MonikaDiscovery from '@/app/screens/monika-discovery';
import AnjaliDiscovery from '@/app/screens/anjali-discovery';
import RameshShare from '@/app/screens/ramesh-share';
import MonikaShare from '@/app/screens/monika-share';
import AnjaliShare from '@/app/screens/anjali-share';
import BottomNav from '@/components/BottomNav';

type Persona = PersonaId | null;
type Tab = 'home' | 'discovery' | 'share' | 'reports' | 'profile';

const personaOrder: PersonaId[] = ['ramesh', 'monika', 'anjali'];

export default function Page() {
  const [persona, setPersona] = useState<Persona>(null);
  const [tab, setTab] = useState<Tab>('home');

  // Landing: persona selector
  if (!persona) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl text-center mb-10">
          <div className="inline-block mb-5 px-3 py-1 bg-slate-900 text-white text-xs font-medium rounded-full">
            EarnKaro · Product Assignment
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">
            Same app, built three different ways.
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Pick a creator below to see how EarnKaro could feel if it knew who you were.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 w-full max-w-5xl">
          <PersonaCard
            onSelect={() => {
              setPersona('ramesh');
              setTab('home');
            }}
            initial="R"
            chipColor="bg-[#1AB266]"
            name="Ramesh K."
            segment="Performance Distributor"
            body="Runs a 28K-member household-deals Telegram group. Opens the app 12 times a day. His job: find high-commission deals before competitors do."
            audienceLabel="Telegram · 28K members"
            walletText={`₹${personas.ramesh.walletBalance.toLocaleString('en-IN')}`}
            walletStatus={null}
            cta="View as Ramesh"
          />
          <PersonaCard
            onSelect={() => {
              setPersona('monika');
              setTab('home');
            }}
            initial="M"
            chipColor="bg-rose-500"
            name="Monika S."
            segment="Emerging Earner"
            body="Homemaker, day 6 on the app. Shared a few deals to WhatsApp family. Wants spending money of her own. Wondering if this actually works."
            audienceLabel="WhatsApp · friends & family"
            walletText={`₹${personas.monika.walletBalance}`}
            walletStatus="pending"
            cta="View as Monika"
          />
          <PersonaCard
            onSelect={() => {
              setPersona('anjali');
              setTab('home');
            }}
            initial="A"
            chipColor="bg-indigo-600"
            name="Anjali R."
            segment="Settled Niche Influencer"
            body="80K followers on Instagram. Pune. Personal-finance niche. Posts Reels weekly, uses Auto-DM to capture commenters into her storefront."
            audienceLabel="Instagram · 80K followers"
            walletText={`₹${personas.anjali.walletBalance.toLocaleString('en-IN')}`}
            walletStatus="pending"
            cta="View as Anjali"
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500">
          <span>Or jump straight to Anjali&apos;s public storefront:</span>
          <a
            href="/anjali"
            className="font-mono font-semibold text-slate-900 underline decoration-dotted"
          >
            /anjali
          </a>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400 max-w-md">
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
      reports: <ComingSoon label="Reports" />,
      profile: <ComingSoon label="Profile" />,
    },
    monika: {
      home: <MonikaHome />,
      discovery: <MonikaDiscovery />,
      share: <MonikaShare />,
      reports: <ComingSoon label="Reports" />,
      profile: <ComingSoon label="Profile" />,
    },
    anjali: {
      home: <AnjaliHome />,
      discovery: <AnjaliDiscovery />,
      share: <AnjaliShare />,
      reports: <ComingSoon label="Reports" />,
      profile: <ComingSoon label="Profile" />,
    },
  };

  const nextPersona = (): PersonaId => {
    const i = personaOrder.indexOf(persona);
    return personaOrder[(i + 1) % personaOrder.length];
  };

  return (
    <div>
      <PhoneFrame
        personaLabel={`${personas[persona].name} · ${personas[persona].segment}`}
        onSwitchPersona={() => {
          setPersona(nextPersona());
          setTab('home');
        }}
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

function PersonaCard({
  onSelect,
  initial,
  chipColor,
  name,
  segment,
  body,
  audienceLabel,
  walletText,
  walletStatus,
  cta,
}: {
  onSelect: () => void;
  initial: string;
  chipColor: string;
  name: string;
  segment: string;
  body: string;
  audienceLabel: string;
  walletText: string;
  walletStatus: 'pending' | null;
  cta: string;
}) {
  return (
    <button
      onClick={onSelect}
      className="group bg-white border-2 border-slate-200 hover:border-[#1AB266] rounded-2xl p-6 text-left transition-all hover:shadow-xl"
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-14 h-14 ${chipColor} text-white rounded-full flex items-center justify-center text-2xl font-bold`}
        >
          {initial}
        </div>
        <div>
          <div className="font-bold text-slate-900">{name}</div>
          <div className="text-xs text-slate-500">{segment}</div>
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase text-slate-400 tracking-wide font-medium">
            Audience
          </div>
          <div className="text-xs text-slate-700 font-medium">{audienceLabel}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase text-slate-400 tracking-wide font-medium">
            Wallet
          </div>
          <div className="text-sm text-slate-900 font-bold">
            {walletText}{' '}
            {walletStatus === 'pending' && (
              <span className="text-[10px] text-amber-600 font-medium">pending</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 text-xs text-[#1AB266] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
        {cta} →
      </div>
    </button>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="p-8 text-center">
      <div className="mt-24">
        <div className="text-5xl mb-4">🚧</div>
        <div className="text-base font-bold text-slate-700">{label}</div>
        <div className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
          Not built for this prototype. The assignment scope is home, discovery, and sharing.
          Reports and Profile changes are referenced in the written submission.
        </div>
      </div>
    </div>
  );
}
