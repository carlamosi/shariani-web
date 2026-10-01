import Image from 'next/image';
import { Building, BookOpen, Users } from 'lucide-react';

const partners = [
  {
    name: 'La Vall',
    role: 'Barcelona, Catalunya',
    icon: <Building size={32} strokeWidth={1} />,
  },
  {
    name: 'Shariani Primary School',
    role: 'Kilifi, Kenya',
    icon: <BookOpen size={32} strokeWidth={1} />,
  },
  {
    name: 'Volunteer Connect Kenya',
    role: 'Organización local',
    icon: <Users size={32} strokeWidth={1} />,
  },
];

export function Partners() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="partners-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/placeholders/community.svg"
          alt="Paisaje cálido de Kenia al atardecer"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay gradient for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(28,28,26,0.85) 0%, rgba(42,84,56,0.7) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="section-label mb-4 text-[var(--ivory)] opacity-80">
              Juntos y unidas
            </p>
            <h2
              id="partners-heading"
              className="font-serif leading-[1.18] mb-5 text-[var(--ivory)]"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
              }}
            >
              Tres organizaciones,
              <br />
              un mismo propósito.
            </h2>
            <p
              className="text-[var(--ivory)] opacity-90 leading-relaxed mb-8 max-w-md"
              style={{ fontSize: '15px' }}
            >
              La Vall, Shariani Primary School y Volunteer Connect Kenya
              trabajamos en red para hacer posible este proyecto y asegurar
              su viabilidad a largo plazo.
            </p>
            <a
              href="#"
              className="btn-outline text-[13px] px-5 py-2.5"
            >
              Conoce nuestras organizaciones
            </a>
          </div>

          {/* Right: Logos/Icons */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-end gap-12 sm:gap-8 lg:gap-16">
            {partners.map((partner, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-3">
                <div className="text-[var(--ivory)] opacity-90">
                  {partner.icon}
                </div>
                <div>
                  <p
                    className="font-sans font-medium text-[var(--ivory)]"
                    style={{ fontSize: '14px', letterSpacing: '0.02em' }}
                  >
                    {partner.name}
                  </p>
                  <p
                    className="text-[var(--ivory)] opacity-70"
                    style={{ fontSize: '12px' }}
                  >
                    {partner.role}
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
