import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import trTranslation from "./locales/tr/translation.json";

const resources = {
  en: { translation: enTranslation },
  tr: { translation: trTranslation },
};

const LANGUAGE_KEY = "preferredLanguage";

const savedLanguage = localStorage.getItem(LANGUAGE_KEY);

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage || "tr",
  fallbackLng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(LANGUAGE_KEY, lng);
});

export default i18n;
