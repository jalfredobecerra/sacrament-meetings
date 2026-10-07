'use server';

import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
  auth,
  signIn,
} from '@/auth';

import {
  addMeeting,
  updateMeeting as updateMeetingRecord,
  deleteMeeting as deleteMeetingRecord,
} from '@/lib/meetings-db';

import type {
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from '@/lib/types';

function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value
    .split('-')
    .map(Number);

  const date = new Date(
    Date.UTC(year, month - 1, day),
  );

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

const MeetingFormSchema = z
  .object({
    date: z
      .string()
      .trim()
      .refine(
        isValidIsoDate,
        'Enter a valid meeting date.',
      ),

    meetingType: z.enum([
      'testimony',
      'regular',
      'stake',
      'general',
      'special',
    ]),

    presiding: z
      .string()
      .trim()
      .min(
        1,
        'Presiding leader is required.',
      ),

    conducting: z
      .string()
      .trim()
      .min(
        1,
        'Conducting leader is required.',
      ),

    announcements: z.string(),

    openingHymnNumber: z.coerce
      .number()
      .int()
      .min(
        1,
        'Enter a valid opening hymn number.',
      ),

    openingHymnTitle: z
      .string()
      .trim()
      .min(
        1,
        'Opening hymn title is required.',
      ),

    openingPrayer: z
      .string()
      .trim()
      .min(
        1,
        'Opening prayer is required.',
      ),

    wardBusiness: z.string(),

    stakeBusiness: z.boolean(),

    sacramentHymnNumber: z.coerce
      .number()
      .int()
      .nonnegative(
        'Enter a valid sacrament hymn number.',
      ),

    sacramentHymnTitle: z
      .string()
      .trim(),

    speakers: z
      .string()
      .superRefine(
        (value, context) => {
          const lines = value
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean);

          lines.forEach((line, index) => {
            const parts = line
              .split('|')
              .map((part) => part.trim());

            if (parts.length !== 3) {
              context.addIssue({
                code: 'custom',
                message:
                  `Line ${index + 1} must use Name | Topic | speaker or musical-number.`,
              });

              return;
            }

            const [
              name,
              topic,
              type,
            ] = parts;

            if (!name) {
              context.addIssue({
                code: 'custom',
                message:
                  `Line ${index + 1} requires a name.`,
              });
            }

            if (!topic) {
              context.addIssue({
                code: 'custom',
                message:
                  `Line ${index + 1} requires a topic.`,
              });
            }

            if (
              type !== 'speaker' &&
              type !== 'musical-number'
            ) {
              context.addIssue({
                code: 'custom',
                message:
                  `Line ${index + 1} must end with speaker or musical-number.`,
              });
            }
          });
        },
      ),

    closingHymnNumber: z.coerce
      .number()
      .int()
      .min(
        1,
        'Enter a valid closing hymn number.',
      ),

    closingHymnTitle: z
      .string()
      .trim()
      .min(
        1,
        'Closing hymn title is required.',
      ),

    closingPrayer: z
      .string()
      .trim()
      .min(
        1,
        'Closing prayer is required.',
      ),
  })
  .superRefine((data, context) => {
    const requiresSacramentHymn =
      data.meetingType !== 'stake' &&
      data.meetingType !== 'general';

    if (!requiresSacramentHymn) {
      return;
    }

    if (data.sacramentHymnNumber < 1) {
      context.addIssue({
        code: 'custom',
        path: ['sacramentHymnNumber'],
        message:
          'Enter a valid sacrament hymn number.',
      });
    }

    if (!data.sacramentHymnTitle) {
      context.addIssue({
        code: 'custom',
        path: ['sacramentHymnTitle'],
        message:
          'Sacrament hymn title is required.',
      });
    }
  });

type MeetingFormData = z.infer<
  typeof MeetingFormSchema
>;

export type State = {
  errors?: Partial<
    Record<
      keyof MeetingFormData,
      string[]
    >
  >;
  message?: string | null;
};

async function requireBishopricSession() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return session;
}

function readFormData(
  formData: FormData,
) {
  return {
    date:
      formData.get('date'),

    meetingType:
      formData.get('meetingType'),

    presiding:
      formData.get('presiding'),

    conducting:
      formData.get('conducting'),

    announcements:
      formData.get('announcements') ?? '',

    openingHymnNumber:
      formData.get('openingHymnNumber'),

    openingHymnTitle:
      formData.get('openingHymnTitle'),

    openingPrayer:
      formData.get('openingPrayer'),

    wardBusiness:
      formData.get('wardBusiness') ?? '',

    stakeBusiness:
      formData.get('stakeBusiness') === 'on',

    sacramentHymnNumber:
      formData.get('sacramentHymnNumber'),

    sacramentHymnTitle:
      formData.get('sacramentHymnTitle') ?? '',

    speakers:
      formData.get('speakers') ?? '',

    closingHymnNumber:
      formData.get('closingHymnNumber'),

    closingHymnTitle:
      formData.get('closingHymnTitle'),

    closingPrayer:
      formData.get('closingPrayer'),
  };
}

function linesToStrings(
  value: string,
): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseWardBusiness(
  value: string,
): WardBusinessItem[] {
  return linesToStrings(value).map(
    (description) => ({
      description,
    }),
  );
}

function parseSpeakers(
  value: string,
): SpeakerItem[] {
  return linesToStrings(value).map(
    (line) => {
      const [
        name,
        topic,
        rawType,
      ] = line
        .split('|')
        .map((part) => part.trim());

      const type: SpeakerItem['type'] =
        rawType === 'musical-number'
          ? 'musical-number'
          : 'speaker';

      return {
        name,
        topic,
        type,
      };
    },
  );
}

function buildMeeting(
  data: MeetingFormData,
): Omit<SacramentMeeting, 'id'> {
  const hasSacramentHymn =
    data.meetingType !== 'stake' &&
    data.meetingType !== 'general';

  return {
    date: data.date,

    meetingType:
      data.meetingType,

    presiding:
      data.presiding,

    conducting:
      data.conducting,

    announcements:
      linesToStrings(
        data.announcements,
      ),

    openingHymn: {
      number:
        data.openingHymnNumber,

      title:
        data.openingHymnTitle,
    },

    openingPrayer:
      data.openingPrayer,

    wardBusiness:
      parseWardBusiness(
        data.wardBusiness,
      ),

    stakeBusiness:
      data.stakeBusiness,

    sacramentHymn:
      hasSacramentHymn
        ? {
            number:
              data.sacramentHymnNumber,

            title:
              data.sacramentHymnTitle,
          }
        : {
            number: 0,
            title: '',
          },

    speakers:
      parseSpeakers(
        data.speakers,
      ),

    closingHymn: {
      number:
        data.closingHymnNumber,

      title:
        data.closingHymnTitle,
    },

    closingPrayer:
      data.closingPrayer,
  };
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  void prevState;

  const email =
    formData.get('email');

  const password =
    formData.get('password');

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password
  ) {
    return 'Email and password are required.';
  }

  try {
    await signIn('credentials', {
      email: email.trim(),
      password,
      redirectTo: '/meetings',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';

        default:
          return 'Unable to sign in. Please try again.';
      }
    }

    throw error;
  }
}

export async function createMeeting(
  prevState: State,
  formData: FormData,
): Promise<State> {
  void prevState;

  await requireBishopricSession();

  const validatedFields =
    MeetingFormSchema.safeParse(
      readFormData(formData),
    );

  if (!validatedFields.success) {
    return {
      errors:
        validatedFields.error
          .flatten()
          .fieldErrors,

      message:
        'Please correct the errors below.',
    };
  }

  try {
    await addMeeting(
      buildMeeting(
        validatedFields.data,
      ),
    );
  } catch (error) {
    console.error(
      'Create meeting failed:',
      error,
    );

    throw new Error(
      'Unable to create the meeting. Please try again.',
    );
  }

  revalidatePath('/meetings');

  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData,
): Promise<State> {
  void prevState;

  await requireBishopricSession();

  if (
    !Number.isInteger(id) ||
    id <= 0
  ) {
    throw new Error(
      'Invalid meeting ID.',
    );
  }

  const validatedFields =
    MeetingFormSchema.safeParse(
      readFormData(formData),
    );

  if (!validatedFields.success) {
    return {
      errors:
        validatedFields.error
          .flatten()
          .fieldErrors,

      message:
        'Please correct the errors below.',
    };
  }

  try {
    const updatedMeeting =
      await updateMeetingRecord(
        id,
        buildMeeting(
          validatedFields.data,
        ),
      );

    if (!updatedMeeting) {
      throw new Error(
        'Meeting not found.',
      );
    }
  } catch (error) {
    console.error(
      'Update meeting failed:',
      error,
    );

    throw new Error(
      'Unable to update the meeting. Please try again.',
    );
  }

  revalidatePath('/meetings');
  revalidatePath(
    `/meetings/${id}`,
  );

  redirect('/meetings');
}

export async function deleteMeeting(
  id: number,
  formData: FormData,
): Promise<void> {
  void formData;

  await requireBishopricSession();

  if (
    !Number.isInteger(id) ||
    id <= 0
  ) {
    throw new Error(
      'Invalid meeting ID.',
    );
  }

  try {
    const deleted =
      await deleteMeetingRecord(id);

    if (!deleted) {
      throw new Error(
        'Meeting not found.',
      );
    }
  } catch (error) {
    console.error(
      'Delete meeting failed:',
      error,
    );

    throw new Error(
      'Unable to delete the meeting. Please try again.',
    );
  }

  revalidatePath('/meetings');

  redirect('/meetings');
}