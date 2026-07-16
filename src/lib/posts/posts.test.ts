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
  - tech
  - typescript
---

Modern full-stack work is less about picking a framework.`

const tradingRaw = `---
title: "Position sizing before entry timing"
date: "2026-02-28"
tags:
  - investing
  - risk
---

Most traders obsess over entries.`

describe('buildPostFromRaw', () => {
  it('parses frontmatter and renders markdown html', async () => {
    const post = await buildPostFromRaw({
      slug: 'full-stack-type-safety',
      raw: fullStackRaw,
    })

    expect(post.title).toBe('Type safety from database to browser')
    expect(post.date).toBe('2026-03-15')
    expect(post.tags).toEqual(['tech', 'typescript'])
    expect(post.body).toContain('Modern full-stack work')
    expect(post.html).toContain('<p>Modern full-stack work')
    expect(post.excerpt).toContain('Modern full-stack work')
  })

  it('passes through optional cover fields', async () => {
    const post = await buildPostFromRaw({
      slug: 'with-cover',
      raw: `---
title: "Covered"
date: "2026-04-01"
cover: /covers/covered.svg
coverAlt: "Bars of risk"
---

Hello.`,
    })

    expect(post.cover).toBe('/covers/covered.svg')
    expect(post.coverAlt).toBe('Bars of risk')
  })
})

describe('sortPostsByDate', () => {
  it('orders posts newest first by default', async () => {
    const posts = await Promise.all([
      buildPostFromRaw({ slug: 'older', raw: tradingRaw }),
      buildPostFromRaw({ slug: 'newer', raw: fullStackRaw }),
    ])

    const sorted = sortPostsByDate(posts)

    expect(sorted.map((post) => post.slug)).toEqual([
      'newer',
      'older',
    ])
  })

  it('orders posts oldest first when requested', async () => {
    const posts = await Promise.all([
      buildPostFromRaw({ slug: 'older', raw: tradingRaw }),
      buildPostFromRaw({ slug: 'newer', raw: fullStackRaw }),
    ])

    const sorted = sortPostsByDate(posts, 'asc')

    expect(sorted.map((post) => post.slug)).toEqual([
      'older',
      'newer',
    ])
  })
})

describe('filterPostsByTag', () => {
  it('returns posts that match a tag case-insensitively', async () => {
    const posts = await Promise.all([
      buildPostFromRaw({ slug: 'dev', raw: fullStackRaw }),
      buildPostFromRaw({ slug: 'trade', raw: tradingRaw }),
    ])

    const techPosts = filterPostsByTag(posts, 'Tech')
    const investingPosts = filterPostsByTag(posts, 'investing')

    expect(techPosts).toHaveLength(1)
    expect(techPosts[0]?.slug).toBe('dev')
    expect(investingPosts).toHaveLength(1)
    expect(investingPosts[0]?.slug).toBe('trade')
  })
})

describe('findPostBySlug', () => {
  it('returns the matching post when the slug exists', async () => {
    const posts = await Promise.all([
      buildPostFromRaw({ slug: 'dev', raw: fullStackRaw }),
      buildPostFromRaw({ slug: 'trade', raw: tradingRaw }),
    ])

    const found = findPostBySlug(posts, 'trade')

    expect(found?.title).toBe('Position sizing before entry timing')
  })
})