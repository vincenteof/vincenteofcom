import { Link, createFileRoute } from '@tanstack/react-router'
import GithubIcon from '@/components/icons/Github'
import GmailIcon from '@/components/icons/Gmail'
import XIcon from '@/components/icons/X'
import YoutubeIcon from '@/components/icons/Youtube'
import type { PostSummary } from '@/lib/posts'
import { getPublicPostSummaries } from '@/lib/posts'

const SUBSTACK_URL = 'https://vincenteof.substack.com'
const PROFILE_PHOTO_URL = '/images/profile.PNG'

type ProfileLink = {
  label: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const PROFILE_LINKS = [
  { label: 'X', href: 'https://x.com/your-handle', icon: XIcon },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@your-handle',
    icon: YoutubeIcon,
  },
  { label: 'GitHub', href: 'https://github.com/your-handle', icon: GithubIcon },
  { label: 'Email', href: 'mailto:your@email.com', icon: GmailIcon },
] satisfies ReadonlyArray<ProfileLink>

const OFFERINGS = [
  {
    eyebrow: 'Newsletter',
    title: '心智模型',
    description:
      '每周两封深度长信：一封讲认知框架，一封讲行动方法，帮助你把想法变成可执行的训练系统。',
    actionLabel: '免费订阅',
    href: SUBSTACK_URL,
    external: true,
  },
  {
    eyebrow: 'Consulting',
    title: '软件开发',
    description:
      '面向独立创作者与小团队的软件开发咨询与系统搭建，聚焦真实业务场景，减少重复劳动并提高交付效率。',
    actionLabel: '了解服务方式',
    href: '#about',
    external: false,
  },
  {
    eyebrow: 'Advisory',
    title: '出海投资',
    description:
      '围绕全球市场与资产配置，提供长期、纪律化的投资咨询，帮助你在不确定环境中建立更稳的决策框架。',
    actionLabel: '了解咨询方向',
    href: '#about',
    external: false,
  },
] as const

export const Route = createFileRoute('/')({
  loader: () => ({
    posts: getPublicPostSummaries(5),
  }),
  head: () => ({
    meta: [
      {
        title: '构建你的选择权 | Investing. Self-Training. Sovereignty.',
      },
      {
        name: 'description',
        content:
          '通过自我投资与系统训练，获得人生主权。每周深度 Letters，助你构建真正属于自己的自由。',
      },
    ],
  }),
  component: LandingPage,
})

function LandingPage() {
  const { posts } = Route.useLoaderData()

  return (
    <main>
      <HeroSection />
      <OfferingsSection />
      <LettersSection posts={posts} />
      <AboutSection />
      <PageFooter />
    </main>
  )
}

/* ------------------------------------------------------------------
   Hero — full-viewport philosophical statement
   ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section
      className="flex min-h-dvh items-center justify-center px-5"
      style={{
        background:
          'linear-gradient(180deg, var(--bg) 0%, oklch(0.135 0.012 186) 55%, var(--bg) 100%)',
      }}
    >
      <div className="mx-auto w-full max-w-180 pb-12 pt-16 text-center">
        <h1 className="m-0 text-[clamp(2.5rem,8vw,4.2rem)] leading-tight font-medium tracking-[0.04em] animate-[revealUp_680ms_ease-out_both]">
          构建你的选择权。
        </h1>

        <div
          className="mx-auto mt-5 h-px w-12 bg-(--accent) animate-[revealUp_680ms_ease-out_both]"
          style={{ animationDelay: '100ms' }}
          aria-hidden="true"
        />

        <p
          className="mt-5 mb-0 text-[clamp(1rem,2.4vw,1.22rem)] tracking-[0.14em] text-(--text-soft) animate-[revealUp_680ms_ease-out_both]"
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            animationDelay: '160ms',
          }}
        >
          Investing. Self-Training. Sovereignty.
        </p>

        <p
          className="mx-auto mt-10 mb-0 max-w-120 text-[clamp(0.95rem,2.2vw,1.05rem)] leading-[1.9] text-(--text-soft) animate-[revealUp_680ms_ease-out_both]"
          style={{ animationDelay: '280ms' }}
        >
          每周一封深度长信，分享经实践验证的框架与方法，帮助你稳步拿回人生选择权。
        </p>

        <div
          className="mt-10 animate-[revealUp_680ms_ease-out_both]"
          style={{ animationDelay: '380ms' }}
        >
          <a
            href={SUBSTACK_URL}
            className="inline-flex min-h-11 items-center rounded-xs bg-(--accent) px-6 py-3 text-[0.95rem] font-medium text-[oklch(0.97_0.005_186)] no-underline transition-colors duration-200 hover:bg-(--accent-hover) active:translate-y-px focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            免费订阅
          </a>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   Offerings — business lines
   ------------------------------------------------------------------ */

function OfferingsSection() {
  return (
    <section id="offerings" className="px-5 pt-16 pb-24">
      <div className="mx-auto max-w-270">
        <h2 className="m-0 text-[clamp(1.5rem,3vw,1.95rem)] font-medium tracking-[0.03em]">
          Offerings · 我的服务
        </h2>

        <div className="mt-12 border-t border-b border-(--line) divide-y divide-(--line)">
          {OFFERINGS.map((offering, i) => (
            <article
              key={offering.title}
              className="py-8 md:grid md:grid-cols-[7rem_1fr_auto] md:items-start md:gap-x-10 md:py-10"
            >
              {/* Index + eyebrow */}
              <div className="mb-4 flex items-center gap-2.5 md:mb-0 md:flex-col md:items-start md:gap-1.5 md:pt-0.5">
                <span
                  className="text-[0.72rem] tabular-nums text-(--text-muted)"
                  style={{ fontFamily: '"EB Garamond", Georgia, serif' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-[0.72rem] tracking-[0.13em] uppercase text-(--accent)"
                  style={{ fontFamily: '"EB Garamond", Georgia, serif' }}
                >
                  {offering.eyebrow}
                </span>
              </div>

              {/* Title + description */}
              <div>
                <h3 className="m-0 text-[1.18rem] leading-snug font-medium text-(--text)">
                  {offering.title}
                </h3>
                <p className="mt-3 mb-0 text-[0.95rem] leading-[1.9] text-(--text-soft)">
                  {offering.description}
                </p>
              </div>

              {/* CTA */}
              <a
                href={offering.href}
                className="mt-5 inline-block text-[0.9rem] text-(--text-soft) no-underline whitespace-nowrap transition-colors duration-200 hover:text-(--accent) active:translate-y-px focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-2 md:mt-0 md:pt-0.5"
                target={offering.external ? '_blank' : undefined}
                rel={offering.external ? 'noopener noreferrer' : undefined}
              >
                {offering.actionLabel} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   Letters — editorial article list
   ------------------------------------------------------------------ */

function LettersSection({ posts }: { posts: PostSummary[] }) {
  return (
    <section id="letters" className="px-5 py-28">
      <div className="mx-auto max-w-270">
        <h2 className="m-0 text-[clamp(1.5rem,3vw,1.95rem)] font-medium tracking-[0.03em]">
          Letters · 我的深度思考
        </h2>
        <p className="mt-3 mb-0 max-w-135 text-[0.98rem] leading-[1.9] text-(--text-soft)">
          每周更新，帮你建立清晰有力的认知框架与行动系统。
        </p>

        <ul className="mt-12 m-0 list-none p-0 border-b border-(--line)">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border-t border-(--line) py-6"
            >
              <Link
                to="/posts/$slug"
                params={{ slug: post.slug }}
                className="group block rounded-xs no-underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-4"
              >
                <span
                  className="block text-[1.08rem] leading-normal font-medium text-(--text) transition-colors duration-200 group-hover:text-(--accent)"
                  style={{
                    fontFamily:
                      '"Noto Serif SC", "EB Garamond", Georgia, serif',
                  }}
                >
                  {post.title}
                </span>
                {post.excerpt ? (
                  <span className="mt-2 block text-[0.92rem] leading-[1.75] text-(--text-soft) line-clamp-2">
                    {post.excerpt}
                  </span>
                ) : null}
                <span className="mt-2 block text-[0.8rem] tracking-[0.04em] text-(--text-muted)">
                  {post.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            to="/posts"
            className="text-[0.92rem] text-(--text-soft) no-underline transition-colors duration-200 hover:text-(--text) focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-2"
          >
            查看全部文章 →
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   About — personal narrative
   ------------------------------------------------------------------ */

function AboutSection() {
  return (
    <section id="about" className="px-5 py-24">
      <div className="mx-auto max-w-270">
        <h2 className="m-0 text-[clamp(1.5rem,3vw,1.95rem)] font-medium tracking-[0.03em]">
          About · 关于我
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-[280px_1fr] md:gap-12">
          <aside>
            <div
              className="relative h-85 w-full rounded-2xl border border-(--line) bg-[color-mix(in_oklch,var(--bg-soft)_92%,transparent)] bg-cover bg-center"
              style={{ backgroundImage: `url(${PROFILE_PHOTO_URL})` }}
              role="img"
              aria-label="Vincenteof 个人照片"
            >
              <span className="absolute bottom-4 left-4 rounded-xs bg-[color-mix(in_oklch,var(--bg)_70%,transparent)] px-2.5 py-1 text-[0.74rem] tracking-[0.08em] text-(--text-soft)">
                Vincenteof
              </span>
            </div>
          </aside>

          <div>
            <p
              className="m-0 text-[1.15rem] leading-[1.8] text-(--text)"
              style={{ fontFamily: '"Noto Serif SC", "EB Garamond", Georgia, serif' }}
            >
              嘿，我是 Vincenteof。一个长期主义者，也是一名持续训练的实践者。
            </p>

            <div className="mt-6 space-y-5 text-[1rem] leading-[1.95] text-[color-mix(in_oklch,var(--text)_88%,var(--text-soft))]">
              <p className="m-0">
                我曾经走在传统路径上，却慢慢意识到：如果不主动构建能力、资产与认知结构，人生的选择会越来越少。于是我开始把注意力转向三个长期变量：Investing、Self-Training、Sovereignty。
              </p>
              <p className="m-0">
                这些年我把踩过的坑、验证过的框架、以及在 AI
                时代依然有效的思考，沉淀成一封封长信。它不是成功学模板，更像一份不断迭代的训练记录。
              </p>
              <p className="m-0">
                如果你也在寻找更稳固的人生结构，欢迎一起长期练习，逐步拿回属于自己的选择权。
              </p>
            </div>

            <div className="mt-8 border-t border-(--line) pt-6">
              <p className="m-0 text-[0.84rem] tracking-[0.08em] text-(--text-muted)">
                也可以在这些平台找到我
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {PROFILE_LINKS.map((item) => {
                  const Icon = item.icon

                  return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="inline-flex h-11 w-11 items-center justify-center text-(--text-soft) no-underline opacity-85 transition-[color,opacity,transform] duration-200 hover:-translate-y-px hover:opacity-100 hover:text-(--accent) active:translate-y-px focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) md:h-9 md:w-9"
                    aria-label={item.label}
                    title={item.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{item.label}</span>
                  </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   Footer
   ------------------------------------------------------------------ */

function PageFooter() {
  return (
    <footer className="border-t border-(--line) px-5 py-10">
      <div className="mx-auto max-w-270 text-center">
        <p className="m-0 text-[0.85rem] text-(--text-muted)">
          © 2026 Vincenteof. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
