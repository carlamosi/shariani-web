/**
 * DONATION_CONFIG
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all variable data in the donation section.
 * Nothing is hardcoded in the component: every value that can change over time
 * lives here. Null values are hidden gracefully — no empty boxes rendered.
 *
 * On-site payment is NOT implemented. Every donation path is either a Bizum
 * code (copied to clipboard) or an external link.
 */

export interface VoiceItem {
  role: 'teacher' | 'volunteer' | 'lavall-teacher';
  name: string;
  attributionES: string;
  attributionCA: string;
  attributionEN: string;
  textES: string;
  textCA: string;
  textEN: string;
  photo?: string | null;
  authorized: boolean;
}

export interface DonationConfigType {
  bizumCode: string;
  bizumQr: string | null;
  ihelpUrl: string | null;
  teamingUrl: string | null;
  deductible: {
    bizum: boolean | null;
    ihelp: boolean | null;
    teaming: boolean | null;
  };
  deductionFootnote: string | null;
  mealCostEUR: number | null;
  updatedAt: string | null;
  sourceNote: string | null;
  promiseEnabled: boolean;
  HERO_PHOTO: {
    src: string | null;
    alt: string | null;
    authorized: boolean;
    name: string | null;
    age: number | null;
    line: string | null;
  };
  EQUIVALENCES: Record<string, { es: string; ca: string; en: string }> | null;
  voices: VoiceItem[];
}

export const DONATION_CONFIG: DonationConfigType = {
  bizumCode: '03367',
  bizumQr: null,
  ihelpUrl: null,
  teamingUrl: 'https://www.teaming.net/lavallshariani',
  deductible: {
    bizum: null,
    ihelp: null,
    teaming: null,
  },
  deductionFootnote: null,
  mealCostEUR: null,
  updatedAt: null,
  sourceNote: null,
  promiseEnabled: false,
  HERO_PHOTO: {
    src: null,
    alt: null,
    authorized: false,
    name: null,
    age: null,
    line: null,
  },
  EQUIVALENCES: null,
  voices: [
    {
      role: 'teacher',
      name: 'Mwalimu Juma',
      attributionES: 'Docente en Shariani Primary School',
      attributionCA: 'Docent a Shariani Primary School',
      attributionEN: 'Teacher at Shariani Primary School',
      textES:
        'Cada año vemos llegar a las voluntarias de La Vall no solo con herramientas y pintura, sino con un compromiso que se queda cuando se marchan. Los niños ahora aprenden en aulas dignas y saben que no están solos.',
      textCA:
        'Cada any veiem arribar les voluntàries de La Vall no només amb eines i pintura, sinó amb un compromís que es queda quan marxen. Els nens ara aprenen en aules dignes i saben que no estan sols.',
      textEN:
        'Every year we see the volunteers from La Vall arrive not only with tools and paint, but with a commitment that stays when they leave. The children now learn in decent classrooms and know they are not alone.',
      photo: null,
      authorized: true,
    },
  ],
};
