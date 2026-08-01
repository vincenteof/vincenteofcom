import { Link, createFileRoute } from '@tanstack/react-router'
import HeroAtmosphere from '#/components/HeroAtmosphere'
import PostList from '#/components/PostList'
import Reveal from '#/components/Reveal'
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
      <HeroAtmosphere>
        <h1 className="hero-title">
          <Reveal as="span" delay={0} className="reveal-item--block">
            {t('home.titleLine1')}
          </Reveal>
          <Reveal as="span" delay={90} className="reveal-item--block">
            {t('home.titleLine2')}
          </Reveal>
        </h1>
        <Reveal delay={180}>
          <p className="hero-lead m-0">
            {t('home.leadPrefix')}{' '}
            <strong>{t('home.leadTech')}</strong> {t('home.leadAnd')}{' '}
            <strong>{t('home.leadInvesting')}</strong> {t('home.leadSuffix')}
          </p>
        </Reveal>
        <Reveal delay={270}>
          <p className="hero-meta m-0">{t('home.meta')}</p>
        </Reveal>
      </HeroAtmosphere>

      <Reveal delay={360}>
        <hr className="divider" />
      </Reveal>

      <section>
        <Reveal delay={450}>
          <div className="section-header">
            <h2 className="section-label m-0">{t('home.writing')}</h2>
            <Link to="/blog" className="section-link">
              {t('home.viewAll')}
            </Link>
          </div>
        </Reveal>
        <PostList posts={recent} revealFrom={540} />
      </section>
    </main>
  )
}