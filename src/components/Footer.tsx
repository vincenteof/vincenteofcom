export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer px-4">
      <div className="page-wrap flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0">&copy; {year} Vincenteof</p>
        <p className="m-0">Full-stack dev · Investing & trading</p>
      </div>
    </footer>
  )
}