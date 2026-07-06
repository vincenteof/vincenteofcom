export type ThemeMode = 'light' | 'dark'

export const THEME_COOKIE = 'theme'
export const defaultThemeMode: ThemeMode = 'light'

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

export function resolveThemeMode(
  stored: string | null | undefined,
): ThemeMode {
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return defaultThemeMode
}

export function getHtmlThemeProps(mode: ThemeMode) {
  return {
    dataTheme: mode,
    colorScheme: mode,
  }
}

export function applyThemeMode(mode: ThemeMode) {
  if (typeof document === 'undefined') {
    return
  }

  const { dataTheme, colorScheme } = getHtmlThemeProps(mode)
  const root = document.documentElement

  root.setAttribute('data-theme', dataTheme)
  root.style.colorScheme = colorScheme
}

export function canUseThemeViewTransition(
  doc: Pick<Document, 'startViewTransition'> | null | undefined,
  prefersReducedMotion: boolean,
) {
  return Boolean(
    doc &&
      typeof doc.startViewTransition === 'function' &&
      !prefersReducedMotion,
  )
}

export function applyThemeModeWithTransition(mode: ThemeMode) {
  if (typeof document === 'undefined') {
    return
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (!canUseThemeViewTransition(document, prefersReducedMotion)) {
    applyThemeMode(mode)
    return
  }

  document.startViewTransition(() => {
    applyThemeMode(mode)
  })
}

export function setClientThemeCookie(mode: ThemeMode) {
  if (typeof document === 'undefined') {
    return
  }

  document.cookie = `${THEME_COOKIE}=${mode}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`
}