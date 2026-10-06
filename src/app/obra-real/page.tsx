import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Improvements } from '@/components/sections/Improvements';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Obra real · La Vall × Shariani',
  description: 'Cada any construïm una millora permanent a Shariani Primary School. Mobiliari, aules, seguretat perimetral, higiene bucal i molt més.',
  openGraph: {
    title: 'Obra real · La Vall × Shariani',
    description: 'Des del 2024, cada expedició deixa una millora física permanent a Shariani. Descobreix les 4 fases del projecte.',
    url: 'https://lavallshariani.cat/obra-real',
  },
};

export default function ObraRealPage() {
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
          <div className="container-page max-w-3xl">
            <p className="section-label mb-4" style={{ color: 'var(--forest)' }}>
              Cada any, una obra real
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
              Construir sense aturar-nos.
            </h1>
            <p
              className="text-[var(--ink-muted)] leading-relaxed"
              style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', maxWidth: '560px' }}
            >
              Des del 2024, cada expedició deixa una millora física i permanent a Shariani Primary School.
              No visites puntuals: un pla d&apos;obres acordat amb el claustre, executat per paletes i
              fusters locals de Kilifi, i documentat per les voluntàries sobre el terreny.
            </p>
          </div>
        </section>

        {/* Full Improvements timeline */}
        <Improvements />
      </main>
      <Footer />
    </>
  );
}
