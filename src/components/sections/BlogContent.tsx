'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, User, ArrowRight, X, Sparkles } from 'lucide-react';
import { images } from '@/data/images';
import { useLang } from '@/context/LangContext';

const ENTRY_IMAGES = [
  images.heroSchool.src,
  images.fase3_1.src,
  images.colaborarOngs.src,
];

export function BlogContent() {
  const { tr } = useLang();
  const j = tr.journal;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [readingEntryIndex, setReadingEntryIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: j.filterAll },
    { id: 'stories', label: j.filterStories },
    { id: 'works', label: j.filterWorks },
    { id: 'community', label: j.filterCommunity },
  ];

  const entriesWithImages = j.entries.map((entry, idx) => ({
    ...entry,
    image: ENTRY_IMAGES[idx % ENTRY_IMAGES.length],
    id: idx,
  }));

  const filteredEntries = selectedCategory === 'all'
    ? entriesWithImages
    : entriesWithImages.filter((entry) => {
        if (selectedCategory === 'stories') return entry.category === j.filterStories;
        if (selectedCategory === 'works') return entry.category === j.filterWorks;
        if (selectedCategory === 'community') return entry.category === j.filterCommunity;
        return true;
      });

  useEffect(() => {
    if (readingEntryIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setReadingEntryIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [readingEntryIndex]);

  const activeEntry = readingEntryIndex !== null ? entriesWithImages[readingEntryIndex] : null;

  return (
    <div className="py-12 md:py-16">
      <div className="container-page">
        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[var(--border)]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[var(--forest)] text-white shadow-sm'
                  : 'bg-[var(--paper)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--border-light)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Lead Featured Article */}
        {filteredEntries.length > 0 && selectedCategory === 'all' && (
          <article
            onClick={() => setReadingEntryIndex(filteredEntries[0].id)}
            className="mb-14 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--paper)]/50 card-interactive cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[420px] overflow-hidden">
              <Image
                src={filteredEntries[0].image}
                alt={filteredEntries[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[var(--ivory)]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[var(--forest)] flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{filteredEntries[0].tag}</span>
              </div>
            </div>
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] mb-4 font-mono">
                  <span>{filteredEntries[0].date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {filteredEntries[0].readTime}</span>
                </div>
                <h2
                  style={{ fontFamily: 'var(--font-editorial)' }}
                  className="text-2xl sm:text-3xl text-[var(--ink)] font-normal leading-tight mb-4 group-hover:text-[var(--forest)] transition-colors"
                >
                  {filteredEntries[0].title}
                </h2>
                <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed mb-6">
                  {filteredEntries[0].excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[var(--ink)] font-medium">
                  <User className="w-3.5 h-3.5 text-[var(--forest)]" />
                  <span>{filteredEntries[0].author}</span>
                </div>
                <span className="text-sm font-semibold text-[var(--forest)] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>{j.readLatest}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </article>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory === 'all' ? filteredEntries.slice(1) : filteredEntries).map((entry) => (
            <article
              key={entry.id}
              onClick={() => setReadingEntryIndex(entry.id)}
              className="bg-[var(--ivory)] border border-[var(--border)] rounded-xl overflow-hidden card-interactive cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper)]">
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[var(--ivory)]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[var(--forest)]">
                    {entry.tag}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] mb-3 font-mono">
                    <span>{entry.date}</span>
                    <span>•</span>
                    <span>{entry.readTime}</span>
                  </div>
                  <h3
                    style={{ fontFamily: 'var(--font-editorial)' }}
                    className="text-xl text-[var(--ink)] font-normal leading-snug mb-3 group-hover:text-[var(--forest)] transition-colors"
                  >
                    {entry.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                    {entry.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-4 flex items-center justify-between text-xs text-[var(--text-secondary)] border-t border-[var(--border-light)]">
                <span className="font-medium text-[var(--ink)]">{entry.author}</span>
                <span className="text-[var(--forest)] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {activeEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
          <div className="relative max-w-3xl w-full bg-[var(--ivory)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 pb-0 flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--paper)] text-[var(--forest)] border border-[var(--border)]">
                  {activeEntry.tag}
                </span>
                <span className="text-xs text-[var(--text-secondary)] font-mono">{activeEntry.date}</span>
              </div>
              <button
                onClick={() => setReadingEntryIndex(null)}
                className="w-9 h-9 rounded-full bg-[var(--paper)] hover:bg-[var(--border)] text-[var(--ink)] flex items-center justify-center transition-colors cursor-pointer"
                aria-label={j.closeArticle}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 overflow-y-auto">
              <h2
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-2xl sm:text-3.5xl text-[var(--ink)] font-normal leading-tight mb-4"
              >
                {activeEntry.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] font-mono pb-6 mb-6 border-b border-[var(--border)]">
                <span className="text-[var(--ink)] font-semibold">{activeEntry.author}</span>
                <span>•</span>
                <span>{activeEntry.readTime}</span>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-8 border border-[var(--border)]">
                <Image
                  src={activeEntry.image}
                  alt={activeEntry.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-5 text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
                {activeEntry.fullText.map((paragraph, pIdx) => {
                  const isQuote = paragraph.startsWith('«') || paragraph.startsWith('“');
                  if (isQuote) {
                    return (
                      <blockquote
                        key={pIdx}
                        style={{ fontFamily: 'var(--font-editorial)' }}
                        className="p-5 my-6 border-l-4 border-[var(--forest)] bg-[var(--paper)] rounded-r-lg text-lg text-[var(--ink)] italic"
                      >
                        {paragraph}
                      </blockquote>
                    );
                  }
                  return <p key={pIdx}>{paragraph}</p>;
                })}
              </div>

              <div className="mt-10 pt-6 border-t border-[var(--border)] flex justify-between items-center">
                <span className="text-xs text-[var(--text-secondary)]">La Vall × Shariani · Kilifi County</span>
                <button
                  onClick={() => setReadingEntryIndex(null)}
                  className="btn-secondary text-xs px-4 py-2"
                >
                  {j.closeArticle}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
