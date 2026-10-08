'use client';

import React from 'react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { images } from '@/data/images';
import { useLang } from '@/context/LangContext';

type YearState = 'done' | 'active' | 'future';

interface YearProject {
  year: string;
  headline: string;
  body: string;
  tag: string;
  state: YearState;
  items: string[];
  image: { src: string; alt: string };
}

const PROJECTS_DATA: {
  year: string;
  state: YearState;
  items: string[];
  image: { src: string; alt: string };
}[] = [
  {
    year: '2024',
    state: 'done',
    items: ['Cadires & taules', 'Valles perimetrals cole'],
    image: {
      src: images.fase1_1.src,
      alt: 'Aules condicionades i mobiliari nou a Shariani (2024)',
    },
  },
  {
    year: '2025',
    state: 'done',
    items: ['Goteres', 'Aules (netejar, pintar, dibuixos)', 'Higiene bucal (kits, explicació)'],
    image: {
      src: images.classroom.src,
      alt: 'Restauració de les aules i kits d higiene bucal (2025)',
    },
  },
  {
    year: '2026',
    state: 'done',
    items: ['300 faldilles', 'Pintar entrada / mural cole', 'Reformes sala profes'],
    image: {
      src: images.fase3_1.src,
      alt: 'Muro perimetral, mural i sala de professors (2026)',
    },
  },
  {
    year: '2027',
    state: 'active',
    items: ['Lavabos', 'Biblio', 'Basura', 'Lab'],
    image: {
      src: images.schoolBuilding.src,
      alt: 'Planificació dels lavabos, biblioteca i laboratori a Shariani (2027)',
    },
  },
];

const IMPROVEMENTS_TEXT = {
  CA: {
    tags: ['Mobiliari & Seguretat', 'Renovació & Salut', 'Completat · Juny 2026', 'Propera expedició'],
    headlines: [
      'Cadires, taules i vallat perimetral',
      'Aules renovades i salut bucal',
      '300 faldilles, mural i sala de professors',
      'Lavabos, biblioteca, laboratori i residus',
    ],
    bodies: [
      'Primera expedició de voluntaris. Es van dotar les aules amb cadires i taules fabricades localment, i es va construir el vallat perimetral que dóna seguretat i identitat a l\'escola.',
      'Restauració integral de les aules: reparació de goteres, neteja i pintura de parets, murals educatius i kits d\'higiene bucal per a tots els alumnes amb sessions explicatives.',
      'Confeccionem 300 faldilles escolars per a les nenes de la comunitat. Pintem el mural d\'entrada del col·legi i completem la reforma de la sala de professors.',
      'Propera missió: construcció de lavabos dignes, habilitació de la biblioteca escolar, equipament del laboratori i millora de la gestió de residus al recinte.',
    ],
    activeNow: 'Juny 2027',
  },
  ES: {
    tags: ['Mobiliario & Seguridad', 'Renovación & Salud', 'Completado · Junio 2026', 'Próxima expedición'],
    headlines: [
      'Sillas, mesas y vallado perimetral',
      'Aulas renovadas y salud bucal',
      '300 faldillas, mural y sala de profesores',
      'Lavabos, biblioteca, laboratorio y residuos',
    ],
    bodies: [
      'Primera expedición de voluntarios. Se dotaron las aulas con sillas y mesas fabricadas localmente, y se construyó el vallado perimetral que da seguridad e identidad a la escuela.',
      'Restauración integral de las aulas: reparación de goteras, limpieza y pintura de paredes, murales educativos y kits de higiene bucal para todos los alumnos con sesiones explicativas.',
      'Confeccionamos 300 faldillas escolares para las niñas de la comunidad. Pintamos el mural de entrada del colegio y completamos la reforma de la sala de profesores.',
      'Próxima misión: construcción de lavabos dignos, habilitación de la biblioteca escolar, equipamiento del laboratorio y mejora de la gestión de residuos en el recinto.',
    ],
    activeNow: 'Junio 2027',
  },
  EN: {
    tags: ['Furniture & Safety', 'Renovation & Health', 'Completed · June 2026', 'Next expedition'],
    headlines: [
      'Chairs, tables and perimeter fence',
      'Renovated classrooms and oral health',
      '300 skirts, mural and staff room',
      'Toilets, library, lab and waste management',
    ],
    bodies: [
      'First volunteer expedition. Classrooms were equipped with locally made chairs and tables, and the perimeter fence was built, providing safety and identity to the school.',
      'Full classroom restoration: roof leak repairs, wall cleaning and painting, educational murals, and oral hygiene kits for all pupils with explanation sessions.',
      'We made 300 school skirts for the girls in the community. We painted the school entrance mural and completed the refurbishment of the staff room.',
      'Next mission: building proper toilets, setting up the school library, equipping the science lab, and improving waste management on the school grounds.',
    ],
    activeNow: 'June 2027',
  },
};

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
  const { lang, tr } = useLang();
  const { ref: sectionRef, inView: sectionVisible } = useInView(0.1);
  const langText = IMPROVEMENTS_TEXT[lang];

  const projects: YearProject[] = PROJECTS_DATA.map((d, i) => ({
    ...d,
    tag: langText.tags[i],
    headline: langText.headlines[i],
    body: langText.bodies[i],
  }));

  return (
    <section
      id="shariani"
      className="py-16 md:py-24 overflow-hidden"
      style={{ background: 'var(--ivory)' }}
      aria-labelledby="improvements-heading"
    >
      <div className="container-page">
        <div
          ref={sectionRef}
          className="mb-14 md:mb-18"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="section-label mb-3" style={{ color: 'var(--forest)' }}>{tr.improvements.sectionLabel}</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              id="improvements-heading"
              className="font-heading leading-[1.08] text-[var(--ink)] font-normal"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.025em', maxWidth: '600px', fontFamily: 'var(--font-editorial)' }}
            >
              {tr.improvements.heading1} {tr.improvements.heading2}
            </h2>
            <p
              className="font-sans text-[var(--ink-muted)] leading-relaxed"
              style={{ fontSize: '15px', maxWidth: '360px' }}
            >
              {tr.improvements.subheading}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:gap-16">
          {projects.map((project, idx) => (
            <TimelineEntry
              key={project.year}
              project={project}
              index={idx}
              isLast={idx === projects.length - 1}
              activeNow={langText.activeNow}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── State-aware style maps ── */
const bubbleStyle: Record<YearState, React.CSSProperties> = {
  done: { background: 'var(--forest)', color: '#fff', border: '2px solid var(--forest)' },
  active: { background: 'var(--forest)', color: '#fff', border: '2px solid var(--forest)', boxShadow: '0 0 0 4px rgba(24,110,215,0.15)' },
  future: { background: 'transparent', color: 'var(--ink-muted)', border: '2px dashed var(--border)' },
};

const lineStyle: Record<YearState, React.CSSProperties> = {
  done: { background: 'linear-gradient(to bottom, var(--forest), var(--forest))' },
  active: { background: 'linear-gradient(to bottom, var(--forest), var(--border))' },
  future: { background: 'var(--border)' },
};

const chipStyle: Record<YearState, React.CSSProperties> = {
  done: { background: 'rgba(24,110,215,0.07)', color: 'var(--forest)', border: '1px solid rgba(24,110,215,0.2)' },
  active: { background: 'rgba(245,158,11,0.09)', color: '#92400e', border: '1px solid rgba(245,158,11,0.35)' },
  future: { background: 'rgba(0,0,0,0.03)', color: 'var(--ink-muted)', border: '1px solid var(--border)' },
};

const tagStyle: Record<YearState, React.CSSProperties> = {
  done: { background: 'rgba(24,110,215,0.07)', color: 'var(--forest)', border: '1px solid rgba(24,110,215,0.2)' },
  active: { background: 'rgba(245,158,11,0.1)', color: '#92400e', border: '1px solid rgba(245,158,11,0.4)' },
  future: { background: 'transparent', color: 'var(--ink-muted)', border: '1px dashed var(--border)' },
};

function TimelineEntry({
  project, index, isLast, activeNow,
}: {
  project: YearProject;
  index: number;
  isLast: boolean;
  activeNow: string;
}) {
  const { ref, inView } = useInView(0.12);
  const isActive = project.state === 'active';
  const isFuture = project.state === 'future';

  return (
    <div
      ref={ref}
      className="flex gap-4 sm:gap-8 lg:gap-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${index * 0.12}s, transform 0.65s ease ${index * 0.12}s`,
      }}
    >
      {/* Timeline Indicator Column */}
      <div className="flex flex-col items-center flex-shrink-0 w-10 sm:w-12">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 relative"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, letterSpacing: '-0.01em', ...bubbleStyle[project.state] }}
        >
          {isActive && (
            <span className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(24,110,215,0.2)', animationDuration: '2s' }} aria-hidden="true" />
          )}
          <span className="relative z-10">{project.year}</span>
        </div>
        {!isLast && (
          <div className="flex-1 w-px mt-3 mb-0" style={{ minHeight: '60px', ...lineStyle[project.state] }} aria-hidden="true" />
        )}
      </div>

      {/* Content & Integrated Photography Card */}
      <div className="flex-1 pb-4 sm:pb-8">
        <div
          className="p-6 sm:p-8 rounded-2xl transition-all duration-300 border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          style={{
            background: isActive ? 'linear-gradient(135deg, rgba(24,110,215,0.04) 0%, rgba(24,110,215,0.01) 100%)' : isFuture ? 'rgba(0,0,0,0.015)' : 'var(--paper)',
            borderColor: isActive ? 'rgba(24,110,215,0.25)' : isFuture ? 'var(--border)' : 'var(--border)',
            opacity: isFuture ? 0.8 : 1,
          }}
        >
          {/* Left Text Block */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-heading leading-none font-bold tracking-tight text-lg text-[var(--forest)]" style={{ fontFamily: 'var(--font-editorial)' }}>
                    {project.year}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: 'rgba(24,110,215,0.1)', color: 'var(--forest)' }}>
                      ● {activeNow}
                    </span>
                  )}
                </div>
                <span className="font-sans text-[11px] px-3 py-1 rounded-full tracking-wider uppercase font-semibold flex-shrink-0" style={tagStyle[project.state]}>
                  {project.tag}
                </span>
              </div>

              <h3
                className="text-[var(--ink)] mb-3 leading-snug font-normal"
                style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', letterSpacing: '-0.02em', fontFamily: 'var(--font-editorial)' }}
              >
                {project.headline}
              </h3>

              <p className="font-sans text-[var(--ink-muted)] leading-relaxed mb-6" style={{ fontSize: '14.5px' }}>
                {project.body}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-light)]" role="list" aria-label={`Activitats ${project.year}`}>
              {project.items.map((item) => (
                <span key={item} role="listitem" className="inline-flex items-center gap-1.5 font-sans text-xs font-medium px-3 py-1 rounded-full" style={chipStyle[project.state]}>
                  {project.state === 'done' && (
                    <svg width="10" height="10" viewBox="0 0 9 9" fill="none" aria-hidden="true"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                  {project.state === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" aria-hidden="true" />}
                  {project.state === 'future' && <span className="w-1.5 h-1.5 rounded-full border border-current flex-shrink-0 opacity-50" aria-hidden="true" />}
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image Block */}
          <div className="lg:col-span-5 relative w-full aspect-[16/11] rounded-xl overflow-hidden border border-[var(--border)] shadow-sm bg-[var(--paper)]">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 36vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-white/90 text-xs font-medium drop-shadow-xs">
                {project.year} · {project.tag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
