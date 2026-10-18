import type { ReactNode } from 'react';
import { LOCALES, type Locale } from '@/lib/site';
import { LangProvider } from '@/context/LangContext';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// This layout does NOT render <html>/<body> — those are in the root app/layout.tsx.
// It only sets up the LangProvider with the correct locale from the URL segment.
export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
  const locale = lang as Locale;

  return (
    <LangProvider initialLang={locale}>{children}</LangProvider>
  );
}
