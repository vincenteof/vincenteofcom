import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import { getMembershipStatus } from '#/lib/membership'
import { createPreview, getPostBySlug, splitBodyToParagraphs } from '#/lib/posts'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = getPostBySlug(params.slug)

    if (!post) {
      throw notFound()
    }

    const membership = await getMembershipStatus()
    const canReadFull = post.visibility === 'public' || membership.isActive
    const visibleBody = canReadFull ? post.body : createPreview(post.body, 460)

    return {
      post: {
        ...post,
        paragraphs: splitBodyToParagraphs(visibleBody),
      },
      canReadFull,
      isMemberPost: post.visibility === 'member',
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }

    return {
      meta: [
        {
          title: `${loaderData.post.title} | Vincenteof`,
        },
        {
          name: 'description',
          content: createPreview(loaderData.post.body, 120),
        },
      ],
      links: [
        {
          rel: 'canonical',
          href: `/posts/${loaderData.post.slug}`,
        },
      ],
    }
  },
  component: PostDetailPage,
})

function PostDetailPage() {
  const { post, canReadFull, isMemberPost } = Route.useLoaderData()

  return (
    <main className="site-shell posts-shell">
      <section className="section hero reveal-up">
        <p className="kicker">{post.tags.join(' / ')}</p>
        <h1 className="hero-title post-detail-title">{post.title}</h1>
        <p className="section-subtitle">{post.date}</p>
        <div className="copy-block post-content">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {isMemberPost && !canReadFull ? (
          <section className="member-preview-cta" aria-label="会员文章提示">
            <p>这是一篇会员专享文章。当前仅展示预览内容。</p>
            <a href="/#membership" className="btn-outline">
              加入会员
            </a>
          </section>
        ) : null}

        <div className="post-back-wrap">
          <Link to="/posts" className="btn-outline">
            返回文章目录
          </Link>
        </div>
      </section>
    </main>
  )
}
