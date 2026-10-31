import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, IS_PRODUCTION, LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/site';

// ── Per-locale page metadata ──────────────────────────────────────────────────
// Titles: brand first, ≤60 chars. Descriptions: 140–160 chars, factual.
// These are the HOME page strings; inner pages pass their own title/description.
const META: Record<
  Locale,
  {
    homeTitle: string;
    homeDescription: string;
    ogLocale: string;
    altLocales: string[];
  }
> = {
  ca: {
    // 55 chars
    homeTitle: 'Shariani · Voluntariat de La Vall (Bellaterra) a Kenya',
    homeDescription:
      // 158 chars
      'Projecte de voluntariat de La Vall (Bellaterra) a Shariani Primary School, Kilifi County, Kenya. Cada juny, alumnes de 2n de Batxillerat construeixen millores reals.',
    ogLocale: 'ca_ES',
    altLocales: ['es_ES', 'en_GB'],
  },
  es: {
    // 57 chars
    homeTitle: 'Shariani · Voluntariado de La Vall en Kenia (Kilifi)',
    homeDescription:
      // 160 chars
      'Proyecto de voluntariado de La Vall (Bellaterra) en Shariani Primary School, Kilifi County, Kenia. Cada junio, alumnas de 2.º de Bachillerato construyen mejoras reales.',
    ogLocale: 'es_ES',
    altLocales: ['ca_ES', 'en_GB'],
  },
  en: {
    // 53 chars
    homeTitle: 'Shariani · La Vall (Bellaterra) Volunteering in Kenya',
    homeDescription:
      // 157 chars
      'Volunteering project by La Vall school (Bellaterra) at Shariani Primary School, Kilifi County, Kenya. Every June, Year 13 students build lasting improvements for the school.',
    ogLocale: 'en_GB',
    altLocales: ['ca_ES', 'es_ES'],
  },
};

// Truncate to max chars with ellipsis.
function trunc(s: string, max = 160): string {
  return s.length <= max ? s : s.slice(0, max - 1) + '…';
}

interface BuildMetadataOptions {
  lang: string;
  /** Path WITHOUT leading slash, e.g. '' for home, 'blog', 'obra-real' */
  path: string;
  /** Full page title (the home variants above are used when omitted). */
  title?: string;
  /** Page description (the home variants above are used when omitted). */
  description?: string;
}

export function buildMetadata({
  lang,
  path,
  title,
  description,
}: BuildMetadataOptions): Metadata {
  const safeLang: Locale = (LOCALES as readonly string[]).includes(lang)
    ? (lang as Locale)
    : DEFAULT_LOCALE;
  const m = META[safeLang];
  const canonical = `${SITE_URL}/${safeLang}${path ? `/${path}` : ''}`;

  const resolvedTitle = title ?? m.homeTitle;
  const resolvedDescription = trunc(description ?? m.homeDescription);

  // hreflang alternates — all locales + x-default → Spanish (default)
  const languagesMap: Record<string, string> = {};
  for (const loc of LOCALES) {
    languagesMap[loc] = `${SITE_URL}/${loc}${path ? `/${path}` : ''}`;
  }
  languagesMap['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${path ? `/${path}` : ''}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: resolvedTitle },
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: languagesMap,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description: resolvedDescription,
      locale: m.ogLocale,
      alternateLocale: m.altLocales,
      images: [
        {
          url: `${SITE_URL}/images/hero-school.jpeg`,
          width: 1440,
          height: 630,
          alt: 'Shariani Primary School, Kilifi County, Kenya — La Vall volunteering project',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [`${SITE_URL}/images/hero-school.jpeg`],
    },
    // noindex on preview/staging; index on production only.
    robots: IS_PRODUCTION
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

// Re-exported so jsonld.ts can read the home titles without circular deps.
export { META };
