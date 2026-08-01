import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequestLocale } from '#/i18n/locale.server'
import { getAllPostSummaries, getPostBySlug } from './load'
import { sortPostsByDate } from './posts'

export const getAllPostSummariesFn = createServerFn({ method: 'GET' }).handler(
  async () => getAllPostSummaries(getRequestLocale()),
)

export const getPostBySlugFn = createServerFn({ method: 'GET' })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const post = await getPostBySlug(data.slug, getRequestLocale())

    if (!post) {
      throw notFound()
    }

    return post
  })

export const getHomePageDataFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const posts = await getAllPostSummaries(getRequestLocale())
    const recent = sortPostsByDate(posts).slice(0, 2)

    return { recent }
  },
)
