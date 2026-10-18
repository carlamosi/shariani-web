'use client';

import { useLang } from '@/context/LangContext';

export function Impact() {
  const { tr } = useLang();
  const impact = tr.impact;

  return (
    <section
      id="impacto"
      className="py-16 md:py-24 bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--border)] overflow-hidden"
      aria-labelledby="impacto-heading"
    >
      <div className="container-page max-w-4xl">
        {/* Editorial Section Header */}
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

        {/* Editorial Typography & Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 pt-4 border-t border-[var(--border)]">
          {impact.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between pt-4 sm:pt-6 border-t-2 border-transparent hover:border-[var(--forest)] transition-colors duration-300"
            >
              <div>
                <div
                  style={{ fontFamily: 'var(--font-editorial)' }}
                  className="text-5xl sm:text-6xl font-normal tracking-tight text-[var(--forest)] leading-none mb-3"
                >
                  {metric.number}
                </div>

                <h3
                  style={{ fontFamily: 'var(--font-body)' }}
                  className="text-base sm:text-lg font-semibold text-[var(--ink)] mb-2.5"
                >
                  {metric.label}
                </h3>

                <p
                  style={{ fontFamily: 'var(--font-body)' }}
                  className="text-sm text-[var(--ink-muted)] leading-relaxed"
                >
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
      </div>
      </div>
    </section>
  );
}
