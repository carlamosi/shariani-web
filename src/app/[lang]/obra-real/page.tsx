import type { Locale } from '@/lib/site';
import { LOCALES } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Improvements } from '@/components/sections/Improvements';
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

const OBRA_HEADER: Record<Locale, { label: string; h1: string; body: string }> = {
  ca: {
    label: 'Cada any, una obra real',
    h1: 'Construir sense aturar-nos.',
    body: "Des del 2024, cada expedició deixa una millora física i permanent a Shariani Primary School. No visites puntuals: un pla d'obres acordat amb el claustre, executat per paletes i fusters locals de Kilifi, i documentat per les voluntàries sobre el terreny.",
  },
  es: {
    label: 'Cada año, una obra real',
    h1: 'Construir sin detenernos.',
    body: 'Desde 2024, cada expedición deja una mejora física y permanente en Shariani Primary School. No visitas puntuales: un plan de obras acordado con el claustro, ejecutado por albañiles y carpinteros locales de Kilifi, y documentado por las voluntarias sobre el terreno.',
  },
  en: {
    label: 'Every year, real work',
    h1: 'Building without stopping.',
    body: 'Since 2024, every expedition leaves a permanent physical improvement at Shariani Primary School. Not one-off visits: a building plan agreed with the staff, carried out by local Kilifi builders and carpenters, and documented by volunteers on the ground.',
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
  const locale = lang as Locale;
  const header = OBRA_HEADER[locale];

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        {/* Page hero */}
        <section
          className="pt-32 pb-16 md:pt-40 md:pb-20 border-b border-[var(--border)]"
          style={{ background: 'var(--ivory)' }}
        >
          <div className="container-page max-w-4xl">
            <p className="section-label mb-4" style={{ color: 'var(--forest)' }}>
              {header.label}
            </p>
            <h1
              className="text-[var(--ink)] mb-6"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(34px, 5vw, 60px)',
                letterSpacing: '-0.025em',
                lineHeight: 1.06,
                fontWeight: 400,
              }}
            >
              {header.h1}
            </h1>
            <p
              className="text-[var(--ink-muted)] leading-relaxed mb-8"
              style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', maxWidth: '640px' }}
            >
              {header.body}
            </p>

            {/* Video: 300 faldilles */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl bg-black mt-8">
              <iframe
                src="https://www.youtube-nocookie.com/embed/9G5SYwl5JeU"
                title={
                  locale === 'ca'
                    ? 'Vídeo del projecte: 300 faldilles a Shariani'
                    : locale === 'en'
                    ? 'Project video: 300 skirts at Shariani'
                    : 'Vídeo del proyecto: 300 faldas en Shariani'
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Full Improvements timeline */}
        <Improvements />
      </main>
      <Footer />
    </>
  );
}
