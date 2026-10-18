'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { t, Lang, Translations } from '@/data/translations';
import type { Locale } from '@/lib/site';

// Map URL locale segment (lowercase) to translation key (uppercase)
const LOCALE_TO_LANG: Record<string, Lang> = {
  ca: 'CA',
  es: 'ES',
  en: 'EN',
};

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: 'CA',
  setLang: () => {},
  tr: t.CA,
});

export function LangProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang?: Locale;
}) {
  const derived: Lang = initialLang ? (LOCALE_TO_LANG[initialLang] ?? 'ES') : 'ES';
  const [lang, setLangState] = useState<Lang>(derived);

  useEffect(() => {
    if (initialLang && LOCALE_TO_LANG[initialLang]) {
      setLangState(LOCALE_TO_LANG[initialLang]);
    }
  }, [initialLang]);

  const setLang = (l: Lang) => setLangState(l);

  // Each t[lang] satisfies Translations (union of CA | ES | EN)
  const tr: Translations = t[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, tr }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
