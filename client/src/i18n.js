import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'


i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // lng: 'ru',   //default 
        fallbackLng: 'en', //when specified language translations not present 

        //then fallbacklang translations loaded.
        // debug: true,
        backend: {
            /* translation file path */
            // loadPath: "/locales/{{lng}}/translation.json",
        },

        /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
        // ns: ["translations"],
        // defaultNS: "translations",
        // keySeparator: false,

        interpolation: {
            escapeValue: false,
            formatSeparator: ",",
        },

        react: {
            wait: true,
        },
    })


export default i18n