import type { NextRequest } from 'next/server';

import {
  getAllMeetings,
  getMeetingsByDate,
} from '@/lib/meetings-db';

function isValidIsoDate(
  value: string,
): boolean {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      value,
    )
  ) {
    return false;
  }

  const [year, month, day] =
    value
      .split('-')
      .map(Number);

  const date = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
    ),
  );

  return (
    date.getUTCFullYear() ===
      year &&
    date.getUTCMonth() ===
      month - 1 &&
    date.getUTCDate() ===
      day
  );
}

export async function GET(
  request: NextRequest,
): Promise<Response> {
  const date =
    request.nextUrl.searchParams.get(
      'date',
    );

  if (date) {
    if (
      !isValidIsoDate(date)
    ) {
      return Response.json(
        {
          error:
            'Date must be a valid date in YYYY-MM-DD format.',
        },
        {
          status: 400,
        },
      );
    }

    const meetings =
      await getMeetingsByDate(
        date,
      );

    return Response.json(
      meetings,
    );
  }

  const meetings =
    await getAllMeetings();

  return Response.json(
    meetings,
  );
}