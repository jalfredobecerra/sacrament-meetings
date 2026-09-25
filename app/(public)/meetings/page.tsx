import { Suspense } from 'react';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';
import {
  getMeetings,
  getMeetingsTotalPages,
} from '@/lib/meetings-db';

interface MeetingsPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params?.query ?? '';
  const currentPage = Number(params?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="h-12 rounded-xl border border-slate-200 bg-white" />
        }
      >
        <MeetingSearch />
      </Suspense>

      {meetings.length > 0 ? (
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-slate-700">
            No meetings matched your search.
          </p>
        </div>
      )}

        <Suspense
          fallback={
            <div className="h-15 pt-6" aria-hidden="true" />
          }
        >
          <Pagination totalPages={totalPages} />
        </Suspense>
    </div>
  );
}