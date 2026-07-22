import type { Locale } from '#/i18n/types'

export type PostFrontmatter = {
  title: string
  date: string
  tags: string[]
  /**
   * One-line list / SEO blurb.
   * Optional in source; always resolved on Post (falls back to body trim).
   */
  excerpt?: string
  /** Public URL path, e.g. `/covers/slug.webp` */
  cover?: string
  coverAlt?: string
}

export type PostSummary = Omit<PostFrontmatter, 'excerpt'> & {
  slug: string
  /** Always set after load: frontmatter excerpt or auto from body */
  excerpt: string
  /** Locale of the content actually returned */
  locale: Locale
  /** Locales that have a markdown source for this slug */
  availableLocales: Locale[]
  /** True when requested locale was missing and content fell back */
  isFallback: boolean
}

export type Post = PostSummary & {
  body: string
  html: string
}

export type RawPostInput = {
  slug: string
  raw: string
  /** File locale (from `slug.en.md` / `slug.zh.md`) */
  sourceLocale: Locale
}

export type LocalizedPostGroup = {
  slug: string
  byLocale: Partial<Record<Locale, Post>>
}
