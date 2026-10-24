import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/site';

// The actual page lives at /[lang]/obra-real.
// Redirect bare /obra-real to the active or default locale.
export default async function ObraRealRedirect() {
  const cookieStore = await cookies();
  const raw = cookieStore.get('NEXT_LOCALE')?.value;
  const target: Locale = raw && (LOCALES as readonly string[]).includes(raw)
    ? (raw as Locale)
    : DEFAULT_LOCALE;
  redirect(`/${target}/obra-real`);
}
