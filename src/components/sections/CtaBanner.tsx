import { ArrowRight } from 'lucide-react';

export function CtaBanner() {
  return (
    <section
      className="py-16"
      style={{ background: 'var(--forest)' }}
      aria-label="Llamada a la acción final"
    >
      <div className="container-page flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          {/* Subtle line drawing graphic placeholder */}
          <div className="hidden md:block w-20 h-20 opacity-30" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--ivory)]">
              <path d="M50 20 C 30 20, 20 40, 20 55 C 20 70, 40 80, 50 80 C 60 80, 80 70, 80 55 C 80 40, 70 20, 50 20 Z" />
              <path d="M35 45 Q 40 50, 45 45" />
              <path d="M55 45 Q 60 50, 65 45" />
              <path d="M45 60 Q 50 65, 55 60" />
            </svg>
          </div>
          
          <h2
            className="font-serif text-[var(--ivory)] leading-tight text-center md:text-left"
            style={{
              fontSize: 'clamp(22px, 2.5vw, 28px)',
              fontWeight: 300,
            }}
          >
            La educación cambia vidas.<br />
            <span className="italic">Ayúdanos a seguir construyendo.</span>
          </h2>
        </div>
        
        <a
          href="#ayuda"
          className="inline-flex items-center gap-2 bg-[var(--ivory)] text-[var(--forest-dark)] hover:bg-white transition-colors px-6 py-3 rounded-sm font-medium text-[15px]"
        >
          Donar ahora
          <ArrowRight size={16} strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}
