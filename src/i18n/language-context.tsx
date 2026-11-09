"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Locale, Dictionary } from "./types";
import { dictionaries } from "./dictionaries";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Dictionary;
  isOtherLanguageOpen: boolean;
  setIsOtherLanguageOpen: (open: boolean) => void;
}

const defaultContext: LanguageContextType = {
  locale: "id",
  setLocale: () => {},
  toggleLocale: () => {},
  t: dictionaries.id,
  isOtherLanguageOpen: false,
  setIsOtherLanguageOpen: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

const STORAGE_KEY = "faris_portfolio_locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");
  const [isOtherLanguageOpen, setIsOtherLanguageOpen] = useState(false);
  const [, setMounted] = useState(false);

  // Initialize from localStorage or navigator
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "id" || saved === "en") {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      }
    } catch (e) {
      // localStorage may fail in some restricted contexts
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `${STORAGE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      // Update HTML lang attribute
      document.documentElement.lang = newLocale;
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleLocale = useCallback(() => {
    const nextLocale: Locale = locale === "id" ? "en" : "id";
    setLocale(nextLocale);
  }, [locale, setLocale]);

  const value: LanguageContextType = {
    locale,
    setLocale,
    toggleLocale,
    t: dictionaries[locale] || dictionaries.id,
    isOtherLanguageOpen,
    setIsOtherLanguageOpen,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  return context || defaultContext;
}
