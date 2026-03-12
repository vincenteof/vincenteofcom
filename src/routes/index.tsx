import { Link, createFileRoute } from '@tanstack/react-router'

import { getPublicPostSummaries } from '@/lib/posts'
import { ui } from '@/lib/ui'

const themes = [
  {
    title: 'Capital',
    lines: ['资产的分配', '风险的理解', '收益的结构', '长期的纪律'],
  },
  {
    title: 'Cognition',
    lines: ['决策的形成', '偏见的识别', '情绪与判断', '系统的训练'],
  },
  {
    title: 'Sovereignty',
    lines: ['时间与收入', '技术与能力', '结构与自由', '长期选择'],
  },
]

export const Route = createFileRoute('/')({
  loader: () => ({
    selectedPosts: getPublicPostSummaries(4),
  }),
  component: HomePage,
})

function HomePage() {
  const { selectedPosts } = Route.useLoaderData()

  return (
    <main className={ui.shell}>
      <section className={`${ui.section} ${ui.heroSection} ${ui.reveal}`}>
        <p className={ui.kicker}>Personal Sovereign Publishing</p>
        <h1 className={ui.heroTitle}>构建选择权。</h1>
        <p className={ui.heroEnglish}>Investing. Self-Training. Sovereignty.</p>
        <p className={ui.lede}>
          在不确定之中，
          <br />
          为自己建立可以依靠的结构。
        </p>
        <div className="mt-8.5 flex flex-wrap gap-3.5">
          <Link to="/posts" className={ui.buttonOutline}>
            阅读文章
          </Link>
          <a href="#membership" className={ui.buttonOutline}>
            加入会员
          </a>
        </div>
      </section>

      <section className={`${ui.section} ${ui.reveal}`} style={{ animationDelay: '90ms' }}>
        <h2 className={ui.sectionTitle}>定位</h2>
        <div className={ui.copyBlock}>
          <p>这里记录的是一种长期的实践。</p>
          <p>关于投资。关于认知。关于在波动中保持稳定。</p>
          <p>更多时候，是拆解结构，校准判断，反思决策。</p>
          <p>没有标准答案。只有持续的调整与理解。</p>
        </div>
      </section>

      <section className={`${ui.section} ${ui.reveal}`} style={{ animationDelay: '160ms' }}>
        <h2 className={ui.sectionTitle}>关于我</h2>
        <div className={ui.copyBlock}>
          <p>我是一名长期的学习者，也是一名实践者。</p>
          <p>投资、技术，以及长期系统的构建，是我持续探索的方向。写作只是记录过程的一种方式。</p>
          <p>很多判断会改变。很多观点会被修正。</p>
          <p>但对长期结构的关注，一直没有改变。</p>
          <p>这个网站，是一次公开的整理。</p>
        </div>
      </section>

      <section className={`${ui.section} ${ui.reveal}`} style={{ animationDelay: '220ms' }}>
        <h2 className={ui.sectionTitle}>主题</h2>
        <div className="grid gap-6.5 max-[860px]:gap-8 min-[861px]:grid-cols-3">
          {themes.map((theme) => (
            <article
              key={theme.title}
              className="grid gap-4 border-t border-[color-mix(in_oklab,var(--line)_65%,transparent)] pt-5 first:border-t-0 first:pt-0 min-[861px]:block min-[861px]:border-t-0 min-[861px]:pt-0 max-[860px]:grid-cols-[minmax(88px,108px)_1fr]"
            >
              <h3 className="m-0 text-(--text) font-medium tracking-[0.05em]">{theme.title}</h3>
              <ul className="m-0 grid list-none gap-x-4 gap-y-2.5 p-0 max-[860px]:grid-cols-2">
                {theme.lines.map((line) => (
                  <li key={line} className="text-(--text-soft)">
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        id="selected"
        className={`${ui.section} ${ui.reveal} pb-8.5!`}
        style={{ animationDelay: '280ms' }}
      >
        <h2 className={ui.sectionTitle}>精选文章</h2>
        <p className={ui.sectionSubtitle}>Selected Essays</p>
        <ul className={ui.essayList}>
          {selectedPosts.map((post) => (
            <li key={post.slug}>
              <Link to="/posts/$slug" params={{ slug: post.slug }} aria-label={post.title}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4.5">
          <Link to="/posts" className={ui.sectionLink}>
            查看全部文章
          </Link>
        </div>
      </section>

      <section
        id="membership"
        className={`${ui.section} ${ui.reveal} relative after:absolute after:right-0 after:top-8.5 after:h-px after:w-[min(45vw,190px)] after:bg-linear-to-r after:from-transparent after:to-(--accent) max-[860px]:after:hidden`}
        style={{ animationDelay: '340ms' }}
      >
        <h2 className={ui.sectionTitle}>会员</h2>
        <div className={ui.copyBlock}>
          <p>为愿意深入的人准备。</p>
          <p>内容更系统，也更具体。</p>
          <p>包括投资框架的展开，结构设计的记录，以及持续的实验笔记。</p>
          <p>不承诺结果。只记录过程。</p>
        </div>
        <button
          type="button"
          className={`${ui.buttonOutline} relative mt-6 cursor-not-allowed gap-2.5 overflow-hidden disabled:opacity-100 after:absolute after:inset-0 after:bg-[linear-gradient(120deg,transparent_14%,rgba(255,255,255,0.12)_44%,transparent_74%)] after:content-[''] after:animate-[soonSweep_2.8s_ease-in-out_infinite]`}
          disabled
          aria-label="加入会员（即将开放）"
        >
          <span className="relative z-1">加入会员</span>
          <span className="relative z-1 border border-[color-mix(in_oklab,var(--line)_80%,#fff_20%)] px-1.75 py-0.5 text-[0.66rem] uppercase tracking-[0.08em] text-(--text-soft)">
            Coming Soon
          </span>
        </button>
      </section>

      <section
        className={`${ui.section} ${ui.reveal} pb-6 text-center`}
        style={{ animationDelay: '380ms' }}
      >
        <p className="m-0 text-(--text-soft)">未来始终不确定。结构可以被训练。</p>
      </section>
    </main>
  )
}
