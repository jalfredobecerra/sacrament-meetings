import Link from 'next/link';
import { Suspense } from 'react';
import NavLinks from './NavLinks';

function getFormattedToday(): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());
}

function NavigationFallback() {
  return (
    <nav
      aria-label="Main navigation"
      className="min-h-10"
    >
      <ul className="flex flex-wrap gap-2">
        <li>
          <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-transparent">
            Home
          </span>
        </li>

        <li>
          <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-transparent">
            All Programs
          </span>
        </li>

        <li>
          <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-transparent">
            Current Program
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-2xl font-bold text-slate-950">
            Sacrament Meeting Planner
          </Link>

          <p className="mt-1 text-sm text-slate-600">
            Hillside Ward · {getFormattedToday()}
          </p>
        </div>

        <Suspense fallback={<NavigationFallback />}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}