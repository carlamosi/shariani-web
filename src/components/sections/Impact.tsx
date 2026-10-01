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
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { images } from '@/data/images';

/*
 * Impact Section — «El Cuadro de Mando del Impacto: Parallax Horizontal»
 *
 * Experiencia inmersiva de scroll horizontal guiada por el scroll vertical en desktop,
 * con parallax multidimensional (desfase entre foto y tipografía) y adaptación
 * táctil nativa (touch-snap) en dispositivos móviles.
 *
 * Diseño editorial contemporáneo (inspiración: The New Yorker interactive / Monocle).
 */

interface MetricSlide {
  id: string;
  number: string;
  unit: string;
  category: string;
  title: string;
  headline: string;
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
    headline: 'Un pupitre propio y aulas con luz natural',
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
    headline: 'Aprender en paz sin intrusiones del exterior',
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
    headline: 'El dinero dinamiza la comunidad',
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
    headline: 'El 100% del fondo se traduce en obra',
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

  // Detección de viewport desktop vs móvil
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

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

          // Progreso de 0 a 1 normalizado
          const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1);
          setScrollProgress(progress);

          // Índice del slide activo (de 0 a SLIDES.length)
          const slideIndex = Math.min(
            Math.floor(progress * (SLIDES.length + 0.99)),
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

  // Navegación manual mediante botones
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

  // Cálculo de transformación horizontal en desktop
  // Máximo desplazamiento porcentual para recorrer todo el track
  const horizontalTranslate = isDesktop ? scrollProgress * -72 : 0;

  return (
    <section
      ref={containerRef}
      id="impacto"
      className="relative w-full bg-[var(--paper)] text-[var(--ink)] lg:h-[300vh]"
      aria-labelledby="impacto-heading"
    >
      {/* ── Contenedor Sticky para Desktop / Bloque Normal en Móvil ── */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col justify-between py-12 lg:py-10">
        
        {/* ── Cabecera Superior Fija con Control de Avance ── */}
        <div className="container-page mb-6 lg:mb-8 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--forest)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--forest)]" />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">
                  Evidencia y Auditoría de Impacto · 2024–2026
                </p>
              </div>

              <h2
                id="impacto-heading"
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] font-normal tracking-[-0.02em] leading-tight"
              >
                La certeza de lo que permanece sobre el terreno.
              </h2>
            </div>

            {/* Controles de Navegación y Progreso */}
            <div className="flex items-center gap-5 shrink-0">
              {/* Barra de progreso de micro-escala */}
              <div className="hidden sm:flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-[var(--text-secondary)]">
                  <span className="text-[var(--ink)] font-bold">0{activeSlide + 1}</span>
                  <span className="text-[var(--border)]">/</span>
                  <span>0{SLIDES.length}</span>
                </div>
                <div className="w-28 h-1 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--forest)] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${isDesktop ? Math.max((scrollProgress) * 100, 10) : ((activeSlide + 1) / SLIDES.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Botones de navegación prev/next */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToSlide(Math.max(activeSlide - 1, 0))}
                  disabled={activeSlide === 0}
                  className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--ivory)] flex items-center justify-center text-[var(--ink)] hover:border-[var(--forest)] hover:bg-[var(--paper)] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shadow-sm"
                  aria-label="Métrica anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSlide(Math.min(activeSlide + 1, SLIDES.length - 1))}
                  disabled={activeSlide === SLIDES.length - 1}
                  className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--ivory)] flex items-center justify-center text-[var(--ink)] hover:border-[var(--forest)] hover:bg-[var(--paper)] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shadow-sm"
                  aria-label="Siguiente métrica"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Track Horizontal con Parallax ── */}
        <div className="w-full overflow-hidden px-4 sm:px-6 lg:px-12">
          <div
            ref={trackRef}
            className="flex gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible scrollbar-none snap-x snap-mandatory lg:snap-none pb-4 lg:pb-0"
            style={{
              transform: isDesktop ? `translate3d(${horizontalTranslate}%, 0, 0)` : undefined,
              transition: isDesktop ? 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)' : undefined,
              willChange: isDesktop ? 'transform' : undefined,
            }}
          >
            {SLIDES.map((slide, idx) => {
              const Icon = slide.icon;
              // Cálculo de desplazamiento Parallax interno para cada foto
              const parallaxOffset = isDesktop ? (scrollProgress - idx / SLIDES.length) * 45 : 0;

              return (
                <div
                  key={slide.id}
                  className="metric-card shrink-0 w-[88vw] sm:w-[580px] lg:w-[680px] snap-center rounded-lg border border-[var(--border)] bg-[var(--ivory)] overflow-hidden shadow-[0_4px_24px_rgba(20,23,21,0.04)] group transition-all duration-300 hover:border-[var(--forest-mid)]"
                >
                  {/* Cuerpo Superior: Imagen con máscara y efecto Parallax */}
                  <div className="relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden bg-[var(--paper)]">
                    <div
                      className="absolute inset-0 w-[115%] h-full -left-[7.5%] transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{
                        transform: isDesktop ? `translate3d(${parallaxOffset}px, 0, 0)` : undefined,
                      }}
                    >
                      <Image
                        src={slide.imageSrc}
                        alt={slide.imageAlt}
                        fill
                        sizes="(max-width: 768px) 90vw, 680px"
                        className="object-cover filter contrast-[1.03] brightness-[0.98]"
                      />
                    </div>

                    {/* Gradiente sutil para legibilidad de los badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--ivory)] via-transparent to-black/25 pointer-events-none" />

                    {/* Badge de Categoría e Icono Flotante */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-[var(--ivory)]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--border)] shadow-xs">
                      <Icon className="w-3.5 h-3.5 text-[var(--forest)]" aria-hidden="true" />
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--ink)]">
                        {slide.category}
                      </span>
                    </div>

                    {/* Ubicación Geográfica en Terreno */}
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-[var(--ivory)] px-2.5 py-1 rounded-full text-[10.5px] font-mono tracking-wide">
                      {slide.location}
                    </div>

                    {/* Cifra Monumental Parallax integrada al corte */}
                    <div className="absolute bottom-2 left-6 sm:left-8 flex items-baseline gap-2.5">
                      <span
                        style={{ fontFamily: 'var(--font-editorial)' }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-none tracking-tight text-[var(--ink)] drop-shadow-xs"
                      >
                        {slide.number}
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--forest-mid)]">
                        {slide.unit}
                      </span>
                    </div>
                  </div>

                  {/* Cuerpo Inferior: Textos Editoriales y Rigor */}
                  <div className="p-6 sm:p-8 pt-4 flex flex-col justify-between min-h-[220px]">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[var(--forest-light)] font-medium mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[var(--amber)]" />
                        <span>{slide.headline}</span>
                      </div>

                      <h3
                        style={{ fontFamily: 'var(--font-editorial)' }}
                        className="text-xl sm:text-2xl text-[var(--ink)] font-normal leading-snug mb-3"
                      >
                        {slide.title}
                      </h3>

                      <p
                        style={{ fontFamily: 'var(--font-body)' }}
                        className="text-[13.5px] sm:text-[14px] leading-relaxed text-[var(--ink-muted)] line-clamp-3"
                      >
                        {slide.description}
                      </p>
                    </div>

                    {/* Footer de Auditoría de la Tarjeta */}
                    <div className="mt-6 pt-4 border-t border-[var(--border-light)] flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)]" />
                        {slide.auditTag}
                      </span>
                      <span className="text-[var(--forest)] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Fase consolidada <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── Slide Final de Llamada al Próximo Paso ── */}
            <div className="metric-card shrink-0 w-[88vw] sm:w-[480px] lg:w-[520px] snap-center rounded-lg border border-[var(--forest-mid)] bg-[var(--forest-dark)] text-[var(--ivory)] p-8 sm:p-10 flex flex-col justify-between shadow-lg">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-6">
                  Próximo Hito · Fase IV
                </span>

                <h3
                  style={{ fontFamily: 'var(--font-editorial)' }}
                  className="text-2xl sm:text-3xl text-[var(--ivory)] font-normal leading-tight mb-4"
                >
                  El impacto de 2026 lo defines tú.
                </h3>

                <p
                  style={{ fontFamily: 'var(--font-body)' }}
                  className="text-[14px] leading-relaxed text-[rgba(250,248,244,0.75)] mb-6"
                >
                  Cada euro aportado a través de Fundació Montblanc se destina al 100% a la compra de
                  materiales y a la contratación de carpinteros y albañiles locales en Kilifi.
                </p>

                <div className="p-4 rounded-md bg-[rgba(250,248,244,0.06)] border border-[rgba(250,248,244,0.1)] text-xs text-[rgba(250,248,244,0.8)] font-mono mb-6">
                  💡 Recuerda: los primeros 250 € desgravan el 80% en tu IRPF.
                </div>
              </div>

              <div>
                <a
                  href="#ayuda"
                  className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded bg-[var(--ivory)] text-[var(--forest-dark)] font-semibold text-sm hover:bg-emerald-100 transition-colors shadow-sm"
                >
                  <span>Calcular deducción y donar</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Pie del Módulo: Instrucción de Navegación Sutil ── */}
        <div className="container-page mt-6 lg:mt-8 shrink-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--text-secondary)] font-mono border-t border-[var(--border)] pt-3">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-3.5 h-3.5 text-[var(--forest)]" />
              <span>Desplaza en vertical para avanzar el recorrido horizontal</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Supervisado por Volunteer Connect Kenya</span>
              <span className="hidden sm:inline">·</span>
              <a
                href="https://www.fundaciomontblanc.org/index.php/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-[var(--forest)] hover:text-[var(--forest-dark)] font-medium"
              >
                Canalización fiscal Fundació Montblanc
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
