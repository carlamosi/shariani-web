'use client';

import { useRef } from 'react';
import { ShieldCheck, ArrowDownRight, Compass } from 'lucide-react';

/*
 * Impact Section — «El Cuadro de Mando del Impacto»
 * Estilo editorial de alta precisión (Financial Times / Monocle style).
 * 4 métricas estructuradas en retícula arquitectónica con tipografía monumental,
 * rigor documental y micro-contexto verificable sobre el terreno en Shariani.
 */

interface ImpactMetric {
  id: string;
  figure: string;
  unit: string;
  label: string;
  headline: string;
  description: string;
  auditTag: string;
}

const METRICS: ImpactMetric[] = [
  {
    id: '01',
    figure: '1.700',
    unit: 'alumnos',
    label: 'Censo escolar dignificado',
    headline: 'Fin del suelo de tierra y la penumbra',
    description:
      'Aulas saneadas, luminosas y dotadas de pupitres de madera maciza para que cada estudiante cuente con un espacio propio donde aprender con dignidad.',
    auditTag: 'Impacto directo diario',
  },
  {
    id: '02',
    figure: '300',
    unit: 'metros',
    label: 'Cerramiento de piedra',
    headline: 'Perímetro seguro para el aprendizaje',
    description:
      'Construcción de muro perimetral continuo en 2026 que erradica la vulnerabilidad frente al tránsito exterior, intrusiones y paso de animales durante las clases.',
    auditTag: 'Obra civil entregada',
  },
  {
    id: '03',
    figure: '100%',
    unit: 'economía local',
    label: 'Circuito cerrado en Kilifi',
    headline: 'Carpinteros y albañiles de la zona',
    description:
      'Rechazamos la importación de mobiliario: contratamos y remuneramos con salario justo a los talleres y operarios de la propia comunidad costera de Kenia.',
    auditTag: 'Desarrollo en origen',
  },
  {
    id: '04',
    figure: '0 €',
    unit: 'gastos de estructura',
    label: 'Transparencia radical',
    headline: 'El 100% se traduce en materiales',
    description:
      'Las voluntarias sufragan personalmente sus billetes de avión, alojamiento y manutención. Ni un solo céntimo donado se diluye en intermediarios o burocracia.',
    auditTag: 'Vía Fundació Montblanc',
  },
];

export function Impact() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="impacto"
      className="relative w-full border-t border-[var(--border)] bg-[var(--paper)] py-16 md:py-24 text-[var(--ink)]"
      aria-labelledby="impacto-heading"
    >
      <div className="container-page">
        {/* ── Encabezado de Auditoría Social ── */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--forest)]" />
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">
                Cuadro de mando social · Balance 2024–2026
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--forest)]" aria-hidden="true" />
              <span>Verificado sobre el terreno en Kilifi County</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline">
            <div className="lg:col-span-8">
              <h2
                id="impacto-heading"
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] font-normal tracking-[-0.02em] leading-[1.12]"
              >
                La evidencia de lo que ya existe y permanece.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-sm md:text-[14.5px] leading-relaxed text-[var(--ink-muted)]"
              >
                No proyectamos intenciones hipotéticas ni porcentajes teóricos. Cada cifra responde a
                una transformación física que hoy sostiene el día a día de Shariani Primary School.
              </p>
            </div>
          </div>
        </div>

        {/* ── Retícula Arquitectónica de 4 Columnas ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--border)] bg-[var(--ivory)] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          {METRICS.map((metric) => (
            <article
              key={metric.id}
              className="group relative flex flex-col justify-between border-r border-b border-[var(--border)] p-6 md:p-8 transition-colors duration-300 hover:bg-[#F8F5EE]"
            >
              {/* Parte Superior: Tag y Número */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--forest-mid)]">
                    [{metric.id}] {metric.label}
                  </span>
                  <ArrowDownRight
                    className="w-4 h-4 text-[var(--border)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-[var(--forest)]"
                    aria-hidden="true"
                  />
                </div>

                {/* Monumental Figure */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span
                      style={{ fontFamily: 'var(--font-editorial)' }}
                      className="text-4xl sm:text-5xl lg:text-[54px] font-normal leading-none tracking-tight text-[var(--ink)]"
                    >
                      {metric.figure}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wide text-[var(--text-secondary)] font-medium">
                      {metric.unit}
                    </span>
                  </div>
                </div>

                {/* Titular Breve */}
                <h3
                  style={{ fontFamily: 'var(--font-editorial)' }}
                  className="text-lg text-[var(--ink)] font-normal leading-snug mb-3 group-hover:text-[var(--forest-dark)] transition-colors"
                >
                  {metric.headline}
                </h3>

                {/* Descripción Detallada */}
                <p
                  style={{ fontFamily: 'var(--font-body)' }}
                  className="text-[13.5px] leading-relaxed text-[var(--ink-muted)]"
                >
                  {metric.description}
                </p>
              </div>

              {/* Pie de Celda: Badge de Rigor */}
              <div className="mt-8 pt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[var(--text-secondary)]">
                  {metric.auditTag}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest-light)]/40 group-hover:bg-[var(--forest)] transition-colors" />
              </div>
            </article>
          ))}
        </div>

        {/* ── Franja de Conexión y Confianza (Closing Statement) ── */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Compass className="w-4 h-4 text-[var(--forest)] shrink-0" aria-hidden="true" />
            <p className="text-xs sm:text-[13px] text-[var(--ink-muted)]">
              Supervisión in situ por{' '}
              <strong className="text-[var(--ink)] font-semibold">Volunteer Connect Kenya</strong> y
              canalización fiscal a través de{' '}
              <a
                href="https://www.fundaciomontblanc.org/index.php/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-[var(--forest)] hover:text-[var(--forest-dark)] font-medium"
              >
                Fundació Montblanc
              </a>
              .
            </p>
          </div>

          <a
            href="#ayuda"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--forest)] hover:text-[var(--forest-dark)] transition-colors"
          >
            <span>Ver cómo financiar la próxima fase</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
