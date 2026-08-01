import { useEffect, useLayoutEffect, useRef } from 'react'
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

function syncCopyLabels(root: HTMLElement, label: string) {
  root.querySelectorAll<HTMLButtonElement>('[data-copy-button]').forEach((button) => {
    if (button.classList.contains('is-copied') || button.classList.contains('is-failed')) {
      return
    }

    const copyLabel = getCopyLabel(button)
    if (copyLabel) {
      copyLabel.textContent = label
    }
  })
}

export default function ArticleProse({ html }: ArticleProseProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const resetTimersRef = useRef(new Map<HTMLButtonElement, number>())
  const { t } = useI18n()
  const tRef = useRef(t)

  tRef.current = t

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    syncCopyLabels(root, t('article.copy'))
  }, [html, t])

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    async function onClick(event: MouseEvent) {
      const button = (event.target as Element).closest<HTMLButtonElement>(
        '[data-copy-button]',
      )

      if (!button || !root.contains(button)) {
        return
      }

      const block = button.closest<HTMLElement>('[data-code-block]')
      const code = block?.querySelector('code')
      const label = getCopyLabel(button)

      if (!code || !label) {
        return
      }

      event.preventDefault()

      const timers = resetTimersRef.current
      const existingTimer = timers.get(button)

      if (existingTimer) {
        window.clearTimeout(existingTimer)
        timers.delete(button)
      }

      const copied = await copyText(code.textContent ?? '')

      button.classList.remove('is-copied', 'is-failed')

      if (copied) {
        label.textContent = tRef.current('article.copied')
        button.classList.add('is-copied')
      } else {
        label.textContent = tRef.current('article.copyFailed')
        button.classList.add('is-failed')
      }

      const timer = window.setTimeout(() => {
        label.textContent = tRef.current('article.copy')
        button.classList.remove('is-copied', 'is-failed')
        timers.delete(button)
      }, 1800)

      timers.set(button, timer)
    }

    root.addEventListener('click', onClick)

    return () => {
      root.removeEventListener('click', onClick)

      for (const timer of resetTimersRef.current.values()) {
        window.clearTimeout(timer)
      }

      resetTimersRef.current.clear()
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="article-prose article-prose--enter"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}