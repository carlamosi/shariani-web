'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { images } from '@/data/images';
import { useLang } from '@/context/LangContext';

const YEARS = ['2024', '2025', '2026', '2027'];

const MILESTONE_IMAGES = [
  { imgs: [images.fase1_1.src, images.fase1_2.src, images.fase1_3.src], alts: ['Estudiants i aules de Shariani condicionades i pintades (2024)', 'Detall del llimat i pintat interior de les aules', 'Resultat final de les aules lluminoses de primària'] },
  { imgs: [images.classroom.src, images.heroSchool.src], alts: ['Alumnes de Shariani fent servir els nous pupitres de fusta a l\'aula', 'Vista general del pati i l\'edifici de Shariani Primary School'] },
  { imgs: [images.fase3_1.src, images.schoolBuilding.src], alts: ['Mur perimetral de pedra construït al voltant de Shariani Primary School', 'Edifici exterior protegit i perímetre de l\'escola'] },
  { imgs: [images.schoolBuilding.src, images.classroom.src], alts: ['Exteriors de Shariani on es planifiquen els nous lavabos', 'Espai interior que acollirà la futura biblioteca de Shariani'] },
];

export function Project() {
  const { tr } = useLang();
  const milestones = tr.project.milestones;

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeMilestone = milestones[activeIndex];
  const activeImages = MILESTONE_IMAGES[activeIndex];
  const totalImages = activeImages.imgs.length;

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
    changeYear(activeIndex > 0 ? activeIndex - 1 : milestones.length - 1);
  }, [activeIndex, changeYear, milestones.length]);

  const handleNextYear = useCallback(() => {
    changeYear(activeIndex < milestones.length - 1 ? activeIndex + 1 : 0);
  }, [activeIndex, changeYear, milestones.length]);

  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
  }, [totalImages]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
  }, [totalImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevYear();
      if (e.key === 'ArrowRight') handleNextYear();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevYear, handleNextYear]);

  const isCompleted = activeIndex < milestones.length - 1;

  return (
    <section
      id="proyecto"
      className="py-20 md:py-28 relative overflow-hidden text-[var(--ink)]"
      style={{ background: 'var(--paper)' }}
      aria-labelledby="cronica-heading"
    >
      <div id="shariani" className="scroll-mt-24" aria-hidden="true" />

      <div className="container-page">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <h2
            id="cronica-heading"
            className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-[1.08] tracking-[-0.025em]"
            style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
          >
            {tr.project.sectionHeading1}<br />
            {tr.project.sectionHeading2}
          </h2>
        </div>

        {/* Year Selector Track */}
        <div className="border-b border-[var(--border)] pb-4 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label={tr.project.tabsAriaLabel}
            className="flex items-center gap-2 sm:gap-6 flex-wrap"
          >
            {milestones.map((m, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={YEARS[idx]}
                  role="tab"
                  id={`milestone-tab-${YEARS[idx]}`}
                  aria-selected={isActive}
                  aria-controls={`milestone-panel-${YEARS[idx]}`}
                  onClick={() => changeYear(idx)}
                  className={`flex items-baseline gap-2.5 py-2 px-3 rounded transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[var(--forest)] text-[var(--ivory)] shadow-sm'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--ivory)]'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <span className="font-mono text-lg sm:text-xl font-bold tracking-tight">
                    {YEARS[idx]}
                  </span>
                  <span className="text-xs font-medium opacity-85 hidden sm:inline">
                    · {m.tag}
                  </span>
                  {idx === milestones.length - 1 && (
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded ml-1 ${
                        isActive
                          ? 'bg-amber-400 text-amber-950'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {tr.project.inProgress}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handlePrevYear}
              aria-label={tr.project.prevYear}
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--forest)] hover:bg-white transition-all cursor-pointer"
            >
              <ArrowLeft size={15} strokeWidth={2} />
            </button>
            <button
              onClick={handleNextYear}
              aria-label={tr.project.nextYear}
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--forest)] hover:bg-white transition-all cursor-pointer"
            >
              <ArrowRight size={15} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Cinematic Split Stage */}
        <div
          id={`milestone-panel-${YEARS[activeIndex]}`}
          role="tabpanel"
          aria-labelledby={`milestone-tab-${YEARS[activeIndex]}`}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start transition-all duration-300 ease-out ${
            isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Left Column: Image carousel */}
          <div className="lg:col-span-7">
            <div className="group relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-sm overflow-hidden bg-[var(--border)] shadow-md border border-[var(--border)]">
              {activeImages.imgs.map((src, imgIdx) => (
                <div
                  key={imgIdx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    activeImageIndex === imgIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <Image
                    src={src}
                    alt={activeImages.alts[imgIdx]}
                    fill
                    priority={imgIdx === 0 && activeIndex === 0}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
              ))}

              {/* Status badge */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5">
                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-body font-semibold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded backdrop-blur-xs">
                    <CheckCircle2 size={11} strokeWidth={2.5} /> {tr.project.statusDone}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-body font-semibold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded backdrop-blur-xs">
                    <Clock size={11} strokeWidth={2.5} /> {tr.project.statusInProgress}
                  </span>
                )}
              </div>

              {totalImages > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label={tr.project.prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/75 text-white/85 hover:text-white backdrop-blur-xs border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 opacity-80 group-hover:opacity-100"
                  >
                    <ChevronLeft size={16} strokeWidth={2.2} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label={tr.project.nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/75 text-white/85 hover:text-white backdrop-blur-xs border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 opacity-80 group-hover:opacity-100"
                  >
                    <ChevronRight size={16} strokeWidth={2.2} />
                  </button>
                </>
              )}

              {totalImages > 1 && (
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center gap-2 bg-black/35 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                  <div className="flex items-center gap-1.5">
                    {activeImages.imgs.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setActiveImageIndex(dotIdx)}
                        aria-label={tr.project.viewPhoto(dotIdx + 1, totalImages)}
                        className="transition-all duration-300 rounded-full focus:outline-none cursor-pointer"
                        style={{
                          width: activeImageIndex === dotIdx ? '16px' : '5px',
                          height: '5px',
                          background: activeImageIndex === dotIdx ? 'var(--ivory)' : 'rgba(250,248,244,0.4)',
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

          {/* Right Column: Narrative */}
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
