import { Link } from '@tanstack/react-router'
import { useI18n } from '#/i18n/I18nProvider'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const { t } = useI18n()

  return (
    <header className="site-header px-4">
      <nav className="site-nav page-wrap">
        <Link to="/" className="site-logo">
          Vincenteof
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="site-links">
            <Link
              to="/"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/blog"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {t('nav.blog')}
            </Link>
            <Link
              to="/about"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {t('nav.about')}
            </Link>
          </div>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}