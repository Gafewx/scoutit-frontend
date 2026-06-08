import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href="/" aria-label="ScoutIT home" className="flex items-center gap-2 text-xl font-bold text-slate-900 hover:text-slate-700 transition-colors flex-shrink-0">
      <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </span>
      <span>ScoutIT</span>
    </Link>
  );
}