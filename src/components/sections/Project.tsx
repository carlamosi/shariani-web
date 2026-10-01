'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { images } from '@/data/images';

/*
 * Project Section: "Crónica de Obra" (Cinematic Documentary Archive)
 *
 * Each year (2024, 2025, 2026) is a chapter of transformation.
 * Features:
 * - Buttery-smooth subtle fade & lift transition between years.
 * - Minimalist, intuitive image carousel controls with sleek arrows & indicators.
 */

interface Milestone {
  year: string;
  phase: string;
  tag: string;
  title: string;
  headline: string;
  images: string[];
  imageAlts: string[];
  status: 'Completado' | 'En ejecución';
  story: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '2024',
    phase: 'Fase I · Junio 2024',
    tag: 'Aulas interiores',
    title: 'Transformar la penumbra en luz',
    headline: 'Pintura, acondicionamiento y primer puente con la comunidad',
    images: [images.fase1_1.src, images.fase1_2.src, images.fase1_3.src],
    imageAlts: [
      'Estudiantes y aulas de Shariani acondicionadas y pintadas (2024)',
      'Detalle del lijado y pintado interior de las aulas',
      'Resultado final de las aulas luminosas de primaria',
    ],
    status: 'Completado',
    story:
      'La primera expedición sobre el terreno no vino a imponer ideas desde fuera, sino a escuchar las prioridades del claustro de Shariani. Las aulas sufrían un desgaste extremo: paredes oscuras, falta de ventilación y suciedad acumulada que dificultaban concentrarse. Durante dos semanas intensivas, voluntarias y familias locales lijaron, sanearon y pintaron las aulas de primaria, devolviendo la claridad y la motivación a cientos de niños.',
  },
  {
    year: '2025',
    phase: 'Fase II · Junio 2025',
    tag: 'Mobiliario escolar',
    title: 'Ningún alumno más en el suelo',
    headline: 'Fabricación local de mesas y bancos para todas las aulas',
    images: [images.classroom.src, images.heroSchool.src],
    imageAlts: [
      'Alumnos de Shariani utilizando los nuevos pupitres de madera en el aula',
      'Vista general del patio y el edificio de Shariani Primary School',
    ],
    status: 'Completado',
    story:
      'Una de las realidades más duras al llegar a Shariani era ver a decenas de estudiantes sentados directamente sobre el suelo de tierra o compartiendo sillas rotas de tres en tres. Para la segunda expedición, nos negamos a comprar muebles importados: contratamos íntegramente a un taller de carpintería de Kilifi para fabricar mesas y bancos de madera maciza, garantizando que cada euro dinamizase la economía local.',
  },
  {
    year: '2026',
    phase: 'Fase III · Junio 2026',
    tag: 'Seguridad perimetral',
    title: 'Un refugio seguro para 1.700 niños',
    headline: 'Construcción del vallado perimetral exterior del colegio',
    images: [images.fase3_1.src, images.schoolBuilding.src],
    imageAlts: [
      'Muro perimetral de piedra construido alrededor de Shariani Primary School',
      'Edificio exterior protegido y perímetro de la escuela',
    ],
    status: 'Completado',
    story:
      'Shariani Primary School linda directamente con caminos rurales por donde transitan vehículos, ganado y personas ajenas al centro. La falta de un perímetro cerrado generaba constantes situaciones de riesgo y distracciones durante las clases. En esta expedición se levantó el muro perimetral de piedra de 300 metros con acceso controlado, garantizando la seguridad de los 1.700 estudiantes.',
  },
  {
    year: '2027',
    phase: 'Fase IV · Próxima expedición',
    tag: 'Lavabos y biblioteca',
    title: 'Higiene, agua y un espacio para aprender',
    headline: 'Construcción de aseos dignos y una biblioteca escolar con fondo propio',
    images: [images.schoolBuilding.src, images.classroom.src],
    imageAlts: [
      'Exteriores de Shariani donde se planifican los nuevos lavabos',
      'Espacio interior que acogerá la futura biblioteca de Shariani',
    ],
    status: 'En ejecución',
    story:
      'La cuarta expedición afronta dos carencias estructurales que llevan años en la lista de prioridades del claustro. Los aseos actuales son insuficientes y carecen de acceso a agua corriente, afectando especialmente a las niñas. Paralelamente, construiremos la primera biblioteca permanente del colegio: un espacio tranquilo, con fondo bibliográfico propio, donde los 1.700 estudiantes puedan leer y estudiar fuera del aula.',
  },
];

export function Project() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeMilestone = MILESTONES[activeIndex];

  // Subtle premium transition between years
  const changeYear = useCallback(
    (newIndex: number) => {
      if (newIndex === activeIndex || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(newIndex);
        setActiveImageIndex(0);
        setIsTransitioning(false);
      }, 200);
    },
    [activeIndex, isTransitioning]
  );

  const handlePrevYear = useCallback(() => {
    const nextIdx = activeIndex > 0 ? activeIndex - 1 : MILESTONES.length - 1;
    changeYear(nextIdx);
  }, [activeIndex, changeYear]);

  const handleNextYear = useCallback(() => {
    const nextIdx = activeIndex < MILESTONES.length - 1 ? activeIndex + 1 : 0;
    changeYear(nextIdx);
  }, [activeIndex, changeYear]);

  // Image carousel within current milestone
  const totalImages = activeMilestone.images.length;

  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
  }, [totalImages]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
  }, [totalImages]);

  // Keyboard navigation for year (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevYear();
      if (e.key === 'ArrowRight') handleNextYear();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevYear, handleNextYear]);

  return (
    <section
      id="proyecto"
      className="py-20 md:py-28 relative overflow-hidden text-[var(--ink)]"
      style={{ background: 'var(--paper)' }}
      aria-labelledby="cronica-heading"
    >
      {/* Anchor alias to ensure #shariani links work smoothly */}
      <div id="shariani" className="scroll-mt-24" aria-hidden="true" />

      <div className="container-page">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <h2
            id="cronica-heading"
            className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-[1.08] tracking-[-0.025em]"
            style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
          >
            Cada año, una obra real.<br />
            Construir sin detenernos.
          </h2>
        </div>

        {/* ── Year Selector Track (Filmstrip Navigation) ── */}
        <div className="border-b border-[var(--border)] pb-4 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Años del proyecto"
            className="flex items-center gap-2 sm:gap-6 flex-wrap"
          >
            {MILESTONES.map((m, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={m.year}
                  role="tab"
                  id={`milestone-tab-${m.year}`}
                  aria-selected={isActive}
                  aria-controls={`milestone-panel-${m.year}`}
                  onClick={() => changeYear(idx)}
                  className={`flex items-baseline gap-2.5 py-2 px-3 rounded transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[var(--forest)] text-[var(--ivory)] shadow-sm'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--ivory)]'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <span className="font-mono text-lg sm:text-xl font-bold tracking-tight">
                    {m.year}
                  </span>
                  <span className="text-xs font-medium opacity-85 hidden sm:inline">
                    · {m.tag}
                  </span>
                  {m.status === 'En ejecución' && (
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded ml-1 ${
                        isActive
                          ? 'bg-amber-400 text-amber-950'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      En marcha
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handlePrevYear}
              aria-label="Ver año anterior"
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--forest)] hover:bg-white transition-all cursor-pointer"
            >
              <ArrowLeft size={15} strokeWidth={2} />
            </button>
            <button
              onClick={handleNextYear}
              aria-label="Ver siguiente año"
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--forest)] hover:bg-white transition-all cursor-pointer"
            >
              <ArrowRight size={15} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* ── Cinematic Split Stage with subtle, premium transition ── */}
        <div
          id={`milestone-panel-${activeMilestone.year}`}
          role="tabpanel"
          aria-labelledby={`milestone-tab-${activeMilestone.year}`}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start transition-all duration-300 ease-out ${
            isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Left Column: Image carousel (7 cols) */}
          <div className="lg:col-span-7">
            {/* Image container */}
            <div className="group relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-sm overflow-hidden bg-[var(--border)] shadow-md border border-[var(--border)]">
              {activeMilestone.images.map((src, imgIdx) => (
                <div
                  key={imgIdx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    activeImageIndex === imgIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <Image
                    src={src}
                    alt={activeMilestone.imageAlts[imgIdx]}
                    fill
                    priority={imgIdx === 0 && activeIndex === 0}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
              ))}

              {/* Status badge */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5">
                {activeMilestone.status === 'Completado' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-body font-semibold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded backdrop-blur-xs">
                    <CheckCircle2 size={11} strokeWidth={2.5} /> Obra concluida
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-body font-semibold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded backdrop-blur-xs">
                    <Clock size={11} strokeWidth={2.5} /> En construcción
                  </span>
                )}
              </div>

              {/* Minimalist carousel navigation arrows */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label="Imagen anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/75 text-white/85 hover:text-white backdrop-blur-xs border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 opacity-80 group-hover:opacity-100"
                  >
                    <ChevronLeft size={16} strokeWidth={2.2} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label="Siguiente imagen"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/75 text-white/85 hover:text-white backdrop-blur-xs border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 opacity-80 group-hover:opacity-100"
                  >
                    <ChevronRight size={16} strokeWidth={2.2} />
                  </button>
                </>
              )}

              {/* Minimalist dots + index pill at bottom-left */}
              {totalImages > 1 && (
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center gap-2 bg-black/35 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                  <div className="flex items-center gap-1.5">
                    {activeMilestone.images.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setActiveImageIndex(dotIdx)}
                        aria-label={`Ver foto ${dotIdx + 1} de ${totalImages}`}
                        className="transition-all duration-300 rounded-full focus:outline-none cursor-pointer"
                        style={{
                          width: activeImageIndex === dotIdx ? '16px' : '5px',
                          height: '5px',
                          background:
                            activeImageIndex === dotIdx
                              ? 'var(--ivory)'
                              : 'rgba(250,248,244,0.4)',
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-white/75 select-none pl-0.5">
                    {activeImageIndex + 1}/{totalImages}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Narrative (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--forest)] font-bold">
                  {activeMilestone.phase}
                </span>
                <span className="text-[var(--text-secondary)] font-body text-xs">·</span>
                <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-body font-semibold">
                  {activeMilestone.tag}
                </span>
              </div>

              <h3
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-2xl sm:text-3xl text-[var(--ink)] leading-snug tracking-[-0.015em] mb-2 font-normal"
              >
                {activeMilestone.title}
              </h3>

              <p
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-sm font-medium text-[var(--forest-mid)] mb-4 italic"
              >
                {activeMilestone.headline}
              </p>

              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-[14.5px] leading-relaxed text-[var(--ink-muted)] mb-6"
              >
                {activeMilestone.story}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
