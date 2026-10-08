'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { Lang } from '@/data/translations';

const LANGUAGES: Lang[] = ['CA', 'ES', 'EN'];

export function Navbar() {
  const { lang, setLang, tr } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { href: '/', label: tr.nav.home },
    { href: '/#proyecto', label: tr.nav.project },
    { href: '/obra-real', label: tr.nav.obres },
    { href: '/blog', label: tr.nav.blog },
    { href: '/#impacto', label: tr.nav.impact },
    { href: '/#ayuda', label: tr.nav.help },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setLangOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  const handleLangSelect = (l: Lang) => {
    setLang(l);
    setLangOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || menuOpen
          ? 'bg-[var(--ivory)] border-b border-[var(--border)]'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ height: '64px' }}
    >
      <div className="container-page h-full flex items-center justify-between gap-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex-shrink-0 flex items-center gap-1.5 no-underline"
          aria-label="La Vall × Shariani — Inicio"
        >
          <span
            className={`text-[1.125rem] leading-none tracking-tight font-semibold transition-colors duration-300 ${
              isScrolled || menuOpen ? 'text-[var(--ink)]' : 'text-white'
            }`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            La Vall
          </span>
          <span
            className={`text-sm leading-none opacity-60 transition-colors duration-300 ${
              isScrolled || menuOpen ? 'text-[var(--text-secondary)]' : 'text-white/60'
            }`}
            aria-hidden="true"
          >
            ×
          </span>
          <span
            className={`text-[1.125rem] leading-none tracking-tight font-semibold transition-colors duration-300 ${
              isScrolled || menuOpen ? 'text-[var(--ink)]' : 'text-white'
            }`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Shariani
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegació principal">
          {navLinks.map((link) => {
            const isPage = link.href.startsWith('/');
            const cls = `px-3 py-1.5 text-sm transition-colors duration-300 rounded link-underline ${
              isScrolled || menuOpen
                ? 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                : 'text-white/80 hover:text-white'
            }`;
            return isPage ? (
              <Link key={link.href} href={link.href} className={cls} style={{ fontWeight: 400 }}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className={cls} style={{ fontWeight: 400 }}>
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right controls — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 text-[0.8125rem] transition-colors duration-300 px-2.5 py-1.5 rounded-lg border ${
                isScrolled || menuOpen
                  ? 'text-[var(--ink-muted)] hover:text-[var(--ink)] border-[var(--border)] hover:border-[var(--forest)] bg-transparent hover:bg-[var(--paper)]'
                  : 'text-white/80 hover:text-white border-white/20 hover:border-white/50 bg-transparent'
              } transition-all duration-200`}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label={tr.nav.langLabel(lang)}
            >
              <Globe size={13} strokeWidth={1.5} aria-hidden="true" />
              <span className="font-semibold">{lang}</span>
              <svg
                width="8" height="5" viewBox="0 0 8 5" fill="none"
                className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {langOpen && (
              <div
                role="listbox"
                aria-label="Seleccionar idioma"
                className="absolute right-0 top-full mt-1.5 bg-[var(--ivory)] border border-[var(--border)] rounded-lg shadow-md z-10 min-w-[88px] overflow-hidden"
              >
                {LANGUAGES.map((l) => (
                  <button
                    key={l}
                    role="option"
                    aria-selected={lang === l}
                    onClick={() => handleLangSelect(l)}
                    className={`w-full text-left text-[0.8125rem] px-3.5 py-2 hover:bg-[var(--paper)] transition-colors flex items-center justify-between gap-2 ${
                      lang === l ? 'text-[var(--forest)] font-semibold' : 'text-[var(--ink-muted)]'
                    }`}
                  >
                    <span>{l}</span>
                    {lang === l && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)]" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Donar CTA */}
          <Link href="/#ayuda" className="btn-primary text-sm px-5 py-2">
            {tr.nav.donate}
          </Link>
        </div>

        {/* Mobile: lang + menu */}
        <div className="md:hidden flex items-center gap-2">
          {/* Compact lang pill on mobile */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1 px-2 py-1 rounded border text-[0.75rem] font-semibold transition-all duration-200 ${
                isScrolled || menuOpen
                  ? 'text-[var(--ink-muted)] border-[var(--border)]'
                  : 'text-white/80 border-white/25'
              }`}
              aria-label={`Idioma: ${lang}`}
            >
              <Globe size={12} strokeWidth={1.5} />
              <span>{lang}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1.5 bg-[var(--ivory)] border border-[var(--border)] rounded-lg shadow-md z-50 min-w-[80px] overflow-hidden">
                {LANGUAGES.map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLangSelect(l)}
                    className={`w-full text-left text-[0.8125rem] px-3 py-2 hover:bg-[var(--paper)] transition-colors ${
                      lang === l ? 'text-[var(--forest)] font-semibold' : 'text-[var(--ink-muted)]'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-1.5 rounded transition-colors duration-300 ${
              isScrolled || menuOpen ? 'text-[var(--ink)]' : 'text-white'
            }`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? tr.nav.closeMenu : tr.nav.openMenu}
          >
            {menuOpen ? (
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 top-16 bg-[var(--ivory)] z-40 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegació"
        >
          <nav className="flex flex-col px-6 py-8 gap-1" aria-label="Menú principal">
            {navLinks.map((link) => {
              const isPage = link.href.startsWith('/');
              const cls = 'py-3.5 text-lg text-[var(--ink)] border-b border-[var(--border-light)] hover:text-[var(--forest)] transition-colors';
              const style = { fontFamily: 'var(--font-sans)', fontWeight: 400 };
              return isPage ? (
                <Link key={link.href} href={link.href} onClick={handleNavClick} className={cls} style={style}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} onClick={handleNavClick} className={cls} style={style}>
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="px-6 mt-2">
            <Link
              href="/#ayuda"
              onClick={handleNavClick}
              className="btn-primary w-full justify-center text-base py-3"
            >
              {tr.nav.donate}
            </Link>
          </div>
          <div className="px-6 mt-6 flex gap-3">
            {LANGUAGES.map((l) => (
              <button
                key={l}
                onClick={() => handleLangSelect(l)}
                className={`text-sm px-4 py-2 rounded-lg border transition-colors font-medium ${
                  lang === l
                    ? 'bg-[var(--forest)] text-white border-[var(--forest)]'
                    : 'text-[var(--ink-muted)] border-[var(--border)] hover:border-[var(--forest)]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
