import type { NextRequest } from 'next/server';
import { getMeetings } from '../../../lib/meetings-db';

export async function GET(request: NextRequest): Promise<Response> {
  const date = request.nextUrl.searchParams.get('date');
  const meetings = getMeetings(date);

  return Response.json(meetings);
}