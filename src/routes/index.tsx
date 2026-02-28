import { createFileRoute } from '@tanstack/react-router'

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

const essays = [
  '长期投资的心理结构',
  'AI 时代的资本分配思考',
  '心理账户与风险认知',
  '收益结构的设计记录',
]

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <main className="site-shell">
      <section className="section hero reveal-up">
        <p className="kicker">Personal Sovereign Publishing</p>
        <h1 className="hero-title">构建选择权。</h1>
        <p className="hero-english">Investing. Self-Training. Sovereignty.</p>
        <p className="lede">
          在不确定之中，
          <br />
          为自己建立可以依靠的结构。
        </p>
        <div className="hero-actions">
          <a href="#selected" className="btn-outline">
            阅读文章
          </a>
          <a href="#membership" className="btn-outline">
            加入会员
          </a>
        </div>
      </section>

      <section className="section reveal-up" style={{ animationDelay: '90ms' }}>
        <h2 className="section-title">定位</h2>
        <div className="copy-block">
          <p>这里记录的是一种长期的实践。</p>
          <p>关于投资。关于认知。关于在波动中保持稳定。</p>
          <p>更多时候，是拆解结构，校准判断，反思决策。</p>
          <p>没有标准答案。只有持续的调整与理解。</p>
        </div>
      </section>

      <section className="section reveal-up" style={{ animationDelay: '160ms' }}>
        <h2 className="section-title">关于我</h2>
        <div className="copy-block">
          <p>我是一名长期的学习者，也是一名实践者。</p>
          <p>投资、技术、结构设计，是我持续探索的方向。写作只是记录过程的一种方式。</p>
          <p>很多判断会改变。很多观点会被修正。</p>
          <p>但对长期结构的关注，一直没有改变。</p>
          <p>这个网站，是一次公开的整理。</p>
        </div>
      </section>

      <section className="section reveal-up" style={{ animationDelay: '220ms' }}>
        <h2 className="section-title">主题</h2>
        <div className="theme-grid">
          {themes.map((theme) => (
            <article key={theme.title} className="theme-block">
              <h3>{theme.title}</h3>
              <ul>
                {theme.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="selected" className="section reveal-up" style={{ animationDelay: '280ms' }}>
        <h2 className="section-title">精选文章</h2>
        <p className="section-subtitle">Selected Essays</p>
        <ul className="essay-list">
          {essays.map((essay) => (
            <li key={essay}>
              <a href="#" aria-label={essay}>
                {essay}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="membership" className="section membership reveal-up" style={{ animationDelay: '340ms' }}>
        <h2 className="section-title">会员</h2>
        <div className="copy-block">
          <p>为愿意深入的人准备。</p>
          <p>内容更系统，也更具体。</p>
          <p>包括投资框架的展开，结构设计的记录，以及持续的实验笔记。</p>
          <p>不承诺结果。只记录过程。</p>
        </div>
        <button
          type="button"
          className="btn-outline btn-coming-soon"
          disabled
          aria-label="加入会员（即将开放）"
        >
          <span>加入会员</span>
          <span className="soon-tag">Coming Soon</span>
        </button>
      </section>

      <section className="section outro reveal-up" style={{ animationDelay: '380ms' }}>
        <p>未来始终不确定。结构可以被训练。</p>
      </section>
    </main>
  )
}
