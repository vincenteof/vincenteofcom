import type { Locale } from './types'

const STORAGE_KEY = 'locale'

export const defaultLocale: Locale = 'en'

export function resolveLocale(stored: string | null): Locale {
  if (stored === 'en' || stored === 'zh') {
    return stored
  }

  return defaultLocale
}

export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale
  }

  return resolveLocale(window.localStorage.getItem(STORAGE_KEY))
}

export function applyDocumentLocale(locale: Locale) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
}

export function persistLocale(locale: Locale) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }

  applyDocumentLocale(locale)
}

export const LOCALE_INIT_SCRIPT = `(function(){try{var stored=localStorage.getItem('locale');var locale=(stored==='en'||stored==='zh')?stored:'en';document.documentElement.lang=locale==='zh'?'zh-CN':'en'}catch(e){}})();`