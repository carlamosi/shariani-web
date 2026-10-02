'use client';

import Image from 'next/image';

/*
 * MediaStrip Section — «Nos han dado voz»
 *
 * Tira continua y automática de logotipos de medios de comunicación que han dado
 * cobertura al proyecto La Vall × Shariani:
 * - COPE Catalunya
 * - L’Eco de Sitges
 * - TOT per Sant Cugat
 * - Diari Sabadell
 * - Ràdio Estel
 *
 * Características:
 * - Sin tarjetas, contenedores ni bordes: diseño editorial directo sobre el fondo.
 * - Desplazamiento continuo, suave y lineal (autoplay seamless loop de derecha a izquierda).
 * - Bordes con desvanecimiento gradual mediante máscara CSS (soft fading edges).
 * - Pausa suave al pasar el ratón y microinteracción hover sutil (scale 1.02, opacidad 100%).
 * - Respeto estricto a prefers-reduced-motion y sin desbordamiento horizontal.
 */

interface MediaOutlet {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  className?: string;
  url?: string;
}

const MEDIA_OUTLETS: MediaOutlet[] = [
  {
    id: 'cope',
    name: 'COPE Catalunya',
    src: '/images/media/COPE.webp',
    width: 1280,
    height: 530,
    // Ratio ~2.4:1
    className: 'h-7 sm:h-8 md:h-9 w-auto max-w-[110px] sm:max-w-[130px]',
  },
  {
    id: 'eco-sitges',
    name: 'L’Eco de Sitges',
    src: '/images/media/ECOSitges.png',
    width: 1491,
    height: 186,
    // Ratio ~8.0:1 (muy horizontal, calibrado visualmente)
    className: 'h-5 sm:h-5.5 md:h-6 w-auto max-w-[170px] sm:max-w-[210px]',
  },
  {
    id: 'tot-sant-cugat',
    name: 'TOT per Sant Cugat',
    src: '/images/media/TOT-Sant-Cugat.png',
    width: 1369,
    height: 223,
    // Ratio ~6.1:1
    className: 'h-5.5 sm:h-6 md:h-6.5 w-auto max-w-[160px] sm:max-w-[195px]',
  },
  {
    id: 'diari-sabadell',
    name: 'Diari Sabadell',
    src: '/images/media/diari-sabadell.png',
    width: 679,
    height: 367,
    // Ratio ~1.85:1
    className: 'h-7 sm:h-8 md:h-9 w-auto max-w-[100px] sm:max-w-[125px]',
  },
  {
    id: 'radio-estel',
    name: 'Ràdio Estel',
    src: '/images/media/radio-estel.png',
    width: 300,
    height: 95,
    // Ratio ~3.15:1
    className: 'h-6 sm:h-7 md:h-8 w-auto max-w-[120px] sm:max-w-[145px]',
  },
];

export function MediaStrip() {
  // Duplicamos el conjunto de 5 logos 4 veces para garantizar un bucle infinito
  // perfectamente continuo y sin interrupciones visuales en pantallas ultra-anchas.
  const repeatedOutlets = [
    ...MEDIA_OUTLETS,
    ...MEDIA_OUTLETS,
    ...MEDIA_OUTLETS,
    ...MEDIA_OUTLETS,
  ];

  return (
    <section
      id="medios"
      className="relative w-full bg-[var(--paper)] py-12 sm:py-16 border-t border-[var(--border)] overflow-hidden text-[var(--ink)]"
      aria-label="Medios de comunicación que nos han dado voz"
    >
      <div className="container-page mb-8 sm:mb-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold mb-2">
          Repercusión y difusión
        </p>
        <h2
          style={{ fontFamily: 'var(--font-editorial)' }}
          className="text-2xl sm:text-3xl text-[var(--ink)] font-normal tracking-[-0.015em]"
        >
          Nos han dado voz
        </h2>
        <p
          style={{ fontFamily: 'var(--font-body)' }}
          className="text-xs sm:text-[13.5px] text-[var(--ink-muted)] mt-1.5 max-w-md mx-auto"
        >
          Medios de comunicación que han compartido la historia y el avance de Shariani.
        </p>
      </div>

      {/* ── Contenedor del Carrusel con Máscara de Desvanecimiento Suave ── */}
      <div className="relative w-full overflow-hidden media-mask-fade media-marquee-container">
        <div
          className="animate-media-marquee flex items-center py-2 gap-14 sm:gap-20 md:gap-24 lg:gap-28 select-none"
          role="marquee"
          aria-live="off"
        >
          {repeatedOutlets.map((outlet, index) => {
            const itemKey = `${outlet.id}-${index}`;
            const content = (
              <div
                key={itemKey}
                className="shrink-0 flex items-center justify-center opacity-80 contrast-[0.98] hover:opacity-100 hover:scale-[1.02] transition-all duration-300 ease-out cursor-default"
                title={outlet.name}
              >
                <Image
                  src={outlet.src}
                  alt={outlet.name}
                  width={outlet.width}
                  height={outlet.height}
                  className={`${outlet.className} object-contain`}
                  loading="lazy"
                />
              </div>
            );

            // Si tuviese URL en el futuro, se envuelve en enlace accesible
            if (outlet.url) {
              return (
                <a
                  key={itemKey}
                  href={outlet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 focus:outline-none focus:ring-1 focus:ring-[var(--forest)] rounded"
                  aria-label={`Artículo en ${outlet.name}`}
                >
                  {content}
                </a>
              );
            }

            return content;
          })}
        </div>
      </div>
    </section>
  );
}
