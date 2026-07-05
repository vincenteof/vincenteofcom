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
    <main className="page-wrap px-4 pb-8 pt-14">
      <article className="island-shell rise-in rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
        <Link
          to="/blog"
          className="mb-6 inline-flex text-sm font-semibold no-underline"
        >
          ← Back to blog
        </Link>

        <header className="mb-8 border-b border-[var(--line)] pb-6">
          <p className="island-kicker mb-3">Post</p>
          <h1 className="display-title mb-4 text-4xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <time
              dateTime={post.date}
              className="text-sm font-medium text-[var(--sea-ink-soft)]"
            >
              {formatDate(post.date)}
            </time>
            {post.tags.map((tag) => (
              <span key={tag} className="demo-pill">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className="prose prose-neutral max-w-none text-[var(--sea-ink)] prose-headings:font-semibold prose-headings:text-[var(--sea-ink)] prose-p:text-[var(--sea-ink-soft)] prose-strong:text-[var(--sea-ink)] prose-a:text-[var(--lagoon-deep)]"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </main>
  )
}