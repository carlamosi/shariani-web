'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { images } from '@/data/images';
import { useLang } from '@/context/LangContext';

export function Hero() {
  const { tr } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    if (!hero || !bg || !content) return;

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
        if (sy > heroH) {
          content.style.opacity = '0';
          return;
        }

        const bgOffset = sy * 0.28;
        bg.style.transform = `translate3d(0, ${bgOffset}px, 0) scale(1.18)`;

        const contentOffset = sy * 0.08;
        const opacity = Math.max(0, 1 - sy / (heroH * 0.72));
        content.style.transform = `translate3d(0, ${-contentOffset}px, 0)`;
        content.style.opacity = String(opacity);
      });
    };

    onScroll();
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
      aria-label={tr.hero.ariaLabel}
    >
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ transform: 'translate3d(0, 0, 0) scale(1.18)', willChange: 'transform' }}
      >
        <Image
          src={images.heroSchool.src}
          alt={(tr.hero as { imageAlt?: string }).imageAlt || images.heroSchool.alt}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, (max-width: 1440px) 100vw, 1440px"
          quality={80}
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
      </div>

      {/* Gradients — cinematic atmosphere with directional depth and subtle warm brand glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(108deg, rgba(8,16,26,0.92) 0%, rgba(8,16,26,0.72) 34%, rgba(8,16,26,0.32) 65%, rgba(8,16,26,0.08) 85%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      {/* Subtle brand blue accent glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 18% 38%, rgba(24,110,215,0.14) 0%, transparent 58%)',
        }}
        aria-hidden="true"
      />
      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: '38%',
          background:
            'linear-gradient(to top, rgba(8,16,26,0.55) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
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
        style={{ paddingTop: '130px', paddingBottom: '90px', willChange: 'transform, opacity' }}
      >
        <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl">
          {/* Eyebrow: clean editorial typography without glossy capsule */}
          <p
            className="mb-5 font-semibold uppercase text-xs text-white/80 tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {tr.hero.eyebrow}
          </p>

          <h1
            className="text-[var(--ivory)] leading-[1.08] mb-6 drop-shadow-[0_2px_14px_rgba(0,0,0,0.38)]"
            style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400, fontSize: 'clamp(34px, 4.6vw, 60px)', letterSpacing: '-0.02em' }}
          >
            <span className="sm:whitespace-nowrap">{tr.hero.headline1}</span><br />
            <span className="md:whitespace-nowrap">{tr.hero.headline2}</span>
          </h1>

          <p
            className="mb-10 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.5vw, 17.5px)', color: 'rgba(250,248,244,0.92)', maxWidth: '530px' }}
          >
            {tr.hero.body}
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="#proyecto"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-[var(--ink)] bg-white hover:bg-[var(--ivory)] hover:text-[var(--forest)] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.22)] hover:shadow-[0_6px_22px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
            >
              <span>{tr.hero.ctaProject}</span>
            </a>
            <a
              href="#donar"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
            >
              <span>{tr.hero.ctaHelp}</span>
              <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 pointer-events-none" style={{ transform: 'translateX(-50%)' }} aria-hidden="true">
        <div
          className="w-[1px] mx-auto"
          style={{ height: '52px', background: 'linear-gradient(to bottom, rgba(250,248,244,0.55), transparent)', animation: 'hero-line-pulse 2s ease-in-out infinite' }}
        />
      </div>
    </section>
  );
}
