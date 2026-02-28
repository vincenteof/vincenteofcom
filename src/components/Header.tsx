import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand" aria-label="Home">
          Vincenteof
        </Link>
        <nav className="topnav" aria-label="Primary">
          <a href="#selected">文章</a>
          <a href="#membership">会员</a>
        </nav>
      </div>
    </header>
  )
}
