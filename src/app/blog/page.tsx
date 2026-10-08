import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlogContent } from '@/components/sections/BlogContent';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Blog & Diari de camp · La Vall × Shariani',
  description: 'Històries, testimonis de les alumnes de 2n de Batxillerat i avenços reals de les obres a Shariani Primary School (Kènia).',
  openGraph: {
    title: 'Blog & Diari de camp · La Vall × Shariani',
    description: 'El projecte viscut des de dins: cròniques des del terreny, les veus de les nenes i el vincle indestructible entre Barcelona i Kilifi.',
    url: 'https://lavallshariani.cat/blog',
  },
};

export default function BlogPage() {
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
              Cròniques & Testimonis
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
              El projecte viscut des de dins.
            </h1>
            <p
              className="text-[var(--ink-muted)] leading-relaxed"
              style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', maxWidth: '620px' }}
            >
              Diari des del terreny, relats de convivència, veus de les nenes de Shariani i
              l&apos;aprenentatge transformador de les voluntàries de 2n de Batxillerat en cada expedició a Kènia.
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
