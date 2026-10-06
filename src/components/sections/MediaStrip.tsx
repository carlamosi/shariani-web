'use client';

import Image from 'next/image';
import { useLang } from '@/context/LangContext';

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
    className: 'h-7 sm:h-8 md:h-9 w-auto max-w-[110px] sm:max-w-[130px]',
  },
  {
    id: 'eco-sitges',
    name: "L'Eco de Sitges",
    src: '/images/media/ECOSitges.png',
    width: 1491,
    height: 186,
    className: 'h-5 sm:h-5.5 md:h-6 w-auto max-w-[170px] sm:max-w-[210px]',
  },
  {
    id: 'tot-sant-cugat',
    name: 'TOT per Sant Cugat',
    src: '/images/media/TOT-Sant-Cugat.png',
    width: 1369,
    height: 223,
    className: 'h-5.5 sm:h-6 md:h-6.5 w-auto max-w-[160px] sm:max-w-[195px]',
    url: 'https://www.totsantcugat.cat/actualitat/educacio/aules-vall-africa-projecte-compromis-social-lideratge-etic_2200113102.html',
  },
  {
    id: 'diari-sabadell',
    name: 'Diari Sabadell',
    src: '/images/media/diari-sabadell.png',
    width: 679,
    height: 367,
    className: 'h-7 sm:h-8 md:h-9 w-auto max-w-[100px] sm:max-w-[125px]',
    url: 'https://www.diaridesabadell.com/valles/viatge-kenia-la-vall-voluntariat-escola.html',
  },
  {
    id: 'radio-estel',
    name: 'Ràdio Estel',
    src: '/images/media/radio-estel.png',
    width: 300,
    height: 95,
    className: 'h-6 sm:h-7 md:h-8 w-auto max-w-[120px] sm:max-w-[145px]',
    url: 'https://www.radioestel.cat/programes/sense-distancia/',
  },
];

export function MediaStrip() {
  const { tr } = useLang();
  const repeatedOutlets = [
    ...MEDIA_OUTLETS,
    ...MEDIA_OUTLETS,
    ...MEDIA_OUTLETS,
    ...MEDIA_OUTLETS,
  ];

  return (
    <section
      id="medios"
      className="relative w-full bg-[var(--ivory)] py-12 sm:py-16 border-t border-[var(--border)] overflow-hidden text-[var(--ink)]"
      aria-label={tr.media.ariaLabel}
    >
      <div className="container-page mb-8 sm:mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)]" />
          <p className="section-label text-[var(--forest-mid)]">
            {tr.media.sectionLabel}
          </p>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(19px, 2.6vw, 32px)',
          }}
          className="text-[var(--ink)] font-normal tracking-[-0.02em] whitespace-nowrap text-center overflow-hidden text-ellipsis"
        >
          {tr.media.heading}
        </h2>

        <p
          style={{ fontFamily: 'var(--font-body)' }}
          className="text-xs sm:text-[13.5px] text-[var(--ink-muted)] mt-2 max-w-lg mx-auto"
        >
          {tr.media.sub}
        </p>
      </div>

      <div className="relative w-full overflow-hidden media-mask-fade media-marquee-container">
        <div
          className="animate-media-marquee flex items-center py-2 gap-14 sm:gap-20 md:gap-24 lg:gap-28 select-none"
          role="marquee"
          aria-live="off"
        >
          {repeatedOutlets.map((outlet, index) => {
            const itemKey = `${outlet.id}-${index}`;

            const logoImg = (
              <Image
                src={outlet.src}
                alt={outlet.name}
                width={outlet.width}
                height={outlet.height}
                className={`${outlet.className} object-contain`}
                loading="lazy"
              />
            );

            if (outlet.url) {
              return (
                <a
                  key={itemKey}
                  href={outlet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={outlet.name}
                  className="shrink-0 flex items-center justify-center opacity-80 contrast-[0.98] hover:opacity-100 hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--forest)] rounded"
                  aria-label={tr.media.articleIn(outlet.name)}
                >
                  {logoImg}
                </a>
              );
            }

            return (
              <div
                key={itemKey}
                className="shrink-0 flex items-center justify-center opacity-80 contrast-[0.98] cursor-default"
                title={outlet.name}
              >
                {logoImg}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
