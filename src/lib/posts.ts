export type Visibility = 'public' | 'member'

export type PostFrontmatter = {
  title: string
  subtitle?: string
  date: string
  tags: string[]
  visibility: Visibility
  excerpt?: string
}

export type Post = PostFrontmatter & {
  slug: string
  body: string
  readingMinutes: number
}

export type PostSummary = PostFrontmatter & {
  slug: string
  excerpt: string
  readingMinutes: number
}

export type PostHeading = {
  id: string
  level: 2 | 3
  title: string
}

const RAW_POST_MODULES = import.meta.glob('/posts/*.mdx', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const POSTS = Object.entries(RAW_POST_MODULES)
  .map(([path, raw]) => parsePostFile(path, raw))
  .sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))

export function getAllPostSummaries(): PostSummary[] {
  return POSTS.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags,
    visibility: post.visibility,
    excerpt: post.excerpt || createExcerpt(post.body),
    readingMinutes: post.readingMinutes,
  }))
}

export function getPublicPostSummaries(limit?: number): PostSummary[] {
  const publicPosts = getAllPostSummaries().filter((post) => post.visibility === 'public')

  if (!limit) {
    return publicPosts
  }

  return publicPosts.slice(0, limit)
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug)
}

export function extractPostHeadings(body: string): PostHeading[] {
  const headings: PostHeading[] = []

  for (const line of body.split('\n')) {
    const matched = line.match(/^(#{2,3})\s+(.+)$/)

    if (!matched) {
      continue
    }

    const level = matched[1].length as 2 | 3
    const title = matched[2].trim()

    headings.push({
      id: slugifyHeading(title),
      level,
      title,
    })
  }

  return headings
}

export function slugifyHeading(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/\[[^\]]+\]\([^\)]+\)/g, '')
    .replace(/[\s/]+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function createPreview(body: string, maxChars = 420): string {
  const plain = toPlainText(body)

  if (plain.length <= maxChars) {
    return plain
  }

  return `${plain.slice(0, maxChars).trimEnd()}...`
}

export function formatTagLabel(tag: string): string {
  if (!tag) {
    return ''
  }

  return tag.charAt(0).toUpperCase() + tag.slice(1)
}

function parsePostFile(path: string, raw: string): Post {
  const slug = path.split('/').pop()?.replace(/\.mdx$/, '')

  if (!slug) {
    throw new Error(`Invalid post path: ${path}`)
  }

  const matched = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!matched) {
    throw new Error(`Missing frontmatter in: ${path}`)
  }

  const frontmatter = parseFrontmatter(matched[1], path)

  const body = matched[2].trim()

  return {
    slug,
    ...frontmatter,
    body,
    readingMinutes: estimateReadingMinutes(body),
  }
}

function parseFrontmatter(frontmatter: string, path: string): PostFrontmatter {
  const map = new Map<string, string>()

  for (const rawLine of frontmatter.split('\n')) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf(':')

    if (separatorIndex <= 0) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()
    map.set(key, value)
  }

  const title = map.get('title')
  const date = map.get('date')
  const subtitle = unwrapQuote(map.get('subtitle'))
  const visibility = map.get('visibility') as Visibility | undefined
  const tags = parseTags(map.get('tags'))
  const excerpt = unwrapQuote(map.get('excerpt'))

  if (!title || !date || !visibility || tags.length === 0) {
    throw new Error(`Invalid frontmatter fields in: ${path}`)
  }

  if (visibility !== 'public' && visibility !== 'member') {
    throw new Error(`Invalid visibility in: ${path}`)
  }

  return {
    title: unwrapQuote(title),
    subtitle: subtitle || undefined,
    date: unwrapQuote(date),
    tags,
    visibility,
    excerpt,
  }
}

function parseTags(value?: string): string[] {
  if (!value) {
    return []
  }

  const normalized = unwrapQuote(value)
  const stripped = normalized.replace(/^\[/, '').replace(/\]$/, '')

  return stripped
    .split(',')
    .map((tag) => unwrapQuote(tag.trim()))
    .filter(Boolean)
}

function toTimestamp(date: string): number {
  const timestamp = Date.parse(date)
  return Number.isNaN(timestamp) ? 0 : timestamp
}

function createExcerpt(body: string): string {
  return createPreview(body, 120)
}

function estimateReadingMinutes(body: string): number {
  const plain = toPlainText(body)
  const chineseChars = (plain.match(/[\p{Script=Han}]/gu) || []).length
  const latinWords = plain
    .replace(/[\p{Script=Han}]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  const readingUnits = chineseChars + latinWords * 2

  return Math.max(1, Math.ceil(readingUnits / 320))
}

function toPlainText(text: string): string {
  return stripMarkdown(text).replace(/\s+/g, ' ').trim()
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
}

function unwrapQuote(value?: string): string {
  if (!value) {
    return ''
  }

  const trimmed = value.trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim()
  }

  return trimmed
}
