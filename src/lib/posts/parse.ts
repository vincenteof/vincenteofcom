import '@tanstack/react-start/server-only'

import matter from 'gray-matter'
import { marked } from 'marked'
import { highlightCodeBlock } from './highlight'
import type { PostFrontmatter } from './types'

const CODE_BLOCK_PATTERN =
  /<pre><code(?: class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g

marked.setOptions({
  gfm: true,
  breaks: false,
})

function decodeHtmlEntities(value: string) {
  return value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

async function enrichCodeBlocks(html: string) {
  const matches = Array.from(html.matchAll(CODE_BLOCK_PATTERN))

  if (matches.length === 0) {
    return html
  }

  let result = html

  for (const match of matches) {
    const lang = match[1] || 'text'
    const code = decodeHtmlEntities(match[2] ?? '')
    const highlighted = await highlightCodeBlock(code, lang)
    result = result.replace(match[0], highlighted)
  }

  return result
}

export function parseFrontmatter(raw: string): {
  frontmatter: Partial<PostFrontmatter>
  body: string
} {
  const { data, content } = matter(raw)
  const tags = normalizeTags(data.tags)

  const excerpt = normalizeOptionalString(data.excerpt)
  const cover = normalizeOptionalString(data.cover)
  const coverAlt = normalizeOptionalString(data.coverAlt)

  return {
    frontmatter: {
      title: typeof data.title === 'string' ? data.title : undefined,
      date: typeof data.date === 'string' ? data.date : undefined,
      tags,
      ...(excerpt ? { excerpt } : {}),
      ...(cover ? { cover } : {}),
      ...(coverAlt ? { coverAlt } : {}),
    },
    body: content.trim(),
  }
}

export async function renderMarkdownToHtml(body: string): Promise<string> {
  const html = marked.parse(body) as string
  return enrichCodeBlocks(html)
}

export function buildExcerpt(body: string, maxLength = 160): string {
  const plain = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (plain.length <= maxLength) {
    return plain
  }

  return `${plain.slice(0, maxLength).trimEnd()}…`
}

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.filter((tag): tag is string => typeof tag === 'string')
  }

  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }

  return []
}

function normalizeOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}