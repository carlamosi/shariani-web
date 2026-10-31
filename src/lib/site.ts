// Central site configuration — all absolute URLs derive from NEXT_PUBLIC_SITE_URL.
// Set NEXT_PUBLIC_SITE_URL=https://www.shariani-lavall.org in the Vercel
// Production environment. Leave unset in Preview so noindex is served.

/** Canonical origin, no trailing slash. */
export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shariani-lavall.org'
).replace(/\/$/, '');

/** True on Vercel production deployments or when explicitly set to the production URL. */
export const IS_PRODUCTION: boolean =
  process.env.VERCEL_ENV === 'production' ||
  process.env.NEXT_PUBLIC_SITE_URL === 'https://www.shariani-lavall.org';

export const CANONICAL_HOST = 'www.shariani-lavall.org';

export const SITE_NAME = 'Shariani';

// Used in Organization structured data. Keep as 'Organization' until the
// entity is legally constituted; change only this constant when it is.
export const ORG_TYPE = 'Organization' as const;

// Alternate display names used in structured data (alternateName).
// Keep these short — they are entity aliases, not tag-stuffing.
export const NAME_VARIANTS = ['La Vall · Shariani', 'La Vall Shariani'] as const;

/** Canonical short description (ES). Used in structured data. */
export const SITE_DESCRIPTION =
  'Proyecto de voluntariado de La Vall (Bellaterra) en Shariani Primary School, Kilifi County, Kenia. Cada junio, alumnas de 2.º de Bachillerato construyen mejoras reales en la escuela.';

export const LOCALES = ['ca', 'es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';
