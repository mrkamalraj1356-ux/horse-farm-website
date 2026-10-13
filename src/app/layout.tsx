import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import { AuthProvider } from '@/context/AuthContext';
import { FARM_CONFIG } from '@/data/config';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://horsecounty.com'),
  title: {
    default: `${FARM_CONFIG.name} — ${FARM_CONFIG.tagline} | Yog Maya Range`,
    template: `%s | ${FARM_CONFIG.name}`
  },
  description: `Welcome to ${FARM_CONFIG.name} at Yog Maya Range, Jodhpur, Rajasthan. India's premier sanctuary for purebred Marwari and Kathiawari horses, verified pedigree acquisitions, private trials, and luxury farmhouse event experiences.`,
  keywords: [
    'Horse County',
    'Yog Maya Range',
    'Marwari horses for sale',
    'Kathiawari horses',
    'Purebred Marwari stallion',
    'Buy horse India',
    'Horse breeding sanctuary Rajasthan',
    'Royal equestrian experiences',
    'Farmhouse wedding photoshoot Jodhpur',
    'Horse riding trial booking'
  ],
  authors: [{ name: 'Horse County & Yog Maya Range' }],
  openGraph: {
    title: `${FARM_CONFIG.name} — ${FARM_CONFIG.tagline} | Yog Maya Range`,
    description: `India's premier equestrian estate for certified Marwari and Kathiawari champions, trials, and private farmhouse events at Yog Maya Range.`,
    type: 'website',
    locale: 'en_IN',
    siteName: FARM_CONFIG.name,
    images: [
      {
        url: '/farm/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: `${FARM_CONFIG.name} - Yog Maya Range Equestrian Sanctuary`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${FARM_CONFIG.name} | Yog Maya Range`,
    description: FARM_CONFIG.heroSubtitle,
    images: ['/farm/hero-bg.jpg']
  }
};

export const viewport: Viewport = {
  themeColor: '#07080a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
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
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#07080a] text-[#ededed] antialiased selection:bg-[#d4af37] selection:text-black font-sans">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <AIChatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
