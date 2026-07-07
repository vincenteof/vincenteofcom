import { Link, createFileRoute } from '@tanstack/react-router'
import ArticleProse from '#/components/ArticleProse'
import { useI18n } from '#/i18n/I18nProvider'
import { getTagClassName } from '#/lib/posts/tag-tone'
import { getPostBySlugFn } from '#/lib/posts/posts.functions'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => getPostBySlugFn({ data: { slug: params.slug } }),
  component: BlogPost,
})

function BlogPost() {
  const post = Route.useLoaderData()
  const { t, formatDate, tag } = useI18n()

  return (
    <main className="site-main page-wrap--narrow px-4">
      <Link to="/blog" className="back-link">
        {t('blog.back')}
      </Link>

      <article>
        <header className="article-header">
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <time dateTime={post.date}>{formatDate(post.date, 'long')}</time>
            {post.tags.map((postTag) => (
              <span key={postTag} className={getTagClassName(postTag)}>
                {tag(postTag)}
              </span>
            ))}
          </div>
        </header>

        <ArticleProse key={post.slug} html={post.html} />
      </article>
    </main>
  )
}