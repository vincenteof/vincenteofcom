import matter from 'gray-matter'
import { marked } from 'marked'
import type { PostFrontmatter } from './types'

marked.setOptions({
  gfm: true,
  breaks: false,
})

export function parseFrontmatter(raw: string): {
  frontmatter: Partial<PostFrontmatter>
  body: string
} {
  const { data, content } = matter(raw)
  const tags = normalizeTags(data.tags)

  return {
    frontmatter: {
      title: typeof data.title === 'string' ? data.title : undefined,
      date: typeof data.date === 'string' ? data.date : undefined,
      tags,
    },
    body: content.trim(),
  }
}

export function renderMarkdownToHtml(body: string): string {
  return marked.parse(body) as string
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