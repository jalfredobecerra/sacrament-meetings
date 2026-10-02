'use client';

import Link from 'next/link';

interface MeetingsErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function MeetingsError({
  error,
  reset,
}: MeetingsErrorProps) {
  console.error(error);

  return (
    <section className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-950">
        Something went wrong
      </h1>

      <p className="mt-2 text-slate-700">
        We could not load the meeting information.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800"
        >
          Back to Meetings
        </Link>
      </div>
    </section>
  );
}