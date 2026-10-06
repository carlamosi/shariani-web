'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  GraduationCap,
  ShieldCheck,
  Hammer,
  Scale,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { images } from '@/data/images';
import { useLang } from '@/context/LangContext';

const SLIDE_ICONS = [GraduationCap, ShieldCheck, Hammer, Scale];
const SLIDE_NUMBERS = ['1.700', '300', '100%', '0 €'];
const SLIDE_IMAGES = [
  { src: images.classroom.src, alt: 'Estudiants a les aules condicionades de Shariani' },
  { src: images.fase3_1.src, alt: 'Mur de pedra i tancament perimetral de Shariani' },
  { src: images.colaborarOngs.src, alt: "Equip i col·laboradors locals a Kilifi" },
  { src: images.heroSchool.src, alt: 'Pati i comunitat de Shariani Primary School' },
];

export function Impact() {
  const { tr } = useLang();
  const slides = tr.impact.slides;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);

  const calculateMetrics = useCallback(() => {
    const desktopMode = window.innerWidth >= 1024;
    setIsDesktop(desktopMode);
    if (trackRef.current && desktopMode) {
      const distance = Math.max(trackRef.current.scrollWidth - window.innerWidth + 80, 0);
      setMaxScrollDistance(distance);
    }
  }, []);

  useEffect(() => {
    calculateMetrics();
    window.addEventListener('resize', calculateMetrics);
    return () => window.removeEventListener('resize', calculateMetrics);
  }, [calculateMetrics]);

  useEffect(() => {
    if (!isDesktop) return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScroll = rect.height - window.innerHeight;
          if (totalScroll <= 0) return;
          const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1);
          setScrollProgress(progress);
          setActiveSlide(Math.min(Math.floor(progress * (slides.length + 0.9)), slides.length - 1));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop, slides.length]);

  const scrollToSlide = useCallback((index: number) => {
    if (isDesktop && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      const targetScrollTop = window.scrollY + rect.top + (index / slides.length) * totalScroll;
      window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    } else if (trackRef.current) {
      const slideElements = trackRef.current.querySelectorAll('.metric-card');
      if (slideElements[index]) {
        slideElements[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      }
    }
  }, [isDesktop, slides.length]);

  const horizontalTranslatePx = isDesktop ? -scrollProgress * maxScrollDistance : 0;

  return (
    <section
      ref={containerRef}
      id="impacto"
      className="relative w-full bg-[var(--paper)] text-[var(--ink)] lg:h-[280vh]"
      aria-labelledby="impacto-heading"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col justify-center py-10 lg:py-6">

        {/* Header */}
        <div className="container-page mb-5 lg:mb-6 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-3.5">
            <div>
              <p className="section-label mb-3">{tr.impact.sectionLabel}</p>
              <h2
                id="impacto-heading"
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-2xl sm:text-3xl lg:text-3.5xl text-[var(--ink)] font-normal tracking-[-0.02em] leading-tight"
              >
                {tr.impact.heading}
              </h2>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden sm:flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--text-secondary)]">
                  <span className="text-[var(--ink)] font-bold">0{activeSlide + 1}</span>
                  <span className="text-[var(--border)]">/</span>
                  <span>0{slides.length}</span>
                </div>
                <div className="w-24 h-1 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--forest)] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${isDesktop ? Math.max(scrollProgress * 100, 10) : ((activeSlide + 1) / slides.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToSlide(Math.max(activeSlide - 1, 0))}
                  disabled={activeSlide === 0}
                  className="w-8.5 h-8.5 rounded-full border border-[var(--border)] bg-[var(--ivory)] flex items-center justify-center text-[var(--ink)] hover:border-[var(--forest)] hover:bg-[var(--paper)] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shadow-xs"
                  aria-label={tr.impact.prevMetric}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSlide(Math.min(activeSlide + 1, slides.length - 1))}
                  disabled={activeSlide === slides.length - 1}
                  className="w-8.5 h-8.5 rounded-full border border-[var(--border)] bg-[var(--ivory)] flex items-center justify-center text-[var(--ink)] hover:border-[var(--forest)] hover:bg-[var(--paper)] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shadow-xs"
                  aria-label={tr.impact.nextMetric}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Track */}
        <div className="w-full overflow-hidden px-4 sm:px-6 lg:px-12 py-2">
          <div
            ref={trackRef}
            className="flex gap-5 sm:gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible scrollbar-none snap-x snap-mandatory lg:snap-none items-stretch"
            style={{
              transform: isDesktop ? `translate3d(${horizontalTranslatePx}px, 0, 0)` : undefined,
              transition: isDesktop ? 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)' : undefined,
              willChange: isDesktop ? 'transform' : undefined,
            }}
          >
            {slides.map((slide, idx) => {
              const Icon = SLIDE_ICONS[idx];
              const parallaxOffset = isDesktop ? (scrollProgress - idx / slides.length) * 35 : 0;
              return (
                <div
                  key={idx}
                  className="metric-card shrink-0 w-[86vw] sm:w-[500px] lg:w-[560px] snap-center rounded-lg border border-[var(--border)] bg-[var(--ivory)] overflow-hidden shadow-[0_4px_20px_rgba(20,23,21,0.05)] group transition-all duration-300 hover:border-[var(--forest-mid)] flex flex-col justify-between"
                >
                  <div className="relative h-40 sm:h-44 lg:h-48 w-full overflow-hidden bg-[var(--paper)]">
                    <div
                      className="absolute inset-0 w-[112%] h-full -left-[6%] transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ transform: isDesktop ? `translate3d(${parallaxOffset}px, 0, 0)` : undefined }}
                    >
                      <Image
                        src={SLIDE_IMAGES[idx].src}
                        alt={SLIDE_IMAGES[idx].alt}
                        fill
                        sizes="(max-width: 768px) 86vw, 560px"
                        className="object-cover filter contrast-[1.02] brightness-[0.98]"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--ivory)] via-transparent to-black/25 pointer-events-none" />

                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 bg-[var(--ivory)]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--border)] shadow-2xs">
                      <Icon className="w-3.5 h-3.5 text-[var(--forest)]" aria-hidden="true" />
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[var(--ink)]">
                        {slide.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/45 backdrop-blur-md text-[var(--ivory)] px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide">
                      {slide.location}
                    </div>
                    <div className="absolute bottom-1.5 left-5 sm:left-6 flex items-baseline gap-2">
                      <span style={{ fontFamily: 'var(--font-editorial)' }} className="text-4xl sm:text-5xl font-normal leading-none tracking-tight text-[var(--ink)] drop-shadow-2xs">
                        {SLIDE_NUMBERS[idx]}
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--forest-mid)]">
                        {slide.unit}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-3 flex flex-col justify-between flex-1">
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-editorial)' }} className="text-lg sm:text-xl text-[var(--ink)] font-normal leading-snug mb-2">
                        {slide.title}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)' }} className="text-[13px] sm:text-[13.5px] leading-relaxed text-[var(--ink-muted)]">
                        {slide.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-light)] flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--text-secondary)] flex items-center gap-1.5 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)]" />
                        {slide.auditTag}
                      </span>
                      <span className="text-[var(--forest)] font-semibold flex items-center gap-1 text-[11.5px] group-hover:translate-x-1 transition-transform">
                        {tr.impact.consolidated} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA Slide */}
            <div className="metric-card shrink-0 w-[86vw] sm:w-[420px] lg:w-[460px] snap-center rounded-lg border border-[var(--forest-mid)] bg-[var(--forest-dark)] text-[var(--ivory)] p-6 sm:p-7 flex flex-col justify-between shadow-lg">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 font-mono text-[10.5px] font-bold uppercase tracking-wider text-emerald-300 mb-4">
                  {tr.impact.nextMilestoneTag}
                </span>
                <h3 style={{ fontFamily: 'var(--font-editorial)' }} className="text-xl sm:text-2xl text-[var(--ivory)] font-normal leading-tight mb-3">
                  {tr.impact.nextMilestoneHeading}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)' }} className="text-[13px] sm:text-[13.5px] leading-relaxed text-[rgba(250,248,244,0.75)] mb-4">
                  {tr.impact.nextMilestoneBody}
                </p>
                <div className="p-3 rounded bg-[rgba(250,248,244,0.06)] border border-[rgba(250,248,244,0.1)] text-xs text-[rgba(250,248,244,0.8)] font-mono mb-4">
                  {tr.impact.taxNote}
                </div>
              </div>
              <div>
                <a
                  href="#ayuda"
                  className="inline-flex items-center justify-between w-full px-4 py-3 rounded bg-[var(--ivory)] text-[var(--forest-dark)] font-semibold text-xs sm:text-sm hover:bg-emerald-100 transition-colors shadow-xs"
                >
                  <span>{tr.impact.ctaDonate}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="w-4 shrink-0 lg:hidden" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
