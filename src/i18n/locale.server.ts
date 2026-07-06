import '@tanstack/react-start/server-only'

import { getCookie } from '@tanstack/react-start/server'
import { LOCALE_COOKIE, resolveLocale } from './locale'
import type { Locale } from './types'

export function getRequestLocale(): Locale {
  return resolveLocale(getCookie(LOCALE_COOKIE))
}