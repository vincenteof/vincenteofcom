import { Link, useRouter, type ErrorComponentProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { useI18n } from '#/i18n/I18nProvider'

type RouteStatusProps = {
  code: string
  title: string
  lead: string
  actions: ReactNode
  detail?: ReactNode
}

/**
 * 404 / error — first-version layout (narrow, left-aligned, site type scale)
 * with light craft: mono code label, short divider, quiet links.
 */
export function RouteStatus({
  code,
  title,
  lead,
  actions,
  detail,
}: RouteStatusProps) {
  return (
    <main className="site-main page-wrap--narrow px-4">
      <div className="status-panel">
        <p className="status-code m-0">{code}</p>
        <h1 className="hero-title status-title">{title}</h1>
        <p className="hero-lead status-lead m-0">{lead}</p>
        {detail}
        <hr className="status-divider" />
        <div className="status-actions">{actions}</div>
      </div>
    </main>
  )
}

export function DefaultNotFound() {
  const { t } = useI18n()

  return (
    <RouteStatus
      code={t('notFound.code')}
      title={t('notFound.title')}
      lead={t('notFound.lead')}
      actions={
        <>
          <Link to="/" className="section-link">
            {t('notFound.home')}
          </Link>
          <Link to="/blog" className="section-link">
            {t('notFound.blog')}
          </Link>
        </>
      }
    />
  )
}

export function DefaultError({ error }: ErrorComponentProps) {
  const { t } = useI18n()
  const router = useRouter()

  const detail =
    !import.meta.env.PROD && error instanceof Error ? (
      <p className="status-detail m-0">{error.message}</p>
    ) : null

  return (
    <RouteStatus
      code={t('error.code')}
      title={t('error.title')}
      lead={t('error.lead')}
      detail={detail}
      actions={
        <>
          <button
            type="button"
            className="status-retry"
            onClick={() => {
              void router.invalidate()
            }}
          >
            {t('error.retry')}
          </button>
          <Link to="/" className="section-link">
            {t('error.home')}
          </Link>
        </>
      }
    />
  )
}
