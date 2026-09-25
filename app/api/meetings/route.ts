import type { NextRequest } from 'next/server';
import {
  getMeetings,
  getMeetingsByDate,
} from '@/lib/meetings-db';

export async function GET(request: NextRequest): Promise<Response> {
  const date = request.nextUrl.searchParams.get('date');

  if (date) {
    const meetings = await getMeetingsByDate(date);
    return Response.json(meetings);
  }

  const meetings = await getMeetings();

  return Response.json(meetings);
}