import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Manrope, Young_Serif } from 'next/font/google';
import './globals.css';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/site';

// Optimize fonts: self-hosted, zero FOIT, automated font-fallback metrics to eliminate CLS
const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-body',
});

const youngSerif = Young_Serif({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-editorial',
});

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
    <html lang={lang} className={`scroll-smooth ${manrope.variable} ${youngSerif.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png?v=4" type="image/png" sizes="any" />
        <link rel="icon" href="/favicon.ico?v=4" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png?v=4" />
      </head>
      <body>{children}</body>
    </html>
  );
}
