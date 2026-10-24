'use client';

import Link from 'next/link';
import Image from 'next/image';
import { images } from '@/data/images';
import { useLang } from '@/context/LangContext';

export function ImprovementsTeaser() {
  const { lang, tr } = useLang();
  const locale = lang.toLowerCase();
  const tImp = tr.improvements;

  return (
    <section
      id="obras"
      className="py-16 md:py-24 border-t border-[var(--border)] overflow-hidden"
      style={{ background: 'var(--paper)' }}
      aria-labelledby="obra-real-title"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left column: eyebrow, headline, subtext, 2 CTAs, year chips */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow */}
            <p className="section-label mb-3 text-[var(--forest)] font-semibold tracking-wider">
              {tImp.teaserEyebrow}
            </p>

            {/* Headline */}
            <h2
              id="obra-real-title"
              className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-normal text-[var(--ink)] leading-[1.12] tracking-tight mb-4"
              style={{
                fontFamily: 'var(--font-editorial)',
                textWrap: 'balance',
                hyphens: 'none',
              }}
            >
              {tImp.teaserHeadline}
            </h2>

            {/* Subtext */}
            <p
              className="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed mb-7 max-w-xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {tImp.teaserSubtext}
            </p>

            {/* 2 CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 w-full sm:w-auto">
              <a
                href="#donar"
                className="btn-primary w-full sm:w-auto h-[48px] inline-flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(24,110,215,0.28)] hover:shadow-[0_4px_18px_rgba(24,110,215,0.4)]"
              >
                <span>{tImp.teaserCtaHelp}</span>
              </a>

              <Link
                href={`/${locale}/obra-real`}
                className="w-full sm:w-auto h-[48px] px-6 inline-flex items-center justify-center rounded-full text-sm font-semibold text-[var(--ink)] bg-white hover:bg-[var(--ink)] hover:text-white border border-[var(--border)] hover:border-[var(--ink)] shadow-xs transition-all duration-200"
              >
                {tImp.teaserCtaWorks}
              </Link>
            </div>

            {/* Year Chips as links (minimalist timeline pills with characteristic blue microdots) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* 2023 */}
              <Link
                href={`/${locale}/obra-real#2023`}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--ink)] bg-white hover:bg-[var(--paper)] border border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[var(--forest)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2 transition-all duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)] shrink-0 transition-transform duration-200 group-hover:scale-125" aria-hidden="true" />
                <span>{tImp.chip2023}</span>
              </Link>

              {/* 2024 */}
              <Link
                href={`/${locale}/obra-real#2024`}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--ink)] bg-white hover:bg-[var(--paper)] border border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[var(--forest)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2 transition-all duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)] shrink-0 transition-transform duration-200 group-hover:scale-125" aria-hidden="true" />
                <span>{tImp.chip2024}</span>
              </Link>

              {/* 2025 */}
              <Link
                href={`/${locale}/obra-real#2025`}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--ink)] bg-white hover:bg-[var(--paper)] border border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[var(--forest)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2 transition-all duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)] shrink-0 transition-transform duration-200 group-hover:scale-125" aria-hidden="true" />
                <span>{tImp.chip2025}</span>
              </Link>

              {/* 2026 */}
              <Link
                href={`/${locale}/obra-real#2026`}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--ink)] bg-white hover:bg-[var(--paper)] border border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[var(--forest)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2 transition-all duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)] shrink-0 transition-transform duration-200 group-hover:scale-125" aria-hidden="true" />
                <span>{tImp.chip2026}</span>
              </Link>

              {/* 2027 Upcoming */}
              <a
                href="#donar"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-950 bg-amber-50/90 border border-amber-300/80 shadow-[0_1px_3px_rgba(196,131,42,0.1)] hover:bg-amber-100/90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-all duration-200"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <span>{tImp.chip2027}</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 ml-0.5">
                  {tImp.badgeUpcoming}
                </span>
              </a>
            </div>
          </div>

          {/* Right column: Bento grid of 4 existing photos with editorial frosted capsules and subtle zoom */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-[460px] sm:h-[480px] lg:h-[500px]">

              {/* School desks: large tile (spans 2 rows) */}
              <div className="group relative sm:row-span-2 rounded-2xl overflow-hidden bg-[var(--paper)] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.04]">
                <Image
                  src={images.fase1Mesas.src}
                  alt={images.fase1Mesas.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/75" />
                <div className="absolute bottom-3.5 left-3.5 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl bg-black/45 border border-white/20 text-white text-xs shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:translate-y-[-2px]">
                  <span className="font-bold text-white tracking-tight">+30</span>
                  <span className="text-white/85 text-[11.5px]">
                    {tImp.desksLabel}
                  </span>
                </div>
              </div>

              {/* Right half: medium tile + 2 small tiles */}
              <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:row-span-2">

                {/* Oral hygiene: medium tile (spans 2 cols) */}
                <div className="group relative col-span-2 rounded-2xl overflow-hidden bg-[var(--paper)] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.04]">
                  <Image
                    src={images.higieneBucal.src}
                    alt={images.higieneBucal.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/75" />
                  <div className="absolute bottom-3.5 left-3.5 z-10 inline-flex items-center px-3 py-1.5 rounded-full backdrop-blur-xl bg-black/45 border border-white/20 text-white text-xs font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:translate-y-[-2px]">
                    <span className="text-white/90 text-[11.5px]">{tImp.hygieneLabel}</span>
                  </div>
                </div>

                {/* Fence: small tile */}
                <div className="group relative col-span-1 rounded-2xl overflow-hidden bg-[var(--paper)] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.04]">
                  <Image
                    src={images.fase3_1.src}
                    alt={images.fase3_1.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/75" />
                  <div className="absolute bottom-3.5 left-3.5 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl bg-black/45 border border-white/20 text-white text-xs shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:translate-y-[-2px]">
                    <span className="font-bold text-white tracking-tight">500 m</span>
                    <span className="text-white/85 text-[11.5px]">
                      {tImp.fenceLabel}
                    </span>
                  </div>
                </div>

                {/* 300 skirts: small tile */}
                <div className="group relative col-span-1 rounded-2xl overflow-hidden bg-[var(--paper)] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.04]">
                  <Image
                    src={images.ninaFalda.src}
                    alt={images.ninaFalda.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/75" />
                  <div className="absolute bottom-3.5 left-3.5 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl bg-black/45 border border-white/20 text-white text-xs shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:translate-y-[-2px]">
                    <span className="font-bold text-white tracking-tight">300</span>
                    <span className="text-white/85 text-[11.5px]">
                      {tImp.skirtsLabel}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
