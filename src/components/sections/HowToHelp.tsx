'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Heart,
  HeartHandshake,
  Info,
  QrCode,
  Users,
  Building2,
} from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { DONATION_CONFIG } from '@/data/donationConfig';

export function HowToHelp() {
  const { tr } = useLang();
  const d = tr.donar;

  // ── Bizum Copy State & Feedback ──────────────────────────────────────────
  const [bizumCopied, setBizumCopied] = useState(false);
  const [bizumError, setBizumError] = useState(false);
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const errorTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  // ── Bizum Accordion State (open by default like in reference) ────────────
  const [bizumFaqOpen, setBizumFaqOpen] = useState(true);

  const handleCopyBizum = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(DONATION_CONFIG.bizumCode);
        setBizumCopied(true);
        setBizumError(false);
        if ('vibrate' in navigator) {
          try {
            navigator.vibrate(12);
          } catch {
            // Ignore if vibration is unsupported or disabled
          }
        }
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => setBizumCopied(false), 2600);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = DONATION_CONFIG.bizumCode;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setBizumCopied(true);
        setBizumError(false);
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => setBizumCopied(false), 2600);
      }
    } catch {
      setBizumError(true);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
      errorTimerRef.current = setTimeout(() => setBizumError(false), 3000);
    }
  };

  const ihelpUrl = DONATION_CONFIG.ihelpUrl || 'https://www.ihelp.org.es/';
  const teamingUrl =
    DONATION_CONFIG.teamingUrl ||
    'https://www.teaming.net/unaescuela-milesdesuenosenkenia';

  return (
    <section
      id="donar"
      style={{
        backgroundColor: '#186ed7',
        backgroundImage:
          'radial-gradient(ellipse at 35% 20%, #1f7de8 0%, #186ed7 52%, #1158b0 100%)',
      }}
      className="relative w-full py-12 sm:py-16 lg:py-20 text-white overflow-hidden"
      aria-labelledby="donar-heading"
    >
      {/* Sutil textura táctil imperceptible (elimina sensación de plástico plano sin ser glossy) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
        aria-hidden="true"
      />

      {/* Legacy anchor compatibility */}
      <span id="ayuda" className="absolute -top-20" aria-hidden="true" />
      <span id="colabora" className="absolute -top-20" aria-hidden="true" />

      <div className="relative z-10 container-page max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* ── Encabezado superior ──────────────────────────────────────────── */}
        <div className="max-w-3xl mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
            <span
              className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-white/90 uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {d.tag || 'DONACIONES'}
            </span>
            <span
              className="h-px w-14 sm:w-16 bg-white/40 inline-block"
              aria-hidden="true"
            />
          </div>

          <h2
            id="donar-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.15] text-white tracking-tight mb-2.5 sm:mb-3"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            {d.headline}
          </h2>

          <p
            className="text-sm sm:text-base text-white/85 max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {d.supporting}
          </p>
        </div>

        {/* ── Layout de dos columnas con divisores limpios (sin glossy ni cajitas) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-8 lg:gap-0">
          {/* ── COLUMNA IZQUIERDA: Bizum ───────────────────────────────── */}
          <div className="lg:pr-10 xl:pr-14 lg:border-r lg:border-white/20 pb-8 sm:pb-9 lg:pb-0">
            {/* Cabecera Bizum: icono + título */}
            <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white shrink-0"
                aria-hidden="true"
              >
                <circle cx="6.5" cy="7" r="2.2" fill="currentColor" />
                <rect
                  x="10.8"
                  y="2.5"
                  width="3.2"
                  height="19"
                  rx="1.6"
                  transform="rotate(28 12.4 12)"
                  fill="currentColor"
                />
                <circle cx="17.5" cy="17" r="2.2" fill="currentColor" />
              </svg>

              <h3
                className="text-2xl sm:text-3xl font-normal text-white"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                {d.bizumTitle || 'Bizum'}
              </h3>
            </div>

            {/* Instrucciones breves */}
            <p
              className="text-sm text-white/85 leading-relaxed mb-4 max-w-md"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {d.bizumExplanation}
            </p>

            {/* Bloque Bizum: Código principal + QR badge */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-5 sm:mb-6 max-w-lg">
              {/* Código y botón copiar */}
              <div className="flex-1">
                <span
                  className="text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase block mb-1"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  CÓDIGO OFICIAL VERIFICADO · ONG
                </span>
                <span
                  className="text-5xl sm:text-6xl font-normal tracking-tight text-white select-all block leading-none mb-3.5"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {DONATION_CONFIG.bizumCode}
                </span>

                <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={handleCopyBizum}
                    aria-label={d.copyBizumAria(DONATION_CONFIG.bizumCode)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/40 bg-white/10 hover:bg-white hover:text-[#186ed7] active:scale-[0.98] text-white text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xs"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <Copy size={15} strokeWidth={2} aria-hidden="true" />
                    <span>{d.bizumCopy || 'Copiar código'}</span>
                  </button>

                  <div
                    role="status"
                    aria-live="polite"
                    className={`inline-flex items-center gap-1.5 text-sm transition-all duration-200 ${
                      bizumCopied
                        ? 'opacity-100 translate-x-0 text-cyan-200'
                        : bizumError
                        ? 'opacity-100 translate-x-0 text-rose-300'
                        : 'opacity-0 -translate-x-2 pointer-events-none'
                    }`}
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {bizumCopied ? (
                      <>
                        <Check
                          size={15}
                          strokeWidth={2.5}
                          className="text-cyan-200"
                          aria-hidden="true"
                        />
                        <span className="font-medium">
                          {d.bizumCopied || 'Código copiado'}
                        </span>
                      </>
                    ) : bizumError ? (
                      <span>{d.bizumError}</span>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* QR Code sutil y elegante */}
              {DONATION_CONFIG.bizumQr && (
                <div className="inline-flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs self-start sm:self-auto shrink-0 shadow-sm">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white p-1 rounded-xl shadow-xs shrink-0 flex items-center justify-center">
                    <Image
                      src={DONATION_CONFIG.bizumQr}
                      alt="QR Bizum 03367"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-left pr-1">
                    <span
                      className="text-[10px] font-semibold text-white/90 uppercase tracking-wider flex items-center gap-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <QrCode size={12} strokeWidth={2.2} className="text-white/80" aria-hidden="true" />
                      Bizum QR
                    </span>
                    <span
                      className="text-[11px] text-white/75 block leading-tight mt-0.5"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {d.bizumQrHint || 'Escanea con tu cámara'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Acordeón ¿Cómo donar por Bizum? (líneas sobrias, sin glossy) */}
            <div className="rounded-xl border border-white/20 bg-white/[0.05] overflow-hidden transition-all duration-200 max-w-lg">
              <button
                type="button"
                onClick={() => setBizumFaqOpen(!bizumFaqOpen)}
                aria-expanded={bizumFaqOpen}
                aria-controls="bizum-faq-content"
                id="bizum-faq-trigger"
                className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left text-white hover:bg-white/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Info
                      size={13}
                      strokeWidth={2.2}
                      className="text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-white">
                    {d.bizumFaqTitle || '¿Cómo donar por Bizum?'}
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  className={`text-white/80 transition-transform duration-200 shrink-0 ${
                    bizumFaqOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id="bizum-faq-content"
                role="region"
                aria-labelledby="bizum-faq-trigger"
                className={`px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-0 transition-all duration-200 ${
                  bizumFaqOpen ? 'block' : 'hidden'
                }`}
              >
                <p
                  className="text-xs sm:text-sm text-white/85 leading-relaxed pl-7 sm:pl-9"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {d.bizumFaqContent ||
                    'Entra en tu app bancaria, selecciona la opción Bizum, introduce el código 03367 y confirma la donación.'}
                </p>
              </div>
            </div>
          </div>

          {/* ── COLUMNA DERECHA: Otras formas de colaborar (editorial limpio) ─────────────── */}
          <div className="lg:pl-10 xl:pl-14 pt-8 sm:pt-9 lg:pt-0 border-t border-white/20 lg:border-t-0">
            {/* Título de la columna */}
            <h3
              className="text-2xl sm:text-3xl font-normal text-white mb-4 sm:mb-5"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              {d.otherWaysTitle || 'Otras formas de colaborar'}
            </h3>

            {/* Bloque 1: iHelp */}
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-white/30 bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <Heart size={20} strokeWidth={1.8} className="text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className="text-xl sm:text-2xl font-normal text-white"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {d.ihelpTitle || 'iHelp'}
                </h4>

                <p
                  className="text-xs sm:text-sm text-white/85 leading-relaxed mt-1 mb-2.5 sm:mb-3"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {d.ihelpDesc}
                </p>

                <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap">
                  <a
                    href={ihelpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-white/40 bg-white/10 hover:bg-white hover:text-[#186ed7] text-white text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xs"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
                    <span>{d.ihelpLink || 'Ir a iHelp'}</span>
                    <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
                  </a>

                  <div
                    className="inline-flex items-center gap-1.5 text-xs text-white/75"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <HeartHandshake size={15} strokeWidth={1.8} aria-hidden="true" />
                    <span>{d.ihelpTag || 'Crowdfunding'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divisor horizontal entre iHelp y Teaming */}
            <hr className="border-0 border-t border-white/20 my-4 sm:my-5 w-full" />

            {/* Bloque 2: Teaming */}
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-white/30 bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <Users size={20} strokeWidth={1.8} className="text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className="text-xl sm:text-2xl font-normal text-white"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {d.teamingTitle || 'Teaming'}
                </h4>

                <p
                  className="text-xs sm:text-sm text-white/85 leading-relaxed mt-1 mb-2.5 sm:mb-3"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {d.teamingExplanation}
                </p>

                <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap">
                  <a
                    href={teamingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-white/40 bg-white/10 hover:bg-white hover:text-[#186ed7] text-white text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xs"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
                    <span>{d.teamingButton || 'Unirse a Teaming'}</span>
                    <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
                  </a>

                  <div
                    className="inline-flex items-center gap-1.5 text-xs text-white/75"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <Heart size={14} strokeWidth={1.8} aria-hidden="true" />
                    <span>{d.teamingTag || '1 € al mes'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Empresas y donaciones de material (alianzas institucionales) ── */}
        <div className="mt-10 sm:mt-12 pt-8 sm:pt-9 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-3.5 sm:gap-4 max-w-2xl">
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-white/30 bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <Building2 size={20} strokeWidth={1.8} className="text-white" />
              </div>
              <div>
                <h4
                  className="text-xl sm:text-2xl font-normal text-white mb-1.5"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {d.companiesTitle}
                </h4>
                <p
                  className="text-xs sm:text-sm text-white/85 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {d.companiesDesc}
                </p>
              </div>
            </div>

            <a
              href="mailto:cmonte@la-vall.org?subject=Colaboracion%20Empresas%20-%20La%20Vall%20x%20Shariani"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/60 bg-white text-[#186ed7] hover:bg-white/90 active:scale-[0.98] text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 shadow-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <Building2 size={15} strokeWidth={2} aria-hidden="true" />
              <span>{d.companiesCta}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
