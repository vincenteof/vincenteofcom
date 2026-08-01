export type SocialId = 'github' | 'x' | 'youtube' | 'douyin'

export type SocialLink = {
  id: SocialId
  /** Display / aria label by locale */
  label: { en: string; zh: string }
  href: string
}

/**
 * External profiles. Update `href` when handles change.
 * Order: tech identity first, then public platforms.
 */
export const socialLinks: readonly SocialLink[] = [
  {
    id: 'github',
    label: { en: 'GitHub', zh: 'GitHub' },
    href: 'https://github.com/vincenteof',
  },
  {
    id: 'x',
    label: { en: 'Twitter', zh: '推特' },
    href: 'https://x.com/vincenteof',
  },
  {
    id: 'youtube',
    label: { en: 'YouTube', zh: 'YouTube' },
    href: 'https://www.youtube.com/@vincenteof',
  },
  {
    id: 'douyin',
    label: { en: 'Douyin', zh: '抖音' },
    href: 'https://www.douyin.com/user/self',
  },
] as const

export function getSocialLink(id: SocialId) {
  const link = socialLinks.find((item) => item.id === id)
  if (!link) {
    throw new Error(`Unknown social id: ${id}`)
  }
  return link
}
