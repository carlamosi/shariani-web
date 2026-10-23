'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { t } from '@/data/translations';
import { images } from '@/data/images';

/* ─────────────────────────────────────────────────────────────
   Photo mapping per milestone across all five years (2023–2027)
   2023: colaborarOngs (initial dialogue and listening with community)
   2024: mesas (wooden desks & chairs built by local carpenters)
   2025: higieneBucal (oral hygiene workshops and classroom painting)
   2026: ninaFalda (300 school skirts project & entrance mural)
   2027: valla (school grounds where well & safe water system are planned)
   ───────────────────────────────────────────────────────────── */
const YEAR_PHOTOS = [
  { img: images.colaborarOngs, isFirst: true,  alt: 'Reunión y escucha activa con docentes y familias de Shariani en 2023' },
  { img: images.mesas,         isFirst: false, alt: 'Pupitres y mesas de madera construidos con carpinteros locales en 2024' },
  { img: images.higieneBucal,  isFirst: false, alt: 'Talleres prácticos de higiene bucodental y aulas restauradas en 2025' },
  { img: images.ninaFalda,     isFirst: false, alt: 'Alumna con falda escolar confeccionada en el proyecto de 300 faldas en 2026' },
  { img: images.valla,         isFirst: false, alt: 'Recinto e instalaciones de Shariani donde se proyecta el pozo y sistema de agua para 2027' },
];

/* ─────────────────────────────────────────────────────────────
   useReducedMotion hook
   ───────────────────────────────────────────────────────────── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* ─────────────────────────────────────────────────────────────
   useInView hook — triggers once at 15% visibility
   ───────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────────────────────
   ThreadLine — vertical progress line through the milestones
   Progresses with scroll via stroke-dashoffset.
   Completed milestones (2023–2026, 80% of track) draw with solid/stitched
   accent; the final segment into 2027 uses a subtle dashed pattern.
   ───────────────────────────────────────────────────────────── */
function ThreadLine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const sewnLineRef = useRef<SVGLineElement>(null);
  const futureLineRef = useRef<SVGLineElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    const sewnLine = sewnLineRef.current;
    const futureLine = futureLineRef.current;
    const container = containerRef.current;
    if (!svg || !sewnLine || !futureLine || !container) return;

    const onScroll = () => {
      const totalH = container.scrollHeight;
      svg.setAttribute('height', String(totalH));

      // 4 completed years (2023–2026) out of 5 total milestones = 80%
      const completedH = totalH * 0.8;
      futureLine.setAttribute('y1', String(completedH));
      futureLine.setAttribute('y2', String(totalH));

      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + totalH * 0.8)));
      const drawn = Math.min(progress * completedH, completedH);

      sewnLine.setAttribute('y2', String(completedH));
      sewnLine.setAttribute('stroke-dasharray', String(completedH));
      sewnLine.setAttribute('stroke-dashoffset', String(completedH - drawn));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced, containerRef]);

  if (reduced) {
    return (
      <div
        aria-hidden="true"
        className="absolute left-[14px] sm:left-[21px] md:left-[25px] top-6 bottom-6 w-px bg-[var(--forest)] opacity-35"
      />
    );
  }

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="absolute left-[14px] sm:left-[21px] md:left-[25px] top-0 pointer-events-none overflow-visible"
      width="1"
      height="100%"
    >
      {/* Background guide rail */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="100%"
        stroke="var(--border)"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.6"
      />

      {/* Sewn thread for completed journeys */}
      <line
        ref={sewnLineRef}
        x1="0"
        y1="0"
        x2="0"
        y2="0"
        stroke="var(--forest)"
        strokeWidth="2"
        strokeDasharray="6 4"
        strokeLinecap="round"
        strokeDashoffset="9999"
      />

      {/* Future segment (2027): quiet dashed line */}
      <line
        ref={futureLineRef}
        x1="0"
        y1="0"
        x2="0"
        y2="0"
        stroke="var(--forest)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   ThreeStepStrip — editorial 3-step summary with interactive indicator
   ───────────────────────────────────────────────────────────── */
type Step = { label: string; action: string };

function ThreeStepStrip({ steps, note }: { steps: readonly Step[]; note: string }) {
  return (
    <div className="mb-10 sm:mb-12 md:mb-14">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {steps.map((s, i) => (
          <StepItem key={i} label={s.label} action={s.action} />
        ))}
      </div>
      <p
        className="mt-3 text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {note}
      </p>
    </div>
  );
}

function StepItem({ label, action }: { label: string; action: string }) {
  return (
    <div
      tabIndex={0}
      className="relative pt-3.5 pr-2 pb-1.5 outline-none cursor-default group"
    >
      {/* Base hairline border */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-[var(--border)]"
        aria-hidden="true"
      />
      {/* Accent border that draws on hover/focus in 250ms */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-[var(--forest)] transition-all duration-300 ease-out w-0 group-hover:w-full group-focus-within:w-full"
        aria-hidden="true"
      />
      <p
        className="text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--forest)] mb-1"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {label}
      </p>
      <p
        className="text-base sm:text-[17px] font-normal text-[var(--ink)] leading-snug"
        style={{ fontFamily: 'var(--font-editorial)' }}
      >
        {action}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VideoLightbox — accessible modal with focus trap, Esc close,
   backdrop close, return focus
   ───────────────────────────────────────────────────────────── */
function VideoLightbox({
  open,
  onClose,
  label,
  triggerEl,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  triggerEl: HTMLElement | null;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        triggerEl?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      triggerEl?.focus();
    };
  }, [open, onClose, triggerEl]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 transition-opacity duration-200"
    >
      <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl animate-lightbox-open">
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Cerrar vídeo"
          className="absolute top-3 right-3 z-10 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          ✕
        </button>
        <div className="relative w-full aspect-video">
          <iframe
            src="https://www.youtube-nocookie.com/embed/9G5SYwl5JeU?autoplay=1&rel=0"
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   YearRow — single editorial milestone row
   Desktop alternates:
     - Even rows (0, 2, 4): Numeral left (2 cols), Story middle (5 cols), Photo right (5 cols)
     - Odd rows (1, 3): Photo left (5 cols), Numeral middle (2 cols), Story right (5 cols)
   Mobile reading order:
     - Year numeral & tag -> Photo -> Heading & body text & actions
   ───────────────────────────────────────────────────────────── */
interface YearRowData {
  year: string;
  tag: string;
  title: string;
  body: string;
  pullQuote: string | null;
  videoLink: string | null;
  videoLabel: string | null;
  upcoming: boolean;
  ctaPrimary: string | null;
  ctaSecondary: string | null;
  caption?: string;
}

function YearRow({
  data,
  index,
  photo,
  onVideoClick,
  donateHref,
  projectHref,
}: {
  data: YearRowData;
  index: number;
  photo: typeof YEAR_PHOTOS[number];
  onVideoClick: (btn: HTMLElement) => void;
  donateHref: string;
  projectHref: string;
}) {
  const { ref, inView } = useInView(0.15);
  const reduced = useReducedMotion();
  const articleRef = useRef<HTMLElement>(null);

  const visible = reduced || inView;
  const isEven = index % 2 === 0;

  return (
    <article
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        (articleRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      id={data.year}
      className={`relative py-10 sm:py-12 md:py-14 border-t ${
        data.upcoming ? 'border-dashed border-[var(--forest)]/50' : 'border-[var(--border)]'
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: reduced
          ? 'none'
          : `opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 60}ms, transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 60}ms`,
      }}
    >
      {/* ── Aligned Year Marker on Timeline Spine ── */}
      <div
        className={`absolute -left-[24px] sm:-left-[33px] md:-left-[37px] top-10 sm:top-12 md:top-14 w-3.5 h-3.5 -translate-y-1/2 rounded-full transition-all duration-300 ${
          data.upcoming
            ? 'border-2 border-dashed border-[var(--forest)] bg-[var(--ivory)] ring-4 ring-[var(--forest)]/10'
            : visible
            ? 'bg-[var(--forest)] ring-4 ring-[var(--forest)]/20'
            : 'bg-[var(--border)] ring-4 ring-transparent'
        }`}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:gap-8 lg:gap-10 items-start">
        {/*
          Reading sequence on Mobile (< md):
            1. Numeral + Tag (order-0)
            2. Photo (order-1)
            3. Story / Content (order-2)
          Desktop layout:
            Even: Numeral (col 1-2, order-0), Story (col 3-7, order-1), Photo (col 8-12, order-2)
            Odd: Photo (col 1-5, order-0), Numeral (col 6-7, order-1), Story (col 8-12, order-2)
        */}

        {/* 1. Year Numeral + Tag */}
        <div
          className={`flex flex-col gap-1 ${
            isEven
              ? 'md:col-span-2 md:order-0 order-0'
              : 'md:col-span-2 md:order-1 order-0'
          }`}
        >
          <span
            className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-normal tracking-tight block leading-none transition-colors duration-300"
            style={{
              fontFamily: 'var(--font-editorial)',
              color: data.upcoming
                ? 'var(--forest)'
                : visible
                ? 'var(--ink)'
                : 'var(--text-secondary)',
            }}
          >
            {data.year}
          </span>
          <span
            className="text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-secondary)] mt-1.5 block"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {data.tag}
          </span>
        </div>

        {/* 2. Middle: Title, text, pullquote, video, buttons */}
        <div
          className={`flex flex-col ${
            isEven
              ? 'md:col-span-5 md:order-1 order-2'
              : 'md:col-span-5 md:order-2 order-2'
          }`}
        >
          <h2
            className="text-xl sm:text-2xl lg:text-[26px] font-normal leading-[1.2] tracking-tight text-[var(--ink)] mb-2.5 sm:mb-3"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            {data.title}
          </h2>

          <p
            className="text-sm sm:text-[15px] leading-relaxed text-[var(--ink-muted)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {data.body}
          </p>

          {/* Pull-quote (verified testimony for 2024) */}
          {data.pullQuote && (
            <blockquote
              className="border-l-2 border-[var(--forest)] pl-3.5 my-3 sm:my-3.5 text-sm sm:text-[15px] italic text-[var(--ink)] leading-snug"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              “{data.pullQuote.replace(/^[“"«]\s*|\s*[”"»]$/g, '')}”
            </blockquote>
          )}

          {/* Video link for 2026 */}
          {data.videoLink && (
            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => onVideoClick(e.currentTarget)}
                className="editorial-link group inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-[var(--forest)] hover:text-[var(--forest-dark)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] rounded"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span className="editorial-link-text relative">
                  {data.videoLink.replace(' →', '')}
                  <span className="editorial-link-underline" />
                </span>
                <span className="editorial-link-arrow transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          )}

          {/* Upcoming 2027 Objective CTAs */}
          {data.upcoming && (
            <div className="flex flex-wrap items-center gap-3 pt-3.5">
              {data.ctaPrimary && (
                <a
                  href={donateHref}
                  className="editorial-btn-primary inline-flex items-center justify-center gap-2 min-h-[44px] px-5 sm:px-6 rounded-full text-xs sm:text-sm font-semibold text-white bg-[var(--forest)] hover:bg-[var(--forest-dark)] active:scale-[0.98] transition-all cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <span>{data.ctaPrimary}</span>
                  <span className="btn-arrow transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </a>
              )}
              {data.ctaSecondary && (
                <a
                  href={projectHref}
                  className="editorial-btn-secondary inline-flex items-center justify-center min-h-[44px] px-4.5 sm:px-5 rounded-full text-xs sm:text-sm font-semibold text-[var(--ink)] bg-white/70 hover:bg-white border border-[var(--border)] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {data.ctaSecondary}
                </a>
              )}
            </div>
          )}
        </div>

        {/* 3. Photo column */}
        <div
          className={`flex flex-col ${
            isEven
              ? 'md:col-span-5 md:order-2 order-1'
              : 'md:col-span-5 md:order-0 order-1'
          }`}
        >
          <figure
            className={`photo-card relative w-full aspect-[4/3] rounded-xl overflow-hidden border ${
              data.upcoming
                ? 'border-dashed border-[var(--forest)]/50 bg-[var(--paper)]'
                : 'border-[var(--border)] bg-[var(--paper)] shadow-sm'
            } group`}
          >
            <div className="w-full h-full relative overflow-hidden">
              <Image
                src={photo.img.src}
                alt={photo.alt || data.caption || photo.img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                priority={photo.isFirst}
                loading={photo.isFirst ? 'eager' : 'lazy'}
                placeholder="blur"
                blurDataURL={photo.img.placeholderSrc || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiNmM2VmZTciLz48L3N2Zz4='}
                className="photo-img object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              />
            </div>
            {/* Documentary caption */}
            <figcaption className="photo-caption absolute bottom-0 inset-x-0 p-3 sm:p-3.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-xs leading-snug">
              <span className="font-medium text-[11.5px] sm:text-xs text-white/95 block drop-shadow-sm">
                {data.caption || photo.img.alt}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main ObraRealTimeline component
   ───────────────────────────────────────────────────────────── */
export function ObraRealTimeline() {
  const { lang } = useLang();
  const content = t[lang].obraReal;
  const containerRef = useRef<HTMLDivElement>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  const handleOpenVideo = useCallback((btn: HTMLElement) => {
    setTriggerEl(btn);
    setLightboxOpen(true);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Functional navigation destinations
  const donateHref = `/${lang.toLowerCase()}#donar`;
  const projectHref = `/${lang.toLowerCase()}#proyecto`;

  const videoRow = content.years.find((y) => y.videoLink);
  const videoLabel = videoRow?.videoLabel || 'Vídeo Shariani';

  return (
    <section
      id="obra-real"
      aria-label={content.eyebrow}
      className="pt-28 pb-16 md:pt-36 md:pb-24"
      style={{ background: 'var(--ivory)' }}
    >
      {/* Component-scoped microinteractions */}
      <style>{`
        /* Photo hover zoom */
        .photo-img {
          transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          .photo-card:hover .photo-img {
            transform: scale(1.025);
          }
          .photo-caption {
            opacity: 0.88;
            transform: translateY(2px);
            transition: opacity 300ms ease, transform 300ms ease;
          }
          .photo-card:hover .photo-caption {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (hover: none) {
          .photo-caption {
            opacity: 0.95;
            transform: none;
          }
        }

        /* Editorial link underline grows from left in 200ms */
        .editorial-link-underline {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1.5px;
          background-color: var(--forest);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .editorial-link:hover .editorial-link-underline,
        .editorial-link:focus-visible .editorial-link-underline {
          transform: scaleX(1);
        }

        /* Button microinteractions: hover raises 1px, active scales 0.98 in 120ms */
        .editorial-btn-primary,
        .editorial-btn-secondary {
          transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
        }
        .editorial-btn-primary:hover,
        .editorial-btn-secondary:hover {
          transform: translateY(-1px);
        }
        .editorial-btn-primary:active,
        .editorial-btn-secondary:active {
          transform: scale(0.98);
        }

        /* Lightbox fade + scale */
        @keyframes lightbox-in {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-lightbox-open {
          animation: lightbox-in 200ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Prefers-reduced-motion overrides */
        @media (prefers-reduced-motion: reduce) {
          .photo-img { transform: none !important; transition: none !important; }
          .photo-caption { opacity: 1 !important; transform: none !important; transition: none !important; }
          .editorial-link-underline { transform: scaleX(1) !important; transition: none !important; }
          .editorial-btn-primary, .editorial-btn-secondary { transform: none !important; transition: none !important; }
          .animate-lightbox-open { animation: none !important; }
        }
      `}</style>

      <div className="container-page">
        {/* 1. Eyebrow */}
        <p
          className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[var(--forest)] uppercase mb-3"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {content.eyebrow}
        </p>

        {/* 2. Single H1 */}
        <h1
          className="text-[var(--ink)] mb-4 sm:mb-5"
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(32px, 4.8vw, 56px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
            fontWeight: 400,
          }}
        >
          {content.h1}
        </h1>

        {/* 3. Lead text */}
        <p
          className="text-[var(--ink-muted)] mb-8 sm:mb-10"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.6vw, 17.5px)',
            lineHeight: 1.68,
            maxWidth: '680px',
          }}
        >
          {content.lead}
        </p>

        {/* 4. Three-step summary strip */}
        <ThreeStepStrip steps={content.steps} note={content.stepsNote} />

        {/* 5. Year rows with vertical timeline spine & markers */}
        <div ref={containerRef} className="relative pl-8 sm:pl-12 md:pl-14">
          <ThreadLine containerRef={containerRef} />

          {content.years.map((yearData, idx) => (
            <YearRow
              key={yearData.year}
              data={yearData}
              index={idx}
              photo={YEAR_PHOTOS[idx]}
              onVideoClick={handleOpenVideo}
              donateHref={donateHref}
              projectHref={projectHref}
            />
          ))}
        </div>
      </div>

      {/* Accessible video lightbox */}
      <VideoLightbox
        open={lightboxOpen}
        onClose={handleCloseVideo}
        label={videoLabel}
        triggerEl={triggerEl}
      />
    </section>
  );
}
