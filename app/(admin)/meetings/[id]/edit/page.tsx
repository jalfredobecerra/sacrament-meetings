import { notFound } from 'next/navigation';

import EditMeetingForm from '@/components/EditMeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

interface EditMeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;

  const meetingId = Number(id);

  if (
    !Number.isInteger(meetingId) ||
    meetingId <= 0
  ) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">
          Edit Meeting
        </h1>

        <p className="mt-2 text-slate-700">
          Update the meeting program and save your changes.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <EditMeetingForm meeting={meeting} />
      </div>
    </section>
  );
}