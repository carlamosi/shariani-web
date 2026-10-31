import type { Locale } from '@/lib/site';
import { LOCALES, SITE_URL } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { buildPageJsonLd } from '@/lib/jsonld';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MapPin, Users, ArrowRight, ShieldCheck } from 'lucide-react';

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
  whatHeading: string;
  whatP1: string;
  whatP2: string;
  whoHeading: string;
  whoSchoolTitle: string;
  whoSchoolDesc: string;
  whoLocalTitle: string;
  whoLocalDesc: string;
  numbersHeading: string;
  numbers: Array<{ value: string; label: string; desc: string }>;
  principlesHeading: string;
  principles: Array<{ title: string; desc: string }>;
  ctaHeading: string;
  ctaText: string;
  ctaWorks: string;
  ctaVolunteer: string;
  ctaDonate: string;
}

const COPY: Record<Locale, PageCopy> = {
  es: {
    metaTitle: 'Qué es Shariani · Proyecto de La Vall en Kenia',
    metaDescription:
      'Conoce el proyecto Shariani: iniciativa de voluntariado de La Vall (Bellaterra) en Shariani Primary School (Kilifi, Kenia). Historia, cifras y compromiso educativo.',
    eyebrow: 'Iniciativa educativa y solidaria',
    h1: 'Qué es Shariani y cómo nació la alianza con La Vall',
    lead:
      'Shariani es una iniciativa solidaria y de voluntariado educativo nacida de la alianza entre el colegio La Vall (Bellaterra, Barcelona) y Shariani Primary School, ubicada en el condado de Kilifi, en la costa de Kenia. Desde 2023, cada mes de junio, alumnas de 2.º de Bachillerato viajan a Kenia para ejecutar mejoras estructurales consensuadas con la comunidad educativa local, beneficiando a más de 1.700 estudiantes.',
    homeCrumb: 'Inicio',
    pageCrumb: 'Qué es Shariani',
    whatHeading: 'El origen del proyecto: escuchar antes de construir',
    whatP1:
      'El proyecto comenzó en 2023 tras un primer viaje de diálogo y escucha activa con el equipo directivo, docentes y familias de Shariani Primary School. Lejos de imponer soluciones externas, la iniciativa se construyó identificando las necesidades más urgentes que el propio colegio priorizó: mobiliario para estudiar dignamente, condiciones sanitarias adecuadas, seguridad del recinto escolar y recursos de estudio.',
    whatP2:
      'Desde entonces, la comunidad de La Vall se moviliza a lo largo de todo el curso académico mediante eventos solidarios, campañas de sensibilización y recaudación de fondos. Dos semanas después de la selectividad (PAU), un grupo de voluntarias viaja a Kilifi para convertir ese compromiso en obras tangibles que perduran año tras año.',
    whoHeading: 'Quiénes formamos parte de esta iniciativa',
    whoSchoolTitle: 'Colegio La Vall (Bellaterra)',
    whoSchoolDesc:
      'Centro educativo concertado en Bellaterra (Cerdanyola del Vallès / Sabadell). Promueve la formación integral, el liderazgo de servicio y la solidaridad activa en sus alumnas de Bachillerato.',
    whoLocalTitle: 'Shariani Primary School (Kilifi)',
    whoLocalDesc:
      'Escuela pública de educación primaria en Kilifi County, Kenia. Cuenta con un equipo docente profundamente comprometido que educa cada día a más de 1.700 niños y niñas.',
    numbersHeading: 'Cifras clave del proyecto en Shariani',
    numbers: [
      {
        value: '+1.700',
        label: 'Alumnos beneficiados',
        desc: 'Estudiantes de Shariani Primary School que disfrutan de mejores condiciones escolares.',
      },
      {
        value: '300',
        label: 'Faldas confeccionadas',
        desc: 'Uniformes escolares del proyecto 300 faldas para apoyar la asistencia de las alumnas.',
      },
      {
        value: '5',
        label: 'Aulas restauradas',
        desc: 'Pintadas, saneadas y acondicionadas por voluntarias y la comunidad local.',
      },
      {
        value: '100%',
        label: 'Impacto local directo',
        desc: 'Mobiliario y materiales adquiridos y fabricados por artesanos y carpinteros de Kilifi.',
      },
    ],
    principlesHeading: 'Nuestros principios de actuación',
    principles: [
      {
        title: 'Continuidad frente al asistencialismo',
        desc: 'No realizamos intervenciones aisladas. Cada año volvemos sobre el terreno para dar seguimiento a las obras anteriores y abordar la siguiente prioridad acordada.',
      },
      {
        title: 'Economía local y empoderamiento',
        desc: 'Todos los materiales y mano de obra profesional (carpintería, albañilería) se contratan en el propio condado de Kilifi, dinamizando la economía de la zona.',
      },
      {
        title: 'Aprendizaje bidireccional',
        desc: 'Las voluntarias de La Vall no solo aportan su trabajo: conviven, aprenden de la resiliencia y alegría de la comunidad y regresan con una visión del mundo transformada.',
      },
    ],
    ctaHeading: 'Conoce más o colabora con Shariani',
    ctaText: 'Descubre las obras realizadas año a año o ayúdanos a financiar la próxima fase del proyecto.',
    ctaWorks: 'Ver obras realizadas',
    ctaVolunteer: 'Cómo es el voluntariado',
    ctaDonate: 'Cómo donar',
  },
  ca: {
    metaTitle: 'Què és Shariani · Projecte de La Vall a Kenya',
    metaDescription:
      'Coneix el projecte Shariani: iniciativa de voluntariat de La Vall (Bellaterra) a Shariani Primary School (Kilifi, Kenya). Història, xifres i compromís educatiu.',
    eyebrow: 'Iniciativa educativa i solidària',
    h1: 'Què és Shariani i com va néixer l’aliança amb La Vall',
    lead:
      'Shariani és una iniciativa solidària i de voluntariat educatiu nascuda de l’aliança entre el col·legi La Vall (Bellaterra, Barcelona) i Shariani Primary School, situada al comtat de Kilifi, a la costa de Kenya. Des de 2023, cada mes de juny, alumnes de 2n de Batxillerat viatgen a Kenya per executar millores estructurals consensuades amb la comunitat educativa local, beneficiant més de 1.700 estudiants.',
    homeCrumb: 'Inici',
    pageCrumb: 'Què és Shariani',
    whatHeading: 'L’origen del projecte: escoltar abans de construir',
    whatP1:
      'El projecte va començar el 2023 després d’un primer viatge de diàleg i escolta activa amb l’equip directiu, docents i famílies de Shariani Primary School. Lluny d’imposar solucions externes, la iniciativa es va construir identificant les necessitats més urgents que el mateix col·legi va prioritzar: mobiliari digne, condicions sanitàries adequades, seguretat del recinte i recursos d’estudi.',
    whatP2:
      'Des d’aleshores, la comunitat de La Vall es mobilitza durant tot el curs acadèmic mitjançant esdeveniments solidaris, campanyes de sensibilització i recaptació de fons. Dues setmanes després de les PAU, un grup de voluntàries viatja a Kilifi per transformar aquest compromís en obres tangibles que perduren any rere any.',
    whoHeading: 'Qui formem part d’aquesta iniciativa',
    whoSchoolTitle: 'Col·legi La Vall (Bellaterra)',
    whoSchoolDesc:
      'Centre educatiu a Bellaterra (Cerdanyola del Vallès / Sabadell). Promou la formació integral, el lideratge de servei i la solidaritat activa en les seves alumnes de Batxillerat.',
    whoLocalTitle: 'Shariani Primary School (Kilifi)',
    whoLocalDesc:
      'Escola pública d’educació primària al comtat de Kilifi, Kenya. Compta amb un equip docent profundament compromès que educa cada dia més de 1.700 nens i nenes.',
    numbersHeading: 'Xifres clau del projecte a Shariani',
    numbers: [
      {
        value: '+1.700',
        label: 'Alumnes beneficiats',
        desc: 'Estudiants de Shariani Primary School que gaudeixen de millors condicions escolars.',
      },
      {
        value: '300',
        label: 'Faldilles confeccionades',
        desc: 'Uniformes escolars del projecte 300 faldilles per fomentar l’escolarització de les nenes.',
      },
      {
        value: '5',
        label: 'Aules restaurades',
        desc: 'Pintades, sanejades i condicionades per voluntàries i la comunitat local.',
      },
      {
        value: '100%',
        label: 'Impacte local directe',
        desc: 'Mobiliari i materials adquirits i fets per artesans i fusters de Kilifi.',
      },
    ],
    principlesHeading: 'Els nostres principis d’actuació',
    principles: [
      {
        title: 'Continuïtat davant l’assistencialisme',
        desc: 'No fem intervencions aïllades. Cada any tornem sobre el terreny per fer seguiment de les obres anteriors i abordar la següent fita acordada.',
      },
      {
        title: 'Economia local i apoderament',
        desc: 'Tots els materials i la mà d’obra professional (fusteria, paletes) es contracten al mateix comtat de Kilifi, dinamitzant l’entorn.',
      },
      {
        title: 'Aprenentatge bidireccional',
        desc: 'Les voluntàries de La Vall no només aporten la seva feina: conviuen, aprenen de la resiliència i l’alegria de la comunitat i tornen transformades.',
      },
    ],
    ctaHeading: 'Coneix més o col·labora amb Shariani',
    ctaText: 'Descobreix les obres dutes a terme any rere any o ajuda’ns a finançar la propera fase del projecte.',
    ctaWorks: 'Veure obres realitzades',
    ctaVolunteer: 'Com és el voluntariat',
    ctaDonate: 'Com donar',
  },
  en: {
    metaTitle: 'What is Shariani · La Vall Project in Kenya',
    metaDescription:
      'Learn about Shariani: the volunteering project by La Vall (Bellaterra) at Shariani Primary School (Kilifi, Kenya). History, figures and educational commitment.',
    eyebrow: 'Educational and solidarity initiative',
    h1: 'What is Shariani and how the alliance with La Vall began',
    lead:
      'Shariani is a school volunteering initiative born from the alliance between La Vall school (Bellaterra, Barcelona) and Shariani Primary School, located in Kilifi County on the Kenyan coast. Since 2023, every June, Year 13 students travel to Kenya to execute structural facility improvements agreed upon with the local educational community, benefiting over 1,700 pupils.',
    homeCrumb: 'Home',
    pageCrumb: 'What is Shariani',
    whatHeading: 'Project origin: listening before building',
    whatP1:
      'The initiative began in 2023 following an initial expedition centered on dialogue and active listening with the school administration, teachers and families at Shariani Primary School. Rather than importing outside solutions, priorities were determined directly by the school itself: proper desks and chairs, hygienic conditions, perimeter security and study facilities.',
    whatP2:
      'Throughout the school year, the La Vall school community mobilizes through solidarity events, awareness activities and fundraising. Two weeks after completing university entrance exams, students travel to Kilifi to turn those efforts into tangible, lasting improvements.',
    whoHeading: 'The two communities behind the project',
    whoSchoolTitle: 'La Vall School (Bellaterra)',
    whoSchoolDesc:
      'A semi-private school in Bellaterra (Barcelona). It emphasizes holistic education, servant leadership and active solidarity in its senior high school students.',
    whoLocalTitle: 'Shariani Primary School (Kilifi)',
    whoLocalDesc:
      'A public primary school in Kilifi County, Kenya. It features a deeply committed faculty educating more than 1,700 children every day.',
    numbersHeading: 'Key project figures at Shariani',
    numbers: [
      {
        value: '+1,700',
        label: 'Pupils benefiting',
        desc: 'Students at Shariani Primary School enjoying safer and more dignified classrooms.',
      },
      {
        value: '300',
        label: 'Uniform skirts made',
        desc: 'School skirts produced through the 300 skirts initiative to support girls’ attendance.',
      },
      {
        value: '5',
        label: 'Classrooms renovated',
        desc: 'Painted, repaired and refreshed by volunteers alongside the local community.',
      },
      {
        value: '100%',
        label: 'Direct local impact',
        desc: 'Materials and skilled labor sourced entirely from Kilifi carpenters and craftsmen.',
      },
    ],
    principlesHeading: 'Our guiding principles',
    principles: [
      {
        title: 'Continuity over one-off aid',
        desc: 'We do not run isolated missions. Every year we return to inspect past works and execute the next community-agreed milestone.',
      },
      {
        title: 'Local economy and empowerment',
        desc: 'All materials and skilled trades (carpenters, masons) are hired locally in Kilifi County, keeping resources within the community.',
      },
      {
        title: 'Reciprocal learning',
        desc: 'La Vall volunteers do not merely provide labor: they live alongside the community, learn from its warmth and return deeply changed.',
      },
    ],
    ctaHeading: 'Explore more or support Shariani',
    ctaText: 'Discover the yearly physical works or help us fund the upcoming phase of the school improvements.',
    ctaWorks: 'View works carried out',
    ctaVolunteer: 'The volunteering trip',
    ctaDonate: 'How to donate',
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
    path: 'que-es-shariani',
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
}

export default async function QueEsSharianiPage({
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
    path: 'que-es-shariani',
    title: copy.metaTitle,
    description: copy.metaDescription,
    breadcrumbs: [
      { name: copy.homeCrumb, item: `${SITE_URL}/${locale}` },
      { name: copy.pageCrumb, item: `${SITE_URL}/${locale}/que-es-shariani` },
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
        {/* Editorial Header Section */}
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

        {/* Narrative & Context Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container-page max-w-4xl">
            <div className="mb-14">
              <h2
                className="text-[var(--ink)] text-2xl md:text-3xl mb-5"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
              >
                {copy.whatHeading}
              </h2>
              <div
                className="space-y-4 text-[var(--ink-muted)] text-base md:text-lg leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <p>{copy.whatP1}</p>
                <p>{copy.whatP2}</p>
              </div>
            </div>

            {/* Who is involved */}
            <div className="mb-16">
              <h2
                className="text-[var(--ink)] text-2xl md:text-3xl mb-6"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
              >
                {copy.whoHeading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="p-6 rounded-2xl border border-[var(--border)]"
                  style={{ background: 'var(--paper)' }}
                >
                  <div className="inline-flex p-3 rounded-xl bg-white border border-[var(--border)] text-[var(--forest)] mb-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-lg font-semibold text-[var(--ink)] mb-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {copy.whoSchoolTitle}
                  </h3>
                  <p
                    className="text-sm md:text-base text-[var(--ink-muted)] leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {copy.whoSchoolDesc}
                  </p>
                </div>

                <div
                  className="p-6 rounded-2xl border border-[var(--border)]"
                  style={{ background: 'var(--paper)' }}
                >
                  <div className="inline-flex p-3 rounded-xl bg-white border border-[var(--border)] text-[var(--terracotta)] mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-lg font-semibold text-[var(--ink)] mb-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {copy.whoLocalTitle}
                  </h3>
                  <p
                    className="text-sm md:text-base text-[var(--ink-muted)] leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {copy.whoLocalDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Key numbers */}
            <div className="mb-16">
              <h2
                className="text-[var(--ink)] text-2xl md:text-3xl mb-8"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
              >
                {copy.numbersHeading}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {copy.numbers.map((item) => (
                  <div
                    key={item.label}
                    className="p-5 sm:p-6 rounded-2xl border border-[var(--border)] flex flex-col justify-between"
                    style={{ background: 'var(--ivory)' }}
                  >
                    <div>
                      <p
                        className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--forest)] mb-2"
                        style={{ fontFamily: 'var(--font-editorial)' }}
                      >
                        {item.value}
                      </p>
                      <p
                        className="text-sm font-semibold text-[var(--ink)] mb-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {item.label}
                      </p>
                    </div>
                    <p
                      className="text-xs text-[var(--ink-muted)] leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guiding principles */}
            <div className="mb-16">
              <h2
                className="text-[var(--ink)] text-2xl md:text-3xl mb-6"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
              >
                {copy.principlesHeading}
              </h2>
              <div className="space-y-4">
                {copy.principles.map((pr) => (
                  <div
                    key={pr.title}
                    className="p-5 sm:p-6 rounded-2xl border border-[var(--border)] bg-white flex items-start gap-4"
                  >
                    <div className="p-2 rounded-lg bg-[var(--paper)] text-[var(--forest)] mt-0.5 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className="text-base sm:text-lg font-semibold text-[var(--ink)] mb-1"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {pr.title}
                      </h3>
                      <p
                        className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {pr.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation CTA card */}
            <div
              className="p-8 sm:p-10 rounded-3xl border border-[var(--border)]"
              style={{ background: 'var(--forest-dark)', color: 'var(--ivory)' }}
            >
              <h2
                className="text-2xl sm:text-3xl mb-3"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
              >
                {copy.ctaHeading}
              </h2>
              <p
                className="text-sm sm:text-base mb-8 max-w-xl opacity-80 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {copy.ctaText}
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link
                  href={`/${locale}/obra-real`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all bg-[var(--forest)] text-white hover:bg-[var(--forest-dark)] border border-white/20"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {copy.ctaWorks}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${locale}/voluntariado-kenya`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {copy.ctaVolunteer}
                </Link>
                <Link
                  href={`/${locale}/donar`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all bg-white text-[var(--forest-dark)] hover:bg-[var(--paper)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {copy.ctaDonate}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
