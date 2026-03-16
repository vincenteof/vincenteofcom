import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { getMembershipStatus } from '@/lib/membership'
import { createPreview, formatTagLabel, getPostBySlug } from '@/lib/posts'
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
      post,
      canReadFull,
      isMemberPost: post.visibility === 'member',
      previewText: canReadFull ? null : visibleBody,
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
  const { post, canReadFull, isMemberPost, previewText } = Route.useLoaderData()

  return (
    <main className={ui.shellPosts}>
      <section className={`${ui.section} ${ui.postsHeroSection} ${ui.reveal}`}>
        <h1 className={`${ui.heroTitle} mb-0`}>{post.title}</h1>
        {post.subtitle ? (
          <p className="mt-4 max-w-[34rem] text-[1.02rem] leading-[1.9] text-[color:color-mix(in_oklab,var(--text-soft)_88%,var(--text)_12%)]">
            {post.subtitle}
          </p>
        ) : null}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem] tracking-[0.04em] text-[color:color-mix(in_oklab,var(--text-soft)_92%,var(--text)_8%)]">
          <p className="m-0">{post.date}</p>
          {post.tags.length > 0 ? (
            <>
              <span
                aria-hidden="true"
                className="h-[3px] w-[3px] rounded-full bg-[color:color-mix(in_oklab,var(--text-soft)_80%,transparent)]"
              />
              <p className="m-0 text-[0.74rem] uppercase tracking-[0.12em] text-[color:color-mix(in_oklab,var(--text-soft)_78%,transparent)]">
                {post.tags.map(formatTagLabel).join(' / ')}
              </p>
            </>
          ) : null}
        </div>
        {canReadFull ? (
          <div className={`${ui.markdownProse} mt-8`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>
        ) : (
          <div className={`${ui.copyBlock} mt-6`}>
            {previewText
              ?.split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph) => (
              <p key={paragraph}>{paragraph.trim()}</p>
            ))}
          </div>
        )}

        {isMemberPost && !canReadFull ? (
          <section
            className="mt-8 border-t border-[color-mix(in_oklab,var(--line)_78%,transparent)] pt-5"
            aria-label="会员文章提示"
          >
            <p className="m-0 text-[0.98rem] tracking-[0.03em] text-[color-mix(in_oklab,var(--text)_82%,var(--accent)_18%)]">
              会员文章 · 当前仅展示预览
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/#membership" className={ui.buttonOutline}>
                加入会员
              </a>
              <Link to="/posts" className={ui.subtleButton}>
                返回文章目录
              </Link>
            </div>
          </section>
        ) : null}

        {!isMemberPost || canReadFull ? (
          <div className="mt-7">
            <Link to="/posts" className={ui.buttonOutline}>
              返回文章目录
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  )
}
