'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { images } from '@/data/images';
import { useLang } from '@/context/LangContext';

const YEARS = ['2024', '2025', '2026', '2027'] as const;
type YearState = 'done' | 'active' | 'future';
const STATES: YearState[] = ['done', 'done', 'active', 'future'];

const TEASER_TEXT = {
  CA: {
    sectionLabel: 'Cada any, una obra real',
    heading: 'Construïm sense aturar-nos.',
    body: 'Des del 2024, cada expedició deixa una millora física permanent a Shariani. Aules, mobiliari, seguretat, higiene i molt més.',
    cta: 'Descobreix com construïm',
    years: ['Mobiliari & Seguretat', 'Aules & Salut', 'En curs ara', 'Propera missió'],
  },
  ES: {
    sectionLabel: 'Cada año, una obra real',
    heading: 'Construimos sin parar.',
    body: 'Desde 2024, cada expedición deja una mejora física permanente en Shariani. Aulas, mobiliario, seguridad, higiene y mucho más.',
    cta: 'Descubre cómo construimos',
    years: ['Mobiliario & Seguridad', 'Aulas & Salud', 'En curso ahora', 'Próxima misión'],
  },
  EN: {
    sectionLabel: 'Every year, real work',
    heading: 'We build without stopping.',
    body: 'Since 2024, every expedition leaves a permanent physical improvement at Shariani. Classrooms, furniture, safety, hygiene and much more.',
    cta: 'Discover how we build',
    years: ['Furniture & Safety', 'Classrooms & Health', 'In progress now', 'Next mission'],
  },
};

export function ImprovementsTeaser() {
  const { lang } = useLang();
  const txt = TEASER_TEXT[lang];

  return (
    <section
      className="py-20 md:py-28 border-t border-[var(--border)] overflow-hidden"
      style={{ background: 'var(--paper)' }}
      aria-label={txt.sectionLabel}
    >
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            <p className="section-label mb-4">{txt.sectionLabel}</p>
            <h2
              className="text-[var(--ink)] mb-5"
              style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(28px, 3.6vw, 42px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              {txt.heading}
            </h2>
            <p className="text-[var(--ink-muted)] mb-8 leading-relaxed" style={{ fontSize: '15px', maxWidth: '420px' }}>
              {txt.body}
            </p>

            {/* Year pills */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {YEARS.map((yr, i) => {
                const state = STATES[i];
                return (
                  <div
                    key={yr}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold"
                    style={
                      state === 'done'
                        ? { background: 'rgba(24,110,215,0.08)', color: 'var(--forest)', border: '1px solid rgba(24,110,215,0.2)' }
                        : state === 'active'
                        ? { background: 'rgba(245,158,11,0.1)', color: '#92400e', border: '1px solid rgba(245,158,11,0.35)' }
                        : { background: 'rgba(0,0,0,0.035)', color: 'var(--ink-muted)', border: '1px solid var(--border)' }
                    }
                  >
                    {state === 'done' && <CheckCircle2 size={12} aria-hidden="true" />}
                    {state === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />}
                    {state === 'future' && <Clock size={12} aria-hidden="true" />}
                    <span>{yr} · {txt.years[i]}</span>
                  </div>
                );
              })}
            </div>

            <Link
              href="/obra-real"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 group"
              style={{ background: 'var(--forest)', boxShadow: '0 2px 12px rgba(24,110,215,0.25)' }}
            >
              <span>{txt.cta}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right — photo */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-xl image-zoom-container"
              style={{ aspectRatio: '4/3', border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
            >
              <Image
                src={images.fase3_1.src}
                alt={images.fase3_1.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Year counter overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between"
                style={{ background: 'linear-gradient(to top, rgba(10,18,28,0.75) 0%, transparent 100%)' }}
              >
                <div>
                  <p className="text-white/50 text-xs font-mono uppercase tracking-widest mb-0.5">Shariani · 2024–2027</p>
                  <p className="text-white text-sm font-semibold">{YEARS.filter((_, i) => STATES[i] === 'done').length} / {YEARS.length} fases</p>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                  style={{ background: 'rgba(24,110,215,0.85)', backdropFilter: 'blur(8px)' }}
                  aria-hidden="true"
                >
                  {Math.round((YEARS.filter((_, i) => STATES[i] === 'done').length / YEARS.length) * 100)}%
                </div>
              </div>
            </div>
            {/* Decorative dot grid */}
            <div
              className="absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none opacity-40"
              aria-hidden="true"
              style={{
                backgroundImage: 'radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
