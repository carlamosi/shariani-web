import { redirect } from 'next/navigation';

// The actual page lives at /[lang]/obra-real.
// Redirect bare /obra-real to the default locale.
export default function ObraRealRedirect() {
  redirect('/es/obra-real');
}
