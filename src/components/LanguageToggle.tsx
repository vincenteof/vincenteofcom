import { Languages } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
import { useI18n } from '#/i18n/I18nProvider'
import { localeLabels, type Locale } from '#/i18n/types'

const nextLocale: Record<Locale, Locale> = {
  en: 'zh',
  zh: 'en',
}

export default function LanguageToggle() {
  const router = useRouter()
  const { locale, setLocale, t } = useI18n()
  const target = nextLocale[locale]
  const label = target === 'zh' ? t('language.switchToZh') : t('language.switchToEn')

  return (
    <button
      type="button"
      onClick={() => {
        setLocale(target)
        // Re-run loaders so post bodies/titles follow the new cookie locale
        void router.invalidate()
      }}
      aria-label={label}
      title={label}
      className="language-toggle"
    >
      <Languages aria-hidden="true" strokeWidth={1.75} />
      <span className="language-toggle__label">{localeLabels[target]}</span>
    </button>
  )
}