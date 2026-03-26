import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources, type AppLanguage } from '@/shared/i18n/resources'

const languageStorageKey = 'site-language'
const fallbackLanguage: AppLanguage = 'ru'
const supportedLanguages = Object.keys(resources) as AppLanguage[]

function resolveInitialLanguage(): AppLanguage {
  const savedLanguage = localStorage.getItem(languageStorageKey)

  if (
    savedLanguage &&
    supportedLanguages.includes(savedLanguage as AppLanguage)
  ) {
    return savedLanguage as AppLanguage
  }

  const browserLanguage = navigator.language.slice(0, 2) as AppLanguage

  if (supportedLanguages.includes(browserLanguage)) {
    return browserLanguage
  }

  return fallbackLanguage
}

function syncDocumentLanguage(language: string) {
  document.documentElement.lang = language
}

void i18n.use(initReactI18next).init({
  resources,
  lng: resolveInitialLanguage(),
  fallbackLng: fallbackLanguage,
  interpolation: {
    escapeValue: false,
  },
})

syncDocumentLanguage(i18n.resolvedLanguage ?? fallbackLanguage)

i18n.on('languageChanged', (language) => {
  localStorage.setItem(languageStorageKey, language)
  syncDocumentLanguage(language)
})

export { i18n }
