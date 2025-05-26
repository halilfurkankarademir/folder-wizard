import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

const initialLanguage = localStorage.getItem("activeLanguage") || "en";

i18n.use(HttpBackend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: "./locales/{{lng}}.json",
        },
        fallbackLng: initialLanguage,
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
