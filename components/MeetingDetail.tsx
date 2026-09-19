'use client';

import type { SacramentMeeting } from '../lib/types';

interface MeetingDetailProps {
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

function hasSacrament(type: SacramentMeeting['meetingType']): boolean {
  return type === 'regular' || type === 'testimony';
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const shouldShowSacramentHymn = hasSacrament(meeting.meetingType);

  return (
    <article className="print-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {formatDate(meeting.date)}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            {formatMeetingType(meeting.meetingType)}
          </h1>
          <p className="mt-3 text-slate-700">Presiding: {meeting.presiding}</p>
          <p className="text-slate-700">Conducting: {meeting.conducting}</p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="no-print rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Print Program
        </button>
      </div>

      <section className="space-y-6" aria-label="Meeting agenda">
        <section aria-labelledby="announcements-heading">
          <h2
            id="announcements-heading"
            className="text-lg font-bold text-slate-950"
          >
            Announcements
          </h2>

          {meeting.announcements && meeting.announcements.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
              {meeting.announcements.map((announcement) => (
                <li key={announcement}>{announcement}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-slate-700">No announcements listed.</p>
          )}
        </section>

        <section aria-label="Opening items" className="grid gap-4 md:grid-cols-2">
          <ProgramItem
            label="Opening Hymn"
            value={`#${meeting.openingHymn.number} · ${meeting.openingHymn.title}`}
          />
          <ProgramItem label="Opening Prayer" value={meeting.openingPrayer} />
          <ProgramItem
            label="Stake Business"
            value={meeting.stakeBusiness ? 'Yes' : 'No'}
          />
          <ProgramItem
            label="Sacrament Hymn"
            value={
              shouldShowSacramentHymn
                ? `#${meeting.sacramentHymn.number} · ${meeting.sacramentHymn.title}`
                : 'Not applicable for this meeting type'
            }
          />
        </section>

        <section aria-labelledby="ward-business-heading">
          <h2
            id="ward-business-heading"
            className="text-lg font-bold text-slate-950"
          >
            Ward Business
          </h2>

          {meeting.wardBusiness.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
              {meeting.wardBusiness.map((item) => (
                <li key={item.description}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-slate-700">No ward business listed.</p>
          )}
        </section>

        <section aria-labelledby="speakers-heading">
          <h2 id="speakers-heading" className="text-lg font-bold text-slate-950">
            Speakers and Musical Numbers
          </h2>

          <div className="mt-3 space-y-3">
            {meeting.speakers.map((item) => (
              <div
                key={`${item.name}-${item.topic}-${item.type}`}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  {item.type === 'speaker' ? 'Speaker' : 'Musical Number'}
                </p>
                <p className="mt-1 font-bold text-slate-950">{item.name}</p>
                <p className="text-slate-700">
                  {item.topic || 'Musical number'}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Closing items" className="grid gap-4 md:grid-cols-2">
          <ProgramItem
            label="Closing Hymn"
            value={`#${meeting.closingHymn.number} · ${meeting.closingHymn.title}`}
          />
          <ProgramItem label="Closing Prayer" value={meeting.closingPrayer} />
        </section>
      </section>
    </article>
  );
}

function ProgramItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-semibold text-slate-950">{value}</p>
    </div>
  );
}