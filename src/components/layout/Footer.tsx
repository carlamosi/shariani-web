'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import type { Lang } from '@/data/translations';
import { LOCALES } from '@/lib/site';

const year = new Date().getFullYear();

const LANG_TO_LOCALE: Record<Lang, string> = { CA: 'ca', ES: 'es', EN: 'en' };

const MAPS_URL =
  'https://www.google.com/maps/place//data=!4m2!3m1!1s0x12a4942497a6cf55:0xef891ebd88b4d839?sa=X&ved=1t:8290&ictx=111';

function getNavHrefs(locale: string) {
  return [
    `/${locale}#proyecto`,
    `/${locale}/obra-real`,
    `/${locale}#impacto`,
    `/${locale}/blog`,
  ];
}

function getColaboraHrefs(locale: string) {
  return [
    { href: `/${locale}#donar`, external: false },
    { href: `/${locale}#obras`, external: false },
    { href: 'https://www.teaming.net/unaescuela-milesdesuenosenkenia', external: true },
    { href: `/${locale}#colabora`, external: false },
  ];
}

export function Footer() {
  const { lang, tr } = useLang();
  const pathname = usePathname();
  const f = tr.footer;
  const pathLocale = pathname?.split('/').filter(Boolean)[0];
  const locale = (LOCALES as readonly string[]).includes(pathLocale)
    ? pathLocale
    : (LANG_TO_LOCALE[lang] ?? 'es');
  const NAV_HREFS = getNavHrefs(locale);
  const COLABORA_HREFS = getColaboraHrefs(locale);

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--forest-dark)', color: 'var(--ivory)' }}
      aria-label={f.footerAria || f.navCol}
    >
      {/* Background wordmark */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none"
        aria-hidden="true"
        style={{ lineHeight: 0.85, overflow: 'hidden', maxWidth: '70vw' }}
      >
        <span
          className="block text-right"
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 400,
            fontSize: 'clamp(80px, 14vw, 200px)',
            color: 'rgba(250,248,244,0.035)',
            letterSpacing: '-0.05em',
            marginRight: '-0.05em',
          }}
        >
          Shariani
        </span>
      </div>

      <div className="container-page max-w-5xl mx-auto relative z-10 pt-14 md:pt-16">
        <div
          className="pb-12 md:pb-14 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10 border-b"
          style={{ borderColor: 'rgba(250,248,244,0.08)' }}
        >
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-1.5 no-underline mb-5"
              aria-label={f.brandAria || 'La Vall × Shariani — Inici'}
            >
              <span
                className="leading-none tracking-tight font-semibold"
                style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', color: 'var(--ivory)' }}
              >
                La Vall
              </span>
              <span className="opacity-40 text-sm leading-none" style={{ color: 'var(--ivory)' }} aria-hidden="true">
                ×
              </span>
              <span
                className="leading-none tracking-tight font-semibold"
                style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', color: 'var(--ivory)' }}
              >
                Shariani
              </span>
            </Link>
            <p
              style={{
                fontSize: '13px',
                color: 'rgba(250,248,244,0.5)',
                lineHeight: 1.65,
                maxWidth: '220px',
                fontFamily: 'var(--font-body)',
              }}
            >
              {f.tagline.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < 2 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* Navega */}
          <div className="col-span-1">
            <h3
              className="text-[11px] tracking-[0.16em] uppercase mb-4 font-semibold"
              style={{ color: 'rgba(250,248,244,0.45)', fontFamily: 'var(--font-body)' }}
            >
              {f.navCol}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {f.navLinks.map((link, i) => (
                <li key={NAV_HREFS[i]}>
                  <Link
                    href={NAV_HREFS[i]}
                    className="text-[13px] no-underline transition-colors"
                    style={{ color: 'rgba(250,248,244,0.6)', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,244,0.6)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col·labora */}
          <div className="col-span-1">
            <h3
              className="text-[11px] tracking-[0.16em] uppercase mb-4 font-semibold"
              style={{ color: 'rgba(250,248,244,0.45)', fontFamily: 'var(--font-body)' }}
            >
              {f.colaboraCol}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {f.colaboraLinks.map((link, i) => {
                const item = COLABORA_HREFS[i];
                return (
                  <li key={link.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] no-underline transition-colors"
                        style={{ color: 'rgba(250,248,244,0.6)', fontFamily: 'var(--font-body)' }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,244,0.6)';
                        }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[13px] no-underline transition-colors"
                        style={{ color: 'rgba(250,248,244,0.6)', fontFamily: 'var(--font-body)' }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,244,0.6)';
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contacte */}
          <div className="col-span-2 md:col-span-1">
            <h3
              className="text-[11px] tracking-[0.16em] uppercase mb-4 font-semibold"
              style={{ color: 'rgba(250,248,244,0.45)', fontFamily: 'var(--font-body)' }}
            >
              {f.contactCol}
            </h3>
            <div className="flex flex-col gap-3.5">
              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 opacity-70" aria-hidden="true" />
                <a
                  href={`mailto:${f.email}`}
                  className="text-[13px] no-underline transition-colors break-all"
                  style={{ color: 'rgba(250,248,244,0.6)', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,244,0.6)';
                  }}
                >
                  {f.email}
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 opacity-70" aria-hidden="true" />
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] leading-relaxed no-underline transition-colors block"
                  style={{ color: 'rgba(250,248,244,0.6)', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,244,0.6)';
                  }}
                >
                  <span className="block font-medium text-white/90">{f.addressSchool}</span>
                  <span className="block text-[12px] opacity-80">{f.addressStreet}</span>
                  <span className="block text-[12px] opacity-80">{f.addressCity}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ fontSize: '11px', color: 'rgba(250,248,244,0.35)' }}
        >
          <p>{f.copyright(year)}</p>
          <div className="flex items-center gap-4">
            {[
              { label: f.privacy, href: '#' },
              { label: f.cookies, href: '#' },
              { label: f.contact, href: `/${locale}#contacto` },
            ].map((item, i) => (
              <span key={item.label} className="inline-flex items-center gap-4">
                {i > 0 && <span aria-hidden="true">·</span>}
                {item.href.startsWith('/') ? (
                  <Link
                    href={item.href}
                    className="no-underline transition-colors"
                    style={{ color: 'rgba(250,248,244,0.35)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,244,0.65)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,244,0.35)';
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === '#') e.preventDefault();
                    }}
                    className="no-underline transition-colors"
                    style={{ color: 'rgba(250,248,244,0.35)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,244,0.65)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,244,0.35)';
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
