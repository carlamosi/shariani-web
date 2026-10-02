'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Check, ArrowRight, ExternalLink, ChevronDown, Mail, Smartphone } from 'lucide-react';

/*
 * Donation Section (Cómo colaborar) — CRO & Fundraising UX de Nivel Senior
 *
 * Pilares de optimización de conversión:
 * 1. Objetivo vivo Fase IV (2027: Lavabos + Biblioteca): Barra de progreso sobria y transparente.
 * 2. Calculadora fiscal interactiva y no intrusiva con deducción del 80% (Ley 49/2002).
 * 3. Bizum optimizado: botón para ver los 3 pasos en la app bancaria (minimiza fricción de usuario).
 * 4. Certificado fiscal con 1 clic: Generador de email pre-redactado para Fundació Montblanc.
 * 5. Canales de aportación claros y sin redundancias.
 */

export function HowToHelp() {
  const [copied, setCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isBizumGuideOpen, setIsBizumGuideOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.disconnect();
          }
        });
      },
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

  // Cálculo según Ley 49/2002 para personas físicas (IRPF):
  // Primeros 250 € -> 80% deducción
  // Exceso sobre 250 € -> 40% deducción
  const calculateDeduction = (amount: number) => {
    const safeAmount = Math.max(0, isNaN(amount) ? 0 : amount);
    let refund = 0;
    if (safeAmount <= 250) {
      refund = safeAmount * 0.8;
    } else {
      refund = 250 * 0.8 + (safeAmount - 250) * 0.4;
    }
    const realCost = safeAmount - refund;
    return {
      donation: safeAmount,
      refund: Math.round(refund * 100) / 100,
      realCost: Math.round(realCost * 100) / 100,
    };
  };

  const deduction = calculateDeduction(donationAmount);

  // Email pre-redactado para certificado fiscal de donación
  const certMailtoUrl =
    'mailto:info@fundaciomontblanc.org?subject=Solicitud%20Certificado%20Donaci%C3%B3n%20%E2%80%94%20La%20Vall%20x%20Shariani&body=Hola%2C%20equipo%20de%20Fundaci%C3%B3%20Montblanc%3A%0A%0AHe%20realizado%20una%20donaci%C3%B3n%20para%20el%20proyecto%20La%20Vall%20x%20Shariani%20y%20deseo%20solicitar%20mi%20certificado%20fiscal%20para%20la%20declaraci%C3%B3n%20de%20la%20Renta.%0A%0AMis%20datos%20fiscales%20son%3A%0A-%20Nombre%20y%20apellidos%3A%0A-%20DNI%20%2F%20NIE%3A%0A-%20C%C3%B3digo%20postal%20%2F%20Direcci%C3%B3n%3A%0A-%20Canal%20de%20donaci%C3%B3n%20(Bizum%20%2F%20Teaming%20%2F%20iHelp)%3A%0A-%20Fecha%20e%20importe%20aproximado%3A%0A%0AAdjunto%20el%20justificante%20de%20la%20transferencia%20%2F%20Bizum.%0A%0AMuchas%20gracias.';

  return (
    <section
      ref={sectionRef}
      id="ayuda"
      style={{ background: 'var(--forest-dark)' }}
      className="relative w-full py-12 md:py-20 text-[var(--ivory)] overflow-hidden"
      aria-labelledby="ayuda-heading"
    >
      <div className="container-page">
        {/* ── Storytelling Header & Fiscal Calculator Toggle ── */}
        <div
          className={`mb-10 editorial-reveal-header ${isRevealed ? 'is-revealed' : ''}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <p
              className="section-label"
              style={{ color: 'rgba(250, 248, 244, 0.45)' }}
            >
              Cómo colaborar
            </p>
            <span className="text-[rgba(250,248,244,0.2)]">/</span>
            <span className="text-xs font-mono text-emerald-300 font-medium">
              Fase IV · Próximo objetivo
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            {/* Direct, compelling motivation focused on action */}
            <div className="lg:col-span-7">
              <h2
                id="ayuda-heading"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(28px, 3.2vw, 42px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  color: 'var(--ivory)',
                }}
              >
                Tu donación hace posible la siguiente fase.
              </h2>
              <p
                style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', lineHeight: 1.7 }}
                className="text-[rgba(250,248,244,0.8)] mt-3.5 max-w-xl"
              >
                La educación no se transforma de golpe: se construye paso a paso con el compromiso de muchas personas. Cada euro se destina íntegramente a las mejoras y necesidades reales de Shariani. Elige la vía que prefieras: cualquier aportación suma.
              </p>
            </div>

            {/* Expandable toggle for fiscal deduction - single line concise clickbait */}
            <div className="lg:col-span-5 flex lg:justify-end pb-1">
              <button
                type="button"
                onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                aria-expanded={isCalculatorOpen}
                className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/40 hover:border-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 text-[var(--ivory)] transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] whitespace-nowrap active:scale-[0.98]"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                
                <span className="text-xs sm:text-[13px] font-semibold text-emerald-200 group-hover:text-white transition-colors whitespace-nowrap">
                  {isCalculatorOpen ? 'Ocultar calculadora' : '¿Donar 50 € solo te cuesta 10 €? Compruébalo'}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-emerald-300 group-hover:text-white transition-transform duration-300 shrink-0 ${
                    isCalculatorOpen ? 'rotate-180 text-emerald-300' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* ── Desplegable: Calculadora Fiscal (Diseño Editorial, sin AI-slop) ── */}
          {isCalculatorOpen && (
            <div className="mt-8 pt-8 pb-8 border-t border-b border-[rgba(250,248,244,0.18)] calculator-enter">
              <div className="max-w-4xl mx-auto">
                {/* Header text with clarified rule in thinner font & parentheses */}
                <div className="mb-7">
                  <h3
                    style={{ fontFamily: 'var(--font-editorial)' }}
                    className="text-xl sm:text-2xl text-[var(--ivory)] font-normal tracking-tight"
                  >
                    Simula tu aportación y lo que te devuelve Hacienda
                  </h3>
                  <p className="text-sm text-[rgba(250,248,244,0.85)] mt-1.5 leading-relaxed">
                    Como colaboramos a través de{' '}
                    <a
                      href="https://www.fundaciomontblanc.org/index.php/es/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[var(--ivory)] underline underline-offset-2 hover:text-emerald-300 transition-colors"
                    >
                      Fundació Montblanc
                    </a>{' '}
                    (entidad declarada de utilidad pública), el Estado te reembolsa el 80% de tu donación en la Renta{' '}
                    <span className="font-light text-xs sm:text-[12.5px] text-[rgba(250,248,244,0.6)]">
                      (el 80% de los primeros 250 € al año, y el 40% a partir de esa cantidad).
                    </span>
                  </p>
                </div>

                {/* Editorial minimal calculation layout */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-6 border-y border-[rgba(250,248,244,0.12)]">
                  {/* Left: Input & slider with tactile feedback */}
                  <div className="w-full md:w-5/12">
                    <div className="flex justify-between items-baseline mb-2.5">
                      <span className="text-xs uppercase tracking-wider text-[var(--ivory)] font-semibold">
                        Tu aportación (100% íntegro a Shariani)
                      </span>
                      <span className="text-[11px] text-[rgba(250,248,244,0.4)]">
                        desliza o escribe
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="relative group/input">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-emerald-400 font-bold transition-transform group-focus-within/input:scale-110">€</span>
                        <input
                          id="donation-input"
                          type="number"
                          min="5"
                          max="1000"
                          step="5"
                          value={donationAmount || ''}
                          onChange={(e) => setDonationAmount(Number(e.target.value))}
                          className="w-28 pl-7 pr-2.5 py-1.5 bg-black/30 border-b-2 border-emerald-400/70 focus:border-emerald-300 focus:bg-black/45 focus:outline-none text-2xl font-mono font-bold text-[var(--ivory)] transition-all duration-200"
                          aria-label="Cantidad a donar en euros"
                        />
                      </div>
                      <div className="flex-1 relative flex items-center">
                        <input
                          type="range"
                          min="10"
                          max="300"
                          step="5"
                          value={donationAmount || 10}
                          onChange={(e) => setDonationAmount(Number(e.target.value))}
                          className="w-full h-1.5 bg-[rgba(250,248,244,0.2)] rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                          aria-label="Selector de cantidad"
                        />
                      </div>
                    </div>
                    <span className="block text-[11px] text-emerald-300/80 font-medium mt-1.5">
                      Llega directo a la escuela en Kenia sin comisiones intermedias
                    </span>
                  </div>

                  {/* Right: Results comparison with typographic contrast: Refund + Real Cost */}
                  <div className="w-full md:w-6/12 flex items-center justify-between gap-4 sm:gap-8 pt-2 md:pt-0">
                    {/* Tax refund */}
                    <div className="transition-all duration-200 flex-1">
                      <span className="block text-[11px] uppercase tracking-wider text-emerald-300 font-semibold mb-1">
                        Hacienda devuelve
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span
                          key={`refund-${deduction.refund}`}
                          style={{ fontFamily: 'var(--font-editorial)' }}
                          className="text-3xl sm:text-4xl text-emerald-300 font-normal inline-block transition-transform duration-200"
                        >
                          +{deduction.refund}
                        </span>
                        <span className="text-sm font-mono text-emerald-400">€</span>
                      </div>
                      <span className="block text-[10.5px] text-[rgba(250,248,244,0.5)] mt-0.5">
                        en tu declaración IRPF
                      </span>
                    </div>

                    <div className="h-12 w-px bg-gradient-to-b from-transparent via-[rgba(250,248,244,0.2)] to-transparent" />

                    {/* Real cost */}
                    <div className="transition-all duration-200 flex-1 pl-2">
                      <span className="block text-[11px] uppercase tracking-wider text-[rgba(250,248,244,0.85)] font-semibold mb-1">
                        Tu gasto real
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span
                          key={`cost-${deduction.realCost}`}
                          style={{ fontFamily: 'var(--font-editorial)' }}
                          className="text-3xl sm:text-4xl text-[var(--ivory)] font-bold inline-block"
                        >
                          {deduction.realCost}
                        </span>
                        <span className="text-sm font-mono text-[var(--ivory)]">€</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10.5px] text-emerald-300 font-medium mt-0.5 px-1.5 py-0.2 rounded bg-emerald-950/50 border border-emerald-500/20">
                        solo el {Math.round((deduction.realCost / (deduction.donation || 1)) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[rgba(250,248,244,0.45)] mt-4">
                  * Válido en IRPF (España). Para recibir el certificado fiscal oficial emitido por Fundació Montblanc, solo debes indicar tu DNI al donar.
                </p>
              </div>
            </div>
          )}
        </div>




        {/* ── Horizontal 4-Column Strip: All 4 Ways to Act ── */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-6 border-t border-[rgba(250,248,244,0.15)] editorial-reveal-content ${
            isRevealed ? 'is-revealed' : ''
          }`}
        >
          {/* 1. BIZUM */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[rgba(250,248,244,0.5)]">
                  Bizum solidario
                </span>
                <span className="text-[10px] text-emerald-300 font-medium bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                  80% Desgravación
                </span>
              </div>
              <div className="flex items-baseline gap-3 my-1">
                <span
                  className="font-mono text-2xl sm:text-3xl font-bold tracking-widest text-[var(--ivory)] select-all"
                  aria-label="Código Bizum 03367"
                >
                  03367
                </span>
                <button
                  type="button"
                  onClick={handleCopyBizum}
                  aria-live="polite"
                  className="copy-btn-feedback text-xs text-[rgba(250,248,244,0.7)] hover:text-white border-b border-[rgba(250,248,244,0.3)] hover:border-white pb-0.5 cursor-pointer font-medium"
                >
                  {copied ? (
                    <span className="text-emerald-300 inline-flex items-center gap-1">
                      <Check size={11} strokeWidth={2.5} /> Copiado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <Copy size={11} strokeWidth={2} /> Copiar código
                    </span>
                  )}
                </button>
              </div>

              {/* Guía rápida desplegable para reducir fricción */}
              <button
                type="button"
                onClick={() => setIsBizumGuideOpen(!isBizumGuideOpen)}
                className="mt-2 text-xs inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer font-medium"
              >
                <Smartphone size={12} strokeWidth={2} />
                <span>{isBizumGuideOpen ? 'Ocultar guía bancaria' : '¿Cómo se pone en la app? (3 pasos)'}</span>
                <ChevronDown size={11} className={`transition-transform ${isBizumGuideOpen ? 'rotate-180' : ''}`} />
              </button>

              {isBizumGuideOpen ? (
                <div className="mt-2.5 p-3 rounded bg-black/30 border border-[rgba(250,248,244,0.1)] text-xs text-[rgba(250,248,244,0.75)] space-y-1.5">
                  <p><strong className="text-[var(--ivory)]">1.</strong> Abre la app de tu banco y entra en Bizum.</p>
                  <p><strong className="text-[var(--ivory)]">2.</strong> Selecciona <em>«Hacer Donación»</em> o <em>«Aportar a ONG»</em> (no envío a contacto).</p>
                  <p><strong className="text-[var(--ivory)]">3.</strong> Escribe el código <strong className="text-emerald-300 font-mono">03367</strong> y el importe deseado.</p>
                </div>
              ) : (
                <p className="text-xs text-[rgba(250,248,244,0.8)] leading-relaxed mt-2">
                  Destinatario:{' '}
                  <a
                    href="https://www.fundaciomontblanc.org/index.php/es/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--ivory)] hover:text-emerald-300 underline underline-offset-2 transition-colors font-medium"
                  >
                    Fundació Montblanc
                  </a>{' '}
                  · Asunto: <strong className="text-[var(--ivory)] font-medium">La Vall x Shariani</strong>.
                </p>
              )}
            </div>

            <div className="mt-4 pt-2 border-t border-[rgba(250,248,244,0.08)]">
              <a
                href={certMailtoUrl}
                className="inline-flex items-center gap-1.5 text-[11px] text-[rgba(250,248,244,0.6)] hover:text-white transition-colors"
                title="Abrir correo pre-redactado para pedir certificado fiscal"
              >
                <Mail size={11} strokeWidth={2} />
                <span className="underline underline-offset-2">Pedir certificado fiscal IRPF</span>
              </a>
            </div>
          </div>

          {/* 2. TEAMING */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[rgba(250,248,244,0.5)]">
                  Teaming
                </span>
                <span className="text-[10px] text-[rgba(250,248,244,0.65)] font-medium">
                  Cuota mensual
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span
                  style={{ fontFamily: 'var(--font-editorial)' }}
                  className="text-2xl sm:text-3xl text-[var(--ivory)]"
                >
                  1 €
                </span>
                <span className="text-xs text-[rgba(250,248,244,0.55)]">/ mes</span>
              </div>
              <p className="text-xs text-[rgba(250,248,244,0.75)] leading-relaxed mt-2">
                Con solo 1&nbsp;€ al mes creamos un fondo estable para reponer libros, pupitres y sostener las necesidades continuas del colegio todo el año.
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.teaming.net/unaescuela-milesdesuenosenkenia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ivory)] hover:text-white border-b border-[rgba(250,248,244,0.35)] hover:border-white pb-0.5 transition-all group"
              >
                <span>Sumarme al grupo de Teaming</span>
                <ExternalLink size={11} strokeWidth={2} className="opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* 3. IHELP CROWDFUNDING */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[rgba(250,248,244,0.5)]">
                  iHelp Crowdfunding
                </span>
                <span className="text-[10px] text-[rgba(250,248,244,0.65)] font-medium">
                  Puntual
                </span>
              </div>
              <div className="my-1">
                <span
                  style={{ fontFamily: 'var(--font-editorial)' }}
                  className="text-xl sm:text-2xl text-[var(--ivory)]"
                >
                  Importe libre
                </span>
              </div>
              <p className="text-xs text-[rgba(250,248,244,0.75)] leading-relaxed mt-2">
                Aportaciones con tarjeta o transferencia para financiar hitos constructivos concretos. Emisión inmediata y automática del certificado fiscal.
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.ihelp.org.es/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ivory)] hover:text-white border-b border-[rgba(250,248,244,0.35)] hover:border-white pb-0.5 transition-all group"
              >
                <span>Donar a través de iHelp</span>
                <ExternalLink size={11} strokeWidth={2} className="opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* 4. ALIANZAS ABIERTAS (EMPRESAS) */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[rgba(250,248,244,0.5)]">
                  Empresas
                </span>
                <span className="text-[10px] text-emerald-300 font-medium bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                  Deducción en IS
                </span>
              </div>
              <div className="my-1">
                <span
                  style={{ fontFamily: 'var(--font-editorial)' }}
                  className="text-xl sm:text-2xl text-[var(--ivory)]"
                >
                  Alianzas abiertas
                </span>
              </div>
              <p className="text-xs text-[rgba(250,248,244,0.85)] leading-relaxed mt-2 font-medium">
                Buscamos empresas que quieran sumarse: <strong>donación de materiales de obra o escolares, aportación económica directa o acuerdos de colaboración</strong>.
              </p>
              <p className="text-xs text-[rgba(250,248,244,0.65)] leading-relaxed mt-1.5">
                Estamos completamente abiertas a escuchar vuestra propuesta y diseñar un acuerdo a medida con impacto verificable.
              </p>
            </div>
            <div className="mt-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ivory)] hover:text-white border-b border-[rgba(250,248,244,0.35)] hover:border-white pb-0.5 transition-all group"
              >
                <span>Hablemos de colaborar</span>
                <ArrowRight size={11} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
