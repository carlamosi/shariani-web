'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/site';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/site';

/**
 * Sets document.documentElement.lang from the URL segment on the client.
 * The root layout pre-renders with lang=DEFAULT_LOCALE; this corrects it
 * immediately after hydration (no flash — the attribute is set synchronously
 * in useEffect before the first paint of interactive content).
 */
export function LangAttributeSetter() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const first = pathname.split('/').filter(Boolean)[0] ?? '';
    const lang: Locale = (LOCALES as readonly string[]).includes(first)
      ? (first as Locale)
      : DEFAULT_LOCALE;
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}
