import { createFileRoute } from '@tanstack/react-router'
import PostList from '#/components/PostList'
import { getAllPostSummariesFn } from '#/lib/posts/posts.functions'

export const Route = createFileRoute('/blog/')({
  loader: () => getAllPostSummariesFn(),
  component: BlogIndex,
})

function BlogIndex() {
  const posts = Route.useLoaderData()

  return (
    <main className="site-main page-wrap px-4">
      <section className="mb-12">
        <h1 className="hero-title">Blog</h1>
        <p className="hero-lead">
          Notes on software development and investing — experiments, mental
          models, and things worth keeping.
        </p>
      </section>

      <PostList posts={posts} />
    </main>
  )
}