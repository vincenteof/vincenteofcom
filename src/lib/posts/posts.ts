import type { Locale } from '#/i18n/types'
import { buildExcerpt, parseFrontmatter, renderMarkdownToHtml } from './parse'
import type {
  LocalizedPostGroup,
  Post,
  PostSummary,
  RawPostInput,
} from './types'

export async function buildPostFromRaw({
  slug,
  raw,
  sourceLocale,
}: RawPostInput): Promise<Post> {
  const { frontmatter, body } = parseFrontmatter(raw)

  if (!frontmatter.title) {
    throw new Error(`Post "${slug}" (${sourceLocale}) is missing a title in frontmatter`)
  }

  if (!frontmatter.date) {
    throw new Error(`Post "${slug}" (${sourceLocale}) is missing a date in frontmatter`)
  }

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    tags: frontmatter.tags ?? [],
    excerpt: frontmatter.excerpt?.trim() || buildExcerpt(body),
    body,
    html: await renderMarkdownToHtml(body),
    locale: sourceLocale,
    availableLocales: [sourceLocale],
    isFallback: false,
    ...(frontmatter.cover ? { cover: frontmatter.cover } : {}),
    ...(frontmatter.coverAlt ? { coverAlt: frontmatter.coverAlt } : {}),
  }
}

export function sortPostsByDate(
  posts: PostSummary[],
  order: 'asc' | 'desc' = 'desc',
): PostSummary[] {
  return [...posts].sort((left, right) => {
    const leftTime = Date.parse(left.date)
    const rightTime = Date.parse(right.date)

    if (Number.isNaN(leftTime) || Number.isNaN(rightTime)) {
      return left.slug.localeCompare(right.slug)
    }

    return order === 'desc' ? rightTime - leftTime : leftTime - rightTime
  })
}

export function filterPostsByTag(
  posts: PostSummary[],
  tag: string,
): PostSummary[] {
  const normalized = tag.trim().toLowerCase()

  return posts.filter((post) =>
    post.tags.some((candidate) => candidate.toLowerCase() === normalized),
  )
}

export function findPostBySlug(posts: Post[], slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

const FALLBACK_ORDER: Locale[] = ['en', 'zh']

/** Pick content for a locale with fallback (en first, then zh). */
export function resolveLocalizedPost(
  group: LocalizedPostGroup,
  requested: Locale,
): Post | undefined {
  const availableLocales = (
    Object.keys(group.byLocale) as Locale[]
  ).sort() as Locale[]

  if (availableLocales.length === 0) {
    return undefined
  }

  const preferred =
    group.byLocale[requested] ??
    FALLBACK_ORDER.map((locale) => group.byLocale[locale]).find(Boolean)

  if (!preferred) {
    return undefined
  }

  const isFallback = preferred.locale !== requested

  return {
    ...preferred,
    availableLocales,
    isFallback,
  }
}

export function groupPostsBySlug(posts: Post[]): LocalizedPostGroup[] {
  const map = new Map<string, LocalizedPostGroup>()

  for (const post of posts) {
    let group = map.get(post.slug)
    if (!group) {
      group = { slug: post.slug, byLocale: {} }
      map.set(post.slug, group)
    }
    group.byLocale[post.locale] = post
  }

  return [...map.values()]
}

export function toPostSummary(post: Post): PostSummary {
  const {
    slug,
    title,
    date,
    tags,
    excerpt,
    locale,
    availableLocales,
    isFallback,
    cover,
    coverAlt,
  } = post

  return {
    slug,
    title,
    date,
    tags,
    excerpt,
    locale,
    availableLocales,
    isFallback,
    ...(cover ? { cover } : {}),
    ...(coverAlt ? { coverAlt } : {}),
  }
}
