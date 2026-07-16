import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { I18nProvider } from '../i18n/I18nProvider'
import { getMessages } from '../i18n/translate'
import type { Locale } from '../i18n/types'
import { getShellPreferencesFn } from '../theme/shell.functions'
import { ThemeProvider } from '../theme/ThemeProvider'
import { getHtmlThemeProps } from '../theme/theme'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  loader: () => getShellPreferencesFn(),
  head: ({ loaderData }) => {
    const locale: Locale = loaderData?.locale === 'zh' ? 'zh' : 'en'

    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: getMessages(locale).meta.title,
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ],
      links: [
        {
          rel: 'stylesheet',
          href: appCss,
        },
        {
          rel: 'icon',
          href: '/favicon.ico',
          sizes: 'any',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-32x32.png',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-16x16.png',
          sizes: '16x16',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ],
    }
  },
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { locale, theme } = Route.useLoaderData()
  const { dataTheme, colorScheme } = getHtmlThemeProps(theme)

  return (
    <html
      lang={locale === 'zh' ? 'zh-CN' : 'en'}
      data-theme={dataTheme}
      style={{ colorScheme }}
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body className="[overflow-wrap:anywhere]">
        <ThemeProvider initialMode={theme}>
          <I18nProvider initialLocale={locale}>
            <Header />
            {children}
            <Footer />
          </I18nProvider>
        </ThemeProvider>
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
