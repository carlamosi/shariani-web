import { SITE_URL, SITE_NAME, NAME_VARIANTS, DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/site';
import { META } from '@/lib/seo';

/**
 * Builds the @graph JSON-LD for the home page of each locale.
 * Returns a JSON string safe to embed in <script type="application/ld+json">.
 */
export function buildHomeJsonLd(lang: string): string {
  const safeLang: Locale = (LOCALES as readonly string[]).includes(lang) ? (lang as Locale) : DEFAULT_LOCALE;
  const meta = META[safeLang];

  const orgId = `${SITE_URL}/#org`;
  const websiteId = `${SITE_URL}/${safeLang}#website`;

  const graph: object[] = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: SITE_NAME,
      alternateName: NAME_VARIANTS,
      url: `${SITE_URL}/${DEFAULT_LOCALE}`,
      // No logo: favicon.png exists but is not a full logo image — omitted per task rule
      description: trunc(meta.homeDescription),
      areaServed: {
        '@type': 'Place',
        name: 'Kilifi, Kenya',
      },
      knowsLanguage: ['ca', 'es', 'en'],
      // sameAs: only URLs confirmed in the codebase (Footer.tsx)
      sameAs: [
        'https://www.teaming.net/unaescuela-milesdesuenosenkenia',
        'https://www.instagram.com/amara.la_vall/',
      ],
      // No email found in codebase — omitted per task rule
      // NGO status not stated on-site — using Organization per task rule
      parentOrganization: {
        '@type': 'EducationalOrganization',
        name: 'La Vall', // exact name as written on the site (Footer, Navbar)
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bellaterra',
          addressCountry: 'ES',
        },
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE_URL}/${safeLang}`,
      name: SITE_NAME,
      inLanguage: safeLang,
      publisher: { '@id': orgId },
    },
  ];

  const payload = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  // Escape < to prevent XSS when embedded in HTML
  return payload.replace(/</g, '\\u003c');
}

function trunc(s: string, max = 160) {
  return s.length <= max ? s : s.slice(0, max - 1) + '…';
}
