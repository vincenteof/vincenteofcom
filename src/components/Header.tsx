import { Link } from '@tanstack/react-router'

const SUBSTACK_URL = 'https://vincenteof.substack.com'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[color-mix(in_oklch,var(--line)_60%,transparent)] bg-[color-mix(in_oklch,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-270 items-center justify-between px-5 py-3">
        <Link
          to="/"
          style={{ fontFamily: '"Noto Serif SC", "EB Garamond", Georgia, serif' }}
          className="text-[1.15rem] leading-none font-medium tracking-[0.02em] text-(--text) no-underline transition-colors duration-200 hover:text-(--accent) focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-3"
          aria-label="首页"
        >
          Vincenteof
        </Link>
        <a
          href={SUBSTACK_URL}
          className="inline-flex min-h-11 items-center text-[0.88rem] text-(--text-soft) no-underline transition-colors duration-200 hover:text-(--text) focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          阅读长信
        </a>
      </div>
    </header>
  )
}
