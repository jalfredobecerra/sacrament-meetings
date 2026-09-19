import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import MeetingDetail from '../../../components/MeetingDetail';
import { isSacramentMeeting } from '../../../lib/meeting-guards';
import type { SacramentMeeting } from '../../../lib/types';

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';

  return `${protocol}://${host}`;
}

async function fetchMeeting(id: string): Promise<SacramentMeeting> {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings/${id}`, {
    cache: 'no-store',
  });

  if (response.status === 400 || response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error('Failed to load meeting.');
  }

  const data: unknown = await response.json();

  if (!isSacramentMeeting(data)) {
    throw new Error('Invalid meeting response.');
  }

  return data;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meeting = await fetchMeeting(id);

  return <MeetingDetail meeting={meeting} />;
}