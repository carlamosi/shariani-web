import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const body = `# Shariani La Vall

> Shariani La Vall is the volunteering project of La Vall school (Bellaterra, Catalonia, Spain) at Shariani Primary School, Kilifi County, Kenya. Every June, Year 13 students (2.º Bachillerato) build lasting physical improvements at the school alongside the local community.

## Key facts

- **Also known as:** voluntariado La Vall Kenia, projecte Shariani La Vall, Shariani voluntariado
- **School of origin:** La Vall — Ctra. Sabadell a Bellaterra, km 4,6 — 08205 Sabadell (Barcelona), Spain
- **Partner school:** Shariani Primary School, Kilifi County, Kenya
- **Active since:** 2023 (first field expedition June 2024)
- **Contact:** shariani@la-vall.org
- **Not a legally constituted NGO** — a student volunteering programme run by an educational institution.

## Completed works

| Year | Work |
|------|------|
| 2024 | Painting and refurbishment of primary classrooms |
| 2025 | Handcrafted school desks & chairs; perimeter security fence |
| 2026 | Roof repairs, educational murals, oral hygiene workshops, 300 school skirts |
| 2027 | Well and safe drinking-water system (planned, ~€5,000) |

## Pages

### Español (ES — default)
- ${SITE_URL}/es — Inicio: proyecto de voluntariado La Vall × Shariani en Kenia
- ${SITE_URL}/es/que-es-shariani — Qué es Shariani: historia, escuela socia y cifras clave
- ${SITE_URL}/es/voluntariado-kenya — Voluntariado en Kenia: funcionamiento de la expedición de junio
- ${SITE_URL}/es/donar — Cómo donar: Bizum solidario (03367), Teaming e iHelp
- ${SITE_URL}/es/obra-real — Obra real: mejoras físicas año a año en Shariani
- ${SITE_URL}/es/blog — Blog: crónicas y testimonios de las expediciones

### Català (CA)
- ${SITE_URL}/ca — Inici: projecte de voluntariat La Vall × Shariani a Kenya
- ${SITE_URL}/ca/que-es-shariani — Què és Shariani: història, escola sòcia i xifres clau
- ${SITE_URL}/ca/voluntariado-kenya — Voluntariat a Kenya: funcionament de l’expedició de juny
- ${SITE_URL}/ca/donar — Com donar: Bizum solidari (03367), Teaming i iHelp
- ${SITE_URL}/ca/obra-real — Obra real: millores físiques any a any a Shariani
- ${SITE_URL}/ca/blog — Blog: cròniques i testimonis de les expedicions

### English (EN)
- ${SITE_URL}/en — Home: La Vall × Shariani volunteering project in Kenya
- ${SITE_URL}/en/que-es-shariani — What is Shariani: project history, partner school and key figures
- ${SITE_URL}/en/voluntariado-kenya — Volunteering in Kenya: how the June student expedition works
- ${SITE_URL}/en/donar — How to donate: Solidarity Bizum (03367), Teaming and iHelp
- ${SITE_URL}/en/obra-real — Real works: yearly physical improvements at Shariani
- ${SITE_URL}/en/blog — Blog: field diaries and student testimonies

## External references

- Teaming fundraising: https://www.teaming.net/unaescuela-milesdesuenosenkenia
- Instagram: https://www.instagram.com/amara.la_vall/
- Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new NextResponse(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
