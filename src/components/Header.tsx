import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand brand-cormorant" aria-label="Home">
          Vincenteof
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link
            to="/posts"
            className="topnav-link"
            activeOptions={{ exact: false }}
            activeProps={{ className: 'topnav-link is-active' }}
          >
            文章
          </Link>
          <a href="/#membership">会员</a>
        </nav>
      </div>
    </header>
  )
}
