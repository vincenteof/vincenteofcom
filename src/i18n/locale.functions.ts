import { createServerFn } from '@tanstack/react-start'
import { getRequestLocale } from './locale.server'
import type { Locale } from './types'

export const getLocaleFn = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Locale> => getRequestLocale(),
)