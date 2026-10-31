import type { Locale } from '@/lib/site';
import { LOCALES, SITE_URL } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { buildBlogPageJsonLd } from '@/lib/jsonld';
import { t } from '@/data/translations';
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
    title: 'Blog · Voluntariat La Vall a Kenya | Shariani',
    description:
      'Cròniques i testimonis de les alumnes de La Vall (Bellaterra) al voluntariat de Shariani Primary School, Kilifi, Kenya. Diaris des del terreny i aprenentatge mutu.',
  },
  es: {
    title: 'Blog · Voluntariado La Vall en Kenia | Shariani',
    description:
      'Crónicas y testimonios de las alumnas de La Vall (Bellaterra) en el voluntariado de Shariani Primary School, Kilifi, Kenia. Diarios desde el terreno y aprendizaje mutuo.',
  },
  en: {
    title: 'Blog · La Vall Volunteering in Kenya | Shariani',
    description:
      'Field diaries and testimonies from La Vall (Bellaterra) students at Shariani Primary School, Kilifi, Kenya. Stories of mutual learning and community building.',
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
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
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
  const m = BLOG_META[locale];

  const langKey = locale.toUpperCase() as 'CA' | 'ES' | 'EN';
  const journalEntries = t[langKey]?.journal?.entries ?? [];
  const publishedDates = ['2024-07-01', '2024-05-01', '2024-02-01'];
  const postImages = [
    `${SITE_URL}/images/hero-school.jpeg`,
    `${SITE_URL}/images/valla.jpg`,
    `${SITE_URL}/images/colaborar-ongs.jpg`,
  ];

  const posts = journalEntries.map((e, idx) => ({
    title: e.title,
    excerpt: e.excerpt,
    author: e.author,
    date: e.date,
    datePublished: publishedDates[idx] || '2024-07-01',
    image: postImages[idx] || `${SITE_URL}/images/hero-school.jpeg`,
  }));

  const breadcrumbLabels: Record<Locale, string> = { es: 'Inicio', ca: 'Inici', en: 'Home' };
  const jsonLd = buildBlogPageJsonLd({
    lang: locale,
    title: m.title,
    description: m.description,
    breadcrumbs: [
      { name: breadcrumbLabels[locale], item: `${SITE_URL}/${locale}` },
      { name: 'Blog', item: `${SITE_URL}/${locale}/blog` },
    ],
    posts,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
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
