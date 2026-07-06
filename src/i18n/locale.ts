import type { Locale } from './types'

const STORAGE_KEY = 'locale'

export function localeFromLanguageTag(language: string): Locale {
  return language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function resolveLocale(
  stored: string | null,
  systemLanguage?: string,
): Locale {
  if (stored === 'en' || stored === 'zh') {
    return stored
  }

  if (systemLanguage) {
    return localeFromLanguageTag(systemLanguage)
  }

  return 'en'
}

export function detectLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en'
  }

  return resolveLocale(
    window.localStorage.getItem(STORAGE_KEY),
    navigator.language,
  )
}

export function persistLocale(locale: Locale) {
  window.localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
}

export const LOCALE_INIT_SCRIPT = `(function(){try{var stored=localStorage.getItem('locale');var locale=(stored==='en'||stored==='zh')?stored:(navigator.language.toLowerCase().startsWith('zh')?'zh':'en');document.documentElement.lang=locale==='zh'?'zh-CN':'en'}catch(e){}})();`