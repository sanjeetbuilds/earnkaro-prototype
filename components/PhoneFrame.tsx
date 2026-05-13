'use client';

import { ReactNode, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
  onSwitchPersona?: () => void;
  personaLabel?: string;
};

export default function PhoneFrame({ children, onSwitchPersona, personaLabel }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mobile: render edge-to-edge, no phone chrome, with a small persona switcher at top
  if (isMobile) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {personaLabel && onSwitchPersona && (
          <div className="bg-slate-900 text-white px-3 py-2 flex items-center justify-between text-xs flex-shrink-0">
            <span className="truncate">Viewing as: {personaLabel}</span>
            <button
              onClick={onSwitchPersona}
              className="bg-white text-slate-900 rounded-full px-3 py-1 text-[11px] font-bold flex-shrink-0"
            >
              ⇄ Switch
            </button>
          </div>
        )}
        <div className="flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  // Desktop: render in phone frame
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-8 px-4">
      {personaLabel && onSwitchPersona && (
        <div className="mb-6 flex items-center gap-3">
          <span className="text-sm text-slate-600">Currently viewing as</span>
          <button
            onClick={onSwitchPersona}
            className="bg-white border-2 border-slate-900 rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 hover:bg-slate-900 hover:text-white transition-colors"
          >
            {personaLabel}
            <span className="text-xs">⇄ Switch</span>
          </button>
        </div>
      )}

      <div className="relative bg-black rounded-[40px] p-3 shadow-2xl" style={{ width: '390px' }}>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-50" />

        <div className="bg-white rounded-[32px] overflow-hidden" style={{ height: '780px' }}>
          <div className="bg-white px-6 py-2 flex justify-between items-center text-xs font-medium flex-shrink-0">
            <span>11:05</span>
            <div className="flex items-center gap-1">
              <span>📶</span>
              <span>4G</span>
              <span>🔋</span>
            </div>
          </div>

          <div className="overflow-hidden flex flex-col" style={{ height: 'calc(100% - 28px)' }}>
            {children}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center max-w-md">
        <p className="text-xs text-slate-500">
          Tap the bottom nav to move between Home, Discovery, and Sharing.
          Use &quot;Switch&quot; above to see how the same surfaces change for a different segment.
        </p>
      </div>
    </div>
  );
}
