'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { DONATION_CONFIG } from '@/data/donationConfig';
import {
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Info,
  Share2,
} from 'lucide-react';

export function HowToHelp() {
  const { lang, tr } = useLang();
  const d = tr.donar;

  // ── States ───────────────────────────────────────────────────────────────
  const [copiedBizum, setCopiedBizum] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPhotoCaption, setShowPhotoCaption] = useState(false);
  const [scaleChip, setScaleChip] = useState<string>('cafe');
  const [sourceOpen, setSourceOpen] = useState(false);
  const [tooltipMethod, setTooltipMethod] = useState<string | null>(null);

  // ── Intersection Observer for animations ─────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const quotesRef = useRef<HTMLDivElement>(null);
  const [quotesVisible, setQuotesVisible] = useState(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionEl);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const qEl = quotesRef.current;
    if (!qEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setQuotesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(qEl);

    return () => observer.disconnect();
  }, []);

  // Close tooltips / popovers on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSourceOpen(false);
        setTooltipMethod(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // ── Copy Bizum Code ──────────────────────────────────────────────────────
  const handleCopyBizum = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(DONATION_CONFIG.bizumCode);
    }
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // Safe fallback if vibrating not supported
      }
    }
    setCopiedBizum(true);
    setTimeout(() => setCopiedBizum(false), 1800);
  };

  // ── Voices data ──────────────────────────────────────────────────────────
  const mainVoice = DONATION_CONFIG.voices.find((v) => v.role === 'teacher');
  const additionalVoices = DONATION_CONFIG.voices.filter((v) => v.role !== 'teacher');

  const mainVoiceText =
    lang === 'ES'
      ? mainVoice?.textES
      : lang === 'EN'
      ? mainVoice?.textEN
      : mainVoice?.textCA;

  const mainVoiceAttribution =
    lang === 'ES'
      ? mainVoice?.attributionES
      : lang === 'EN'
      ? mainVoice?.attributionEN
      : mainVoice?.attributionCA;

  // ── Scale Calculation ───────────────────────────────────────────────────
  const hasScale =
    DONATION_CONFIG.mealCostEUR !== null && DONATION_CONFIG.mealCostEUR > 0;

  const getEquivalenceText = (chipVal: string): string => {
    if (
      DONATION_CONFIG.EQUIVALENCES &&
      DONATION_CONFIG.EQUIVALENCES[chipVal]
    ) {
      const eq = DONATION_CONFIG.EQUIVALENCES[chipVal];
      return lang === 'ES' ? eq.es : lang === 'EN' ? eq.en : eq.ca;
    }
    const cost = DONATION_CONFIG.mealCostEUR ?? 0.3;
    if (chipVal === '1') {
      const count = Math.round(1 / cost);
      return lang === 'ES'
        ? `1 € son unos ${count} almuerzos escolares.`
        : lang === 'EN'
        ? `1 € is around ${count} school lunches.`
        : `1 € són uns ${count} dinars escolars.`;
    }
    if (chipVal === 'cafe') {
      const count = Math.round(1.5 / cost);
      return lang === 'ES'
        ? `El precio de un café (1,50 €) equivale a unos ${count} almuerzos escolares.`
        : lang === 'EN'
        ? `The cost of a coffee (€1.50) equals around ${count} school lunches.`
        : `El preu d'un cafè (1,50 €) equival a uns ${count} dinars escolars.`;
    }
    if (chipVal === '10') {
      const count = Math.round(10 / cost);
      return lang === 'ES'
        ? `10 € equivalen a unos ${count} almuerzos escolares.`
        : lang === 'EN'
        ? `10 € equivalen a uns ${count} dinars escolars.`
        : `10 € equals around ${count} school lunches.`;
    }
    if (chipVal === '50') {
      const count = Math.round(50 / cost);
      return lang === 'ES'
        ? `50 € equivalen a unos ${count} almuerzos escolares para los alumnos.`
        : lang === 'EN'
        ? `50 € equals around ${count} school lunches for students.`
        : `50 € equivalen a uns ${count} dinars escolars per als alumnes.`;
    }
    if (chipVal === 'monthly1') {
      const annualCount = Math.round(12 / cost);
      return lang === 'ES'
        ? `1 € al mes son 12 € al año, equivalentes a unos ${annualCount} almuerzos escolares.`
        : lang === 'EN'
        ? `1 € a month is 12 € a year, equal to around ${annualCount} school lunches.`
        : `1 € al mes són 12 € a l'any, equivalents a uns ${annualCount} dinars escolars.`;
    }
    return '';
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(d.shareText)}`;

  return (
    <section
      ref={sectionRef}
      id="donar"
      style={{ background: 'var(--forest-dark)' }}
      className="relative w-full py-20 md:py-28 text-[var(--ivory)] overflow-hidden"
      aria-labelledby="donar-heading"
    >
      {/* Legacy anchor compatibility */}
      <span id="ayuda" className="absolute -top-20" aria-hidden="true" />

      <div className="container-page max-w-5xl">
        {/* ────────────────────────────────────────────────────────────────
            1. OPENING MOMENT (Emotional hook, no form, no buttons yet)
           ──────────────────────────────────────────────────────────────── */}
        <div
          className={`grid grid-cols-1 ${
            DONATION_CONFIG.HERO_PHOTO?.src && DONATION_CONFIG.HERO_PHOTO?.authorized
              ? 'lg:grid-cols-12 gap-10 lg:gap-14'
              : ''
          } items-center mb-16 md:mb-20 transition-all duration-600 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
            isSectionVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div
            className={
              DONATION_CONFIG.HERO_PHOTO?.src && DONATION_CONFIG.HERO_PHOTO?.authorized
                ? 'lg:col-span-7'
                : 'max-w-3xl'
            }
          >
            <p
              className="section-label mb-3 font-semibold tracking-widest text-[#E8A84A]"
              style={{ fontSize: '0.72rem' }}
            >
              {d.eyebrow}
            </p>
            <h2
              id="donar-heading"
              className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.12] text-[var(--ivory)] tracking-tight mb-5"
              style={{
                fontFamily: 'var(--font-editorial)',
                textWrap: 'balance',
                hyphens: 'none',
              }}
            >
              {d.h2}
            </h2>
            <p
              className="text-base sm:text-lg text-white/85 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {d.sub}
            </p>
          </div>

          {/* Large Hero Photo (rendered ONLY if src is provided and authorized) */}
          {DONATION_CONFIG.HERO_PHOTO?.src &&
            DONATION_CONFIG.HERO_PHOTO?.authorized && (
              <figure
                className="lg:col-span-5 relative group overflow-hidden rounded-2xl cursor-pointer"
                onClick={() => setShowPhotoCaption(!showPhotoCaption)}
                onMouseEnter={() => setShowPhotoCaption(true)}
                onMouseLeave={() => setShowPhotoCaption(false)}
                style={{
                  clipPath: isSectionVisible
                    ? 'inset(0 0 0 0)'
                    : 'inset(0 100% 0 0)',
                  transition: 'clip-path 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                  aspectRatio: '4/3',
                }}
              >
                <Image
                  src={DONATION_CONFIG.HERO_PHOTO.src}
                  alt={DONATION_CONFIG.HERO_PHOTO.alt || ''}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                {DONATION_CONFIG.HERO_PHOTO.line && (
                  <figcaption
                    className={`absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-xs text-white/90 transition-all duration-300 ease-out ${
                      showPhotoCaption
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-1.5 opacity-0'
                    }`}
                  >
                    {DONATION_CONFIG.HERO_PHOTO.line}
                  </figcaption>
                )}
              </figure>
            )}
        </div>

        {/* ────────────────────────────────────────────────────────────────
            2. VOICES (Quote block with thin accent line)
           ──────────────────────────────────────────────────────────────── */}
        {mainVoice && (
          <div
            ref={quotesRef}
            className="mb-16 md:mb-20 pt-6 border-t border-white/15 relative"
          >
            {/* 300ms line draw above */}
            <div
              className="absolute top-0 left-0 h-[2px] bg-[#E8A84A] transition-transform duration-300 origin-left"
              style={{
                width: '120px',
                transform: quotesVisible ? 'scaleX(1)' : 'scaleX(0)',
              }}
              aria-hidden="true"
            />

            <p className="text-[11px] uppercase tracking-wider font-semibold text-white/60 mb-4">
              {d.voicesLabel}
            </p>

            <blockquote
              className={`max-w-3xl transition-all duration-500 delay-80 ${
                quotesVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              <p
                className="text-lg sm:text-xl lg:text-2xl leading-relaxed italic text-white/95 mb-3"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                «{mainVoiceText}»
              </p>
              <cite className="not-italic text-xs sm:text-sm text-white/70 font-semibold tracking-wide block">
                {mainVoice.name} · {mainVoiceAttribution}
              </cite>
            </blockquote>

            {/* Optional secondary voices */}
            {additionalVoices.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/10">
                {additionalVoices.map((v, i) => {
                  const text =
                    lang === 'ES' ? v.textES : lang === 'EN' ? v.textEN : v.textCA;
                  const attr =
                    lang === 'ES'
                      ? v.attributionES
                      : lang === 'EN'
                      ? v.attributionEN
                      : v.attributionCA;
                  return (
                    <blockquote
                      key={i}
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      {v.photo && v.authorized && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/20">
                          <Image
                            src={v.photo}
                            alt={v.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p
                          className="text-sm italic text-white/90 mb-1.5 leading-snug"
                          style={{ fontFamily: 'var(--font-editorial)' }}
                        >
                          «{text}»
                        </p>
                        <cite className="not-italic text-xs text-white/65 font-medium block">
                          {v.name} · {attr}
                        </cite>
                      </div>
                    </blockquote>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────────
            3. SCALE (Calm comparison, hidden if mealCostEUR is null)
           ──────────────────────────────────────────────────────────────── */}
        {hasScale && (
          <div className="mb-16 md:mb-20 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xs">
            <h3
              className="text-xl sm:text-2xl font-normal text-[var(--ivory)] mb-3 leading-snug"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              {d.scaleH3}
            </h3>
            <p
              className="text-xs sm:text-sm text-white/75 leading-relaxed mb-6 max-w-2xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {d.scaleNote}
            </p>

            {/* Interactive chips */}
            <div className="flex flex-wrap gap-2.5 mb-4" role="tablist">
              {d.scaleChips.map((chip) => {
                const active = scaleChip === chip.value;
                return (
                  <button
                    key={chip.value}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setScaleChip(chip.value)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer min-h-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#E8A84A] ${
                      active
                        ? 'bg-[#E8A84A] text-amber-950 shadow-md font-bold'
                        : 'bg-white/10 text-white hover:bg-white/15'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* Equivalence result line with crossfade */}
            <div className="min-h-[28px] flex items-center text-sm sm:text-base font-semibold text-white/95">
              <span className="transition-all duration-200 ease-out">
                {getEquivalenceText(scaleChip)}
              </span>
            </div>

            {/* Approximate note & source popover */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/60">
              <span>
                {d.scaleApprox}{' '}
                {DONATION_CONFIG.updatedAt || new Date().getFullYear().toString()}
              </span>
              {DONATION_CONFIG.sourceNote && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSourceOpen(!sourceOpen)}
                    className="inline-flex items-center gap-1 text-[#E8A84A] hover:underline cursor-pointer"
                  >
                    <Info size={12} />
                    <span>{d.scaleSourceBtn}</span>
                  </button>
                  {sourceOpen && (
                    <div
                      role="dialog"
                      aria-label={d.scaleSourceBtn}
                      className="absolute right-0 bottom-full mb-2 p-3.5 rounded-xl bg-stone-900 border border-white/20 text-xs text-white/90 shadow-xl w-64 z-20"
                    >
                      <p className="leading-relaxed mb-2">
                        {DONATION_CONFIG.sourceNote}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSourceOpen(false)}
                        className="text-[11px] text-[#E8A84A] hover:underline font-semibold"
                      >
                        {d.scaleSourceClose}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────────
            4. CHOOSE HOW TO HELP (Three paths as large, distinct rows)
           ──────────────────────────────────────────────────────────────── */}
        <div className="mb-16 md:mb-20">
          <h3
            className="text-2xl sm:text-3xl font-normal text-[var(--ivory)] mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            {d.chooseH3}
          </h3>

          <div className="flex flex-col gap-4 sm:gap-5">
            {/* ── Path A: Bizum ───────────────────────────────────────── */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm overflow-hidden group transition-all duration-200">
              {/* 4px amber bar grows top-to-bottom on left on hover/focus */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 bg-[#E8A84A] scale-y-0 group-hover:scale-y-100 group-focus-within:scale-y-100 origin-top transition-transform duration-250 ease-out"
                aria-hidden="true"
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {d.bizumTitle}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/15 text-white/90 font-medium">
                      {d.bizumLabel}
                    </span>
                    {DONATION_CONFIG.deductible.bizum && (
                      <div className="relative inline-block">
                        <button
                          type="button"
                          onMouseEnter={() => setTooltipMethod('bizum')}
                          onMouseLeave={() => setTooltipMethod(null)}
                          onClick={() =>
                            setTooltipMethod(
                              tooltipMethod === 'bizum' ? null : 'bizum'
                            )
                          }
                          className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 cursor-pointer font-semibold"
                        >
                          {d.desgravaBadge}
                        </button>
                        {tooltipMethod === 'bizum' && (
                          <div className="absolute left-0 top-full mt-1.5 p-2 rounded-lg bg-stone-900 border border-white/20 text-[11px] text-white/90 z-20 w-48 shadow-lg">
                            {d.desgravaTooltip}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Plain steps list */}
                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-white/80 my-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <dt className="text-[10px] uppercase font-semibold text-white/50 mb-0.5">
                        {d.bizumStep1}
                      </dt>
                      <dd className="font-medium text-white/90">
                        {d.bizumStep1}
                      </dd>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <dt className="text-[10px] uppercase font-semibold text-white/50 mb-0.5">
                        {d.bizumStep2}
                      </dt>
                      <dd className="font-mono font-bold text-white text-sm">
                        {DONATION_CONFIG.bizumCode}
                      </dd>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <dt className="text-[10px] uppercase font-semibold text-white/50 mb-0.5">
                        {d.bizumStep3}
                      </dt>
                      <dd className="font-medium text-white/90">
                        La Vall x Shariani
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Right: Big copyable code & button */}
                <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyBizum}
                    aria-live="polite"
                    className="h-12 px-6 rounded-full inline-flex items-center justify-center gap-2 font-bold text-sm cursor-pointer transition-all duration-120 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#E8A84A] focus-visible:outline-offset-2 min-h-[44px]"
                    style={{
                      background: copiedBizum ? '#34D399' : '#E8A84A',
                      color: copiedBizum ? '#064E3B' : '#451A03',
                    }}
                  >
                    {copiedBizum ? (
                      <>
                        <Check size={16} strokeWidth={2.5} />
                        <span>{d.bizumCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={15} />
                        <span>
                          {d.bizumCopy} ({DONATION_CONFIG.bizumCode})
                        </span>
                      </>
                    )}
                  </button>

                  {/* QR on desktop if set */}
                  {DONATION_CONFIG.bizumQr && (
                    <div className="hidden lg:block relative w-20 h-20 rounded-lg overflow-hidden border border-white/20 bg-white p-1">
                      <Image
                        src={DONATION_CONFIG.bizumQr}
                        alt={d.bizumQrAlt}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Path B: iHelp / Micromecenazgo ──────────────────────── */}
            <div
              className={`relative p-6 sm:p-7 rounded-2xl backdrop-blur-sm overflow-hidden group transition-all duration-200 ${
                DONATION_CONFIG.ihelpUrl
                  ? 'bg-white/10 border border-white/15'
                  : 'bg-white/5 border border-dashed border-white/25'
              }`}
            >
              {DONATION_CONFIG.ihelpUrl && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#E8A84A] scale-y-0 group-hover:scale-y-100 group-focus-within:scale-y-100 origin-top transition-transform duration-250 ease-out"
                  aria-hidden="true"
                />
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {d.ihelpTitle}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/15 text-white/90 font-medium">
                      {d.ihelpLabel}
                    </span>
                    {DONATION_CONFIG.deductible.ihelp && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-semibold">
                        {d.desgravaBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
                    {d.ihelpDesc}
                  </p>
                </div>

                <div className="shrink-0 flex items-center">
                  {DONATION_CONFIG.ihelpUrl ? (
                    <a
                      href={DONATION_CONFIG.ihelpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 px-6 rounded-full inline-flex items-center justify-center gap-2 font-bold text-sm text-amber-950 transition-all duration-120 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#E8A84A] focus-visible:outline-offset-2 min-h-[44px] group-hover:shadow-lg"
                      style={{ background: '#E8A84A' }}
                    >
                      <span>{d.ihelpBtn}</span>
                      <ExternalLink
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>
                  ) : (
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        {d.ihelpSoon}
                      </span>
                      <a
                        href="mailto:info@lavall.es?subject=Aviso%20iHelp%20Shariani"
                        className="text-xs text-[#E8A84A] hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>{d.ihelpNotify}</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Path C: Teaming ──────────────────────────────────────── */}
            <div
              className={`relative p-6 sm:p-7 rounded-2xl backdrop-blur-sm overflow-hidden group transition-all duration-200 ${
                DONATION_CONFIG.teamingUrl
                  ? 'bg-white/10 border border-white/15'
                  : 'bg-white/5 border border-dashed border-white/25'
              }`}
            >
              {DONATION_CONFIG.teamingUrl && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#E8A84A] scale-y-0 group-hover:scale-y-100 group-focus-within:scale-y-100 origin-top transition-transform duration-250 ease-out"
                  aria-hidden="true"
                />
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {d.teamingTitle}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/15 text-white/90 font-medium">
                      {d.teamingLabel}
                    </span>
                    {DONATION_CONFIG.deductible.teaming && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-semibold">
                        {d.desgravaBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-amber-300 mb-1">
                    {d.teamingLine}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
                    {d.teamingDesc}
                  </p>
                </div>

                <div className="shrink-0 flex items-center">
                  {DONATION_CONFIG.teamingUrl ? (
                    <a
                      href={DONATION_CONFIG.teamingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 px-6 rounded-full inline-flex items-center justify-center gap-2 font-bold text-sm text-amber-950 transition-all duration-120 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#E8A84A] focus-visible:outline-offset-2 min-h-[44px] group-hover:shadow-lg"
                      style={{ background: '#E8A84A' }}
                    >
                      <span>{d.teamingBtn}</span>
                      <ExternalLink
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>
                  ) : (
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        {d.teamingSoon}
                      </span>
                      <a
                        href="mailto:info@lavall.es?subject=Aviso%20Teaming%20Shariani"
                        className="text-xs text-[#E8A84A] hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>{d.teamingNotify}</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────────
            5. AND AFTER (Promise, rendered ONLY if promiseEnabled is true)
           ──────────────────────────────────────────────────────────────── */}
        {DONATION_CONFIG.promiseEnabled && (
          <div className="mb-16 md:mb-20 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/15">
            <h3
              className="text-xl sm:text-2xl font-normal text-white mb-2.5"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              {d.promiseH3}
            </h3>
            <p className="text-sm text-white/85 leading-relaxed max-w-2xl">
              {d.promiseBody}
            </p>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────────
            6. FAQ (Max 3 questions)
           ──────────────────────────────────────────────────────────────── */}
        <div className="mb-12 border-t border-white/15 pt-8">
          <h3
            className="text-xl sm:text-2xl font-normal text-white mb-6"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            {d.faqH3}
          </h3>

          <div className="divide-y divide-white/15 border-b border-white/15">
            {d.faq.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#E8A84A]"
                  >
                    <span className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-white/70 shrink-0 transition-transform duration-250 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      role="region"
                      className="pt-3 pb-2 text-sm text-white/85 leading-relaxed"
                    >
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────────
            7. WHATSAPP SHARE
           ──────────────────────────────────────────────────────────────── */}
        <div className="text-center pt-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
          >
            <Share2 size={13} />
            <span>{d.shareLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
