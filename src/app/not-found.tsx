import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

// Global 404 — rendered by the root layout (app/layout.tsx).
// Returns a real HTTP 404 status.
// Provides short messages in ca/es/en with nav links.
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        color: '#1a1a1a',
        background: '#faf8f4',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1, margin: 0 }}>404</h1>

      {/* Short messages in all three site languages (>20 chars each) */}
      <p style={{ fontSize: '1.125rem', color: '#555', margin: 0 }}>
        Aquesta pàgina no existeix.{' '}
        <span aria-hidden="true">·</span>{' '}
        Esta página no existe.{' '}
        <span aria-hidden="true">·</span>{' '}
        This page does not exist.
      </p>

      {/* Links to locale home pages */}
      <nav aria-label="Language home pages" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/ca" lang="ca" hrefLang="ca" style={{ color: '#2d6a4f' }}>Inici (CA)</Link>
        <Link href="/es" lang="es" hrefLang="es" style={{ color: '#2d6a4f' }}>Inicio (ES)</Link>
        <Link href="/en" lang="en" hrefLang="en" style={{ color: '#2d6a4f' }}>Home (EN)</Link>
      </nav>

      {/* Utility links */}
      <nav aria-label="Utility links" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.875rem' }}>
        <a href={`${SITE_URL}/sitemap.xml`} style={{ color: '#777' }}>sitemap.xml</a>
        <a href="/llms.txt" style={{ color: '#777' }}>llms.txt</a>
      </nav>
    </main>
  );
}
