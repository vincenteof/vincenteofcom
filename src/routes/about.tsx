import { Link, createFileRoute } from '@tanstack/react-router'
import { useI18n } from '#/i18n/I18nProvider'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const { t } = useI18n()

  return (
    <main className="site-main page-wrap--narrow px-4">
      <section className="mb-12">
        <h1 className="hero-title">{t('about.title')}</h1>
        <p className="hero-lead">{t('about.lead')}</p>
      </section>

      <div className="article-prose">
        <p>{t('about.bio')}</p>

        <p>
          {t('about.introPrefix')}{' '}
          <Link to="/blog">{t('about.introLink')}</Link>
          {t('about.introSuffix')}
        </p>

        <h2>{t('about.techTitle')}</h2>
        <p>{t('about.techContext')}</p>
        <p>{t('about.techBody')}</p>

        <h2>{t('about.investingTitle')}</h2>
        <p>{t('about.investingOrigin')}</p>
        <p>{t('about.investingBody')}</p>

        <h2>{t('about.whyTitle')}</h2>
        <p>{t('about.whyBody')}</p>

        <p>
          <Link to="/blog" className="section-link">
            {t('about.cta')}
          </Link>
        </p>
      </div>
    </main>
  )
}