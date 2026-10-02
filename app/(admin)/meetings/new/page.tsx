import CreateMeetingForm from '@/components/CreateMeetingForm';

export default function NewMeetingPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">
          Create Meeting
        </h1>

        <p className="mt-2 text-slate-700">
          Enter the program details for the new meeting.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <CreateMeetingForm />
      </div>
    </section>
  );
}