import { useI18n } from '#/i18n/I18nProvider'
import type { SiteStats } from '#/lib/site/stats'

type FooterProps = {
  stats: SiteStats
}

function formatFooterStats(
  template: string,
  stats: SiteStats,
) {
  return template
    .replace('{count}', String(stats.postCount))
    .replace('{topics}', String(stats.topicCount))
    .replace('{year}', String(stats.since))
}

export default function Footer({ stats }: FooterProps) {
  const year = new Date().getFullYear()
  const { t } = useI18n()

  return (
    <footer className="site-footer px-4">
      <div className="page-wrap">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">&copy; {year} Vincenteof</p>
          <p className="m-0">{t('footer.topics')}</p>
        </div>
        <p className="site-footer__stats m-0">
          {formatFooterStats(t('footer.stats'), stats)}
        </p>
      </div>
    </footer>
  )
}