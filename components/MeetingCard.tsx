import Link from 'next/link';
import type { SacramentMeeting } from '../lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

function formatMeetingType(type: SacramentMeeting['meetingType']): string {
  const labels: Record<SacramentMeeting['meetingType'], string> = {
    testimony: 'Testimony meeting',
    regular: 'Regular sacrament meeting',
    stake: 'Stake meeting',
    general: 'General meeting',
  };

  return labels[type];
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {formatDate(meeting.date)}
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            {formatMeetingType(meeting.meetingType)}
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Conducting: {meeting.conducting}
          </p>
          <p className="text-sm text-slate-700">
            Presiding: {meeting.presiding}
          </p>
        </div>

        <Link
          href={`/meetings/${meeting.id}`}
          className="rounded-full bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-slate-700"
        >
          View Program
        </Link>
      </div>
    </article>
  );
}