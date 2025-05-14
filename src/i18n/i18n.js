import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../locales/en/common";
import enNews from "../locales/en/news";
import enAuth from "../locales/en/auth";
import enResources from "../locales/en/resources";

import hyCommon from "../locales/hy/common";
import hyNews from "../locales/hy/news";
import hyAuth from "../locales/hy/auth";
import hyResources from "../locales/hy/resources";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        news: enNews,
        auth: enAuth,
        resources: enResources
      },
      hy: {
        common: hyCommon,
        news: hyNews,
        auth: hyAuth,
        resources: hyResources
      },
    },
    lng: "en", // Default language
    fallbackLng: "en",
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
