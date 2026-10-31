'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/data/images';
import { useLang } from '@/context/LangContext';

export function Story() {
  const { lang, tr } = useLang();
  const locale = lang.toLowerCase();
  const chapters = tr.story.chapters;
  const [activeChapter, setActiveChapter] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let mostVisible = -1;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = Number(entry.target.getAttribute('data-index'));
          }
        });
        if (mostVisible !== -1) setActiveChapter(mostVisible);
        else {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveChapter(Number(entry.target.getAttribute('data-index')));
          });
        }
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    textRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [chapters]);

  const imageKeys: ('schoolBuilding' | 'colaborarOngs' | 'laContinuidad')[] = [
    'schoolBuilding',
    'colaborarOngs',
    'laContinuidad',
  ];

  const imageAlts = tr.story.imageAlts;

  const renderBody = (ch: typeof chapters[number], i: number) => {
    if (i === 0) {
      return (
        <>
          {'body' in ch ? ch.body : null}
          <span className="block mt-3">
            <Link
              href={`/${locale}/que-es-shariani`}
              className="inline-flex items-center gap-1.5 text-[var(--forest)] font-semibold underline underline-offset-4 hover:text-[var(--forest-dark)] transition-colors text-sm"
            >
              {locale === 'ca'
                ? 'Coneix la història i dades clau de Shariani →'
                : locale === 'en'
                ? 'Discover Shariani’s history and key facts →'
                : 'Conoce la historia y cifras clave de Shariani →'}
            </Link>
          </span>
        </>
      );
    }
    if (i === 1 && 'bodyPrefix' in ch) {
      return (
        <>
          {ch.bodyPrefix}{' '}
          <a href="https://www.fundaciomontblanc.org/index.php/es/" target="_blank" rel="noopener noreferrer"
            className="text-[var(--forest)] font-semibold underline underline-offset-4 hover:text-[var(--forest-dark)] transition-colors">
            Fundació Montblanc
          </a>{' '}
          {ch.bodyMid}{' '}
          <a href="https://volunteersconnect.co.ke/" target="_blank" rel="noopener noreferrer"
            className="text-[var(--forest)] font-semibold underline underline-offset-4 hover:text-[var(--forest-dark)] transition-colors">
            Volunteer Connect Kenya Foundation
          </a>{' '}
          {ch.bodySuffix}
        </>
      );
    }
    if (i === 2) {
      return (
        <>
          {'body' in ch ? ch.body : null}
          <span className="block mt-3">
            <Link
              href={`/${locale}/voluntariado-kenya`}
              className="inline-flex items-center gap-1.5 text-[var(--forest)] font-semibold underline underline-offset-4 hover:text-[var(--forest-dark)] transition-colors text-sm"
            >
              {locale === 'ca'
                ? 'Com funciona el voluntariat de juny a Kenya →'
                : locale === 'en'
                ? 'How the June volunteering trip in Kenya works →'
                : 'Cómo funciona el voluntariado de junio en Kenia →'}
            </Link>
          </span>
        </>
      );
    }
    return 'body' in ch ? ch.body : null;
  };

  const IDS = ['01', '02', '03'];

  return (
    <section
      id="proyecto"
      className="relative w-full"
      style={{ backgroundColor: 'var(--ivory)', borderTop: '1px solid var(--border-light)' }}
      aria-label={tr.story.ariaLabel}
    >
      {/* MOBILE */}
      <div className="md:hidden container-page py-16 flex flex-col gap-16">
        {chapters.map((chapter, i) => (
          <div key={IDS[i]} className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-[var(--forest)]">
              <span className="font-mono font-bold text-xs tracking-widest">{IDS[i]}</span>
              <span className="text-[var(--text-secondary)] font-body text-xs uppercase tracking-wider">
                · {chapter.tag}
              </span>
              <div className="h-px bg-[var(--border)] flex-1" />
            </div>
            <h2
              style={{ fontFamily: 'var(--font-editorial)', lineHeight: 1.3, padding: '0.1em 0' }}
              className="font-normal text-2xl sm:text-3xl text-[var(--ink)] overflow-visible"
            >
              {chapter.title}
            </h2>
            <div className="relative -mx-6 w-[calc(100%+3rem)] sm:mx-0 sm:w-full overflow-hidden" style={{ aspectRatio: '16/10' }}>
              <Image src={images[imageKeys[i]].src} alt={imageAlts[i]} fill className="object-cover" />
            </div>
            <p style={{ fontFamily: 'var(--font-body)' }} className="text-[15px] text-[var(--ink-muted)] leading-relaxed">
              {renderBody(chapter, i)}
            </p>
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-2" style={{ minHeight: '100vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[var(--border)]">
          {chapters.map((_, idx) => {
            const isSelected = activeChapter === idx;
            return (
              <div key={IDS[idx]} className={`absolute inset-0 transition-opacity duration-700 ease-out ${isSelected ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                <Image
                  src={images[imageKeys[idx]].src}
                  alt={imageAlts[idx]}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-out"
                  style={{ transform: isSelected ? 'scale(1)' : 'scale(1.03)' }}
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              </div>
            );
          })}
        </div>

        <div className="pl-12 pr-10 xl:pl-16 xl:pr-14 pb-[30vh]">
          <div className="pt-[35vh]">
            {chapters.map((chapter, i) => (
              <div
                key={IDS[i]}
                data-index={i}
                ref={(el) => { textRefs.current[i] = el; }}
                className="min-h-[65vh] flex flex-col justify-center"
              >
                <div
                  className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity: reducedMotion || activeChapter === i ? 1 : 0.2,
                    transform: reducedMotion || activeChapter === i ? 'translateY(0)' : 'translateY(16px)',
                  }}
                >
                  <div className="mb-4 inline-flex items-center gap-2">
                    <span className="font-mono font-bold text-xs tracking-widest text-[var(--forest)]">{IDS[i]}</span>
                    <span className="text-[var(--text-secondary)] font-body text-xs uppercase tracking-wider">· {chapter.tag}</span>
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontSize: 'clamp(28px, 2.6vw, 36px)',
                      letterSpacing: '-0.02em',
                      color: 'var(--ink)',
                      lineHeight: 1.3,
                      paddingTop: '0.1em',
                      paddingBottom: '0.1em',
                      marginBottom: '1.25rem',
                      overflow: 'visible',
                    }}
                  >
                    {chapter.title}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', lineHeight: 1.75, color: 'var(--ink-muted)' }}>
                    {renderBody(chapter, i)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
