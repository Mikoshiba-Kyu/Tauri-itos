import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translation_en from './en.json'
import translation_ja from './ja.json'

const resources = {
  ja: {
    translation: translation_ja,
  },
  en: {
    translation: translation_en,
  },
}

export const setDefaultLanguage = (lng: string) => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    })
}
