import { XIcon } from '#/components/SocialLinks'
import { useI18n } from '#/i18n/I18nProvider'
import { getSocialLink } from '#/lib/site/social'

/**
 * Quiet pointer from long-form blog to short takes on X/Twitter.
 */
export default function ShortTakesLink() {
  const { t } = useI18n()
  const twitter = getSocialLink('x')

  return (
    <p className="blog-short-takes">
      <a
        href={twitter.href}
        target="_blank"
        rel="noopener noreferrer"
        className="link-draw link-draw--quiet blog-short-takes__link"
      >
        <XIcon className="blog-short-takes__icon" />
        <span>{t('blog.shortTakes')}</span>
      </a>
    </p>
  )
}
