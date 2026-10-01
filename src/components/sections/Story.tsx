'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { images } from '@/data/images';

/*
 * Story Section (Scroll Storytelling directly after Hero)
 *
 * Desktop: full-bleed split layout (image touches viewport edge on the left)
 * Mobile: standard vertical stack
 */

const chapters = [
  {
    id: '01',
    tag: 'El punto de partida',
    title: '1.700 alumnos en Kilifi',
    body: 'Shariani Primary School educa a más de 1.700 niños y niñas en una de las zonas rurales más vulnerables de la costa de Kenia. Pese a la dedicación absoluta del equipo docente, las aulas carecían de suelo firme, pupitres suficientes y un cerramiento que garantizase la seguridad diaria de los estudiantes.',
    imageKey: 'schoolBuilding' as const,
    alt: 'Edificio principal de Shariani Primary School en Kilifi County',
  },
  {
    id: '02',
    tag: 'El modelo',
    title: 'Alianza sobre el terreno',
    body: (
      <>
        Trabajamos en una red directa entre Barcelona y Kenia, en estrecha colaboración con la{' '}
        <a
          href="https://www.fundaciomontblanc.org/index.php/es/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--forest)] font-semibold underline underline-offset-4 hover:text-[var(--forest-dark)] transition-colors"
        >
          Fundació Montblanc
        </a>{' '}
        desde Barcelona y con{' '}
        <a
          href="https://volunteersconnect.co.ke/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--forest)] font-semibold underline underline-offset-4 hover:text-[var(--forest-dark)] transition-colors"
        >
          Volunteer Connect Kenya Foundation
        </a>{' '}
        en Nairobi.
      </>
    ),
    imageKey: 'colaborarOngs' as const,
    alt: 'Colaboración sobre el terreno con organizaciones locales',
  },
  {
    id: '03',
    tag: 'La continuidad',
    title: 'Un compromiso demostrado',
    body: 'No es una visita puntual de un verano: es un compromiso que mantenemos cada año. Desde 2024 viajamos cada mes de junio con un plan de obras acordado con la escuela. Lo que construimos permanece en el tiempo y se convierte en mejoras reales para toda la comunidad educativa.',
    imageKey: 'laContinuidad' as const,
    alt: 'Evolución y continuidad de las mejoras en Shariani',
  },
];

export function Story() {
  const [activeChapter, setActiveChapter] = useState(0);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let mostVisible = -1;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = Number(entry.target.getAttribute('data-index'));
          }
        });

        if (mostVisible !== -1) setActiveChapter(mostVisible);
        else {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveChapter(Number(entry.target.getAttribute('data-index')));
            }
          });
        }
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    textRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: 'var(--ivory)', borderTop: '1px solid var(--border-light)' }}
      aria-label="Historia del proyecto"
    >
      {/* ── MOBILE: standard vertical stack inside container ── */}
      <div className="md:hidden container-page py-16 flex flex-col gap-16">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-[var(--forest)]">
              <span className="font-mono font-bold text-xs tracking-widest">{chapter.id}</span>
              <span className="text-[var(--text-secondary)] font-body text-xs uppercase tracking-wider">
                · {chapter.tag}
              </span>
              <div className="h-px bg-[var(--border)] flex-1" />
            </div>
            <h2
              style={{ fontFamily: 'var(--font-editorial)' }}
              className="font-normal text-2xl sm:text-3xl leading-tight text-[var(--ink)]"
            >
              {chapter.title}
            </h2>
            {/* Full-bleed image on mobile */}
            <div className="relative -mx-6 w-[calc(100%+3rem)] sm:mx-0 sm:w-full overflow-hidden"
              style={{ aspectRatio: '16/10' }}>
              <Image
                src={images[chapter.imageKey].src}
                alt={chapter.alt}
                fill
                className="object-cover"
              />
            </div>
            <p
              style={{ fontFamily: 'var(--font-body)' }}
              className="text-[15px] text-[var(--ink-muted)] leading-relaxed"
            >
              {chapter.body}
            </p>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: full-bleed split (NO container-page wrapper) ── */}
      <div className="hidden md:grid grid-cols-2" style={{ minHeight: '100vh' }}>

        {/* Left: sticky full-height image panel — touches left viewport edge */}
        <div className="sticky top-0 h-screen overflow-hidden bg-[var(--border)]">
          {chapters.map((ch, idx) => {
            const isSelected = activeChapter === idx;
            return (
              <div
                key={ch.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  isSelected ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={images[ch.imageKey].src}
                  alt={ch.alt}
                  fill
                  priority={idx === 0}
                  sizes="50vw"
                  className="object-cover transition-transform duration-1000 ease-out"
                  style={{ transform: isSelected ? 'scale(1)' : 'scale(1.03)' }}
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Right: scrolling text column with manual padding */}
        <div className="pl-12 pr-10 xl:pl-16 xl:pr-14 pb-[30vh]">
          <div className="pt-[35vh]">
            {chapters.map((chapter, i) => (
              <div
                key={chapter.id}
                data-index={i}
                ref={(el) => { textRefs.current[i] = el; }}
                className="min-h-[65vh] flex flex-col justify-center"
              >
                <div
                  className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity: activeChapter === i ? 1 : 0.2,
                    transform: activeChapter === i ? 'translateY(0)' : 'translateY(16px)',
                  }}
                >
                  <div className="mb-4 inline-flex items-center gap-2">
                    <span className="font-mono font-bold text-xs tracking-widest text-[var(--forest)]">
                      {chapter.id}
                    </span>
                    <span className="text-[var(--text-secondary)] font-body text-xs uppercase tracking-wider">
                      · {chapter.tag}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontSize: 'clamp(28px, 2.6vw, 36px)',
                      letterSpacing: '-0.02em',
                      color: 'var(--ink)',
                      lineHeight: 1.15,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {chapter.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15.5px',
                      lineHeight: 1.75,
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {chapter.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
