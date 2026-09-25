'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (term.trim()) {
      params.set('query', term.trim());
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <label htmlFor="meeting-search" className="sr-only">
        Search meetings
      </label>

      <input
        id="meeting-search"
        type="search"
        placeholder="Search by speaker, leader, or meeting type..."
        defaultValue={searchParams.get('query') ?? ''}
        onChange={(event) => handleSearch(event.target.value)}
        aria-label="Search meetings"
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-300"
      />
    </div>
  );
}