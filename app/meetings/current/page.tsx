import { redirect } from 'next/navigation';
import { getMeetings } from '../../../lib/meetings-db';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);

  sunday.setDate(today.getDate() - dayOfWeek);

  const sundayDate = formatDate(sunday);
  const meeting = getMeetings(sundayDate)[0];

  if (!meeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${meeting.id}`);
}