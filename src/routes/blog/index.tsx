import { Link, createFileRoute } from '@tanstack/react-router'
import { getAllPostSummaries } from '#/lib/posts/load'

export const Route = createFileRoute('/blog/')({
  loader: () => getAllPostSummaries(),
  component: BlogIndex,
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

function BlogIndex() {
  const posts = Route.useLoaderData()

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
        <p className="island-kicker mb-3">Writing</p>
        <h1 className="display-title mb-4 text-4xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          Blog
        </h1>
        <p className="m-0 max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)]">
          Notes on full-stack development and 投资交易 — experiments, mental
          models, and things I want to remember.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className="island-shell rise-in rounded-2xl p-6"
            style={{ animationDelay: `${index * 70 + 60}ms` }}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
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
            <h2 className="mb-2 text-2xl font-semibold text-[var(--sea-ink)]">
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="no-underline hover:text-[var(--lagoon-deep)]"
              >
                {post.title}
              </Link>
            </h2>
            <p className="m-0 mb-4 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {post.excerpt}
            </p>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="text-sm font-semibold no-underline"
            >
              Read post →
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}