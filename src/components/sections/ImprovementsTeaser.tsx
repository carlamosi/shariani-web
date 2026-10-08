'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { images } from '@/data/images';
import { useLang } from '@/context/LangContext';

const YEARS = ['2024', '2025', '2026', '2027'] as const;
type YearState = 'done' | 'active' | 'future';
const STATES: YearState[] = ['done', 'done', 'done', 'active'];

const TEASER_TEXT = {
  CA: {
    sectionLabel: 'Cada any, una obra real',
    heading: 'Construïm sense aturar-nos.',
    body: 'Des del 2024, cada expedició deixa una millora física permanent a Shariani. Aules, mobiliari, seguretat, higiene i molt més.',
    cta: 'Descobreix com construïm',
    years: ['Mobiliari & Seguretat', 'Aules & Salut', 'Mural & Faldilles', 'Juny 2027'],
  },
  ES: {
    sectionLabel: 'Cada año, una obra real',
    heading: 'Construimos sin parar.',
    body: 'Desde 2024, cada expedición deja una mejora física permanente en Shariani. Aulas, mobiliario, seguridad, higiene y mucho más.',
    cta: 'Descubre cómo construimos',
    years: ['Mobiliario & Seguridad', 'Aulas & Salud', 'Mural & Faldillas', 'Junio 2027'],
  },
  EN: {
    sectionLabel: 'Every year, real work',
    heading: 'We build without stopping.',
    body: 'Since 2024, every expedition leaves a permanent physical improvement at Shariani. Classrooms, furniture, safety, hygiene and much more.',
    cta: 'Discover how we build',
    years: ['Furniture & Safety', 'Classrooms & Health', 'Mural & Skirts', 'June 2027'],
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

          {/* Right — organic photo collage */}
          <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center" aria-hidden="true">
            {/* Photo 1 — large, rounded rect, slight left tilt */}
            <div
              className="absolute w-[54%] aspect-[4/5] overflow-hidden shadow-xl"
              style={{
                borderRadius: '48% 52% 36% 64% / 40% 46% 54% 60%',
                top: '2%',
                left: '2%',
                transform: 'rotate(-3deg)',
                zIndex: 3,
                border: '3px solid var(--ivory)',
              }}
            >
              <Image
                src={images.heroSchool.src}
                alt={images.heroSchool.alt}
                fill
                sizes="(max-width: 1024px) 35vw, 22vw"
                className="object-cover"
              />
            </div>

            {/* Photo 2 — pill / tall rounded, right side */}
            <div
              className="absolute w-[40%] aspect-[3/4] overflow-hidden shadow-lg"
              style={{
                borderRadius: '50%',
                top: '8%',
                right: '3%',
                transform: 'rotate(4deg)',
                zIndex: 2,
                border: '3px solid var(--ivory)',
              }}
            >
              <Image
                src={images.classroom.src}
                alt={images.classroom.alt}
                fill
                sizes="(max-width: 1024px) 28vw, 17vw"
                className="object-cover"
              />
            </div>

            {/* Photo 3 — landscape, bottom left, pill */}
            <div
              className="absolute w-[52%] aspect-[16/9] overflow-hidden shadow-lg"
              style={{
                borderRadius: '40px',
                bottom: '4%',
                left: '0%',
                transform: 'rotate(2deg)',
                zIndex: 4,
                border: '3px solid var(--ivory)',
              }}
            >
              <Image
                src={images.fase3_1.src}
                alt={images.fase3_1.alt}
                fill
                sizes="(max-width: 1024px) 35vw, 22vw"
                className="object-cover"
              />
            </div>

            {/* Photo 4 — small square, bottom right */}
            <div
              className="absolute w-[32%] aspect-square overflow-hidden shadow-md"
              style={{
                borderRadius: '44% 56% 60% 40% / 50% 44% 56% 50%',
                bottom: '6%',
                right: '2%',
                transform: 'rotate(-5deg)',
                zIndex: 3,
                border: '3px solid var(--ivory)',
              }}
            >
              <Image
                src={images.fase1_1.src}
                alt={images.fase1_1.alt}
                fill
                sizes="(max-width: 1024px) 22vw, 14vw"
                className="object-cover"
              />
            </div>

            {/* Subtle dot grid backdrop */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage: 'radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)',
                backgroundSize: '16px 16px',
                zIndex: 1,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
