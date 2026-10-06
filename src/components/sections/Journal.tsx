'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { images } from '@/data/images';
import { useLang } from '@/context/LangContext';

const ENTRY_IMAGES = [
  images.journalEntry01.src,
  images.journalEntry02.src,
  images.journalEntry03.src,
];

export function Journal() {
  const { tr } = useLang();
  const j = tr.journal;
  const entries = j.entries.map((e, i) => ({ id: i + 1, image: ENTRY_IMAGES[i], tag: e.tag, date: e.date, title: e.title }));

  const [activeSlide, setActiveSlide] = useState(0);
  const [readingEntry, setReadingEntry] = useState<number | null>(null);

  const handleNext = () => setActiveSlide((prev) => (prev + 1) % entries.length);
  const handlePrev = () => setActiveSlide((prev) => (prev - 1 + entries.length) % entries.length);

  useEffect(() => {
    if (readingEntry === null) return;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setReadingEntry(null); };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [readingEntry]);

  const openEntry = entries.find((e) => e.id === readingEntry);

  return (
    <section
      id="diario"
      className="py-20 md:py-28 relative"
      style={{ background: 'var(--ivory)' }}
      aria-labelledby="journal-heading"
    >
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-lg">
            <p className="section-label mb-3">{j.sectionLabel}</p>
            <h2
              id="journal-heading"
              className="font-heading leading-[1.08] mb-4 text-[var(--ink)] font-semibold"
              style={{ fontSize: 'clamp(30px, 3.6vw, 42px)', letterSpacing: '-0.025em', fontFamily: 'var(--font-editorial)' }}
            >
              {j.heading}
            </h2>
            <p className="mb-6 leading-relaxed font-sans text-[var(--ink-muted)]" style={{ fontSize: '15px' }}>
              {j.body}
            </p>
            <button onClick={() => setReadingEntry(1)} className="btn-secondary group inline-flex items-center gap-2">
              <span>{j.readLatest}</span>
              <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-1 duration-300" />
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--forest)] hover:bg-[var(--paper)] transition-all cursor-pointer" aria-label={j.prevEntry}>
              <ArrowLeft size={16} strokeWidth={1.75} />
            </button>
            <button onClick={handleNext} className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--forest)] hover:bg-[var(--paper)] transition-all cursor-pointer" aria-label={j.nextEntry}>
              <ArrowRight size={16} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {entries.map((entry, idx) => {
            const isActive = idx === activeSlide;
            return (
              <article
                key={entry.id}
                onClick={() => setReadingEntry(entry.id)}
                className={`group flex flex-col gap-3.5 cursor-pointer p-2.5 rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--paper)]/60 shadow-sm border border-[var(--forest-mid)]/20' : 'hover:bg-[var(--paper)]/40 border border-transparent'}`}
              >
                <div className="relative overflow-hidden rounded-md aspect-[16/10] bg-[var(--border)] border border-[var(--border)] shadow-sm image-zoom-container">
                  <Image src={entry.image} alt={entry.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-sans font-medium text-[13px] text-[var(--ink)]">{entry.tag}</span>
                    <span className="text-[12px] text-[var(--text-secondary)]">{entry.date}</span>
                  </div>
                  <h3 className="font-sans text-[14px] text-[var(--ink-muted)] leading-relaxed group-hover:text-[var(--forest)] transition-colors">
                    {entry.title}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {openEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ivory)]/95 backdrop-blur-md overflow-y-auto pt-20 pb-20">
          <button
            onClick={() => setReadingEntry(null)}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:bg-[var(--paper)] transition-colors z-10"
            aria-label={j.closeArticle}
          >
            <span className="text-xl leading-none">&times;</span>
          </button>

          <article className="max-w-2xl w-full mx-auto px-6 bg-white shadow-xl border border-[var(--border)] rounded-xl overflow-hidden my-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative w-full aspect-[21/9]">
              <Image src={openEntry.image} alt={openEntry.title} fill className="object-cover" />
            </div>
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-body text-xs font-bold uppercase tracking-widest text-[var(--forest)]">{openEntry.tag}</span>
                <span className="font-body text-xs text-[var(--text-secondary)]">{openEntry.date}</span>
              </div>
              <h1 className="font-editorial text-3xl md:text-4xl text-[var(--ink)] leading-tight mb-8">{openEntry.title}</h1>
              <div className="font-body text-[15px] leading-relaxed text-[var(--ink-muted)] space-y-5">
                <p dangerouslySetInnerHTML={{ __html: j.articleBody1('Kilifi County, Kènia.') }} />
                <p>{j.articleBody2}</p>
                <blockquote className="border-l-2 border-[var(--forest)] pl-5 italic text-[var(--ink)] my-8 text-lg font-editorial">
                  &ldquo;{j.articleQuote}&rdquo;
                </blockquote>
                <p>{j.articleBody3}</p>
                <p>{j.articleBody4}</p>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
