import { useI18n } from '#/i18n/I18nProvider'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const year = new Date().getFullYear()
  const { locale, t } = useI18n()

  return (
    <footer className="site-footer px-4">
      <div className="page-wrap site-footer__inner">
        <p className="site-footer__copy m-0">
          {t('footer.copyright').replace('{year}', String(year))}
        </p>
        <SocialLinks locale={locale} ariaLabel={t('footer.socialNav')} />
      </div>
    </footer>
  )
}
