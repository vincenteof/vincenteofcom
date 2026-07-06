export type ThemeMode = 'light' | 'dark' | 'auto'

export const THEME_COOKIE = 'theme'
export const defaultThemeMode: ThemeMode = 'auto'

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

export function resolveThemeMode(
  stored: string | null | undefined,
): ThemeMode {
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored
  }

  return defaultThemeMode
}

export function getHtmlThemeProps(mode: ThemeMode) {
  if (mode === 'light') {
    return {
      dataTheme: 'light' as const,
      colorScheme: 'light' as const,
    }
  }

  if (mode === 'dark') {
    return {
      dataTheme: 'dark' as const,
      colorScheme: 'dark' as const,
    }
  }

  return {
    dataTheme: undefined,
    colorScheme: 'light dark' as const,
  }
}

export function applyThemeMode(mode: ThemeMode) {
  if (typeof document === 'undefined') {
    return
  }

  const { dataTheme, colorScheme } = getHtmlThemeProps(mode)
  const root = document.documentElement

  if (dataTheme) {
    root.setAttribute('data-theme', dataTheme)
  } else {
    root.removeAttribute('data-theme')
  }

  root.style.colorScheme = colorScheme
}

export function setClientThemeCookie(mode: ThemeMode) {
  if (typeof document === 'undefined') {
    return
  }

  document.cookie = `${THEME_COOKIE}=${mode}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`
}