'use client';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onSwitchPersona?: () => void;
  personaLabel?: string;
};

export default function PhoneFrame({ children, onSwitchPersona, personaLabel }: Props) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-8 px-4">
      {/* Persona switcher pill above the phone */}
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

      {/* Phone frame */}
      <div className="relative bg-black rounded-[40px] p-3 shadow-2xl" style={{ width: '390px' }}>
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-50" />

        {/* Screen */}
        <div className="bg-white rounded-[32px] overflow-hidden" style={{ height: '780px' }}>
          {/* Status bar */}
          <div className="bg-white px-6 py-2 flex justify-between items-center text-xs font-medium">
            <span>11:05</span>
            <div className="flex items-center gap-1">
              <span>📶</span>
              <span>4G</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto" style={{ height: 'calc(100% - 28px)' }}>
            {children}
          </div>
        </div>
      </div>

      {/* Caption below phone */}
      <div className="mt-6 text-center max-w-md">
        <p className="text-xs text-slate-500">
          Tap the bottom nav to move between Home, Discovery, and Sharing.
          Use &quot;Switch&quot; above to see how the same surfaces change for a different segment.
        </p>
      </div>
    </div>
  );
}
