import type { Locale } from '@/lib/site';
import { LOCALES } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlogContent } from '@/components/sections/BlogContent';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Per-locale blog page strings (server-side only — no client dict needed)
const BLOG_META: Record<Locale, { title: string; description: string }> = {
  ca: {
    title: 'Blog',
    description:
      'Cròniques i testimonis de les alumnes de La Vall (Bellaterra) a Shariani Primary School, Kilifi, Kenya.',
  },
  es: {
    title: 'Blog',
    description:
      'Crónicas y testimonios de las alumnas de La Vall (Bellaterra) en Shariani Primary School, Kilifi, Kenia.',
  },
  en: {
    title: 'Blog',
    description:
      'Field diaries and testimonies from La Vall (Bellaterra) students at Shariani Primary School, Kilifi, Kenya.',
  },
};

const BLOG_HEADER: Record<Locale, { label: string; h1: string; body: string }> = {
  ca: {
    label: 'Cròniques & Testimonis',
    h1: 'El projecte viscut des de dins.',
    body: "Diari des del terreny, relats de convivència, veus de les nenes de Shariani i l'aprenentatge transformador de les voluntàries de 2n de Batxillerat en cada expedició a Kènia.",
  },
  es: {
    label: 'Crónicas & Testimonios',
    h1: 'El proyecto vivido desde dentro.',
    body: 'Diario desde el terreno, relatos de convivencia, voces de las niñas de Shariani y el aprendizaje transformador de las alumnas de 2.º de Bachillerato en cada expedición a Kenia.',
  },
  en: {
    label: 'Field Diaries & Testimonies',
    h1: 'The project, lived from within.',
    body: 'Field diary, stories of mutual growth, the voices of Shariani children and the transformative learning of Year 13 students in every expedition to Kenya.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LOCALES as readonly string[]).includes(lang)) return {};
  const locale = lang as Locale;
  const m = BLOG_META[locale];
  return buildMetadata({ lang: locale, path: 'blog', title: m.title, description: m.description });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
  const locale = lang as Locale;
  const header = BLOG_HEADER[locale];

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        {/* Editorial Page Header */}
        <section
          className="pt-32 pb-14 md:pt-40 md:pb-16 border-b border-[var(--border)]"
          style={{ background: 'var(--ivory)' }}
        >
          <div className="container-page max-w-4xl">
            <p className="section-label mb-3" style={{ color: 'var(--forest)' }}>
              {header.label}
            </p>
            <h1
              className="text-[var(--ink)] mb-5"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(34px, 5vw, 56px)',
                letterSpacing: '-0.025em',
                lineHeight: 1.08,
                fontWeight: 400,
              }}
            >
              {header.h1}
            </h1>
            <p
              className="text-[var(--ink-muted)] leading-relaxed"
              style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', maxWidth: '620px' }}
            >
              {header.body}
            </p>
          </div>
        </section>

        {/* Dynamic Blog Grid & Reader */}
        <BlogContent />
      </main>
      <Footer />
    </>
  );
}
