'use client';

import Image from 'next/image';
import { useLang } from '@/context/LangContext';

const TESTIMONIAL_IMAGES = [
  '/images/testimonials/carla.png',
  '/images/testimonials/peter-mwangi.png',
  '/images/testimonials/inma.png',
];

export function Testimonials() {
  const { tr } = useLang();
  const tTest = tr.testimonials;

  return (
    <section
      id="testimonios"
      className="relative w-full bg-[#FAF8F4] py-16 sm:py-20 lg:py-24 border-t border-[var(--border)] overflow-hidden"
      aria-labelledby="testimonios-heading"
    >
      <div className="container-page max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* ── Encabezado superior ────────────────────────────────────────── */}
        <div className="max-w-2xl mb-12 sm:mb-14 lg:mb-16">
          {/* Eyebrow con línea fina */}
          <div className="flex items-center gap-3 mb-3.5">
            <span
              className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[var(--forest)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {tTest.eyebrow}
            </span>
            <span
              className="h-px w-10 sm:w-12 bg-[var(--forest)]/40 inline-block"
              aria-hidden="true"
            />
          </div>

          {/* Título en Young Serif */}
          <h2
            id="testimonios-heading"
            className="text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[var(--ink)] tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            <span>{tTest.headlinePart1}</span>
            <br className="hidden sm:inline" />{' '}
            <span>{tTest.headlinePart2}</span>
          </h2>

          {/* Subtítulo introductorio */}
          <p
            className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed max-w-xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {tTest.intro}
          </p>
        </div>

        {/* ── Columnas de testimonios (3 columnas en desktop) ─────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-9 lg:gap-11 items-start">
          {tTest.items.map((item, idx) => (
            <article key={item.name} className="flex flex-col items-start">
              {/* Fotografía apaisada con esquinas suavemente redondeadas */}
              <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden mb-6 bg-[var(--paper)]">
                <Image
                  src={TESTIMONIAL_IMAGES[idx]}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 360px"
                  className="object-cover"
                />
              </div>

              {/* Comilla doble de apertura en azul característico */}
              <svg
                width="28"
                height="20"
                viewBox="0 0 28 20"
                fill="currentColor"
                className="text-[var(--forest)] mb-3 shrink-0"
                aria-hidden="true"
              >
                <path d="M0 12.8C0 6.133 3.733 1.6 9.6 0l1.867 2.667C7.2 3.733 5.333 6.4 5.333 9.6H10.4V20H0V12.8zm13.6 0c0-6.667 3.733-11.2 9.6-12.8l1.867 2.667c-4.267 1.066-6.134 3.733-6.134 6.933h5.067V20H13.6V12.8z" />
              </svg>

              {/* Cita textual */}
              <blockquote
                className="text-[14.5px] sm:text-[15.5px] text-[var(--ink)] leading-[1.65] font-normal mb-5"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.quote}
              </blockquote>

              {/* Bloque de autoría y procedencia */}
              <div className="mt-auto pt-1">
                {/* Nombre en azul característico con tipografía editorial */}
                <h3
                  className="text-base sm:text-[17px] font-normal text-[var(--forest)] tracking-tight mb-1"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {item.name}
                </h3>

                {/* Rol */}
                <p
                  className="text-xs sm:text-[13px] text-[var(--text-secondary)] font-normal leading-snug mb-0.5"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {item.roleLine}
                </p>

                {/* Institución y ubicación */}
                <p
                  className="text-xs sm:text-[13px] text-[var(--text-secondary)]/80 font-normal leading-snug"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {item.metaLine}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* ── Indicadores de paginación centrados (1 azul, 2 grises) ───────── */}
        <div
          className="flex items-center justify-center gap-2 mt-12 sm:mt-16"
          aria-hidden="true"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--forest)]" />
          <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
          <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
        </div>
      </div>
    </section>
  );
}
