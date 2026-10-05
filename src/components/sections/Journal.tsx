'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { images } from '@/data/images';

const journalEntries = [
  {
    id: 1,
    image: images.journalEntry01.src,
    tag: 'Inicio del curso',
    date: '12 sept 2024',
    title: 'Primera visita de seguimiento a las obras del muro perimetral.',
  },
  {
    id: 2,
    image: images.journalEntry02.src,
    tag: 'Nuevas aulas',
    date: '28 feb 2024',
    title: 'Avance de las obras de renovación de las aulas de primaria.',
  },
  {
    id: 3,
    image: images.journalEntry03.src,
    tag: 'Comunidad y futuro',
    date: '16 nov 2023',
    title: 'Encuentro con la comunidad educativa para planificar próximos pasos.',
  },
];

export function Journal() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [readingEntry, setReadingEntry] = useState<number | null>(null);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % journalEntries.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + journalEntries.length) % journalEntries.length);
  };

  // Close modal on escape key
  useEffect(() => {
    if (readingEntry === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setReadingEntry(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [readingEntry]);

  const openEntry = journalEntries.find((e) => e.id === readingEntry);

  return (
    <section
      id="diario"
      className="py-20 md:py-28 relative"
      style={{ background: 'var(--ivory)' }}
      aria-labelledby="journal-heading"
    >
      <div className="container-page">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-lg">
            <p className="section-label mb-3">El proyecto en imágenes</p>
            <h2
              id="journal-heading"
              className="font-heading leading-[1.08] mb-4 text-[var(--ink)] font-semibold"
              style={{
                fontSize: 'clamp(30px, 3.6vw, 42px)',
                letterSpacing: '-0.025em',
                fontFamily: 'var(--font-editorial)'
              }}
            >
              Un diario de obra desde el terreno.
            </h2>
            <p
              className="mb-6 leading-relaxed font-sans text-[var(--ink-muted)]"
              style={{ fontSize: '15px' }}
            >
              Seguimos compartiendo el día a día, los avances y las personas que
              hacen posible este proyecto.
            </p>

            <button
              onClick={() => setReadingEntry(1)}
              className="btn-secondary group inline-flex items-center gap-2"
            >
              <span>Leer última entrada</span>
              <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-1 duration-300" />
            </button>
          </div>

          {/* Interactive Navigation Arrows */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--forest)] hover:bg-[var(--paper)] transition-all cursor-pointer"
              aria-label="Ver entrada anterior"
            >
              <ArrowLeft size={16} strokeWidth={1.75} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--forest)] hover:bg-[var(--paper)] transition-all cursor-pointer"
              aria-label="Ver siguiente entrada"
            >
              <ArrowRight size={16} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {journalEntries.map((entry, idx) => {
            const isActive = idx === activeSlide;
            return (
              <article
                key={entry.id}
                onClick={() => setReadingEntry(entry.id)}
                className={`group flex flex-col gap-3.5 cursor-pointer p-2.5 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--paper)]/60 shadow-sm border border-[var(--forest-mid)]/20'
                    : 'hover:bg-[var(--paper)]/40 border border-transparent'
                }`}
              >
                <div
                  className="relative overflow-hidden rounded-md aspect-[16/10] bg-[var(--border)] border border-[var(--border)] shadow-sm image-zoom-container"
                >
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span
                      className="font-sans font-medium text-[13px] text-[var(--ink)]"
                    >
                      {entry.tag}
                    </span>
                    <span
                      className="text-[12px] text-[var(--text-secondary)]"
                    >
                      {entry.date}
                    </span>
                  </div>
                  <h3
                    className="font-sans text-[14px] text-[var(--ink-muted)] leading-relaxed group-hover:text-[var(--forest)] transition-colors"
                  >
                    {entry.title}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Blog Reading Modal Overlay */}
      {openEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ivory)]/95 backdrop-blur-md overflow-y-auto pt-20 pb-20">
          <button 
            onClick={() => setReadingEntry(null)}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:bg-[var(--paper)] transition-colors z-10"
            aria-label="Cerrar artículo"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>

          <article className="max-w-2xl w-full mx-auto px-6 bg-white shadow-xl border border-[var(--border)] rounded-xl overflow-hidden my-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative w-full aspect-[21/9]">
              <Image 
                src={openEntry.image} 
                alt={openEntry.title} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-body text-xs font-bold uppercase tracking-widest text-[var(--forest)]">{openEntry.tag}</span>
                <span className="font-body text-xs text-[var(--text-secondary)]">{openEntry.date}</span>
              </div>
              <h1 className="font-editorial text-3xl md:text-4xl text-[var(--ink)] leading-tight mb-8">
                {openEntry.title}
              </h1>
              
              <div className="font-body text-[15px] leading-relaxed text-[var(--ink-muted)] space-y-5">
                <p>
                  <strong className="text-[var(--ink)]">Kilifi County, Kenia.</strong> El viaje hacia Shariani siempre empieza mucho antes de pisar el terreno. Empieza en las aulas de La Vall, en las ideas compartidas y en el deseo de construir algo que realmente importe.
                </p>
                <p>
                  Esta semana hemos dado un paso crucial. La construcción del muro perimetral no es solo una barrera física; es una garantía de seguridad. Significa que los niños pueden jugar sin riesgos, que los animales no interrumpen las clases y que el entorno escolar se convierte en un refugio protegido.
                </p>
                <blockquote className="border-l-2 border-[var(--forest)] pl-5 italic text-[var(--ink)] my-8 text-lg font-editorial">
                  &ldquo;Un espacio seguro es el primer requisito para que el aprendizaje florezca.&rdquo;
                </blockquote>
                <p>
                  Hemos visto a la comunidad involucrarse en cada mezcla de cemento y en cada ladrillo colocado. El proyecto avanza gracias a los fondos recaudados, pero toma forma real gracias al esfuerzo de las personas de Shariani que trabajan día tras día en la obra.
                </p>
                <p>
                  Seguiremos informando de los avances la próxima semana. Gracias a todos los que a través de Teaming, iHelp o Bizum hacéis que estas imágenes sean posibles.
                </p>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
