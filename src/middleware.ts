import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/site';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split('/').filter(Boolean)[0] ?? '';

  // 1. Bare routes without locale segment: redirect to persisted locale or default
  if (!first || first === 'blog' || first === 'obra-real') {
    const rawCookie = request.cookies.get('NEXT_LOCALE')?.value;
    const targetLocale: Locale =
      rawCookie && (LOCALES as readonly string[]).includes(rawCookie)
        ? (rawCookie as Locale)
        : DEFAULT_LOCALE;

    const rest = pathname.replace(/^\/(blog|obra-real)/, '/$1');
    const destination = `/${targetLocale}${rest === '/' ? '' : rest}`;
    const redirectUrl = new URL(destination, request.url);
    redirectUrl.search = request.nextUrl.search;
    return NextResponse.redirect(redirectUrl);
  }

  // 2. Localized routes: set x-lang header and persist NEXT_LOCALE cookie
  if ((LOCALES as readonly string[]).includes(first)) {
    const response = NextResponse.next();
    response.headers.set('x-lang', first);
    response.cookies.set('NEXT_LOCALE', first, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/blog', '/obra-real', '/(ca|es|en)/:path*'],
};
