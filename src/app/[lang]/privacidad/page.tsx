import type { Locale } from '@/lib/site';
import { LOCALES, SITE_URL } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { buildPageJsonLd } from '@/lib/jsonld';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ShieldCheck, Lock, Cookie, Building, Mail } from 'lucide-react';

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
  updatedDate: string;
  sections: Array<{
    id?: string;
    icon: 'shield' | 'lock' | 'cookie' | 'building' | 'mail';
    title: string;
    paragraphs: string[];
  }>;
}

const COPY: Record<Locale, PageCopy> = {
  ca: {
    metaTitle: 'Avís Legal, Privacitat i Cookies · Shariani La Vall',
    metaDescription:
      'Informació legal, política de privacitat i cookies del projecte solidari Shariani × La Vall (Bellaterra, Barcelona). Transparència i protecció de dades.',
    eyebrow: 'Transparència i compromís legal',
    h1: 'Avís Legal, Política de Privacitat i Cookies',
    lead:
      'Aquest lloc web té com a finalitat exclusiva informar sobre la iniciativa de voluntariat educatiu entre el col·legi La Vall (Bellaterra) i Shariani Primary School (Kilifi, Kenya), facilitant canals de suport solidari d\'acord amb la normativa europea i espanyola de protecció de dades.',
    homeCrumb: 'Inici',
    pageCrumb: 'Privacitat i Cookies',
    updatedDate: 'Última actualització: 31 d\'octubre de 2026',
    sections: [
      {
        icon: 'building',
        title: '1. Titularitat i identificació de la iniciativa',
        paragraphs: [
          'El present lloc web (www.shariani-lavall.org) és gestionat pel Col·legi La Vall (Institució Familiar d\'Educació), amb seu a Ctra. Sabadell a Bellaterra, km 4,6, 08205 Sabadell (Barcelona).',
          'El projecte Shariani és una iniciativa escolar i de voluntariat educatiu sense ànim de lucre liderada per docents i alumnes de Batxillerat en estreta col·laboració amb la comunitat educativa de Shariani Primary School (comtat de Kilifi, Kenya).',
        ],
      },
      {
        icon: 'lock',
        title: '2. Protecció de dades personals (RGPD i LOPDGDD)',
        paragraphs: [
          'D\'acord amb el Reglament (UE) 2016/679 (RGPD) i la Llei Orgànica 3/2018 (LOPDGDD), us informem que les dades personals facilitades a través dels formularis de contacte o correus electrònics són tractades de manera confidencial pel Col·legi La Vall com a responsable del tractament.',
          'La finalitat del tractament és exclusivament atendre la vostra consulta, proposta de col·laboració o oferiment de material. En cap cas les dades se cediran a tercers aliens al projecte ni s\'utilitzaran amb finalitats comercials o publicitàries.',
          'Podeu exercir els vostres drets d\'accés, rectificació, supressió, limitació i oposició adreçant una sol·licitud a la coordinació del projecte a través del correu electrònic shariani@la-vall.org.',
        ],
      },
      {
        icon: 'shield',
        title: '3. Transparència en donacions i canals oficials',
        paragraphs: [
          'Aquest lloc web NO emmagatzema ni recopila directament cap dada bancària ni números de targeta de crèdit.',
          'Les aportacions solidàries es canalitzen a través de plataformes legals i verificades: Bizum Solidari mitjançant el codi 03367 assignat a la Fundació Montblanc (entitat col·laboradora declarada d\'utilitat pública), Teaming i la plataforma de micromecenatge social iHelp.',
          'El 100% dels fons recaptats es destina a la compra de materials, contractació de fusters i manobres locals i execució de les obres acordades a Shariani Primary School.',
        ],
      },
      {
        id: 'cookies',
        icon: 'cookie',
        title: '4. Política de Cookies',
        paragraphs: [
          'Aquest lloc web NO utilitza cookies de seguiment de tercers, ni píxels publicitaris, ni sistemes de perfilat comercial.',
          'Únicament s\'utilitzen cookies estrictament tècniques i d\'emmagatzematge local imprescindibles per garantir la navegació segura, la selecció d\'idioma (català, castellà i anglès) i el funcionament bàsic de la interfície.',
          'Atès que només s\'empren cookies tècniques exemptes segons l\'article 22.2 de la Llei de Serveis de la Societat de la Informació (LSSI-CE), no es requereix un banner invasiu de consentiment publicitari.',
        ],
      },
      {
        icon: 'mail',
        title: '5. Contacte oficial',
        paragraphs: [
          'Per a qualsevol dubte relacionat amb aquest avís legal o amb el tractament de les vostres dades, podeu contactar directament amb nosaltres escrivint a shariani@la-vall.org o per correu postal a Col·legi La Vall, Ctra. Sabadell a Bellaterra, km 4,6, 08205 Sabadell (Barcelona).',
        ],
      },
    ],
  },
  es: {
    metaTitle: 'Aviso Legal, Privacidad y Cookies · Shariani La Vall',
    metaDescription:
      'Información legal, política de privacidad y cookies del proyecto solidario Shariani × La Vall (Bellaterra, Barcelona). Transparencia y protección de datos.',
    eyebrow: 'Transparencia y compromiso legal',
    h1: 'Aviso Legal, Política de Privacidad y Cookies',
    lead:
      'Este sitio web tiene como finalidad exclusiva informar sobre la iniciativa de voluntariado educativo entre el colegio La Vall (Bellaterra) y Shariani Primary School (Kilifi, Kenia), facilitando canales de apoyo solidario en estricto cumplimiento de la normativa europea y española de protección de datos.',
    homeCrumb: 'Inicio',
    pageCrumb: 'Privacidad y Cookies',
    updatedDate: 'Última actualización: 31 de octubre de 2026',
    sections: [
      {
        icon: 'building',
        title: '1. Titularidad e identificación de la iniciativa',
        paragraphs: [
          'El presente sitio web (www.shariani-lavall.org) es gestionado por el Colegio La Vall (Institució Familiar d\'Educació), con sede en Ctra. Sabadell a Bellaterra, km 4,6, 08205 Sabadell (Barcelona).',
          'El proyecto Shariani es una iniciativa escolar y de voluntariado educativo sin ánimo de lucro liderada por docentes y alumnas de Bachillerato en estrecha colaboración con la comunidad educativa de Shariani Primary School (condado de Kilifi, Kenia).',
        ],
      },
      {
        icon: 'lock',
        title: '2. Protección de datos de carácter personal (RGPD y LOPDGDD)',
        paragraphs: [
          'De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), le informamos de que los datos personales facilitados a través de los formularios de contacto o correos electrónicos son tratados de manera confidencial por el Colegio La Vall como responsable del tratamiento.',
          'La finalidad del tratamiento es exclusivamente atender su consulta, propuesta de colaboración o donación de material. En ningún caso los datos serán cedidos a terceros ajenos al proyecto ni empleados con fines comerciales o publicitarios.',
          'Puede ejercer sus derechos de acceso, rectificación, supresión, limitación y oposición dirigiendo una comunicación a la coordinación del proyecto a través del correo shariani@la-vall.org.',
        ],
      },
      {
        icon: 'shield',
        title: '3. Transparencia en donaciones y canales oficiales',
        paragraphs: [
          'Este sitio web NO almacena ni recopila directamente ningún dato bancario ni números de tarjeta de crédito.',
          'Las aportaciones solidarias se canalizan a través de plataformas legales y verificadas: Bizum Solidario mediante el código 03367 asignado a la Fundació Montblanc (entidad colaboradora declarada de utilidad pública), Teaming y la plataforma de micromecenazgo social iHelp.',
          'El 100% de los fondos reunidos se destina a la compra de materiales, contratación de carpinteros y albañiles locales y ejecución de las obras acordadas en Shariani Primary School.',
        ],
      },
      {
        id: 'cookies',
        icon: 'cookie',
        title: '4. Política de Cookies',
        paragraphs: [
          'Este sitio web NO utiliza cookies de seguimiento de terceros, ni píxeles publicitarios, ni sistemas de elaboración de perfiles comerciales.',
          'Únicamente se emplean cookies estrictamente técnicas y de almacenamiento local imprescindibles para garantizar la navegación segura, la selección de idioma (castellano, catalán e inglés) y el funcionamiento básico de la interfaz.',
          'Dado que solo se utilizan cookies técnicas exentas de conformidad con el artículo 22.2 de la Ley de Servicios de la Sociedad de la Información (LSSI-CE), no se requiere la inserción de un banner invasivo de consentimiento publicitario.',
        ],
      },
      {
        icon: 'mail',
        title: '5. Contacto oficial',
        paragraphs: [
          'Para cualquier duda sobre este aviso legal o sobre el tratamiento de sus datos, puede ponerse en contacto con nosotros escribiendo a shariani@la-vall.org o por correo postal en Colegio La Vall, Ctra. Sabadell a Bellaterra, km 4,6, 08205 Sabadell (Barcelona).',
        ],
      },
    ],
  },
  en: {
    metaTitle: 'Legal Notice, Privacy and Cookie Policy · Shariani La Vall',
    metaDescription:
      'Legal notice, privacy policy and cookies information for the Shariani × La Vall (Bellaterra, Barcelona) volunteering initiative. Transparency and data protection.',
    eyebrow: 'Transparency and legal compliance',
    h1: 'Legal Notice, Privacy and Cookie Policy',
    lead:
      'The sole purpose of this website is to provide transparent information about the educational volunteering partnership between La Vall school (Bellaterra, Barcelona) and Shariani Primary School (Kilifi, Kenya), facilitating solidarity contributions in full compliance with European and Spanish data protection laws.',
    homeCrumb: 'Home',
    pageCrumb: 'Privacy & Cookies',
    updatedDate: 'Last updated: 31 October 2026',
    sections: [
      {
        icon: 'building',
        title: '1. Ownership and Initiative Identity',
        paragraphs: [
          'This website (www.shariani-lavall.org) is operated by Col·legi La Vall (Institució Familiar d\'Educació), located at Ctra. Sabadell a Bellaterra, km 4,6, 08205 Sabadell (Barcelona), Spain.',
          'The Shariani project is a non-profit educational volunteering initiative led by teachers and Year 13 students in direct collaboration with the educational community of Shariani Primary School (Kilifi County, Kenya).',
        ],
      },
      {
        icon: 'lock',
        title: '2. Personal Data Protection (GDPR)',
        paragraphs: [
          'In accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD), any personal information provided via contact forms or email inquiries is processed confidentially by Col·legi La Vall as data controller.',
          'Data is processed exclusively to handle your inquiry, collaboration offer, or material donation. Data will never be sold, shared with third parties, or used for commercial marketing purposes.',
          'You may exercise your rights of access, rectification, erasure, restriction, and objection by contacting the project coordination team at shariani@la-vall.org.',
        ],
      },
      {
        icon: 'shield',
        title: '3. Donation Transparency & Channels',
        paragraphs: [
          'This website DOES NOT collect or store credit card numbers or banking data.',
          'All donations are handled through established official channels: Solidarity Bizum code 03367 assigned to Fundació Montblanc (partner public-benefit foundation), Teaming, and the iHelp social crowdfunding platform.',
          '100% of all contributions are directly invested in materials, local carpenters, and construction work at Shariani Primary School.',
        ],
      },
      {
        id: 'cookies',
        icon: 'cookie',
        title: '4. Cookie Policy',
        paragraphs: [
          'This website DOES NOT use third-party tracking cookies, behavioral advertising pixels, or commercial profiling tools.',
          'Only strictly necessary technical session cookies and local storage are utilized to maintain secure browsing, language preference (English, Spanish, and Catalan), and core interface responsiveness.',
          'As only exempt technical cookies are employed in accordance with European and Spanish e-Privacy regulations (LSSI-CE Art. 22.2), no intrusive cookie consent banner is required.',
        ],
      },
      {
        icon: 'mail',
        title: '5. Official Contact',
        paragraphs: [
          'For any questions regarding this legal notice or the handling of your data, you may reach us at shariani@la-vall.org or by postal mail at Col·legi La Vall, Ctra. Sabadell a Bellaterra, km 4,6, 08205 Sabadell (Barcelona), Spain.',
        ],
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
  const c = COPY[lang as Locale];
  return buildMetadata({
    lang,
    path: 'privacidad',
    title: c.metaTitle,
    description: c.metaDescription,
  });
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
  const locale = lang as Locale;
  const c = COPY[locale];

  const jsonLd = buildPageJsonLd({
    lang: locale,
    path: 'privacidad',
    title: c.h1,
    description: c.metaDescription,
    breadcrumbs: [
      { name: c.homeCrumb, item: `${SITE_URL}/${locale}` },
      { name: c.pageCrumb, item: `${SITE_URL}/${locale}/privacidad` },
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

      <main className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] pt-28 sm:pt-36 pb-20">
        <div className="container-page max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-[var(--ink-muted)]">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-[var(--forest)] transition-colors underline-offset-2 hover:underline"
                >
                  {c.homeCrumb}
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">/</li>
              <li className="font-semibold text-[var(--ink)]" aria-current="page">
                {c.pageCrumb}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-12 pb-8 border-b border-[var(--border)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--forest)] mb-3">
              {c.eyebrow}
            </p>
            <h1
              className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[var(--ink)] leading-[1.15] mb-5"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              {c.h1}
            </h1>
            <p className="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed max-w-3xl mb-3">
              {c.lead}
            </p>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              {c.updatedDate}
            </span>
          </div>

          {/* Content sections */}
          <div className="space-y-10">
            {c.sections.map((section, idx) => {
              const IconComp =
                section.icon === 'building'
                  ? Building
                  : section.icon === 'lock'
                  ? Lock
                  : section.icon === 'cookie'
                  ? Cookie
                  : section.icon === 'mail'
                  ? Mail
                  : ShieldCheck;

              return (
                <article
                  key={idx}
                  id={section.id}
                  className="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--paper)] scroll-mt-24 shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-[var(--forest)]/10 text-[var(--forest)] flex items-center justify-center shrink-0">
                      <IconComp size={18} strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h2
                      className="text-xl sm:text-2xl font-normal text-[var(--ink)] tracking-tight"
                      style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-[var(--ink-muted)] pl-0 sm:pl-12">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Back Button */}
          <div className="mt-12 pt-8 border-t border-[var(--border)] flex justify-between items-center">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--forest)] hover:underline underline-offset-4"
            >
              ← {c.homeCrumb}
            </Link>
            <Link
              href={`/${locale}#contacto`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full bg-[var(--forest)] text-white hover:bg-[var(--forest-dark)] transition-colors"
            >
              {locale === 'ca' ? 'Contactar amb l\'equip' : locale === 'en' ? 'Contact the team' : 'Contactar con el equipo'}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
