import { describe, expect, it } from 'vitest'
import { computeSiteStats } from './stats'

describe('computeSiteStats', () => {
  it('counts posts, unique topics, and earliest publish year', () => {
    const stats = computeSiteStats([
      {
        slug: 'a',
        title: 'A',
        date: '2026-03-15',
        tags: ['tech', 'typescript'],
        excerpt: 'A',
      },
      {
        slug: 'b',
        title: 'B',
        date: '2026-02-28',
        tags: ['investing', 'risk'],
        excerpt: 'B',
      },
    ])

    expect(stats).toEqual({
      postCount: 2,
      topicCount: 4,
      since: 2026,
    })
  })

  it('returns zeroed counts when there are no posts', () => {
    const stats = computeSiteStats([])

    expect(stats.postCount).toBe(0)
    expect(stats.topicCount).toBe(0)
    expect(stats.since).toBeGreaterThan(2000)
  })
})