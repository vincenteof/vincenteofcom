import { Link, createFileRoute } from '@tanstack/react-router'

import { formatTagLabel, getAllPostSummaries } from '@/lib/posts'
import { ui } from '@/lib/ui'

export const Route = createFileRoute('/posts/')({
  loader: () => ({
    posts: getAllPostSummaries().filter((post) => post.visibility === 'public'),
  }),
  head: () => ({
    meta: [
      {
        title: '文章目录 | Vincenteof',
      },
      {
        name: 'description',
        content: '所有公开文章索引，按时间倒序展示。',
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
        <div className="mb-7">
          <Link to="/" className={ui.sectionLink}>
            返回首页
          </Link>
        </div>
        <p className={ui.kicker}>All Writings</p>
        <h1 className={ui.heroTitle}>文章目录</h1>
        <p className={ui.lede}>这里收录的是目前公开发布的全部写作与归档。</p>
        <p className="mt-5 mb-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem] tracking-[0.04em] text-[color-mix(in_oklab,var(--text-soft)_88%,var(--text)_12%)]">
          <span>{posts.length} 篇文章</span>
        </p>
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
                className="group -mx-2 block rounded-[10px] px-2 py-4 transition-[background-color,color] duration-180 hover:bg-[color-mix(in_oklab,var(--bg-soft)_38%,transparent)] focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-(--accent)"
              >
                <span className="block text-[1.04rem] leading-normal text-(--text) transition-colors duration-180 group-hover:text-(--accent)">
                  {post.title}
                </span>
                <span className="mt-1 block text-[0.81rem] tracking-[0.03em] text-(--text-soft)">
                  {post.date} · {post.readingMinutes} 分钟 · {post.tags.map(formatTagLabel).join(' / ')}
                </span>
                <span className="mt-2.5 block max-w-2xl text-[0.94rem] leading-[1.85] text-[color-mix(in_oklab,var(--text)_88%,var(--text-soft))] transition-colors duration-180 group-hover:text-[color-mix(in_oklab,var(--text)_82%,var(--text-soft)_18%)]">
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
