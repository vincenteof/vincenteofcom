import { createServerFn } from '@tanstack/react-start'
import { getAllPostSummaries } from '#/lib/posts/load'
import { computeSiteStats } from './stats'

export const getSiteStatsFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const posts = await getAllPostSummaries()
    return computeSiteStats(posts)
  },
)