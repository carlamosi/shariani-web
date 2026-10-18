import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/site';

// Force dynamic so headers() works and html[lang] is set correctly per request.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Shariani',
    template: '%s | Shariani',
  },
  icons: {
    icon: [
      { url: '/favicon.png?v=4', type: 'image/png' },
      { url: '/favicon.ico?v=4' },
    ],
    apple: [{ url: '/favicon.png?v=4', type: 'image/png' }],
    shortcut: '/favicon.png?v=4',
  },
};

/**
 * Detect locale from the x-lang header set by middleware.
 * Falls back to DEFAULT_LOCALE for static renders (404, etc).
 */
async function detectLang(): Promise<Locale> {
  try {
    const h = await headers();
    const lang = h.get('x-lang') ?? '';
    if ((LOCALES as readonly string[]).includes(lang)) {
      return lang as Locale;
    }
  } catch {
    // Not in a request context (static prerender) — fall through
  }
  return DEFAULT_LOCALE;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await detectLang();

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png?v=4" type="image/png" sizes="any" />
        <link rel="icon" href="/favicon.ico?v=4" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png?v=4" />
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
