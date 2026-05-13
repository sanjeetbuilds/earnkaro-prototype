'use client';

import { ArrowLeft } from 'lucide-react';

type BrandHeaderProps = {
  variant: 'brand';
  walletBalance: number;
};

type PageHeaderProps = {
  variant: 'page';
  title: string;
  onBack?: () => void;
};

type Props = BrandHeaderProps | PageHeaderProps;

export default function TopBar(props: Props) {
  if (props.variant === 'brand') {
    return (
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="w-5 h-0.5 bg-slate-700" />
            <div className="w-5 h-0.5 bg-slate-700" />
            <div className="w-5 h-0.5 bg-slate-700" />
          </div>
          <span className="font-extrabold text-lg tracking-tight">
            <span className="text-[#1AB266]">EARN</span>
            <span className="text-slate-900">KARO</span>
          </span>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-sm font-semibold flex items-center gap-1">
          <span className="text-slate-500">₹</span>
          <span>{props.walletBalance.toLocaleString('en-IN')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#1AB266] to-[#0E8C5A] px-4 py-4 flex items-center gap-3 sticky top-0 z-30">
      <button onClick={props.onBack}>
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>
      <span className="text-white font-semibold text-lg">{props.title}</span>
    </div>
  );
}
