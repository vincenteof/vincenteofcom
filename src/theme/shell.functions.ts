import { createServerFn } from '@tanstack/react-start'
import { getRequestLocale } from '#/i18n/locale.server'
import type { Locale } from '#/i18n/types'
import { getRequestThemeMode } from '#/theme/theme.server'
import type { ThemeMode } from '#/theme/theme'

export type ShellPreferences = {
  locale: Locale
  theme: ThemeMode
}

export const getShellPreferencesFn = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ShellPreferences> => ({
    locale: getRequestLocale(),
    theme: getRequestThemeMode(),
  }),
)