import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { SITE_CONFIG } from '@/lib/site-config'

const SUBSTACK_URL = SITE_CONFIG.newsletterUrl

const NAV_ITEMS = [
  { label: '长信', href: '/#letters', sectionId: 'letters' },
  { label: '服务', href: '/#offerings', sectionId: 'offerings' },
  { label: '关于', href: '/#about', sectionId: 'about' },
] as const

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.sectionId)
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    for (const el of els) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return active
}

export default function Header() {
  const activeSection = useActiveSection()

  return (
    <header className="sticky top-0 z-20 border-b border-[color-mix(in_oklch,var(--line)_60%,transparent)] bg-[color-mix(in_oklch,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-270 items-center justify-between px-5 py-3">
        <Link
          to="/"
          style={{ fontFamily: '"Noto Serif SC", "EB Garamond", Georgia, serif' }}
          className="text-[1.2rem] leading-none font-medium tracking-[0.04em] text-(--text) no-underline transition-colors duration-200 hover:text-(--accent) focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-3"
          aria-label="首页"
        >
          Vincenteof
        </Link>

        <nav className="flex items-center gap-5 md:gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-[0.82rem] tracking-[0.03em] no-underline transition-colors duration-200 hover:text-(--text) focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-3 md:text-[0.84rem] ${activeSection === item.sectionId ? 'text-(--text)' : 'text-(--text-muted) md:text-(--text-soft)'}`}
            >
              {item.label}
            </a>
          ))}
          <span className="h-3 w-px bg-(--line)" aria-hidden="true" />
          <a
            href={SUBSTACK_URL}
            className="text-[0.82rem] font-medium text-(--accent) no-underline transition-colors duration-200 hover:text-(--accent-hover) focus-visible:outline-1 focus-visible:outline-(--accent) focus-visible:outline-offset-3 md:text-[0.88rem]"
            target="_blank"
            rel="noopener noreferrer"
          >
            订阅
          </a>
        </nav>
      </div>
    </header>
  )
}
