import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-08-30',
    meetingType: 'general',
    presiding: 'Bishop David Smith',
    conducting: 'Brother Michael Johnson',
    announcements: [
      'Ward council will meet after the block.',
      'Youth activity this Wednesday at 7:00 PM.',
    ],
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Laura Williams',
    wardBusiness: [
      { description: 'Release of Brother Carter as Sunday School teacher' },
      { description: 'Sustaining of Sister Rivera as Primary teacher' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [
      {
        name: 'Sister Emily Brown',
        topic: 'Following Jesus Christ',
        type: 'speaker',
      },
      {
        name: 'Brother Daniel Davis',
        topic: 'Ministering with Love',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 220, title: 'Lord, I Would Follow Thee' },
    closingPrayer: 'Brother James Wilson',
  },
  {
    id: 2,
    date: '2026-09-06',
    meetingType: 'testimony',
    presiding: 'Bishop David Smith',
    conducting: 'Brother Michael Johnson',
    announcements: [
      'Fast offerings will be collected today.',
      'Temple recommend interviews are available after meetings.',
    ],
    openingHymn: { number: 6, title: 'Redeemer of Israel' },
    openingPrayer: 'Brother Samuel Anderson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      {
        name: 'Ward Members',
        topic: 'Bearing testimony of Jesus Christ',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
    closingPrayer: 'Sister Ana Martinez',
  },
  {
    id: 3,
    date: '2026-09-13',
    meetingType: 'regular',
    presiding: 'Bishop David Smith',
    conducting: 'Brother Michael Johnson',
    announcements: [
      'Ward temple night is Friday at 6:30 PM.',
      'Choir practice will be held after church.',
    ],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Rachel Thompson',
    wardBusiness: [
      { description: 'Sustaining of new Young Women presidency counselor' },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 176, title: 'Tis Sweet to Sing the Matchless Love' },
    speakers: [
      {
        name: 'Youth Choir',
        topic: 'Musical number',
        type: 'musical-number',
      },
      {
        name: 'Brother Kevin Lee',
        topic: 'Making and keeping covenants',
        type: 'speaker',
      },
      {
        name: 'Sister Maria Garcia',
        topic: 'The sacrament and spiritual renewal',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 134, title: 'I Believe in Christ' },
    closingPrayer: 'Brother Thomas Clark',
  },
  {
    id: 4,
    date: '2026-09-20',
    meetingType: 'stake',
    presiding: 'President Robert Harris',
    conducting: 'Bishop David Smith',
    announcements: [
      'Stake conference will be next month.',
      'All adults are invited to the stake leadership training.',
    ],
    openingHymn: { number: 5, title: 'High on the Mountain Top' },
    openingPrayer: 'Brother Peter Evans',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [
      {
        name: 'President Robert Harris',
        topic: 'Strengthening families through Christ',
        type: 'speaker',
      },
      {
        name: 'Sister Natalie Young',
        topic: 'Serving in the Lord’s kingdom',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    closingPrayer: 'Sister Patricia Moore',
  },
  {
    id: 5,
    date: '2026-09-27',
    meetingType: 'regular',
    presiding: 'Bishop David Smith',
    conducting: 'Brother Michael Johnson',
    announcements: [
      'Ward service project is Saturday morning.',
      'Tithing declaration signups begin next week.',
    ],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Sister Olivia White',
    wardBusiness: [
      { description: 'Welcome of new move-in family' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      {
        name: 'Brother Andrew Hall',
        topic: 'Faith during trials',
        type: 'speaker',
      },
      {
        name: 'Sister Rebecca Allen',
        topic: 'Daily discipleship',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 97, title: 'Lead, Kindly Light' },
    closingPrayer: 'Brother Joseph King',
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}