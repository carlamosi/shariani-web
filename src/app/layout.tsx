import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'La Vall × Shariani — Educación sin fronteras',
  description: 'Desde La Vall, en Barcelona, colaboramos con Shariani Primary School en Kilifi County, Kenia, para mejorar sus espacios educativos y construir una relación que continúa creciendo.',
  openGraph: {
    title: 'La Vall × Shariani',
    description: 'Una colaboración educativa entre Barcelona y Kenia.',
    type: 'website',
    locale: 'es_ES',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/*
          Preconnect to Google Fonts to reduce DNS + TLS handshake latency.
          The CSS @import in globals.css then loads Young Serif + Manrope
          with display=swap, preventing FOIT while the fonts load.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
