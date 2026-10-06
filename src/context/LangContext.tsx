'use client';

import React, { createContext, useContext, useState } from 'react';
import { t, Lang, Translations } from '@/data/translations';

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

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('CA');

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
