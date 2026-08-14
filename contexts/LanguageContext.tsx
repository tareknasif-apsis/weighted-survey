"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, TranslationKey } from "../lib/i18n";

export type Locale = "en" | "ms";

type LanguageContextValue = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "mnext_language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ms") setLangState(saved);
  }, []);

  function setLang(next: Locale) {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  function t(
    key: TranslationKey,
    vars?: Record<string, string | number>,
  ): string {
    let value = translations[lang][key] ?? translations.en[key] ?? key;
    if (vars) {
      for (const [name, replacement] of Object.entries(vars)) {
        value = value.replace(`{{${name}}}`, String(replacement));
      }
    }
    return value;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
