import { Link, createFileRoute } from '@tanstack/react-router'
import GithubIcon from '@/components/icons/Github'
import GmailIcon from '@/components/icons/Gmail'
import XIcon from '@/components/icons/X'
import YoutubeIcon from '@/components/icons/Youtube'
import type { PostSummary } from '@/lib/posts'
import { getPublicPostSummaries } from '@/lib/posts'

const SUBSTACK_URL = 'https://vincenteof.substack.com'
const SITE_URL = 'https://vincenteof.com'
const OG_IMAGE_URL = `${SITE_URL}/images/profile.jpg`
const PROFILE_PHOTO_URL = '/images/profile.jpg'

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
    actionLabel: '开始咨询',
    href: '/consult',
    external: false,
  },
  {
    eyebrow: 'Advisory',
    title: '全球投资',
    description:
      '围绕资金出海与资产配置，提供长期、纪律化的投资咨询，借助复利，为你争取更多选择权。',
    actionLabel: '开始咨询',
    href: '/consult',
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
    <main id="main">
      <HeroSection latestPost={posts[0]} />
      <LettersSection posts={posts} />
      <OfferingsSection />
      <AboutSection />
      <PageFooter />
    </main>
  )
}

/* ------------------------------------------------------------------
   Hero — full-viewport philosophical statement
   ------------------------------------------------------------------ */

function HeroSection({ latestPost }: { latestPost?: PostSummary }) {
  return (
    <section
      className="hero-noise relative flex min-h-dvh items-center px-5"
      style={{
        background:
          'linear-gradient(180deg, var(--bg) 0%, oklch(0.135 0.012 186) 55%, var(--bg) 100%)',
      }}
    >
      <div className="relative z-2 mx-auto w-full max-w-270 pb-20 pt-24 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-16">
        <div>
        {/* Kicker — the three pillars */}
        <p
          className="m-0 text-[0.72rem] tracking-[0.22em] uppercase text-(--accent) animate-[revealUp_680ms_ease-out_both]"
          style={{ fontFamily: '"EB Garamond", Georgia, serif' }}
        >
          Investing&ensp;·&ensp;Self-Training&ensp;·&ensp;Sovereignty
        </p>

        {/* Main heading — dramatic scale, left-aligned */}
        <h1
          className="mt-8 mb-0 max-w-[14ch] text-[clamp(3rem,10vw,5.6rem)] leading-[1.1] font-semibold tracking-[0.02em] animate-[revealUp_680ms_ease-out_both]"
          style={{ animationDelay: '120ms' }}
        >
          构建你的选择权。
        </h1>

        {/* Body — narrower measure, editorial feel */}
        <p
          className="mt-10 mb-0 max-w-[36ch] text-[clamp(1rem,2.4vw,1.12rem)] leading-[2] text-(--text-soft)"
        >
          每周两封深度长信，用我从波动和混乱中获得的经验，帮你拿回人生选择权。
        </p>

        {/* CTA */}
        <div className="mt-10 animate-[revealUp_680ms_ease-out_both]" style={{ animationDelay: '260ms' }}>
          <a
            href={SUBSTACK_URL}
            className="group inline-flex min-h-11 items-center gap-2 rounded-xs bg-(--accent) px-6 py-3 text-[0.95rem] font-medium text-[oklch(0.97_0.005_186)] no-underline transition-colors duration-200 hover:bg-(--accent-hover) active:translate-y-px focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            免费订阅
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 12L12 4M6 4H12V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        {/* Mobile: low-commitment read link */}
        {latestPost ? (
          <div className="mt-5 md:hidden">
            <Link
              to="/posts/$slug"
              params={{ slug: latestPost.slug }}
              className="text-[0.88rem] text-(--text-soft) no-underline transition-colors duration-200 hover:text-(--text) focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-2"
            >
              或者先读一封 →
            </Link>
          </div>
        ) : null}
        </div>

        {/* Latest letter — desktop only */}
        {latestPost ? (
          <Link
            to="/posts/$slug"
            params={{ slug: latestPost.slug }}
            className="group hidden md:flex flex-col gap-2.5 max-w-60 border-l border-(--line) pl-6 no-underline transition-[border-color] duration-200 hover:border-(--accent) focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-3 animate-[revealUp_680ms_ease-out_both]"
            style={{ animationDelay: '380ms' }}
          >
            <span className="text-[0.7rem] tracking-[0.14em] uppercase text-(--accent)" style={{ fontFamily: '"EB Garamond", Georgia, serif' }}>
              最新长信
            </span>
            <span
              className="text-[1.02rem] leading-[1.55] font-medium text-(--text) transition-colors duration-200 group-hover:text-(--accent)"
              style={{ fontFamily: '"Noto Serif SC", "EB Garamond", Georgia, serif' }}
            >
              {latestPost.title}
            </span>
            {latestPost.excerpt ? (
              <span className="text-[0.84rem] leading-[1.7] text-(--text-soft) line-clamp-2">
                {latestPost.excerpt}
              </span>
            ) : null}
            <span className="text-[0.78rem] text-(--text-muted)">
              {latestPost.date}
            </span>
          </Link>
        ) : null}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 z-2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center text-(--text-muted)">
          <svg className="h-4 w-4 animate-[gentleFloat_2.4s_ease-in-out_infinite]" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
        <h2 className="m-0 text-[clamp(1.3rem,2.6vw,1.65rem)] font-medium tracking-[0.03em] text-(--text-soft)">
          我的服务
        </h2>
        <p className="mt-3 mb-0 max-w-135 text-[0.92rem] leading-[1.9] text-(--text-muted)">
          三条路径，帮你拿回时间与资源的主动权。
        </p>

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
                className="mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-xs border border-(--accent) px-4 py-2 text-[0.85rem] font-medium text-(--accent) no-underline whitespace-nowrap transition-[color,background-color,border-color] duration-200 hover:bg-(--accent) hover:text-[oklch(0.97_0.005_186)] active:translate-y-px focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-2 md:mt-0"
                target={offering.external ? '_blank' : undefined}
                rel={offering.external ? 'noopener noreferrer' : undefined}
              >
                {offering.actionLabel}
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
    <section id="letters" className="px-5 py-28 bg-(--bg-soft)">
      <div className="mx-auto max-w-270">
        <h2 className="m-0 text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold tracking-[0.02em]">
          深度思考
        </h2>
        <p className="mt-4 mb-0 max-w-135 text-[1rem] leading-[1.9] text-(--text-soft)">
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
        <h2 className="m-0 text-[clamp(1.2rem,2.4vw,1.5rem)] leading-[1.24] font-normal tracking-[0.04em] text-(--text-soft)">
          关于我
        </h2>
        <p className="mt-3 mb-0 max-w-135 text-[0.92rem] leading-[1.9] text-(--text-muted)">
          一个从默认路径走出来的长期主义者。
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-[280px_1fr] md:gap-12">
          <aside>
            <div
              className="relative aspect-[3/4] w-full rounded-2xl border border-(--line) bg-[color-mix(in_oklch,var(--bg-soft)_92%,transparent)] bg-cover bg-center"
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
            <div
              className="max-w-[42ch] space-y-2 text-[clamp(1.12rem,1.6vw,1.24rem)] leading-[1.86] tracking-[0.01em] text-[color:color-mix(in_oklch,var(--text)_94%,#fff_6%)]"
              style={{
                fontFamily: '"Noto Serif SC", "EB Garamond", Georgia, serif',
              }}
            >
              <p className="m-0">嘿，我是 Vincenteof。</p>
              <p className="m-0">一个专注于投资和自我提升的长期主义者。</p>
            </div>

            <div className="mt-7 max-w-[64ch] space-y-6 text-[1.02rem] leading-[2.02] text-[color:color-mix(in_oklch,var(--text)_86%,var(--text-soft)_14%)]">
              <p className="m-0">
                我曾经走在默认路径上，直到发现既有系统的目标并不是让个体获得自由。于是我开始研究投资、提升认知，学习一切能带来个人主权的知识。
              </p>
              <p className="m-0">
                这些长信记录了我从波动和混乱中验证过的框架与思考。如果你也觉得路有点窄，这里或许有你想要的东西。
              </p>
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
    <footer
      className="border-t border-(--line) px-5 py-20"
      style={{
        background:
          'linear-gradient(180deg, var(--bg) 0%, oklch(0.135 0.012 186) 100%)',
      }}
    >
      <div className="mx-auto max-w-270 text-center">
        <p
          className="m-0 text-[0.74rem] tracking-[0.18em] uppercase text-(--accent)"
          style={{ fontFamily: '"EB Garamond", Georgia, serif' }}
        >
          Investing · Self-Training · Sovereignty
        </p>
        <p className="mt-4 m-0 text-[1.1rem] leading-[1.9] text-(--text-soft)">
          每周两封长信，免费订阅。
        </p>
        <a
          href={SUBSTACK_URL}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xs bg-(--accent) px-6 py-3 text-[0.92rem] font-medium text-[oklch(0.97_0.005_186)] no-underline transition-colors duration-200 hover:bg-(--accent-hover) active:translate-y-px focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          前往订阅
        </a>

        <div className="mt-10 flex justify-center gap-x-5">
          {PROFILE_LINKS.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex h-11 w-11 items-center justify-center text-(--text-muted) no-underline transition-[color,opacity] duration-200 hover:text-(--accent) focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent)"
                aria-label={item.label}
                title={item.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            )
          })}
        </div>

        <p className="mt-8 m-0 text-[0.78rem] text-(--text-muted)">
          © 2026 Vincenteof
        </p>
      </div>
    </footer>
  )
}
