import { Link, createFileRoute } from '@tanstack/react-router'
import { useI18n } from '#/i18n/I18nProvider'
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
              <span key={postTag} className="tag">
                {tag(postTag)}
              </span>
            ))}
          </div>
        </header>

        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </main>
  )
}