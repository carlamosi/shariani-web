import type { MetadataRoute } from 'next';
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from '@/lib/site';

// Static routes with their real last-modified dates from git content history.
// Where no real content date exists, lastModified is omitted.
// Do NOT use new Date().
const STATIC_ROUTES: Array<{ path: string; lastModified?: string }> = [
  { path: '',                    lastModified: '2026-10-28' }, // home: latest content update (Bizum / teaser / testimonials)
  { path: 'que-es-shariani',     lastModified: '2026-10-28' }, // about project & school
  { path: 'voluntariado-kenya',  lastModified: '2026-10-28' }, // June expedition details
  { path: 'donar',               lastModified: '2026-10-28' }, // donation channels (Bizum, Teaming, iHelp)
  { path: 'obra-real',           lastModified: '2026-10-24' }, // works timeline: latest content update
  { path: 'blog',                lastModified: '2026-10-24' }, // blog index: latest content update
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, lastModified } of STATIC_ROUTES) {
    for (const lang of LOCALES) {
      const url = `${SITE_URL}/${lang}${path ? `/${path}` : ''}`;

      // hreflang alternates for this route across all locales + x-default
      const languages: Record<string, string> = {};
      for (const l of LOCALES) {
        languages[l] = `${SITE_URL}/${l}${path ? `/${path}` : ''}`;
      }
      languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${path ? `/${path}` : ''}`;

      entries.push({
        url,
        ...(lastModified ? { lastModified } : {}),
        alternates: { languages },
        // changeFrequency and priority intentionally omitted:
        // Google ignores them and they add noise.
      });
    }
  }

  return entries;
}
