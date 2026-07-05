import '@tanstack/react-start/server-only'

import {
  buildPostFromRaw,
  findPostBySlug,
  sortPostsByDate,
} from './posts'
import type { Post, PostSummary } from './types'

const postModules = import.meta.glob('../../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function slugFromPath(path: string): string {
  const filename = path.split('/').pop() ?? path
  return filename.replace(/\.md$/, '')
}

export function collectPostsFromModules(
  modules: Record<string, string>,
): Post[] {
  const posts = Object.entries(modules).map(([path, raw]) =>
    buildPostFromRaw({ slug: slugFromPath(path), raw }),
  )

  return sortPostsByDate(posts) as Post[]
}

function loadPosts(): Post[] {
  return collectPostsFromModules(postModules)
}

let cachedPosts: Post[] | null = null

export function getAllPosts(): Post[] {
  if (!cachedPosts) {
    cachedPosts = loadPosts()
  }

  return cachedPosts
}

export function getAllPostSummaries(): PostSummary[] {
  return getAllPosts().map(({ slug, title, date, tags, excerpt }) => ({
    slug,
    title,
    date,
    tags,
    excerpt,
  }))
}

export function getPostBySlug(slug: string): Post | undefined {
  return findPostBySlug(getAllPosts(), slug)
}