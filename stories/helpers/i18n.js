import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import resources from '../../locales'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    debug: true
  });

export default i18n;
