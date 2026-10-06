'use client';

import Link from 'next/link';
import { useLang } from '@/context/LangContext';

const year = new Date().getFullYear();

const NAV_HREFS = ['#proyecto', '#shariani', '#impacto', '#contacto', '#diario'];
const HELP_HREFS = [
  { href: 'https://www.teaming.net/unaescuela-milesdesuenosenkenia', external: true },
  { href: '#ayuda', external: false },
  { href: '#ayuda', external: false },
  { href: 'https://www.instagram.com/amara.la_vall/', external: true },
];

export function Footer() {
  const { tr } = useLang();
  const f = tr.footer;

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--forest-dark)', color: 'var(--ivory)' }}
      aria-label={f.projectCol}
    >
      {/* Background wordmark */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none" aria-hidden="true" style={{ lineHeight: 0.85, overflow: 'hidden', maxWidth: '70vw' }}>
        <span
          className="block text-right"
          style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400, fontSize: 'clamp(80px, 14vw, 200px)', color: 'rgba(250,248,244,0.035)', letterSpacing: '-0.05em', marginRight: '-0.05em' }}
        >
          Shariani
        </span>
      </div>

      <div className="container-page relative z-10 pt-16">
        <div className="pb-12 md:pb-14 grid grid-cols-2 md:grid-cols-4 gap-10 border-b" style={{ borderColor: 'rgba(250,248,244,0.08)' }}>

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1.5 no-underline mb-5" aria-label="La Vall × Shariani — Inicio">
              <span className="leading-none tracking-tight font-semibold" style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', color: 'var(--ivory)' }}>La Vall</span>
              <span className="opacity-40 text-sm leading-none" style={{ color: 'var(--ivory)' }} aria-hidden="true">×</span>
              <span className="leading-none tracking-tight font-semibold" style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', color: 'var(--ivory)' }}>Shariani</span>
            </Link>
            <p style={{ fontSize: '13px', color: 'rgba(250,248,244,0.5)', lineHeight: 1.65, maxWidth: '200px', fontFamily: 'var(--font-body)' }}>
              {f.tagline.split('\n').map((line, i) => (
                <span key={i}>{line}{i < 2 && <br />}</span>
              ))}
            </p>
          </div>

          {/* Proyecto */}
          <div>
            <h3 className="text-[11px] tracking-[0.16em] uppercase mb-4 font-semibold" style={{ color: 'rgba(250,248,244,0.45)', fontFamily: 'var(--font-body)' }}>
              {f.projectCol}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {f.navLinks.map((link, i) => (
                <li key={NAV_HREFS[i]}>
                  <a
                    href={NAV_HREFS[i]}
                    className="text-[13px] no-underline transition-colors"
                    style={{ color: 'rgba(250,248,244,0.6)', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(250,248,244,0.6)'; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="text-[11px] tracking-[0.16em] uppercase mb-4 font-semibold" style={{ color: 'rgba(250,248,244,0.45)', fontFamily: 'var(--font-body)' }}>
              {f.helpCol}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {f.helpLinks.map((link, i) => (
                <li key={link.label}>
                  <a
                    href={HELP_HREFS[i].href}
                    target={HELP_HREFS[i].external ? '_blank' : undefined}
                    rel={HELP_HREFS[i].external ? 'noopener noreferrer' : undefined}
                    className="text-[13px] no-underline transition-colors"
                    style={{ color: 'rgba(250,248,244,0.6)', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(250,248,244,0.6)'; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bizum */}
          <div>
            <h3 className="text-[11px] tracking-[0.16em] uppercase mb-4 font-semibold" style={{ color: 'rgba(250,248,244,0.45)', fontFamily: 'var(--font-body)' }}>
              {f.bizumCol}
            </h3>
            <p className="font-bold" style={{ fontSize: '32px', color: 'rgba(250,248,244,0.95)', lineHeight: 1, letterSpacing: '0.08em', fontFamily: 'var(--font-body)', userSelect: 'all' }}>
              03367
            </p>
            <p className="mt-2" style={{ fontSize: '12px', color: 'rgba(250,248,244,0.4)', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
              Fundació Montblanc<br />
              <span style={{ color: 'rgba(250,248,244,0.6)', fontStyle: 'italic' }}>{f.bizumSubject}</span>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{ fontSize: '11px', color: 'rgba(250,248,244,0.35)' }}>
          <p>{f.copyright(year)}</p>
          <div className="flex items-center gap-4">
            {[
              { label: f.privacy, href: '#' },
              { label: f.cookies, href: '#' },
              { label: f.contact, href: '#contacto' },
            ].map((item, i) => (
              <span key={item.label} className="inline-flex items-center gap-4">
                {i > 0 && <span aria-hidden="true">·</span>}
                <a
                  href={item.href}
                  className="no-underline transition-colors"
                  style={{ color: 'rgba(250,248,244,0.35)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(250,248,244,0.65)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(250,248,244,0.35)'; }}
                >
                  {item.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
