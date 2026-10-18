'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { images } from '@/data/images';
import { useLang } from '@/context/LangContext';

export function ImprovementsTeaser() {
  const { lang } = useLang();
  const locale = lang.toLowerCase();

  return (
    <section
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
              UN PROJECTE QUE CREIX CADA ANY
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
              A Shariani, cada any deixa empremta.
            </h2>

            {/* Subtext */}
            <p
              className="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed mb-7 max-w-xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Tornem cada juny a Shariani per impulsar millores a l’escola i contribuir al benestar dels alumnes. Cada actuació respon a necessitats reals i dona continuïtat al nostre compromís amb la comunitat educativa.
            </p>

            {/* 2 CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 w-full sm:w-auto">
              <a
                href="#ayuda"
                className="btn-primary w-full sm:w-auto h-[48px] inline-flex items-center justify-center gap-2"
              >
                <span>Ajuda&apos;ns a continuar →</span>
              </a>

              <Link
                href={`/${locale}/obra-real`}
                className="w-full sm:w-auto h-[48px] px-6 inline-flex items-center justify-center rounded-full text-sm font-semibold text-[var(--ink)] bg-transparent border-2 border-[var(--ink)] transition-colors duration-200 hover:bg-[var(--ink)] hover:text-white"
              >
                Mira què hem aconseguit
              </Link>
            </div>

            {/* Year Chips as links */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* 2024 */}
              <Link
                href={`/${locale}/obra-real#2024`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ink)] bg-white border border-[var(--border)] cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2 transition-all"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" aria-hidden="true" />
                <span>2024 · Mobiliari i seguretat</span>
              </Link>

              {/* 2025 */}
              <Link
                href={`/${locale}/obra-real#2025`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ink)] bg-white border border-[var(--border)] cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2 transition-all"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" aria-hidden="true" />
                <span>2025 · Aules i salut</span>
              </Link>

              {/* 2026 */}
              <Link
                href={`/${locale}/obra-real#2026`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ink)] bg-white border border-[var(--border)] cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2 transition-all"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" aria-hidden="true" />
                <span>2026 · Mural i faldilles</span>
              </Link>

              {/* 2027 Upcoming */}
              <a
                href="#donar"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-amber-950 bg-amber-50/90 border-2 border-dashed border-amber-400 cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-all"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <span>2027 · Juny</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 ml-0.5 no-underline">
                  Properament
                </span>
              </a>
            </div>
          </div>

          {/* Right column: Bento grid of 4 existing photos */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-[460px] sm:h-[480px] lg:h-[500px]">

              {/* Classroom: large tile (spans 2 rows) */}
              <div className="relative sm:row-span-2 rounded-[16px] overflow-hidden bg-[var(--paper)]">
                <Image
                  src={images.classroom.src}
                  alt={images.classroom.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-black/65 backdrop-blur-md text-white text-xs">
                  <span className="font-bold">+100</span>
                  <span className="text-white/90">cadires</span>
                </div>
              </div>

              {/* Right half: medium tile + 2 small tiles */}
              <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:row-span-2">

                {/* Community building: medium tile (spans 2 cols) */}
                <div className="relative col-span-2 rounded-[16px] overflow-hidden bg-[var(--paper)]">
                  <Image
                    src={images.colaborarOngs.src}
                    alt={images.colaborarOngs.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 z-10 inline-flex items-center px-2.5 py-1 rounded-[8px] bg-black/65 backdrop-blur-md text-white text-xs font-semibold">
                    Fusters i paletes de Kilifi
                  </div>
                </div>

                {/* Fence: small tile */}
                <div className="relative col-span-1 rounded-[16px] overflow-hidden bg-[var(--paper)]">
                  <Image
                    src={images.fase3_1.src}
                    alt={images.fase3_1.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-black/65 backdrop-blur-md text-white text-xs">
                    <span className="font-bold">500 m</span>
                    <span className="text-white/90">de tanca</span>
                  </div>
                </div>

                {/* Children drinking / cups: small tile */}
                <div className="relative col-span-1 rounded-[16px] overflow-hidden bg-[var(--paper)]">
                  <Image
                    src={images.heroSchool.src}
                    alt={images.heroSchool.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-black/65 backdrop-blur-md text-white text-xs">
                    <span className="font-bold">300</span>
                    <span className="text-white/90">faldilles</span>
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
