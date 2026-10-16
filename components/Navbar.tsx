"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isProd = pathname === "/prod" || pathname === "/";
  const isDev = pathname === "/dev";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/prod" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-lg shadow-sm">
            🛡️
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
              BotBuster Captcha
            </span>
            <span className="text-[11px] font-medium text-slate-500">
              React Test Harness
            </span>
          </div>
        </Link>

        {/* Environment Navigation Tabs */}
        <nav
          className="flex items-center rounded-xl border border-slate-200/90 bg-slate-100/80 p-1 shadow-xs"
          aria-label="Environment switcher"
        >
          {/* Prod Link */}
          <Link
            href="/prod"
            className={`group flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              isProd
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full transition-transform ${
                isProd ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] scale-110" : "bg-emerald-500/70"
              }`}
            />
            <span>1. Prod Env</span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider ${
                isProd
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                  : "bg-slate-200/70 text-slate-600"
              }`}
            >
              PROD
            </span>
          </Link>

          {/* Dev Link */}
          <Link
            href="/dev"
            className={`group flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              isDev
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full transition-transform ${
                isDev ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] scale-110" : "bg-amber-500/70"
              }`}
            />
            <span>2. Dev Env</span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider ${
                isDev
                  ? "bg-amber-50 text-amber-700 border border-amber-200/80"
                  : "bg-slate-200/70 text-slate-600"
              }`}
            >
              DEV
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
