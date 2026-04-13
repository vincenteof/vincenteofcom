import { Link, createFileRoute } from '@tanstack/react-router'
import GithubIcon from '@/components/icons/Github'
import GmailIcon from '@/components/icons/Gmail'
import XIcon from '@/components/icons/X'
import YoutubeIcon from '@/components/icons/Youtube'
import type { PostSummary } from '@/lib/posts'
import { getPublicPostSummaries } from '@/lib/posts'

const SUBSTACK_URL = 'https://vincenteof.substack.com'
const SITE_URL = 'https://vincenteof.com'
const OG_IMAGE_URL = `${SITE_URL}/images/profile.JPG`
const PROFILE_PHOTO_URL = '/images/profile.JPG'

type ProfileLink = {
  label: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const PROFILE_LINKS = [
  { label: 'X', href: 'https://x.com/vincenteof', icon: XIcon },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Vincenteof',
    icon: YoutubeIcon,
  },
  { label: 'GitHub', href: 'https://github.com/vincenteof', icon: GithubIcon },
  {
    label: 'Email',
    href: 'mailto:vincenteofchen@outlook.com',
    icon: GmailIcon,
  },
] satisfies ReadonlyArray<ProfileLink>

const OFFERINGS = [
  {
    eyebrow: 'Newsletter',
    title: '心智模型',
    description:
      '每周两封深度长信，一封讲认知框架，一封讲行动方法，我走过的路也许可以成为你的重要参考。',
    actionLabel: '免费订阅',
    href: SUBSTACK_URL,
    external: true,
  },
  {
    eyebrow: 'Consulting',
    title: '软件开发',
    description:
      '面向独立创作者的软件开发咨询与系统搭建，减少重复劳动并提高交付效率，代码是个人的最佳杠杆。',
    actionLabel: '了解服务方式',
    href: '#about',
    external: false,
  },
  {
    eyebrow: 'Advisory',
    title: '全球投资',
    description:
      '围绕资金出海与资产配置，提供长期、纪律化的投资咨询，借助复利，为你争取更多选择权。',
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
        title: 'Vincenteof | 投资、自我训练与人生选择权',
      },
      {
        name: 'description',
        content:
          '关于投资、自我训练与人生选择权的中文长信。Vincenteof 分享长期主义、软件开发、全球资产配置与个人主权实践。',
      },
      {
        property: 'og:title',
        content: 'Vincenteof | 投资、自我训练与人生选择权',
      },
      {
        property: 'og:description',
        content:
          '关于投资、自我训练与人生选择权的中文长信。Vincenteof 分享长期主义、软件开发、全球资产配置与个人主权实践。',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: SITE_URL,
      },
      {
        property: 'og:site_name',
        content: 'Vincenteof',
      },
      {
        property: 'og:image',
        content: OG_IMAGE_URL,
      },
      {
        property: 'og:image:alt',
        content: 'Vincenteof 个人网站首页预览图',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Vincenteof | 投资、自我训练与人生选择权',
      },
      {
        name: 'twitter:description',
        content:
          '关于投资、自我训练与人生选择权的中文长信。Vincenteof 分享长期主义、软件开发、全球资产配置与个人主权实践。',
      },
      {
        name: 'twitter:image',
        content: OG_IMAGE_URL,
      },
      {
        name: 'twitter:creator',
        content: '@vincenteof',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: SITE_URL,
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
          每周两封深度长信，用我从波动和混乱中获得的经验，帮你拿回人生选择权。
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
          每周更新，提供默认路径之外的新视角与可执行方案。
        </p>

        <ul className="mt-12 m-0 list-none p-0 border-b border-(--line)">
          {posts.map((post) => (
            <li key={post.slug} className="border-t border-(--line) py-6">
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
              style={{
                fontFamily: '"Noto Serif SC", "EB Garamond", Georgia, serif',
              }}
            >
              嘿，我是 Vincenteof。一个长期主义者，专注于投资和自我提升。
            </p>

            <div className="mt-6 space-y-5 text-[1rem] leading-[1.95] text-[color-mix(in_oklch,var(--text)_88%,var(--text-soft))]">
              <p className="m-0">
                我曾经走在默认路径上，却慢慢发现自己在被系统推着走，人生的选择变得越来越少。
              </p>
              <p className="m-0">
                我逐渐意识到，既有系统的目标并不是让个体获得自由。你需要找到属于自己的游戏。于是我开始研究投资、提升认知，并学习一切能带来个人主权的知识。
              </p>
              <p className="m-0">
                我把失败的经验、验证过的框架、以及在 AI
                时代依然有效的思考，沉淀成了一封封长信。
              </p>
              <p className="m-0">
                大多数人活在被分配的路径上，少数人开始自己设计游戏。
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
