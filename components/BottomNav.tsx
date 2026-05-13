'use client';

import { Home, ShoppingBag, Link2, TrendingUp, User } from 'lucide-react';

type Tab = 'home' | 'discovery' | 'share' | 'reports' | 'profile';

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

export default function BottomNav({ active, onChange }: Props) {
  const Item = ({
    tab,
    icon: Icon,
    label,
  }: {
    tab: Tab;
    icon: typeof Home;
    label: string;
  }) => {
    const isActive = active === tab;
    return (
      <button
        onClick={() => onChange(tab)}
        className="flex flex-col items-center gap-1 flex-1 py-2"
      >
        <Icon
          className={`w-5 h-5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}
          strokeWidth={isActive ? 2.5 : 2}
        />
        <span
          className={`text-[10px] ${
            isActive ? 'text-slate-900 font-semibold' : 'text-slate-400'
          }`}
        >
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex items-center px-2 pt-1 pb-2 z-30">
      <Item tab="home" icon={Home} label="Home" />
      <Item tab="discovery" icon={ShoppingBag} label="Partners" />

      <button onClick={() => onChange('share')} className="relative -mt-6 mx-2">
        <div className="w-14 h-14 bg-[#1AB266] rounded-full flex items-center justify-center shadow-lg">
          <Link2 className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-[10px] text-slate-700 font-medium mt-1 block text-center">
          Make Links
        </span>
      </button>

      <Item tab="reports" icon={TrendingUp} label="Reports" />
      <Item tab="profile" icon={User} label="Profile" />
    </div>
  );
}
