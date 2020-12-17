//i18n
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

//translations
import { resources } from "./translation";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    whitelist: ['en', 'pl'],
    fallbackLng: {
      "en-us": ["en"],
      "en-uk": ["en"],
      "pl-pl": ["pl"],
      "default": ["en"]
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ["path", "localStorage", "navigator"],
      caches: ["localStorage"],
      checkWhitelist: true
    },
  });

export default i18n;
