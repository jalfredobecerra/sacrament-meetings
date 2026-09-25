import type { SacramentMeeting } from './types';

export function isSacramentMeeting(value: unknown): value is SacramentMeeting {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const meeting = value as Record<string, unknown>;

  return (
    typeof meeting.id === 'number' &&
    typeof meeting.date === 'string' &&
    typeof meeting.meetingType === 'string' &&
    typeof meeting.presiding === 'string' &&
    typeof meeting.conducting === 'string' &&
    typeof meeting.openingPrayer === 'string' &&
    typeof meeting.closingPrayer === 'string' &&
    Array.isArray(meeting.wardBusiness) &&
    Array.isArray(meeting.speakers)
  );
}

export function isSacramentMeetingArray(
  value: unknown,
): value is SacramentMeeting[] {
  return Array.isArray(value) && value.every(isSacramentMeeting);
}