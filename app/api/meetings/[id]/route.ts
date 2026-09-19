import { getMeetingById } from '../../../../lib/meetings-db';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { id } = await context.params;
  const trimmedId = id.trim();
  const meetingId = Number(trimmedId);

  const isValidId =
    trimmedId.length > 0 &&
    Number.isInteger(meetingId) &&
    meetingId > 0 &&
    String(meetingId) === trimmedId;

  if (!isValidId) {
    return Response.json(
      { error: 'Meeting id must be a valid positive number.' },
      { status: 400 },
    );
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return Response.json({ error: 'Meeting not found.' }, { status: 404 });
  }

  return Response.json(meeting);
}