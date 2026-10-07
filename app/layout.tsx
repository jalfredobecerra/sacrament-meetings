import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_URL ??
      'http://localhost:3000',
  ),

  title: {
    default:
      'Sacrament Meeting Planner',

    template:
      '%s | Sacrament Meeting Planner',
  },

  description:
    'View and manage sacrament meeting programs for Hillside Ward.',

  openGraph: {
    title:
      'Sacrament Meeting Planner',

    description:
      'View and manage sacrament meeting programs for Hillside Ward.',

    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}
      >
        <a href="#maincontent" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main
          id="maincontent"
          className="mx-auto min-h-[70vh] max-w-6xl px-6 py-8"
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}