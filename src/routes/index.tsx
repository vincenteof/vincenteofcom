import { Link, createFileRoute } from '@tanstack/react-router'
import PostList from '#/components/PostList'
import { getHomePageDataFn } from '#/lib/posts/posts.functions'

export const Route = createFileRoute('/')({
  loader: () => getHomePageDataFn(),
  component: Home,
})

function Home() {
  const { recent } = Route.useLoaderData()

  return (
    <main className="site-main page-wrap px-4">
      <section>
        <h1 className="hero-title">
          Thoughts on code,
          <br />
          markets, and the space between.
        </h1>
        <p className="hero-lead">
          A personal blog on <strong>full-stack development</strong> and{' '}
          <strong>investing & trading</strong> — building reliable systems and making
          risk-aware decisions.
        </p>
        <p className="hero-meta">Full-stack dev · Investing & trading</p>
      </section>

      <hr className="divider" />

      <section>
        <div className="section-header">
          <h2 className="section-label m-0">Writing</h2>
          <Link to="/blog" className="section-link">
            View all
          </Link>
        </div>
        <PostList posts={recent} />
      </section>
    </main>
  )
}