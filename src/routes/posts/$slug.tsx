import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { isValidElement } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

import { getMembershipStatus } from '@/lib/membership'
import {
  createPreview,
  extractPostHeadings,
  formatTagLabel,
  getPostBySlug,
  slugifyHeading,
} from '@/lib/posts'
import { ui } from '@/lib/ui'

const SUBSTACK_URL = 'https://vincenteof.substack.com'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = getPostBySlug(params.slug)

    if (!post) {
      throw notFound()
    }

    const membership = await getMembershipStatus()
    const canReadFull = post.visibility === 'public' || membership.isActive
    const visibleBody = canReadFull ? post.body : createPreview(post.body, 460)
    const headings = canReadFull ? extractPostHeadings(post.body) : []

    return {
      post,
      canReadFull,
      headings,
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

const markdownComponents: Components = {
  h2: ({ children, ...props }) => {
    const title = collectNodeText(children)

    return (
      <h2 id={slugifyHeading(title)} {...props}>
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }) => {
    const title = collectNodeText(children)

    return (
      <h3 id={slugifyHeading(title)} {...props}>
        {children}
      </h3>
    )
  },
  h4: ({ children, ...props }) => {
    const title = collectNodeText(children)

    return (
      <h4 id={slugifyHeading(title)} {...props}>
        {children}
      </h4>
    )
  },
}

function PostDetailPage() {
  const { post, canReadFull, headings, isMemberPost, previewText } = Route.useLoaderData()
  const hasReadingNav = canReadFull && headings.length > 0

  return (
    <main className="mx-auto max-w-280 px-5 pb-25 pt-11">
      <section id="post-top" className={`${ui.section} ${ui.postsHeroSection}`}>
        <div className={`mx-auto max-w-195 ${ui.reveal}`}>
          <div className="mb-7">
            <Link to="/posts" className={ui.sectionLink}>
              返回文章目录
            </Link>
          </div>
          <h1 className={`${ui.heroTitle} mb-0`}>{post.title}</h1>
          {post.subtitle ? (
            <p className="mt-4 max-w-136 text-[1.02rem] leading-[1.9] text-[color-mix(in_oklab,var(--text-soft)_88%,var(--text)_12%)]">
              {post.subtitle}
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem] tracking-[0.04em] text-[color-mix(in_oklab,var(--text-soft)_92%,var(--text)_8%)]">
            <p className="m-0">{post.date}</p>
            <span
              aria-hidden="true"
              className="h-0.75 w-0.75 rounded-full bg-[color-mix(in_oklab,var(--text-soft)_80%,transparent)]"
            />
            <p className="m-0">{post.readingMinutes} 分钟阅读</p>
            {post.tags.length > 0 ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-0.75 w-0.75 rounded-full bg-[color-mix(in_oklab,var(--text-soft)_80%,transparent)]"
                />
                <p className="m-0 text-[0.74rem] uppercase tracking-[0.12em] text-[color-mix(in_oklab,var(--text-soft)_78%,transparent)]">
                  {post.tags.map(formatTagLabel).join(' / ')}
                </p>
              </>
            ) : null}
          </div>
          {hasReadingNav ? (
            <details className="mt-8 border-y border-[color-mix(in_oklab,var(--line)_72%,transparent)] py-4 md:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:hidden">
                <span className="text-[0.76rem] uppercase tracking-[0.14em] text-(--text-muted)">
                  本文导航
                </span>
                <span className="text-[0.82rem] text-(--text-soft)">{headings.length} 节</span>
              </summary>
              <div className="mt-4 grid gap-y-2 border-t border-[color-mix(in_oklab,var(--line)_62%,transparent)] pt-4 text-[0.92rem] leading-[1.8]">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`text-(--text-soft) no-underline transition-colors duration-180 hover:text-(--accent) ${heading.level === 3 ? 'pl-3 text-[0.88rem]' : ''}`}
                  >
                    {heading.title}
                  </a>
                ))}
              </div>
            </details>
          ) : null}
        </div>

        {canReadFull ? (
          <div className={`mt-8 ${hasReadingNav ? 'md:grid md:grid-cols-[minmax(0,1fr)_168px] md:justify-center md:gap-x-8 lg:grid-cols-[minmax(0,780px)_220px] lg:gap-x-16' : 'mx-auto max-w-195'}`}>
            <div className={ui.markdownProse}>
              <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                {post.body}
              </ReactMarkdown>
            </div>
            {hasReadingNav ? (
              <aside className="relative hidden md:block">
                <div className="sticky top-24 pt-1">
                  <div className="max-h-[calc(100vh-7.5rem)] overflow-y-auto border-t border-[color-mix(in_oklab,var(--line)_72%,transparent)] pt-4 pr-2">
                    <p className="m-0 text-[0.74rem] uppercase tracking-[0.14em] text-(--text-muted)">
                      本文导航
                    </p>
                    <nav className="mt-5 grid gap-y-2.5" aria-label="文章目录">
                      {headings.map((heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className={`text-[0.9rem] leading-[1.75] text-(--text-soft) no-underline transition-colors duration-180 hover:text-(--accent) ${heading.level === 3 ? 'pl-3 text-[0.84rem] text-[color-mix(in_oklab,var(--text-soft)_84%,var(--text-muted)_16%)]' : ''}`}
                        >
                          {heading.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>
            ) : null}
          </div>
        ) : (
          <div className={`${ui.copyBlock} mx-auto mt-6 max-w-195`}>
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
            className="mx-auto mt-8 max-w-195 border-t border-[color-mix(in_oklab,var(--line)_78%,transparent)] pt-5"
            aria-label="会员文章提示"
          >
            <p className="m-0 text-[0.98rem] tracking-[0.03em] text-[color-mix(in_oklab,var(--text)_82%,var(--accent)_18%)]">
              会员文章 · 当前仅展示预览
            </p>
            <p className="mt-3 mb-0 max-w-lg text-[0.95rem] leading-[1.85] text-(--text-soft)">
              正式会员入口开放前，可以先订阅长信获取更新与后续开放通知。
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={SUBSTACK_URL}
                className={ui.buttonPrimary}
                target="_blank"
                rel="noopener noreferrer"
              >
                订阅长信
              </a>
              <Link to="/posts" className={ui.subtleButton}>
                返回文章目录
              </Link>
            </div>
          </section>
        ) : null}

        {!isMemberPost || canReadFull ? (
          <div className="mx-auto mt-9 flex max-w-195 flex-wrap items-center gap-x-5 gap-y-3 text-[0.92rem]">
            <a href="#post-top" className={ui.sectionLink}>
              回到顶部
            </a>
            <Link to="/posts" className={ui.sectionLink}>
              返回文章目录
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  )
}

function collectNodeText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (!node) {
    return ''
  }

  if (Array.isArray(node)) {
    return node.map(collectNodeText).join('')
  }

  if (isValidElement<{ children?: React.ReactNode }>(node)) {
    return collectNodeText(node.props.children)
  }

  return ''
}
