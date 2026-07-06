import { Link, createFileRoute } from '@tanstack/react-router'
import PostList from '#/components/PostList'
import { useI18n } from '#/i18n/I18nProvider'
import { getHomePageDataFn } from '#/lib/posts/posts.functions'

export const Route = createFileRoute('/')({
  loader: () => getHomePageDataFn(),
  component: Home,
})

function Home() {
  const { recent } = Route.useLoaderData()
  const { t } = useI18n()

  return (
    <main className="site-main page-wrap px-4">
      <section>
        <h1 className="hero-title">
          {t('home.titleLine1')}
          <br />
          {t('home.titleLine2')}
        </h1>
        <p className="hero-lead">
          {t('home.leadPrefix')}{' '}
          <strong>{t('home.leadTech')}</strong> {t('home.leadAnd')}{' '}
          <strong>{t('home.leadInvesting')}</strong> {t('home.leadSuffix')}
        </p>
        <p className="hero-meta">{t('home.meta')}</p>
      </section>

      <hr className="divider" />

      <section>
        <div className="section-header">
          <h2 className="section-label m-0">{t('home.writing')}</h2>
          <Link to="/blog" className="section-link">
            {t('home.viewAll')}
          </Link>
        </div>
        <PostList posts={recent} />
      </section>
    </main>
  )
}