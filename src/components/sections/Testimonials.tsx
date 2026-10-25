'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';

// ── Authentic project photographs ─────────────────────────────────────────
const TESTIMONIAL_IMAGES = [
  '/images/testimonials/julia.jpg',
  '/images/testimonials/miss-ana.jpg',
  '/images/testimonials/pilar-hurtado.jpg',
];

const TEAM_IMAGE = '/images/testimonials/profes.jpeg';

// ── Open-quote SVG (large, editorial, blue) ────────────────────────────────
function QuoteMark() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="currentColor"
      className="text-[var(--forest)] shrink-0"
      aria-hidden="true"
    >
      <path d="M0 15.2C0 7.467 4.267 1.867 11.2 0l2.133 3.2C8.533 4.533 6.4 7.467 6.4 11.2H12V24H0V15.2zm16 0C16 7.467 20.267 1.867 27.2 0l2.133 3.2C24.533 4.533 22.4 7.467 22.4 11.2H28V24H16V15.2z" />
    </svg>
  );
}

// ── Individual testimonial card with scroll-reveal microinteraction ─────────
interface CardProps {
  name: string;
  roleLine: string;
  metaLine: string;
  quote: string;
  imageAlt: string;
  imageSrc: string;
  index: number;
}

function TestimonialCard({ name, roleLine, metaLine, quote, imageAlt, imageSrc, index }: CardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Scroll-reveal: staggered entry per card
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger delay: 0ms, 120ms, 240ms
          const delay = index * 120;
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      className="flex flex-col items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Photo — subtle scale + brightness on hover */}
      <div
        className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden mb-6 bg-[var(--paper)]"
        style={{ aspectRatio: '4/3' }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 380px"
          className="object-cover object-top"
          style={{
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        {/* Subtle gradient overlay — lifts bottom text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(10,18,28,0.18) 0%, transparent 60%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Quote mark */}
      <div
        className="mb-3"
        style={{
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <QuoteMark />
      </div>

      {/* Quote text */}
      <blockquote
        className="text-[15px] sm:text-[16px] text-[var(--ink)] leading-[1.7] font-normal mb-6"
        style={{
          fontFamily: 'var(--font-editorial)',
          letterSpacing: '-0.01em',
        }}
      >
        {quote}
      </blockquote>

      {/* Author block — thin top rule */}
      <div
        className="w-full pt-4 mt-auto"
        style={{
          borderTop: `1px solid ${hovered ? 'var(--forest)' : 'var(--border)'}`,
          transition: 'border-color 0.3s ease',
        }}
      >
        <p
          className="text-base sm:text-[17px] font-normal tracking-tight mb-0.5"
          style={{
            fontFamily: 'var(--font-editorial)',
            color: hovered ? 'var(--forest)' : 'var(--ink)',
            transition: 'color 0.3s ease',
          }}
        >
          {name}
        </p>
        <p
          className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] leading-snug mb-0.5"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {roleLine}
        </p>
        <p
          className="text-[11px] sm:text-[12px] text-[var(--text-secondary)]/70 leading-snug"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {metaLine}
        </p>
      </div>
    </article>
  );
}

// ── Team photo banner with scroll-reveal ──────────────────────────────────
function TeamBanner({ heading, caption, imageAlt }: { heading: string; caption: string; imageAlt: string }) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={bannerRef}
      className="mt-20 sm:mt-24"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Section divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--forest)]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {heading}
        </span>
        <div className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
      </div>

      {/* Full-width photo */}
      <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl group" style={{ aspectRatio: '16/7' }}>
        <Image
          src={TEAM_IMAGE}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1200px"
          className="object-cover"
          style={{
            objectPosition: 'center 55%',
            transform: 'scale(1)',
            transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        {/* Overlay for caption readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(8,16,28,0.65) 0%, rgba(8,16,28,0.15) 45%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        {/* Caption */}
        <p
          className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-8 sm:right-8 text-white/90 text-[13px] sm:text-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {caption}
        </p>
      </div>
    </div>
  );
}

// ── Main exported section ──────────────────────────────────────────────────
export function Testimonials() {
  const { tr } = useLang();
  const tTest = tr.testimonials;
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setHeaderVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonios"
      className="relative w-full bg-[#FAF8F4] py-16 sm:py-20 lg:py-28 border-t border-[var(--border)] overflow-hidden"
      aria-labelledby="testimonios-heading"
    >
      <div className="container-page max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* ── Section header ──────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="max-w-2xl mb-14 sm:mb-16 lg:mb-20"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[var(--forest)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {tTest.eyebrow}
            </span>
            <span className="h-px w-10 bg-[var(--forest)]/35 inline-block" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h2
            id="testimonios-heading"
            className="font-normal leading-[1.1] text-[var(--ink)] tracking-tight mb-4"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(34px, 4vw, 52px)',
              letterSpacing: '-0.025em',
            }}
          >
            {tTest.headlinePart1}
            <br />
            {tTest.headlinePart2}
          </h2>

          {/* Intro */}
          <p
            className="text-[15px] sm:text-base text-[var(--ink-muted)] leading-relaxed max-w-lg"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {tTest.intro}
          </p>
        </div>

        {/* ── Three testimonial columns ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 lg:gap-12 items-start">
          {tTest.items.map((item, idx) => (
            <TestimonialCard
              key={idx}
              index={idx}
              name={item.name}
              roleLine={item.roleLine}
              metaLine={item.metaLine}
              quote={item.quote}
              imageAlt={item.imageAlt}
              imageSrc={TESTIMONIAL_IMAGES[idx]}
            />
          ))}
        </div>

        {/* ── Team photo banner ────────────────────────────────────────── */}
        <TeamBanner
          heading={tTest.teamHeading}
          caption={tTest.teamCaption}
          imageAlt={tTest.teamImageAlt}
        />

      </div>
    </section>
  );
}
