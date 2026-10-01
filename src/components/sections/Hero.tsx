'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { images } from '@/data/images';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    if (!hero || !bg || !content) return;

    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let rafId: number;
    let lastScrollY = -1;

    const onScroll = () => {
      const sy = window.scrollY;
      if (Math.abs(sy - lastScrollY) < 0.5) return;
      lastScrollY = sy;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const heroH = hero.offsetHeight;
        if (sy > heroH) return; // past hero, stop

        // Image: subtle 10% parallax — slow down bg relative to scroll
        const bgOffset = sy * 0.28;
        bg.style.transform = `translate3d(0, ${bgOffset}px, 0) scale(1.18)`;

        // Content: gentle upward drift + opacity fade
        const contentOffset = sy * 0.08;
        const opacity = Math.max(0, 1 - sy / (heroH * 0.72));
        content.style.transform = `translate3d(0, ${-contentOffset}px, 0)`;
        content.style.opacity = String(opacity);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(600px, 90vh, 860px)' }}
      aria-label="Presentación del proyecto La Vall × Shariani"
    >
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          transform: 'translate3d(0, 0, 0) scale(1.18)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      >
        <Image
          src={images.heroSchool.src}
          alt={images.heroSchool.alt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          aria-hidden="true"
        />
      </div>

      {/* Left-side directional gradient — deep legibility */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(14,22,16,0.96) 0%, rgba(14,22,16,0.80) 28%, rgba(14,22,16,0.42) 56%, rgba(14,22,16,0.10) 80%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: '45%',
          background: 'linear-gradient(to top, rgba(14,22,16,0.55) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 container-page h-full flex flex-col justify-center"
        style={{
          paddingTop: '130px',
          paddingBottom: '90px',
          willChange: 'transform, opacity',
        }}
      >
        <div className="max-w-2xl sm:max-w-3xl">
          {/* Chapter eyebrow — Manrope small-caps label */}
          <p
            className="mb-5 font-semibold uppercase"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              color: 'rgba(250,248,244,0.55)',
            }}
          >
            Shariani Primary School · Kilifi County, Kenia
          </p>

          {/* Headline — Young Serif */}
          <h1
            className="text-[var(--ivory)] leading-[1.08] mb-6"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 400,
              fontSize: 'clamp(32px, 4.4vw, 56px)',
              letterSpacing: '-0.02em',
            }}
          >
            <span className="sm:whitespace-nowrap">Donde empieza la escuela,</span><br />
            comienza el futuro.
          </h1>

          {/* Body — Manrope */}
          <p
            className="mb-10 leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              color: 'rgba(250,248,244,0.85)',
              maxWidth: '440px',
            }}
          >
            Impulsamos la educación en Kenia creando espacios dignos y seguros para aprender. Un proyecto de colaboración real donde cada aportación se transforma en ladrillos, pupitres y oportunidades.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5">
            <a href="#proyecto" className="btn-white group">
              <span>Conoce el proyecto</span>
            </a>
            <a href="#ayuda" className="btn-outline group">
              <span>Ayuda</span>
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 z-10 pointer-events-none"
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <div
          className="w-[1px] mx-auto"
          style={{
            height: '52px',
            background: 'linear-gradient(to bottom, rgba(250,248,244,0.55), transparent)',
            animation: 'hero-line-pulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
