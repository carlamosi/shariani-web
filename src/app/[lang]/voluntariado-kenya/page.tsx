import type { Locale } from '@/lib/site';
import { LOCALES, SITE_URL } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { buildPageJsonLd } from '@/lib/jsonld';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  CheckCircle2,
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
  cycleHeading: string;
  cycleSteps: Array<{ step: string; title: string; desc: string }>;
  expeditionHeading: string;
  expeditionP1: string;
  expeditionP2: string;
  worksHeading: string;
  works: Array<{ title: string; desc: string }>;
  testimonialsHeading: string;
  testimonials: Array<{ quote: string; author: string; role: string }>;
  ctaHeading: string;
  ctaText: string;
  ctaDonate: string;
  ctaWorks: string;
  ctaAbout: string;
}

const COPY: Record<Locale, PageCopy> = {
  es: {
    metaTitle: 'Voluntariado La Vall en Kenia | Shariani',
    metaDescription:
      'Descubre el voluntariado de La Vall en Kenia: expedición de junio con alumnas de 2.º de Bachillerato en Shariani Primary School (Kilifi). Organización y obras.',
    eyebrow: 'Expedición solidaria anual',
    h1: 'El voluntariado de La Vall en Shariani, Kenia',
    lead:
      'El voluntariado de La Vall en Kenia es una expedición educativa y solidaria que se lleva a cabo cada mes de junio, justo al terminar las pruebas de acceso a la universidad (PAU). Alumnas de 2.º de Bachillerato del colegio La Vall (Bellaterra, Barcelona) viajan a Shariani Primary School (Kilifi County, Kenia) durante dos semanas para ejecutar sobre el terreno las mejoras de infraestructuras acordadas y financiadas a lo largo de todo el curso escolar.',
    homeCrumb: 'Inicio',
    pageCrumb: 'Voluntariado en Kenia',
    cycleHeading: 'Cómo se organiza el voluntariado durante el año',
    cycleSteps: [
      {
        step: 'Fase 1',
        title: 'Preparación y sensibilización (Septiembre - Mayo)',
        desc: 'Las alumnas de 2.º de Bachillerato lideran iniciativas solidarias en el colegio, organizan campañas y recaudan fondos para financiar los materiales de la expedición.',
      },
      {
        step: 'Fase 2',
        title: 'Definición de prioridades con Shariani',
        desc: 'En diálogo directo con el equipo directivo y docentes de Shariani, se seleccionan las necesidades estructurales prioritarias: pupitres, aulas, vallas o higiene.',
      },
      {
        step: 'Fase 3',
        title: 'Expedición sobre el terreno (Junio)',
        desc: 'Tras la selectividad, voluntarias y profesoras viajan a Kilifi durante dos semanas de trabajo intensivo junto a artesanos, familias y escolares.',
      },
      {
        step: 'Fase 4',
        title: 'Evaluación y continuidad del proyecto',
        desc: 'El compromiso no termina en junio: cada curso entrega el testigo a la siguiente promoción de alumnas para asegurar la sostenibilidad de las mejoras.',
      },
    ],
    expeditionHeading: 'El día a día de las dos semanas en Kilifi',
    expeditionP1:
      'Durante la estancia en Shariani, las voluntarias combinan labores de construcción y rehabilitación física con actividades socioeducativas. Las mañanas se dedican al trabajo manual directo: lijar, barnizar y ensamblar pupitres con carpinteros de la zona, sanear y pintar aulas deterioradas o levantar tramos del muro perimetral.',
    expeditionP2:
      'Por las tardes, se desarrollan talleres prácticos de higiene bucodental, dinámicas de lectura y convivencia con los más de 1.200 estudiantes del colegio. La convivencia estrecha fomenta un aprendizaje mutuo: las voluntarias descubren una lección imborrable de generosidad, gratitud y comunidad.',
    worksHeading: 'Proyectos tangibles ejecutados en las expediciones',
    works: [
      {
        title: 'Pupitres y mesas de madera',
        desc: 'Fabricados por carpinteros locales para sustituir bancos rotos y permitir que el alumnado estudie sentado y con soporte para escribir.',
      },
      {
        title: 'Talleres de higiene bucal',
        desc: 'Entrega de cepillos de dientes y sesiones prácticas de salud e higiene diaria para cientos de alumnos de primaria.',
      },
      {
        title: 'Proyecto 300 faldas escolares',
        desc: 'Confección y entrega de faldas uniformadas para garantizar la dignidad y regularidad escolar de las niñas de Shariani.',
      },
      {
        title: 'Valla y seguridad perimetral',
        desc: 'Construcción de un cerramiento seguro alrededor del recinto escolar para proteger las aulas y los espacios de juego.',
      },
    ],
    testimonialsHeading: 'Voces de la comunidad educativa',
    testimonials: [
      {
        quote:
          'Vas a Shariani pensando que vas a ayudar, y vuelves sabiendo que has recibido muchísimo más de lo que has dado. Ver a las niñas sentadas en los pupitres que construimos juntas es el mejor recuerdo.',
        author: 'Júlia Duaso',
        role: 'Voluntaria de La Vall en Shariani',
      },
      {
        quote:
          'La implicación de las alumnas y profesoras de La Vall no es una visita fugaz: es una relación de confianza que se renueva cada junio y que transforma las condiciones de nuestra escuela.',
        author: 'Miss Martha',
        role: 'Docente en Shariani Primary School',
      },
    ],
    ctaHeading: 'Apoya el voluntariado de Shariani',
    ctaText: 'Cada donación financia directamente los materiales que las voluntarias utilizarán en la próxima expedición.',
    ctaDonate: 'Cómo donar (Bizum y Teaming)',
    ctaWorks: 'Cronología de obras',
    ctaAbout: 'Qué es Shariani',
  },
  ca: {
    metaTitle: 'Voluntariat La Vall a Kenya | Shariani',
    metaDescription:
      'Descobreix el voluntariat de La Vall a Kenya: expedició de juny amb alumnes de 2n de Batxillerat a Shariani Primary School (Kilifi). Organització i obres.',
    eyebrow: 'Expedició solidària anual',
    h1: 'El voluntariat de La Vall a Shariani, Kenya',
    lead:
      'El voluntariat de La Vall a Kenya és una expedició educativa i solidària que es duu a terme cada mes de juny, just en acabar les proves d’accés a la universitat (PAU). Alumnes de 2n de Batxillerat del col·legi La Vall (Bellaterra, Barcelona) viatgen a Shariani Primary School (comtat de Kilifi, Kenya) durant dues setmanes per executar sobre el terreny les millores d’infraestructures acordades i finançades al llarg de tot el curs escolar.',
    homeCrumb: 'Inici',
    pageCrumb: 'Voluntariat a Kenya',
    cycleHeading: 'Com s’organitza el voluntariat durant l’any',
    cycleSteps: [
      {
        step: 'Fase 1',
        title: 'Preparació i sensibilització (Setembre - Maig)',
        desc: 'Les alumnes de 2n de Batxillerat lideren iniciatives solidàries a l’escola, organitzen campanyes i recapten fons per als materials.',
      },
      {
        step: 'Fase 2',
        title: 'Definició de prioritats amb Shariani',
        desc: 'En diàleg directe amb la direcció i docents de Shariani, es concreten les necessitats estructurals: pupitres, aules, tancaments o higiene.',
      },
      {
        step: 'Fase 3',
        title: 'Expedició sobre el terreny (Juny)',
        desc: 'Després de les PAU, voluntàries i professores viatgen a Kilifi durant dues setmanes de treball intensiu al costat de la comunitat.',
      },
      {
        step: 'Fase 4',
        title: 'Avaluació i continuïtat del projecte',
        desc: 'El compromís no s’acaba al juny: cada promoció passa el relleu a la següent per assegurar la sostenibilitat del projecte.',
      },
    ],
    expeditionHeading: 'El dia a dia de les dues setmanes a Kilifi',
    expeditionP1:
      'Durant l’estada a Shariani, les voluntàries combinen tasques de construcció i rehabilitació física amb activitats socioeducatives. Els matins es dediquen a la feina manual: polir, envernissar i muntar taules amb fusters de la zona, netejar i pintar aules o aixecar el mur de seguretat.',
    expeditionP2:
      'A les tardes, s’imparteixen tallers pràctics d’higiene bucodental, dinàmiques de lectura i jocs amb els més de 1.200 infants del centre. La convivència diària genera un aprenentatge mutu inesborrable de generositat i comunitat.',
    worksHeading: 'Projectes tangibles executats a les expedicions',
    works: [
      {
        title: 'Pupitres i taules de fusta',
        desc: 'Fabricats per fusters locals per substituir bancs trencats i oferir un lloc digne on asseure’s i escriure.',
      },
      {
        title: 'Tallers d’higiene bucal',
        desc: 'Lliurament de raspalls de dents i sessions pràctiques d’higiene diària per a centenars d’infants.',
      },
      {
        title: 'Projecte 300 faldilles escolars',
        desc: 'Confecció i lliurament de faldilles d’uniforme per garantir la dignitat i continuïtat escolar de les nenes.',
      },
      {
        title: 'Tancament i seguretat perimetral',
        desc: 'Construcció d’una tanca segura al voltant de l’escola per protegir les aules i les zones d’esbarjo.',
      },
    ],
    testimonialsHeading: 'Veus de la comunitat educativa',
    testimonials: [
      {
        quote:
          'Vas a Shariani pensant que vas a ajudar, i tornes sabent que has rebut molt més del que has donat. Veure les nenes als pupitres construïts juntes és el millor record.',
        author: 'Júlia Duaso',
        role: 'Voluntària de La Vall a Shariani',
      },
      {
        quote:
          'La implicació de les alumnes de La Vall no és una visita passatgera: és un vincle de confiança que es renova cada juny i millora l’escola de veritat.',
        author: 'Miss Martha',
        role: 'Mestra a Shariani Primary School',
      },
    ],
    ctaHeading: 'Dóna suport al voluntariat de Shariani',
    ctaText: 'Cada donació finança directament els materials que les voluntàries faran servir a la propera expedició.',
    ctaDonate: 'Com donar (Bizum i Teaming)',
    ctaWorks: 'Cronologia d’obres',
    ctaAbout: 'Què és Shariani',
  },
  en: {
    metaTitle: 'La Vall Volunteering in Kenya | Shariani',
    metaDescription:
      'Discover La Vall’s volunteering trip in Kenya: June expedition by Year 13 students at Shariani Primary School (Kilifi). Project planning and real works.',
    eyebrow: 'Annual solidarity expedition',
    h1: 'The La Vall volunteering project in Shariani, Kenya',
    lead:
      'The La Vall volunteering project in Kenya is an annual educational and solidarity expedition held every June, immediately following university entrance examinations. Year 13 students from La Vall school (Bellaterra, Barcelona) travel to Shariani Primary School (Kilifi County, Kenya) for two weeks to execute physical facility improvements agreed upon with and funded by the community throughout the school year.',
    homeCrumb: 'Home',
    pageCrumb: 'Volunteering in Kenya',
    cycleHeading: 'How the project runs throughout the year',
    cycleSteps: [
      {
        step: 'Phase 1',
        title: 'Preparation and awareness (September - May)',
        desc: 'Year 13 students lead school fundraising events, community awareness drives and project coordination to finance materials.',
      },
      {
        step: 'Phase 2',
        title: 'Prioritization with Shariani staff',
        desc: 'In ongoing communication with Shariani’s leadership and teachers, priority infrastructure needs are finalized: desks, classrooms, walls or hygiene.',
      },
      {
        step: 'Phase 3',
        title: 'On-the-ground expedition (June)',
        desc: 'Following university entrance exams, students and teachers travel to Kilifi for two weeks of intensive work alongside local builders and families.',
      },
      {
        step: 'Phase 4',
        title: 'Evaluation and handover',
        desc: 'The project is continuous: each senior class passes the baton to the next cohort to ensure sustainable long-term development.',
      },
    ],
    expeditionHeading: 'Daily life during the two weeks in Kilifi',
    expeditionP1:
      'During their stay in Shariani, volunteers combine physical construction and renovation with educational activities. Mornings are devoted to physical labor: sanding, varnishing and assembling desks with local carpenters, plastering classrooms and building sections of the security perimeter wall.',
    expeditionP2:
      'Afternoons feature oral hygiene workshops, reading sessions and games with the school’s 1,200 pupils. The close partnership creates an enduring lesson in empathy, resilience and shared humanity.',
    worksHeading: 'Tangible projects built during expeditions',
    works: [
      {
        title: 'Wooden school desks and benches',
        desc: 'Crafted with local Kilifi carpenters to replace broken benches and provide proper learning stations.',
      },
      {
        title: 'Oral hygiene workshops',
        desc: 'Toothbrush distribution and interactive hygiene workshops for hundreds of primary students.',
      },
      {
        title: '300 school skirts project',
        desc: 'Production and delivery of tailored uniform skirts to support girls’ consistent attendance in school.',
      },
      {
        title: 'Perimeter security wall',
        desc: 'Construction of a protective fence to ensure a safe learning environment for students and teachers.',
      },
    ],
    testimonialsHeading: 'Voices from the educational community',
    testimonials: [
      {
        quote:
          'You travel to Shariani thinking you are going to help, and you come back knowing you received far more than you gave. Seeing the children learning at the desks we built together is the greatest reward.',
        author: 'Júlia Duaso',
        role: 'La Vall volunteer at Shariani',
      },
      {
        quote:
          'The commitment of La Vall students is not a fleeting visit: it is a relationship of deep trust renewed every June that genuinely improves our school.',
        author: 'Miss Martha',
        role: 'Teacher at Shariani Primary School',
      },
    ],
    ctaHeading: 'Support the upcoming Shariani expedition',
    ctaText: 'Every donation directly purchases the physical materials volunteers will install during the next expedition.',
    ctaDonate: 'How to donate (Bizum & Teaming)',
    ctaWorks: 'Works timeline',
    ctaAbout: 'What is Shariani',
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
    path: 'voluntariado-kenya',
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
}

export default async function VoluntariadoKenyaPage({
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
    path: 'voluntariado-kenya',
    title: copy.metaTitle,
    description: copy.metaDescription,
    breadcrumbs: [
      { name: copy.homeCrumb, item: `${SITE_URL}/${locale}` },
      { name: copy.pageCrumb, item: `${SITE_URL}/${locale}/voluntariado-kenya` },
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

        {/* Annual Cycle & Organization */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container-page max-w-4xl">
            <div className="mb-16">
              <h2
                className="text-[var(--ink)] text-2xl md:text-3xl mb-8"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
              >
                {copy.cycleHeading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {copy.cycleSteps.map((st) => (
                  <div
                    key={st.step}
                    className="p-6 rounded-2xl border border-[var(--border)]"
                    style={{ background: 'var(--paper)' }}
                  >
                    <span
                      className="text-xs font-bold uppercase tracking-wider text-[var(--forest)] block mb-2"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {st.step}
                    </span>
                    <h3
                      className="text-base sm:text-lg font-semibold text-[var(--ink)] mb-2"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {st.title}
                    </h3>
                    <p
                      className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily life on the ground */}
            <div className="mb-16">
              <h2
                className="text-[var(--ink)] text-2xl md:text-3xl mb-5"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
              >
                {copy.expeditionHeading}
              </h2>
              <div
                className="space-y-4 text-[var(--ink-muted)] text-base md:text-lg leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <p>{copy.expeditionP1}</p>
                <p>{copy.expeditionP2}</p>
              </div>
            </div>

            {/* Works executed */}
            <div className="mb-16">
              <h2
                className="text-[var(--ink)] text-2xl md:text-3xl mb-8"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
              >
                {copy.worksHeading}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {copy.works.map((w) => (
                  <div
                    key={w.title}
                    className="p-6 rounded-2xl border border-[var(--border)]"
                    style={{ background: 'var(--ivory)' }}
                  >
                    <div className="flex items-center gap-2 mb-2 text-[var(--forest)]">
                      <CheckCircle2 className="w-5 h-5" />
                      <h3
                        className="text-base sm:text-lg font-semibold text-[var(--ink)]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {w.title}
                      </h3>
                    </div>
                    <p
                      className="text-sm text-[var(--ink-muted)] leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {w.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-16">
              <h2
                className="text-[var(--ink)] text-2xl md:text-3xl mb-8"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400 }}
              >
                {copy.testimonialsHeading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {copy.testimonials.map((t) => (
                  <blockquote
                    key={t.author}
                    className="p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-white flex flex-col justify-between"
                  >
                    <p
                      className="text-[var(--ink)] italic text-sm sm:text-base leading-relaxed mb-4"
                      style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="pt-3 border-t border-[var(--border-light)]">
                      <p
                        className="text-sm font-semibold text-[var(--ink)]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {t.author}
                      </p>
                      <p
                        className="text-xs text-[var(--ink-muted)]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {t.role}
                      </p>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>

            {/* CTA card */}
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
                  href={`/${locale}/donar`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all bg-[var(--forest)] text-white hover:bg-[var(--forest-dark)] border border-white/20"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {copy.ctaDonate}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${locale}/obra-real`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {copy.ctaWorks}
                </Link>
                <Link
                  href={`/${locale}/que-es-shariani`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all bg-white text-[var(--forest-dark)] hover:bg-[var(--paper)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {copy.ctaAbout}
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
