'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollReveal
 * Attaches an IntersectionObserver to every element with class `reveal` or `reveal-fade`
 * in the document and adds `in-view` when the element enters the viewport.
 *
 * Mount once at the layout / page level.
 */
export function ScrollReveal() {
  const observed = useRef(new Set<Element>());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // If reduced motion, reveal everything immediately
      document.querySelectorAll('.reveal, .reveal-fade, .clip-reveal').forEach((el) => {
        el.classList.add('in-view');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !observed.current.has(entry.target)) {
            observed.current.add(entry.target);
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all current reveal elements
    const observe = () => {
      document.querySelectorAll('.reveal, .reveal-fade, .clip-reveal').forEach((el) => {
        if (!observed.current.has(el)) {
          observer.observe(el);
        }
      });
    };

    observe();

    // Also observe elements added dynamically (e.g. after hydration)
    const mutationObserver = new MutationObserver(observe);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
