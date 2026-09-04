'use client';

import React, { createContext, useContext, useState } from 'react';
import { LanguageCode, LanguageOption } from '@/types/language';
import { SUPPORTED_LANGUAGES } from '@/lib/language/languages';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  selectedLanguageOption: LanguageOption;
  bcp47LanguageCode: string;
  setLanguage: (code: LanguageCode) => void;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  const selectedLanguageOption =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === currentLanguage) ||
    SUPPORTED_LANGUAGES[0];

  const bcp47LanguageCode = currentLanguage === 'ta' ? 'ta-IN' : currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';

  const setLanguage = (code: LanguageCode) => {
    const target = SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
    if (target && target.isAvailable) {
      setCurrentLanguage(code);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        selectedLanguageOption,
        bcp47LanguageCode,
        setLanguage,
        availableLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
