import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'
import { ui } from '../lib/ui'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Vincenteof | Personal Sovereign Publishing',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function NotFoundPage() {
  return (
    <main className={ui.shell}>
      <section className={`${ui.section} ${ui.heroSection} ${ui.reveal}`}>
        <p className={ui.kicker}>404</p>
        <h1 className={ui.heroTitle}>页面不存在</h1>
        <p className={`${ui.lede} max-w-lg`}>
          你访问的内容可能已被移动、删除，或者链接本身就是无效的。
        </p>
        <div className="mt-8.5 flex flex-wrap gap-3.5">
          <Link to="/" className={ui.buttonOutline}>
            返回首页
          </Link>
          <Link to="/posts" className={ui.buttonOutline}>
            查看文章
          </Link>
        </div>
      </section>
    </main>
  )
}
