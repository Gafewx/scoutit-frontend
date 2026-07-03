import type { ReactNode } from 'react';
import Link from 'next/link';

const features = [
  'Laptops, Gaming PCs & Monitors',
  'Keyboards, Mice & Accessories',
  'SSDs, RAM & Networking Devices',
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">

      {/* ── Left: Dark Brand Panel (desktop only) ──────────────── */}
      <div
        className="hidden lg:flex lg:w-[480px] xl:w-[520px] shrink-0 flex-col justify-between p-14"
        style={{
          background: 'linear-gradient(155deg, #060B18 0%, #0D2044 55%, #071428 100%)',
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-sm"
        >
          <span className="text-[22px] font-bold text-white tracking-tight leading-none">
            Scout<span className="text-blue-400">IT</span>
          </span>
        </Link>

        {/* Center copy block */}
        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-blue-400 mb-5">
            IT Equipment Store
          </p>
          <h2 className="text-[2.6rem] font-bold text-white leading-[1.1] mb-4">
            The IT store<br />built for pros.
          </h2>
          <p className="text-slate-400 leading-relaxed mb-10 max-w-[300px] text-[15px]">
            From gaming rigs to enterprise networking — curated, priced right, shipped fast.
          </p>

          <ul className="space-y-4">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                {/* CSS-only check circle — no SVG markup */}
                <span
                  className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold text-blue-400"
                  style={{
                    background: 'rgba(59,130,246,0.12)',
                    border: '1px solid rgba(59,130,246,0.25)',
                  }}
                >
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="text-slate-700 text-xs">© 2025 ScoutIT. All rights reserved.</p>
      </div>

      {/* ── Right: White Form Panel ─────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-white px-6 py-12">
        {/* Mobile-only logo */}
        <div className="lg:hidden mb-10">
          <Link href="/" className="text-[22px] font-bold text-gray-900 tracking-tight leading-none">
            Scout<span className="text-blue-600">IT</span>
          </Link>
        </div>

        <div className="w-full max-w-[400px]">
          {children}
        </div>
      </div>

    </div>
  );
}
