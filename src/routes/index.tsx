import { Link, createFileRoute } from '@tanstack/react-router'
import { getHomePageDataFn } from '#/lib/posts/posts.functions'

export const Route = createFileRoute('/')({
  loader: () => getHomePageDataFn(),
  component: Home,
})

function formatDate(date: string) {
  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function Home() {
  const { recent, fullStackCount, tradingCount } = Route.useLoaderData()

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">Vincenteof</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          Thoughts on code, markets, and the space between.
        </h1>
        <p className="mb-8 max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
          A personal site centered on the blog. I write about{' '}
          <strong className="text-[var(--sea-ink)]">full-stack development</strong>{' '}
          and <strong className="text-[var(--sea-ink)]">投资交易</strong> — building
          reliable systems and making risk-aware decisions.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/blog"
            className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            Read the blog
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          [
            'Full-stack dev',
            `${fullStackCount} post${fullStackCount === 1 ? '' : 's'} on architecture, type safety, and shipping.`,
          ],
          [
            '投资交易',
            `${tradingCount} post${tradingCount === 1 ? '' : 's'} on risk, sizing, and trading psychology.`,
          ],
        ].map(([title, desc], index) => (
          <article
            key={title}
            className="island-shell feature-card rise-in rounded-2xl p-5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <h2 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
              {title}
            </h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {desc}
            </p>
          </article>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="island-kicker mb-2">Latest</p>
            <h2 className="m-0 text-2xl font-semibold text-[var(--sea-ink)]">
              Recent posts
            </h2>
          </div>
          <Link to="/blog" className="text-sm font-semibold no-underline">
            View all
          </Link>
        </div>
        <ul className="m-0 list-none space-y-4 p-0">
          {recent.map((post) => (
            <li
              key={post.slug}
              className="border-t border-[var(--line)] pt-4 first:border-t-0 first:pt-0"
            >
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <time
                  dateTime={post.date}
                  className="text-xs font-medium text-[var(--sea-ink-soft)]"
                >
                  {formatDate(post.date)}
                </time>
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="demo-pill">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="text-lg font-semibold no-underline hover:text-[var(--lagoon-deep)]"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}