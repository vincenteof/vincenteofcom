import { describe, expect, it } from 'vitest'
import {
  buildExcerpt,
  parseFrontmatter,
  renderMarkdownToHtml,
} from './parse'

describe('parseFrontmatter', () => {
  it('extracts title, date, tags, and body from markdown', () => {
    const raw = `---
title: "Hello world"
date: "2026-01-10"
tags: [writing, notes]
---

First paragraph.

Second paragraph.`

    const { frontmatter, body } = parseFrontmatter(raw)

    expect(frontmatter.title).toBe('Hello world')
    expect(frontmatter.date).toBe('2026-01-10')
    expect(frontmatter.tags).toEqual(['writing', 'notes'])
    expect(body).toBe('First paragraph.\n\nSecond paragraph.')
  })

  it('extracts optional cover and coverAlt', () => {
    const raw = `---
title: "With cover"
date: "2026-01-10"
cover: /covers/with-cover.svg
coverAlt: "Soft diagram"
---

Body.`

    const { frontmatter } = parseFrontmatter(raw)

    expect(frontmatter.cover).toBe('/covers/with-cover.svg')
    expect(frontmatter.coverAlt).toBe('Soft diagram')
  })
})

describe('renderMarkdownToHtml', () => {
  it('renders paragraphs and emphasis from markdown', async () => {
    const html = await renderMarkdownToHtml('Hello **world**.')

    expect(html).toContain('<p>Hello <strong>world</strong>.</p>')
  })

  it('highlights fenced code blocks with copy affordances', async () => {
    const html = await renderMarkdownToHtml(
      '```typescript\nconst total = 1\n```',
    )

    expect(html).toContain('data-code-block')
    expect(html).toContain('data-copy-button')
    expect(html).toContain('shiki')
  })
})

describe('buildExcerpt', () => {
  it('strips markdown syntax and truncates long bodies', () => {
    const excerpt = buildExcerpt(
      '# Heading\n\nThis is a long paragraph that should be shortened for the blog index preview card.',
      40,
    )

    expect(excerpt.endsWith('…')).toBe(true)
    expect(excerpt.length).toBeLessThanOrEqual(41)
    expect(excerpt).toContain('Heading')
    expect(excerpt).toContain('long paragraph')
  })
})