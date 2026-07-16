import { buildExcerpt, parseFrontmatter, renderMarkdownToHtml } from './parse'
import type { Post, PostSummary, RawPostInput } from './types'

export async function buildPostFromRaw({
  slug,
  raw,
}: RawPostInput): Promise<Post> {
  const { frontmatter, body } = parseFrontmatter(raw)

  if (!frontmatter.title) {
    throw new Error(`Post "${slug}" is missing a title in frontmatter`)
  }

  if (!frontmatter.date) {
    throw new Error(`Post "${slug}" is missing a date in frontmatter`)
  }

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    tags: frontmatter.tags ?? [],
    excerpt: buildExcerpt(body),
    body,
    html: await renderMarkdownToHtml(body),
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