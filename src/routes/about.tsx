import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="site-main page-wrap--narrow px-4">
      <section className="mb-12">
        <h1 className="hero-title">About</h1>
        <p className="hero-lead">
          I&apos;m Vincenteof — a builder who writes about software development
          and investing.
        </p>
      </section>

      <div className="article-prose">
        <p>
          This site is a personal blog. Most of what I publish lives under{' '}
          <Link to="/blog">Blog</Link>, where I collect notes I want to keep:
          things I&apos;m learning, frameworks I&apos;m testing, and mistakes
          worth remembering.
        </p>

        <h2>Tech</h2>
        <p>
          On the software side, I care about full-stack craft — type safety
          across boundaries, small testable modules, and shipping systems that
          stay understandable as they grow. I write about architecture,
          tooling, and the habits that make codebases easier to trust.
        </p>

        <h2>Investing</h2>
        <p>
          On the investing side, I focus on process over prediction: position
          sizing, risk limits, and the psychology of sticking to a plan when
          markets get loud. These posts are written thinking, not financial
          advice.
        </p>

        <h2>Why this site</h2>
        <p>
          Writing forces clarity. Publishing here is a way to think in public,
          connect ideas across tech and markets, and build a record I can return
          to later. If something here is useful to you, that&apos;s a bonus.
        </p>

        <p>
          <Link to="/blog" className="section-link">
            Read the blog →
          </Link>
        </p>
      </div>
    </main>
  )
}