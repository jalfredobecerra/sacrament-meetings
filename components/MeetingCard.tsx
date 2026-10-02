import Link from 'next/link';

import {
  deleteMeeting,
} from '@/lib/actions';

import type {
  SacramentMeeting,
} from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

function formatDate(
  date: string,
): string {
  return new Intl.DateTimeFormat(
    'en-US',
    {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
  ).format(
    new Date(
      `${date}T00:00:00`,
    ),
  );
}

function formatMeetingType(
  type: SacramentMeeting['meetingType'],
): string {
  const labels: Record<
    SacramentMeeting['meetingType'],
    string
  > = {
    testimony:
      'Testimony meeting',

    regular:
      'Regular sacrament meeting',

    stake:
      'Stake meeting',

    general:
      'General meeting',

    special:
      'Special meeting',
  };

  return labels[type];
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  const deleteMeetingWithId =
    deleteMeeting.bind(
      null,
      meeting.id,
    );

  const formattedDate =
    formatDate(
      meeting.date,
    );

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {formattedDate}
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-950">
            {formatMeetingType(
              meeting.meetingType,
            )}
          </h2>

          <p className="mt-2 text-sm text-slate-700">
            Conducting:{' '}
            {meeting.conducting}
          </p>

          <p className="text-sm text-slate-700">
            Presiding:{' '}
            {meeting.presiding}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/meetings/${meeting.id}`}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            View Program
          </Link>

          <Link
            href={`/meetings/${meeting.id}/edit`}
            aria-label={`Edit meeting for ${formattedDate}`}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Edit
          </Link>

          <form
            action={
              deleteMeetingWithId
            }
          >
            <button
              type="submit"
              aria-label={`Delete meeting for ${formattedDate}`}
              className="rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}