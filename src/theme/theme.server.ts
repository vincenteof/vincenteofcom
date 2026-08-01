import '@tanstack/react-start/server-only'

import { getCookie } from '@tanstack/react-start/server'
import { THEME_COOKIE, resolveThemeMode } from './theme'
import type { ThemeMode } from './theme'

export function getRequestThemeMode(): ThemeMode {
  return resolveThemeMode(getCookie(THEME_COOKIE))
}