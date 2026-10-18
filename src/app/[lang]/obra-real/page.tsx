import type { Locale } from '@/lib/site';
import { LOCALES } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ObraRealTimeline } from '@/components/sections/ObraRealTimeline';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const OBRA_META: Record<Locale, { title: string; description: string }> = {
  ca: {
    title: 'Obra real',
    description:
      'Cada any construïm una millora permanent a Shariani Primary School (Kilifi, Kenya), des de La Vall (Bellaterra). Mobiliari, aules, seguretat perimetral i molt més.',
  },
  es: {
    title: 'Obra real',
    description:
      'Cada año construimos una mejora permanente en Shariani Primary School (Kilifi, Kenia), desde La Vall (Bellaterra). Mobiliario, aulas, seguridad perimetral y mucho más.',
  },
  en: {
    title: 'Real works',
    description:
      'Every year we build a lasting improvement at Shariani Primary School (Kilifi, Kenya), led by La Vall school (Bellaterra). Furniture, classrooms, perimeter security and more.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
  const locale = lang as Locale;
  const m = OBRA_META[locale];
  return buildMetadata({ lang: locale, path: 'obra-real', title: m.title, description: m.description });
}

export default async function ObraRealPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        <ObraRealTimeline />
      </main>
      <Footer />
    </>
  );
}
