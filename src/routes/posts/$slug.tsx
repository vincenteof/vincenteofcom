import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import { getMembershipStatus } from '@/lib/membership'
import {
  createPreview,
  getPostBySlug,
  splitBodyToParagraphs,
} from '@/lib/posts'
import { ui } from '@/lib/ui'

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
    <main className={ui.shellPosts}>
      <section className={`${ui.section} ${ui.postsHeroSection} ${ui.reveal}`}>
        <p className={ui.kicker}>{post.tags.join(' / ')}</p>
        <h1 className={`${ui.heroTitle} mb-2`}>{post.title}</h1>
        <p className={ui.sectionSubtitle}>{post.date}</p>
        <div className={`${ui.copyBlock} mt-6`}>
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {isMemberPost && !canReadFull ? (
          <section
            className="mt-6.5 border-t border-[color-mix(in_oklab,var(--line)_78%,transparent)] pt-4"
            aria-label="会员文章提示"
          >
            <p className="mb-3.5 text-(--text-soft)">
              这是一篇会员专享文章。当前仅展示预览内容。
            </p>
            <a href="/#membership" className={ui.buttonOutline}>
              加入会员
            </a>
          </section>
        ) : null}

        <div className="mt-7">
          <Link to="/posts" className={ui.buttonOutline}>
            返回文章目录
          </Link>
        </div>
      </section>
    </main>
  )
}
