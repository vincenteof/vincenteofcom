import { Link, createFileRoute } from '@tanstack/react-router'

import { getAllPostSummaries } from '@/lib/posts'
import { ui } from '@/lib/ui'

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
    <main className={ui.shellPosts}>
      <section className={`${ui.section} ${ui.postsHeroSection} ${ui.reveal}`}>
        <div className="mb-6">
          <Link to="/" className={ui.subtleButton}>
            返回首页
          </Link>
        </div>
        <p className={ui.kicker}>All Writings</p>
        <h1 className={ui.heroTitle}>文章目录</h1>
        <p className={ui.lede}>所有公开文章的索引入口，按时间倒序展示。</p>
      </section>

      <section
        className={`${ui.section} ${ui.reveal}`}
        style={{ animationDelay: '90ms' }}
      >
        <ul className={`${ui.essayList} [&_li]:py-0`}>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to="/posts/$slug"
                params={{ slug: post.slug }}
                className="block py-4"
              >
                <span className="block text-(--text)">{post.title}</span>
                <span className="mt-0.5 block text-[0.83rem] text-(--text-soft)">
                  {post.date} · {post.tags.join(' / ')}
                  {post.visibility === 'member' ? ' · 会员专享' : ''}
                </span>
                <span className="mt-2 block text-[0.95rem] text-[color-mix(in_oklab,var(--text)_90%,var(--text-soft))]">
                  {post.excerpt}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
