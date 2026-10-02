'use client';

import { useActionState } from 'react';

import {
  updateMeeting,
  type State,
} from '@/lib/actions';

import type { SacramentMeeting } from '@/lib/types';

interface EditMeetingFormProps {
  meeting: SacramentMeeting;
}

const initialState: State = {
  message: null,
  errors: {},
};

export default function EditMeetingForm({
  meeting,
}: EditMeetingFormProps) {
  const updateMeetingWithId = updateMeeting.bind(
    null,
    meeting.id,
  );

  const [state, formAction, isPending] = useActionState(
    updateMeetingWithId,
    initialState,
  );

  const announcements =
    meeting.announcements?.join('\n') ?? '';

  const wardBusiness = meeting.wardBusiness
    .map((item) => item.description)
    .join('\n');

  const speakers = meeting.speakers
    .map(
      (item) =>
        `${item.name} | ${item.topic} | ${item.type}`,
    )
    .join('\n');

  return (
    <form action={formAction} className="space-y-6">
      {state.message && (
        <p
          aria-live="polite"
          className="rounded-xl bg-red-50 p-4 text-sm text-red-800"
        >
          {state.message}
        </p>
      )}

      <Field>
        <label htmlFor="date" className="font-medium">
          Meeting Date
        </label>

        <input
          id="date"
          name="date"
          type="date"
          defaultValue={meeting.date}
          aria-describedby="date-error"
          aria-invalid={Boolean(state.errors?.date)}
          className="form-input"
        />

        <Errors
          id="date-error"
          errors={state.errors?.date}
        />
      </Field>

      <Field>
        <label htmlFor="meetingType" className="font-medium">
          Meeting Type
        </label>

        <select
          id="meetingType"
          name="meetingType"
          defaultValue={meeting.meetingType}
          aria-describedby="meetingType-error"
          aria-invalid={Boolean(state.errors?.meetingType)}
          className="form-input"
        >
          <option value="testimony">
            Testimony
          </option>

          <option value="regular">
            Regular
          </option>

          <option value="stake">
            Stake
          </option>

          <option value="general">
            General
          </option>

          <option value="special">
            Special
          </option>
        </select>

        <Errors
          id="meetingType-error"
          errors={state.errors?.meetingType}
        />
      </Field>

      <Field>
        <label htmlFor="presiding" className="font-medium">
          Presiding
        </label>

        <input
          id="presiding"
          name="presiding"
          type="text"
          defaultValue={meeting.presiding}
          aria-describedby="presiding-error"
          aria-invalid={Boolean(state.errors?.presiding)}
          className="form-input"
        />

        <Errors
          id="presiding-error"
          errors={state.errors?.presiding}
        />
      </Field>

      <Field>
        <label htmlFor="conducting" className="font-medium">
          Conducting
        </label>

        <input
          id="conducting"
          name="conducting"
          type="text"
          defaultValue={meeting.conducting}
          aria-describedby="conducting-error"
          aria-invalid={Boolean(state.errors?.conducting)}
          className="form-input"
        />

        <Errors
          id="conducting-error"
          errors={state.errors?.conducting}
        />
      </Field>

      <Field>
        <label htmlFor="announcements" className="font-medium">
          Announcements
        </label>

        <textarea
          id="announcements"
          name="announcements"
          rows={4}
          defaultValue={announcements}
          aria-describedby="announcements-help announcements-error"
          aria-invalid={Boolean(state.errors?.announcements)}
          className="form-input"
        />

        <p
          id="announcements-help"
          className="text-sm text-slate-600"
        >
          Enter one announcement per line.
        </p>

        <Errors
          id="announcements-error"
          errors={state.errors?.announcements}
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field>
          <label
            htmlFor="openingHymnNumber"
            className="font-medium"
          >
            Opening Hymn Number
          </label>

          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            min="1"
            defaultValue={meeting.openingHymn.number}
            aria-describedby="openingHymnNumber-error"
            aria-invalid={Boolean(
              state.errors?.openingHymnNumber,
            )}
            className="form-input"
          />

          <Errors
            id="openingHymnNumber-error"
            errors={state.errors?.openingHymnNumber}
          />
        </Field>

        <Field>
          <label
            htmlFor="openingHymnTitle"
            className="font-medium"
          >
            Opening Hymn Title
          </label>

          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            type="text"
            defaultValue={meeting.openingHymn.title}
            aria-describedby="openingHymnTitle-error"
            aria-invalid={Boolean(
              state.errors?.openingHymnTitle,
            )}
            className="form-input"
          />

          <Errors
            id="openingHymnTitle-error"
            errors={state.errors?.openingHymnTitle}
          />
        </Field>
      </div>

      <Field>
        <label htmlFor="openingPrayer" className="font-medium">
          Opening Prayer
        </label>

        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          defaultValue={meeting.openingPrayer}
          aria-describedby="openingPrayer-error"
          aria-invalid={Boolean(state.errors?.openingPrayer)}
          className="form-input"
        />

        <Errors
          id="openingPrayer-error"
          errors={state.errors?.openingPrayer}
        />
      </Field>

      <Field>
        <label htmlFor="wardBusiness" className="font-medium">
          Ward Business
        </label>

        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={4}
          defaultValue={wardBusiness}
          aria-describedby="wardBusiness-help wardBusiness-error"
          aria-invalid={Boolean(state.errors?.wardBusiness)}
          className="form-input"
        />

        <p
          id="wardBusiness-help"
          className="text-sm text-slate-600"
        >
          Enter one ward business item per line.
        </p>

        <Errors
          id="wardBusiness-error"
          errors={state.errors?.wardBusiness}
        />
      </Field>

      <Field>
        <div className="flex items-center gap-3">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={meeting.stakeBusiness}
            aria-describedby="stakeBusiness-error"
            aria-invalid={Boolean(state.errors?.stakeBusiness)}
          />

          <label
            htmlFor="stakeBusiness"
            className="font-medium"
          >
            Stake business included
          </label>
        </div>

        <Errors
          id="stakeBusiness-error"
          errors={state.errors?.stakeBusiness}
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field>
          <label
            htmlFor="sacramentHymnNumber"
            className="font-medium"
          >
            Sacrament Hymn Number
          </label>

          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            min="0"
            defaultValue={
              meeting.sacramentHymn.number || ''
            }
            aria-describedby="sacramentHymnNumber-help sacramentHymnNumber-error"
            aria-invalid={Boolean(
              state.errors?.sacramentHymnNumber,
            )}
            className="form-input"
          />

          <p
            id="sacramentHymnNumber-help"
            className="text-sm text-slate-600"
          >
            Leave blank for stake or general meetings.
          </p>

          <Errors
            id="sacramentHymnNumber-error"
            errors={state.errors?.sacramentHymnNumber}
          />
        </Field>

        <Field>
          <label
            htmlFor="sacramentHymnTitle"
            className="font-medium"
          >
            Sacrament Hymn Title
          </label>

          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            type="text"
            defaultValue={meeting.sacramentHymn.title}
            aria-describedby="sacramentHymnTitle-help sacramentHymnTitle-error"
            aria-invalid={Boolean(
              state.errors?.sacramentHymnTitle,
            )}
            className="form-input"
          />

          <p
            id="sacramentHymnTitle-help"
            className="text-sm text-slate-600"
          >
            Leave blank for stake or general meetings.
          </p>

          <Errors
            id="sacramentHymnTitle-error"
            errors={state.errors?.sacramentHymnTitle}
          />
        </Field>
      </div>

      <Field>
        <label htmlFor="speakers" className="font-medium">
          Speakers and Musical Numbers
        </label>

        <textarea
          id="speakers"
          name="speakers"
          rows={5}
          defaultValue={speakers}
          aria-describedby="speakers-help speakers-error"
          aria-invalid={Boolean(state.errors?.speakers)}
          className="form-input"
        />

        <p
          id="speakers-help"
          className="text-sm text-slate-600"
        >
          Enter one item per line using Name | Topic | speaker.
          Use musical-number for musical numbers.
        </p>

        <Errors
          id="speakers-error"
          errors={state.errors?.speakers}
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field>
          <label
            htmlFor="closingHymnNumber"
            className="font-medium"
          >
            Closing Hymn Number
          </label>

          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min="1"
            defaultValue={meeting.closingHymn.number}
            aria-describedby="closingHymnNumber-error"
            aria-invalid={Boolean(
              state.errors?.closingHymnNumber,
            )}
            className="form-input"
          />

          <Errors
            id="closingHymnNumber-error"
            errors={state.errors?.closingHymnNumber}
          />
        </Field>

        <Field>
          <label
            htmlFor="closingHymnTitle"
            className="font-medium"
          >
            Closing Hymn Title
          </label>

          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            type="text"
            defaultValue={meeting.closingHymn.title}
            aria-describedby="closingHymnTitle-error"
            aria-invalid={Boolean(
              state.errors?.closingHymnTitle,
            )}
            className="form-input"
          />

          <Errors
            id="closingHymnTitle-error"
            errors={state.errors?.closingHymnTitle}
          />
        </Field>
      </div>

      <Field>
        <label htmlFor="closingPrayer" className="font-medium">
          Closing Prayer
        </label>

        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          defaultValue={meeting.closingPrayer}
          aria-describedby="closingPrayer-error"
          aria-invalid={Boolean(state.errors?.closingPrayer)}
          className="form-input"
        />

        <Errors
          id="closingPrayer-error"
          errors={state.errors?.closingPrayer}
        />
      </Field>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-slate-900 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}

function Field({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      {children}
    </div>
  );
}

function Errors({
  id,
  errors,
}: {
  id: string;
  errors?: string[];
}) {
  return (
    <div
      id={id}
      aria-live="polite"
      className="text-sm text-red-700"
    >
      {errors?.map((error) => (
        <p key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}