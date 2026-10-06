'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Check, ArrowRight, ExternalLink, ChevronDown, Mail, Smartphone } from 'lucide-react';
import { useLang } from '@/context/LangContext';

export function HowToHelp() {
  const { tr } = useLang();
  const h = tr.help;

  const [copied, setCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isBizumGuideOpen, setIsBizumGuideOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setIsRevealed(true); return; }
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { setIsRevealed(true); observer.disconnect(); } }); },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopyBizum = () => {
    navigator.clipboard.writeText('03367').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const calculateDeduction = (amount: number) => {
    const safeAmount = Math.max(0, isNaN(amount) ? 0 : amount);
    const refund = safeAmount <= 250 ? safeAmount * 0.8 : 250 * 0.8 + (safeAmount - 250) * 0.4;
    const realCost = safeAmount - refund;
    return { donation: safeAmount, refund: Math.round(refund * 100) / 100, realCost: Math.round(realCost * 100) / 100 };
  };

  const deduction = calculateDeduction(donationAmount);

  const certMailtoUrl =
    'mailto:info@fundaciomontblanc.org?subject=Solicitud%20Certificado%20Donaci%C3%B3n%20%E2%80%94%20La%20Vall%20x%20Shariani&body=Hola%2C%20equipo%20de%20Fundaci%C3%B3%20Montblanc%3A%0A%0AHe%20realizado%20una%20donaci%C3%B3n%20para%20el%20proyecto%20La%20Vall%20x%20Shariani%20y%20deseo%20solicitar%20mi%20certificado%20fiscal.%0A%0AMuchas%20gracias.';

  return (
    <section
      ref={sectionRef}
      id="ayuda"
      style={{ background: 'var(--forest-dark)' }}
      className="relative w-full py-12 md:py-20 text-[var(--ivory)] overflow-hidden"
      aria-labelledby="ayuda-heading"
    >
      <div className="container-page">
        {/* Header */}
        <div className={`mb-10 editorial-reveal-header ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="flex items-center gap-3 mb-3">
            <p className="section-label" style={{ color: 'rgba(250, 248, 244, 0.45)' }}>{h.sectionLabel}</p>
            <span className="text-[rgba(250,248,244,0.2)]">/</span>
            <span className="text-xs font-mono text-emerald-300 font-medium">{h.nextGoal}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <h2
                id="ayuda-heading"
                style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(28px, 3.2vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--ivory)' }}
              >
                {h.heading}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', lineHeight: 1.7 }} className="text-[rgba(250,248,244,0.8)] mt-3.5 max-w-xl">
                {h.body}
              </p>
            </div>

            <div className="lg:col-span-5 flex lg:justify-end pb-1">
              <button
                type="button"
                onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                aria-expanded={isCalculatorOpen}
                className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/40 hover:border-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 text-[var(--ivory)] transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] whitespace-nowrap active:scale-[0.98]"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                <span className="text-xs sm:text-[13px] font-semibold text-emerald-200 group-hover:text-white transition-colors whitespace-nowrap">
                  {isCalculatorOpen ? h.calculatorHide : h.calculatorShow}
                </span>
                <ChevronDown size={14} className={`text-emerald-300 group-hover:text-white transition-transform duration-300 shrink-0 ${isCalculatorOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Calculator */}
          {isCalculatorOpen && (
            <div className="mt-8 pt-8 pb-8 border-t border-b border-[rgba(250,248,244,0.18)] calculator-enter">
              <div className="max-w-4xl mx-auto">
                <div className="mb-7">
                  <h3 style={{ fontFamily: 'var(--font-editorial)' }} className="text-xl sm:text-2xl text-[var(--ivory)] font-normal tracking-tight">
                    {h.calcHeading}
                  </h3>
                  <p className="text-sm text-[rgba(250,248,244,0.85)] mt-1.5 leading-relaxed">
                    {h.calcIntroPrefix}{' '}
                    <a href="https://www.fundaciomontblanc.org/index.php/es/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--ivory)] underline underline-offset-2 hover:text-emerald-300 transition-colors">
                      Fundació Montblanc
                    </a>{' '}
                    {h.calcIntroSuffix}{' '}
                    <span className="font-light text-xs sm:text-[12.5px] text-[rgba(250,248,244,0.6)]">{h.calcIntroSmall}</span>
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-6 border-y border-[rgba(250,248,244,0.12)]">
                  <div className="w-full md:w-5/12">
                    <div className="flex justify-between items-baseline mb-2.5">
                      <span className="text-xs uppercase tracking-wider text-[var(--ivory)] font-semibold">{h.calcInputLabel}</span>
                      <span className="text-[11px] text-[rgba(250,248,244,0.4)]">{h.calcSlider}</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <div className="relative group/input">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-emerald-400 font-bold">€</span>
                        <input
                          id="donation-input"
                          type="number" min="5" max="1000" step="5"
                          value={donationAmount || ''}
                          onChange={(e) => setDonationAmount(Number(e.target.value))}
                          className="w-28 pl-7 pr-2.5 py-1.5 bg-black/30 border-b-2 border-emerald-400/70 focus:border-emerald-300 focus:bg-black/45 focus:outline-none text-2xl font-mono font-bold text-[var(--ivory)] transition-all duration-200"
                          aria-label={h.calcInputLabel}
                        />
                      </div>
                      <div className="flex-1 relative flex items-center">
                        <input
                          type="range" min="10" max="300" step="5"
                          value={donationAmount || 10}
                          onChange={(e) => setDonationAmount(Number(e.target.value))}
                          className="w-full h-1.5 bg-[rgba(250,248,244,0.2)] rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                          aria-label={h.calcSlider}
                        />
                      </div>
                    </div>
                    <span className="block text-[11px] text-emerald-300/80 font-medium mt-1.5">{h.calcDirect}</span>
                  </div>

                  <div className="w-full md:w-6/12 flex items-center justify-between gap-4 sm:gap-8 pt-2 md:pt-0">
                    <div className="transition-all duration-200 flex-1">
                      <span className="block text-[11px] uppercase tracking-wider text-emerald-300 font-semibold mb-1">{h.calcRefund}</span>
                      <div className="flex items-baseline gap-1">
                        <span key={`refund-${deduction.refund}`} style={{ fontFamily: 'var(--font-editorial)' }} className="text-3xl sm:text-4xl text-emerald-300 font-normal inline-block">
                          +{deduction.refund}
                        </span>
                        <span className="text-sm font-mono text-emerald-400">€</span>
                      </div>
                      <span className="block text-[10.5px] text-[rgba(250,248,244,0.5)] mt-0.5">{h.calcIrpf}</span>
                    </div>

                    <div className="h-12 w-px bg-gradient-to-b from-transparent via-[rgba(250,248,244,0.2)] to-transparent" />

                    <div className="transition-all duration-200 flex-1 pl-2">
                      <span className="block text-[11px] uppercase tracking-wider text-[rgba(250,248,244,0.85)] font-semibold mb-1">{h.calcRealCost}</span>
                      <div className="flex items-baseline gap-1">
                        <span key={`cost-${deduction.realCost}`} style={{ fontFamily: 'var(--font-editorial)' }} className="text-3xl sm:text-4xl text-[var(--ivory)] font-bold inline-block">
                          {deduction.realCost}
                        </span>
                        <span className="text-sm font-mono text-[var(--ivory)]">€</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10.5px] text-emerald-300 font-medium mt-0.5 px-1.5 py-0.2 rounded bg-emerald-950/50 border border-emerald-500/20">
                        {h.calcOnly(Math.round((deduction.realCost / (deduction.donation || 1)) * 100))}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[rgba(250,248,244,0.45)] mt-4">{h.calcDisclaimer}</p>
              </div>
            </div>
          )}
        </div>

        {/* 4-Column donation methods */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-6 border-t border-[rgba(250,248,244,0.15)] editorial-reveal-content ${isRevealed ? 'is-revealed' : ''}`}>

          {/* 1. BIZUM */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[rgba(250,248,244,0.5)]">{h.bizumLabel}</span>
                <span className="text-[10px] text-emerald-300 font-medium bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.2 rounded">{h.bizumDesgrav}</span>
              </div>
              <div className="flex items-baseline gap-3 my-1">
                <span className="font-mono text-2xl sm:text-3xl font-bold tracking-widest text-[var(--ivory)] select-all" aria-label="Codi Bizum 03367">03367</span>
                <button type="button" onClick={handleCopyBizum} aria-live="polite" className="copy-btn-feedback text-xs text-[rgba(250,248,244,0.7)] hover:text-white border-b border-[rgba(250,248,244,0.3)] hover:border-white pb-0.5 cursor-pointer font-medium">
                  {copied ? (
                    <span className="text-emerald-300 inline-flex items-center gap-1"><Check size={11} strokeWidth={2.5} /> {h.bizumCopied}</span>
                  ) : (
                    <span className="inline-flex items-center gap-1"><Copy size={11} strokeWidth={2} /> {h.bizumCopy}</span>
                  )}
                </button>
              </div>

              <button type="button" onClick={() => setIsBizumGuideOpen(!isBizumGuideOpen)} className="mt-2 text-xs inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer font-medium">
                <Smartphone size={12} strokeWidth={2} />
                <span>{isBizumGuideOpen ? h.bizumGuideHide : h.bizumGuideShow}</span>
                <ChevronDown size={11} className={`transition-transform ${isBizumGuideOpen ? 'rotate-180' : ''}`} />
              </button>

              {isBizumGuideOpen ? (
                <div className="mt-2.5 p-3 rounded bg-black/30 border border-[rgba(250,248,244,0.1)] text-xs text-[rgba(250,248,244,0.75)] space-y-1.5">
                  <p><strong className="text-[var(--ivory)]">1.</strong> {h.bizumStep1}</p>
                  <p><strong className="text-[var(--ivory)]">2.</strong> {h.bizumStep2}</p>
                  <p><strong className="text-[var(--ivory)]">3.</strong> {h.bizumStep3} <strong className="text-emerald-300 font-mono">03367</strong> {h.bizumStep3b}</p>
                </div>
              ) : (
                <p className="text-xs text-[rgba(250,248,244,0.8)] leading-relaxed mt-2">
                  {h.bizumDest}{' '}
                  <a href="https://www.fundaciomontblanc.org/index.php/es/" target="_blank" rel="noopener noreferrer" className="text-[var(--ivory)] hover:text-emerald-300 underline underline-offset-2 transition-colors font-medium">
                    Fundació Montblanc
                  </a>{' '}
                  · {h.bizumSubject} <strong className="text-[var(--ivory)] font-medium">La Vall x Shariani</strong>.
                </p>
              )}
            </div>
            <div className="mt-4 pt-2 border-t border-[rgba(250,248,244,0.08)]">
              <a href={certMailtoUrl} className="inline-flex items-center gap-1.5 text-[11px] text-[rgba(250,248,244,0.6)] hover:text-white transition-colors" title={h.bizumCertLink}>
                <Mail size={11} strokeWidth={2} />
                <span className="underline underline-offset-2">{h.bizumCertLink}</span>
              </a>
            </div>
          </div>

          {/* 2. TEAMING */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[rgba(250,248,244,0.5)]">{h.teamingLabel}</span>
                <span className="text-[10px] text-[rgba(250,248,244,0.65)] font-medium">{h.teamingMonthly}</span>
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span style={{ fontFamily: 'var(--font-editorial)' }} className="text-2xl sm:text-3xl text-[var(--ivory)]">1 €</span>
                <span className="text-xs text-[rgba(250,248,244,0.55)]">{h.teamingPerMonth}</span>
              </div>
              <p className="text-xs text-[rgba(250,248,244,0.75)] leading-relaxed mt-2">{h.teamingBody}</p>
            </div>
            <div className="mt-4">
              <a href="https://www.teaming.net/unaescuela-milesdesuenosenkenia" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ivory)] hover:text-white border-b border-[rgba(250,248,244,0.35)] hover:border-white pb-0.5 transition-all group">
                <span>{h.teamingCta}</span>
                <ExternalLink size={11} strokeWidth={2} className="opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* 3. IHELP */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[rgba(250,248,244,0.5)]">{h.ihelpLabel}</span>
                <span className="text-[10px] text-[rgba(250,248,244,0.65)] font-medium">{h.ihelpOneTime}</span>
              </div>
              <div className="my-1">
                <span style={{ fontFamily: 'var(--font-editorial)' }} className="text-xl sm:text-2xl text-[var(--ivory)]">{h.ihelpAmount}</span>
              </div>
              <p className="text-xs text-[rgba(250,248,244,0.75)] leading-relaxed mt-2">{h.ihelpBody}</p>
            </div>
            <div className="mt-4">
              <a href="https://www.ihelp.org.es/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ivory)] hover:text-white border-b border-[rgba(250,248,244,0.35)] hover:border-white pb-0.5 transition-all group">
                <span>{h.ihelpCta}</span>
                <ExternalLink size={11} strokeWidth={2} className="opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* 4. EMPRESAS */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[rgba(250,248,244,0.5)]">{h.companiesLabel}</span>
                <span className="text-[10px] text-emerald-300 font-medium bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.2 rounded">{h.companiesDeduction}</span>
              </div>
              <div className="my-1">
                <span style={{ fontFamily: 'var(--font-editorial)' }} className="text-xl sm:text-2xl text-[var(--ivory)]">{h.companiesAmount}</span>
              </div>
              <p className="text-xs text-[rgba(250,248,244,0.85)] leading-relaxed mt-2 font-medium" dangerouslySetInnerHTML={{ __html: h.companiesBody }} />
              <p className="text-xs text-[rgba(250,248,244,0.65)] leading-relaxed mt-1.5">{h.companiesBody2}</p>
            </div>
            <div className="mt-4">
              <a href="#contacto" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ivory)] hover:text-white border-b border-[rgba(250,248,244,0.35)] hover:border-white pb-0.5 transition-all group">
                <span>{h.companiesCta}</span>
                <ArrowRight size={11} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
