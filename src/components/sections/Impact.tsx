'use client';

import { Users, GraduationCap, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLang } from '@/context/LangContext';

const METRIC_ICONS = [Users, GraduationCap, Building2, ShieldCheck];

export function Impact() {
  const { tr } = useLang();
  const impact = tr.impact;

  return (
    <section
      id="impacto"
      className="py-20 md:py-28 bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--border)] overflow-hidden"
      aria-labelledby="impacto-heading"
    >
      <div className="container-page">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="section-label mb-3" style={{ color: 'var(--forest)' }}>
            {impact.sectionLabel}
          </p>
          <h2
            id="impacto-heading"
            style={{ fontFamily: 'var(--font-editorial)' }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[var(--ink)] leading-tight mb-4"
          >
            {impact.heading}
          </h2>
          <p
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed max-w-2xl"
          >
            {impact.subheading}
          </p>
        </div>

        {/* Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impact.metrics.map((metric, idx) => {
            const Icon = METRIC_ICONS[idx % METRIC_ICONS.length];
            return (
              <div
                key={idx}
                className="bg-[var(--ivory)] border border-[var(--border)] rounded-2xl p-6 sm:p-7 flex flex-col justify-between card-interactive relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(24, 110, 215, 0.08)', color: 'var(--forest)' }}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-mono text-[var(--text-secondary)] font-semibold tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  <div
                    style={{ fontFamily: 'var(--font-editorial)' }}
                    className="text-4xl sm:text-5xl font-normal tracking-tight text-[var(--ink)] leading-none mb-3"
                  >
                    {metric.number}
                  </div>

                  <h3
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-base font-semibold text-[var(--ink)] mb-2"
                  >
                    {metric.label}
                  </h3>

                  <p
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed"
                  >
                    {metric.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[var(--border-light)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--forest)' }} />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Verificat sobre el terreny
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact CTA banner */}
        <div
          className="rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border"
          style={{
            background: 'linear-gradient(135deg, rgba(24, 110, 215, 0.06) 0%, rgba(24, 110, 215, 0.02) 100%)',
            borderColor: 'rgba(24, 110, 215, 0.2)',
          }}
        >
          <div className="max-w-xl">
            <h3
              style={{ fontFamily: 'var(--font-editorial)' }}
              className="text-xl sm:text-2xl font-normal text-[var(--ink)] mb-2"
            >
              {impact.ctaTitle}
            </h3>
            <p
              style={{ fontFamily: 'var(--font-body)' }}
              className="text-sm text-[var(--ink-muted)] leading-relaxed"
            >
              {impact.ctaBody}
            </p>
          </div>

          <a
            href="#ayuda"
            className="btn-primary shrink-0 flex items-center gap-2"
          >
            <span>{impact.ctaButton}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
