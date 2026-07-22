import { describe, expect, it } from 'vitest'
import {
  buildPostFromRaw,
  filterPostsByTag,
  findPostBySlug,
  groupPostsBySlug,
  resolveLocalizedPost,
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
      sourceLocale: 'en',
    })

    expect(post.title).toBe('Type safety from database to browser')
    expect(post.date).toBe('2026-03-15')
    expect(post.tags).toEqual(['tech', 'typescript'])
    expect(post.locale).toBe('en')
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
      sourceLocale: 'en',
    })

    expect(post.cover).toBe('/covers/covered.svg')
    expect(post.coverAlt).toBe('Bars of risk')
  })

  it('prefers frontmatter excerpt over body auto-trim', async () => {
    const post = await buildPostFromRaw({
      slug: 'with-excerpt',
      raw: `---
title: "With excerpt"
date: "2026-04-01"
excerpt: "A short one-liner."
---

This long body should not become the list preview when excerpt is set.`,
      sourceLocale: 'en',
    })

    expect(post.excerpt).toBe('A short one-liner.')
  })
})

describe('resolveLocalizedPost', () => {
  it('returns the requested locale when present', async () => {
    const en = await buildPostFromRaw({
      slug: 'a',
      raw: fullStackRaw,
      sourceLocale: 'en',
    })
    const zh = await buildPostFromRaw({
      slug: 'a',
      raw: `---
title: "中文标题"
date: "2026-03-15"
tags: [tech]
---

中文正文。`,
      sourceLocale: 'zh',
    })

    const resolved = resolveLocalizedPost(
      { slug: 'a', byLocale: { en, zh } },
      'zh',
    )

    expect(resolved?.title).toBe('中文标题')
    expect(resolved?.isFallback).toBe(false)
    expect(resolved?.availableLocales.sort()).toEqual(['en', 'zh'])
  })

  it('falls back to English when the requested locale is missing', async () => {
    const en = await buildPostFromRaw({
      slug: 'a',
      raw: fullStackRaw,
      sourceLocale: 'en',
    })

    const resolved = resolveLocalizedPost({ slug: 'a', byLocale: { en } }, 'zh')

    expect(resolved?.locale).toBe('en')
    expect(resolved?.isFallback).toBe(true)
  })
})

describe('groupPostsBySlug', () => {
  it('groups locale variants under one slug', async () => {
    const en = await buildPostFromRaw({
      slug: 'a',
      raw: fullStackRaw,
      sourceLocale: 'en',
    })
    const zh = await buildPostFromRaw({
      slug: 'a',
      raw: `---
title: "中文"
date: "2026-03-15"
tags: [tech]
---

x`,
      sourceLocale: 'zh',
    })

    const groups = groupPostsBySlug([en, zh])

    expect(groups).toHaveLength(1)
    expect(groups[0]?.byLocale.en?.locale).toBe('en')
    expect(groups[0]?.byLocale.zh?.locale).toBe('zh')
  })
})

describe('sortPostsByDate', () => {
  it('orders posts newest first by default', async () => {
    const posts = await Promise.all([
      buildPostFromRaw({
        slug: 'older',
        raw: tradingRaw,
        sourceLocale: 'en',
      }),
      buildPostFromRaw({
        slug: 'newer',
        raw: fullStackRaw,
        sourceLocale: 'en',
      }),
    ])

    const sorted = sortPostsByDate(posts)

    expect(sorted.map((post) => post.slug)).toEqual(['newer', 'older'])
  })

  it('orders posts oldest first when requested', async () => {
    const posts = await Promise.all([
      buildPostFromRaw({
        slug: 'older',
        raw: tradingRaw,
        sourceLocale: 'en',
      }),
      buildPostFromRaw({
        slug: 'newer',
        raw: fullStackRaw,
        sourceLocale: 'en',
      }),
    ])

    const sorted = sortPostsByDate(posts, 'asc')

    expect(sorted.map((post) => post.slug)).toEqual(['older', 'newer'])
  })
})

describe('filterPostsByTag', () => {
  it('returns posts that match a tag case-insensitively', async () => {
    const posts = await Promise.all([
      buildPostFromRaw({
        slug: 'dev',
        raw: fullStackRaw,
        sourceLocale: 'en',
      }),
      buildPostFromRaw({
        slug: 'trade',
        raw: tradingRaw,
        sourceLocale: 'en',
      }),
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
      buildPostFromRaw({
        slug: 'dev',
        raw: fullStackRaw,
        sourceLocale: 'en',
      }),
      buildPostFromRaw({
        slug: 'trade',
        raw: tradingRaw,
        sourceLocale: 'en',
      }),
    ])

    const found = findPostBySlug(posts, 'trade')

    expect(found?.title).toBe('Position sizing before entry timing')
  })
})
