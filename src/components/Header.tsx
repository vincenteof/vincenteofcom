import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[color-mix(in_oklab,var(--line)_85%,transparent)] bg-[color-mix(in_oklab,var(--bg)_76%,transparent)] backdrop-blur-xs">
      <div className="mx-auto flex max-w-240 items-center justify-between px-5 py-3.5">
        <Link
          to="/"
          className='font-["Cormorant_Garamond","Iowan_Old_Style","Palatino_Linotype",serif] text-[1.3rem] leading-none font-medium not-italic tracking-[0.015em] text-[var(--text)] no-underline transition-colors duration-180 hover:text-[color:color-mix(in_oklab,var(--text)_80%,var(--accent))]'
          aria-label="Home"
        >
          Vincenteof
        </Link>
        <nav className="flex gap-5" aria-label="Primary">
          <Link
            to="/posts"
            className='relative text-[0.92rem] text-(--text-soft) no-underline transition-colors duration-180 hover:text-(--text) [&.is-active]:text-(--text) [&.is-active::after]:absolute [&.is-active::after]:right-0 [&.is-active::after]:bottom-[-6px] [&.is-active::after]:left-0 [&.is-active::after]:h-px [&.is-active::after]:bg-[color:color-mix(in_oklab,var(--accent)_75%,#fff_25%)] [&.is-active::after]:content-[""]'
            activeOptions={{ exact: false }}
            activeProps={{ className: 'is-active' }}
          >
            文章
          </Link>
          <a
            href="/#membership"
            className="text-[0.92rem] text-(--text-soft) no-underline transition-colors duration-180 hover:text-(--text)"
          >
            会员
          </a>
        </nav>
      </div>
    </header>
  )
}
