import type { Locale } from './types'

export const defaultLocale: Locale = 'en'

export function applyDocumentLocale(locale: Locale) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
}