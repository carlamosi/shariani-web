'use client';

import { useEffect } from 'react';

const SCROLL_KEY = 'lang-switch-scroll-y';

/** Saves current scroll position for restoration after a language switch. */
export function saveLangSwitchScroll() {
  try {
    sessionStorage.setItem(SCROLL_KEY, String(Math.round(window.scrollY)));
  } catch {
    // sessionStorage unavailable (private mode, etc.) — silent
  }
}

/**
 * Mounts once per page load and restores scroll position saved by
 * saveLangSwitchScroll(). Place this inside the page or layout so it
 * runs after every locale navigation.
 */
export function ScrollRestorer() {
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved !== null) {
        const y = parseInt(saved, 10);
        sessionStorage.removeItem(SCROLL_KEY);
        if (!isNaN(y) && y > 0) {
          // Use instant scroll — no smooth animation so the user doesn't
          // notice the brief jump from 0 to the correct position.
          window.scrollTo({ top: y, behavior: 'instant' });
        }
      }
    } catch {
      // sessionStorage unavailable — silent
    }
  }, []);

  return null;
}
