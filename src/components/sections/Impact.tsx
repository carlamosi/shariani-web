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

/*
 * Impact Section — «El Cuadro de Mando del Impacto: Parallax Horizontal»
 *
 * Experiencia inmersiva con scroll horizontal guiado por el scroll vertical en desktop,
 * profundidad visual en fotos y adaptación táctil nativa en móvil.
 * Tarjetas con dimensiones estrictamente calibradas para evitar cualquier corte vertical u horizontal.
 */

interface MetricSlide {
  id: string;
  number: string;
  unit: string;
  category: string;
  title: string;
  description: string;
  auditTag: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ElementType;
}

const SLIDES: MetricSlide[] = [
  {
    id: '01',
    number: '1.700',
    unit: 'alumnos',
    category: 'Dignidad Escolar',
    title: 'Fin del suelo de tierra y la masificación',
    description:
      'Aulas saneadas, ventiladas e iluminadas que devuelven la dignidad al aprendizaje diario. El 100% de los niños y niñas de primaria cuentan hoy con espacio personal donde sentarse y escribir.',
    auditTag: 'Censo escolar en activo',
    location: 'Aulas de Primaria · Shariani',
    imageSrc: images.classroom.src,
    imageAlt: 'Estudiantes en las aulas acondicionadas de Shariani',
    icon: GraduationCap,
  },
  {
    id: '02',
    number: '300',
    unit: 'metros',
    category: 'Seguridad Integral',
    title: 'Perímetro protegido de piedra y acceso controlado',
    description:
      'Construcción civil culminada en 2026. El cerramiento continuo protege a los menores frente al paso peligroso de vehículos rurales, ganado y personas ajenas a la institución escolar.',
    auditTag: 'Obra civil entregada',
    location: 'Perímetro escolar · Kilifi County',
    imageSrc: images.fase3_1.src,
    imageAlt: 'Muro de piedra y cerramiento perimetral de Shariani',
    icon: ShieldCheck,
  },
  {
    id: '03',
    number: '100%',
    unit: 'economía local',
    category: 'Desarrollo en Origen',
    title: 'Cero importaciones: empleo y compras en Kilifi',
    description:
      'Cada pupitre fue fabricado por un taller de carpintería local de Kilifi y cada tramo de muro lo levantaron albañiles de la zona. Se remunera con salario justo, convirtiendo la ayuda en capacidad propia.',
    auditTag: 'Impacto socioeconómico directo',
    location: 'Talleres de Kilifi · Kenia',
    imageSrc: images.colaborarOngs.src,
    imageAlt: 'Equipo y colaboradores locales en Kilifi',
    icon: Hammer,
  },
  {
    id: '04',
    number: '0 €',
    unit: 'intermediarios',
    category: 'Transparencia Radical',
    title: 'Estructura directa sin gastos diluidos',
    description:
      'Las voluntarias de La Vall costean personalmente sus billetes de avión, visados y manutención. Las donaciones se canalizan íntegramente a materiales de construcción y mano de obra a través de Fundació Montblanc.',
    auditTag: 'Canal oficial Fundació Montblanc',
    location: 'Alianza Barcelona — Nairobi',
    imageSrc: images.heroSchool.src,
    imageAlt: 'Patio y comunidad de Shariani Primary School',
    icon: Scale,
  },
];

export function Impact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);

  // Medir distancias reales para que el desplazamiento horizontal sea exacto sin cortar tarjetas
  const calculateMetrics = useCallback(() => {
    const desktopMode = window.innerWidth >= 1024;
    setIsDesktop(desktopMode);

    if (trackRef.current && desktopMode) {
      const scrollWidth = trackRef.current.scrollWidth;
      const clientWidth = window.innerWidth;
      // Margen de seguridad para que la última tarjeta respire holgadamente en el borde derecho
      const distance = Math.max(scrollWidth - clientWidth + 80, 0);
      setMaxScrollDistance(distance);
    }
  }, []);

  useEffect(() => {
    calculateMetrics();
    window.addEventListener('resize', calculateMetrics);
    return () => window.removeEventListener('resize', calculateMetrics);
  }, [calculateMetrics]);

  // Parallax Scroll Listener para Desktop
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

          // Progreso normalizado de 0 a 1
          const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1);
          setScrollProgress(progress);

          // Índice del slide activo
          const slideIndex = Math.min(
            Math.floor(progress * (SLIDES.length + 0.9)),
            SLIDES.length - 1
          );
          setActiveSlide(slideIndex);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  // Navegación mediante botones prev/next
  const scrollToSlide = useCallback((index: number) => {
    if (isDesktop && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      const targetProgress = index / (SLIDES.length);
      const targetScrollTop = window.scrollY + rect.top + targetProgress * totalScroll;
      window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    } else if (trackRef.current) {
      const slideElements = trackRef.current.querySelectorAll('.metric-card');
      if (slideElements[index]) {
        slideElements[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      }
    }
  }, [isDesktop]);

  // Cálculo en píxeles exactos del desplazamiento horizontal en desktop
  const horizontalTranslatePx = isDesktop ? -scrollProgress * maxScrollDistance : 0;

  return (
    <section
      ref={containerRef}
      id="impacto"
      className="relative w-full bg-[var(--paper)] text-[var(--ink)] lg:h-[280vh]"
      aria-labelledby="impacto-heading"
    >
      {/* ── Contenedor Sticky en Desktop (centrado vertical para evitar cortes) ── */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col justify-center py-10 lg:py-6">
        
        {/* ── Cabecera Superior con Control de Avance ── */}
        <div className="container-page mb-5 lg:mb-6 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-3.5">
            <div>
              <p className="section-label mb-3">Impacto verificado · 2024–2026</p>
              <h2
                id="impacto-heading"
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-2xl sm:text-3xl lg:text-3.5xl text-[var(--ink)] font-normal tracking-[-0.02em] leading-tight"
              >
                La certeza de lo que permanece sobre el terreno.
              </h2>
            </div>

            {/* Controles de Navegación y Progreso */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Barra de progreso de micro-escala */}
              <div className="hidden sm:flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--text-secondary)]">
                  <span className="text-[var(--ink)] font-bold">0{activeSlide + 1}</span>
                  <span className="text-[var(--border)]">/</span>
                  <span>0{SLIDES.length}</span>
                </div>
                <div className="w-24 h-1 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--forest)] rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${isDesktop ? Math.max(scrollProgress * 100, 10) : ((activeSlide + 1) / SLIDES.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Botones de navegación prev/next */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToSlide(Math.max(activeSlide - 1, 0))}
                  disabled={activeSlide === 0}
                  className="w-8.5 h-8.5 rounded-full border border-[var(--border)] bg-[var(--ivory)] flex items-center justify-center text-[var(--ink)] hover:border-[var(--forest)] hover:bg-[var(--paper)] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shadow-xs"
                  aria-label="Métrica anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSlide(Math.min(activeSlide + 1, SLIDES.length - 1))}
                  disabled={activeSlide === SLIDES.length - 1}
                  className="w-8.5 h-8.5 rounded-full border border-[var(--border)] bg-[var(--ivory)] flex items-center justify-center text-[var(--ink)] hover:border-[var(--forest)] hover:bg-[var(--paper)] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shadow-xs"
                  aria-label="Siguiente métrica"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Track Horizontal con Parallax (con py para asegurar visibilidad total de bordes y sombras) ── */}
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
            {SLIDES.map((slide, idx) => {
              const Icon = slide.icon;
              const parallaxOffset = isDesktop ? (scrollProgress - idx / SLIDES.length) * 35 : 0;

              return (
                <div
                  key={slide.id}
                  className="metric-card shrink-0 w-[86vw] sm:w-[500px] lg:w-[560px] snap-center rounded-lg border border-[var(--border)] bg-[var(--ivory)] overflow-hidden shadow-[0_4px_20px_rgba(20,23,21,0.05)] group transition-all duration-300 hover:border-[var(--forest-mid)] flex flex-col justify-between"
                >
                  {/* Cuerpo Superior: Imagen con máscara y Parallax (altura calibrada para no desbordar) */}
                  <div className="relative h-40 sm:h-44 lg:h-48 w-full overflow-hidden bg-[var(--paper)]">
                    <div
                      className="absolute inset-0 w-[112%] h-full -left-[6%] transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{
                        transform: isDesktop ? `translate3d(${parallaxOffset}px, 0, 0)` : undefined,
                      }}
                    >
                      <Image
                        src={slide.imageSrc}
                        alt={slide.imageAlt}
                        fill
                        sizes="(max-width: 768px) 86vw, 560px"
                        className="object-cover filter contrast-[1.02] brightness-[0.98]"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--ivory)] via-transparent to-black/25 pointer-events-none" />

                    {/* Badge de Categoría e Icono */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 bg-[var(--ivory)]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--border)] shadow-2xs">
                      <Icon className="w-3.5 h-3.5 text-[var(--forest)]" aria-hidden="true" />
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[var(--ink)]">
                        {slide.category}
                      </span>
                    </div>

                    {/* Ubicación Geográfica */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/45 backdrop-blur-md text-[var(--ivory)] px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide">
                      {slide.location}
                    </div>

                    {/* Cifra Monumental */}
                    <div className="absolute bottom-1.5 left-5 sm:left-6 flex items-baseline gap-2">
                      <span
                        style={{ fontFamily: 'var(--font-editorial)' }}
                        className="text-4xl sm:text-5xl font-normal leading-none tracking-tight text-[var(--ink)] drop-shadow-2xs"
                      >
                        {slide.number}
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--forest-mid)]">
                        {slide.unit}
                      </span>
                    </div>
                  </div>

                  {/* Cuerpo Inferior: Textos y Cierre de Auditoría */}
                  <div className="p-5 sm:p-6 pt-3 flex flex-col justify-between flex-1">
                    <div>
                      <h3
                        style={{ fontFamily: 'var(--font-editorial)' }}
                        className="text-lg sm:text-xl text-[var(--ink)] font-normal leading-snug mb-2"
                      >
                        {slide.title}
                      </h3>

                      <p
                        style={{ fontFamily: 'var(--font-body)' }}
                        className="text-[13px] sm:text-[13.5px] leading-relaxed text-[var(--ink-muted)]"
                      >
                        {slide.description}
                      </p>
                    </div>

                    {/* Footer de Auditoría */}
                    <div className="mt-4 pt-3 border-t border-[var(--border-light)] flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--text-secondary)] flex items-center gap-1.5 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)]" />
                        {slide.auditTag}
                      </span>
                      <span className="text-[var(--forest)] font-semibold flex items-center gap-1 text-[11.5px] group-hover:translate-x-1 transition-transform">
                        Fase consolidada <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── Slide Final de Conversión (Perfectamente calibrado) ── */}
            <div className="metric-card shrink-0 w-[86vw] sm:w-[420px] lg:w-[460px] snap-center rounded-lg border border-[var(--forest-mid)] bg-[var(--forest-dark)] text-[var(--ivory)] p-6 sm:p-7 flex flex-col justify-between shadow-lg">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 font-mono text-[10.5px] font-bold uppercase tracking-wider text-emerald-300 mb-4">
                  Próximo Hito · Fase IV
                </span>

                <h3
                  style={{ fontFamily: 'var(--font-editorial)' }}
                  className="text-xl sm:text-2xl text-[var(--ivory)] font-normal leading-tight mb-3"
                >
                  El impacto de 2026 lo defines tú.
                </h3>

                <p
                  style={{ fontFamily: 'var(--font-body)' }}
                  className="text-[13px] sm:text-[13.5px] leading-relaxed text-[rgba(250,248,244,0.75)] mb-4"
                >
                  Cada euro aportado a través de Fundació Montblanc se destina al 100% a la compra de
                  materiales y a la contratación de carpinteros y albañiles locales en Kilifi.
                </p>

                <div className="p-3 rounded bg-[rgba(250,248,244,0.06)] border border-[rgba(250,248,244,0.1)] text-xs text-[rgba(250,248,244,0.8)] font-mono mb-4">
                  💡 Recuerda: los primeros 250 € desgravan el 80% en tu IRPF.
                </div>
              </div>

              <div>
                <a
                  href="#ayuda"
                  className="inline-flex items-center justify-between w-full px-4 py-3 rounded bg-[var(--ivory)] text-[var(--forest-dark)] font-semibold text-xs sm:text-sm hover:bg-emerald-100 transition-colors shadow-xs"
                >
                  <span>Calcular deducción y donar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Espaciador final para asegurar margen derecho fluido en móvil */}
            <div className="w-4 shrink-0 lg:hidden" aria-hidden="true" />
          </div>
        </div>

      </div>
    </section>
  );
}
