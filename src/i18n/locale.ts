import type { Locale } from './types'

export const LOCALE_COOKIE = 'locale'
export const defaultLocale: Locale = 'en'

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

export function resolveLocale(stored: string | null | undefined): Locale {
  if (stored === 'en' || stored === 'zh') {
    return stored
  }

  return defaultLocale
}

export function applyDocumentLocale(locale: Locale) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
}

export function setClientLocaleCookie(locale: Locale) {
  if (typeof document === 'undefined') {
    return
  }

  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`
}