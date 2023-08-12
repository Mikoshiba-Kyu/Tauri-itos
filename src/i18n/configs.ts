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

const getLanguageConfig = async () => {
  let config = 'en'
  const result = await loadConfig()
  config = result.language ?? 'en'
  return config
}

;(async () => {
  const fallbackLng = await getLanguageConfig()

  i18n.use(initReactI18next).init({
    resources,
    fallbackLng,
    interpolation: {
      escapeValue: false,
    },
  })
})()

export default i18n
