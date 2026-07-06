import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { applyDocumentLocale, defaultLocale } from './locale'
import {
  formatLocalizedDate,
  getMessages,
  translate,
  translateTag,
  type MessageTree,
} from './translate'
import type { Locale } from './types'

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  tag: (tag: string) => string
  formatDate: (date: string, style?: 'short' | 'long') => string
  messages: MessageTree
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale)
    applyDocumentLocale(nextLocale)
  }

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translate(locale, key),
      tag: (tag) => translateTag(locale, tag),
      formatDate: (date, style = 'short') =>
        formatLocalizedDate(locale, date, style),
      messages: getMessages(locale),
    }),
    [locale],
  )

  useEffect(() => {
    document.title = value.messages.meta.title
  }, [value.messages.meta.title])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }

  return context
}