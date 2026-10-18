import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/site';

// Minimal middleware — no redirects, no IP/Accept-Language detection.
// Only purpose: forward the first path segment as x-lang header so the
// root layout can set <html lang> correctly for SSG pre-rendering.
export function middleware(request: NextRequest) {
  const first = request.nextUrl.pathname.split('/').filter(Boolean)[0] ?? '';
  const lang = (LOCALES as readonly string[]).includes(first)
    ? first
    : DEFAULT_LOCALE;

  const response = NextResponse.next();
  response.headers.set('x-lang', lang);
  return response;
}

export const config = {
  matcher: ['/(ca|es|en)/:path*'],
};
