'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { images } from '@/data/images';

interface YearProject {
  year: string;
  headline: string;
  body: string;
  tag: string;
}

const projects: YearProject[] = [
  {
    year: '2024',
    headline: 'Pintura y primera visita',
    body: 'Primera expedición de voluntarios. Se realizaron mejoras de pintura en las aulas y se estableció la relación directa con la comunidad de Shariani. El inicio de todo.',
    tag: 'Voluntariado',
  },
  {
    year: '2025',
    headline: 'Mesas y sillas con carpintero local',
    body: 'Los alumnos hacían las clases sentados en el suelo. Junto a un carpintero de la comunidad, fabricamos el mobiliario que faltaba: mesas y sillas para todas las aulas.',
    tag: 'Mobiliario',
  },
  {
    year: '2026',
    headline: 'Vallado exterior del colegio',
    body: 'Para garantizar la seguridad de los niños y niñas, construimos el vallado perimetral exterior del colegio. Un límite que protege y da identidad al espacio escolar.',
    tag: 'Seguridad',
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function Improvements() {
  const { ref: sectionRef, inView: sectionVisible } = useInView(0.1);

  return (
    <section
      id="shariani"
      className="py-20 md:py-32 overflow-hidden"
      style={{ background: 'var(--ivory)' }}
      aria-labelledby="improvements-heading"
    >
      <div className="container-page">
        {/* Header */}
        <div
          ref={sectionRef}
          className="mb-16 md:mb-20"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="section-label mb-3">Una historia real</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              id="improvements-heading"
              className="font-heading leading-[1.08] text-[var(--ink)] font-semibold"
              style={{
                fontSize: 'clamp(32px, 4vw, 46px)',
                letterSpacing: '-0.025em',
                maxWidth: '560px',
              }}
            >
              Cada junio,<br />un proyecto nuevo.
            </h2>
            <p
              className="font-sans text-[var(--ink-muted)] leading-relaxed"
              style={{ fontSize: '14px', maxWidth: '320px' }}
            >
              Cada verano viajamos a Kilifi County con una misión concreta.
              Así vamos construyendo, año a año, una escuela más digna.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: vertical timeline */}
          <div className="lg:col-span-7 flex flex-col gap-0">
            {projects.map((project, idx) => (
              <TimelineEntry
                key={project.year}
                project={project}
                index={idx}
                isLast={idx === projects.length - 1}
              />
            ))}
          </div>

          {/* Right: framed photo */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-28">
              <div
                className="relative overflow-hidden image-zoom-container"
                style={{
                  aspectRatio: '4/5',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  boxShadow: '0 12px 48px rgba(0,0,0,0.08)',
                }}
              >
                <Image
                  src={images.schoolFacilities.src}
                  alt={images.schoolFacilities.alt}
                  fill
                  sizes="35vw"
                  className="object-cover"
                />
                {/* Caption overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{
                    background: 'linear-gradient(to top, rgba(14,22,16,0.85) 0%, transparent 100%)',
                  }}
                >
                  <p className="font-heading text-white/95 text-[15px] font-semibold tracking-tight">
                    Shariani Primary School
                  </p>
                  <p className="font-sans text-white/60 text-[11px] mt-0.5 tracking-wider uppercase font-medium">
                    Kilifi County · Kenia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  project,
  index,
  isLast,
}: {
  project: YearProject;
  index: number;
  isLast: boolean;
}) {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="flex gap-6 md:gap-8"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(32px)',
        transition: `opacity 0.65s ease ${index * 0.15}s, transform 0.65s ease ${index * 0.15}s`,
      }}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0 w-10">
        {/* Year bubble */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10"
          style={{
            background: 'var(--forest)',
            color: '#fff',
            fontFamily: 'var(--font-heading)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          {project.year.slice(2)}
        </div>
        {/* Connector line */}
        {!isLast && (
          <div
            className="flex-1 w-px mt-2 mb-0"
            style={{
              background: 'linear-gradient(to bottom, var(--forest), var(--border))',
              minHeight: '48px',
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content card */}
      <div
        className="pb-10 flex-1"
        style={{ paddingBottom: isLast ? '0' : '2.5rem' }}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <span
            className="font-heading text-[var(--forest-mid)] leading-none font-bold tracking-tight"
            style={{ fontSize: 'clamp(14px, 1.3vw, 16px)' }}
          >
            {project.year}
          </span>
          <span
            className="font-sans text-[11px] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] tracking-wider uppercase flex-shrink-0 font-medium"
          >
            {project.tag}
          </span>
        </div>

        <h3
          className="font-heading text-[var(--ink)] mb-2 leading-snug font-semibold"
          style={{
            fontSize: 'clamp(20px, 2.2vw, 26px)',
            letterSpacing: '-0.02em',
          }}
        >
          {project.headline}
        </h3>
        <p
          className="font-sans text-[var(--ink-muted)] leading-relaxed"
          style={{ fontSize: '14px', maxWidth: '480px' }}
        >
          {project.body}
        </p>
      </div>
    </div>
  );
}
