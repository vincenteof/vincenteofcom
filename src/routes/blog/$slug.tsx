import { Link, createFileRoute } from '@tanstack/react-router'
import { getPostBySlugFn } from '#/lib/posts/posts.functions'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => getPostBySlugFn({ data: { slug: params.slug } }),
  component: BlogPost,
})

function formatDate(date: string) {
  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function BlogPost() {
  const post = Route.useLoaderData()

  return (
    <main className="site-main page-wrap--narrow px-4">
      <Link to="/blog" className="back-link">
        ← Blog
      </Link>

      <article>
        <header className="article-header">
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
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