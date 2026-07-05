import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getAllPostSummaries, getPostBySlug } from './load'
import { filterPostsByTag, sortPostsByDate } from './posts'

export const getAllPostSummariesFn = createServerFn({ method: 'GET' }).handler(
  async () => getAllPostSummaries(),
)

export const getPostBySlugFn = createServerFn({ method: 'GET' })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const post = getPostBySlug(data.slug)

    if (!post) {
      throw notFound()
    }

    return post
  })

export const getHomePageDataFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const posts = getAllPostSummaries()
    const recent = sortPostsByDate(posts).slice(0, 2)

    return {
      recent,
      fullStackCount: filterPostsByTag(posts, 'full-stack').length,
      tradingCount: filterPostsByTag(posts, 'trading').length,
    }
  },
)