// This file exists only as a fallback.
// The next.config.ts redirects "/" → "/es" before this renders.
// If somehow reached (e.g. ISR cache miss during redirect), redirect client-side.
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/es');
}
