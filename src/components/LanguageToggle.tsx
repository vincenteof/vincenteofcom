import { Globe } from 'lucide-react'
import { useI18n } from '#/i18n/I18nProvider'
import type { Locale } from '#/i18n/types'

const nextLocale: Record<Locale, Locale> = {
  en: 'zh',
  zh: 'en',
}

export default function LanguageToggle() {
  const { locale, setLocale, t } = useI18n()
  const target = nextLocale[locale]
  const label = target === 'zh' ? t('language.switchToZh') : t('language.switchToEn')

  return (
    <button
      type="button"
      onClick={() => setLocale(target)}
      aria-label={label}
      title={label}
      className="language-toggle"
    >
      <Globe aria-hidden="true" strokeWidth={1.75} />
    </button>
  )
}