import {
  ImageResponse,
} from 'next/og';

export const alt =
  'Sacrament Meeting Planner';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection:
            'column',
          alignItems: 'center',
          justifyContent:
            'center',
          background:
            '#f8fafc',
          color: '#0f172a',
          padding: '80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
          }}
        >
          Sacrament Meeting
          Planner
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 34,
            color: '#475569',
          }}
        >
          Hillside Ward
        </div>
      </div>
    ),
    size,
  );
}