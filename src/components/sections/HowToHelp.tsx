'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  ArrowRight,
  BookOpen,
  Droplets,
  FlaskConical,
  Lock,
  Share2,
  ChevronDown,
  Building2,
  Users2,
  ExternalLink,
} from 'lucide-react';

const DEDUCTION = 0.80;

const DONATION_PRESETS = [
  { amount: 10, impact: 'Material i quaderns escolars bàsics' },
  { amount: 25, impact: 'Kits de lectura i salut dental' },
  { amount: 50, impact: 'Un pupitre doble fabricat a Kilifi' },
  { amount: 100, impact: 'Prestatgeries i fons de llibres' },
  { amount: 250, impact: 'Material d’obra per a una aula' },
];

const DESTINATIONS = [
  'On més falta (recomanat)',
  'Biblioteca escolar',
  'Nous lavabos',
  'Laboratori de ciències',
] as const;

export function HowToHelp() {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [selectedPreset, setSelectedPreset] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState<number>(50);
  const [destination, setDestination] = useState<string>(DESTINATIONS[0]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [copiedBizum, setCopiedBizum] = useState(false);
  const [hasPassedCard, setHasPassedCard] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const activeAmount = selectedPreset === 'custom' ? customAmount : selectedPreset;
  const netCost = Math.round(activeAmount * (1 - DEDUCTION));

  const donationUrl = `https://www.fundaciomontblanc.org/index.php/es/?project=shariani&dest=${encodeURIComponent(
    destination
  )}&freq=${frequency}&amount=${activeAmount}`;

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    "Ajuda'm a construir la propera obra a Shariani: https://lavallshariani.cat"
  )}`;

  const handleCopyBizum = () => {
    navigator.clipboard.writeText('03367').then(() => {
      setCopiedBizum(true);
      setTimeout(() => setCopiedBizum(false), 2000);
    });
  };

  useEffect(() => {
    const onScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      // Show sticky bar only when card has scrolled above the viewport
      setHasPassedCard(rect.bottom < 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="ayuda"
      style={{ background: 'var(--forest-dark)' }}
      className="relative w-full py-16 md:py-24 text-[var(--ivory)] overflow-hidden"
      aria-labelledby="donar-heading"
    >
      <span id="donar" className="absolute -top-24" aria-hidden="true" />

      <div className="container-page">
        {/* 1. Header & 3 Compact Example Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-12 sm:mb-14">
          {/* Left: Eyebrow, H1, Subtext */}
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-300 mb-3">
              FASE IV · JUNY 2027
            </p>
            <h1
              id="donar-heading"
              className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.12] text-[var(--ivory)] tracking-tight mb-4"
              style={{
                fontFamily: 'var(--font-editorial)',
                textWrap: 'balance',
                hyphens: 'none',
              }}
            >
              El que dones avui, es construeix al juny.
            </h1>
            <p
              className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Tot el material i la mà d&apos;obra són locals, de Kilifi. Tria la teva aportació i mira què fa possible.
            </p>
          </div>

          {/* Right: Heading & 3 Compact Cards */}
          <div className="lg:col-span-6">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/70 mb-3">
              Què pot fer possible el 2027
            </h2>

            {/* Horizontal swipe on mobile, grid on tablet+ */}
            <div className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto snap-x scrollbar-none pb-2 sm:pb-0">
              {/* Card 1: Biblioteca */}
              <div className="snap-start shrink-0 w-[240px] sm:w-auto p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center mb-2.5">
                  <BookOpen size={17} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Una biblioteca</h3>
                  <p className="text-xs text-white/75 leading-snug">
                    Llibres escolars, prestatgeries i espai de lectura equipat.
                  </p>
                </div>
              </div>

              {/* Card 2: Nous lavabos */}
              <div className="snap-start shrink-0 w-[240px] sm:w-auto p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center mb-2.5">
                  <Droplets size={17} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Nous lavabos</h3>
                  <p className="text-xs text-white/75 leading-snug">
                    Higiene, aigua corrent i dignitat sanitària per a 1.700 infants.
                  </p>
                </div>
              </div>

              {/* Card 3: Laboratori */}
              <div className="snap-start shrink-0 w-[240px] sm:w-auto p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center mb-2.5">
                  <FlaskConical size={17} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Un laboratori</h3>
                  <p className="text-xs text-white/75 leading-snug">
                    Equipament científic i taules de pràctiques per a primària.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. DONATION CARD (White, 16px radius, 2 columns on desktop) */}
        <div
          ref={cardRef}
          className="w-full bg-white text-[var(--ink)] rounded-[16px] p-6 sm:p-8 lg:p-10 shadow-2xl mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Toggles & Amount Tiles */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Toggle: Una vegada | Cada mes */}
                <div className="inline-flex p-1 rounded-full bg-stone-100 border border-stone-200 mb-6">
                  <button
                    type="button"
                    onClick={() => setFrequency('once')}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      frequency === 'once'
                        ? 'bg-[var(--forest)] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Una vegada
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      frequency === 'monthly'
                        ? 'bg-[var(--forest)] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Cada mes
                  </button>
                </div>

                {/* Amount Tiles: 2 cols on mobile, 3 cols on sm/desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {DONATION_PRESETS.map((preset) => {
                    const isSelected = selectedPreset === preset.amount;
                    return (
                      <button
                        key={preset.amount}
                        type="button"
                        onClick={() => setSelectedPreset(preset.amount)}
                        className={`relative p-3.5 sm:p-4 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[92px] ${
                          isSelected
                            ? 'border-[#186ED7] bg-blue-50/60 shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                            {preset.amount} €
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#186ED7] text-white flex items-center justify-center shrink-0">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-stone-500 leading-snug">
                          {preset.impact}
                        </p>
                      </button>
                    );
                  })}

                  {/* Custom tile */}
                  <button
                    type="button"
                    onClick={() => setSelectedPreset('custom')}
                    className={`relative p-3.5 sm:p-4 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[92px] ${
                      selectedPreset === 'custom'
                        ? 'border-[#186ED7] bg-blue-50/60 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-sm sm:text-base font-bold text-[var(--ink)]">
                        Una altra
                      </span>
                      {selectedPreset === 'custom' && (
                        <span className="w-5 h-5 rounded-full bg-[#186ED7] text-white flex items-center justify-center shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-stone-500 leading-snug">
                      Tria la teva xifra
                    </p>
                  </button>
                </div>

                {/* Custom Amount Input if active */}
                {selectedPreset === 'custom' && (
                  <div className="mb-6 p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                    <span className="text-sm font-semibold text-stone-600">Import:</span>
                    <div className="relative flex-1 max-w-[160px]">
                      <input
                        type="number"
                        min="5"
                        step="5"
                        value={customAmount || ''}
                        onChange={(e) => setCustomAmount(Math.max(1, Number(e.target.value)))}
                        className="w-full pl-3 pr-8 py-1.5 rounded-lg border border-stone-300 font-bold text-lg text-[var(--ink)] focus:outline-none focus:border-[#186ED7]"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-stone-500">
                        €
                      </span>
                    </div>
                    <span className="text-xs text-stone-500">Qualsevol aportació compta</span>
                  </div>
                )}
              </div>

              {/* Segmented Control: On vols que vagi? */}
              <div className="pt-4 border-t border-stone-100">
                <span className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2.5">
                  On vols que vagi?
                </span>
                <div className="flex flex-wrap gap-2">
                  {DESTINATIONS.map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setDestination(dest)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        destination === dest
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Live Summary & Amber CTA */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Resum de la donació
                </span>

                <div className="flex items-baseline justify-between py-2 border-b border-stone-200 mb-3">
                  <span className="text-sm text-stone-600">La teva aportació:</span>
                  <span className="text-2xl font-bold text-[var(--ink)]">
                    {activeAmount} €
                  </span>
                </div>

                {/* Fiscal Deduction notice */}
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 mb-6">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-emerald-900 mb-1">
                    <span>Amb la desgravació (80%):</span>
                    <span className="text-base font-bold text-emerald-700">
                      et costa només {netCost} €
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800/80 leading-relaxed">
                    Els primers 250 € desgraven el 80% al teu IRPF a través de la Fundació Montblanc.
                  </p>
                </div>

                <div className="text-xs text-stone-600 mb-5">
                  <span className="font-semibold text-stone-900">Destinació: </span>
                  <span>{destination}</span>
                </div>
              </div>

              <div>
                {/* Full-width Amber CTA */}
                <a
                  href={donationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-13 px-6 rounded-full inline-flex items-center justify-center gap-2 font-bold text-amber-950 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg text-base cursor-pointer mb-3"
                  style={{ background: '#E8A84A' }}
                >
                  <span>Dona {activeAmount} €</span>
                  <ArrowRight size={17} />
                </a>

                {/* Security info */}
                <div className="flex items-center justify-center gap-2 text-xs text-stone-500 mb-4">
                  <Lock size={12} className="text-stone-400" />
                  <span>Pagament segur · Certificat fiscal disponible</span>
                </div>

                {/* WhatsApp Share Button */}
                <div className="text-center pt-3 border-t border-stone-200">
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    <Share2 size={13} />
                    <span>Comparteix l&apos;objectiu a WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. VOICE FROM SHARIANI (Quote Block with Amber left line) */}
        <div className="border-l-4 border-amber-400 pl-4 sm:pl-6 py-2 my-10 text-white/95 max-w-3xl">
          <p
            className="text-base sm:text-lg leading-relaxed italic"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            «Cada any veiem arribar les voluntàries de La Vall no només amb eines i pintura, sinó amb un compromís
            que es queda quan marxen. Els nens ara aprenen en aules dignes i saben que no estan sols.»
          </p>
          <p className="text-xs sm:text-sm font-semibold text-white/70 mt-2.5 not-italic tracking-wide">
            — Mwalimu Juma, docent a Shariani Primary School
          </p>
        </div>

        {/* 4. ACCORDION: On van els meus diners? */}
        <div className="w-full max-w-3xl mb-12 border-t border-b border-white/15">
          <button
            type="button"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full py-4.5 flex items-center justify-between text-left cursor-pointer group"
            aria-expanded={isAccordionOpen}
          >
            <span className="text-base sm:text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
              On van els meus diners?
            </span>
            <ChevronDown
              size={18}
              className={`text-white/70 transition-transform duration-300 group-hover:text-white ${
                isAccordionOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isAccordionOpen && (
            <div className="pb-6 pt-2 text-sm text-white/85 space-y-3 leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-2">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xl font-bold text-amber-300 block mb-0.5">85%</span>
                  <span className="text-xs text-white/80">Materials d&apos;obra i mobiliari escolar comprat a Kilifi</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xl font-bold text-amber-300 block mb-0.5">15%</span>
                  <span className="text-xs text-white/80">Mà d&apos;obra de paletes i fusters locals</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xl font-bold text-emerald-300 block mb-0.5">0%</span>
                  <span className="text-xs text-white/80">Despeses d&apos;intermediaris (les voluntàries es costegen el viatge)</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/obra-real#2026"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-white underline underline-offset-4 transition-colors"
                >
                  <span>Veure la memòria de la Fase III</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 5. OTHER WAYS TO GIVE (3 compact columns, text + icon, no boxes) */}
        <div className="pt-8 border-t border-white/15">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Bizum */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <span className="font-bold text-xs text-amber-300">BZ</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-white">Bizum 03367</span>
                  <button
                    type="button"
                    onClick={handleCopyBizum}
                    className="text-xs px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-white cursor-pointer transition-colors font-medium"
                  >
                    {copiedBizum ? (
                      <span className="text-emerald-300 flex items-center gap-1">
                        <Check size={11} strokeWidth={2.5} /> Copiat
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy size={11} /> Copiar
                      </span>
                    )}
                  </button>
                </div>
                <span className="text-xs text-white/60 block mt-0.5">ONG Fundació Montblanc</span>
              </div>
            </div>

            {/* Teaming */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Users2 size={17} className="text-amber-300" />
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href="https://www.teaming.net/unaescuela-milesdesuenosenkenia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm sm:text-base text-white hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Teaming · 1 €/mes</span>
                  <ExternalLink size={12} className="opacity-70" />
                </a>
                <span className="text-xs text-white/60 block mt-0.5">Microdonacions periòdiques</span>
              </div>
            </div>

            {/* Empreses */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Building2 size={17} className="text-amber-300" />
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href="#contacto"
                  className="font-semibold text-sm sm:text-base text-white hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Empreses i aliances · Parlem</span>
                  <ArrowRight size={12} className="opacity-70" />
                </a>
                <span className="text-xs text-white/60 block mt-0.5">Responsabilitat social i convenis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM BAR (visible only after scrolling past the card) */}
      <div
        className={`fixed bottom-0 inset-x-0 p-3.5 bg-stone-900/95 backdrop-blur-md border-t border-white/15 z-40 lg:hidden transition-all duration-300 ${
          hasPassedCard
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="text-left">
            <span className="text-[11px] text-white/60 block leading-tight">La teva donació:</span>
            <span className="text-sm font-bold text-white leading-tight">
              {activeAmount} € <span className="text-emerald-400 font-normal text-xs">(costa {netCost} €)</span>
            </span>
          </div>

          <a
            href={donationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-5 rounded-full inline-flex items-center justify-center gap-1.5 font-bold text-amber-950 text-sm shadow-md cursor-pointer shrink-0"
            style={{ background: '#E8A84A' }}
          >
            <span>Dona {activeAmount} €</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
