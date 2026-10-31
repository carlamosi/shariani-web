import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, CANONICAL_HOST, type Locale } from '@/lib/site';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // ── 0. Host-canonicalisation redirect (Vercel production only) ───────────
  // When VERCEL_ENV === "production", any host other than www.shariani-lavall.org
  // (including *.vercel.app aliases like shariani-media.vercel.app and non-www)
  // must 308-redirect to the same path on https://www.shariani-lavall.org.
  // Preview deployments (VERCEL_ENV === "preview") and localhost are never redirected.
  const isVercelProd = process.env.VERCEL_ENV === 'production';
  const host = request.headers.get('host') ?? '';
  const isLocalhost = host.startsWith('localhost') || host.startsWith('127.');

  if (isVercelProd && !isLocalhost && host !== CANONICAL_HOST) {
    const canonical = new URL(
      `https://${CANONICAL_HOST}${pathname}${search}`,
    );
    return NextResponse.redirect(canonical, { status: 308 });
  }

  // ── 1. Bare routes without locale segment ────────────────────────────────
  //    / → /es  (or preferred locale from cookie)
  //    /blog → /es/blog  etc.
  const first = pathname.split('/').filter(Boolean)[0] ?? '';

  const BARE_ROUTES = ['blog', 'obra-real', 'que-es-shariani', 'voluntariado-kenya', 'donar'];

  if (!first || BARE_ROUTES.includes(first)) {
    const rawCookie = request.cookies.get('NEXT_LOCALE')?.value;
    const targetLocale: Locale =
      rawCookie && (LOCALES as readonly string[]).includes(rawCookie)
        ? (rawCookie as Locale)
        : DEFAULT_LOCALE;

    const rest = pathname === '/' ? '' : pathname;
    const destination = `/${targetLocale}${rest}`;
    const redirectUrl = new URL(destination, request.url);
    redirectUrl.search = search;
    return NextResponse.redirect(redirectUrl);
  }

  // ── 2. Localized routes ───────────────────────────────────────────────────
  //    Set x-lang header (read by root layout to set <html lang>)
  //    and persist NEXT_LOCALE cookie.
  if ((LOCALES as readonly string[]).includes(first)) {
    const response = NextResponse.next();
    response.headers.set('x-lang', first);
    response.cookies.set('NEXT_LOCALE', first, {
      path: '/',
      maxAge: 31_536_000,
      sameSite: 'lax',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/blog',
    '/obra-real',
    '/que-es-shariani',
    '/voluntariado-kenya',
    '/donar',
    '/(ca|es|en)/:path*',
  ],
};
