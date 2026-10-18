// Central site configuration — all absolute URLs derive from NEXT_PUBLIC_SITE_URL.
// Set it in .env.local for dev and in Vercel dashboard for production.
// Future canonical domain: shariani.org

export const SITE_URL: string =
  (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shariani-media.vercel.app').replace(/\/$/, '');

export const SITE_NAME = 'Shariani';

// Alternate display names used in structured data (alternateName)
export const NAME_VARIANTS = ['La Vall · Shariani', 'La Vall Shariani'] as const;

export const LOCALES = ['ca', 'es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';
