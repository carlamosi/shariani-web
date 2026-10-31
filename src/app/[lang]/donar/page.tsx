import type { Locale } from '@/lib/site';
import { LOCALES, SITE_URL } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { buildPageJsonLd } from '@/lib/jsonld';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CopyBizumButton } from '@/components/ui/CopyBizumButton';
import {
  Heart,
  QrCode,
  ExternalLink,
  CheckCircle2,
  FileText,
  Building2,
  ArrowRight,
} from 'lucide-react';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

interface PageCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  homeCrumb: string;
  pageCrumb: string;
  bizumHeading: string;
  bizumCodeLabel: string;
  bizumConceptLabel: string;
  bizumConceptValue: string;
  bizumCopy: string;
  bizumCopied: string;
  bizumStepsTitle: string;
  bizumSteps: string[];
  teamingHeading: string;
  teamingFee: string;
  teamingDesc: string;
  teamingCta: string;
  ihelpHeading: string;
  ihelpDesc: string;
  ihelpCta: string;
  taxHeading: string;
  taxP1: string;
  taxP2: string;
  transparencyHeading: string;
  transparencyItems: Array<{ title: string; desc: string }>;
  companiesHeading: string;
  companiesDesc: string;
  companiesContact: string;
}

const COPY: Record<Locale, PageCopy> = {
  es: {
    metaTitle: 'Cómo Donar a Shariani · Bizum 03367 y Teaming | La Vall',
    metaDescription:
      'Colabora con Shariani Primary School (Kenia): Bizum solidario 03367, Teaming por 1€/mes y crowdfunding iHelp. Desgravación del 80% en IRPF.',
    eyebrow: 'Canales oficiales de colaboración',
    h1: 'Cómo donar al proyecto Shariani La Vall',
    lead:
      'Puedes colaborar y donar al proyecto Shariani La Vall a través de tres vías oficiales: mediante Bizum solidario con el código 03367 (seleccionando "Donar a ONG" o "Causa solidaria" con el concepto "La Vall x Shariani"), suscribiéndote a Teaming por solo 1 € al mes, o realizando una aportación en la plataforma iHelp. El 100% de los fondos se destina directamente a las obras y materiales de Shariani Primary School en Kilifi, Kenia.',
    homeCrumb: 'Inicio',
    pageCrumb: 'Cómo donar',
    bizumHeading: '1. Bizum solidario (Rápido y sin comisiones)',
    bizumCodeLabel: 'Código Bizum solidario',
    bizumConceptLabel: 'Concepto obligatorio:',
    bizumConceptValue: 'La Vall x Shariani',
    bizumCopy: 'Copiar código',
    bizumCopied: '¡Código 03367 copiado!',
    bizumStepsTitle: 'Cómo donar por Bizum en 3 pasos desde tu app bancaria:',
    bizumSteps: [
      'Abre la aplicación de tu banco y entra en el apartado de Bizum.',
      'Elige la opción "Hacer donación", "Aportar a ONG" o "Causa solidaria" (no envío a contacto particular).',
      'Introduce el código 03367, escribe en el concepto "La Vall x Shariani", indica el importe que desees y confirma.',
    ],
    teamingHeading: '2. Grupo de Teaming (1 € al mes)',
    teamingFee: '1 € / mes',
    teamingDesc:
      'A través de Teaming aportas únicamente 1 euro al mes de forma automática y transparente. Juntos sumamos una base económica estable que nos permite afrontar el mantenimiento anual del colegio, reponer libros y adquirir pupitres de forma continua.',
    teamingCta: 'Unirme al Teaming de Shariani',
    ihelpHeading: '3. iHelp Crowdfunding (Tarjeta o transferencia)',
    ihelpDesc:
      'Plataforma de microfinanciación social para aportar cualquier importe puntual con tarjeta bancaria o transferencia. Permite la emisión inmediata y automatizada del certificado de donación.',
    ihelpCta: 'Donar a través de iHelp',
    taxHeading: 'Desgravación fiscal de tu donación (IRPF e IS)',
    taxP1:
      'En España, las donaciones a proyectos solidarios canalizados a través de entidades sin ánimo de lucro acogidas a la Ley 49/2002 disfrutan de hasta un 80% de deducción en los primeros 250 € donados en el IRPF.',
    taxP2:
      'Para recibir el certificado fiscal oficial emitido por la entidad colaboradora (Fundació Montblanc), simplemente indica tu DNI/NIF completo en el concepto al donar o ponte en contacto con nosotros.',
    transparencyHeading: 'Destino directo de cada euro recaudado',
    transparencyItems: [
      {
        title: 'Materiales y carpintería local',
        desc: 'Compramos madera de la zona y contratamos a carpinteros locales de Kilifi para fabricar pupitres y sillas escolares.',
      },
      {
        title: 'Acondicionamiento y pintura de aulas',
        desc: 'Compramos pintura, cemento y útiles de albañilería para renovar paredes y garantizar aulas limpias y luminosas.',
      },
      {
        title: 'Proyecto 300 faldas escolares',
        desc: 'Tejidos y confección local de uniformes escolares que favorecen la asistencia y escolarización continuada.',
      },
      {
        title: 'Valla y seguridad del centro',
        desc: 'Materiales de construcción para el cerramiento perimetral que protege el recinto donde estudian 1.700 niños.',
      },
    ],
    companiesHeading: '¿Eres una empresa o entidad?',
    companiesDesc:
      'Si representas a una empresa o fundación interesada en patrocinar un hito constructivo (como el futuro pozo de agua potable o la biblioteca escolar), o en donar materiales escolares o sanitarios, escríbenos directamente.',
    companiesContact: 'Contactar para colaboraciones de empresa',
  },
  ca: {
    metaTitle: 'Com Donar a Shariani · Bizum 03367 i Teaming | La Vall',
    metaDescription:
      'Col·labora amb Shariani Primary School (Kenya): Bizum solidari 03367, Teaming per 1€/mes i crowdfunding iHelp. Desgravació del 80% a l’IRPF.',
    eyebrow: 'Canals oficials de col·laboració',
    h1: 'Com donar al projecte Shariani La Vall',
    lead:
      'Pots col·laborar i donar al projecte Shariani La Vall a través de tres vies oficials: mitjançant Bizum solidari amb el codi 03367 (seleccionant "Donar a ONG" o "Causa solidària" amb el concepte "La Vall x Shariani"), unint-te a Teaming per només 1 € al mes, o fent una aportació a la plataforma iHelp. El 100% dels fons es destina directament a les obres i materials de Shariani Primary School a Kilifi, Kenya.',
    homeCrumb: 'Inici',
    pageCrumb: 'Com donar',
    bizumHeading: '1. Bizum solidari (Ràpid i sense comissions)',
    bizumCodeLabel: 'Codi Bizum solidari',
    bizumConceptLabel: 'Concepte obligatori:',
    bizumConceptValue: 'La Vall x Shariani',
    bizumCopy: 'Copiar codi',
    bizumCopied: 'Codi 03367 copiat!',
    bizumStepsTitle: 'Com donar per Bizum en 3 passos des de la teva app bancària:',
    bizumSteps: [
      'Obre l’aplicació del teu banc i entra a l’apartat de Bizum.',
      'Tria l’opció "Fer Donació", "Aportar a ONG" o "Causa solidària" (no enviament a contacte particular).',
      'Introdueix el codi 03367, indica al concepte "La Vall x Shariani", posa l’import que vulguis i confirma.',
    ],
    teamingHeading: '2. Grup de Teaming (1 € al mes)',
    teamingFee: '1 € / mes',
    teamingDesc:
      'A través de Teaming aportes únicament 1 euro al mes de manera automàtica i transparent. Junts sumem una base econòmica estable per al manteniment continuat de l’escola i la reposició de pupitres i llibres tot l’any.',
    teamingCta: 'Unir-me al Teaming de Shariani',
    ihelpHeading: '3. iHelp Crowdfunding (Targeta o transferència)',
    ihelpDesc:
      'Plataforma solidària per fer aportacions puntuals amb targeta o transferència bancària, amb emissió immediata del certificat fiscal oficial.',
    ihelpCta: 'Donar a través d’iHelp',
    taxHeading: 'Desgravació fiscal de la teva donació (IRPF i IS)',
    taxP1:
      'A Espanya, les donacions canalitzades a través d’entitats sense ànim de lucre acollides a la Llei 49/2002 tenen dret a fins a un 80% de deducció en els primers 250 € donats a l’IRPF.',
    taxP2:
      'Per rebre el certificat fiscal oficial emès per l’entitat col·laboradora (Fundació Montblanc), només cal que indiquis el teu DNI/NIF complet al concepte en donar.',
    transparencyHeading: 'Destinació directa de cada euro recaptat',
    transparencyItems: [
      {
        title: 'Materials i fusteria local',
        desc: 'Comprem fusta de la zona i contractem fusters locals de Kilifi per fabricar pupitres i cadires escolars.',
      },
      {
        title: 'Condicionament i pintura d’aules',
        desc: 'Comprem pintura, ciment i eines per renovar parets i garantir aules netes i lluminoses.',
      },
      {
        title: 'Projecte 300 faldilles escolars',
        desc: 'Teixits i confecció local d’uniformes escolars que afavoreixen la continuïtat escolar de les nenes.',
      },
      {
        title: 'Tancament i seguretat del centre',
        desc: 'Materials per a la tanca perimetral que protegeix el recinte on estudien més de 1.700 infants.',
      },
    ],
    companiesHeading: 'Ets una empresa o entitat?',
    companiesDesc:
      'Si representes una empresa o fundació interessada a patrocinar una fita constructiva (com el futur pou d’aigua potable o la biblioteca escolar), o a donar material escolar o sanitari, escriu-nos.',
    companiesContact: 'Contactar per col·laboracions d’empresa',
  },
  en: {
    metaTitle: 'How to Donate to Shariani · Bizum 03367 & Teaming | La Vall',
    metaDescription:
      'Support Shariani Primary School (Kenya): Solidarity Bizum 03367, Teaming at €1/month and iHelp crowdfunding. Up to 80% tax deduction.',
    eyebrow: 'Official collaboration channels',
    h1: 'How to donate to the Shariani La Vall project',
    lead:
      'You can support and donate to the Shariani La Vall project through three official avenues: via solidarity Bizum using code 03367 (selecting "Donate to NGO" with reference "La Vall x Shariani"), by joining our Teaming group for just €1 a month, or through the iHelp platform. 100% of all funds raised go directly toward school facilities and materials for Shariani Primary School in Kilifi, Kenya.',
    homeCrumb: 'Home',
    pageCrumb: 'How to donate',
    bizumHeading: '1. Solidarity Bizum (Fast and fee-free)',
    bizumCodeLabel: 'Solidarity Bizum code',
    bizumConceptLabel: 'Required reference:',
    bizumConceptValue: 'La Vall x Shariani',
    bizumCopy: 'Copy code',
    bizumCopied: 'Code 03367 copied!',
    bizumStepsTitle: 'How to donate via Bizum in 3 steps from your banking app:',
    bizumSteps: [
      'Open your mobile banking app and navigate to Bizum.',
      'Select "Make a donation", "Donate to NGO" or "Charity" (not personal contact transfer).',
      'Enter code 03367, set the reference to "La Vall x Shariani", enter your desired amount and confirm.',
    ],
    teamingHeading: '2. Teaming group (€1 per month)',
    teamingFee: '€1 / month',
    teamingDesc:
      'Through Teaming, you contribute just 1 euro per month in an automated and transparent way. Together we build a predictable fund to maintain classrooms, replace worn desks and purchase books year-round.',
    teamingCta: 'Join our Teaming group',
    ihelpHeading: '3. iHelp Crowdfunding (Card or bank transfer)',
    ihelpDesc:
      'Social crowdfunding platform to make single donations via credit card or bank transfer, offering immediate and automated tax certificates.',
    ihelpCta: 'Donate via iHelp',
    taxHeading: 'Tax deductibility of your donation',
    taxP1:
      'In Spain, donations to non-profit causes under Law 49/2002 qualify for up to an 80% personal income tax (IRPF) deduction on the first €250 donated.',
    taxP2:
      'To receive the official tax certificate issued by our partnering entity (Fundació Montblanc), simply include your Spanish tax ID (DNI/NIE) in the donation reference or reach out to us.',
    transparencyHeading: 'Where every euro is invested',
    transparencyItems: [
      {
        title: 'Local timber and carpenters',
        desc: 'We purchase local lumber and hire Kilifi carpenters to build durable wooden desks and chairs.',
      },
      {
        title: 'Classroom refurbishment and paint',
        desc: 'We buy paint, plaster and masonry supplies to restore deteriorated classrooms into bright study spaces.',
      },
      {
        title: '300 school skirts initiative',
        desc: 'Locally sewn uniform skirts that empower girls and encourage steady school attendance.',
      },
      {
        title: 'Perimeter school safety wall',
        desc: 'Construction materials for the safety fence protecting the school grounds of 1,700 students.',
      },
    ],
    companiesHeading: 'Are you a company or organization?',
    companiesDesc:
      'If you represent a company or foundation interested in sponsoring a major milestone (such as the planned drinking water well or the school library), or donating materials, please get in touch.',
    companiesContact: 'Contact for corporate partnerships',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
  const locale = lang as Locale;
  const copy = COPY[locale];

  return buildMetadata({
    lang: locale,
    path: 'donar',
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
}

export default async function DonarPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
  const locale = lang as Locale;
  const copy = COPY[locale];

  const jsonLd = buildPageJsonLd({
    lang: locale,
    path: 'donar',
    title: copy.metaTitle,
    description: copy.metaDescription,
    breadcrumbs: [
      { name: copy.homeCrumb, item: `${SITE_URL}/${locale}` },
      { name: copy.pageCrumb, item: `${SITE_URL}/${locale}/donar` },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <ScrollReveal />
      <Navbar />

      <main className="min-h-screen">
        {/* Editorial Header */}
        <section
          className="pt-32 pb-14 md:pt-40 md:pb-20 border-b border-[var(--border)]"
          style={{ background: 'var(--ivory)' }}
        >
          <div className="container-page max-w-4xl">
            <p
              className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: 'var(--forest)', fontFamily: 'var(--font-body)' }}
            >
              {copy.eyebrow}
            </p>
            <h1
              className="text-[var(--ink)] mb-6"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(32px, 4.8vw, 54px)',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                fontWeight: 400,
              }}
            >
              {copy.h1}
            </h1>
            <p
              className="text-[var(--ink)] font-medium leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(17px, 1.8vw, 20px)',
                maxWidth: '740px',
                lineHeight: 1.6,
              }}
            >
              {copy.lead}
            </p>
          </div>
        </section>

        {/* Donation Channels Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container-page max-w-4xl space-y-16">
            {/* 1. Bizum Card */}
            <div
              className="p-8 sm:p-10 rounded-3xl border border-[var(--border)]"
              style={{ background: 'var(--forest-dark)', color: 'var(--ivory)' }}
            >
              <div className="flex items-center gap-2 mb-3 text-white/80">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Canal directo
                </span>
              </div>

              <h2
                className="text-2xl sm:text-3xl mb-6 text-white"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
              >
                {copy.bizumHeading}
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-white/10 border border-white/20 mb-8">
                <div>
                  <span className="text-xs text-white/70 uppercase tracking-wider block mb-1">
                    {copy.bizumCodeLabel}
                  </span>
                  <span
                    className="text-5xl sm:text-6xl font-normal text-white block leading-none mb-3"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    03367
                  </span>
                  <p className="text-xs sm:text-sm text-white/80">
                    <span className="font-semibold">{copy.bizumConceptLabel}</span>{' '}
                    <code className="px-2 py-0.5 rounded bg-white/20 text-white font-mono">
                      {copy.bizumConceptValue}
                    </code>
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-3 shrink-0">
                  <CopyBizumButton
                    code="03367"
                    labelCopy={copy.bizumCopy}
                    labelCopied={copy.bizumCopied}
                  />
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <QrCode className="w-4 h-4" />
                    <span>O escanea el código en tu app</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <p className="text-sm font-semibold text-white">
                  {copy.bizumStepsTitle}
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-white/80 leading-relaxed">
                  {copy.bizumSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* 2. Teaming & iHelp Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Teaming */}
              <div
                className="p-7 sm:p-8 rounded-3xl border border-[var(--border)] flex flex-col justify-between"
                style={{ background: 'var(--ivory)' }}
              >
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider text-[var(--forest)] block mb-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {copy.teamingFee}
                  </span>
                  <h2
                    className="text-2xl font-normal text-[var(--ink)] mb-4"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    {copy.teamingHeading}
                  </h2>
                  <p
                    className="text-sm text-[var(--ink-muted)] leading-relaxed mb-6"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {copy.teamingDesc}
                  </p>
                </div>
                <a
                  href="https://www.teaming.net/unaescuela-milesdesuenosenkenia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-full text-sm font-semibold transition-all bg-[var(--forest)] text-white hover:bg-[var(--forest-dark)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {copy.teamingCta}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* iHelp */}
              <div
                className="p-7 sm:p-8 rounded-3xl border border-[var(--border)] flex flex-col justify-between"
                style={{ background: 'var(--ivory)' }}
              >
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider text-[var(--terracotta)] block mb-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Crowdfunding oficial
                  </span>
                  <h2
                    className="text-2xl font-normal text-[var(--ink)] mb-4"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    {copy.ihelpHeading}
                  </h2>
                  <p
                    className="text-sm text-[var(--ink-muted)] leading-relaxed mb-6"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {copy.ihelpDesc}
                  </p>
                </div>
                <a
                  href="https://www.ihelp.org.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-full text-sm font-semibold transition-all bg-white border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--paper)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {copy.ihelpCta}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Tax deduction details */}
            <div
              className="p-7 sm:p-8 rounded-3xl border border-[var(--border)]"
              style={{ background: 'var(--paper)' }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white border border-[var(--border)] text-[var(--forest)] shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-normal text-[var(--ink)] mb-3"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    {copy.taxHeading}
                  </h2>
                  <div
                    className="space-y-3 text-sm text-[var(--ink-muted)] leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <p>{copy.taxP1}</p>
                    <p>{copy.taxP2}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparency breakdown */}
            <div>
              <h2
                className="text-2xl sm:text-3xl font-normal text-[var(--ink)] mb-8"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                {copy.transparencyHeading}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {copy.transparencyItems.map((item) => (
                  <div
                    key={item.title}
                    className="p-6 rounded-2xl border border-[var(--border)] bg-white"
                  >
                    <div className="flex items-center gap-2 mb-2 text-[var(--forest)]">
                      <CheckCircle2 className="w-5 h-5" />
                      <h3
                        className="text-base sm:text-lg font-semibold text-[var(--ink)]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p
                      className="text-sm text-[var(--ink-muted)] leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Companies & Partnerships */}
            <div
              className="p-7 sm:p-8 rounded-3xl border border-[var(--border)] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-2 text-[var(--forest)]">
                  <Building2 className="w-5 h-5" />
                  <h2
                    className="text-xl font-normal text-[var(--ink)]"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    {copy.companiesHeading}
                  </h2>
                </div>
                <p
                  className="text-sm text-[var(--ink-muted)] leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {copy.companiesDesc}
                </p>
              </div>
              <a
                href="mailto:shariani@la-vall.org?subject=Colaboraci%C3%B3n%20empresa%20Shariani"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all bg-[var(--forest)] text-white hover:bg-[var(--forest-dark)] shrink-0"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {copy.companiesContact}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
