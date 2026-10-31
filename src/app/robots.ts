import type { MetadataRoute } from 'next';
import { SITE_URL, IS_PRODUCTION } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // Non-production deployments (Vercel previews, PR branches) get a blanket
  // noindex so they never pollute Google's index.
  if (!IS_PRODUCTION) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
