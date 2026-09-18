import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description: 'Plan, review, and print sacrament meeting programs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <Header />
        <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}