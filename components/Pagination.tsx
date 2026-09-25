'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number): string {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(page));

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-4 pt-6"
    >
      <div>
        {currentPage > 1 && (
          <Link
            href={createPageURL(currentPage - 1)}
            className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Previous
          </Link>
        )}
      </div>

      <span className="text-sm font-medium text-slate-700">
        Page {currentPage} of {totalPages}
      </span>

      <div>
        {currentPage < totalPages && (
          <Link
            href={createPageURL(currentPage + 1)}
            className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}