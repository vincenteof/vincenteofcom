import { Link, createFileRoute } from '@tanstack/react-router'

import { getAllPostSummaries } from '@/lib/posts'

export const Route = createFileRoute('/posts/')({
  loader: () => ({
    posts: getAllPostSummaries(),
  }),
  head: () => ({
    meta: [
      {
        title: '文章目录 | Vincenteof',
      },
      {
        name: 'description',
        content: '所有文章索引，按时间倒序展示，含公开内容与会员专享内容。',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: '/posts',
      },
    ],
  }),
  component: PostsPage,
})

function PostsPage() {
  const { posts } = Route.useLoaderData()

  return (
    <main className="site-shell posts-shell">
      <section className="section hero reveal-up">
        <div className="posts-back-wrap">
          <Link to="/" className="btn-outline posts-back-btn">
            返回首页
          </Link>
        </div>
        <p className="kicker">All Writings</p>
        <h1 className="hero-title">文章目录</h1>
        <p className="lede">所有公开文章的索引入口，按时间倒序展示。</p>
      </section>

      <section className="section reveal-up" style={{ animationDelay: '90ms' }}>
        <ul className="essay-list post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to="/posts/$slug" params={{ slug: post.slug }} className="post-link">
                <span className="post-title">{post.title}</span>
                <span className="post-meta">
                  {post.date} · {post.tags.join(' / ')}
                  {post.visibility === 'member' ? ' · 会员专享' : ''}
                </span>
                <span className="post-excerpt">{post.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
