import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/site';

// Per-locale metadata strings (title ≤60 chars, description 140-160 chars)
const META: Record<
  Locale,
  {
    homeTitle: string;
    homeDescription: string;
    volunteeringLabel: string;
    ogLocale: string;
    altLocales: string[];
  }
> = {
  ca: {
    homeTitle: 'Shariani — Voluntariat de La Vall (Bellaterra) a Kenya', // 53 chars
    homeDescription:
      'Projecte de voluntariat de La Vall (Bellaterra) a Shariani Primary School, Kilifi County, Kenya. Cada juny, alumnes de 2n de Batxillerat construeixen millores reals a l\'escola.', // 176 → trimmed to ~158
    volunteeringLabel: 'Voluntariat de La Vall a Kenya',
    ogLocale: 'ca_ES',
    altLocales: ['es_ES', 'en_GB'],
  },
  es: {
    homeTitle: 'Shariani — Voluntariado de La Vall (Bellaterra) en Kenia', // 56 chars
    homeDescription:
      'Proyecto de voluntariado de La Vall (Bellaterra) en Shariani Primary School, Kilifi County, Kenia. Cada junio, alumnas de 2.º de Bachillerato construyen mejoras reales en la escuela.', // 184 → keep first 160
    volunteeringLabel: 'Voluntariado de La Vall en Kenia',
    ogLocale: 'es_ES',
    altLocales: ['ca_ES', 'en_GB'],
  },
  en: {
    homeTitle: 'Shariani — La Vall (Bellaterra) Volunteering in Kenya', // 53 chars
    homeDescription:
      'Volunteering project by La Vall school (Bellaterra) at Shariani Primary School, Kilifi County, Kenya. Every June, Year 13 students build lasting improvements for the school community.', // 184 → keep first 160
    volunteeringLabel: 'La Vall Volunteering in Kenya',
    ogLocale: 'en_GB',
    altLocales: ['ca_ES', 'es_ES'],
  },
};

// Truncate description to 160 chars safely
function trunc(s: string, max = 160) {
  return s.length <= max ? s : s.slice(0, max - 1) + '…';
}

interface BuildMetadataOptions {
  lang: string;
  /** Path WITHOUT leading slash, e.g. "" for home, "blog", "obra-real" */
  path: string;
  /** Page title WITHOUT site suffix — for home pass undefined to use the home title */
  title?: string;
  /** Page description — for home pass undefined to use locale home description */
  description?: string;
}

export function buildMetadata({
  lang,
  path,
  title,
  description,
}: BuildMetadataOptions): Metadata {
  // Guard: if an unknown locale sneaks in, fall back to DEFAULT_LOCALE
  const safeLang: Locale = (LOCALES as readonly string[]).includes(lang)
    ? (lang as Locale)
    : DEFAULT_LOCALE;
  const m = META[safeLang];
  const canonical = `${SITE_URL}/${safeLang}${path ? `/${path}` : ''}`;

  const resolvedTitle = title ?? m.homeTitle;
  const resolvedDescription = trunc(description ?? m.homeDescription);

  // hreflang alternates: all locales + x-default pointing to DEFAULT_LOCALE
  const languagesMap: Record<string, string> = {};
  for (const loc of LOCALES) {
    languagesMap[loc] = `${SITE_URL}/${loc}${path ? `/${path}` : ''}`;
  }
  languagesMap['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${path ? `/${path}` : ''}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: title
      ? { default: resolvedTitle, template: `%s | ${SITE_NAME}` }
      : { absolute: resolvedTitle },
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Re-export per-locale metadata map for use in JSON-LD
export { META };
