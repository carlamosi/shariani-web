'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { t } from '@/data/translations';
import { images } from '@/data/images';

/* ─────────────────────────────────────────────────────────────
   Photo mapping per year (reusing existing photos and alt text)
   2023: colaborarOngs (first photo -> eager / priority)
   2024: mesas (wooden desks built by local carpenters)
   2025: higieneBucal (oral hygiene kits and lessons)
   2026: ninaFalda (300 skirts project)
   2027: valla (upcoming project / school perimeter facilities)
   ───────────────────────────────────────────────────────────── */
const YEAR_PHOTOS = [
  { img: images.colaborarOngs, isFirst: true },
  { img: images.mesas,         isFirst: false },
  { img: images.higieneBucal,  isFirst: false },
  { img: images.ninaFalda,     isFirst: false },
  { img: images.valla,         isFirst: false },
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
   useInView hook — triggers once at 20% visibility
   ───────────────────────────────────────────────────────────── */
function useInView(threshold = 0.2) {
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
   ThreadLine — vertical stitched SVG line
   Sews itself with scroll via stroke-dashoffset; needle dot at tip.
   After 2026 (last segment), dashed line pulses opacity (0.5 to 1)
   over 3s to signal "to be continued".
   ───────────────────────────────────────────────────────────── */
function ThreadLine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const sewnLineRef = useRef<SVGLineElement>(null);
  const needleDotRef = useRef<SVGCircleElement>(null);
  const futureLineRef = useRef<SVGLineElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    const sewnLine = sewnLineRef.current;
    const needleDot = needleDotRef.current;
    const futureLine = futureLineRef.current;
    const container = containerRef.current;
    if (!svg || !sewnLine || !needleDot || !futureLine || !container) return;

    const onScroll = () => {
      const totalH = container.scrollHeight;
      svg.setAttribute('height', String(totalH));

      // 4 completed years (2023-2026) out of 5 total rows = 80% of line
      const completedH = totalH * 0.8;
      futureLine.setAttribute('y1', String(completedH));
      futureLine.setAttribute('y2', String(totalH));

      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + totalH * 0.75)));
      const drawn = Math.min(progress * completedH, completedH);

      sewnLine.setAttribute('y2', String(completedH));
      sewnLine.setAttribute('stroke-dasharray', String(completedH));
      sewnLine.setAttribute('stroke-dashoffset', String(completedH - drawn));
      needleDot.setAttribute('cy', String(drawn));
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
        style={{
          position: 'absolute',
          left: '12px',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'var(--forest)',
          opacity: 0.4,
        }}
      />
    );
  }

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '12px',
        top: 0,
        width: '1px',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
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

      {/* Needle dot at current tip */}
      <circle
        ref={needleDotRef}
        cx="0"
        cy="0"
        r="3.5"
        fill="var(--forest)"
      />

      {/* Future segment (2026-2027): unfinished, soft 3s opacity pulse */}
      <line
        ref={futureLineRef}
        x1="0"
        y1="0"
        x2="0"
        y2="0"
        stroke="var(--forest)"
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
        className="thread-future"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   ThreeStepStrip — editorial 3-step strip with drawing top border
   ───────────────────────────────────────────────────────────── */
type Step = { label: string; action: string };

function ThreeStepStrip({ steps, note }: { steps: readonly Step[]; note: string }) {
  return (
    <div className="mb-16 md:mb-24">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
        {steps.map((s, i) => (
          <StepItem key={i} label={s.label} action={s.action} />
        ))}
      </div>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13.5px',
          color: 'var(--text-secondary)',
          marginTop: '1.25rem',
        }}
      >
        {note}
      </p>
    </div>
  );
}

function StepItem({ label, action }: { label: string; action: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      className="relative pt-4 pr-4 pb-2 outline-none cursor-default group"
    >
      {/* Base hairline border */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-[var(--border)]"
        aria-hidden="true"
      />
      {/* Accent border that draws left to right on hover or focus in 300ms */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-[var(--forest)] transition-all duration-300 ease-out"
        style={{
          width: hovered ? '100%' : '0%',
        }}
        aria-hidden="true"
      />
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginBottom: '0.35rem',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-editorial)',
          fontSize: '16px',
          color: 'var(--ink)',
          lineHeight: 1.3,
          fontWeight: 400,
        }}
      >
        {action}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VideoLightbox — accessible modal with focus trap, Esc close,
   backdrop close, return focus, and lite facade (no iframe before click)
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
          className="absolute top-3 right-3 z-10 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xl transition-colors cursor-pointer"
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
   YearRow — single editorial row
   Numeral + tag left, title + text middle, photo right.
   Desktop alternates photo side (even rows mirrored).
   Mobile stacks photo first.
   Separated by a 1px hairline (dashed on upcoming 2027).
   Keyboard tab order matches visual order via CSS order.
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
}

function YearRow({
  data,
  index,
  photo,
  onVideoClick,
  donateHref,
}: {
  data: YearRowData;
  index: number;
  photo: typeof YEAR_PHOTOS[number];
  onVideoClick: (btn: HTMLElement) => void;
  donateHref: string;
}) {
  const { ref, inView } = useInView(0.2);
  const reduced = useReducedMotion();
  const [parallaxY, setParallaxY] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  // Light parallax max 8px on scroll
  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const offset = ((mid / window.innerHeight) - 0.5) * 8;
      setParallaxY(Math.max(-8, Math.min(8, Math.round(offset))));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  const visible = reduced || inView;
  const isEven = index % 2 === 0; // index 0 (2023) is photo right, index 1 (2024) is photo left on desktop

  return (
    <article
      ref={(node) => {
        // assign both refs
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        (articleRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      className={`relative py-12 md:py-16 border-t ${
        data.upcoming ? 'border-dashed border-[var(--forest)]' : 'border-[var(--border)]'
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: reduced
          ? 'none'
          : `opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80}ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80}ms`,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/*
          Mobile: Photo first (CSS order: -1), Numeral (order: 0), Content (order: 1)
          Desktop:
            - Even row (0, 2, 4): Numeral left (order: 0, col-span-3), Content middle (order: 1, col-span-5), Photo right (order: 2, col-span-4)
            - Odd row (1, 3): Photo left (order: 0, col-span-4), Numeral middle (order: 1, col-span-3), Content right (order: 2, col-span-5)
            Visual & keyboard focus order match naturally!
        */}

        {/* 1. Year Numeral + Tag */}
        <div
          className={`flex flex-col gap-1.5 ${
            isEven
              ? 'md:col-span-3 md:order-0 order-1'
              : 'md:col-span-3 md:order-1 order-1'
          }`}
        >
          <span
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(52px, 6.5vw, 84px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.88,
              color: data.upcoming ? 'var(--text-secondary)' : 'var(--ink)',
              display: 'block',
              overflow: 'hidden',
              clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              transition: reduced
                ? 'none'
                : `clip-path 500ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms`,
            }}
            aria-hidden="true"
          >
            {data.year}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: data.upcoming ? 'var(--forest)' : 'var(--text-secondary)',
              opacity: visible ? 1 : 0,
              transition: reduced
                ? 'none'
                : `opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80 + 80}ms`,
            }}
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
          {/* Level 2 Heading for year title */}
          <h2
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(21px, 2.4vw, 28px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.18,
              fontWeight: 400,
              color: 'var(--ink)',
              marginBottom: '0.85rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: reduced
                ? 'none'
                : `opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80 + 80}ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80 + 80}ms`,
            }}
          >
            {data.title}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14.5px',
              lineHeight: 1.68,
              color: 'var(--ink-muted)',
              marginBottom: data.pullQuote || data.videoLink || data.upcoming ? '1.15rem' : 0,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: reduced
                ? 'none'
                : `opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80 + 160}ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80 + 160}ms`,
            }}
          >
            {data.body}
          </p>

          {/* Pull-quote for 2024 */}
          {data.pullQuote && (
            <blockquote
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontSize: 'clamp(15px, 1.5vw, 17px)',
                lineHeight: 1.45,
                color: 'var(--ink)',
                borderLeft: '2px solid var(--forest)',
                paddingLeft: '1rem',
                margin: '0.5rem 0 1rem 0',
                opacity: visible ? 1 : 0,
                transition: reduced
                  ? 'none'
                  : `opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80 + 240}ms`,
              }}
            >
              {data.pullQuote}
            </blockquote>
          )}

          {/* Video link for 2026 */}
          {data.videoLink && (
            <div className="pt-1 pb-2">
              <button
                type="button"
                onClick={(e) => onVideoClick(e.currentTarget)}
                className="editorial-link group inline-flex items-center min-h-[44px] cursor-pointer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  color: 'var(--forest)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                }}
              >
                <span className="editorial-link-text relative">
                  {data.videoLink.replace(' →', '')}
                  <span className="editorial-link-underline" />
                </span>
                <span className="editorial-link-arrow transition-transform duration-200 pl-1" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          )}

          {/* Upcoming CTAs for 2027 */}
          {data.upcoming && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {data.ctaPrimary && (
                <a
                  href={donateHref}
                  className="editorial-btn-primary inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-full text-sm font-semibold text-white bg-[var(--forest)] cursor-pointer"
                >
                  <span>{data.ctaPrimary}</span>
                  <span className="btn-arrow transition-transform duration-200" aria-hidden="true">
                    →
                  </span>
                </a>
              )}
              {data.ctaSecondary && (
                <a
                  href="https://www.teaming.net/lavallshariani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-btn-secondary inline-flex items-center justify-center min-h-[44px] px-5 rounded-full text-sm font-semibold text-[var(--ink)] border border-[var(--border)] cursor-pointer"
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
              ? 'md:col-span-4 md:order-2 order-0'
              : 'md:col-span-4 md:order-0 order-0'
          }`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: reduced
              ? 'none'
              : `opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80 + 240}ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80 + 240}ms`,
          }}
        >
          <figure
            className="photo-card relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-[var(--border)] group bg-[var(--paper)]"
            style={{
              opacity: data.upcoming ? 0.7 : 1,
            }}
          >
            <div
              className="w-full h-full relative"
              style={{
                transform: reduced ? 'none' : `translateY(${parallaxY}px)`,
                transition: 'transform 100ms ease-out',
              }}
            >
              <Image
                src={photo.img.src}
                alt={photo.img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={photo.isFirst}
                loading={photo.isFirst ? 'eager' : 'lazy'}
                placeholder="blur"
                blurDataURL={photo.img.placeholderSrc || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiNmM2VmZTciLz48L3N2Zz4='}
                className="photo-img object-cover"
              />
            </div>
            {/* Caption slides up 6px and fades in on hover (touch: no hover) */}
            <figcaption className="photo-caption absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/75 to-transparent text-white text-xs leading-snug">
              <span className="font-semibold block">{data.year} · {data.tag}</span>
              <span className="opacity-85 text-[11px] line-clamp-1">{photo.img.alt}</span>
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

  // Donate link anchors to home page help section if on /obra-real
  const donateHref = `/${lang.toLowerCase()}#ayuda`;

  const videoRow = content.years.find((y) => y.videoLink);
  const videoLabel = videoRow?.videoLabel || 'Vídeo Shariani';

  return (
    <section
      id="obra-real"
      aria-label={content.eyebrow}
      className="pt-32 pb-20 md:pt-40 md:pb-28"
      style={{ background: 'var(--ivory)' }}
    >
      {/* Component-scoped microinteractions */}
      <style>{`
        /* Thread line unfinished segment pulse */
        @keyframes thread-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .thread-future {
          animation: thread-pulse 3s ease-in-out infinite;
        }

        /* Photo hover zoom */
        .photo-img {
          transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          .photo-card:hover .photo-img {
            transform: scale(1.03);
          }
          .photo-caption {
            opacity: 0;
            transform: translateY(6px);
            transition: opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
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
        .editorial-link:hover .editorial-link-arrow,
        .editorial-link:focus-visible .editorial-link-arrow {
          transform: translateX(4px);
        }

        /* Button microinteractions: hover raises 1px, active scales 0.97 in 120ms */
        .editorial-btn-primary,
        .editorial-btn-secondary {
          transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
        }
        .editorial-btn-primary:hover {
          transform: translateY(-1px);
          background-color: var(--forest-dark);
        }
        .editorial-btn-primary:hover .btn-arrow {
          transform: translateX(4px);
        }
        .editorial-btn-secondary:hover {
          transform: translateY(-1px);
          background-color: var(--paper);
          border-color: var(--ink);
        }
        .editorial-btn-primary:active,
        .editorial-btn-secondary:active {
          transform: scale(0.97);
        }
        .editorial-btn-primary:focus-visible,
        .editorial-btn-secondary:focus-visible {
          outline: 2px solid var(--forest);
          outline-offset: 2px;
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
          .thread-future { animation: none !important; opacity: 0.6 !important; }
          .photo-img { transform: none !important; transition: none !important; }
          .photo-caption { opacity: 1 !important; transform: none !important; transition: none !important; }
          .editorial-link-underline { transform: scaleX(1) !important; transition: none !important; }
          .editorial-link-arrow { transform: none !important; transition: none !important; }
          .editorial-btn-primary, .editorial-btn-secondary { transform: none !important; transition: none !important; }
          .animate-lightbox-open { animation: none !important; }
        }
      `}</style>

      <div className="container-page">
        {/* 1. Eyebrow */}
        <p className="section-label mb-4" style={{ color: 'var(--forest)' }}>
          {content.eyebrow}
        </p>

        {/* 2. Single H1 */}
        <h1
          className="text-[var(--ink)] mb-6"
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(34px, 5.2vw, 64px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.06,
            fontWeight: 400,
          }}
        >
          {content.h1}
        </h1>

        {/* 3. Lead */}
        <p
          className="text-[var(--ink-muted)] mb-12 sm:mb-14"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15.5px, 1.7vw, 19px)',
            lineHeight: 1.68,
            maxWidth: '680px',
          }}
        >
          {content.lead}
        </p>

        {/* 4. Three-step strip */}
        <ThreeStepStrip steps={content.steps} note={content.stepsNote} />

        {/* 5. Year rows with vertical stitched thread line */}
        <div ref={containerRef} className="relative pl-6 sm:pl-10">
          <ThreadLine containerRef={containerRef} />

          {content.years.map((yearData, idx) => (
            <YearRow
              key={yearData.year}
              data={yearData}
              index={idx}
              photo={YEAR_PHOTOS[idx]}
              onVideoClick={handleOpenVideo}
              donateHref={donateHref}
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
