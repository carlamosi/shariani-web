'use client';

import Image from 'next/image';

const CONTACT_EMAIL = 'cmonte@la-vall.org';
const INSTAGRAM_URL = 'https://www.instagram.com/amara.la_vall/';
const MAPS_URL =
  'https://www.google.com/maps/place//data=!4m2!3m1!1s0x12a4942497a6cf55:0xef891ebd88b4d839?sa=X&ved=1t:8290&ictx=111';

/* ── SVG icons (inline, no extra deps) ─────────────────────────────────── */
function IconMail() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}


export function Contact() {
  return (
    <section
      id="colabora"
      className="relative w-full bg-[var(--ivory)] py-10 sm:py-12 lg:py-14 text-[var(--ink)] overflow-hidden"
      aria-labelledby="contacto-heading"
    >
      {/* Anchor for nav */}
      <span id="contacto" className="absolute -top-20" aria-hidden="true" />

      <div className="container-page">
        <div className="max-w-4xl mx-auto">
        {/* ── Desktop: two-column grid ─── Mobile: single column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">

          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <div className="flex flex-col gap-4 sm:gap-5">

            {/* Section label + rule */}
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Contacto
              </span>
              <span
                className="flex-1 h-px bg-[var(--border)]"
                aria-hidden="true"
              />
            </div>

            {/* Headline */}
            <div>
              <h2
                id="contacto-heading"
                className="text-4xl sm:text-5xl lg:text-[44px] font-normal leading-[1.08] tracking-[-0.02em] text-[var(--ink)] mb-2.5 sm:mb-3"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                ¿Hablamos?
              </h2>
              <p
                className="text-sm sm:text-[15px] leading-relaxed text-[var(--ink-muted)] max-w-[420px]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Si tienes alguna duda, quieres colaborar, conocernos mejor o
                simplemente quieres saber más sobre el proyecto, estamos aquí
                para ayudarte.
              </p>
            </div>

            {/* ── Contact blocks: Email | Dirección ── */}
            <div className="flex flex-col sm:flex-row gap-0 pt-1 sm:pt-2">
              {/* Email */}
              <div className="flex-1 pr-0 sm:pr-6 lg:pr-7 pb-4 sm:pb-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--forest)] bg-[var(--forest)]/[0.08] shrink-0"
                  >
                    <IconMail />
                  </span>
                  <p
                    className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Email
                  </p>
                </div>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[var(--forest)] text-sm font-medium hover:underline underline-offset-2 transition-colors block break-words"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {CONTACT_EMAIL}
                </a>
                <p
                  className="mt-1 text-xs sm:text-[13px] text-[var(--ink-muted)] leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Escríbenos y te responderemos a la mayor brevedad posible.
                </p>
              </div>

              {/* Vertical divider (desktop) / Horizontal divider (mobile) */}
              <div className="hidden sm:block w-px bg-[var(--border)] mx-1 self-stretch" aria-hidden="true" />
              <div className="block sm:hidden h-px bg-[var(--border)] my-4" aria-hidden="true" />

              {/* Dirección */}
              <div className="flex-1 pl-0 sm:pl-6 lg:pl-7">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--forest)] bg-[var(--forest)]/[0.08] shrink-0"
                  >
                    <IconMapPin />
                  </span>
                  <p
                    className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Dirección
                  </p>
                </div>

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--forest)] text-sm font-medium hover:underline underline-offset-2 transition-colors block leading-snug"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Institució La Vall
                </a>
                <p
                  className="mt-1 text-xs sm:text-[13px] text-[var(--ink-muted)] leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Ctra. Sabadell a Bellaterra km. 4,6<br />
                  08205 Sabadell, Barcelona
                </p>

                {/* Social links — only Instagram is verified */}
                <div className="mt-2.5 flex items-center gap-2">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram de La Vall × Shariani"
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--forest)] hover:border-[var(--forest)] transition-all duration-200"
                  >
                    <IconInstagram />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN — Photograph ───────────────────────── */}
          <div className="relative w-full order-first lg:order-last">
            {/*
              Asymmetric rounded crop matching the reference:
              top-left = large radius, top-right = large radius,
              bottom-right = small/none, bottom-left = large radius
              Replicates the reference's architectural rounded shape.
            */}
            <div
              className="relative w-full overflow-hidden shadow-lg mx-auto max-w-sm sm:max-w-md lg:max-w-none"
              style={{
                borderRadius: '72px 72px 20px 72px',
                aspectRatio: '4 / 3',
              }}
            >
              <Image
                src="/images/hero-school.jpeg"
                alt="Estudiantes de Shariani Primary School, Kilifi, Kenia"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                priority={false}
              />
            </div>

          </div>

        </div>
        </div>
      </div>
    </section>
  );
}
