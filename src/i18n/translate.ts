import { en, type MessageTree } from './messages/en'
import { zh } from './messages/zh'
import type { Locale } from './types'

export type { MessageTree }

const catalogs: Record<Locale, MessageTree> = {
  en,
  zh,
}

export function getMessages(locale: Locale): MessageTree {
  return catalogs[locale]
}

export function translate(locale: Locale, key: string): string {
  const parts = key.split('.')
  let current: unknown = getMessages(locale)

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return key
    }
  }

  return typeof current === 'string' ? current : key
}

export function formatLocalizedDate(
  locale: Locale,
  date: string,
  style: 'short' | 'long' = 'short',
) {
  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  const localeTag = locale === 'zh' ? 'zh-CN' : 'en-US'

  return parsed.toLocaleDateString(localeTag, {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  })
}

export function translateTag(locale: Locale, tag: string): string {
  const messages = getMessages(locale)
  const tags = messages.tags as Record<string, string>
  return tags[tag] ?? tag
}