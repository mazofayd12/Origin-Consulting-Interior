'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from './dictionaries/en.json';
import ar from './dictionaries/ar.json';

type Language = 'en' | 'ar';

interface I18nContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
}

const dictionaries: Record<Language, any> = { en, ar };

const I18nContext = createContext<I18nContextProps>({
  lang: 'en',
  setLang: () => {},
  dir: 'ltr',
  t: () => '',
});

export const I18nProvider: React.FC<{ children: React.ReactNode; initialLang?: Language }> = ({
  children,
  initialLang = 'en',
}) => {
  const [lang, setLang] = useState<Language>(initialLang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = (path: string): string => {
    const keys = path.split('.');
    let current = dictionaries[lang];
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, dir, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
