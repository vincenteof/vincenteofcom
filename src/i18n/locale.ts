import type { Locale } from './types'

const STORAGE_KEY = 'locale'

export function detectLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'zh'
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'zh') {
    return stored
  }

  return 'zh'
}

export function persistLocale(locale: Locale) {
  window.localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
}

export const LOCALE_INIT_SCRIPT = `(function(){try{var stored=localStorage.getItem('locale');var locale=(stored==='en'||stored==='zh')?stored:'zh';document.documentElement.lang=locale==='zh'?'zh-CN':'en'}catch(e){}})();`