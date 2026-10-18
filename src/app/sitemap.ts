import type { MetadataRoute } from 'next';
import { SITE_URL, LOCALES } from '@/lib/site';

// Public routes (path segments WITHOUT leading slash)
const PATHS = ['', 'blog', 'obra-real'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    for (const lang of LOCALES) {
      const url = `${SITE_URL}/${lang}${path ? `/${path}` : ''}`;

      // Build alternates map for this route across all locales
      const languages: Record<string, string> = {};
      for (const l of LOCALES) {
        languages[l] = `${SITE_URL}/${l}${path ? `/${path}` : ''}`;
      }

      entries.push({
        url,
        alternates: { languages },
        // No lastModified (no real date source), no priority/changefreq per task rule
      });
    }
  }

  return entries;
}
