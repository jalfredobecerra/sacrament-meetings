import {
  Suspense,
} from 'react';

import {
  redirect,
} from 'next/navigation';

import {
  MeetingSearch,
} from '@/components/MeetingSearch';

import MeetingCard from '@/components/MeetingCard';

import {
  Pagination,
} from '@/components/Pagination';

import {
  getMeetings,
  getMeetingsTotalPages,
} from '@/lib/meetings-db';

import type {
  Metadata,
} from 'next';


interface MeetingsPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Meeting Programs',

  description:
    'Browse sacrament meeting programs, speakers, hymns, and meeting details.',
};

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params =
    await searchParams;

  const query =
    params?.query ?? '';

  const parsedPage =
    Number(params?.page);

  const currentPage =
    Number.isInteger(
      parsedPage,
    ) &&
    parsedPage > 0
      ? parsedPage
      : 1;

  const totalPages =
    await getMeetingsTotalPages(
      query,
    );

  if (
    totalPages > 0 &&
    currentPage >
      totalPages
  ) {
    const nextParams =
      new URLSearchParams();

    if (query) {
      nextParams.set(
        'query',
        query,
      );
    }

    nextParams.set(
      'page',
      String(totalPages),
    );

    redirect(
      `/meetings?${nextParams.toString()}`,
    );
  }

  const meetings =
    await getMeetings(
      query,
      currentPage,
    );

  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div
            className="h-12 rounded-xl border border-slate-200 bg-white"
            aria-hidden="true"
          />
        }
      >
        <MeetingSearch />
      </Suspense>

      {meetings.length >
      0 ? (
        <div className="space-y-4">
          {meetings.map(
            (meeting) => (
              <MeetingCard
                key={
                  meeting.id
                }
                meeting={
                  meeting
                }
              />
            ),
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-slate-700">
            No meetings matched
            your search.
          </p>
        </div>
      )}

      <Suspense
        fallback={
          <div
            className="h-12"
            aria-hidden="true"
          />
        }
      >
        <Pagination
          totalPages={
            totalPages
          }
        />
      </Suspense>
    </div>
  );
}