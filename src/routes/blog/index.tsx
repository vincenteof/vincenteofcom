import { createFileRoute } from '@tanstack/react-router'
import PostList from '#/components/PostList'
import { useI18n } from '#/i18n/I18nProvider'
import { getAllPostSummariesFn } from '#/lib/posts/posts.functions'

export const Route = createFileRoute('/blog/')({
  loader: () => getAllPostSummariesFn(),
  component: BlogIndex,
})

function BlogIndex() {
  const posts = Route.useLoaderData()
  const { t } = useI18n()

  return (
    <main className="site-main page-wrap px-4">
      <section className="mb-12">
        <h1 className="hero-title">{t('blog.title')}</h1>
        <p className="hero-lead">{t('blog.lead')}</p>
      </section>

      <PostList posts={posts} />
    </main>
  )
}