import type { Locale } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { buildHomeJsonLd } from '@/lib/jsonld';
import { LOCALES } from '@/lib/site';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { ImprovementsTeaser } from '@/components/sections/ImprovementsTeaser';
import { Impact } from '@/components/sections/Impact';
import { HowToHelp } from '@/components/sections/HowToHelp';
import { MediaStrip } from '@/components/sections/MediaStrip';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
  return buildMetadata({ lang: lang as Locale, path: '' });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
  const locale = lang as Locale;
  const jsonLd = buildHomeJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <ImprovementsTeaser />
        <Impact />
        <HowToHelp />
        <MediaStrip />
      </main>
      <Footer />
    </>
  );
}
