'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { Lang } from '@/data/translations';
import { LOCALES } from '@/lib/site';
import { saveLangSwitchScroll } from '@/components/ui/ScrollRestorer';

const LANGUAGES: { code: Lang; locale: string; hrefLang: string }[] = [
  { code: 'ES', locale: 'es', hrefLang: 'es' },
  { code: 'CA', locale: 'ca', hrefLang: 'ca' },
  { code: 'EN', locale: 'en', hrefLang: 'en' },
];

/** Derive the equivalent URL in another locale by swapping the first path segment. */
function switchLocale(pathname: string, toLocale: string): string {
  if (!pathname) return `/${toLocale}`;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return `/${toLocale}`;
  if ((LOCALES as readonly string[]).includes(segments[0])) {
    segments[0] = toLocale;
    return `/${segments.join('/')}`;
  }
  return `/${toLocale}/${segments.join('/')}`;
}

export function Navbar() {
  const { lang, setLang, tr } = useLang();
  const pathname = usePathname();

  // Detect current locale from URL path first, fallback to context
  const pathLocale = pathname?.split('/').filter(Boolean)[0];
  const currentLocale = (LOCALES as readonly string[]).includes(pathLocale)
    ? pathLocale
    : (LANGUAGES.find((l) => l.code === lang)?.locale ?? 'es');
  const isHome = pathname === `/${currentLocale}` || pathname === '/';

  const [isScrolled, setIsScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // ── Nav items in page order ─────────────────────────────────────────────
  // 1. El proyecto (#proyecto / /que-es-shariani)
  // 2. [Obras] (/obra-real)
  // 3. Impacto (#impacto / /voluntariado-kenya)
  // 4. Colabora (/donar)
  const navItems = useMemo(
    () => [
      {
        id: 'proyecto',
        href: isHome ? `/${currentLocale}#proyecto` : `/${currentLocale}/que-es-shariani`,
        label: tr.nav.project,
      },
      {
        id: 'obras',
        href: isHome ? `/${currentLocale}#obras` : `/${currentLocale}/obra-real`,
        label: tr.nav.obres,
      },
      {
        id: 'impacto',
        href: isHome ? `/${currentLocale}#impacto` : `/${currentLocale}/voluntariado-kenya`,
        label: tr.nav.impact,
      },
      {
        id: 'blog',
        href: `/${currentLocale}/blog`,
        label: tr.nav.blog || 'Blog',
      },
      {
        id: 'colabora',
        href: `/${currentLocale}/donar`,
        label: tr.nav.colabora,
      },
    ],
    [currentLocale, isHome, tr.nav.project, tr.nav.obres, tr.nav.impact, tr.nav.blog, tr.nav.colabora]
  );

  // ── Scroll & Header Height ────────────────────────────────────────────────
  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // ── Active section detection + URL hash update ─────────────────────────────
  useEffect(() => {
    if (!isHome) {
      if (pathname.includes('/blog')) setActiveSection('blog');
      else if (pathname.includes('/obra-real')) setActiveSection('obras');
      else if (pathname.includes('/que-es-shariani')) setActiveSection('proyecto');
      else if (pathname.includes('/voluntariado-kenya')) setActiveSection('impacto');
      else if (pathname.includes('/donar')) setActiveSection('colabora');
      return;
    }

    const sectionIds = ['proyecto', 'obras', 'impacto', 'donar', 'colabora'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && sectionIds.includes(currentHash)) {
      setActiveSection(currentHash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            // Update URL hash smoothly without jump
            if (window.location.hash !== `#${id}`) {
              window.history.replaceState(null, '', `/${currentLocale}#${id}`);
            }
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [isHome, currentLocale]);

  // ── Sliding underline calculation (250ms) ──────────────────────────────────
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const updateSlider = () => {
      const activeIndex = navItems.findIndex((item) => item.id === activeSection);
      if (activeIndex !== -1 && linkRefs.current[activeIndex]) {
        const el = linkRefs.current[activeIndex];
        if (el) {
          setSliderStyle({
            left: el.offsetLeft,
            width: el.offsetWidth,
            opacity: 1,
          });
          return;
        }
      }
      // Fade out indicator when hero or donar is active
      setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
    };

    updateSlider();
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [activeSection, navItems]);

  // ── Outside click closes language selector ─────────────────────────────────
  useEffect(() => {
    if (!langOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInsideDesktop = desktopLangRef.current?.contains(target);
      const clickedInsideMobile = mobileLangRef.current?.contains(target);
      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langOpen]);

  // ── Escape key closes menus ────────────────────────────────────────────────
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

  // ── Body scroll lock on mobile menu ────────────────────────────────────────
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
    setLangOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled || menuOpen
          ? 'h-14 bg-[var(--ivory)]/92 backdrop-blur-md border-b border-[var(--border)]/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
          : 'h-16 bg-gradient-to-b from-black/60 via-black/20 to-transparent backdrop-blur-[2px] border-b border-white/[0.08]'
      }`}
    >
      <div className="container-page h-full flex items-center justify-between gap-4">
        {/* Wordmark */}
        <Link
          href={`/${currentLocale}`}
          className="flex-shrink-0 flex items-center gap-1.5 no-underline focus-visible:outline-2 focus-visible:outline-[var(--forest)]"
          aria-label="La Vall × Shariani"
        >
          <span
            className={`text-[1.125rem] leading-none tracking-tight font-semibold transition-colors duration-300 ${
              isScrolled || menuOpen
                ? 'text-[var(--ink)]'
                : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
            }`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            La Vall
          </span>
          <span
            className={`text-sm leading-none opacity-60 transition-colors duration-300 ${
              isScrolled || menuOpen
                ? 'text-[var(--text-secondary)]'
                : 'text-white/70'
            }`}
            aria-hidden="true"
          >
            ×
          </span>
          <span
            className={`text-[1.125rem] leading-none tracking-tight font-semibold transition-colors duration-300 ${
              isScrolled || menuOpen
                ? 'text-[var(--ink)]'
                : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
            }`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Shariani
          </span>
        </Link>

        {/* Desktop Nav: in-page anchors with 250ms sliding underline */}
        <nav
          ref={navContainerRef}
          className="hidden md:flex items-center gap-1 relative py-1"
          aria-label={tr.nav.mainNavAria}
        >
          {navItems.map((link, idx) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                ref={(el) => {
                  linkRefs.current[idx] = el;
                }}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full focus-visible:outline-2 focus-visible:outline-[var(--forest)] ${
                  isScrolled || menuOpen
                    ? isActive
                      ? 'text-[var(--forest)] font-semibold'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    : isActive
                    ? 'text-white font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                    : 'text-white/85 hover:text-white hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          {/* Sliding underline indicator (250ms cubic-bezier) */}
          <span
            className="absolute bottom-0 h-[2px] rounded-full pointer-events-none transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              left: `${sliderStyle.left}px`,
              width: `${sliderStyle.width}px`,
              opacity: sliderStyle.opacity,
              backgroundColor:
                isScrolled || menuOpen ? 'var(--forest)' : '#FFFFFF',
              boxShadow:
                isScrolled || menuOpen
                  ? 'none'
                  : '0 0 8px rgba(255,255,255,0.6)',
            }}
            aria-hidden="true"
          />
        </nav>

        {/* Right Controls: Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language selector dropdown */}
          <div ref={desktopLangRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 text-[0.8125rem] transition-all duration-200 px-3 py-1.5 rounded-full border cursor-pointer ${
                isScrolled || menuOpen
                  ? 'text-[var(--ink-muted)] hover:text-[var(--ink)] border-[var(--border)] hover:border-[var(--forest)] bg-white/70 hover:bg-white backdrop-blur-xs'
                  : 'text-white/90 hover:text-white border-white/25 hover:border-white/50 bg-white/10 backdrop-blur-md shadow-xs'
              }`}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label={tr.nav.langLabel(lang)}
            >
              <Globe size={13} strokeWidth={1.5} aria-hidden="true" />
              <span className="font-semibold">{lang}</span>
              <svg
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="none"
                className={`transition-transform duration-200 ${
                  langOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                <path
                  d="M1 1l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {langOpen && (
              <div
                role="listbox"
                aria-label={tr.nav.selectLangAria}
                className="absolute right-0 top-full mt-1.5 bg-[var(--ivory)] border border-[var(--border)] rounded-xl shadow-lg z-20 min-w-[96px] overflow-hidden py-1"
              >
                {LANGUAGES.map((l) => (
                  <Link
                    key={l.code}
                    href={switchLocale(pathname, l.locale)}
                    hrefLang={l.hrefLang}
                    role="option"
                    aria-selected={lang === l.code}
                    onClick={() => {
                      saveLangSwitchScroll();
                      setLang(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left text-[0.8125rem] px-3.5 py-2 hover:bg-[var(--paper)] transition-colors flex items-center justify-between gap-2 ${
                      lang === l.code
                        ? 'text-[var(--forest)] font-semibold'
                        : 'text-[var(--ink-muted)]'
                    }`}
                  >
                    <span>{l.code}</span>
                    {lang === l.code && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[var(--forest)]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Donar (characteristic blue pill button with soft elevation) */}
          <Link
            href={`/${currentLocale}/donar`}
            className="relative inline-flex items-center justify-center text-sm font-semibold px-5 py-2 rounded-full text-white bg-[var(--forest)] hover:bg-[var(--forest-dark)] border border-white/20 shadow-[0_2px_10px_rgba(24,110,215,0.35)] hover:shadow-[0_4px_16px_rgba(24,110,215,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {tr.nav.donate}
          </Link>
        </div>

        {/* Mobile controls: "Donar" button stays visible outside the menu */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile language toggle */}
          <div ref={mobileLangRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] min-w-[44px] rounded-full border text-[0.75rem] font-semibold transition-all duration-200 cursor-pointer ${
                isScrolled || menuOpen
                  ? 'text-[var(--ink-muted)] border-[var(--border)] bg-white/70'
                  : 'text-white/90 border-white/30 bg-white/10 backdrop-blur-md'
              }`}
              aria-label={tr.nav.langLabel(lang)}
            >
              <Globe size={13} strokeWidth={1.5} />
              <span>{lang}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1.5 bg-[var(--ivory)] border border-[var(--border)] rounded-lg shadow-md z-50 min-w-[80px] overflow-hidden">
                {LANGUAGES.map((l) => (
                  <Link
                    key={l.code}
                    href={switchLocale(pathname, l.locale)}
                    hrefLang={l.hrefLang}
                    onClick={() => {
                      saveLangSwitchScroll();
                      setLang(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left text-[0.8125rem] px-3.5 py-2.5 min-h-[44px] flex items-center hover:bg-[var(--paper)] transition-colors ${
                      lang === l.code
                        ? 'text-[var(--forest)] font-semibold'
                        : 'text-[var(--ink-muted)]'
                    }`}
                  >
                    {l.code}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Donar filled button stays visible outside mobile menu */}
          <Link
            href={`/${currentLocale}/donar`}
            className="relative inline-flex items-center justify-center text-xs font-semibold px-4 py-2 min-h-[44px] rounded-full text-white bg-[var(--forest)] hover:bg-[var(--forest-dark)] border border-white/20 shadow-[0_2px_8px_rgba(24,110,215,0.3)] transition-all duration-200"
          >
            {tr.nav.donate}
          </Link>

          {/* Hamburger toggle */}
          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded transition-colors duration-200 cursor-pointer ${
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

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 top-14 bg-[var(--ivory)] z-40 flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
          aria-label={tr.nav.navMenuAria}
        >
          <nav
            className="flex flex-col px-6 py-8 gap-1 overflow-y-auto"
            aria-label={tr.nav.mobileNavAria}
          >
            {navItems.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleNavClick}
                className="py-3.5 text-lg text-[var(--ink)] border-b border-[var(--border-light)] hover:text-[var(--forest)] transition-colors"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Bottom language options */}
          <div className="p-6 border-t border-[var(--border)] bg-[var(--paper)] flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
              {tr.nav.langLabel(lang)}
            </span>
            <div className="flex gap-2">
              {LANGUAGES.map((l) => (
                <Link
                  key={l.code}
                  href={switchLocale(pathname, l.locale)}
                  hrefLang={l.hrefLang}
                  onClick={() => {
                    saveLangSwitchScroll();
                    setLang(l.code);
                    setMenuOpen(false);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors font-semibold ${
                    lang === l.code
                      ? 'bg-[var(--forest)] text-white border-[var(--forest)]'
                      : 'text-[var(--ink-muted)] border-[var(--border)] bg-white hover:border-[var(--forest)]'
                  }`}
                >
                  {l.code}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
