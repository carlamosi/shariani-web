/**
 * lib/jsonld.ts
 * Generates JSON-LD structured data for every page.
 *
 * Rules:
 * - @type is controlled by ORG_TYPE in site.ts (currently 'Organization').
 *   Change that constant when the entity is legally constituted as an NGO.
 * - FAQPage schema is NOT used: the FAQs are not visible in the page HTML,
 *   so Google would not grant rich results and could penalise the markup.
 * - SearchAction is NOT used: there is no real site-search endpoint.
 * - @id URIs use the production domain without locale prefix so they are
 *   stable across all language variants.
 * - BreadcrumbList always contains absolute canonical URLs on every ListItem.
 * - Article schema structure conforms strictly to Google Search guidelines
 *   (author, datePublished, dateModified, headline, image, publisher).
 */

import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  NAME_VARIANTS,
  ORG_TYPE,
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
} from '@/lib/site';
import { META } from '@/lib/seo';

// ── Stable @id anchors ────────────────────────────────────────────────────────
// These must be the same regardless of which locale page is rendered.
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// ── Shared Organisation node ──────────────────────────────────────────────────
// Inlined into every page's @graph so Google can resolve the entity from any URL.
const ORG_NODE = {
  '@type': ORG_TYPE,
  '@id': ORG_ID,
  name: SITE_NAME,
  alternateName: NAME_VARIANTS,
  url: `${SITE_URL}/${DEFAULT_LOCALE}`,
  description: SITE_DESCRIPTION,
  foundingDate: '2023',
  // TODO: replace preview.png with a proper square logo ≥112×112 px.
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/preview.png`,
    width: 1200,
    height: 630,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ctra. Sabadell a Bellaterra, km 4,6',
    addressLocality: 'Sabadell',
    addressRegion: 'Catalonia',
    postalCode: '08205',
    addressCountry: 'ES',
  },
  email: 'shariani@la-vall.org',
  sameAs: [
    'https://www.teaming.net/unaescuela-milesdesuenosenkenia',
    'https://www.instagram.com/amara.la_vall/',
    // TODO: add iHelp and any other verified social profiles when confirmed.
  ],
  parentOrganization: {
    '@type': 'EducationalOrganization',
    name: 'La Vall',
    url: 'https://www.la-vall.org',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ctra. Sabadell a Bellaterra, km 4,6',
      addressLocality: 'Bellaterra',
      addressRegion: 'Catalonia',
      postalCode: '08205',
      addressCountry: 'ES',
    },
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function safeLangOf(lang: string): Locale {
  return (LOCALES as readonly string[]).includes(lang) ? (lang as Locale) : DEFAULT_LOCALE;
}

function trunc(s: string, max = 160): string {
  return s.length <= max ? s : s.slice(0, max - 1) + '…';
}

function serialize(graph: object[]): string {
  const payload = JSON.stringify(
    { '@context': 'https://schema.org', '@graph': graph },
    null,
    0,
  );
  // Escape < to prevent XSS when embedded directly in HTML.
  return payload.replace(/</g, '\\u003c');
}

// ── Home page ─────────────────────────────────────────────────────────────────

export function buildHomeJsonLd(lang: string): string {
  const locale = safeLangOf(lang);
  const meta = META[locale];
  const pageUrl = `${SITE_URL}/${locale}`;

  const graph: object[] = [
    ORG_NODE,
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: locale,
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: meta.homeTitle,
      description: trunc(meta.homeDescription),
      inLanguage: locale,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORG_ID },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Shariani',
            item: pageUrl,
          },
        ],
      },
    },
  ];

  return serialize(graph);
}

// ── Inner pages (obra-real, generic pages) ───────────────────────────────────

export interface BreadcrumbItem {
  /** Human-readable label */
  name: string;
  /** Absolute URL. If omitted, defaults to the current pageUrl. */
  item?: string;
}

export function buildPageJsonLd({
  lang,
  path,
  title,
  description,
  breadcrumbs,
}: {
  lang: string;
  path: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}): string {
  const locale = safeLangOf(lang);
  const pageUrl = `${SITE_URL}/${locale}${path ? `/${path}` : ''}`;

  const graph: object[] = [
    ORG_NODE,
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: locale,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORG_ID },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.item || pageUrl,
        })),
      },
    },
  ];

  return serialize(graph);
}

// ── Blog page & Article schema ────────────────────────────────────────────────

export interface BlogPostData {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  /** ISO date string e.g. '2024-07-01' */
  datePublished: string;
  image?: string;
}

export function buildBlogPageJsonLd({
  lang,
  title,
  description,
  breadcrumbs,
  posts,
}: {
  lang: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  posts: BlogPostData[];
}): string {
  const locale = safeLangOf(lang);
  const pageUrl = `${SITE_URL}/${locale}/blog`;

  const webPageNode = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.item || pageUrl,
      })),
    },
  };

  const articleNodes = posts.map((post, idx) => ({
    '@type': 'Article',
    '@id': `${pageUrl}#article-${idx + 1}`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    inLanguage: locale,
    mainEntityOfPage: pageUrl,
    image: post.image || `${SITE_URL}/images/hero-school.jpeg`,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: `${SITE_URL}/${locale}`,
    },
    publisher: { '@id': ORG_ID },
  }));

  const graph: object[] = [ORG_NODE, webPageNode, ...articleNodes];
  return serialize(graph);
}

// ── Dedicated single-article schema helper (for future /[lang]/blog/[slug]) ───

export function buildArticleJsonLd({
  lang,
  path,
  headline,
  description,
  datePublished,
  dateModified,
  author,
  image,
  breadcrumbs,
}: {
  lang: string;
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image: string;
  breadcrumbs: BreadcrumbItem[];
}): string {
  const locale = safeLangOf(lang);
  const articleUrl = `${SITE_URL}/${locale}/${path}`;

  const graph: object[] = [
    ORG_NODE,
    {
      '@type': 'Article',
      '@id': `${articleUrl}#article`,
      headline,
      description,
      datePublished,
      dateModified: dateModified || datePublished,
      inLanguage: locale,
      mainEntityOfPage: articleUrl,
      image,
      author: {
        '@type': 'Organization',
        name: author,
        url: `${SITE_URL}/${locale}`,
      },
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${articleUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.item || articleUrl,
      })),
    },
  ];

  return serialize(graph);
}
