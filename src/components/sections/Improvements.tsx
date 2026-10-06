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
}

const PROJECTS_DATA: { year: string; state: YearState; items: string[] }[] = [
  { year: '2024', state: 'done', items: ['Cadires & taules', 'Valles perimetrals cole'] },
  { year: '2025', state: 'done', items: ['Goteres', 'Aules (netejar, pintar, dibuixos)', 'Higiene bucal (kits, explicació)'] },
  { year: '2026', state: 'active', items: ['300 faldilles', 'Pintar entrada / mural cole', 'Reformes sala profes'] },
  { year: '2027', state: 'future', items: ['Lavabos', 'Biblio', 'Basura', 'Lab'] },
];

const IMPROVEMENTS_TEXT = {
  CA: {
    tags: ['Mobiliari & Seguretat', 'Renovació & Salut', 'En curs', 'Propera missió'],
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
    activeNow: 'Ara',
  },
  ES: {
    tags: ['Mobiliario & Seguridad', 'Renovación & Salud', 'En curso', 'Próxima misión'],
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
    activeNow: 'Ahora',
  },
  EN: {
    tags: ['Furniture & Safety', 'Renovation & Health', 'In progress', 'Next mission'],
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
    activeNow: 'Now',
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
      className="py-20 md:py-32 overflow-hidden"
      style={{ background: 'var(--ivory)' }}
      aria-labelledby="improvements-heading"
    >
      <div className="container-page">
        <div
          ref={sectionRef}
          className="mb-16 md:mb-20"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="section-label mb-3">{tr.improvements.sectionLabel}</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              id="improvements-heading"
              className="font-heading leading-[1.08] text-[var(--ink)] font-semibold"
              style={{ fontSize: 'clamp(32px, 4vw, 46px)', letterSpacing: '-0.025em', maxWidth: '560px' }}
            >
              {tr.improvements.heading1}<br />{tr.improvements.heading2}
            </h2>
            <p
              className="font-sans text-[var(--ink-muted)] leading-relaxed"
              style={{ fontSize: '14px', maxWidth: '320px' }}
            >
              {tr.improvements.subheading}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 flex flex-col gap-0">
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

          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-28">
              <div
                className="relative overflow-hidden image-zoom-container"
                style={{ aspectRatio: '4/5', borderRadius: '6px', border: '1px solid var(--border)', boxShadow: '0 12px 48px rgba(0,0,0,0.08)' }}
              >
                <Image src={images.schoolFacilities.src} alt={images.schoolFacilities.alt} fill sizes="35vw" className="object-cover" />
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: 'linear-gradient(to top, rgba(14,22,16,0.85) 0%, transparent 100%)' }}
                >
                  <p className="font-heading text-white/95 text-[15px] font-semibold tracking-tight">
                    {tr.improvements.photoCaption}
                  </p>
                  <p className="font-sans text-white/60 text-[11px] mt-0.5 tracking-wider uppercase font-medium">
                    {tr.improvements.photoSubCaption}
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
  const { ref, inView } = useInView(0.15);
  const isActive = project.state === 'active';
  const isFuture = project.state === 'future';

  return (
    <div
      ref={ref}
      className="flex gap-6 md:gap-8"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(32px)',
        transition: `opacity 0.65s ease ${index * 0.14}s, transform 0.65s ease ${index * 0.14}s`,
      }}
    >
      <div className="flex flex-col items-center flex-shrink-0 w-10">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 relative"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, letterSpacing: '-0.01em', transition: 'box-shadow 0.3s ease', ...bubbleStyle[project.state] }}
        >
          {isActive && (
            <span className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(45,90,60,0.18)', animationDuration: '2s' }} aria-hidden="true" />
          )}
          <span className="relative z-10">{project.year.slice(2)}</span>
        </div>
        {!isLast && (
          <div className="flex-1 w-px mt-2 mb-0" style={{ minHeight: '48px', ...lineStyle[project.state] }} aria-hidden="true" />
        )}
      </div>

      <div className="pb-10 flex-1 rounded-xl" style={{ paddingBottom: isLast ? '0' : '2.5rem' }}>
        <div
          className="p-5 rounded-xl transition-all duration-300"
          style={{
            background: isActive ? 'linear-gradient(135deg, rgba(24,110,215,0.04) 0%, rgba(24,110,215,0.01) 100%)' : isFuture ? 'rgba(0,0,0,0.015)' : 'transparent',
            border: isActive ? '1px solid rgba(24,110,215,0.15)' : isFuture ? '1px dashed var(--border)' : '1px solid transparent',
            opacity: isFuture ? 0.72 : 1,
          }}
        >
          <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-heading leading-none font-bold tracking-tight" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: isFuture ? 'var(--ink-muted)' : 'var(--forest-mid)' }}>
                {project.year}
              </span>
              {isActive && (
                <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ background: 'rgba(45,90,60,0.1)', color: 'var(--forest)' }}>
                  ● {activeNow}
                </span>
              )}
            </div>
            <span className="font-sans text-[11px] px-2.5 py-1 rounded-full tracking-wider uppercase font-semibold flex-shrink-0" style={tagStyle[project.state]}>
              {project.tag}
            </span>
          </div>

          <h3 className="font-heading text-[var(--ink)] mb-2 leading-snug font-semibold" style={{ fontSize: 'clamp(18px, 2vw, 24px)', letterSpacing: '-0.02em', opacity: isFuture ? 0.75 : 1 }}>
            {project.headline}
          </h3>

          <p className="font-sans text-[var(--ink-muted)] leading-relaxed mb-4" style={{ fontSize: '13.5px', maxWidth: '480px' }}>
            {project.body}
          </p>

          <div className="flex flex-wrap gap-1.5" role="list" aria-label={`Activitats ${project.year}`}>
            {project.items.map((item) => (
              <span key={item} role="listitem" className="inline-flex items-center gap-1 font-sans text-[11.5px] font-medium px-2.5 py-1 rounded-full" style={chipStyle[project.state]}>
                {project.state === 'done' && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
                {project.state === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" aria-hidden="true" />}
                {project.state === 'future' && <span className="w-1.5 h-1.5 rounded-full border border-current flex-shrink-0 opacity-50" aria-hidden="true" />}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
