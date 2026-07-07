import { useEffect, useRef } from 'react'
import { useI18n } from '#/i18n/I18nProvider'

type ArticleProseProps = {
  html: string
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fall back to execCommand below.
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()

  const copied = document.execCommand('copy')
  document.body.removeChild(textarea)

  return copied
}

function getCopyLabel(button: HTMLButtonElement) {
  return button.querySelector<HTMLElement>('.code-block__copy-label')
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
    const resetTimers = new Map<HTMLButtonElement, number>()

    const cleanups = Array.from(copyButtons).map((button) => {
      const block = button.closest<HTMLElement>('[data-code-block]')
      const code = block?.querySelector('code')
      const label = getCopyLabel(button)

      if (!code || !label) {
        return () => {}
      }

      label.textContent = t('article.copy')

      const onClick = async () => {
        const existingTimer = resetTimers.get(button)
        if (existingTimer) {
          window.clearTimeout(existingTimer)
          resetTimers.delete(button)
        }

        const copied = await copyText(code.textContent ?? '')

        button.classList.remove('is-copied', 'is-failed')

        if (copied) {
          label.textContent = t('article.copied')
          button.classList.add('is-copied')
        } else {
          label.textContent = t('article.copyFailed')
          button.classList.add('is-failed')
        }

        const timer = window.setTimeout(() => {
          label.textContent = t('article.copy')
          button.classList.remove('is-copied', 'is-failed')
          resetTimers.delete(button)
        }, 1800)

        resetTimers.set(button, timer)
      }

      button.addEventListener('click', onClick)

      return () => {
        button.removeEventListener('click', onClick)
        const timer = resetTimers.get(button)
        if (timer) {
          window.clearTimeout(timer)
          resetTimers.delete(button)
        }
      }
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [html, t])

  return (
    <div
      ref={rootRef}
      className="article-prose article-prose--enter"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}