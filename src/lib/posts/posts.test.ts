import { describe, expect, it } from 'vitest'
import {
  buildPostFromRaw,
  filterPostsByTag,
  findPostBySlug,
  sortPostsByDate,
} from './posts'

const fullStackRaw = `---
title: "Type safety from database to browser"
date: "2026-03-15"
tags:
  - full-stack
  - typescript
---

Modern full-stack work is less about picking a framework.`

const tradingRaw = `---
title: "Position sizing before entry timing"
date: "2026-02-28"
tags:
  - trading
  - risk
---

Most traders obsess over entries.`

describe('buildPostFromRaw', () => {
  it('parses frontmatter and renders markdown html', () => {
    const post = buildPostFromRaw({
      slug: 'full-stack-type-safety',
      raw: fullStackRaw,
    })

    expect(post.title).toBe('Type safety from database to browser')
    expect(post.date).toBe('2026-03-15')
    expect(post.tags).toEqual(['full-stack', 'typescript'])
    expect(post.body).toContain('Modern full-stack work')
    expect(post.html).toContain('<p>Modern full-stack work')
    expect(post.excerpt).toContain('Modern full-stack work')
  })
})

describe('sortPostsByDate', () => {
  it('orders posts newest first by default', () => {
    const posts = [
      buildPostFromRaw({ slug: 'older', raw: tradingRaw }),
      buildPostFromRaw({ slug: 'newer', raw: fullStackRaw }),
    ]

    const sorted = sortPostsByDate(posts)

    expect(sorted.map((post) => post.slug)).toEqual([
      'newer',
      'older',
    ])
  })

  it('orders posts oldest first when requested', () => {
    const posts = [
      buildPostFromRaw({ slug: 'older', raw: tradingRaw }),
      buildPostFromRaw({ slug: 'newer', raw: fullStackRaw }),
    ]

    const sorted = sortPostsByDate(posts, 'asc')

    expect(sorted.map((post) => post.slug)).toEqual([
      'older',
      'newer',
    ])
  })
})

describe('filterPostsByTag', () => {
  it('returns posts that match a tag case-insensitively', () => {
    const posts = [
      buildPostFromRaw({ slug: 'dev', raw: fullStackRaw }),
      buildPostFromRaw({ slug: 'trade', raw: tradingRaw }),
    ]

    const fullStackPosts = filterPostsByTag(posts, 'Full-Stack')
    const tradingPosts = filterPostsByTag(posts, 'trading')

    expect(fullStackPosts).toHaveLength(1)
    expect(fullStackPosts[0]?.slug).toBe('dev')
    expect(tradingPosts).toHaveLength(1)
    expect(tradingPosts[0]?.slug).toBe('trade')
  })
})

describe('findPostBySlug', () => {
  it('returns the matching post when the slug exists', () => {
    const posts = [
      buildPostFromRaw({ slug: 'dev', raw: fullStackRaw }),
      buildPostFromRaw({ slug: 'trade', raw: tradingRaw }),
    ]

    const found = findPostBySlug(posts, 'trade')

    expect(found?.title).toBe('Position sizing before entry timing')
  })
})