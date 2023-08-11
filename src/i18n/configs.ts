import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { loadConfig } from '../utils/config'

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

const getLanguageConfig = () => {
  let config = 'en'
  ;(async () => {
    const result = await loadConfig()
    config = result.language ?? 'en'
  })()
  return config
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: getLanguageConfig(),
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
