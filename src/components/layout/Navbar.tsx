'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { href: '#proyecto', label: 'El proyecto' },
  { href: '#shariani', label: 'Shariani' },
  { href: '#impacto', label: 'Impacto' },
  { href: '#ayuda', label: 'Ayuda' },
  { href: '#contacto', label: 'Contacto' },
  { href: '#diario', label: 'Blog' },
];

const languages = ['ES', 'CA', 'EN'];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('ES');
  const [langOpen, setLangOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleNavClick = () => {
    setMenuOpen(false);
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
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-sm transition-colors duration-300 rounded link-underline ${
                isScrolled || menuOpen
                  ? 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  : 'text-white/80 hover:text-white'
              }`}
              style={{ fontWeight: 400 }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1 text-[0.8125rem] transition-colors duration-300 px-2 py-1 rounded ${
                isScrolled || menuOpen
                  ? 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  : 'text-white/80 hover:text-white'
              }`}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label={`Idioma actual: ${lang}`}
            >
              <Globe size={13} strokeWidth={1.5} aria-hidden="true" />
              <span>{lang}</span>
            </button>
            {langOpen && (
              <div
                role="listbox"
                aria-label="Seleccionar idioma"
                className="absolute right-0 top-full mt-1 bg-[var(--ivory)] border border-[var(--border)] rounded shadow-sm z-10 min-w-[72px]"
              >
                {languages.map((l) => (
                  <button
                    key={l}
                    role="option"
                    aria-selected={lang === l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`w-full text-left text-[0.8125rem] px-3 py-1.5 hover:bg-[var(--paper)] transition-colors ${
                      lang === l ? 'text-[var(--forest)] font-medium' : 'text-[var(--ink-muted)]'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Donar CTA */}
          <a
            href="#ayuda"
            className="btn-primary text-sm px-5 py-2"
          >
            Donar
          </a>
        </div>

        {/* Mobile: lang + menu */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className={`p-1.5 rounded transition-colors duration-300 ${
              isScrolled || menuOpen ? 'text-[var(--ink-muted)]' : 'text-white/80'
            }`}
            aria-label={`Idioma: ${lang}`}
          >
            <Globe size={16} strokeWidth={1.5} />
          </button>
          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-1.5 rounded transition-colors duration-300 ${
              isScrolled || menuOpen ? 'text-[var(--ink)]' : 'text-white'
            }`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
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
          aria-label="Menú de navegación"
        >
          <nav
            className="flex flex-col px-6 py-8 gap-1"
            aria-label="Menú principal"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="py-3.5 text-lg text-[var(--ink)] border-b border-[var(--border-light)] hover:text-[var(--forest)] transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="px-6 mt-2">
            <a
              href="#ayuda"
              onClick={handleNavClick}
              className="btn-primary w-full justify-center text-base py-3"
            >
              Donar
            </a>
          </div>
          <div className="px-6 mt-6 flex gap-4">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setLangOpen(false); }}
                className={`text-sm px-3 py-1.5 rounded border transition-colors ${
                  lang === l
                    ? 'bg-[var(--forest)] text-white border-[var(--forest)]'
                    : 'text-[var(--ink-muted)] border-[var(--border)]'
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
