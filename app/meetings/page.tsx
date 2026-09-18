import { headers } from 'next/headers';
import MeetingCard from '../../components/MeetingCard';
import type { SacramentMeeting } from '../../lib/types';

async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';

  return `${protocol}://${host}`;
}

async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load meetings.');
  }

  return (await response.json()) as SacramentMeeting[];
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();
  const sortedMeetings = [...meetings].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <div className="space-y-4">
      {sortedMeetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}