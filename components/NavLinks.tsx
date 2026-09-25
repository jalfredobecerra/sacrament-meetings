'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'All Programs' },
  { href: '/meetings/current', label: 'Current Program' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const source = searchParams.get('source');
  const isCurrentProgram = source === 'current';

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => {
          let isActive = false;

          if (link.href === '/') {
            isActive = pathname === '/';
          }

          if (link.href === '/meetings') {
            isActive =
              pathname === '/meetings' ||
              (pathname.startsWith('/meetings/') && !isCurrentProgram);
          }

          if (link.href === '/meetings/current') {
            isActive =
              pathname === '/meetings/current' || isCurrentProgram;
          }

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}