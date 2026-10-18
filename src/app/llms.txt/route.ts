import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const body = `# Shariani

> Shariani is the volunteering project of La Vall school (Bellaterra, Catalonia) at Shariani Primary School, Kilifi County, Kenya, where students build lasting school improvements every June.

## Pages

### Català (CA)
- ${SITE_URL}/ca — Inici: projecte de voluntariat La Vall × Shariani a Kenya
- ${SITE_URL}/ca/blog — Blog: cròniques i testimonis de les expedicions
- ${SITE_URL}/ca/obra-real — Obra real: millores físiques any a any a Shariani

### Español (ES)
- ${SITE_URL}/es — Inicio: proyecto de voluntariado La Vall × Shariani en Kenia
- ${SITE_URL}/es/blog — Blog: crónicas y testimonios de las expediciones
- ${SITE_URL}/es/obra-real — Obra real: mejoras físicas año a año en Shariani

### English (EN)
- ${SITE_URL}/en — Home: La Vall × Shariani volunteering project in Kenya
- ${SITE_URL}/en/blog — Blog: field diaries and student testimonies
- ${SITE_URL}/en/obra-real — Real works: yearly physical improvements at Shariani
`;

  return new NextResponse(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
