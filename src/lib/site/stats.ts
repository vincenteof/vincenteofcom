import type { PostSummary } from '#/lib/posts/types'

export type SiteStats = {
  postCount: number
  topicCount: number
  since: number
}

export function computeSiteStats(posts: PostSummary[]): SiteStats {
  if (posts.length === 0) {
    const year = new Date().getFullYear()

    return {
      postCount: 0,
      topicCount: 0,
      since: year,
    }
  }

  const years = posts
    .map((post) => Date.parse(post.date))
    .filter((time) => !Number.isNaN(time))
    .map((time) => new Date(time).getFullYear())

  const topics = new Set(
    posts.flatMap((post) => post.tags.map((tag) => tag.trim().toLowerCase())),
  )

  return {
    postCount: posts.length,
    topicCount: topics.size,
    since: years.length > 0 ? Math.min(...years) : new Date().getFullYear(),
  }
}