'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { DONATION_CONFIG } from '@/data/donationConfig';

export function HowToHelp() {
  const { tr } = useLang();
  const d = tr.donar;

  // ── Bizum Copy State & Feedback ──────────────────────────────────────────
  const [bizumCopied, setBizumCopied] = useState(false);
  const [bizumError, setBizumError] = useState(false);

  const handleCopyBizum = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(DONATION_CONFIG.bizumCode);
        setBizumCopied(true);
        setBizumError(false);
        if ('vibrate' in navigator) {
          try {
            navigator.vibrate(10);
          } catch {
            // Safe fallback
          }
        }
        setTimeout(() => setBizumCopied(false), 1600);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      setBizumError(true);
      setTimeout(() => setBizumError(false), 3000);
    }
  };

  // ── Microinteraction 4: Headline Reveal on Scroll ────────────────────────
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Microinteraction 4: Teacher Quote Reveal on Scroll ───────────────────
  const quoteRef = useRef<HTMLDivElement>(null);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setQuoteVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Microinteraction 3: Photo Caption Subtle One-Time Fade-in ────────────
  const captionRef = useRef<HTMLElement>(null);
  const [captionVisible, setCaptionVisible] = useState(false);

  useEffect(() => {
    const el = captionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCaptionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="donar"
      style={{ background: 'var(--forest-dark)' }}
      className="relative w-full py-16 md:py-24 text-[var(--ivory)] overflow-visible"
      aria-labelledby="donar-heading"
    >
      {/* Legacy anchor compatibility */}
      <span id="ayuda" className="absolute -top-20" aria-hidden="true" />

      <div className="container-page max-w-4xl">
        {/* ── 1. Headline at the top, left aligned ───────────────────────── */}
        <div
          ref={headerRef}
          className="max-w-xl mb-12 md:mb-16 overflow-visible"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(12px)',
            transition:
              'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2
            id="donar-heading"
            className="text-3xl sm:text-4xl lg:text-[40px] font-normal leading-[1.15] text-[var(--ivory)] tracking-tight mb-4 overflow-visible"
            style={{
              fontFamily: 'var(--font-editorial)',
              paddingTop: '0.05em',
              paddingBottom: '0.05em',
            }}
          >
            {d.headline}
          </h2>
          <p
            className="text-sm sm:text-base text-white/80 leading-relaxed max-w-lg"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {d.supporting}
          </p>
        </div>

        {/* ── 2. Asymmetric Two-Column Layout (Desktop) / Stacked (Mobile) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-14 md:mb-18">
          {/* ── LEFT: Bizum, occupying the full column ──────────────────── */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Method Title with Microinteraction 2 (6px shift + 2px amber underline) */}
              <div className="group inline-flex flex-col items-start mb-6">
                <h3
                  className="text-xl sm:text-2xl font-normal text-[var(--ivory)] transition-transform duration-250 ease-out group-hover:translate-x-[6px] motion-reduce:transform-none"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {d.bizumTitle}
                </h3>
                <span
                  className="h-[2px] bg-[#E8A84A] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-left motion-reduce:scale-x-100"
                  aria-hidden="true"
                />
              </div>

              {/* Large serif typography for 03367 with click-to-copy interaction */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleCopyBizum}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCopyBizum();
                    }
                  }}
                  className="group inline-flex flex-col items-start cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#E8A84A] focus-visible:outline-offset-4 rounded-sm"
                  aria-label={`Bizum ${DONATION_CONFIG.bizumCode}. ${
                    bizumCopied ? d.bizumCopied : d.bizumTapToCopy
                  }`}
                >
                  <span
                    className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[var(--ivory)] group-hover:text-amber-300 transition-colors duration-200 select-all"
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      lineHeight: 1.05,
                    }}
                  >
                    {DONATION_CONFIG.bizumCode}
                  </span>

                  <span
                    aria-live="polite"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-300 mt-2 font-medium"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {bizumCopied ? (
                      <>
                        <Check size={14} strokeWidth={2.5} className="text-emerald-300" />
                        <span className="text-emerald-300 font-semibold">
                          {d.bizumCopied}
                        </span>
                      </>
                    ) : bizumError ? (
                      <span className="text-rose-300">{d.bizumError}</span>
                    ) : (
                      <span className="text-white/60 group-hover:text-amber-300 underline underline-offset-4 transition-colors">
                        {d.bizumTapToCopy}
                      </span>
                    )}
                  </span>
                </button>
              </div>

              {/* Explanation of how to donate */}
              <p
                className="text-sm sm:text-base text-white/80 leading-relaxed mb-5 max-w-lg"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {d.bizumExplanation}
              </p>

              {/* Concept clearly displayed */}
              <div
                className="text-sm sm:text-base text-white/90 pt-3 border-t border-white/10"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span className="text-white/60 mr-2 font-normal">
                  {d.bizumConceptLabel}
                </span>
                <span className="font-semibold text-white tracking-wide">
                  {d.bizumConceptValue}
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: iHelp (Top) and Teaming (Bottom) ──────────── */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {/* RIGHT, TOP: iHelp */}
            <div>
              <div className="group inline-flex flex-col items-start mb-3">
                <h3
                  className="text-xl sm:text-2xl font-normal text-[var(--ivory)] transition-transform duration-250 ease-out group-hover:translate-x-[6px] motion-reduce:transform-none"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {d.ihelpTitle}
                </h3>
                <span
                  className="h-[2px] bg-[#E8A84A] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-left motion-reduce:scale-x-100"
                  aria-hidden="true"
                />
              </div>

              <p
                className="text-sm sm:text-base text-white/80 leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {d.ihelpDesc}
              </p>

              {DONATION_CONFIG.ihelpUrl ? (
                <a
                  href={DONATION_CONFIG.ihelpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-white hover:text-amber-300 underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-[#E8A84A]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <span>{d.ihelpLink}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              ) : (
                <span
                  className="text-sm text-white/50 italic"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {d.ihelpSoon}
                </span>
              )}
            </div>

            {/* Thin horizontal rule separating iHelp and Teaming */}
            <hr className="border-0 border-t border-white/15 my-8 sm:my-10 w-full" />

            {/* RIGHT, BOTTOM: Teaming */}
            <div>
              <div className="group inline-flex flex-col items-start mb-3">
                <h3
                  className="text-xl sm:text-2xl font-normal text-[var(--ivory)] transition-transform duration-250 ease-out group-hover:translate-x-[6px] motion-reduce:transform-none"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {d.teamingTitle}
                </h3>
                <span
                  className="h-[2px] bg-[#E8A84A] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-left motion-reduce:scale-x-100"
                  aria-hidden="true"
                />
              </div>

              <p
                className="text-sm sm:text-base text-white/80 leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {d.teamingExplanation}
              </p>

              {/* The single amber primary button of the section */}
              {DONATION_CONFIG.teamingUrl ? (
                <a
                  href={DONATION_CONFIG.teamingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-bold text-sm sm:text-base px-7 py-3 rounded-full cursor-pointer transition-transform duration-120 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#E8A84A] focus-visible:outline-offset-2 motion-reduce:transform-none"
                  style={{
                    background: '#E8A84A',
                    color: '#451A03',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {d.teamingButton}
                </a>
              ) : (
                <span
                  className="text-sm text-white/50 italic"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {d.teamingSoon}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── 3. Editorial Pull-Quote and Authentic Photograph ───────────── */}
        <div className="pt-12 md:pt-16 border-t border-white/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Authentic Photograph with Fade-in Caption (Microinteraction 3) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <figure className="m-0">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-white/5">
                  <Image
                    src="/images/colaborar-ongs.jpg"
                    alt={d.photoCaption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <figcaption
                  ref={captionRef}
                  className="text-xs text-white/60 mt-3 leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    opacity: captionVisible ? 1 : 0,
                    transition: 'opacity 600ms ease-out',
                  }}
                >
                  {d.photoCaption}
                </figcaption>
              </figure>
            </div>

            {/* Existing Teacher Quote with Reveal (Microinteraction 4) */}
            <div
              ref={quoteRef}
              className="lg:col-span-7 order-1 lg:order-2 overflow-visible"
              style={{
                opacity: quoteVisible ? 1 : 0,
                transform: quoteVisible ? 'translateY(0)' : 'translateY(12px)',
                transition:
                  'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <blockquote className="m-0 border-l-2 border-[#E8A84A] pl-5 sm:pl-6 py-1">
                <p
                  className="text-xl sm:text-2xl font-normal leading-relaxed italic text-[var(--ivory)] mb-3 overflow-visible"
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    paddingTop: '0.05em',
                    paddingBottom: '0.05em',
                  }}
                >
                  {d.quote}
                </p>
                <cite
                  className="not-italic text-sm text-white/70 font-medium block"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  — {d.quoteAuthor}
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
