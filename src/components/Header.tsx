import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="site-header px-4">
      <nav className="site-nav page-wrap">
        <Link to="/" className="site-logo">
          Vincenteof
        </Link>

        <div className="flex items-center gap-6">
          <div className="site-links">
            <Link
              to="/"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              About
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}