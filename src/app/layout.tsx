import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/context/LangContext';

export const metadata: Metadata = {
  title: 'La Vall × Shariani — Educació sense fronteres',
  description: 'Des de La Vall, a Barcelona, col·laborem amb Shariani Primary School a Kilifi County, Kènia, per millorar els seus espais educatius i construir una relació que continua creixent.',
  openGraph: {
    title: 'La Vall × Shariani',
    description: 'Una col·laboració educativa entre Barcelona i Kènia.',
    type: 'website',
    locale: 'ca_ES',
  },
  icons: {
    icon: [
      { url: '/favicon.png?v=3', type: 'image/png' },
      { url: '/favicon.ico?v=3' },
    ],
    apple: [
      { url: '/favicon.png?v=3', type: 'image/png' },
    ],
    shortcut: '/favicon.png?v=3',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png?v=3" type="image/png" sizes="any" />
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png?v=3" />
        {/*
          Preconnect to Google Fonts to reduce DNS + TLS handshake latency.
          The CSS @import in globals.css then loads Young Serif + Manrope
          with display=swap, preventing FOIT while the fonts load.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
