import { createContext, useContext, useState } from "react";

const I18nContext = createContext({ language: "en", setLanguage: () => {} });

export function I18nProvider({ children, value }) {
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export const translations = {
  en: {
    lightMode: "Light",
    darkMode: "Dark",
    logout: "Logout",
    language: "Language",
  },
  es: {
    lightMode: "Claro",
    darkMode: "Oscuro",
    logout: "Cerrar sesión",
    language: "Idioma",
  },
};