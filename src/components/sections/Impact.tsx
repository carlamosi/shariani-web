'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { images } from '@/data/images';

/*
 * Impact Section — "El peso real de cada expedición"
 *
 * Inspired by the best NGO storytelling sites (charity: water, UNHCR, Malala Fund):
 *
 * Desktop:
 *   Full-bleed sticky photograph on the left (changes per chapter with a
 *   smooth crossfade). On the right: a scrolling column with one chapter per
 *   viewport height. Each chapter opens with a large verified number or figure
 *   that anchors the reader before the narrative.
 *
 * Mobile:
 *   Each chapter becomes a self-contained card: image → figure → text.
 *   No sticky behaviour; pure vertical reading flow.
 *
 * Data: only verified facts from the project record. No invented statistics,
 * percentages, or financial claims.
 *
 *   1 · 1.700 alumnos — the human scale of the project
 *   2 · 3 expediciones — the depth of the commitment
 *   3 · 0 intermediarios — the model's radical directness
 */

interface Chapter {
  id: string;
  figure: string;
  figureLabel: string;
  title: string;
  body: string;
  imageKey: keyof typeof images;
  imagePosition?: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: '01',
    figure: 'Luz',
    figureLabel: 'como punto de partida',
    title: 'Un aula renovada cambia el estado de ánimo de toda una escuela.',
    body: 'Cuando las paredes están limpias y las ventanas dejan pasar la luz, los niños entran distinto. La primera expedición arrancó con pintura, saneamiento y ventilación porque la dignidad del espacio es el primer paso hacia la concentración y el aprendizaje. No es retórica: el profesorado de Shariani lo describió así el primer lunes tras las obras.',
    imageKey: 'classroom',
    imagePosition: 'center 30%',
  },
  {
    id: '02',
    figure: 'Local',
    figureLabel: 'al 100%',
    title: 'Cada obra la construye la propia comunidad de Kilifi.',
    body: 'Los muebles de 2025 los fabricó íntegramente un taller de carpintería de Kilifi County. Los albañiles del muro de 2026 son de la zona. No traemos cuadrillas desde Barcelona: contratamos en origen, pagamos salario justo y el dinero dinamiza la economía local. La dependencia externa se convierte en capacidad propia.',
    imageKey: 'heroSchool',
    imagePosition: 'center 40%',
  },
  {
    id: '03',
    figure: '300 m',
    figureLabel: 'de muro perimetral',
    title: 'Proteger el espacio donde se aprende es proteger el futuro.',
    body: 'Shariani linda con caminos rurales por donde pasan vehículos, ganado y personas ajenas al centro. Sin cerramiento, las aulas se interrumpían constantemente y la seguridad de los 1.700 estudiantes era vulnerable. Con los 300 metros de muro de piedra y acceso controlado construidos en 2026, la escuela cuenta hoy con un perímetro seguro donde aprender en paz.',
    imageKey: 'fase3_1',
    imagePosition: 'center 50%',
  },
];

export function Impact() {
  const [activeChapter, setActiveChapter] = useState(0);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(Number(entry.target.getAttribute('data-index')));
          }
        });
      },
      {
        rootMargin: mq.matches ? '0px' : '-28% 0px -48% 0px',
        threshold: 0,
      }
    );

    textRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impacto"
      className="relative w-full"
      style={{ backgroundColor: 'var(--forest-dark)' }}
      aria-labelledby="impacto-heading"
    >
      {/* ── Mobile layout ─────────────────────────────────── */}
      <div className="md:hidden">
        {/* Section intro */}
        <div className="px-5 pt-14 pb-8">
          <p
            className="section-label mb-3"
            style={{ color: 'rgba(250,248,244,0.4)', fontFamily: 'var(--font-body)' }}
          >
            El impacto
          </p>
          <h2
            id="impacto-heading"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(30px, 8vw, 42px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--ivory)',
            }}
          >
            Lo que el trabajo<br />
            ya ha cambiado.
          </h2>
        </div>

        {/* Mobile chapters */}
        {CHAPTERS.map((ch) => (
          <div key={ch.id} className="mb-2">
            {/* Full-bleed image */}
            <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
              <Image
                src={images[ch.imageKey].src}
                alt={images[ch.imageKey].alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: ch.imagePosition ?? 'center' }}
              />
              {/* Dark overlay for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(14,22,16,0.92) 0%, rgba(14,22,16,0.3) 55%, transparent 100%)',
                }}
                aria-hidden="true"
              />
              {/* Figure overlaid bottom-left on the image */}
              <div className="absolute bottom-5 left-5">
                <p
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: 'clamp(52px, 16vw, 72px)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.03em',
                    color: 'var(--ivory)',
                  }}
                >
                  {ch.figure}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(250,248,244,0.6)',
                    marginTop: '2px',
                  }}
                >
                  {ch.figureLabel}
                </p>
              </div>
            </div>

            {/* Text block */}
            <div className="px-5 py-7" style={{ borderBottom: '1px solid rgba(250,248,244,0.08)' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(20px, 5vw, 26px)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  color: 'var(--ivory)',
                  marginBottom: '0.75rem',
                }}
              >
                {ch.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  lineHeight: 1.7,
                  color: 'rgba(250,248,244,0.7)',
                }}
              >
                {ch.body}
              </p>
            </div>
          </div>
        ))}

        {/* Mobile CTA bridge */}
        <div className="px-5 py-10">
          <a
            href="#ayuda"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--ivory)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderBottom: '1px solid rgba(250,248,244,0.3)',
              paddingBottom: '2px',
              textDecoration: 'none',
            }}
          >
            Cómo puedes contribuir →
          </a>
        </div>
      </div>

      {/* ── Desktop layout: split sticky ─────────────────────── */}
      <div className="hidden md:grid grid-cols-2" style={{ minHeight: '100vh' }}>

        {/* LEFT: Sticky full-bleed photograph (changes per chapter) */}
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ position: 'sticky' }}
          aria-hidden="true"
        >
          {/* Image stack with crossfade */}
          {CHAPTERS.map((ch, idx) => {
            const isActive = activeChapter === idx;
            return (
              <div
                key={ch.id}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                <Image
                  src={images[ch.imageKey].src}
                  alt={images[ch.imageKey].alt}
                  fill
                  priority={idx === 0}
                  sizes="50vw"
                  className="object-cover transition-transform duration-1000 ease-out"
                  style={{
                    objectPosition: ch.imagePosition ?? 'center',
                    transform: isActive ? 'scale(1)' : 'scale(1.04)',
                  }}
                />
              </div>
            );
          })}

          {/* Gradient overlays — bottom vignette + right edge for text */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `
                linear-gradient(to right, transparent 70%, var(--forest-dark) 100%),
                linear-gradient(to top, rgba(14,22,16,0.75) 0%, transparent 45%)
              `,
            }}
          />

          {/* Section label — bottom-left of the image */}
          <div className="absolute bottom-8 left-8 z-20">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(250,248,244,0.45)',
              }}
            >
              El impacto
            </p>
            {/* Chapter dot indicators */}
            <div className="flex items-center gap-1.5 mt-2.5">
              {CHAPTERS.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-500 rounded-full"
                  style={{
                    width: activeChapter === i ? '18px' : '5px',
                    height: '5px',
                    background: activeChapter === i ? 'var(--ivory)' : 'rgba(250,248,244,0.3)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Scrolling chapters */}
        <div style={{ background: 'var(--forest-dark)' }}>
          {/* Section heading — static intro above scroll */}
          <div
            className="px-12 xl:px-16 flex flex-col justify-center"
            style={{ paddingTop: 'max(80px, 12vh)', paddingBottom: '6vh' }}
          >
            <h2
              id="impacto-heading"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(32px, 3.2vw, 48px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--ivory)',
                maxWidth: '440px',
              }}
            >
              Lo que el trabajo<br />
              ya ha cambiado.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'rgba(250,248,244,0.5)',
                maxWidth: '360px',
                marginTop: '1.25rem',
              }}
            >
              Espacios renovados. Economía local activada. Una escuela que avanza año a año con obras reales.
            </p>
            <div
              className="mt-6"
              style={{
                width: '32px',
                height: '1px',
                background: 'rgba(250,248,244,0.25)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Chapter scroll blocks */}
          {CHAPTERS.map((ch, idx) => {
            const isActive = activeChapter === idx;
            return (
              <div
                key={ch.id}
                data-index={idx}
                ref={(el) => { textRefs.current[idx] = el; }}
                className="min-h-screen flex flex-col justify-center px-12 xl:px-16"
                style={{ paddingTop: '10vh', paddingBottom: '10vh' }}
              >
                <div
                  className="transition-all duration-500 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0.22,
                    transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                    maxWidth: '460px',
                  }}
                >
                  {/* Chapter indicator */}
                  <div
                    className="flex items-center gap-3 mb-6"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'rgba(250,248,244,0.4)',
                      }}
                    >
                      {ch.id}
                    </span>
                    <div
                      style={{
                        width: '20px',
                        height: '1px',
                        background: 'rgba(250,248,244,0.2)',
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* The BIG editorial figure — the emotional anchor */}
                  <div className="mb-5" aria-label={`${ch.figure} ${ch.figureLabel}`}>
                    <p
                      style={{
                        fontFamily: 'var(--font-editorial)',
                        fontSize: 'clamp(64px, 8vw, 108px)',
                        lineHeight: 0.9,
                        letterSpacing: '-0.04em',
                        color: 'var(--ivory)',
                        marginBottom: '6px',
                      }}
                      aria-hidden="true"
                    >
                      {ch.figure}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'rgba(250,248,244,0.45)',
                      }}
                      aria-hidden="true"
                    >
                      {ch.figureLabel}
                    </p>
                  </div>

                  {/* Chapter title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontSize: 'clamp(20px, 2vw, 26px)',
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                      color: 'rgba(250,248,244,0.92)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {ch.title}
                  </h3>

                  {/* Body */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14.5px',
                      lineHeight: 1.75,
                      color: 'rgba(250,248,244,0.62)',
                    }}
                  >
                    {ch.body}
                  </p>
                </div>
              </div>
            );
          })}

          {/* CTA Bridge → Donation */}
          <div
            className="px-12 xl:px-16 pb-20"
            style={{ borderTop: '1px solid rgba(250,248,244,0.1)', paddingTop: '3rem' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(18px, 1.8vw, 24px)',
                lineHeight: 1.35,
                color: 'rgba(250,248,244,0.85)',
                maxWidth: '360px',
                marginBottom: '1.25rem',
              }}
            >
              Este trabajo continúa porque hay personas que lo hacen posible.
            </p>
            <a
              href="#ayuda"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--ivory)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderBottom: '1px solid rgba(250,248,244,0.3)',
                paddingBottom: '2px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              Cómo puedes contribuir →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
