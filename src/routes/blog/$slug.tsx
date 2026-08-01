import { Link, createFileRoute } from '@tanstack/react-router'
import ArticleProse from '#/components/ArticleProse'
import PostCover from '#/components/PostCover'
import { useI18n } from '#/i18n/I18nProvider'
import { getTagClassName } from '#/lib/posts/tag-tone'
import { getPostBySlugFn } from '#/lib/posts/posts.functions'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => getPostBySlugFn({ data: { slug: params.slug } }),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }

    const meta: Array<
      | { title: string }
      | { name: string; content: string }
      | { property: string; content: string }
    > = [
      { title: `${loaderData.title} — Vincenteof` },
      {
        name: 'description',
        content: loaderData.excerpt,
      },
    ]

    if (loaderData.cover) {
      meta.push(
        { property: 'og:image', content: loaderData.cover },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: loaderData.cover },
      )
    }

    return { meta }
  },
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

      <header
        className={
          post.cover
            ? 'article-header article-header--with-cover'
            : 'article-header'
        }
      >
        <h1 className="article-title">{post.title}</h1>
        {post.excerpt ? (
          <p className="article-excerpt m-0">{post.excerpt}</p>
        ) : null}
        <div className="article-meta">
          <time dateTime={post.date}>{formatDate(post.date, 'long')}</time>
          {post.tags.map((postTag) => (
            <span key={postTag} className={getTagClassName(postTag)}>
              {tag(postTag)}
            </span>
          ))}
        </div>
        {post.isFallback ? (
          <p className="article-fallback m-0">{t('blog.translationFallback')}</p>
        ) : null}
      </header>

      {post.cover ? (
        <div className="article-cover-wrap">
          <PostCover
            src={post.cover}
            alt={post.coverAlt ?? post.title}
            variant="hero"
            priority
            className="article-cover"
          />
        </div>
      ) : null}

      <ArticleProse key={`${post.slug}-${post.locale}`} html={post.html} />
    </main>
  )
}
