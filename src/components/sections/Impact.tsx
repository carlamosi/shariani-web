'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/context/LangContext';

// ── Parse a metric string like '+300', '1.200', '112' into parts ───────────
function parseMetric(raw: string): { prefix: string; value: number; suffix: string } {
  // prefix: leading non-digit chars (e.g. '+')
  // value:  the numeric portion (ignore '.' thousands separators)
  // suffix: trailing non-digit chars
  const match = raw.match(/^([^\d]*)(\d[\d.,]*)([^\d]*)$/);
  if (!match) return { prefix: '', value: 0, suffix: raw };
  const prefix = match[1] ?? '';
  const suffix = match[3] ?? '';
  // Remove thousands separators (dot or comma used as separator, not decimal)
  const numeric = parseInt(match[2].replace(/[.,]/g, ''), 10);
  return { prefix, value: isNaN(numeric) ? 0 : numeric, suffix };
}

// ── Animated counter hook ──────────────────────────────────────────────────
function useCounter(target: number, active: boolean, duration = 1400) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf: number;

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return display;
}

// ── Single metric card ─────────────────────────────────────────────────────
interface MetricCardProps {
  number: string;
  label: string;
  description: string;
  index: number;
  sectionActive: boolean;
}

function MetricCard({ number, label, description, index, sectionActive }: MetricCardProps) {
  const { prefix, value, suffix } = parseMetric(number);
  const count = useCounter(value, sectionActive, 1200 + index * 150);

  // Format with locale thousands separator matching original (dot for ES/CA)
  const formatted = value >= 1000
    ? count.toLocaleString('es-ES').replace(',', '.')
    : String(count);

  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col justify-between pt-4 sm:pt-6 border-t-2 transition-colors duration-300 cursor-default"
      style={{ borderColor: hovered ? 'var(--forest)' : 'transparent' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        {/* Animated number */}
        <div
          style={{ fontFamily: 'var(--font-editorial)' }}
          className="text-5xl sm:text-6xl font-normal tracking-tight text-[var(--forest)] leading-none mb-3"
        >
          {sectionActive ? `${prefix}${formatted}${suffix}` : number}
        </div>

        <h3
          style={{ fontFamily: 'var(--font-body)' }}
          className="text-base sm:text-lg font-semibold text-[var(--ink)] mb-2.5"
        >
          {label}
        </h3>

        <p
          style={{ fontFamily: 'var(--font-body)' }}
          className="text-sm text-[var(--ink-muted)] leading-relaxed"
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────
export function Impact() {
  const { tr } = useLang();
  const impact = tr.impact;
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setActive(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impacto"
      className="py-16 md:py-24 bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--border)] overflow-hidden"
      aria-labelledby="impacto-heading"
    >
      <div className="container-page max-w-3xl">
        {/* Section header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="section-label mb-3" style={{ color: 'var(--forest)' }}>
            {impact.sectionLabel}
          </p>
          <h2
            id="impacto-heading"
            style={{ fontFamily: 'var(--font-editorial)' }}
            className="text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight text-[var(--ink)] leading-tight mb-4"
          >
            {impact.heading}
          </h2>
          <p
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-base text-[var(--ink-muted)] leading-relaxed"
          >
            {impact.subheading}
          </p>
        </div>

        {/* Metrics grid — staggered animated counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 pt-4 border-t border-[var(--border)]">
          {impact.metrics.map((metric, idx) => (
            <MetricCard
              key={idx}
              index={idx}
              number={metric.number}
              label={metric.label}
              description={metric.description}
              sectionActive={active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
