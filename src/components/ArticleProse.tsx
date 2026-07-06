import { useEffect, useRef } from 'react'
import { useI18n } from '#/i18n/I18nProvider'

type ArticleProseProps = {
  html: string
}

export default function ArticleProse({ html }: ArticleProseProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const { t } = useI18n()

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    const copyButtons = root.querySelectorAll<HTMLButtonElement>(
      '[data-copy-button]',
    )

    const cleanups = Array.from(copyButtons).map((button) => {
      const block = button.closest<HTMLElement>('[data-code-block]')
      const code = block?.querySelector('code')

      if (!code) {
        return () => {}
      }

      const onClick = async () => {
        const text = code.textContent ?? ''

        try {
          await navigator.clipboard.writeText(text)
          button.textContent = t('article.copied')
          button.classList.add('is-copied')

          window.setTimeout(() => {
            button.textContent = t('article.copy')
            button.classList.remove('is-copied')
          }, 1600)
        } catch {
          button.textContent = t('article.copyFailed')
        }
      }

      button.textContent = t('article.copy')
      button.addEventListener('click', onClick)

      return () => {
        button.removeEventListener('click', onClick)
      }
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [html, t])

  return (
    <div
      ref={rootRef}
      className="article-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}