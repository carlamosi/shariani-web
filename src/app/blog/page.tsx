import { redirect } from 'next/navigation';

// The actual blog lives at /[lang]/blog.
// Redirect bare /blog to the default locale.
export default function BlogRedirect() {
  redirect('/es/blog');
}
