import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import { FARM_CONFIG } from '@/data/config';

export const metadata: Metadata = {
  title: `${FARM_CONFIG.name} | Premium Horse Farm & Equestrian`,
  description: `Discover quality horses, horse buying, booking and equestrian experiences at ${FARM_CONFIG.name}. Home to purebred Marwari and Kathiawari champions.`,
  keywords: [
    'Marwari horses',
    'Kathiawari horses',
    'Horse farm Rajasthan',
    'Buy horse India',
    'Horse breeding sanctuary',
    'Royal equestrian',
    'Horse booking'
  ],
  openGraph: {
    title: `${FARM_CONFIG.name} | Luxury Equestrian Sanctuary`,
    description: FARM_CONFIG.heroSubtitle,
    type: 'website',
    images: ['/farm/hero-bg.jpg']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#07080a] text-[#ededed] antialiased selection:bg-[#d4af37] selection:text-black">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}
