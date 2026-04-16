import { Link } from '@tanstack/react-router'
import { ui } from '@/lib/ui'

const SUBSTACK_URL = 'https://vincenteof.substack.com'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[color-mix(in_oklch,var(--line)_60%,transparent)] bg-[color-mix(in_oklch,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-270 items-center justify-between px-5 py-3">
        <Link
          to="/"
          style={{ fontFamily: 'Allura, "EB Garamond", Georgia, serif' }}
          className="-translate-y-px text-[1.5rem] leading-none text-(--text) no-underline transition-colors duration-200 hover:text-(--accent) focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-3"
          aria-label="首页"
        >
          Vincenteof
        </Link>
        <a
          href={SUBSTACK_URL}
          className={`${ui.sectionLink} inline-flex items-center border-transparent pb-px text-[0.88rem] font-medium text-(--text)! hover:text-[color-mix(in_oklab,var(--text)_84%,#fff_16%)]! hover:border-[color-mix(in_oklab,var(--accent)_78%,transparent)]`}
          target="_blank"
          rel="noopener noreferrer"
        >
          阅读每周长信
        </a>
      </div>
    </header>
  )
}
